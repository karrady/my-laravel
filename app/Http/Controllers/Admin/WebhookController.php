<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Services\MoneybirdService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function __construct(private MoneybirdService $moneybird) {}

    public function moneybird(Request $request): JsonResponse
    {
        // Moneybird stuurt een JSON payload
        $payload = $request->json()->all();

        Log::info('Moneybird webhook ontvangen', ['payload' => $payload]);

        $this->moneybird->handleWebhook($payload);

        return response()->json(['ok' => true]);
    }
}
