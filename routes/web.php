<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/diensten', [PageController::class, 'diensten'])->name('diensten');
Route::get('/airport-service', [PageController::class, 'airportService'])->name('airport-service');
Route::get('/over-ons', [PageController::class, 'overOns'])->name('over-ons');

Route::get('/reserveren', [BookingController::class, 'create'])->name('reserveren');
Route::post('/reserveren', [BookingController::class, 'store'])->name('reserveren.store');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
