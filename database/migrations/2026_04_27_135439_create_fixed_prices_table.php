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
        Schema::create('fixed_prices', function (Blueprint $table) {
            $table->id();
            $table->string('from_label');
            $table->string('to_label');
            $table->decimal('from_lat', 10, 7);
            $table->decimal('from_lng', 10, 7);
            $table->unsignedTinyInteger('from_radius_km')->default(5);
            $table->decimal('to_lat', 10, 7);
            $table->decimal('to_lng', 10, 7);
            $table->unsignedTinyInteger('to_radius_km')->default(5);
            $table->unsignedInteger('sedan_cents');
            $table->unsignedInteger('business_cents');
            $table->unsignedInteger('taxibus_cents');
            $table->boolean('is_bidirectional')->default(true);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('fixed_prices');
    }
};
