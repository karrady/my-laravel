<?php

use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\BookingAdminController;
use App\Http\Controllers\Admin\CmsController;
use App\Http\Controllers\Admin\CustomerController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\WebhookController;
use App\Http\Controllers\Api\BookingApiController;
use App\Http\Controllers\Api\FlightController;
use App\Http\Controllers\Api\PriceController;
use App\Http\Controllers\Api\QuickBookingController;
use App\Http\Controllers\Driver\DriverController;
use Illuminate\Support\Facades\Route;

// Public API — no auth required
Route::prefix('v1')->group(function () {
    Route::get('/vehicles', [PriceController::class, 'vehicles']);
    Route::post('/bookings/estimate', [PriceController::class, 'estimate']);
    Route::post('/bookings', [BookingApiController::class, 'store']);
    Route::post('/quick-requests', [QuickBookingController::class, 'store']);
    Route::get('/flights/lookup', [FlightController::class, 'lookup']);
});

// Publieke CMS-data (geen auth)
Route::prefix('v1')->group(function () {
    Route::get('/faqs', [App\Http\Controllers\Api\PublicCmsController::class, 'faqs']);
    Route::get('/reviews', [App\Http\Controllers\Api\PublicCmsController::class, 'reviews']);
    Route::get('/fixed-prices', [App\Http\Controllers\Api\PublicCmsController::class, 'fixedPrices']);
    Route::get('/service-areas', [App\Http\Controllers\Api\PublicCmsController::class, 'serviceAreas']);
    Route::get('/service-areas/{slug}', [App\Http\Controllers\Api\PublicCmsController::class, 'serviceArea']);
});

// Chauffeursdashboard API — beveiligd met DRIVER_PIN header
Route::middleware('driver.pin')->prefix('v1/driver')->group(function () {
    Route::get('/bookings', [DriverController::class, 'index']);
    Route::post('/bookings/{booking}/accept', [DriverController::class, 'accept']);
});

// Webhooks — geen auth (Moneybird verifieert via secret token in URL of payload)
Route::post('/webhooks/moneybird', [WebhookController::class, 'moneybird']);

// Admin auth (publiek, geen Sanctum vereist)
Route::prefix('admin')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
});

// Admin panel — Sanctum + is_admin vereist
Route::middleware(['auth:sanctum', 'admin'])->prefix('admin')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Dashboard
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Boekingen
    Route::get('/bookings', [BookingAdminController::class, 'index']);
    Route::get('/bookings/{booking}', [BookingAdminController::class, 'show']);
    Route::patch('/bookings/{booking}', [BookingAdminController::class, 'update']);
    Route::post('/bookings/{booking}/moneybird/quote', [BookingAdminController::class, 'createQuote']);
    Route::post('/bookings/{booking}/moneybird/send-quote', [BookingAdminController::class, 'sendQuote']);
    Route::post('/bookings/{booking}/moneybird/invoice', [BookingAdminController::class, 'convertToInvoice']);

    // Klanten (mini CRM)
    Route::get('/customers', [CustomerController::class, 'index']);
    Route::get('/customers/{email}', [CustomerController::class, 'show'])->where('email', '.+');

    // CMS — Voertuigen
    Route::get('/cms/vehicles', [CmsController::class, 'vehiclesIndex']);
    Route::post('/cms/vehicles', [CmsController::class, 'vehiclesStore']);
    Route::patch('/cms/vehicles/{vehicle}', [CmsController::class, 'vehiclesUpdate']);
    Route::delete('/cms/vehicles/{vehicle}', [CmsController::class, 'vehiclesDestroy']);

    // CMS — Vaste prijzen
    Route::get('/cms/fixed-prices', [CmsController::class, 'fixedPricesIndex']);
    Route::post('/cms/fixed-prices', [CmsController::class, 'fixedPricesStore']);
    Route::patch('/cms/fixed-prices/{fixedPrice}', [CmsController::class, 'fixedPricesUpdate']);
    Route::delete('/cms/fixed-prices/{fixedPrice}', [CmsController::class, 'fixedPricesDestroy']);

    // CMS — FAQs
    Route::get('/cms/faqs', [CmsController::class, 'faqsIndex']);
    Route::post('/cms/faqs', [CmsController::class, 'faqsStore']);
    Route::patch('/cms/faqs/{faq}', [CmsController::class, 'faqsUpdate']);
    Route::delete('/cms/faqs/{faq}', [CmsController::class, 'faqsDestroy']);

    // CMS — Reviews
    Route::get('/cms/reviews', [CmsController::class, 'reviewsIndex']);
    Route::post('/cms/reviews', [CmsController::class, 'reviewsStore']);
    Route::patch('/cms/reviews/{review}', [CmsController::class, 'reviewsUpdate']);
    Route::delete('/cms/reviews/{review}', [CmsController::class, 'reviewsDestroy']);

    // CMS — Servicegebieden
    Route::get('/cms/service-areas', [CmsController::class, 'serviceAreasIndex']);
    Route::post('/cms/service-areas', [CmsController::class, 'serviceAreasStore']);
    Route::patch('/cms/service-areas/{serviceArea}', [CmsController::class, 'serviceAreasUpdate']);
    Route::delete('/cms/service-areas/{serviceArea}', [CmsController::class, 'serviceAreasDestroy']);

    // Contactberichten beheer
    Route::get('/contact-messages', [CmsController::class, 'contactMessagesIndex']);
    Route::get('/contact-messages/{message}', [CmsController::class, 'contactMessagesShow']);
    Route::patch('/contact-messages/{message}', [CmsController::class, 'contactMessagesUpdate']);
    Route::delete('/contact-messages/{message}', [CmsController::class, 'contactMessagesDestroy']);
});
