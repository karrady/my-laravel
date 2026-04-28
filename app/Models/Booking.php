<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'booking_number',
        'pickup_address', 'pickup_lat', 'pickup_lng',
        'destination_address', 'destination_lat', 'destination_lng',
        'pickup_at', 'return_at',
        'passengers', 'vehicle_type',
        'distance_km', 'duration_min',
        'price_cents', 'return_price_cents',
        'customer_name', 'customer_email', 'customer_phone',
        'flight_number', 'flight_direction', 'flight_airport_iata',
        'flight_status', 'flight_scheduled_at', 'flight_actual_at',
        'flight_delay_minutes', 'flight_last_tracked_at', 'driver_departure_at',
        'notes', 'wants_sms',
        'payment_method', 'payment_status', 'status',
        'moneybird_contact_id', 'moneybird_quote_id', 'moneybird_quote_url', 'moneybird_invoice_id',
        'is_quick_request', 'accept_deadline', 'driver_accepted_at',
    ];

    protected $casts = [
        'pickup_at'              => 'datetime',
        'return_at'              => 'datetime',
        'flight_scheduled_at'   => 'datetime',
        'flight_actual_at'      => 'datetime',
        'flight_last_tracked_at'=> 'datetime',
        'driver_departure_at'   => 'datetime',
        'accept_deadline'        => 'datetime',
        'driver_accepted_at'     => 'datetime',
        'wants_sms'             => 'boolean',
        'is_quick_request'      => 'boolean',
        'pickup_lat'            => 'float',
        'pickup_lng'            => 'float',
        'destination_lat'       => 'float',
        'destination_lng'       => 'float',
        'flight_delay_minutes'  => 'integer',
    ];

    protected static function booted(): void
    {
        static::creating(function (Booking $booking) {
            if (empty($booking->booking_number)) {
                $booking->booking_number = 'YAS-' . strtoupper(substr(uniqid(), -6));
            }
        });
    }
}
