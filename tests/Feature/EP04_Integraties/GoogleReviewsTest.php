<?php

// EP-04 | Google Integraties
// F-04.1 | Google Reviews API
// US-22 | Beheerder toont echte Google Reviews
// US-23 | Bezoeker leest klantreviews
// US-24 | Lege staat bij API-fout

// Opmerking: Google Reviews API koppeling is gepland voor Sprint 3.
// Deze tests zijn voorbereid als specificatie en worden overgeslagen totdat
// de implementatie beschikbaar is.

describe('F-04.1 | Google Reviews API — weergave (US-22)', function () {

    it('US-22 | reviews sectie is aanwezig op de homepage', function () {
        $this->get('/')
            ->assertStatus(200)
            ->assertSee('reviews', false);
    })->todo('Sprint 3: Google Reviews API koppeling');

    it('US-22 | reviews worden geladen via Google Places API', function () {
        // TODO: mock Google Places API response
    })->todo('Sprint 3: Google Reviews API koppeling');

})->skip('Sprint 3: Google Reviews API niet geïmplementeerd');

describe('F-04.1 | Google Reviews API — inhoud (US-23)', function () {

    it('US-23 | reviewkaarten tonen naam van de reviewer', function () {
        // TODO: mock API, assert reviewer name is visible
    })->todo('Sprint 3: Google Reviews API koppeling');

    it('US-23 | reviewkaarten tonen sterrenscore', function () {
        // TODO: mock API, assert star rating is visible
    })->todo('Sprint 3: Google Reviews API koppeling');

    it('US-23 | reviewkaarten tonen recensietekst', function () {
        // TODO: mock API, assert review text is visible
    })->todo('Sprint 3: Google Reviews API koppeling');

})->skip('Sprint 3: Google Reviews API niet geïmplementeerd');

describe('F-04.1 | Google Reviews API — foutafhandeling (US-24)', function () {

    it('US-24 | lege staat wordt getoond bij API-fout', function () {
        $this->get('/')
            ->assertStatus(200);
    });

    it('US-24 | geen foutmelding zichtbaar voor bezoeker bij API-fout', function () {
        // TODO: mock API error, assert no exception visible to user
    })->todo('Sprint 3: Google Reviews API koppeling');

})->skip('Sprint 3: Google Reviews API niet geïmplementeerd');
