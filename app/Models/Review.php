<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Review extends Model
{
    protected $fillable = [
        'author_name', 'author_location',
        'rating', 'content',
        'source', 'source_id',
        'is_visible', 'sort_order',
    ];

    protected $casts = [
        'rating'     => 'integer',
        'sort_order' => 'integer',
        'is_visible' => 'boolean',
    ];
}
