<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vehicle;
use App\Services\PriceCalculator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class PriceController extends Controller
{
    public function __construct(private readonly PriceCalculator $calculator) {}

    public function estimate(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'from_lat'     => ['required', 'numeric', 'between:-90,90'],
            'from_lng'     => ['required', 'numeric', 'between:-180,180'],
            'to_lat'       => ['required', 'numeric', 'between:-90,90'],
            'to_lng'       => ['required', 'numeric', 'between:-180,180'],
            'vehicle_type' => ['required', Rule::in(['sedan', 'business', 'taxibus'])],
            'has_return'   => ['sometimes', 'boolean'],
        ]);

        $result = $this->calculator->calculate(
            (float) $validated['from_lat'],
            (float) $validated['from_lng'],
            (float) $validated['to_lat'],
            (float) $validated['to_lng'],
            $validated['vehicle_type'],
            (bool) ($validated['has_return'] ?? false),
        );

        if ($result === null) {
            return response()->json(['error' => 'Kon geen route berekenen. Controleer de adressen.'], 422);
        }

        $vehicle = Vehicle::where('type', $validated['vehicle_type'])->firstOrFail();

        return response()->json([
            'price_cents'        => $result['price_cents'],
            'return_price_cents' => $result['return_price_cents'],
            'distance_km'        => $result['distance_km'],
            'duration_min'       => $result['duration_min'],
            'is_fixed'           => $result['is_fixed'],
            'vehicle'            => [
                'type'           => $vehicle->type,
                'name'           => $vehicle->name,
                'max_passengers' => $vehicle->max_passengers,
                'features'       => $vehicle->features,
            ],
        ]);
    }

    public function vehicles(): JsonResponse
    {
        $vehicles = Vehicle::orderBy('sort_order')->get(['type', 'name', 'description', 'max_passengers', 'features', 'min_price_cents']);

        return response()->json($vehicles);
    }
}
