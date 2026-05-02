<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('fixed_prices', function (Blueprint $table) {
            $table->string('category')->default('local')->after('is_active');
            $table->index('category');
        });
    }

    public function down(): void
    {
        Schema::table('fixed_prices', function (Blueprint $table) {
            $table->dropIndex(['category']);
            $table->dropColumn('category');
        });
    }
};
