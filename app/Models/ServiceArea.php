<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceArea extends Model
{
    protected $fillable = [
        'name', 'slug', 'description_nl', 'description_short',
        'lat', 'lng', 'is_visible', 'sort_order',
    ];

    protected $casts = [
        'lat'        => 'float',
        'lng'        => 'float',
        'is_visible' => 'boolean',
        'sort_order' => 'integer',
    ];
}
