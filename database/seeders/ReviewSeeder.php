<?php

namespace Database\Seeders;

use App\Models\Review;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $reviews = [
            [
                'author_name'     => 'Ahmed El Mansouri',
                'author_location' => 'Gouda',
                'rating'          => 5,
                'content'         => 'Uitstekende service! De chauffeur was op tijd en zeer vriendelijk. De auto was schoon en comfortabel. Zeker een aanrader voor luchthavenverveer.',
                'source'          => 'google',
                'is_visible'      => true,
                'sort_order'      => 1,
            ],
            [
                'author_name'     => 'Petra van der Berg',
                'author_location' => 'Waddinxveen',
                'rating'          => 5,
                'content'         => 'Al meerdere keren gebruik gemaakt van YAS TaxiCentrale. Altijd stipt op tijd, vriendelijke chauffeurs en een eerlijke prijs. Mijn vaste taxi voor Schiphol!',
                'source'          => 'google',
                'is_visible'      => true,
                'sort_order'      => 2,
            ],
            [
                'author_name'     => 'Mark Janssen',
                'author_location' => 'Gouda',
                'rating'          => 5,
                'content'         => 'Zakelijk gebruik ik YAS regelmatig voor klantbezoeken in Rotterdam en Den Haag. Professioneel, betrouwbaar en de business class is echt top.',
                'source'          => 'google',
                'is_visible'      => true,
                'sort_order'      => 3,
            ],
            [
                'author_name'     => 'Fatima Benzakour',
                'author_location' => 'Gouda',
                'rating'          => 5,
                'content'         => 'Super vriendelijk en flexibel. Mijn vlucht had vertraging en ze wachtten gewoon op me. Dat is service! De prijs was ook heel redelijk.',
                'source'          => 'google',
                'is_visible'      => true,
                'sort_order'      => 4,
            ],
            [
                'author_name'     => 'Jan de Vries',
                'author_location' => 'Reeuwijk',
                'rating'          => 5,
                'content'         => 'Betrouwbare taxi service in de regio Gouda. Online boeken werkt prima en je krijgt altijd een bevestiging. Aanrader!',
                'source'          => 'manual',
                'is_visible'      => true,
                'sort_order'      => 5,
            ],
            [
                'author_name'     => 'Sophie Bakker',
                'author_location' => 'Bodegraven',
                'rating'          => 4,
                'content'         => 'Goede ervaring met YAS. Chauffeur was vriendelijk en het rijden was comfortabel. Zou zeker terugkomen.',
                'source'          => 'google',
                'is_visible'      => true,
                'sort_order'      => 6,
            ],
        ];

        foreach ($reviews as $review) {
            Review::create($review);
        }
    }
}
