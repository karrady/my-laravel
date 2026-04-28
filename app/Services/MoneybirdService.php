<?php

namespace App\Services;

use App\Models\Booking;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class MoneybirdService
{
    private string $token;
    private string $administrationId;
    private string $baseUrl;

    public function __construct()
    {
        $this->token            = config('services.moneybird.token') ?? '';
        $this->administrationId = config('services.moneybird.administration_id') ?? '';
        $this->baseUrl          = "https://moneybird.com/api/v2/{$this->administrationId}";
    }

    // ─── Quote (Offerte) ──────────────────────────────────────────────────────

    public function createQuote(Booking $booking): bool
    {
        if (! $this->configured()) return false;

        try {
            $contactId = $this->findOrCreateContact($booking);
            if (! $contactId) return false;

            $payload = [
                'estimate' => [
                    'contact_id'          => $contactId,
                    'reference'           => $booking->booking_number,
                    'estimate_date'       => now()->toDateString(),
                    'details_attributes'  => [
                        [
                            'description' => $this->buildRitDescription($booking),
                            'price'       => number_format($booking->price_cents / 100, 2, '.', ''),
                            'amount'      => '1',
                            'tax_rate_id' => null,
                        ],
                    ] + ($booking->return_price_cents ? [
                        1 => [
                            'description' => 'Retourrit ' . $booking->booking_number,
                            'price'       => number_format($booking->return_price_cents / 100, 2, '.', ''),
                            'amount'      => '1',
                            'tax_rate_id' => null,
                        ],
                    ] : []),
                ],
            ];

            $response = $this->http()->post("{$this->baseUrl}/estimates.json", $payload);

            if ($response->successful()) {
                $data = $response->json('estimate');
                $booking->update([
                    'moneybird_contact_id' => $contactId,
                    'moneybird_quote_id'   => $data['id'],
                    'moneybird_quote_url'  => $data['url'] ?? null,
                ]);
                return true;
            }

            Log::warning('Moneybird quote creation failed', [
                'status'  => $response->status(),
                'body'    => $response->body(),
                'booking' => $booking->booking_number,
            ]);
        } catch (\Throwable $e) {
            Log::error('Moneybird createQuote exception', ['message' => $e->getMessage()]);
        }

        return false;
    }

    public function sendQuote(Booking $booking): bool
    {
        if (! $this->configured() || ! $booking->moneybird_quote_id) return false;

        try {
            $response = $this->http()->patch(
                "{$this->baseUrl}/estimates/{$booking->moneybird_quote_id}/send_estimate.json",
                ['estimate' => ['sending_method' => 'email']]
            );

            return $response->successful();
        } catch (\Throwable $e) {
            Log::error('Moneybird sendQuote exception', ['message' => $e->getMessage()]);
            return false;
        }
    }

    public function convertQuoteToInvoice(Booking $booking): bool
    {
        if (! $this->configured() || ! $booking->moneybird_quote_id) return false;

        try {
            $response = $this->http()->patch(
                "{$this->baseUrl}/estimates/{$booking->moneybird_quote_id}/convert_to_invoice.json"
            );

            if ($response->successful()) {
                $invoiceId = $response->json('sales_invoice.id');
                $booking->update(['moneybird_invoice_id' => $invoiceId]);
                return true;
            }
        } catch (\Throwable $e) {
            Log::error('Moneybird convertQuote exception', ['message' => $e->getMessage()]);
        }

        return false;
    }

    // ─── Invoice (legacy / direct) ────────────────────────────────────────────

    public function createDraftInvoice(Booking $booking): bool
    {
        if (! $this->configured()) return false;

        try {
            $contactId = $this->findOrCreateContact($booking);
            if (! $contactId) return false;

            $response = $this->http()->post("{$this->baseUrl}/sales_invoices.json", [
                'sales_invoice' => [
                    'contact_id'         => $contactId,
                    'invoice_date'       => now()->toDateString(),
                    'details_attributes' => [[
                        'description' => $this->buildRitDescription($booking),
                        'price'       => number_format($booking->price_cents / 100, 2, '.', ''),
                        'amount'      => '1',
                        'tax_rate_id' => null,
                    ]],
                ],
            ]);

            if ($response->successful()) {
                $booking->update([
                    'moneybird_contact_id' => $contactId,
                    'moneybird_invoice_id' => $response->json('sales_invoice.id'),
                ]);
                return true;
            }

            Log::warning('Moneybird invoice creation failed', [
                'status'  => $response->status(),
                'body'    => $response->body(),
                'booking' => $booking->booking_number,
            ]);
        } catch (\Throwable $e) {
            Log::error('Moneybird createInvoice exception', ['message' => $e->getMessage()]);
        }

        return false;
    }

    // ─── Webhook ─────────────────────────────────────────────────────────────

    public function handleWebhook(array $payload): void
    {
        $entity      = $payload['entity'] ?? '';
        $action      = $payload['action'] ?? '';
        $entityId    = (string) ($payload['entity_id'] ?? '');

        if ($entity === 'SalesInvoice' && $action === 'invoice_payment_added') {
            $booking = Booking::where('moneybird_invoice_id', $entityId)->first();
            if ($booking) {
                $booking->update(['payment_status' => 'paid']);
                Log::info("Booking {$booking->booking_number} marked as paid via Moneybird webhook.");
            }
        }

        if ($entity === 'Estimate' && in_array($action, ['estimate_accepted', 'estimate_billed'])) {
            $booking = Booking::where('moneybird_quote_id', $entityId)->first();
            if ($booking) {
                $booking->update(['status' => 'confirmed']);
                Log::info("Booking {$booking->booking_number} confirmed via Moneybird webhook.");
            }
        }

        if ($entity === 'Estimate' && $action === 'estimate_rejected') {
            $booking = Booking::where('moneybird_quote_id', $entityId)->first();
            if ($booking) {
                $booking->update(['status' => 'cancelled']);
            }
        }
    }

    // ─── Contact ─────────────────────────────────────────────────────────────

    private function findOrCreateContact(Booking $booking): ?string
    {
        $search = $this->http()->get("{$this->baseUrl}/contacts.json", ['query' => $booking->customer_email]);

        if ($search->successful() && ! empty($search->json())) {
            return (string) $search->json()[0]['id'];
        }

        $parts = explode(' ', $booking->customer_name, 2);
        $response = $this->http()->post("{$this->baseUrl}/contacts.json", [
            'contact' => [
                'firstname' => $parts[0],
                'lastname'  => $parts[1] ?? '',
                'email'     => $booking->customer_email,
                'phone'     => $booking->customer_phone,
            ],
        ]);

        return $response->successful() ? (string) $response->json('contact.id') : null;
    }

    // ─── Helpers ─────────────────────────────────────────────────────────────

    private function buildRitDescription(Booking $booking): string
    {
        $lines = [
            "Taxirit {$booking->booking_number}",
            "Van: {$booking->pickup_address}",
            "Naar: {$booking->destination_address}",
            "Datum: " . $booking->pickup_at->format('d-m-Y H:i'),
            "Voertuig: " . ucfirst($booking->vehicle_type ?? 'onbekend'),
            "Passagiers: {$booking->passengers}",
        ];

        if ($booking->flight_number) {
            $lines[] = "Vluchtnummer: {$booking->flight_number}";
        }

        return implode("\n", $lines);
    }

    private function configured(): bool
    {
        return ! empty($this->token) && ! empty($this->administrationId);
    }

    private function http()
    {
        return Http::withToken($this->token)->acceptJson()->asJson();
    }
}
