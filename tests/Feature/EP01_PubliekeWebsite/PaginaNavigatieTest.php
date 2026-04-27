<?php

// EP-01 | Publieke Website & Gebruikerservaring
// F-01.1 | Pagina-navigatie
// F-01.2 | Hero sectie
// F-01.3 | Diensten Overzicht

describe('F-01.1 | Pagina-navigatie', function () {

    it('US-01 | laadt de homepage succesvol', function () {
        $this->get('/')
            ->assertStatus(200);
    });

    it('US-01 | homepage bevat de SPA container', function () {
        $this->get('/')
            ->assertSee('id="root"', false);
    });

    it('US-01 | homepage bevat de merknaam', function () {
        $this->get('/')
            ->assertSee('TaxiCentrale', false);
    });

    it('US-02 | laadt de dienstenpagina succesvol', function () {
        $this->get('/diensten')
            ->assertStatus(200);
    });

    it('US-03 | laadt de airport service pagina succesvol', function () {
        $this->get('/airport-service')
            ->assertStatus(200);
    });

    it('US-04 | laadt de over ons pagina succesvol', function () {
        $this->get('/over-ons')
            ->assertStatus(200);
    });

    it('US-05 | laadt de contactpagina succesvol', function () {
        $this->get('/contact')
            ->assertStatus(200);
    });

    it('US-06 | laadt de reserveringspagina succesvol', function () {
        $this->get('/reserveren')
            ->assertStatus(200);
    });

    it('US-01 | niet-bestaande pagina geeft 404', function () {
        $this->get('/pagina-bestaat-niet')
            ->assertStatus(404);
    });

});

describe('F-01.2 | Hero sectie', function () {

    it('US-07 | homepage SPA bevat de React root div', function () {
        $this->get('/')
            ->assertSee('<div id="root">', false);
    });

    it('US-07 | homepage bevat SEO meta-beschrijving', function () {
        $this->get('/')
            ->assertSee('<meta name="description"', false);
    });

    it('US-08 | homepage bevat canonical link tag', function () {
        $this->get('/')
            ->assertSee('<link rel="canonical"', false);
    });

});

describe('F-01.3 | Diensten Overzicht op homepage', function () {

    it('US-09 | reserveringspagina laadt correct', function () {
        $this->get('/reserveren')
            ->assertStatus(200);
    });

    it('US-09 | homepage bevat taxiservice structured data', function () {
        $this->get('/')
            ->assertSee('TaxiService', false);
    });

    it('US-09 | dienstenpagina laadt correct', function () {
        $this->get('/diensten')
            ->assertStatus(200);
    });

    it('US-09 | airport service pagina laadt correct', function () {
        $this->get('/airport-service')
            ->assertStatus(200);
    });

});
