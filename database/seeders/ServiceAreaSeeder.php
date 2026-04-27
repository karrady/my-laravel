<?php

namespace Database\Seeders;

use App\Models\ServiceArea;
use Illuminate\Database\Seeder;

class ServiceAreaSeeder extends Seeder
{
    public function run(): void
    {
        $areas = [
            ['name' => 'Gouda',        'slug' => 'gouda',        'lat' => 52.0116, 'lng' => 4.7111, 'description_short' => 'Taxi in Gouda',        'sort_order' => 1],
            ['name' => 'Waddinxveen',  'slug' => 'waddinxveen',  'lat' => 52.0414, 'lng' => 4.6536, 'description_short' => 'Taxi in Waddinxveen',  'sort_order' => 2],
            ['name' => 'Reeuwijk',     'slug' => 'reeuwijk',     'lat' => 52.0344, 'lng' => 4.7358, 'description_short' => 'Taxi in Reeuwijk',     'sort_order' => 3],
            ['name' => 'Bodegraven',   'slug' => 'bodegraven',   'lat' => 52.0816, 'lng' => 4.7440, 'description_short' => 'Taxi in Bodegraven',   'sort_order' => 4],
            ['name' => 'Boskoop',      'slug' => 'boskoop',      'lat' => 52.0757, 'lng' => 4.6577, 'description_short' => 'Taxi in Boskoop',      'sort_order' => 5],
            ['name' => 'Woerden',      'slug' => 'woerden',      'lat' => 52.0876, 'lng' => 4.8895, 'description_short' => 'Taxi in Woerden',      'sort_order' => 6],
            ['name' => 'Alphen aan den Rijn', 'slug' => 'alphen-aan-den-rijn', 'lat' => 52.1282, 'lng' => 4.6574, 'description_short' => 'Taxi in Alphen', 'sort_order' => 7],
            ['name' => 'Zoetermeer',   'slug' => 'zoetermeer',   'lat' => 52.0574, 'lng' => 4.4940, 'description_short' => 'Taxi in Zoetermeer',  'sort_order' => 8],
        ];

        foreach ($areas as $area) {
            ServiceArea::updateOrCreate(['slug' => $area['slug']], array_merge($area, ['is_visible' => true]));
        }
    }
}
