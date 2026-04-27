<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FixedPrice extends Model
{
    protected $fillable = [
        'from_label', 'from_lat', 'from_lng', 'from_radius_km',
        'to_label', 'to_lat', 'to_lng', 'to_radius_km',
        'sedan_cents', 'business_cents', 'taxibus_cents',
        'is_bidirectional', 'is_active',
    ];

    protected $casts = [
        'from_lat'        => 'float',
        'from_lng'        => 'float',
        'to_lat'          => 'float',
        'to_lng'          => 'float',
        'from_radius_km'  => 'float',
        'to_radius_km'    => 'float',
        'is_bidirectional' => 'boolean',
        'is_active'       => 'boolean',
    ];
}
