<?php

namespace Database\Seeders;

use App\Models\ServiceArea;
use Illuminate\Database\Seeder;

class ServiceAreaSeeder extends Seeder
{
    public function run(): void
    {
        $areas = [
            [
                'name'              => 'Gouda',
                'slug'              => 'gouda',
                'lat'               => 52.0116,
                'lng'               => 4.7111,
                'description_short' => 'Taxi in Gouda',
                'sort_order'        => 1,
                'meta_title'        => 'Taxi Gouda | YAS TaxiCentrale - Vaste tarieven & 24/7',
                'meta_description'  => 'Betrouwbare taxi in Gouda met vaste tarieven, vluchtvolging en 24/7 beschikbaarheid. Boek online of bel direct voor luchthavenvervoer of zakelijk vervoer.',
                'hero_subtitle'     => 'Uw vaste taxi in Gouda - 24/7, met vaste tarieven en zonder verrassingen.',
                'intro_html'        => '<p>YAS TaxiCentrale is uw lokale taxipartner in <strong>Gouda</strong>. Of u nu naar Schiphol moet, een zakelijke afspraak heeft in Rotterdam, of gewoon snel naar het centrum wilt: wij staan klaar.</p><p>Met onze vaste tarieven weet u vooraf wat u betaalt - geen meter, geen verrassingen.</p>',
                'popular_routes'    => [
                    ['from' => 'Gouda', 'to' => 'Amsterdam Schiphol', 'price_eur' => 75],
                    ['from' => 'Gouda', 'to' => 'Rotterdam The Hague Airport', 'price_eur' => 65],
                    ['from' => 'Gouda', 'to' => 'Rotterdam Centraal', 'price_eur' => 52.5],
                    ['from' => 'Gouda', 'to' => 'Den Haag Centraal', 'price_eur' => 70],
                ],
                'is_published'      => true,
            ],
            [
                'name'              => 'Waddinxveen',
                'slug'              => 'waddinxveen',
                'lat'               => 52.0414,
                'lng'               => 4.6536,
                'description_short' => 'Taxi in Waddinxveen',
                'sort_order'        => 2,
                'meta_title'        => 'Taxi Waddinxveen | YAS TaxiCentrale - Vaste prijzen',
                'meta_description'  => 'Vaste taxi tarieven vanuit Waddinxveen naar Schiphol, Rotterdam Airport en alle bestemmingen in Nederland. Ervaren chauffeurs, schone autos.',
                'hero_subtitle'     => 'Vanuit Waddinxveen comfortabel naar elke bestemming.',
                'intro_html'        => '<p>Wij rijden dagelijks vanuit <strong>Waddinxveen</strong> naar Schiphol, Rotterdam Airport en andere bestemmingen. Ophalen aan huis, op tijd, voor een vaste prijs.</p>',
                'popular_routes'    => [
                    ['from' => 'Waddinxveen', 'to' => 'Amsterdam Schiphol', 'price_eur' => 75],
                    ['from' => 'Waddinxveen', 'to' => 'Rotterdam The Hague Airport', 'price_eur' => 75],
                    ['from' => 'Waddinxveen', 'to' => 'Gouda', 'price_eur' => 17.5],
                ],
                'is_published'      => true,
            ],
            [
                'name'              => 'Reeuwijk',
                'slug'              => 'reeuwijk',
                'lat'               => 52.0344,
                'lng'               => 4.7358,
                'description_short' => 'Taxi in Reeuwijk',
                'sort_order'        => 3,
                'meta_title'        => 'Taxi Reeuwijk | YAS TaxiCentrale',
                'meta_description'  => 'Lokale taxi in Reeuwijk en omgeving. Vaste prijzen naar Schiphol, Rotterdam Airport en regio Gouda. Bel ons of boek online.',
                'hero_subtitle'     => 'Taxi vanuit Reeuwijk - lokaal en betrouwbaar.',
                'intro_html'        => '<p>Vanuit het pittoreske <strong>Reeuwijk</strong> brengen wij u zonder zorgen naar uw bestemming. Vaste tarieven, ook voor de Reeuwijkse Plassen route.</p>',
                'popular_routes'    => [
                    ['from' => 'Reeuwijk', 'to' => 'Amsterdam Schiphol', 'price_eur' => 75],
                    ['from' => 'Reeuwijk', 'to' => 'Rotterdam The Hague Airport', 'price_eur' => 75],
                    ['from' => 'Reeuwijk', 'to' => 'Gouda', 'price_eur' => 17.5],
                ],
                'is_published'      => true,
            ],
            [
                'name'              => 'Bodegraven',
                'slug'              => 'bodegraven',
                'lat'               => 52.0816,
                'lng'               => 4.7440,
                'description_short' => 'Taxi in Bodegraven',
                'sort_order'        => 4,
                'meta_title'        => 'Taxi Bodegraven | YAS TaxiCentrale',
                'meta_description'  => 'Taxi in Bodegraven met vluchtvolging en vaste prijzen. 24/7 bereikbaar voor luchthavenvervoer en zakelijk transport.',
                'hero_subtitle'     => 'Vaste taxi in Bodegraven - altijd op tijd.',
                'intro_html'        => '<p>YAS TaxiCentrale rijdt regelmatig vanuit <strong>Bodegraven</strong> naar Schiphol en Rotterdam Airport. Dankzij onze vluchtvolging weten wij precies wanneer u landt.</p>',
                'popular_routes'    => [
                    ['from' => 'Bodegraven', 'to' => 'Amsterdam Schiphol', 'price_eur' => 75],
                    ['from' => 'Bodegraven', 'to' => 'Rotterdam The Hague Airport', 'price_eur' => 85],
                    ['from' => 'Bodegraven', 'to' => 'Gouda', 'price_eur' => 32.5],
                ],
                'is_published'      => true,
            ],
            [
                'name'              => 'Boskoop',
                'slug'              => 'boskoop',
                'lat'               => 52.0757,
                'lng'               => 4.6577,
                'description_short' => 'Taxi in Boskoop',
                'sort_order'        => 5,
                'meta_title'        => 'Taxi Boskoop | YAS TaxiCentrale',
                'meta_description'  => 'Taxiservice in Boskoop voor luchthaventransfers, zakelijke ritten en lokaal vervoer. Vaste prijzen en ervaren chauffeurs.',
                'hero_subtitle'     => 'Taxi Boskoop - voor zaken, plezier en luchthaventransfers.',
                'intro_html'        => '<p>Of u nu een afspraak heeft in Den Haag of een vlucht moet halen op Schiphol: vanuit <strong>Boskoop</strong> brengen wij u snel en comfortabel naar uw bestemming.</p>',
                'popular_routes'    => [
                    ['from' => 'Boskoop', 'to' => 'Amsterdam Schiphol', 'price_eur' => 75],
                    ['from' => 'Boskoop', 'to' => 'Rotterdam The Hague Airport', 'price_eur' => 90],
                    ['from' => 'Boskoop', 'to' => 'Gouda', 'price_eur' => 27.5],
                ],
                'is_published'      => true,
            ],
            [
                'name'              => 'Woerden',
                'slug'              => 'woerden',
                'lat'               => 52.0876,
                'lng'               => 4.8895,
                'description_short' => 'Taxi in Woerden',
                'sort_order'        => 6,
                'meta_title'        => 'Taxi Woerden | YAS TaxiCentrale',
                'meta_description'  => 'Vaste taxiservice in Woerden naar Schiphol, Rotterdam, Utrecht en Amsterdam. Online boeken of bellen voor directe ritten.',
                'hero_subtitle'     => 'Taxi Woerden - betrouwbaar en op tijd.',
                'intro_html'        => '<p>Vanuit <strong>Woerden</strong> rijden wij dagelijks naar Schiphol, Utrecht en andere bestemmingen. Vraag direct een prijs op of boek online voor een gegarandeerde rit.</p>',
                'popular_routes'    => [
                    ['from' => 'Woerden', 'to' => 'Amsterdam Schiphol', 'price_eur' => 80],
                    ['from' => 'Woerden', 'to' => 'Utrecht Centraal', 'price_eur' => 35],
                    ['from' => 'Woerden', 'to' => 'Gouda', 'price_eur' => 50],
                ],
                'is_published'      => true,
            ],
            [
                'name'              => 'Alphen aan den Rijn',
                'slug'              => 'alphen-aan-den-rijn',
                'lat'               => 52.1282,
                'lng'               => 4.6574,
                'description_short' => 'Taxi in Alphen aan den Rijn',
                'sort_order'        => 7,
                'meta_title'        => 'Taxi Alphen aan den Rijn | YAS TaxiCentrale',
                'meta_description'  => 'Taxi in Alphen aan den Rijn voor luchthaventransfers, zakelijk vervoer en lokale ritten. Vaste tarieven, vluchtvolging en 24/7 service.',
                'hero_subtitle'     => 'Taxi Alphen aan den Rijn - 24/7 in de buurt.',
                'intro_html'        => '<p>YAS TaxiCentrale verzorgt uw vervoer vanuit <strong>Alphen aan den Rijn</strong> naar elke bestemming in Nederland en daarbuiten. Voor zaken of vrije tijd: wij staan klaar.</p>',
                'popular_routes'    => [
                    ['from' => 'Alphen aan den Rijn', 'to' => 'Amsterdam Schiphol', 'price_eur' => 75],
                    ['from' => 'Alphen aan den Rijn', 'to' => 'Rotterdam The Hague Airport', 'price_eur' => 75],
                    ['from' => 'Alphen aan den Rijn', 'to' => 'Gouda', 'price_eur' => 45],
                ],
                'is_published'      => true,
            ],
            [
                'name'              => 'Zoetermeer',
                'slug'              => 'zoetermeer',
                'lat'               => 52.0574,
                'lng'               => 4.4940,
                'description_short' => 'Taxi in Zoetermeer',
                'sort_order'        => 8,
                'meta_title'        => 'Taxi Zoetermeer | YAS TaxiCentrale',
                'meta_description'  => 'Taxi vanuit Zoetermeer naar Schiphol, Rotterdam Airport, Den Haag en omgeving. Vaste prijzen, comfortabele autos en stipt op tijd.',
                'hero_subtitle'     => 'Taxi Zoetermeer - vaste prijzen, geen verrassingen.',
                'intro_html'        => '<p>Wij rijden vanuit <strong>Zoetermeer</strong> dagelijks naar Schiphol, Rotterdam en Den Haag. Boek vooraf een vaste prijs of bel ons voor een spoedrit.</p>',
                'popular_routes'    => [
                    ['from' => 'Zoetermeer', 'to' => 'Amsterdam Schiphol', 'price_eur' => 80],
                    ['from' => 'Zoetermeer', 'to' => 'Rotterdam The Hague Airport', 'price_eur' => 70],
                    ['from' => 'Zoetermeer', 'to' => 'Gouda', 'price_eur' => 37.5],
                ],
                'is_published'      => true,
            ],
        ];

        foreach ($areas as $area) {
            ServiceArea::updateOrCreate(
                ['slug' => $area['slug']],
                array_merge($area, ['is_visible' => true])
            );
        }
    }
}
