<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class QuickBookingController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'pickup_address'      => ['required', 'string', 'max:255'],
            'pickup_lat'          => ['required', 'numeric', 'between:-90,90'],
            'pickup_lng'          => ['required', 'numeric', 'between:-180,180'],
            'destination_address' => ['required', 'string', 'max:255'],
            'destination_lat'     => ['required', 'numeric', 'between:-90,90'],
            'destination_lng'     => ['required', 'numeric', 'between:-180,180'],
            'pickup_at'           => ['required', 'date'],
            'customer_phone'      => ['nullable', 'string', 'max:30'],
            'distance_km'         => ['nullable', 'numeric', 'min:0'],
            'duration_min'        => ['nullable', 'numeric', 'min:0'],
        ]);

        $pickupAt = Carbon::parse($validated['pickup_at']);

        // Deadline: minimaal 2 uur vóór de rit; bij spoed minimaal 15 min vanaf nu
        $twoHoursBefore = $pickupAt->copy()->subHours(2);
        $acceptDeadline = $twoHoursBefore->isFuture()
            ? $twoHoursBefore
            : now()->addMinutes(15);

        $booking = Booking::create([
            'pickup_address'      => $validated['pickup_address'],
            'pickup_lat'          => $validated['pickup_lat'],
            'pickup_lng'          => $validated['pickup_lng'],
            'destination_address' => $validated['destination_address'],
            'destination_lat'     => $validated['destination_lat'],
            'destination_lng'     => $validated['destination_lng'],
            'pickup_at'           => $pickupAt,
            'passengers'          => 1,
            'vehicle_type'        => 'sedan',
            'distance_km'         => $validated['distance_km'] ?? null,
            'duration_min'        => $validated['duration_min'] ?? null,
            'price_cents'         => 0,
            'customer_name'       => 'WhatsApp aanvraag',
            'customer_email'      => '',
            'customer_phone'      => $validated['customer_phone'] ?? '',
            'payment_method'      => 'in_taxi_pin',
            'payment_status'      => 'pending',
            'status'              => 'pending',
            'is_quick_request'    => true,
            'accept_deadline'     => $acceptDeadline,
        ]);

        return response()->json([
            'booking_number'  => $booking->booking_number,
            'accept_deadline' => $acceptDeadline->toIso8601String(),
        ], 201);
    }
}
