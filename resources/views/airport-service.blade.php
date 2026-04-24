@extends('layouts.app')

@section('title', 'Airport Service — TaxiCentrale')
@section('description', 'Professioneel luchthavenvervoer van en naar Schiphol, Rotterdam The Hague Airport en Eindhoven Airport. Vluchten worden gevolgd, vaste tarieven, 24/7 beschikbaar.')

@section('content')

{{-- Hero --}}
<section class="relative pt-40 pb-24 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#1a1a1a]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,197,24,0.10)_0%,_transparent_55%)]"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <div class="inline-flex items-center gap-2 bg-[#f5c518]/10 border border-[#f5c518]/20 rounded-full px-4 py-2 mb-6">
                    <svg class="w-4 h-4 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                    <span class="text-[#f5c518] text-sm font-medium">Airport Service</span>
                </div>
                <h1 class="text-5xl sm:text-6xl font-black leading-tight mb-6">
                    Zorgeloos naar<br><span class="text-[#f5c518]">het vliegveld.</span>
                </h1>
                <p class="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg">
                    Wij halen u op aan de voordeur en brengen u stressloos naar uw luchthaven. Bij aankomst staan wij in de aankomsthal voor u klaar — ongeacht vertraging.
                </p>
                <div class="flex flex-col sm:flex-row gap-4">
                    <a href="{{ route('reserveren') }}" class="inline-flex items-center justify-center gap-3 bg-[#f5c518] hover:bg-yellow-400 text-black font-bold text-lg px-8 py-4 rounded-xl transition-all hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-1">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
                        Airport Transfer Boeken
                    </a>
                    <a href="tel:+31XXXXXXXXX" class="inline-flex items-center justify-center gap-3 border border-white/20 hover:border-white/40 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all hover:bg-white/5">
                        <svg class="w-5 h-5 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                        Direct bellen
                    </a>
                </div>
            </div>

            {{-- USP kaarten --}}
            <div class="grid grid-cols-2 gap-4">
                @foreach([
                    ['icon' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H9V8h2v8zm4 0h-2V8h2v8z', 'title' => 'Vlucht Tracking', 'desc' => 'Wij volgen uw vlucht live en passen ophaal­tijd aan'],
                    ['icon' => 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z', 'title' => '24/7 Beschikbaar', 'desc' => 'Vroege vluchten, late aankomsten — wij zijn er altijd'],
                    ['icon' => 'M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zm-.5 1.5l1.96 2.5H17V9.5h2.5zM6 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm2.22-3c-.55-.61-1.33-1-2.22-1s-1.67.39-2.22 1H3V6h12v9H8.22zM18 18c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z', 'title' => 'Deur-tot-deur', 'desc' => 'Ophalen bij uw adres, afzetten aan de terminal'],
                    ['icon' => 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z', 'title' => 'Vaste Prijs', 'desc' => 'U weet van tevoren wat u betaalt — geen verrassingen'],
                ] as $usp)
                <div class="bg-[#1a1a1a] border border-white/5 rounded-2xl p-5">
                    <div class="w-10 h-10 bg-[#f5c518]/10 rounded-xl flex items-center justify-center mb-3">
                        <svg class="w-5 h-5 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24"><path d="{{ $usp['icon'] }}"/></svg>
                    </div>
                    <h3 class="font-bold text-white text-sm mb-1">{{ $usp['title'] }}</h3>
                    <p class="text-gray-500 text-xs leading-relaxed">{{ $usp['desc'] }}</p>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</section>

{{-- Luchthavens --}}
<section class="py-24 bg-[#0a0a0a]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-14">
            <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Wij rijden u naar</span>
            <h2 class="text-4xl sm:text-5xl font-black mt-3 mb-3">Alle Luchthavens</h2>
            <p class="text-gray-400 max-w-xl mx-auto">Van Nederland tot België — wij kennen de weg en zijn op tijd.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach([
                ['name' => 'Amsterdam Schiphol', 'code' => 'AMS', 'desc' => 'De grootste luchthaven van Nederland. Wij rijden u naar alle terminals.', 'time' => 'Afhankelijk van locatie'],
                ['name' => 'Rotterdam The Hague', 'code' => 'RTM', 'desc' => 'Compact vliegveld, ideaal voor Europese bestemmingen.', 'time' => 'Afhankelijk van locatie'],
                ['name' => 'Eindhoven Airport', 'code' => 'EIN', 'desc' => 'Populaire luchthaven voor zuidelijk Nederland en low-cost vluchten.', 'time' => 'Afhankelijk van locatie'],
                ['name' => 'Brussels Airport', 'code' => 'BRU', 'desc' => 'Internationale hub in België, op aanvraag beschikbaar.', 'time' => 'Op aanvraag'],
                ['name' => 'Düsseldorf Airport', 'code' => 'DUS', 'desc' => 'Groot Duits vliegveld met uitstekende verbindingen.', 'time' => 'Op aanvraag'],
                ['name' => 'Andere luchthaven', 'code' => '???', 'desc' => 'Vliegt u vanaf een andere luchthaven? Neem contact op voor een offerte.', 'time' => 'Op aanvraag'],
            ] as $airport)
            <div class="group bg-[#1a1a1a] border border-white/5 hover:border-[#f5c518]/20 rounded-2xl p-6 transition-all hover:-translate-y-1">
                <div class="flex items-start justify-between mb-4">
                    <div class="w-14 h-14 bg-[#f5c518]/10 rounded-xl flex items-center justify-center group-hover:bg-[#f5c518]/20 transition-colors">
                        <span class="text-[#f5c518] font-black text-sm tracking-tight">{{ $airport['code'] }}</span>
                    </div>
                    <span class="text-gray-600 text-xs bg-white/5 px-2 py-1 rounded-full">{{ $airport['time'] }}</span>
                </div>
                <h3 class="font-bold text-white text-lg mb-2">{{ $airport['name'] }}</h3>
                <p class="text-gray-500 text-sm leading-relaxed mb-4">{{ $airport['desc'] }}</p>
                <a href="{{ route('reserveren') }}?service_type=luchthaven" class="text-[#f5c518] text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                    Boek transfer <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
            </div>
            @endforeach
        </div>
    </div>
</section>

{{-- Hoe werkt het --}}
<section class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Zo simpel is het</span>
            <h2 class="text-4xl font-black mt-3">Uw Airport Transfer in 3 Stappen</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @foreach([
                ['num' => '01', 'title' => 'Boek Online of Bel', 'desc' => 'Geef uw vertrek­adres, luchthaven, datum en vlucht­nummer op. Wij bevestigen binnen 2 uur.'],
                ['num' => '02', 'title' => 'Wij Staan Klaar', 'desc' => 'Op de afgesproken tijd staat onze chauffeur bij u voor de deur, ruim op tijd voor vertrek.'],
                ['num' => '03', 'title' => 'Zorgeloos Vliegen', 'desc' => 'Comfortabel naar de luchthaven. Bij terugkomst halen wij u op na het doorlopen van de douane.'],
            ] as $step)
            <div class="relative text-center">
                <div class="w-16 h-16 bg-[#f5c518] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/20">
                    <span class="text-black font-black text-lg">{{ $step['num'] }}</span>
                </div>
                <h3 class="text-xl font-bold mb-3">{{ $step['title'] }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{{ $step['desc'] }}</p>
            </div>
            @endforeach
        </div>
    </div>
</section>

{{-- Baggage info --}}
<section class="py-16 bg-[#0a0a0a]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
                <h2 class="text-3xl font-black mb-5">Wat mag u meenemen?</h2>
                <div class="space-y-4">
                    @foreach([
                        ['title' => 'Handbagage', 'desc' => 'Kleine tassen, rugzakken, laptops — geen probleem.'],
                        ['title' => 'Koffers & grote bagage', 'desc' => 'Ruime voertuigen voor meerdere grote koffers.'],
                        ['title' => 'Ski\'s & sportuitrusting', 'desc' => 'Vertel ons van tevoren wat u meeneemt.'],
                        ['title' => 'Kinderzitjes', 'desc' => 'Op aanvraag regelen wij een passend kinderzitje.'],
                    ] as $item)
                    <div class="flex items-start gap-3">
                        <div class="w-6 h-6 bg-[#f5c518]/15 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <svg class="w-3.5 h-3.5 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        </div>
                        <div>
                            <span class="text-white font-semibold text-sm">{{ $item['title'] }}</span>
                            <span class="text-gray-500 text-sm"> — {{ $item['desc'] }}</span>
                        </div>
                    </div>
                    @endforeach
                </div>
            </div>

            <div class="bg-[#1a1a1a] border border-[#f5c518]/20 rounded-3xl p-8">
                <div class="flex items-center gap-3 mb-6">
                    <div class="w-10 h-10 bg-[#f5c518] rounded-xl flex items-center justify-center">
                        <svg class="w-5 h-5 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/></svg>
                    </div>
                    <h3 class="font-bold text-white text-lg">Handige Tips</h3>
                </div>
                <ul class="space-y-3 text-sm text-gray-400">
                    <li class="flex items-start gap-2"><span class="text-[#f5c518] font-bold flex-shrink-0">→</span>Boek minimaal 24 uur van tevoren voor de beste beschikbaarheid</li>
                    <li class="flex items-start gap-2"><span class="text-[#f5c518] font-bold flex-shrink-0">→</span>Geef uw vluchtnummer op zodat wij uw vlucht kunnen volgen</li>
                    <li class="flex items-start gap-2"><span class="text-[#f5c518] font-bold flex-shrink-0">→</span>Reken op extra tijd bij Schiphol: aanwezig zijn 3 uur voor vertrek</li>
                    <li class="flex items-start gap-2"><span class="text-[#f5c518] font-bold flex-shrink-0">→</span>Bij terugkomst wachten wij op u in de aankomsthal</li>
                    <li class="flex items-start gap-2"><span class="text-[#f5c518] font-bold flex-shrink-0">→</span>Betalen kan cash of pin bij de chauffeur</li>
                </ul>
            </div>
        </div>
    </div>
</section>

{{-- CTA --}}
<section class="py-20 bg-[#f5c518]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl sm:text-5xl font-black text-black mb-4">Klaar voor uw vlucht?</h2>
        <p class="text-black/70 text-lg mb-8">Boek uw airport transfer en vlieg zorgeloos.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="{{ route('reserveren') }}" class="bg-black hover:bg-gray-900 text-white font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl text-lg">
                Nu Reserveren
            </a>
            <a href="tel:+31XXXXXXXXX" class="bg-black/10 hover:bg-black/20 text-black font-bold px-10 py-4 rounded-xl transition-all text-lg border-2 border-black/20">
                Bel Direct
            </a>
        </div>
    </div>
</section>

@endsection
