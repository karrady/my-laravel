<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
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
        return response()->json(FixedPrice::orderBy('category')->orderBy('from_label')->get());
    }

    public function fixedPricesStore(Request $request): JsonResponse
    {
        $data = $request->validate([
            'from_label'       => 'required|string|max:120',
            'to_label'         => 'required|string|max:120',
            'from_lat'         => 'required|numeric|between:-90,90',
            'from_lng'         => 'required|numeric|between:-180,180',
            'from_radius_km'   => 'nullable|integer|min:0|max:255',
            'to_lat'           => 'required|numeric|between:-90,90',
            'to_lng'           => 'required|numeric|between:-180,180',
            'to_radius_km'     => 'nullable|integer|min:0|max:255',
            'sedan_cents'      => 'required|integer|min:0',
            'business_cents'   => 'required|integer|min:0',
            'taxibus_cents'    => 'required|integer|min:0',
            'is_bidirectional' => 'boolean',
            'is_active'        => 'boolean',
            'category'         => 'required|in:airport,local',
        ]);

        return response()->json(FixedPrice::create($data), 201);
    }

    public function fixedPricesUpdate(Request $request, FixedPrice $fixedPrice): JsonResponse
    {
        $fixedPrice->update($request->validate([
            'from_label'       => 'sometimes|string|max:120',
            'to_label'         => 'sometimes|string|max:120',
            'from_lat'         => 'sometimes|numeric|between:-90,90',
            'from_lng'         => 'sometimes|numeric|between:-180,180',
            'from_radius_km'   => 'nullable|integer|min:0|max:255',
            'to_lat'           => 'sometimes|numeric|between:-90,90',
            'to_lng'           => 'sometimes|numeric|between:-180,180',
            'to_radius_km'     => 'nullable|integer|min:0|max:255',
            'sedan_cents'      => 'sometimes|integer|min:0',
            'business_cents'   => 'sometimes|integer|min:0',
            'taxibus_cents'    => 'sometimes|integer|min:0',
            'is_bidirectional' => 'sometimes|boolean',
            'is_active'        => 'sometimes|boolean',
            'category'         => 'sometimes|in:airport,local',
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
        return response()->json(ServiceArea::orderBy('sort_order')->orderBy('name')->get());
    }

    public function serviceAreasStore(Request $request): JsonResponse
    {
        $data = $request->validate([
            'name'              => 'required|string|max:100',
            'slug'              => 'required|string|max:100|unique:service_areas',
            'description_nl'    => 'nullable|string',
            'description_short' => 'nullable|string|max:255',
            'lat'               => 'nullable|numeric|between:-90,90',
            'lng'               => 'nullable|numeric|between:-180,180',
            'is_visible'        => 'boolean',
            'sort_order'        => 'nullable|integer|min:0|max:255',
            'meta_title'        => 'nullable|string|max:255',
            'meta_description'  => 'nullable|string',
            'hero_subtitle'     => 'nullable|string|max:255',
            'intro_html'        => 'nullable|string',
            'popular_routes'    => 'nullable|array',
            'popular_routes.*.from'      => 'required_with:popular_routes|string|max:100',
            'popular_routes.*.to'        => 'required_with:popular_routes|string|max:100',
            'popular_routes.*.price_eur' => 'required_with:popular_routes|numeric|min:0',
            'is_published'      => 'boolean',
        ]);

        return response()->json(ServiceArea::create($data), 201);
    }

    public function serviceAreasUpdate(Request $request, ServiceArea $serviceArea): JsonResponse
    {
        $serviceArea->update($request->validate([
            'name'              => 'sometimes|string|max:100',
            'slug'              => 'sometimes|string|max:100|unique:service_areas,slug,' . $serviceArea->id,
            'description_nl'    => 'nullable|string',
            'description_short' => 'nullable|string|max:255',
            'lat'               => 'nullable|numeric|between:-90,90',
            'lng'               => 'nullable|numeric|between:-180,180',
            'is_visible'        => 'sometimes|boolean',
            'sort_order'        => 'nullable|integer|min:0|max:255',
            'meta_title'        => 'nullable|string|max:255',
            'meta_description'  => 'nullable|string',
            'hero_subtitle'     => 'nullable|string|max:255',
            'intro_html'        => 'nullable|string',
            'popular_routes'    => 'nullable|array',
            'popular_routes.*.from'      => 'required_with:popular_routes|string|max:100',
            'popular_routes.*.to'        => 'required_with:popular_routes|string|max:100',
            'popular_routes.*.price_eur' => 'required_with:popular_routes|numeric|min:0',
            'is_published'      => 'sometimes|boolean',
        ]));

        return response()->json($serviceArea->fresh());
    }

    public function serviceAreasDestroy(ServiceArea $serviceArea): JsonResponse
    {
        $serviceArea->delete();
        return response()->json(null, 204);
    }

    // ─── Contact Messages ─────────────────────────────────────────────────────

    public function contactMessagesIndex(Request $request): JsonResponse
    {
        $filter = $request->query('filter', 'all');

        $query = ContactMessage::query()->orderByDesc('created_at');

        if ($filter === 'unread') {
            $query->where('is_read', false);
        } elseif ($filter === 'unhandled') {
            $query->where('is_handled', false);
        }

        return response()->json($query->paginate(20));
    }

    public function contactMessagesShow(ContactMessage $message): JsonResponse
    {
        return response()->json($message);
    }

    public function contactMessagesUpdate(Request $request, ContactMessage $message): JsonResponse
    {
        $message->update($request->validate([
            'is_read'    => 'sometimes|boolean',
            'is_handled' => 'sometimes|boolean',
            'notes'      => 'nullable|string',
        ]));

        return response()->json($message->fresh());
    }

    public function contactMessagesDestroy(ContactMessage $message): JsonResponse
    {
        $message->delete();
        return response()->json(null, 204);
    }
}
