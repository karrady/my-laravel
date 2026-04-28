<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->boolean('is_quick_request')->default(false)->after('status');
            $table->dateTime('accept_deadline')->nullable()->after('is_quick_request');
            $table->dateTime('driver_accepted_at')->nullable()->after('accept_deadline');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['is_quick_request', 'accept_deadline', 'driver_accepted_at']);
        });
    }
};
