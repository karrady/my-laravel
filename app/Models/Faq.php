<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $fillable = [
        'question_nl', 'answer_nl',
        'question_en', 'answer_en',
        'category', 'sort_order', 'is_visible', 'is_published',
    ];

    protected $casts = [
        'sort_order'   => 'integer',
        'is_visible'   => 'boolean',
        'is_published' => 'boolean',
    ];
}
