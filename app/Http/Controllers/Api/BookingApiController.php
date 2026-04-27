<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Services\MoneybirdService;
use App\Services\PriceCalculator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class BookingApiController extends Controller
{
    public function __construct(
        private readonly PriceCalculator  $calculator,
        private readonly MoneybirdService $moneybird,
    ) {}

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            // Step 1 — route
            'pickup_address'      => ['required', 'string', 'max:255'],
            'pickup_lat'          => ['required', 'numeric', 'between:-90,90'],
            'pickup_lng'          => ['required', 'numeric', 'between:-180,180'],
            'destination_address' => ['required', 'string', 'max:255'],
            'destination_lat'     => ['required', 'numeric', 'between:-90,90'],
            'destination_lng'     => ['required', 'numeric', 'between:-180,180'],
            'pickup_at'           => ['required', 'date', 'after:now'],
            'return_at'           => ['nullable', 'date', 'after:pickup_at'],
            'passengers'          => ['required', 'integer', 'min:1', 'max:8'],

            // Step 2 — vehicle
            'vehicle_type'        => ['required', Rule::in(['sedan', 'business', 'taxibus'])],

            // Step 3 — contact
            'customer_name'       => ['required', 'string', 'max:100'],
            'customer_email'      => ['required', 'email', 'max:150'],
            'customer_phone'      => ['required', 'string', 'max:30'],
            'flight_number'       => ['nullable', 'string', 'max:20'],
            'notes'               => ['nullable', 'string', 'max:1000'],
            'wants_sms'           => ['sometimes', 'boolean'],
            'payment_method'      => ['required', Rule::in(['in_taxi_pin', 'in_taxi_cash'])],
        ]);

        // Recalculate price server-side — never trust client price
        $hasReturn = ! empty($validated['return_at']);
        $price = $this->calculator->calculate(
            (float) $validated['pickup_lat'],
            (float) $validated['pickup_lng'],
            (float) $validated['destination_lat'],
            (float) $validated['destination_lng'],
            $validated['vehicle_type'],
            $hasReturn,
        );

        if ($price === null) {
            return response()->json(['error' => 'Kon geen prijs berekenen. Probeer opnieuw.'], 422);
        }

        $booking = Booking::create(array_merge($validated, [
            'price_cents'        => $price['price_cents'],
            'return_price_cents' => $price['return_price_cents'],
            'distance_km'        => $price['distance_km'],
            'duration_min'       => $price['duration_min'],
            'payment_status'     => 'pending',
            'status'             => 'pending',
        ]));

        // Fire-and-forget MoneyBird draft invoice (non-blocking failure)
        $this->moneybird->createDraftInvoice($booking);

        return response()->json([
            'booking_number' => $booking->booking_number,
            'price_cents'    => $booking->price_cents,
            'return_price_cents' => $booking->return_price_cents,
            'pickup_at'      => $booking->pickup_at->toIso8601String(),
            'vehicle_type'   => $booking->vehicle_type,
        ], 201);
    }
}
