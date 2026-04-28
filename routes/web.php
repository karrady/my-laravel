<?php

use App\Http\Controllers\ContactController;
use Illuminate\Support\Facades\Route;

// All SPA page routes — React Router handles client-side navigation
Route::get('/', fn () => view('spa'))->name('home');
Route::get('/diensten', fn () => view('spa'))->name('diensten');
Route::get('/airport-service', fn () => view('spa'))->name('airport-service');
Route::get('/over-ons', fn () => view('spa'))->name('over-ons');
Route::get('/reserveren', fn () => view('spa'))->name('reserveren');
Route::get('/contact', fn () => view('spa'))->name('contact');
Route::get('/chauffeur', fn () => view('spa'))->name('chauffeur');

// Contact form POST — keep for backwards compatibility with blade-era tests
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');

// Language switcher (used by session-based locale tests)
Route::post('/language/{locale}', function ($locale) {
    if (in_array($locale, ['nl', 'en'])) {
        session(['locale' => $locale]);
    }
    return back();
})->name('language.switch');
