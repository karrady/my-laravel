<?php

use App\Models\ContactMessage;

// EP-02 | Formulierverwerking & Communicatie
// F-02.2 | Contactformulier
// US-14 | Bezoeker stuurt een contactbericht
// US-15 | Validatiefouten bij ongeldig contactformulier

describe('F-02.2 | Contactformulier — weergave', function () {

    it('US-14 | contactpagina laadt correct', function () {
        $this->get('/contact')
            ->assertStatus(200);
    });

    it('US-14 | contactpagina bevat de SPA root', function () {
        $this->get('/contact')
            ->assertSee('id="root"', false);
    });

});

describe('F-02.2 | Contactformulier — happy path (US-14)', function () {

    it('US-14 | geldig contactbericht wordt opgeslagen in de database', function () {
        $this->post('/contact', geldigContactData())
            ->assertRedirect('/contact');

        $this->assertDatabaseHas('contact_messages', [
            'name'    => 'Maria Bakker',
            'email'   => 'maria@example.nl',
            'subject' => 'Vraag over tarieven',
        ]);
    });

    it('US-14 | bericht wordt aangemaakt in de database', function () {
        $this->post('/contact', geldigContactData());

        $this->assertDatabaseCount('contact_messages', 1);
    });

    it('US-14 | telefoonnummer is optioneel', function () {
        $data = geldigContactData();
        unset($data['phone']);

        $this->post('/contact', $data)
            ->assertRedirect('/contact');

        $this->assertDatabaseCount('contact_messages', 1);
    });

    it('US-14 | bericht wordt correct opgeslagen met telefoonnummer', function () {
        $this->post('/contact', geldigContactData());

        expect(ContactMessage::first()->phone)->toBe('+31 6 98765432');
    });

});

describe('F-02.2 | Contactformulier — validatie (US-15)', function () {

    it('US-15 | naam is verplicht', function () {
        $this->post('/contact', geldigContactData(['name' => '']))
            ->assertSessionHasErrors('name');

        $this->assertDatabaseCount('contact_messages', 0);
    });

    it('US-15 | e-mailadres is verplicht', function () {
        $this->post('/contact', geldigContactData(['email' => '']))
            ->assertSessionHasErrors('email');
    });

    it('US-15 | e-mailadres moet geldig formaat hebben', function () {
        $this->post('/contact', geldigContactData(['email' => 'geen-geldig-email']))
            ->assertSessionHasErrors('email');
    });

    it('US-15 | onderwerp is verplicht', function () {
        $this->post('/contact', geldigContactData(['subject' => '']))
            ->assertSessionHasErrors('subject');
    });

    it('US-15 | bericht is verplicht', function () {
        $this->post('/contact', geldigContactData(['message' => '']))
            ->assertSessionHasErrors('message');
    });

    it('US-15 | telefoonnummer is niet verplicht', function () {
        $this->post('/contact', geldigContactData(['phone' => '']))
            ->assertRedirect('/contact')
            ->assertSessionHasNoErrors();
    });

    it('US-15 | leeg formulier geeft meerdere validatiefouten', function () {
        $this->post('/contact', [])
            ->assertSessionHasErrors(['name', 'email', 'subject', 'message']);
    });

});

// ─── Helper functies ──────────────────────────────────────────────────────────

function geldigContactData(array $overschrijf = []): array
{
    return array_merge([
        'name'    => 'Maria Bakker',
        'email'   => 'maria@example.nl',
        'phone'   => '+31 6 98765432',
        'subject' => 'Vraag over tarieven',
        'message' => 'Goedemiddag, ik heb een vraag over uw tarieven voor luchthavenvervoer.',
    ], $overschrijf);
}
