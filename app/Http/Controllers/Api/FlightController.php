<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\FlightLookupService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    public function __construct(private FlightLookupService $flightService) {}

    /**
     * GET /api/v1/flights/lookup
     *
     * Query params:
     *   number    — flight number, e.g. KL1234
     *   date      — YYYY-MM-DD
     *   direction — to_airport | from_airport
     */
    public function lookup(Request $request): JsonResponse
    {
        $request->validate([
            'number'    => 'required|string|max:10',
            'date'      => 'required|date_format:Y-m-d|after_or_equal:today',
            'direction' => 'required|in:to_airport,from_airport',
        ]);

        $flight = $this->flightService->lookup($request->number, $request->date);

        if (! $flight) {
            return response()->json(['message' => 'Vlucht niet gevonden. Controleer het vluchtnummer en de datum.'], 404);
        }

        $direction = $request->direction;
        $pickupAt  = $this->flightService->calculatePickupAt($flight, $direction);

        return response()->json([
            'flight'     => $flight,
            'direction'  => $direction,
            'pickup_at'  => $pickupAt?->format('c'),
            'pickup_at_formatted' => $pickupAt
                ? $pickupAt->setTimezone(new \DateTimeZone('Europe/Amsterdam'))->format('D j M \o\m H:i')
                : null,
        ]);
    }
}
