<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FlightLookupService
{
    private const NL_AIRPORTS = ['AMS', 'RTM', 'EIN'];

    // Minutes the customer needs after landing before ready for pickup
    private const ARRIVAL_BUFFER_MINUTES = 35;

    // Minutes before departure the taxi should be at customer's home
    private const DEPARTURE_LEAD_MINUTES = 120;

    private string $apiKey;

    public function __construct()
    {
        $this->apiKey = config('services.aerodatabox.key', '');
    }

    /**
     * Lookup flight by number and date.
     * Returns normalized flight data or null when not found / API unavailable.
     */
    public function lookup(string $flightNumber, string $date): ?array
    {
        $number = strtoupper(str_replace(' ', '', $flightNumber));
        $cacheKey = "flight:{$number}:{$date}";

        return Cache::remember($cacheKey, now()->addMinutes(15), function () use ($number, $date) {
            return $this->fetchFromApi($number, $date);
        });
    }

    /**
     * Calculate when the driver should pick up the customer.
     *
     * For departures (to_airport): flight departure - DEPARTURE_LEAD_MINUTES
     * For arrivals (from_airport): flight arrival + ARRIVAL_BUFFER_MINUTES
     */
    public function calculatePickupAt(array $flight, string $direction): ?\DateTimeImmutable
    {
        $reference = $flight['actual_arrival_at'] ?? $flight['scheduled_arrival_at'] ?? null;

        if ($direction === 'from_airport' && $reference) {
            return (new \DateTimeImmutable($reference))
                ->modify('+' . self::ARRIVAL_BUFFER_MINUTES . ' minutes');
        }

        $departurAt = $flight['scheduled_departure_at'] ?? null;
        if ($direction === 'to_airport' && $departurAt) {
            return (new \DateTimeImmutable($departurAt))
                ->modify('-' . self::DEPARTURE_LEAD_MINUTES . ' minutes');
        }

        return null;
    }

    /**
     * Calculate when the driver must leave the depot to be on time,
     * given the drive time (in minutes) from the customer's address.
     */
    public function calculateDriverDeparture(\DateTimeImmutable $pickupAt, int $drivingMinutesToCustomer): \DateTimeImmutable
    {
        return $pickupAt->modify("-{$drivingMinutesToCustomer} minutes");
    }

    // ─── Private ─────────────────────────────────────────────────────────────

    private function fetchFromApi(string $number, string $date): ?array
    {
        if (empty($this->apiKey)) {
            return $this->mockFlight($number, $date);
        }

        try {
            $response = Http::withHeaders([
                'X-RapidAPI-Key'  => $this->apiKey,
                'X-RapidAPI-Host' => 'aerodatabox.p.rapidapi.com',
            ])->timeout(10)->get("https://aerodatabox.p.rapidapi.com/flights/number/{$number}/{$date}");

            if (!$response->ok()) {
                Log::warning("FlightLookup: {$number}/{$date} returned {$response->status()}");
                return null;
            }

            $flights = $response->json();
            if (empty($flights)) return null;

            // Prefer flights arriving at a Dutch airport
            $flight = collect($flights)->first(function ($f) {
                return in_array(data_get($f, 'arrival.airport.iata'), self::NL_AIRPORTS);
            }) ?? $flights[0];

            return $this->normalize($flight);

        } catch (\Throwable $e) {
            Log::error("FlightLookup exception: {$e->getMessage()}");
            return null;
        }
    }

    private function normalize(array $flight): array
    {
        $dep = $flight['departure'] ?? [];
        $arr = $flight['arrival'] ?? [];

        $scheduledDep = data_get($dep, 'scheduledTime.local');
        $scheduledArr = data_get($arr, 'scheduledTime.local');
        $actualArr    = data_get($arr, 'actualTime.local')
            ?? data_get($arr, 'revisedTime.local')
            ?? $scheduledArr;

        $arrIata = strtoupper(data_get($arr, 'airport.iata', ''));

        return [
            'flight_number'          => data_get($flight, 'number'),
            'status'                 => data_get($flight, 'status', 'scheduled'),
            'departure_iata'         => strtoupper(data_get($dep, 'airport.iata', '')),
            'arrival_iata'           => $arrIata,
            'departure_airport_name' => data_get($dep, 'airport.name'),
            'arrival_airport_name'   => data_get($arr, 'airport.name'),
            'scheduled_departure_at' => $scheduledDep,
            'scheduled_arrival_at'   => $scheduledArr,
            'actual_arrival_at'      => $actualArr,
            'delay_minutes'          => data_get($arr, 'delay', 0),
            'is_nl_arrival'          => in_array($arrIata, self::NL_AIRPORTS),
        ];
    }

    /** Returns plausible mock data when no API key is configured (dev/test). */
    private function mockFlight(string $number, string $date): array
    {
        $baseTime = \DateTimeImmutable::createFromFormat('Y-m-d H:i', "{$date} 14:30");
        return [
            'flight_number'          => $number,
            'status'                 => 'scheduled',
            'departure_iata'         => 'LHR',
            'arrival_iata'           => 'AMS',
            'departure_airport_name' => 'London Heathrow',
            'arrival_airport_name'   => 'Amsterdam Schiphol',
            'scheduled_departure_at' => $baseTime->modify('-2 hours 15 minutes')->format('c'),
            'scheduled_arrival_at'   => $baseTime->format('c'),
            'actual_arrival_at'      => $baseTime->format('c'),
            'delay_minutes'          => 0,
            'is_nl_arrival'          => true,
            '_mock'                  => true,
        ];
    }
}
