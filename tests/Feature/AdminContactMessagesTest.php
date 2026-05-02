<?php

use App\Models\ContactMessage;
use App\Models\User;

function adminUser(): User
{
    return User::factory()->create(['is_admin' => true]);
}

function regularUser(): User
{
    return User::factory()->create(['is_admin' => false]);
}

describe('Admin contact-messages — auth', function () {

    it('geeft 401 zonder authenticatie', function () {
        ContactMessage::create([
            'name' => 'Jan', 'email' => 'jan@x.nl',
            'subject' => 'Test', 'message' => 'Hi',
        ]);

        $this->getJson('/api/admin/contact-messages')
            ->assertStatus(401);
    });

    it('geeft 403 voor niet-admin gebruiker', function () {
        $user = regularUser();

        $this->actingAs($user, 'sanctum')
            ->getJson('/api/admin/contact-messages')
            ->assertStatus(403);
    });

});

describe('Admin contact-messages — CRUD', function () {

    it('lijst geeft alle berichten terug (paginated)', function () {
        ContactMessage::create(['name' => 'A', 'email' => 'a@x.nl', 'subject' => 's', 'message' => 'm']);
        ContactMessage::create(['name' => 'B', 'email' => 'b@x.nl', 'subject' => 's', 'message' => 'm']);

        $response = $this->actingAs(adminUser(), 'sanctum')
            ->getJson('/api/admin/contact-messages');

        $response->assertOk();
        expect($response->json('data'))->toHaveCount(2);
    });

    it('filter=unread toont alleen ongelezen berichten', function () {
        ContactMessage::create(['name' => 'A', 'email' => 'a@x.nl', 'subject' => 's', 'message' => 'm', 'is_read' => true]);
        ContactMessage::create(['name' => 'B', 'email' => 'b@x.nl', 'subject' => 's', 'message' => 'm', 'is_read' => false]);

        $response = $this->actingAs(adminUser(), 'sanctum')
            ->getJson('/api/admin/contact-messages?filter=unread');

        $response->assertOk();
        expect($response->json('data'))->toHaveCount(1);
        expect($response->json('data.0.name'))->toBe('B');
    });

    it('filter=unhandled toont alleen niet-afgehandelde berichten', function () {
        ContactMessage::create(['name' => 'A', 'email' => 'a@x.nl', 'subject' => 's', 'message' => 'm', 'is_handled' => true]);
        ContactMessage::create(['name' => 'B', 'email' => 'b@x.nl', 'subject' => 's', 'message' => 'm', 'is_handled' => false]);

        $response = $this->actingAs(adminUser(), 'sanctum')
            ->getJson('/api/admin/contact-messages?filter=unhandled');

        $response->assertOk();
        expect($response->json('data'))->toHaveCount(1);
        expect($response->json('data.0.name'))->toBe('B');
    });

    it('show geeft een specifiek bericht terug', function () {
        $msg = ContactMessage::create(['name' => 'Jan', 'email' => 'j@x.nl', 'subject' => 's', 'message' => 'm']);

        $response = $this->actingAs(adminUser(), 'sanctum')
            ->getJson("/api/admin/contact-messages/{$msg->id}");

        $response->assertOk();
        expect($response->json('name'))->toBe('Jan');
    });

    it('update markeert bericht als gelezen en afgehandeld met notes', function () {
        $msg = ContactMessage::create(['name' => 'Jan', 'email' => 'j@x.nl', 'subject' => 's', 'message' => 'm']);

        $response = $this->actingAs(adminUser(), 'sanctum')
            ->patchJson("/api/admin/contact-messages/{$msg->id}", [
                'is_read'    => true,
                'is_handled' => true,
                'notes'      => 'Gebeld op 2026-05-02.',
            ]);

        $response->assertOk();
        expect($response->json('is_read'))->toBeTrue();
        expect($response->json('is_handled'))->toBeTrue();
        expect($response->json('notes'))->toBe('Gebeld op 2026-05-02.');
    });

    it('destroy verwijdert het bericht', function () {
        $msg = ContactMessage::create(['name' => 'Jan', 'email' => 'j@x.nl', 'subject' => 's', 'message' => 'm']);

        $response = $this->actingAs(adminUser(), 'sanctum')
            ->deleteJson("/api/admin/contact-messages/{$msg->id}");

        $response->assertStatus(204);
        $this->assertDatabaseMissing('contact_messages', ['id' => $msg->id]);
    });

});
