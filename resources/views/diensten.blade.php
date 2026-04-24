@extends('layouts.app')

@section('title', 'Diensten — TaxiCentrale')
@section('description', 'Onze taxidiensten: luchthavenvervoer, zakelijk vervoer, groepsvervoer en ritten op maat. Vaste tarieven voor airport service, overige diensten op aanvraag.')

@section('content')

{{-- Hero --}}
<section class="relative pt-40 pb-24 bg-gradient-to-b from-gray-50 to-white">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,197,24,0.06)_0%,_transparent_60%)]"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Wat wij bieden</span>
        <h1 class="text-5xl sm:text-6xl font-black mt-3 mb-6 text-gray-900">Onze Diensten</h1>
        <p class="text-gray-500 text-xl max-w-2xl mx-auto">
            Voor elk vervoer staan wij voor u klaar. Airport service met vaste tarieven, overige ritten op aanvraag.
        </p>
    </div>
</section>

{{-- Diensten grid --}}
<section class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {{-- Airport Service --}}
            <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col">
                <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center mb-5">
                    <svg class="w-6 h-6 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
                    </svg>
                </div>
                <h3 class="text-gray-900 font-bold text-xl mb-3">Airport Service</h3>
                <p class="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">Stressvrij van deur tot gate. Vaste tarieven naar Schiphol en Rotterdam The Hague Airport. Wij volgen uw vlucht en staan op tijd voor de deur.</p>
                <div class="flex flex-col gap-2">
                    <a href="{{ route('airport-service') }}" class="inline-flex items-center justify-center gap-2 bg-[#f5c518] hover:bg-yellow-400 text-black font-bold px-5 py-2.5 rounded-xl transition-all text-sm">
                        Bekijk tarieven
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                    </a>
                    <a href="{{ route('reserveren') }}" class="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 font-semibold px-5 py-2.5 rounded-xl transition-all text-sm">
                        Direct reserveren
                    </a>
                </div>
            </div>

            {{-- Zakelijk Vervoer --}}
            <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col">
                <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center mb-5">
                    <svg class="w-6 h-6 text-[#f5c518]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                </div>
                <h3 class="text-gray-900 font-bold text-xl mb-3">Zakelijk Vervoer</h3>
                <p class="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">Representatief en punctueel vervoer voor vergaderingen, congressen en zakenreizen. Professionele chauffeurs die u op tijd brengen.</p>
                <a href="tel:+31XXXXXXXXX" class="inline-flex items-center gap-2 text-[#f5c518] text-sm font-semibold">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    Op aanvraag — bel ons
                </a>
            </div>

            {{-- Groepsvervoer --}}
            <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col">
                <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center mb-5">
                    <svg class="w-6 h-6 text-[#f5c518]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                </div>
                <h3 class="text-gray-900 font-bold text-xl mb-3">Groepsvervoer</h3>
                <p class="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">Uitstapjes, bruiloften, vrijgezellenfeesten of een bedrijfsuitje — samen reizen in stijl. Vraag naar de mogelijkheden.</p>
                <a href="tel:+31XXXXXXXXX" class="inline-flex items-center gap-2 text-[#f5c518] text-sm font-semibold">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    Op aanvraag — bel ons
                </a>
            </div>

            {{-- Ritten op Maat --}}
            <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col">
                <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center mb-5">
                    <svg class="w-6 h-6 text-[#f5c518]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                </div>
                <h3 class="text-gray-900 font-bold text-xl mb-3">Ritten op Maat</h3>
                <p class="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">Ziekenhuis, treinstation, evenement of gewoon thuis — wij rijden u waar u naartoe wilt, door heel Nederland.</p>
                <a href="tel:+31XXXXXXXXX" class="inline-flex items-center gap-2 text-[#f5c518] text-sm font-semibold">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    Op aanvraag — bel ons
                </a>
            </div>

            {{-- Avond & Nacht --}}
            <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col">
                <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center mb-5">
                    <svg class="w-6 h-6 text-[#f5c518]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                    </svg>
                </div>
                <h3 class="text-gray-900 font-bold text-xl mb-3">Avond & Nacht</h3>
                <p class="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">Veilig thuiskomen na een avondje uit. Wij rijden 24/7 en staan ook 's nachts voor u klaar. Let op: nachtopslag van €20,00 tussen 00:00–06:00.</p>
                <a href="tel:+31XXXXXXXXX" class="inline-flex items-center gap-2 text-[#f5c518] text-sm font-semibold">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    Op aanvraag — bel ons
                </a>
            </div>

            {{-- Lange Afstand --}}
            <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col">
                <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center mb-5">
                    <svg class="w-6 h-6 text-[#f5c518]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"/>
                    </svg>
                </div>
                <h3 class="text-gray-900 font-bold text-xl mb-3">Lange Afstand</h3>
                <p class="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">Comfortabel reizen door heel Nederland en op aanvraag naar het buitenland. Prijs op maat, geen verrassing onderweg.</p>
                <a href="tel:+31XXXXXXXXX" class="inline-flex items-center gap-2 text-[#f5c518] text-sm font-semibold">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    Op aanvraag — bel ons
                </a>
            </div>

        </div>

        {{-- Bel CTA --}}
        <div class="mt-16 bg-[#f5c518] rounded-3xl p-10 text-center">
            <h3 class="text-2xl font-black mb-3 text-black">Vragen of een speciale rit?</h3>
            <p class="text-black/70 mb-6">Bel ons direct — wij zijn 24/7 bereikbaar en helpen u graag verder.</p>
            <a href="tel:+31XXXXXXXXX" class="inline-flex items-center gap-3 bg-black hover:bg-gray-900 text-white font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl text-lg">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                +31 XX XXX XXXX
            </a>
        </div>
    </div>
</section>

@endsection
