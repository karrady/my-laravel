<?php

use App\Models\Booking;
use App\Services\PriceCalculator;

// EP-02 | Formulierverwerking & Communicatie
// F-02.1 | Reserveringsformulier
// US-10 | Klant reserveert een rit
// US-11 | Validatiefouten bij ongeldig formulier

describe('F-02.1 | Reserveringspagina — weergave', function () {

    it('US-06 | reserveringspagina laadt correct', function () {
        $this->get('/reserveren')
            ->assertStatus(200);
    });

});

describe('F-02.1 | Reserverings-API — happy path', function () {

    beforeEach(function () {
        $this->instance(PriceCalculator::class, new class extends PriceCalculator {
            public function __construct() {}
            public function calculate(float $fromLat, float $fromLng, float $toLat, float $toLng, string $vehicleType, bool $hasReturn = false): ?array {
                return [
                    'price_cents'        => 6500,
                    'return_price_cents' => null,
                    'distance_km'        => 42,
                    'duration_min'       => 38,
                    'is_fixed'           => false,
                ];
            }
        });
    });

    it('US-10 | geldige boeking wordt opgeslagen in de database', function () {
        $this->postJson('/api/v1/bookings', geldigeApiBoekingData())
            ->assertStatus(201);

        $this->assertDatabaseHas('bookings', [
            'customer_name'       => 'Jan Janssen',
            'customer_email'      => 'jan@example.nl',
            'pickup_address'      => 'Markt 1, Gouda',
            'destination_address' => 'Schiphol, Amsterdam',
        ]);
    });

    it('US-10 | boekingnummer wordt aangemaakt', function () {
        $response = $this->postJson('/api/v1/bookings', geldigeApiBoekingData())
            ->assertStatus(201);

        $bookingNumber = $response->json('booking_number');
        expect($bookingNumber)->toStartWith('YAS-');
    });

    it('US-10 | boeking krijgt standaard status "pending"', function () {
        $this->postJson('/api/v1/bookings', geldigeApiBoekingData())
            ->assertStatus(201);

        expect(Booking::first()->status)->toBe('pending');
    });

    it('US-10 | opmerkingen zijn optioneel', function () {
        $data = geldigeApiBoekingData();
        unset($data['notes']);

        $this->postJson('/api/v1/bookings', $data)
            ->assertStatus(201);

        $this->assertDatabaseCount('bookings', 1);
    });

});

describe('F-02.1 | Reserverings-API — validatie (US-11)', function () {

    it('US-11 | naam is verplicht', function () {
        $data = geldigeApiBoekingData(['customer_name' => '']);

        $this->postJson('/api/v1/bookings', $data)
            ->assertStatus(422)
            ->assertJsonValidationErrors('customer_name');

        $this->assertDatabaseCount('bookings', 0);
    });

    it('US-11 | e-mailadres is verplicht', function () {
        $this->postJson('/api/v1/bookings', geldigeApiBoekingData(['customer_email' => '']))
            ->assertStatus(422)
            ->assertJsonValidationErrors('customer_email');
    });

    it('US-11 | e-mailadres moet geldig formaat hebben', function () {
        $this->postJson('/api/v1/bookings', geldigeApiBoekingData(['customer_email' => 'geen-geldig-email']))
            ->assertStatus(422)
            ->assertJsonValidationErrors('customer_email');
    });

    it('US-11 | telefoonnummer is verplicht', function () {
        $this->postJson('/api/v1/bookings', geldigeApiBoekingData(['customer_phone' => '']))
            ->assertStatus(422)
            ->assertJsonValidationErrors('customer_phone');
    });

    it('US-11 | ophaallocatie is verplicht', function () {
        $this->postJson('/api/v1/bookings', geldigeApiBoekingData(['pickup_address' => '']))
            ->assertStatus(422)
            ->assertJsonValidationErrors('pickup_address');
    });

    it('US-11 | bestemming is verplicht', function () {
        $this->postJson('/api/v1/bookings', geldigeApiBoekingData(['destination_address' => '']))
            ->assertStatus(422)
            ->assertJsonValidationErrors('destination_address');
    });

    it('US-11 | ophaaltijd is verplicht', function () {
        $this->postJson('/api/v1/bookings', geldigeApiBoekingData(['pickup_at' => '']))
            ->assertStatus(422)
            ->assertJsonValidationErrors('pickup_at');
    });

    it('US-11 | ophaaltijd moet in de toekomst liggen', function () {
        $this->postJson('/api/v1/bookings', geldigeApiBoekingData(['pickup_at' => now()->subDay()->toDateTimeString()]))
            ->assertStatus(422)
            ->assertJsonValidationErrors('pickup_at');
    });

    it('US-11 | aantal passagiers moet minimaal 1 zijn', function () {
        $this->postJson('/api/v1/bookings', geldigeApiBoekingData(['passengers' => 0]))
            ->assertStatus(422)
            ->assertJsonValidationErrors('passengers');
    });

    it('US-11 | aantal passagiers mag maximaal 8 zijn', function () {
        $this->postJson('/api/v1/bookings', geldigeApiBoekingData(['passengers' => 9]))
            ->assertStatus(422)
            ->assertJsonValidationErrors('passengers');
    });

    it('US-11 | voertuigtype is verplicht', function () {
        $this->postJson('/api/v1/bookings', geldigeApiBoekingData(['vehicle_type' => '']))
            ->assertStatus(422)
            ->assertJsonValidationErrors('vehicle_type');
    });

    it('US-11 | ongeldig voertuigtype wordt geweigerd', function () {
        $this->postJson('/api/v1/bookings', geldigeApiBoekingData(['vehicle_type' => 'vliegtuig']))
            ->assertStatus(422)
            ->assertJsonValidationErrors('vehicle_type');
    });

    it('US-11 | leeg formulier geeft meerdere validatiefouten', function () {
        $this->postJson('/api/v1/bookings', [])
            ->assertStatus(422)
            ->assertJsonValidationErrors(['customer_name', 'customer_email', 'customer_phone', 'pickup_address', 'destination_address', 'pickup_at', 'passengers', 'vehicle_type']);
    });

});

// ─── Helper functies ──────────────────────────────────────────────────────────

function geldigeApiBoekingData(array $overschrijf = []): array
{
    return array_merge([
        'pickup_address'      => 'Markt 1, Gouda',
        'pickup_lat'          => 52.0116,
        'pickup_lng'          => 4.7111,
        'destination_address' => 'Schiphol, Amsterdam',
        'destination_lat'     => 52.3105,
        'destination_lng'     => 4.7683,
        'pickup_at'           => now()->addDays(2)->toDateTimeString(),
        'passengers'          => 2,
        'vehicle_type'        => 'sedan',
        'customer_name'       => 'Jan Janssen',
        'customer_email'      => 'jan@example.nl',
        'customer_phone'      => '+31 6 12345678',
        'notes'               => 'Vlucht KL1234',
        'payment_method'      => 'in_taxi_pin',
    ], $overschrijf);
}
