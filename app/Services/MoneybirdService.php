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

    public function createDraftInvoice(Booking $booking): bool
    {
        if (empty($this->token) || empty($this->administrationId)) {
            return false;
        }

        try {
            $contactId = $this->findOrCreateContact($booking);

            if ($contactId === null) {
                return false;
            }

            $invoicePayload = [
                'sales_invoice' => [
                    'contact_id'   => $contactId,
                    'invoice_date' => now()->toDateString(),
                    'details_attributes' => [
                        [
                            'description' => $this->buildInvoiceDescription($booking),
                            'price'       => number_format($booking->price_cents / 100, 2, '.', ''),
                            'amount'      => '1',
                            'tax_rate_id' => null,
                        ],
                    ],
                ],
            ];

            $response = $this->http()->post("{$this->baseUrl}/sales_invoices.json", $invoicePayload);

            if ($response->successful()) {
                $invoiceId = $response->json('sales_invoice.id');
                $booking->update([
                    'moneybird_contact_id'  => $contactId,
                    'moneybird_invoice_id'  => $invoiceId,
                ]);

                return true;
            }

            Log::warning('MoneyBird invoice creation failed', [
                'status'  => $response->status(),
                'body'    => $response->body(),
                'booking' => $booking->booking_number,
            ]);
        } catch (\Throwable $e) {
            Log::error('MoneyBird exception', [
                'message' => $e->getMessage(),
                'booking' => $booking->booking_number,
            ]);
        }

        return false;
    }

    private function findOrCreateContact(Booking $booking): ?string
    {
        // Search by email
        $search = $this->http()->get("{$this->baseUrl}/contacts.json", [
            'query' => $booking->customer_email,
        ]);

        if ($search->successful()) {
            $contacts = $search->json();
            if (! empty($contacts)) {
                return (string) $contacts[0]['id'];
            }
        }

        // Create new contact
        $parts = explode(' ', $booking->customer_name, 2);
        $payload = [
            'contact' => [
                'firstname'    => $parts[0],
                'lastname'     => $parts[1] ?? '',
                'email'        => $booking->customer_email,
                'phone'        => $booking->customer_phone,
            ],
        ];

        $response = $this->http()->post("{$this->baseUrl}/contacts.json", $payload);

        if ($response->successful()) {
            return (string) $response->json('contact.id');
        }

        return null;
    }

    private function buildInvoiceDescription(Booking $booking): string
    {
        $lines = [
            "Taxirit {$booking->booking_number}",
            "Van: {$booking->pickup_address}",
            "Naar: {$booking->destination_address}",
            "Datum: " . $booking->pickup_at->format('d-m-Y H:i'),
        ];

        if ($booking->flight_number) {
            $lines[] = "Vluchtnummer: {$booking->flight_number}";
        }

        return implode("\n", $lines);
    }

    private function http()
    {
        return Http::withToken($this->token)
            ->acceptJson()
            ->asJson();
    }
}
