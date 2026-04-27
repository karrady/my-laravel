<?php

namespace App\Services;

use App\Models\FixedPrice;
use App\Models\Vehicle;

class PriceCalculator
{
    public function __construct(private readonly OsrmService $osrm) {}

    /**
     * Calculate the price in cents for a given route and vehicle type.
     * Returns null when route data cannot be obtained.
     */
    public function calculate(
        float $fromLat, float $fromLng,
        float $toLat,   float $toLng,
        string $vehicleType,
        bool $hasReturn = false,
    ): ?array {
        // 1. Check fixed-price table first
        $fixed = $this->matchFixedPrice($fromLat, $fromLng, $toLat, $toLng, $vehicleType);

        if ($fixed !== null) {
            return [
                'price_cents'        => $fixed,
                'return_price_cents' => $hasReturn ? $fixed : null,
                'distance_km'        => null,
                'duration_min'       => null,
                'is_fixed'           => true,
            ];
        }

        // 2. Dynamic pricing via OSRM
        $route = $this->osrm->getRoute($fromLat, $fromLng, $toLat, $toLng);

        if ($route === null) {
            return null;
        }

        $vehicle = Vehicle::where('type', $vehicleType)->first();

        if ($vehicle === null) {
            return null;
        }

        $price = $vehicle->base_price_cents
            + ($route['distance_km'] * $vehicle->price_per_km_cents);

        $price = max($price, $vehicle->min_price_cents);

        return [
            'price_cents'        => (int) $price,
            'return_price_cents' => $hasReturn ? (int) $price : null,
            'distance_km'        => $route['distance_km'],
            'duration_min'       => $route['duration_min'],
            'is_fixed'           => false,
        ];
    }

    private function matchFixedPrice(
        float $fromLat, float $fromLng,
        float $toLat,   float $toLng,
        string $vehicleType,
    ): ?int {
        $priceColumn = match ($vehicleType) {
            'business' => 'business_cents',
            'taxibus'  => 'taxibus_cents',
            default    => 'sedan_cents',
        };

        $candidates = FixedPrice::where('is_active', true)->get();

        foreach ($candidates as $fp) {
            $fromMatch = $this->withinRadius($fromLat, $fromLng, $fp->from_lat, $fp->from_lng, $fp->from_radius_km);
            $toMatch   = $this->withinRadius($toLat, $toLng, $fp->to_lat, $fp->to_lng, $fp->to_radius_km);

            if ($fromMatch && $toMatch) {
                return $fp->$priceColumn;
            }

            if ($fp->is_bidirectional) {
                $fromMatchReverse = $this->withinRadius($fromLat, $fromLng, $fp->to_lat, $fp->to_lng, $fp->to_radius_km);
                $toMatchReverse   = $this->withinRadius($toLat, $toLng, $fp->from_lat, $fp->from_lng, $fp->from_radius_km);

                if ($fromMatchReverse && $toMatchReverse) {
                    return $fp->$priceColumn;
                }
            }
        }

        return null;
    }

    private function withinRadius(float $lat1, float $lng1, float $lat2, float $lng2, float $radiusKm): bool
    {
        return $this->haversineKm($lat1, $lng1, $lat2, $lng2) <= $radiusKm;
    }

    private function haversineKm(float $lat1, float $lng1, float $lat2, float $lng2): float
    {
        $R    = 6371.0;
        $dLat = deg2rad($lat2 - $lat1);
        $dLng = deg2rad($lng2 - $lng1);

        $a = sin($dLat / 2) ** 2
            + cos(deg2rad($lat1)) * cos(deg2rad($lat2)) * sin($dLng / 2) ** 2;

        return $R * 2 * asin(sqrt($a));
    }
}
