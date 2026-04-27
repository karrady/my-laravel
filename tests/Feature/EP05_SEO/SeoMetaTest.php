<?php

// EP-05 | SEO & Performance
// F-05.1 | SEO Meta Tags
// US-26 | Unieke meta-titels per pagina
// US-27 | Structured data (Schema.org TaxiService)
// US-28 | Canonical URLs per pagina

describe('F-05.1 | SEO Meta Tags — titels (US-26)', function () {

    it('US-26 | homepage heeft een meta-titel', function () {
        $this->get('/')
            ->assertSee('<title>', false);
    });

    it('US-26 | dienstenpagina heeft een meta-titel', function () {
        $this->get('/diensten')
            ->assertSee('<title>', false);
    });

    it('US-26 | airport service pagina heeft een meta-titel', function () {
        $this->get('/airport-service')
            ->assertSee('<title>', false);
    });

    it('US-26 | over ons pagina heeft een meta-titel', function () {
        $this->get('/over-ons')
            ->assertSee('<title>', false);
    });

    it('US-26 | contactpagina heeft een meta-titel', function () {
        $this->get('/contact')
            ->assertSee('<title>', false);
    });

    it('US-26 | reserveringspagina heeft een meta-titel', function () {
        $this->get('/reserveren')
            ->assertSee('<title>', false);
    });

});

describe('F-05.1 | SEO Meta Tags — structured data (US-27)', function () {

    it('US-27 | homepage bevat LD+JSON structured data', function () {
        $this->get('/')
            ->assertSee('application/ld+json', false);
    });

    it('US-27 | structured data bevat TaxiService type', function () {
        $response = $this->get('/');
        $content  = $response->getContent();

        expect($content)->toContain('TaxiService');
    });

});

describe('F-05.1 | SEO Meta Tags — canonical URLs (US-28)', function () {

    it('US-28 | homepage bevat canonical link tag', function () {
        $this->get('/')
            ->assertSee('rel="canonical"', false);
    });

    it('US-28 | dienstenpagina bevat canonical link tag', function () {
        $this->get('/diensten')
            ->assertSee('rel="canonical"', false);
    });

    it('US-28 | airport service pagina bevat canonical link tag', function () {
        $this->get('/airport-service')
            ->assertSee('rel="canonical"', false);
    });

    it('US-28 | over ons pagina bevat canonical link tag', function () {
        $this->get('/over-ons')
            ->assertSee('rel="canonical"', false);
    });

    it('US-28 | contactpagina bevat canonical link tag', function () {
        $this->get('/contact')
            ->assertSee('rel="canonical"', false);
    });

    it('US-28 | reserveringspagina bevat canonical link tag', function () {
        $this->get('/reserveren')
            ->assertSee('rel="canonical"', false);
    });

});
