@php
$ldJson = json_encode([
    '@context'    => 'https://schema.org',
    '@type'       => 'TaxiService',
    'name'        => 'YAS TaxiCentrale',
    'description' => 'Betrouwbaar taxivervoer in Gouda en omgeving.',
    'url'         => config('app.url'),
    'telephone'   => '+31852128302',
    'areaServed'  => [
        ['@type' => 'City', 'name' => 'Gouda'],
        ['@type' => 'City', 'name' => 'Alphen aan den Rijn'],
        ['@type' => 'City', 'name' => 'Waddinxveen'],
        ['@type' => 'City', 'name' => 'Boskoop'],
        ['@type' => 'City', 'name' => 'Bodegraven'],
        ['@type' => 'City', 'name' => 'Reeuwijk'],
    ],
    'address'     => ['@type' => 'PostalAddress', 'addressLocality' => 'Gouda', 'addressCountry' => 'NL'],
    'priceRange'  => '€€',
    'openingHours' => 'Mo-Su 00:00-24:00',
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
@endphp
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>YAS TaxiCentrale — Taxivervoer in Gouda & Rijn en Gouwe</title>
    <meta name="description" content="YAS TaxiCentrale: betrouwbaar taxivervoer in Gouda, Alphen aan den Rijn, Waddinxveen, Boskoop en de hele Rijn en Gouwe regio. Luchthaventransfers, zakelijk vervoer, 24/7. Bel 085 212 83 02.">

    {{-- PWA --}}
    <link rel="manifest" href="/manifest.webmanifest">
    <meta name="theme-color" content="#0E0E0E">
    <meta name="application-name" content="YAS TaxiCentrale">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
    <meta name="apple-mobile-web-app-title" content="YAS Taxi">
    <link rel="apple-touch-icon" href="/pwa-icon.svg">

    <link rel="icon" type="image/svg+xml" href="/favicon.svg">
    <link rel="canonical" href="{{ url()->current() }}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;700;800&family=Source+Sans+3:ital,wght@0,400;0,600;1,400&display=swap" rel="stylesheet">

    <script type="application/ld+json">{!! $ldJson !!}</script>

    @viteReactRefresh
    @vite('resources/js/app.tsx')

    @production
    <script>
        if ("serviceWorker" in navigator) {
            window.addEventListener("load", () => {
                navigator.serviceWorker.register("/sw.js").catch(() => {});
            });
        }
    </script>
    @else
    <script>
        // Dev: ensure no stale SW is intercepting requests during HMR.
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.getRegistrations().then((regs) => regs.forEach((r) => r.unregister()));
        }
    </script>
    @endproduction
</head>
<body class="antialiased">
    <div id="root"></div>
</body>
</html>
