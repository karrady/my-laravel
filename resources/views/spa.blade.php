@php
$ldJson = json_encode([
    '@context'    => 'https://schema.org',
    '@type'       => 'TaxiService',
    'name'        => 'YAS TaxiCentrale',
    'description' => 'Betrouwbaar taxivervoer in Gouda en omgeving.',
    'url'         => config('app.url'),
    'telephone'   => '+31182123456',
    'areaServed'  => ['@type' => 'City', 'name' => 'Gouda'],
    'address'     => ['@type' => 'PostalAddress', 'addressLocality' => 'Gouda', 'addressCountry' => 'NL'],
    'priceRange'  => '€€',
    'openingHours' => 'Mo-Su 00:00-24:00',
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
@endphp
<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>YAS TaxiCentrale — Betrouwbaar Taxivervoer in Gouda</title>
    <meta name="description" content="YAS TaxiCentrale biedt betrouwbaar taxivervoer in Gouda en omgeving. Luchthaventransfers, zakelijk vervoer, 24/7 beschikbaar. Vaste prijzen, direct boeken.">

    <link rel="canonical" href="{{ url()->current() }}">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap" rel="stylesheet">

    <script type="application/ld+json">{!! $ldJson !!}</script>

    @viteReactRefresh
    @vite('resources/js/app.tsx')
</head>
<body class="antialiased">
    <div id="root"></div>
</body>
</html>
