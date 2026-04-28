<?php

namespace App\Http\Controllers\Driver;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class DriverController extends Controller
{
    /** Geeft alle openstaande ritten terug (pending + confirmed) */
    public function index(): JsonResponse
    {
        $bookings = Booking::query()
            ->whereIn('status', ['pending', 'confirmed'])
            ->orderBy('pickup_at')
            ->get([
                'id', 'booking_number',
                'pickup_address', 'destination_address',
                'pickup_at', 'distance_km', 'duration_min',
                'customer_phone', 'passengers', 'vehicle_type',
                'status', 'is_quick_request',
                'accept_deadline', 'driver_accepted_at',
                'created_at',
            ]);

        return response()->json($bookings);
    }

    /** Chauffeur accepteert een rit */
    public function accept(Request $request, Booking $booking): JsonResponse
    {
        if (! in_array($booking->status, ['pending'])) {
            return response()->json(['error' => 'Rit kan niet meer geaccepteerd worden.'], 422);
        }

        $booking->update([
            'status'             => 'confirmed',
            'driver_accepted_at' => now(),
        ]);

        return response()->json(['status' => 'confirmed']);
    }
}
