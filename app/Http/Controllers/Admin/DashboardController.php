<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\ContactMessage;
use Illuminate\Http\JsonResponse;

class DashboardController extends Controller
{
    public function index(): JsonResponse
    {
        $now              = now();
        $today            = $now->toDateString();
        $weekStart        = $now->copy()->startOfWeek();
        $monthStart       = $now->copy()->startOfMonth();
        $prevMonthStart   = $now->copy()->subMonthNoOverflow()->startOfMonth();
        $prevMonthEnd     = $now->copy()->subMonthNoOverflow()->endOfMonth();
        $prev7DaysStart   = $now->copy()->subDays(13)->startOfDay();
        $prev7DaysEnd     = $now->copy()->subDays(7)->endOfDay();
        $last7DaysStart   = $now->copy()->subDays(6)->startOfDay();

        // Boekingen
        $bookingsToday   = Booking::whereDate('pickup_at', $today)->count();
        $bookingsWeek    = Booking::where('pickup_at', '>=', $weekStart)->count();
        $bookingsMonth   = Booking::where('pickup_at', '>=', $monthStart)->count();
        $bookingsLast7   = Booking::where('pickup_at', '>=', $last7DaysStart)->count();
        $bookingsPrev7   = Booking::whereBetween('pickup_at', [$prev7DaysStart, $prev7DaysEnd])->count();
        $bookings7DChange = $bookingsPrev7 > 0
            ? round((($bookingsLast7 - $bookingsPrev7) / $bookingsPrev7) * 100)
            : ($bookingsLast7 > 0 ? 100 : 0);

        // Omzet
        $revenueMonthCents     = (int) Booking::where('pickup_at', '>=', $monthStart)->sum('price_cents');
        $revenuePrevMonthCents = (int) Booking::whereBetween('pickup_at', [$prevMonthStart, $prevMonthEnd])->sum('price_cents');
        $revenueChange = $revenuePrevMonthCents > 0
            ? round((($revenueMonthCents - $revenuePrevMonthCents) / $revenuePrevMonthCents) * 100)
            : ($revenueMonthCents > 0 ? 100 : 0);

        // Statussen
        $bookingsPending    = Booking::where('status', 'pending')->count();
        $bookingsConfirmed  = Booking::where('status', 'confirmed')->count();
        $bookingsCompleted  = Booking::where('status', 'completed')->count();
        $bookingsCancelled  = Booking::where('status', 'cancelled')->count();

        // Betaling
        $unpaidCount = Booking::where('payment_status', 'pending')->count();

        // Contact
        $contactUnread   = ContactMessage::where('is_read', false)->count();
        $contactUnhandled = ContactMessage::where('is_handled', false)->count();

        return response()->json([
            'bookings_today'            => $bookingsToday,
            'bookings_week'             => $bookingsWeek,
            'bookings_month'            => $bookingsMonth,
            'bookings_total'            => Booking::count(),
            'bookings_last_7_days'      => $bookingsLast7,
            'bookings_7d_change_pct'    => $bookings7DChange,
            'bookings_pending'          => $bookingsPending,
            'bookings_confirmed'        => $bookingsConfirmed,
            'bookings_completed'        => $bookingsCompleted,
            'bookings_cancelled'        => $bookingsCancelled,
            'revenue_today_cents'       => (int) Booking::whereDate('pickup_at', $today)->sum('price_cents'),
            'revenue_month_cents'       => $revenueMonthCents,
            'revenue_prev_month_cents'  => $revenuePrevMonthCents,
            'revenue_month_change_pct'  => $revenueChange,
            'unpaid_count'              => $unpaidCount,
            'contact_unread'            => $contactUnread,
            'contact_unhandled'         => $contactUnhandled,
            'recent_bookings'           => Booking::latest()->take(8)->get([
                'id', 'booking_number', 'customer_name', 'customer_email',
                'pickup_at', 'pickup_address', 'destination_address',
                'status', 'payment_status', 'price_cents', 'vehicle_type',
            ]),
        ]);
    }
}
