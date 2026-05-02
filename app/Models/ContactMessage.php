<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactMessage extends Model
{
    protected $fillable = [
        'name', 'email', 'phone', 'subject', 'message', 'read',
        'is_read', 'is_handled', 'notes',
    ];

    protected $casts = [
        'read'       => 'boolean',
        'is_read'    => 'boolean',
        'is_handled' => 'boolean',
    ];
}
