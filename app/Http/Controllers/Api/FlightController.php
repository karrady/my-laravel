<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\FlightLookupService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    public function __construct(private FlightLookupService $flightService) {}

    /**
     * GET /api/v1/flights/lookup
     *
     * Geeft vluchtinformatie terug met een GEADVISEERDE ophaaltijd.
     * De definitieve ophaaltijd is altijd de verantwoordelijkheid van de klant.
     *
     * Query params:
     *   number     — vluchtnummer, bijv. KL1234
     *   date       — YYYY-MM-DD
     *   direction  — to_airport | from_airport
     *   pickup_lat — (optioneel) breedtegraad ophaaladres, voor OSRM reistijd
     *   pickup_lng — (optioneel) lengtegraad ophaaladres
     */
    public function lookup(Request $request): JsonResponse
    {
        $request->validate([
            'number'     => 'required|string|max:10',
            'date'       => 'required|date_format:Y-m-d|after_or_equal:today',
            'direction'  => 'required|in:to_airport,from_airport',
            'pickup_lat' => 'nullable|numeric|between:-90,90',
            'pickup_lng' => 'nullable|numeric|between:-180,180',
        ]);

        $flight = $this->flightService->lookup($request->number, $request->date);

        if (! $flight) {
            return response()->json([
                'message' => 'Vlucht niet gevonden. Controleer het vluchtnummer en de datum.',
            ], 404);
        }

        $advice = $this->flightService->calculateAdvice(
            $flight,
            $request->direction,
            $request->float('pickup_lat'),
            $request->float('pickup_lng'),
        );

        // Formatteer het geadviseerde tijdstip leesbaar
        $advisedFormatted = null;
        if ($advice['advised_at']) {
            $dt = new \DateTimeImmutable($advice['advised_at']);
            $advisedFormatted = $dt->setTimezone(new \DateTimeZone('Europe/Amsterdam'))
                ->format('D j M \o\m H:i');
        }

        return response()->json([
            'flight'    => $flight,
            'direction' => $request->direction,
            'advice'    => [
                'advised_at'           => $advice['advised_at'],
                'advised_at_formatted' => $advisedFormatted,
                'breakdown'            => $advice['breakdown'],
                // Expliciete disclaimer — verantwoordelijkheid ligt bij de klant
                'disclaimer' => 'Dit is een reistijdadvies. De definitieve ophaaltijd kiest u zelf bij het boeken.',
            ],
        ]);
    }
}
