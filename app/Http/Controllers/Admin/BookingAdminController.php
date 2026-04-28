<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Services\MoneybirdService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class BookingAdminController extends Controller
{
    public function __construct(private MoneybirdService $moneybird) {}

    public function index(Request $request): JsonResponse
    {
        $query = Booking::latest('pickup_at');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }
        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }
        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('booking_number', 'like', "%{$s}%")
                  ->orWhere('customer_name', 'like', "%{$s}%")
                  ->orWhere('customer_email', 'like', "%{$s}%")
                  ->orWhere('customer_phone', 'like', "%{$s}%");
            });
        }

        return response()->json($query->paginate(25));
    }

    public function show(Booking $booking): JsonResponse
    {
        return response()->json($booking);
    }

    public function update(Request $request, Booking $booking): JsonResponse
    {
        $data = $request->validate([
            'status'         => 'sometimes|in:pending,confirmed,cancelled,completed',
            'payment_status' => 'sometimes|in:pending,paid,overdue',
            'notes'          => 'sometimes|nullable|string',
            'pickup_at'      => 'sometimes|date',
        ]);

        $booking->update($data);

        return response()->json($booking->fresh());
    }

    // ─── Moneybird acties ─────────────────────────────────────────────────────

    public function createQuote(Booking $booking): JsonResponse
    {
        $ok = $this->moneybird->createQuote($booking);
        return response()->json([
            'success'         => $ok,
            'moneybird_quote_id'  => $booking->fresh()->moneybird_quote_id,
            'moneybird_quote_url' => $booking->fresh()->moneybird_quote_url,
        ], $ok ? 200 : 502);
    }

    public function sendQuote(Booking $booking): JsonResponse
    {
        $ok = $this->moneybird->sendQuote($booking);
        return response()->json(['success' => $ok], $ok ? 200 : 502);
    }

    public function convertToInvoice(Booking $booking): JsonResponse
    {
        $ok = $this->moneybird->convertQuoteToInvoice($booking);
        return response()->json([
            'success'             => $ok,
            'moneybird_invoice_id' => $booking->fresh()->moneybird_invoice_id,
        ], $ok ? 200 : 502);
    }
}
