<?php

use App\Http\Controllers\Api\BookingApiController;
use App\Http\Controllers\Api\FlightController;
use App\Http\Controllers\Api\PriceController;
use Illuminate\Support\Facades\Route;

// Public API — no auth required
Route::prefix('v1')->group(function () {
    Route::get('/vehicles', [PriceController::class, 'vehicles']);
    Route::post('/bookings/estimate', [PriceController::class, 'estimate']);
    Route::post('/bookings', [BookingApiController::class, 'store']);
    Route::get('/flights/lookup', [FlightController::class, 'lookup']);
});

// Protected routes (future admin / driver app)
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    // Future admin routes
});
