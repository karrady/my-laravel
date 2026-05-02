<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->boolean('is_read')->default(false)->after('message');
            $table->boolean('is_handled')->default(false)->after('is_read');
            $table->text('notes')->nullable()->after('is_handled');
            $table->index('is_read');
            $table->index('is_handled');
        });
    }

    public function down(): void
    {
        Schema::table('contact_messages', function (Blueprint $table) {
            $table->dropIndex(['is_read']);
            $table->dropIndex(['is_handled']);
            $table->dropColumn(['is_read', 'is_handled', 'notes']);
        });
    }
};
