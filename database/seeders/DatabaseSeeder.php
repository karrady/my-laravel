<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            VehicleSeeder::class,
            FixedPriceSeeder::class,
            ReviewSeeder::class,
            FaqSeeder::class,
            ServiceAreaSeeder::class,
        ]);
    }
}
