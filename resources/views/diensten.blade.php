@extends('layouts.app')

@section('title', 'Onze Diensten — TaxiCentrale')
@section('description', 'Luchthavenvervoer, zakelijk vervoer, groepsvervoer en ritten op maat. Professioneel taxivervoer voor elk doel. Bekijk onze diensten en boek direct online.')

@section('content')

{{-- Page Header --}}
<section class="relative pt-40 pb-24 bg-gradient-to-b from-[#111] to-[#0f0f0f]">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,197,24,0.08)_0%,_transparent_60%)]"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Wat wij bieden</span>
        <h1 class="text-5xl sm:text-6xl font-black mt-3 mb-6">Onze Diensten</h1>
        <p class="text-gray-400 text-xl max-w-2xl mx-auto">
            Van luchthaven naar hotel, van thuis naar kantoor — professioneel vervoer voor elke situatie.
        </p>
    </div>
</section>

{{-- Diensten detail --}}
<section class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {{-- Luchthavenvervoer --}}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
                <div class="w-16 h-16 bg-[#f5c518]/10 rounded-2xl flex items-center justify-center mb-6">
                    <svg class="w-8 h-8 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                </div>
                <h2 class="text-3xl font-black mb-4">Luchthavenvervoer</h2>
                <p class="text-gray-400 leading-relaxed mb-6">
                    Stressvrij reizen begint met een betrouwbare transfer. Wij volgen uw vlucht live en passen de ophaaltime aan bij vertraging. U hoeft nergens op te wachten — wij wachten op u.
                </p>
                <ul class="space-y-3 mb-8">
                    @foreach(['Vlucht tracking inbegrepen', 'Ophalen bij aankomsthal', 'Hulp bij bagage', 'Alle luchthavens in Nederland', 'Vaste prijs vooraf'] as $feature)
                    <li class="flex items-center gap-3 text-gray-300 text-sm">
                        <div class="w-5 h-5 bg-[#f5c518]/20 rounded-full flex items-center justify-center flex-shrink-0">
                            <svg class="w-3 h-3 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                        </div>
                        {{ $feature }}
                    </li>
                    @endforeach
                </ul>
                <a href="{{ route('boeken') }}" class="inline-flex items-center gap-2 bg-[#f5c518] hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/25">
                    Boek Luchthavenrit
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
            </div>
            <div class="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8">
                <h3 class="font-bold text-white mb-6 text-lg">Vaste Luchthavenprijzen</h3>
                <div class="space-y-4">
                    @foreach([
                        ['from' => 'Naar Schiphol', 'price' => 'Op aanvraag'],
                        ['from' => 'Naar Rotterdam The Hague Airport', 'price' => 'Op aanvraag'],
                        ['from' => 'Naar Eindhoven Airport', 'price' => 'Op aanvraag'],
                        ['from' => 'Naar Brussels Airport', 'price' => 'Op aanvraag'],
                    ] as $price)
                    <div class="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                        <span class="text-gray-400 text-sm">{{ $price['from'] }}</span>
                        <span class="text-[#f5c518] font-bold">{{ $price['price'] }}</span>
                    </div>
                    @endforeach
                </div>
                <p class="text-gray-600 text-xs mt-4">* Prijzen zijn vaste tarieven inclusief BTW. Vraag een offerte aan voor exacte prijzen.</p>
            </div>
        </div>

        <div class="border-t border-white/5"></div>

        {{-- Zakelijk vervoer --}}
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div class="order-2 lg:order-1 bg-[#1a1a1a] border border-white/5 rounded-3xl p-8">
                <h3 class="font-bold text-white mb-6 text-lg">Zakelijke Voordelen</h3>
                <div class="space-y-4">
                    @foreach([
                        ['icon' => 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', 'text' => 'Factuur op bedrijfsnaam'],
                        ['icon' => 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', 'text' => 'Vaste zakelijke tarieven'],
                        ['icon' => 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', 'text' => 'Maandelijkse facturatie mogelijk'],
                        ['icon' => 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', 'text' => 'Representatieve luxe voertuigen'],
                        ['icon' => 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', 'text' => 'Prioriteit planning en bevestiging'],
                    ] as $voordeel)
                    <div class="flex items-center gap-3">
                        <svg class="w-5 h-5 text-[#f5c518] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="{{ $voordeel['icon'] }}"/>
                        </svg>
                        <span class="text-gray-300 text-sm">{{ $voordeel['text'] }}</span>
                    </div>
                    @endforeach
                </div>
                <div class="mt-6 pt-6 border-t border-white/10">
                    <a href="{{ route('contact') }}" class="text-[#f5c518] text-sm font-semibold hover:underline">Vraag zakelijk account aan →</a>
                </div>
            </div>
            <div class="order-1 lg:order-2">
                <div class="w-16 h-16 bg-[#f5c518]/10 rounded-2xl flex items-center justify-center mb-6">
                    <svg class="w-8 h-8 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm10 15H4v-2h16v2zm0-5H4V9h16v6z"/>
                    </svg>
                </div>
                <h2 class="text-3xl font-black mb-4">Zakelijk Vervoer</h2>
                <p class="text-gray-400 leading-relaxed mb-6">
                    Uw zakenpartner verdient het beste. Wij bieden representatief en punctueel vervoer voor meetings, congressen en zakenreizen. Discrete chauffeurs, luxe voertuigen en altijd op tijd.
                </p>
                <a href="{{ route('boeken') }}" class="inline-flex items-center gap-2 bg-[#f5c518] hover:bg-yellow-400 text-black font-bold px-6 py-3 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/25">
                    Zakelijke Rit Boeken
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
            </div>
        </div>

        <div class="border-t border-white/5"></div>

        {{-- Overige diensten grid --}}
        <div>
            <div class="text-center mb-12">
                <h2 class="text-3xl font-black mb-3">Meer Diensten</h2>
                <p class="text-gray-400">Voor elk vervoersvraagstuk hebben wij een passende oplossing.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                @foreach([
                    ['title' => 'Groepsvervoer', 'desc' => 'Bruiloften, feesten, uitstapjes. Comfortabel samen reizen in onze ruime voertuigen.', 'icon' => 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'],
                    ['title' => 'Medisch Vervoer', 'desc' => 'Vervoer naar dokter, ziekenhuis of fysiotherapeut. Rustig, veilig en met alle tijd.', 'icon' => 'M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 14l-5-5 1.41-1.41L12 14.17l7.59-7.59L21 8l-9 9z'],
                    ['title' => 'Avond & Nacht', 'desc' => 'Veilig thuiskomen na een avond uit. Wij zijn er altijd, ook midden in de nacht.', 'icon' => 'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z'],
                    ['title' => 'Lange Afstand', 'desc' => 'Comfortabel reizen door heel Nederland en naar Belgische of Duitse steden.', 'icon' => 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'],
                    ['title' => 'Ritten op Maat', 'desc' => 'Geen standaarddienst die past? Neem contact op en wij denken met u mee.', 'icon' => 'M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z'],
                    ['title' => 'Toeristische Trips', 'desc' => 'Stadsbezoeken, daguitstapjes of rondleidingen met een lokale chauffeur als gids.', 'icon' => 'M12 3L2 12h3v8h6v-5h2v5h6v-8h3L12 3z'],
                ] as $dienst)
                <div class="group bg-[#1a1a1a] hover:bg-[#1f1f1f] border border-white/5 hover:border-[#f5c518]/20 rounded-2xl p-6 transition-all hover:-translate-y-1">
                    <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#f5c518]/20 transition-colors">
                        <svg class="w-6 h-6 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="{{ $dienst['icon'] }}"/>
                        </svg>
                    </div>
                    <h3 class="font-bold text-white mb-2">{{ $dienst['title'] }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed mb-4">{{ $dienst['desc'] }}</p>
                    <a href="{{ route('boeken') }}" class="text-[#f5c518] text-sm font-semibold flex items-center gap-2 hover:gap-3 transition-all">
                        Boek nu <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </a>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</section>

{{-- CTA --}}
<section class="py-20 bg-[#f5c518]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-black text-black mb-4">Direct een rit boeken?</h2>
        <p class="text-black/70 text-lg mb-8">Vul het formulier in of bel ons direct. Wij zijn 24/7 bereikbaar.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="{{ route('boeken') }}" class="bg-black hover:bg-gray-900 text-white font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl text-lg">
                Online Boeken
            </a>
            <a href="tel:+31XXXXXXXXX" class="bg-black/10 hover:bg-black/20 text-black font-bold px-10 py-4 rounded-xl transition-all text-lg border-2 border-black/20">
                Bel Direct
            </a>
        </div>
    </div>
</section>

@endsection
