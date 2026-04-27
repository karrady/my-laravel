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
        'flight_number', 'notes', 'wants_sms',
        'payment_method', 'payment_status', 'status',
        'moneybird_contact_id', 'moneybird_invoice_id',
    ];

    protected $casts = [
        'pickup_at'       => 'datetime',
        'return_at'       => 'datetime',
        'wants_sms'       => 'boolean',
        'pickup_lat'      => 'float',
        'pickup_lng'      => 'float',
        'destination_lat' => 'float',
        'destination_lng' => 'float',
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
