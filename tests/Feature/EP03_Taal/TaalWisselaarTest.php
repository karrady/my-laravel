<?php

// EP-03 | Meertaligheid (NL / EN)
// F-03.1 | Taalwisselaar
// US-18 | Bezoeker schakelt tussen NL en EN
// US-19 | Taalkeuze wordt onthouden in sessie
// US-20 | Alle teksten zijn vertaald in de gekozen taal
// US-21 | Ongeldige taalcodes worden geweigerd

describe('F-03.1 | Taalwisselaar — weergave', function () {

    it('US-18 | homepage laadt correct', function () {
        $this->get('/')
            ->assertStatus(200);
    });

    it('US-18 | homepage bevat de SPA root', function () {
        $this->get('/')
            ->assertSee('id="root"', false);
    });

});

describe('F-03.1 | Taalwisselaar — schakelen (US-18)', function () {

    it('US-18 | POST /language/nl slaat locale nl op in sessie', function () {
        $this->post('/language/nl')
            ->assertRedirect()
            ->assertSessionHas('locale', 'nl');
    });

    it('US-18 | POST /language/en slaat locale en op in sessie', function () {
        $this->post('/language/en')
            ->assertRedirect()
            ->assertSessionHas('locale', 'en');
    });

});

describe('F-03.1 | Taalwisselaar — sessie (US-19)', function () {

    it('US-19 | pagina is bereikbaar met locale en', function () {
        $this->withSession(['locale' => 'en'])
            ->get('/')
            ->assertStatus(200);
    });

    it('US-19 | pagina is bereikbaar met locale nl', function () {
        $this->withSession(['locale' => 'nl'])
            ->get('/')
            ->assertStatus(200);
    });

});

describe('F-03.1 | Taalwisselaar — pagina\'s (US-20)', function () {

    it('US-20 | dienstenpagina is bereikbaar in beide talen', function () {
        $this->withSession(['locale' => 'nl'])->get('/diensten')->assertStatus(200);
        $this->withSession(['locale' => 'en'])->get('/diensten')->assertStatus(200);
    });

    it('US-20 | reserveringspagina is bereikbaar in beide talen', function () {
        $this->withSession(['locale' => 'nl'])->get('/reserveren')->assertStatus(200);
        $this->withSession(['locale' => 'en'])->get('/reserveren')->assertStatus(200);
    });

    it('US-20 | airport service pagina is bereikbaar in beide talen', function () {
        $this->withSession(['locale' => 'nl'])->get('/airport-service')->assertStatus(200);
        $this->withSession(['locale' => 'en'])->get('/airport-service')->assertStatus(200);
    });

});

describe('F-03.1 | Taalwisselaar — beveiliging (US-21)', function () {

    it('US-21 | ongeldige taalcode wordt genegeerd', function () {
        $this->post('/language/de')
            ->assertRedirect();

        $this->assertFalse(session()->has('locale') && session('locale') === 'de');
    });

    it('US-21 | onbekende taalcode stelt locale niet in', function () {
        $this->post('/language/fr');

        expect(session('locale'))->not->toBe('fr');
    });

    it('US-21 | homepage laadt zonder sessie locale', function () {
        $this->get('/')
            ->assertStatus(200);
    });

});
