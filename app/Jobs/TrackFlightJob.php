<?php

namespace App\Jobs;

use App\Models\Booking;
use App\Services\FlightLookupService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class TrackFlightJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public int $tries = 3;
    public int $backoff = 300; // 5 min between retries

    public function __construct(public readonly int $bookingId) {}

    public function handle(FlightLookupService $service): void
    {
        $booking = Booking::find($this->bookingId);

        if (! $booking || ! $booking->flight_number) return;
        if (in_array($booking->flight_status, ['landed', 'cancelled'])) return;

        $date   = ($booking->flight_scheduled_at ?? $booking->pickup_at)->format('Y-m-d');
        $flight = $service->lookup($booking->flight_number, $date);

        if (! $flight) {
            Log::warning("TrackFlightJob: no data for booking #{$booking->booking_number}");
            return;
        }

        $pickupAt = $service->calculatePickupAt($flight, $booking->flight_direction);

        $booking->update([
            'flight_status'        => $flight['status'],
            'flight_scheduled_at'  => $flight['scheduled_arrival_at'] ?? $flight['scheduled_departure_at'],
            'flight_actual_at'     => $flight['actual_arrival_at'] ?? null,
            'flight_delay_minutes' => $flight['delay_minutes'] ?? 0,
            'flight_last_tracked_at' => now(),
            'pickup_at'            => $pickupAt ?? $booking->pickup_at,
        ]);

        Log::info("TrackFlightJob: updated booking #{$booking->booking_number} — status={$flight['status']} delay={$flight['delay_minutes']}min");
    }
}
