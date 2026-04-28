<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $today = now()->toDateString();

        return response()->json([
            'bookings_today'    => Booking::whereDate('pickup_at', $today)->count(),
            'bookings_pending'  => Booking::where('status', 'pending')->count(),
            'bookings_total'    => Booking::count(),
            'revenue_today'     => Booking::whereDate('pickup_at', $today)->sum('price_cents') / 100,
            'revenue_this_month'=> Booking::whereYear('pickup_at', now()->year)
                                          ->whereMonth('pickup_at', now()->month)
                                          ->sum('price_cents') / 100,
            'unpaid_count'      => Booking::where('payment_status', 'pending')->count(),
            'recent_bookings'   => Booking::latest()->take(5)->get([
                'id', 'booking_number', 'customer_name', 'pickup_at',
                'status', 'payment_status', 'price_cents', 'vehicle_type',
            ]),
        ]);
    }
}
