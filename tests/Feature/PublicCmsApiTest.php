<?php

use App\Models\Faq;
use App\Models\FixedPrice;
use App\Models\Review;
use App\Models\ServiceArea;

describe('Public CMS API — FAQs', function () {

    it('geeft alleen gepubliceerde FAQs terug', function () {
        Faq::create([
            'question_nl' => 'Vraag 1?', 'answer_nl' => 'Antwoord 1.',
            'category'    => 'algemeen', 'sort_order' => 1,
            'is_visible'  => true, 'is_published' => true,
        ]);
        Faq::create([
            'question_nl' => 'Verborgen vraag?', 'answer_nl' => 'Verborgen.',
            'category'    => 'algemeen', 'sort_order' => 2,
            'is_visible'  => true, 'is_published' => false,
        ]);

        $response = $this->getJson('/api/v1/faqs');

        $response->assertOk();
        expect($response->json())->toHaveCount(1);
        expect($response->json()[0]['question_nl'])->toBe('Vraag 1?');
    });

    it('sorteert FAQs op sort_order', function () {
        Faq::create(['question_nl' => 'B?', 'answer_nl' => '.', 'sort_order' => 2, 'is_published' => true]);
        Faq::create(['question_nl' => 'A?', 'answer_nl' => '.', 'sort_order' => 1, 'is_published' => true]);

        $response = $this->getJson('/api/v1/faqs');

        expect($response->json()[0]['question_nl'])->toBe('A?');
        expect($response->json()[1]['question_nl'])->toBe('B?');
    });

});

describe('Public CMS API — Reviews', function () {

    it('geeft alleen gepubliceerde reviews terug', function () {
        Review::create([
            'author_name' => 'Jan', 'rating' => 5, 'content' => 'Top!',
            'source' => 'manual', 'is_visible' => true, 'is_published' => true,
        ]);
        Review::create([
            'author_name' => 'Verborgen', 'rating' => 1, 'content' => 'Slecht.',
            'source' => 'manual', 'is_visible' => true, 'is_published' => false,
        ]);

        $response = $this->getJson('/api/v1/reviews');

        $response->assertOk();
        expect($response->json())->toHaveCount(1);
        expect($response->json()[0]['author_name'])->toBe('Jan');
    });

});

describe('Public CMS API — Fixed Prices', function () {

    it('groepeert vaste prijzen per categorie', function () {
        FixedPrice::create([
            'from_label' => 'Gouda', 'from_lat' => 52.0, 'from_lng' => 4.7,
            'to_label'   => 'Schiphol', 'to_lat' => 52.3, 'to_lng' => 4.7,
            'sedan_cents' => 7500, 'business_cents' => 9500, 'taxibus_cents' => 12000,
            'is_active'   => true, 'category' => 'airport',
        ]);
        FixedPrice::create([
            'from_label' => 'Gouda', 'from_lat' => 52.0, 'from_lng' => 4.7,
            'to_label'   => 'Reeuwijk', 'to_lat' => 52.0, 'to_lng' => 4.7,
            'sedan_cents' => 1750, 'business_cents' => 2275, 'taxibus_cents' => 2890,
            'is_active'   => true, 'category' => 'local',
        ]);

        $response = $this->getJson('/api/v1/fixed-prices');

        $response->assertOk();
        expect($response->json())->toHaveKeys(['airport', 'local']);
        expect($response->json('airport'))->toHaveCount(1);
        expect($response->json('local'))->toHaveCount(1);
        expect($response->json('airport.0.to_label'))->toBe('Schiphol');
    });

});

describe('Public CMS API — Service Areas', function () {

    it('lijst geeft alleen gepubliceerde service-areas terug', function () {
        ServiceArea::create([
            'name' => 'Gouda', 'slug' => 'gouda', 'is_published' => true, 'sort_order' => 1,
        ]);
        ServiceArea::create([
            'name' => 'Geheim', 'slug' => 'geheim', 'is_published' => false, 'sort_order' => 2,
        ]);

        $response = $this->getJson('/api/v1/service-areas');

        $response->assertOk();
        expect($response->json())->toHaveCount(1);
        expect($response->json()[0]['slug'])->toBe('gouda');
    });

    it('detail geeft 200 terug voor een gepubliceerde service-area', function () {
        ServiceArea::create([
            'name' => 'Gouda', 'slug' => 'gouda', 'is_published' => true,
            'meta_title' => 'Taxi Gouda', 'hero_subtitle' => 'Sub',
        ]);

        $response = $this->getJson('/api/v1/service-areas/gouda');

        $response->assertOk();
        expect($response->json('slug'))->toBe('gouda');
        expect($response->json('meta_title'))->toBe('Taxi Gouda');
    });

    it('detail geeft 404 voor onbekende slug', function () {
        $this->getJson('/api/v1/service-areas/onbekende-stad')
            ->assertStatus(404);
    });

    it('detail geeft 404 voor niet-gepubliceerde service-area', function () {
        ServiceArea::create([
            'name' => 'Geheim', 'slug' => 'geheim', 'is_published' => false,
        ]);

        $this->getJson('/api/v1/service-areas/geheim')
            ->assertStatus(404);
    });

});
