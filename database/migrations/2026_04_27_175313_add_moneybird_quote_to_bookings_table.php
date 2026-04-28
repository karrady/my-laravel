<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('moneybird_quote_id')->nullable()->after('moneybird_contact_id');
            $table->string('moneybird_quote_url')->nullable()->after('moneybird_quote_id');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn(['moneybird_quote_id', 'moneybird_quote_url']);
        });
    }
};
