<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function create()
    {
        return view('reserveren');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name'            => 'required|string|max:100',
            'email'           => 'required|email|max:150',
            'phone'           => 'required|string|max:20',
            'pickup_location' => 'required|string|max:200',
            'destination'     => 'required|string|max:200',
            'date'            => 'required|date|after:today',
            'time'            => 'required',
            'passengers'      => 'required|integer|min:1|max:8',
            'service_type'    => 'required|string',
            'notes'           => 'nullable|string|max:500',
        ]);

        Booking::create($validated);

        return redirect()->route('reserveren')->with('success',
            'Bedankt! Uw boeking is ontvangen. We nemen zo snel mogelijk contact met u op ter bevestiging.'
        );
    }
}
