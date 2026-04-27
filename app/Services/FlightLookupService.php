<?php

namespace App\Services;

use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class FlightLookupService
{
    private const NL_AIRPORTS = ['AMS', 'RTM', 'EIN'];

    // Minuten die de klant nodig heeft na landing (bagage, uitlopen)
    private const ARRIVAL_BUFFER_MINUTES = 35;

    // Minuten die de klant minimaal voor vertrek op het vliegveld moet zijn
    private const AIRPORT_LEAD_MINUTES = 120;

    // Coördinaten van de Nederlandse luchthavens (voor OSRM reistijdberekening)
    private const AIRPORT_COORDS = [
        'AMS' => ['lat' => 52.3086, 'lng' => 4.7639],  // Schiphol
        'RTM' => ['lat' => 51.9569, 'lng' => 4.4374],  // Rotterdam The Hague
        'EIN' => ['lat' => 51.4500, 'lng' => 5.3744],  // Eindhoven
    ];

    private string $apiKey;

    public function __construct(private OsrmService $osrm)
    {
        $this->apiKey = config('services.aerodatabox.key', '');
    }

    /**
     * Lookup a flight by number and date.
     */
    public function lookup(string $flightNumber, string $date): ?array
    {
        $number   = strtoupper(str_replace(' ', '', $flightNumber));
        $cacheKey = "flight:{$number}:{$date}";

        return Cache::remember($cacheKey, now()->addMinutes(15), function () use ($number, $date) {
            return $this->fetchFromApi($number, $date);
        });
    }

    /**
     * Calculate an ADVISED pickup time. This is always advisory — the customer
     * decides the final booking time. YAS bears no liability for missed flights.
     *
     * Naar vliegveld (to_airport):
     *   advised = scheduled_departure − 120min aanwezigheid − OSRM reistijd
     *
     * Van vliegveld (from_airport):
     *   advised = scheduled_arrival + 35min (bagage/uitlopen)
     *   (chauffeur staat bij aankomsthal, geen reistijd aftrekken)
     *
     * Returns an array with the advisory time and its breakdown.
     */
    public function calculateAdvice(array $flight, string $direction, ?float $pickupLat, ?float $pickupLng): array
    {
        if ($direction === 'to_airport') {
            $departureStr = $flight['scheduled_departure_at'] ?? null;
            if (! $departureStr) {
                return ['advised_at' => null, 'breakdown' => null];
            }

            $departure = new \DateTimeImmutable($departureStr);

            // Reistijd klant → vliegveld via OSRM (als coördinaten bekend)
            $driveMinutes   = 0;
            $airportIata    = $flight['departure_iata'] ?? '';
            $airportCoords  = self::AIRPORT_COORDS[$airportIata] ?? null;

            if ($pickupLat && $pickupLng && $airportCoords) {
                $route = $this->osrm->getRoute(
                    $pickupLat, $pickupLng,
                    $airportCoords['lat'], $airportCoords['lng']
                );
                $driveMinutes = $route['duration_min'] ?? 0;
            }

            $totalLeadMinutes = self::AIRPORT_LEAD_MINUTES + $driveMinutes;
            $advisedAt        = $departure->modify("-{$totalLeadMinutes} minutes");

            return [
                'advised_at'   => $advisedAt->setTimezone(new \DateTimeZone('Europe/Amsterdam'))->format('c'),
                'breakdown'    => [
                    'flight_departs'       => $departure->setTimezone(new \DateTimeZone('Europe/Amsterdam'))->format('H:i'),
                    'airport_lead_minutes' => self::AIRPORT_LEAD_MINUTES,
                    'drive_minutes'        => $driveMinutes,
                    'total_lead_minutes'   => $totalLeadMinutes,
                ],
            ];
        }

        // from_airport: chauffeur staat bij aankomsthal na landing + buffer
        $arrivalStr = $flight['actual_arrival_at'] ?? $flight['scheduled_arrival_at'] ?? null;
        if (! $arrivalStr) {
            return ['advised_at' => null, 'breakdown' => null];
        }

        $arrival   = new \DateTimeImmutable($arrivalStr);
        $advisedAt = $arrival->modify('+' . self::ARRIVAL_BUFFER_MINUTES . ' minutes');

        return [
            'advised_at' => $advisedAt->setTimezone(new \DateTimeZone('Europe/Amsterdam'))->format('c'),
            'breakdown'  => [
                'flight_arrives'       => $arrival->setTimezone(new \DateTimeZone('Europe/Amsterdam'))->format('H:i'),
                'arrival_buffer_minutes' => self::ARRIVAL_BUFFER_MINUTES,
                'drive_minutes'        => 0,
                'total_lead_minutes'   => self::ARRIVAL_BUFFER_MINUTES,
            ],
        ];
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

            if (! $response->ok()) {
                Log::warning("FlightLookup: {$number}/{$date} → HTTP {$response->status()}");
                return null;
            }

            $flights = $response->json();
            if (empty($flights)) return null;

            $flight = collect($flights)->first(fn($f) =>
                in_array(data_get($f, 'arrival.airport.iata'), self::NL_AIRPORTS)
            ) ?? $flights[0];

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

        $depIata = strtoupper(data_get($dep, 'airport.iata', ''));
        $arrIata = strtoupper(data_get($arr, 'airport.iata', ''));

        return [
            'flight_number'          => data_get($flight, 'number'),
            'status'                 => data_get($flight, 'status', 'scheduled'),
            'departure_iata'         => $depIata,
            'arrival_iata'           => $arrIata,
            'departure_airport_name' => data_get($dep, 'airport.name'),
            'arrival_airport_name'   => data_get($arr, 'airport.name'),
            'scheduled_departure_at' => $scheduledDep,
            'scheduled_arrival_at'   => $scheduledArr,
            'actual_arrival_at'      => $actualArr,
            'delay_minutes'          => data_get($arr, 'delay', 0),
            'is_nl_airport'          => in_array($depIata, self::NL_AIRPORTS) || in_array($arrIata, self::NL_AIRPORTS),
        ];
    }

    private function mockFlight(string $number, string $date): array
    {
        $dep = \DateTimeImmutable::createFromFormat('Y-m-d H:i', "{$date} 10:15");
        return [
            'flight_number'          => $number,
            'status'                 => 'scheduled',
            'departure_iata'         => 'AMS',
            'arrival_iata'           => 'LHR',
            'departure_airport_name' => 'Amsterdam Schiphol',
            'arrival_airport_name'   => 'London Heathrow',
            'scheduled_departure_at' => $dep->format('c'),
            'scheduled_arrival_at'   => $dep->modify('+1 hour 20 minutes')->format('c'),
            'actual_arrival_at'      => $dep->modify('+1 hour 20 minutes')->format('c'),
            'delay_minutes'          => 0,
            'is_nl_airport'          => true,
            '_mock'                  => true,
        ];
    }
}
