<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->string('flight_direction')->nullable()->after('flight_number');   // to_airport | from_airport
            $table->string('flight_airport_iata', 5)->nullable()->after('flight_direction'); // AMS | RTM | EIN
            $table->string('flight_status', 30)->nullable()->after('flight_airport_iata');  // scheduled | active | landed | cancelled
            $table->dateTime('flight_scheduled_at')->nullable()->after('flight_status');
            $table->dateTime('flight_actual_at')->nullable()->after('flight_scheduled_at');
            $table->integer('flight_delay_minutes')->nullable()->after('flight_actual_at');
            $table->dateTime('flight_last_tracked_at')->nullable()->after('flight_delay_minutes');
            $table->dateTime('driver_departure_at')->nullable()->after('flight_last_tracked_at');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn([
                'flight_direction', 'flight_airport_iata', 'flight_status',
                'flight_scheduled_at', 'flight_actual_at', 'flight_delay_minutes',
                'flight_last_tracked_at', 'driver_departure_at',
            ]);
        });
    }
};
