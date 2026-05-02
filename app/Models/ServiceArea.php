<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ServiceArea extends Model
{
    protected $fillable = [
        'name', 'slug', 'description_nl', 'description_short',
        'lat', 'lng', 'is_visible', 'sort_order',
        'meta_title', 'meta_description', 'hero_subtitle',
        'intro_html', 'popular_routes', 'is_published',
    ];

    protected $casts = [
        'lat'            => 'float',
        'lng'            => 'float',
        'is_visible'     => 'boolean',
        'sort_order'     => 'integer',
        'popular_routes' => 'array',
        'is_published'   => 'boolean',
    ];
}
