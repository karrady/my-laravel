<?php

namespace Database\Seeders;

use App\Models\Vehicle;
use Illuminate\Database\Seeder;

class VehicleSeeder extends Seeder
{
    public function run(): void
    {
        $vehicles = [
            [
                'type'               => 'sedan',
                'name'               => 'Comfort Sedan',
                'description'        => 'Comfortabele en stijlvolle sedan voor uw dagelijkse ritten.',
                'max_passengers'     => 4,
                'base_price_cents'   => 500,
                'price_per_km_cents' => 195,
                'min_price_cents'    => 1500,
                'features'           => ['Airconditioning', 'Gratis wifi', 'Stille airco', 'USB oplaadpunt'],
                'sort_order'         => 1,
            ],
            [
                'type'               => 'business',
                'name'               => 'Business Class',
                'description'        => 'Luxe business voertuig voor zakelijke reizigers.',
                'max_passengers'     => 3,
                'base_price_cents'   => 750,
                'price_per_km_cents' => 245,
                'min_price_cents'    => 2000,
                'features'           => ['Premium interieur', 'Gratis wifi', 'Water & snoep', 'USB oplaadpunt', 'Stille airco'],
                'sort_order'         => 2,
            ],
            [
                'type'               => 'taxibus',
                'name'               => 'Taxi Bus',
                'description'        => 'Ruime taxibus voor groepen en grote bagage.',
                'max_passengers'     => 8,
                'base_price_cents'   => 1000,
                'price_per_km_cents' => 275,
                'min_price_cents'    => 2500,
                'features'           => ['8 passagiers', 'Veel bagageruimte', 'Airconditioning', 'USB oplaadpunt'],
                'sort_order'         => 3,
            ],
        ];

        foreach ($vehicles as $data) {
            Vehicle::updateOrCreate(['type' => $data['type']], $data);
        }
    }
}
