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
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->string('phone');
            $table->string('pickup_location');
            $table->string('destination');
            $table->date('date');
            $table->time('time');
            $table->unsignedTinyInteger('passengers')->default(1);
            $table->string('service_type')->default('standaard');
            $table->text('notes')->nullable();
            $table->enum('status', ['nieuw', 'bevestigd', 'afgerond', 'geannuleerd'])->default('nieuw');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
