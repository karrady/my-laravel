<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'pickup_location', 'destination',
        'date', 'time', 'passengers', 'service_type', 'notes', 'status',
    ];

    protected $casts = [
        'date' => 'date',
    ];
}
