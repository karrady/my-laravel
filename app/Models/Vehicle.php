<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    protected $fillable = [
        'type', 'name', 'description', 'max_passengers',
        'base_price_cents', 'price_per_km_cents', 'min_price_cents',
        'features', 'photo_path', 'sort_order',
    ];

    protected $casts = [
        'features' => 'array',
    ];
}
