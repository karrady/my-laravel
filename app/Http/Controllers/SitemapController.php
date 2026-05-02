<?php

namespace App\Http\Controllers;

use App\Models\ServiceArea;
use Illuminate\Http\Response;

class SitemapController extends Controller
{
    /**
     * Genereer een XML-sitemap voor zoekmachines.
     * Bevat alle publieke pagina's + gepubliceerde service-areas.
     */
    public function index(): Response
    {
        $base = rtrim(config('app.url', 'http://localhost'), '/');

        $staticPages = [
            ['loc' => $base . '/',                 'changefreq' => 'weekly',  'priority' => '1.0'],
            ['loc' => $base . '/diensten',         'changefreq' => 'monthly', 'priority' => '0.9'],
            ['loc' => $base . '/airport-service',  'changefreq' => 'monthly', 'priority' => '0.9'],
            ['loc' => $base . '/over-ons',         'changefreq' => 'monthly', 'priority' => '0.6'],
            ['loc' => $base . '/contact',          'changefreq' => 'monthly', 'priority' => '0.6'],
            ['loc' => $base . '/reserveren',       'changefreq' => 'monthly', 'priority' => '0.8'],
        ];

        $areas = ServiceArea::query()
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->get(['slug', 'updated_at']);

        return response()
            ->view('sitemap', [
                'base'        => $base,
                'staticPages' => $staticPages,
                'areas'       => $areas,
            ])
            ->header('Content-Type', 'application/xml; charset=utf-8');
    }
}
