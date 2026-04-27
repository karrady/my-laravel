<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn([
                'name', 'email', 'phone',
                'pickup_location', 'destination',
                'date', 'time', 'passengers',
                'service_type', 'notes', 'status',
            ]);
        });

        Schema::table('bookings', function (Blueprint $table) {
            $table->string('booking_number', 20)->unique()->after('id');
            $table->string('pickup_address')->after('booking_number');
            $table->decimal('pickup_lat', 10, 7)->nullable()->after('pickup_address');
            $table->decimal('pickup_lng', 10, 7)->nullable()->after('pickup_lat');
            $table->string('destination_address')->after('pickup_lng');
            $table->decimal('destination_lat', 10, 7)->nullable()->after('destination_address');
            $table->decimal('destination_lng', 10, 7)->nullable()->after('destination_lat');
            $table->dateTime('pickup_at')->after('destination_lng');
            $table->dateTime('return_at')->nullable()->after('pickup_at');
            $table->unsignedTinyInteger('passengers')->default(1)->after('return_at');
            $table->enum('vehicle_type', ['sedan', 'business', 'taxibus'])->default('sedan')->after('passengers');
            $table->unsignedSmallInteger('distance_km')->nullable()->after('vehicle_type');
            $table->unsignedSmallInteger('duration_min')->nullable()->after('distance_km');
            $table->unsignedInteger('price_cents')->after('duration_min');
            $table->unsignedInteger('return_price_cents')->nullable()->after('price_cents');
            $table->string('customer_name')->after('return_price_cents');
            $table->string('customer_email')->after('customer_name');
            $table->string('customer_phone', 30)->after('customer_email');
            $table->string('flight_number', 20)->nullable()->after('customer_phone');
            $table->text('notes')->nullable()->after('flight_number');
            $table->boolean('wants_sms')->default(false)->after('notes');
            $table->enum('payment_method', ['in_taxi_pin', 'in_taxi_cash'])->default('in_taxi_pin')->after('wants_sms');
            $table->enum('payment_status', ['pending', 'paid'])->default('pending')->after('payment_method');
            $table->enum('status', ['pending', 'confirmed', 'driver_assigned', 'in_progress', 'completed', 'cancelled'])->default('pending')->after('payment_status');
            $table->string('moneybird_contact_id')->nullable()->after('status');
            $table->string('moneybird_invoice_id')->nullable()->after('moneybird_contact_id');
        });
    }

    public function down(): void
    {
        Schema::table('bookings', function (Blueprint $table) {
            $table->dropColumn([
                'booking_number', 'pickup_address', 'pickup_lat', 'pickup_lng',
                'destination_address', 'destination_lat', 'destination_lng',
                'pickup_at', 'return_at', 'passengers', 'vehicle_type',
                'distance_km', 'duration_min', 'price_cents', 'return_price_cents',
                'customer_name', 'customer_email', 'customer_phone',
                'flight_number', 'notes', 'wants_sms',
                'payment_method', 'payment_status', 'status',
                'moneybird_contact_id', 'moneybird_invoice_id',
            ]);
        });
    }
};
