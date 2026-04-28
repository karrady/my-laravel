<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DriverPinMiddleware
{
    public function handle(Request $request, Closure $next): Response
    {
        $pin = $request->header('X-Driver-Pin')
            ?? $request->query('pin');

        if ($pin !== config('app.driver_pin')) {
            return response()->json(['error' => 'Ongeldig chauffeurspincode.'], 401);
        }

        return $next($request);
    }
}
