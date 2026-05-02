<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('service_areas', function (Blueprint $table) {
            $table->string('meta_title')->nullable()->after('description_short');
            $table->text('meta_description')->nullable()->after('meta_title');
            $table->string('hero_subtitle')->nullable()->after('meta_description');
            $table->longText('intro_html')->nullable()->after('hero_subtitle');
            $table->json('popular_routes')->nullable()->after('intro_html');
            $table->boolean('is_published')->default(false)->after('popular_routes');
        });
    }

    public function down(): void
    {
        Schema::table('service_areas', function (Blueprint $table) {
            $table->dropColumn([
                'meta_title',
                'meta_description',
                'hero_subtitle',
                'intro_html',
                'popular_routes',
                'is_published',
            ]);
        });
    }
};
