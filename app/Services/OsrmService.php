<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;

class OsrmService
{
    private const BASE_URL = 'https://router.project-osrm.org/route/v1/driving';

    public function getRoute(float $fromLat, float $fromLng, float $toLat, float $toLng): ?array
    {
        $url = sprintf(
            '%s/%f,%f;%f,%f?overview=false',
            self::BASE_URL,
            $fromLng, $fromLat,
            $toLng,   $toLat,
        );

        $response = Http::timeout(8)->get($url);

        if (! $response->ok()) {
            return null;
        }

        $data = $response->json();

        if (($data['code'] ?? '') !== 'Ok' || empty($data['routes'])) {
            return null;
        }

        $route = $data['routes'][0];

        return [
            'distance_km'  => (int) round($route['distance'] / 1000),
            'duration_min' => (int) round($route['duration'] / 60),
        ];
    }
}
