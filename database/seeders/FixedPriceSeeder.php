<?php

namespace Database\Seeders;

use App\Models\FixedPrice;
use Illuminate\Database\Seeder;

class FixedPriceSeeder extends Seeder
{
    public function run(): void
    {
        $routes = [
            [
                'from_label'      => 'Gouda Centrum',
                'from_lat'        => 52.0116,
                'from_lng'        => 4.7111,
                'from_radius_km'  => 3.0,
                'to_label'        => 'Rotterdam Airport',
                'to_lat'          => 51.9569,
                'to_lng'          => 4.4375,
                'to_radius_km'    => 2.0,
                'sedan_cents'     => 6500,
                'business_cents'  => 8500,
                'taxibus_cents'   => 11000,
                'is_bidirectional' => true,
                'is_active'       => true,
            ],
            [
                'from_label'      => 'Gouda Centrum',
                'from_lat'        => 52.0116,
                'from_lng'        => 4.7111,
                'from_radius_km'  => 3.0,
                'to_label'        => 'Amsterdam Schiphol',
                'to_lat'          => 52.3105,
                'to_lng'          => 4.7683,
                'to_radius_km'    => 3.0,
                'sedan_cents'     => 10500,
                'business_cents'  => 13500,
                'taxibus_cents'   => 17000,
                'is_bidirectional' => true,
                'is_active'       => true,
            ],
            [
                'from_label'      => 'Gouda Centrum',
                'from_lat'        => 52.0116,
                'from_lng'        => 4.7111,
                'from_radius_km'  => 3.0,
                'to_label'        => 'Den Haag Centraal',
                'to_lat'          => 52.0799,
                'to_lng'          => 4.3113,
                'to_radius_km'    => 2.0,
                'sedan_cents'     => 5500,
                'business_cents'  => 7200,
                'taxibus_cents'   => 9500,
                'is_bidirectional' => true,
                'is_active'       => true,
            ],
            [
                'from_label'      => 'Gouda Centrum',
                'from_lat'        => 52.0116,
                'from_lng'        => 4.7111,
                'from_radius_km'  => 3.0,
                'to_label'        => 'Rotterdam Centraal',
                'to_lat'          => 51.9225,
                'to_lng'          => 4.4692,
                'to_radius_km'    => 2.0,
                'sedan_cents'     => 4500,
                'business_cents'  => 5800,
                'taxibus_cents'   => 7500,
                'is_bidirectional' => true,
                'is_active'       => true,
            ],
            [
                'from_label'      => 'Gouda Centraal',
                'from_lat'        => 52.0172,
                'from_lng'        => 4.7064,
                'from_radius_km'  => 0.5,
                'to_label'        => 'Utrecht Centraal',
                'to_lat'          => 52.0894,
                'to_lng'          => 5.1103,
                'to_radius_km'    => 2.0,
                'sedan_cents'     => 4800,
                'business_cents'  => 6200,
                'taxibus_cents'   => 8000,
                'is_bidirectional' => true,
                'is_active'       => true,
            ],
            [
                'from_label'      => 'Gouda Centrum',
                'from_lat'        => 52.0116,
                'from_lng'        => 4.7111,
                'from_radius_km'  => 3.0,
                'to_label'        => 'Eindhoven Airport',
                'to_lat'          => 51.4584,
                'to_lng'          => 5.3908,
                'to_radius_km'    => 2.0,
                'sedan_cents'     => 17500,
                'business_cents'  => 22000,
                'taxibus_cents'   => 28000,
                'is_bidirectional' => true,
                'is_active'       => true,
            ],
        ];

        foreach ($routes as $route) {
            FixedPrice::create($route);
        }
    }
}
