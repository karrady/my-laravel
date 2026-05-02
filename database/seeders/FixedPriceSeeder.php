<?php

namespace Database\Seeders;

use App\Models\FixedPrice;
use Illuminate\Database\Seeder;

class FixedPriceSeeder extends Seeder
{
    public function run(): void
    {
        // Originele coordinate-based routes (gebruikt door de price-engine)
        $coordinateRoutes = [
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
                'category'        => 'airport',
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
                'category'        => 'airport',
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
                'category'        => 'local',
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
                'category'        => 'local',
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
                'category'        => 'local',
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
                'category'        => 'airport',
            ],
        ];

        foreach ($coordinateRoutes as $route) {
            FixedPrice::updateOrCreate(
                [
                    'from_label' => $route['from_label'],
                    'to_label'   => $route['to_label'],
                ],
                $route
            );
        }

        // Lokale Gouda routes — voorheen hardcoded in resources/js/pages/diensten.tsx
        // Prijzen zijn in euros (sedan-baseline). Business/taxibus zijn afgeleid (×1.3 / ×1.65).
        $localRoutes = [
            ['to' => 'Gouda',                       'eur' => 10],
            ['to' => 'Reeuwijk',                    'eur' => 17.5],
            ['to' => 'Reeuwijk Brug',               'eur' => 20],
            ['to' => 'Haastrecht',                  'eur' => 20],
            ['to' => 'Stolwijk',                    'eur' => 17.5],
            ['to' => 'Bergambacht',                 'eur' => 25],
            ['to' => 'Driebruggen',                 'eur' => 25],
            ['to' => 'Nieuwerbrug',                 'eur' => 27.5],
            ['to' => 'Boskoop',                     'eur' => 27.5],
            ['to' => 'Gouderak',                    'eur' => 17.5],
            ['to' => 'Moordrecht',                  'eur' => 17.5],
            ['to' => 'Waddinxveen',                 'eur' => 17.5],
            ['to' => 'Moerkapelle',                 'eur' => 30],
            ['to' => 'Bodegraven',                  'eur' => 32.5],
            ['to' => 'Nieuwerkerk a/d IJssel',      'eur' => 35],
            ['to' => 'Ouderkerk a/d IJssel',        'eur' => 35],
            ['to' => 'Oudewater',                   'eur' => 35],
            ['to' => 'Zoetermeer',                  'eur' => 37.5],
            ['to' => 'Schoonhoven',                 'eur' => 40],
            ['to' => 'Lekkerkerk',                  'eur' => 40],
            ['to' => 'Capelle a/d IJssel',          'eur' => 40],
            ['to' => 'Krimpen a/d IJssel',          'eur' => 42.5],
            ['to' => 'Montfoort',                   'eur' => 42.5],
            ['to' => 'Alphen a/d Rijn',             'eur' => 45],
            ['to' => 'Rotterdam Alexander',         'eur' => 47.5],
            ['to' => 'Woerden',                     'eur' => 50],
            ['to' => 'Rotterdam Zuid',              'eur' => 62.5],
            ['to' => 'Amsterdam Centraal',          'eur' => 110],
            ['to' => 'Antwerpen',                   'eur' => 175],
        ];

        foreach ($localRoutes as $route) {
            $sedanCents    = (int) round($route['eur'] * 100);
            $businessCents = (int) round($sedanCents * 1.3);
            $taxibusCents  = (int) round($sedanCents * 1.65);

            FixedPrice::updateOrCreate(
                [
                    'from_label' => 'Gouda',
                    'to_label'   => $route['to'],
                ],
                [
                    'from_label'       => 'Gouda',
                    'from_lat'         => 52.0116,
                    'from_lng'         => 4.7111,
                    'from_radius_km'   => 5,
                    'to_label'         => $route['to'],
                    'to_lat'           => 52.0116, // generic placeholder; matching gebeurt via label
                    'to_lng'           => 4.7111,
                    'to_radius_km'     => 5,
                    'sedan_cents'      => $sedanCents,
                    'business_cents'   => $businessCents,
                    'taxibus_cents'    => $taxibusCents,
                    'is_bidirectional' => true,
                    'is_active'        => true,
                    'category'         => 'local',
                ]
            );
        }

        // Schiphol airport prijzen — voorheen hardcoded in resources/js/pages/airport-service.tsx
        $schipholRoutes = [
            ['from' => 'Ammerstol',                'eur' => 105],
            ['from' => 'Bergambacht',              'eur' => 95],
            ['from' => 'Berkenwoude',              'eur' => 100],
            ['from' => 'Bodegraven',               'eur' => 75],
            ['from' => 'Boskoop',                  'eur' => 75],
            ['from' => 'Gouderak',                 'eur' => 90],
            ['from' => 'Haastrecht',               'eur' => 90],
            ['from' => 'Krimpen a/d IJssel',       'eur' => 120],
            ['from' => 'Lekkerkerk',               'eur' => 120],
            ['from' => 'Moordrecht',               'eur' => 85],
            ['from' => 'Nieuwerkerk a/d IJssel',   'eur' => 100],
            ['from' => 'Ouderkerk a/d IJssel',     'eur' => 110],
            ['from' => 'Oudewater',                'eur' => 110],
            ['from' => 'Reeuwijk',                 'eur' => 75],
            ['from' => 'Reeuwijk Sluipwijk',       'eur' => 85],
            ['from' => 'Schoonhoven',              'eur' => 115],
            ['from' => 'Stolwijk',                 'eur' => 90],
            ['from' => 'Vlist',                    'eur' => 100],
            ['from' => 'Waddinxveen',              'eur' => 75],
            ['from' => 'Waddinxveen Zuidplas',     'eur' => 80],
            ['from' => 'Zevenhuizen / Moerkapelle', 'eur' => 100],
        ];

        foreach ($schipholRoutes as $route) {
            $sedanCents    = (int) round($route['eur'] * 100);
            $businessCents = (int) round($sedanCents * 1.3);
            $taxibusCents  = (int) round($sedanCents * 1.65);

            FixedPrice::updateOrCreate(
                [
                    'from_label' => $route['from'],
                    'to_label'   => 'Amsterdam Schiphol',
                ],
                [
                    'from_label'       => $route['from'],
                    'from_lat'         => 52.0116,
                    'from_lng'         => 4.7111,
                    'from_radius_km'   => 5,
                    'to_label'         => 'Amsterdam Schiphol',
                    'to_lat'           => 52.3105,
                    'to_lng'           => 4.7683,
                    'to_radius_km'     => 3,
                    'sedan_cents'      => $sedanCents,
                    'business_cents'   => $businessCents,
                    'taxibus_cents'    => $taxibusCents,
                    'is_bidirectional' => true,
                    'is_active'        => true,
                    'category'         => 'airport',
                ]
            );
        }

        // Rotterdam The Hague Airport prijzen — voorheen hardcoded
        $rotterdamRoutes = [
            ['from' => 'Ammerstol',                'eur' => 90],
            ['from' => 'Bergambacht',              'eur' => 85],
            ['from' => 'Berkenwoude',              'eur' => 90],
            ['from' => 'Bodegraven',               'eur' => 85],
            ['from' => 'Boskoop',                  'eur' => 90],
            ['from' => 'Gouderak',                 'eur' => 75],
            ['from' => 'Haastrecht',               'eur' => 75],
            ['from' => 'Krimpen a/d IJssel',       'eur' => 90],
            ['from' => 'Lekkerkerk',               'eur' => 90],
            ['from' => 'Moordrecht',               'eur' => 65],
            ['from' => 'Moerkapelle',              'eur' => 85],
            ['from' => 'Nieuwerkerk a/d IJssel',   'eur' => 65],
            ['from' => 'Ouderkerk a/d IJssel',     'eur' => 90],
            ['from' => 'Oudewater',                'eur' => 105],
            ['from' => 'Reeuwijk',                 'eur' => 75],
            ['from' => 'Reeuwijk Sluipwijk',       'eur' => 85],
            ['from' => 'Schoonhoven',              'eur' => 105],
            ['from' => 'Stolwijk',                 'eur' => 80],
            ['from' => 'Vlist',                    'eur' => 85],
            ['from' => 'Waddinxveen',              'eur' => 75],
            ['from' => 'Waddinxveen Noord',        'eur' => 80],
            ['from' => 'Zevenhuizen',              'eur' => 80],
        ];

        foreach ($rotterdamRoutes as $route) {
            $sedanCents    = (int) round($route['eur'] * 100);
            $businessCents = (int) round($sedanCents * 1.3);
            $taxibusCents  = (int) round($sedanCents * 1.65);

            FixedPrice::updateOrCreate(
                [
                    'from_label' => $route['from'],
                    'to_label'   => 'Rotterdam The Hague Airport',
                ],
                [
                    'from_label'       => $route['from'],
                    'from_lat'         => 52.0116,
                    'from_lng'         => 4.7111,
                    'from_radius_km'   => 5,
                    'to_label'         => 'Rotterdam The Hague Airport',
                    'to_lat'           => 51.9569,
                    'to_lng'           => 4.4375,
                    'to_radius_km'     => 2,
                    'sedan_cents'      => $sedanCents,
                    'business_cents'   => $businessCents,
                    'taxibus_cents'    => $taxibusCents,
                    'is_bidirectional' => true,
                    'is_active'        => true,
                    'category'         => 'airport',
                ]
            );
        }
    }
}
