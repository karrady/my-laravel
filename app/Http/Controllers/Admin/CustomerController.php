<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CustomerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Booking::select(
                'customer_email',
                'customer_name',
                'customer_phone',
                DB::raw('COUNT(*) as booking_count'),
                DB::raw('SUM(price_cents) as total_cents'),
                DB::raw('MAX(pickup_at) as last_booking_at'),
                DB::raw('MIN(created_at) as first_booking_at')
            )
            ->groupBy('customer_email', 'customer_name', 'customer_phone')
            ->orderByDesc('last_booking_at');

        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(function ($q) use ($s) {
                $q->where('customer_name', 'like', "%{$s}%")
                  ->orWhere('customer_email', 'like', "%{$s}%")
                  ->orWhere('customer_phone', 'like', "%{$s}%");
            });
        }

        return response()->json($query->paginate(25));
    }

    public function show(Request $request, string $email): JsonResponse
    {
        $bookings = Booking::where('customer_email', $email)
            ->latest('pickup_at')
            ->get([
                'id', 'booking_number', 'pickup_at', 'pickup_address',
                'destination_address', 'vehicle_type', 'price_cents',
                'status', 'payment_status', 'moneybird_quote_id', 'moneybird_invoice_id',
            ]);

        if ($bookings->isEmpty()) {
            return response()->json(['message' => 'Klant niet gevonden.'], 404);
        }

        $first = $bookings->sortBy('pickup_at')->first();

        return response()->json([
            'customer_name'    => $first->customer_name ?? $bookings->first()->customer_name,
            'customer_email'   => $email,
            'customer_phone'   => $first->customer_phone ?? $bookings->first()->customer_phone,
            'booking_count'    => $bookings->count(),
            'total_spent'      => $bookings->sum('price_cents') / 100,
            'first_booking_at' => $bookings->min('pickup_at'),
            'last_booking_at'  => $bookings->max('pickup_at'),
            'bookings'         => $bookings,
        ]);
    }
}
