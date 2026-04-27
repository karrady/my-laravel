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
        Schema::create('vehicles', function (Blueprint $table) {
            $table->id();
            $table->enum('type', ['sedan', 'business', 'taxibus'])->unique();
            $table->string('name');
            $table->string('description');
            $table->unsignedTinyInteger('max_passengers');
            $table->unsignedInteger('base_price_cents');
            $table->unsignedInteger('price_per_km_cents');
            $table->unsignedInteger('min_price_cents');
            $table->json('features');
            $table->string('photo_path')->nullable();
            $table->unsignedTinyInteger('sort_order')->default(0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vehicles');
    }
};
