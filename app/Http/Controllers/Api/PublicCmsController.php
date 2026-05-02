<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\FixedPrice;
use App\Models\Review;
use App\Models\ServiceArea;
use Illuminate\Http\JsonResponse;

class PublicCmsController extends Controller
{
    /**
     * Publieke FAQ-lijst — alleen gepubliceerde items.
     */
    public function faqs(): JsonResponse
    {
        $faqs = Faq::query()
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->orderBy('id')
            ->get();

        return response()->json($faqs);
    }

    /**
     * Publieke reviews — alleen gepubliceerde items, nieuwste eerst.
     */
    public function reviews(): JsonResponse
    {
        $reviews = Review::query()
            ->where('is_published', true)
            ->orderByDesc('created_at')
            ->get();

        return response()->json($reviews);
    }

    /**
     * Vaste prijzen, gegroepeerd per categorie (airport / local).
     */
    public function fixedPrices(): JsonResponse
    {
        $all = FixedPrice::query()
            ->where('is_active', true)
            ->orderBy('to_label')
            ->get();

        return response()->json([
            'airport' => $all->where('category', 'airport')->values(),
            'local'   => $all->where('category', 'local')->values(),
        ]);
    }

    /**
     * Lijst van gepubliceerde service-areas (id, name, slug).
     */
    public function serviceAreas(): JsonResponse
    {
        $areas = ServiceArea::query()
            ->where('is_published', true)
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug']);

        return response()->json($areas);
    }

    /**
     * Eén service-area opvragen op basis van slug. 404 indien niet gevonden of niet gepubliceerd.
     */
    public function serviceArea(string $slug): JsonResponse
    {
        $area = ServiceArea::query()
            ->where('slug', $slug)
            ->where('is_published', true)
            ->first();

        if (! $area) {
            return response()->json(['message' => 'Service-area niet gevonden.'], 404);
        }

        return response()->json($area);
    }
}
