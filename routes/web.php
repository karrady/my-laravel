<?php

use App\Http\Controllers\BookingController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\PageController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'home'])->name('home');
Route::get('/diensten', [PageController::class, 'diensten'])->name('diensten');
Route::get('/over-ons', [PageController::class, 'overOns'])->name('over-ons');

Route::get('/boeken', [BookingController::class, 'create'])->name('boeken');
Route::post('/boeken', [BookingController::class, 'store'])->name('boeken.store');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store'])->name('contact.store');
