<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Faq;
use App\Models\FixedPrice;
use App\Models\Review;
use App\Models\ServiceArea;
use App\Models\Vehicle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CmsController extends Controller
{
    // ─── Vehicles ─────────────────────────────────────────────────────────────

    public function vehiclesIndex(): JsonResponse
    {
        return response()->json(Vehicle::orderBy('sort_order')->get());
    }

    public function vehiclesStore(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'        => 'required|string|max:100',
            'type'        => 'required|string|max:50',
            'capacity'    => 'required|integer|min:1|max:20',
            'description' => 'nullable|string',
            'image_url'   => 'nullable|url',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'boolean',
        ]);

        return response()->json(Vehicle::create($data), 201);
    }

    public function vehiclesUpdate(Request $request, Vehicle $vehicle): JsonResponse
    {
        $vehicle->update($request->validate([
            'name'        => 'sometimes|string|max:100',
            'type'        => 'sometimes|string|max:50',
            'capacity'    => 'sometimes|integer|min:1|max:20',
            'description' => 'nullable|string',
            'image_url'   => 'nullable|url',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'sometimes|boolean',
        ]));

        return response()->json($vehicle->fresh());
    }

    public function vehiclesDestroy(Vehicle $vehicle): JsonResponse
    {
        $vehicle->delete();
        return response()->json(null, 204);
    }

    // ─── Fixed Prices ─────────────────────────────────────────────────────────

    public function fixedPricesIndex(): JsonResponse
    {
        return response()->json(FixedPrice::with('vehicle')->orderBy('vehicle_type')->get());
    }

    public function fixedPricesStore(Request $request): JsonResponse
    {
        $data = $request->validate([
            'vehicle_type'   => 'required|string|max:50',
            'from_city'      => 'required|string|max:100',
            'to_city'        => 'required|string|max:100',
            'price_cents'    => 'required|integer|min:0',
            'return_price_cents' => 'nullable|integer|min:0',
            'is_active'      => 'boolean',
        ]);

        return response()->json(FixedPrice::create($data), 201);
    }

    public function fixedPricesUpdate(Request $request, FixedPrice $fixedPrice): JsonResponse
    {
        $fixedPrice->update($request->validate([
            'vehicle_type'       => 'sometimes|string|max:50',
            'from_city'          => 'sometimes|string|max:100',
            'to_city'            => 'sometimes|string|max:100',
            'price_cents'        => 'sometimes|integer|min:0',
            'return_price_cents' => 'nullable|integer|min:0',
            'is_active'          => 'sometimes|boolean',
        ]));

        return response()->json($fixedPrice->fresh());
    }

    public function fixedPricesDestroy(FixedPrice $fixedPrice): JsonResponse
    {
        $fixedPrice->delete();
        return response()->json(null, 204);
    }

    // ─── FAQs ─────────────────────────────────────────────────────────────────

    public function faqsIndex(): JsonResponse
    {
        return response()->json(Faq::orderBy('sort_order')->get());
    }

    public function faqsStore(Request $request): JsonResponse
    {
        $data = $request->validate([
            'question'   => 'required|string',
            'answer'     => 'required|string',
            'sort_order' => 'nullable|integer',
            'is_active'  => 'boolean',
            'locale'     => 'nullable|string|max:5',
        ]);

        return response()->json(Faq::create($data), 201);
    }

    public function faqsUpdate(Request $request, Faq $faq): JsonResponse
    {
        $faq->update($request->validate([
            'question'   => 'sometimes|string',
            'answer'     => 'sometimes|string',
            'sort_order' => 'nullable|integer',
            'is_active'  => 'sometimes|boolean',
            'locale'     => 'nullable|string|max:5',
        ]));

        return response()->json($faq->fresh());
    }

    public function faqsDestroy(Faq $faq): JsonResponse
    {
        $faq->delete();
        return response()->json(null, 204);
    }

    // ─── Reviews ──────────────────────────────────────────────────────────────

    public function reviewsIndex(): JsonResponse
    {
        return response()->json(Review::orderByDesc('created_at')->get());
    }

    public function reviewsStore(Request $request): JsonResponse
    {
        $data = $request->validate([
            'author_name'  => 'required|string|max:100',
            'rating'       => 'required|integer|min:1|max:5',
            'body'         => 'required|string',
            'source'       => 'nullable|string|max:50',
            'is_published' => 'boolean',
        ]);

        return response()->json(Review::create($data), 201);
    }

    public function reviewsUpdate(Request $request, Review $review): JsonResponse
    {
        $review->update($request->validate([
            'author_name'  => 'sometimes|string|max:100',
            'rating'       => 'sometimes|integer|min:1|max:5',
            'body'         => 'sometimes|string',
            'source'       => 'nullable|string|max:50',
            'is_published' => 'sometimes|boolean',
        ]));

        return response()->json($review->fresh());
    }

    public function reviewsDestroy(Review $review): JsonResponse
    {
        $review->delete();
        return response()->json(null, 204);
    }

    // ─── Service Areas ────────────────────────────────────────────────────────

    public function serviceAreasIndex(): JsonResponse
    {
        return response()->json(ServiceArea::orderBy('name')->get());
    }

    public function serviceAreasStore(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'       => 'required|string|max:100',
            'slug'       => 'required|string|max:100|unique:service_areas',
            'is_active'  => 'boolean',
        ]);

        return response()->json(ServiceArea::create($data), 201);
    }

    public function serviceAreasUpdate(Request $request, ServiceArea $serviceArea): JsonResponse
    {
        $serviceArea->update($request->validate([
            'name'      => 'sometimes|string|max:100',
            'slug'      => 'sometimes|string|max:100|unique:service_areas,slug,' . $serviceArea->id,
            'is_active' => 'sometimes|boolean',
        ]));

        return response()->json($serviceArea->fresh());
    }

    public function serviceAreasDestroy(ServiceArea $serviceArea): JsonResponse
    {
        $serviceArea->delete();
        return response()->json(null, 204);
    }
}
