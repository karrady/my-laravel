@extends('layouts.app')

@section('title', 'Diensten — TaxiCentrale')
@section('description', 'Onze taxidiensten: luchthavenvervoer naar Schiphol en Rotterdam met vaste tarieven. Zakelijk vervoer, groepsvervoer en andere ritten op aanvraag.')

@section('content')

{{-- Hero --}}
<section class="relative pt-40 pb-24 bg-gradient-to-b from-gray-50 to-white">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,197,24,0.06)_0%,_transparent_60%)]"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Wat wij bieden</span>
        <h1 class="text-5xl sm:text-6xl font-black mt-3 mb-6 text-gray-900">Onze Diensten</h1>
        <p class="text-gray-500 text-xl max-w-2xl mx-auto">
            Betrouwbaar vervoer voor elk moment. Airport service met vaste tarieven — overige ritten op aanvraag.
        </p>
    </div>
</section>

{{-- Hoofddienst: Airport Service --}}
<section class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <span class="inline-flex items-center gap-2 text-[#f5c518] text-sm font-semibold uppercase tracking-widest mb-4">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                    Onze hoofddienst
                </span>
                <h2 class="text-4xl font-black mb-6 text-gray-900">Airport Service</h2>
                <p class="text-gray-500 leading-relaxed mb-6">
                    Zorgeloos naar het vliegveld. Wij brengen u van deur tot deur — we volgen uw vlucht zodat u nooit te vroeg of te laat hoeft te wachten. Vaste tarieven, geen verrassingen.
                </p>
                <ul class="space-y-3 mb-8">
                    @foreach(['Vaste tarieven vooraf', 'Vlucht tracking inbegrepen', '24/7 beschikbaar', 'Deur-tot-deur service', 'Minimaal 24u van tevoren boeken'] as $punt)
                    <li class="flex items-center gap-3 text-gray-700 text-sm">
                        <svg class="w-5 h-5 text-[#f5c518] flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                        {{ $punt }}
                    </li>
                    @endforeach
                </ul>
                <div class="flex flex-wrap gap-4">
                    <a href="{{ route('airport-service') }}" class="bg-[#f5c518] hover:bg-yellow-400 text-black font-bold px-8 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/25">
                        Bekijk Tarieven
                    </a>
                    <a href="{{ route('reserveren') }}" class="bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold px-8 py-3.5 rounded-xl transition-all">
                        Direct Reserveren
                    </a>
                </div>
            </div>

            {{-- Luchthavens --}}
            <div class="grid grid-cols-2 gap-4">
                @foreach([
                    ['naam' => 'Amsterdam Schiphol', 'code' => 'AMS', 'info' => 'Vaste tarieven beschikbaar'],
                    ['naam' => 'Rotterdam The Hague', 'code' => 'RTM', 'info' => 'Vaste tarieven beschikbaar'],
                    ['naam' => 'Eindhoven Airport', 'code' => 'EIN', 'info' => 'Op aanvraag'],
                    ['naam' => 'Brussel Zaventem', 'code' => 'BRU', 'info' => 'Op aanvraag'],
                    ['naam' => 'Düsseldorf Airport', 'code' => 'DUS', 'info' => 'Op aanvraag'],
                    ['naam' => 'Andere luchthaven', 'code' => '···', 'info' => 'Bel voor offerte'],
                ] as $vliegveld)
                <div class="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div class="text-2xl font-black text-[#f5c518] mb-1">{{ $vliegveld['code'] }}</div>
                    <div class="text-gray-900 font-semibold text-sm mb-1">{{ $vliegveld['naam'] }}</div>
                    <div class="text-gray-400 text-xs">{{ $vliegveld['info'] }}</div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</section>

{{-- Overige diensten op aanvraag --}}
<section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Overige diensten</span>
            <h2 class="text-4xl font-black mt-3 mb-4 text-gray-900">Op Aanvraag</h2>
            <p class="text-gray-500 max-w-xl mx-auto">Voor onderstaande diensten kunt u telefonisch contact opnemen. Wij geven u direct een prijs op maat.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            @foreach([
                ['icon' => 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', 'title' => 'Zakelijk Vervoer', 'desc' => 'Representatief vervoer voor uw vergadering, event of zakenreis. Professionele chauffeurs, op tijd.'],
                ['icon' => 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', 'title' => 'Groepsvervoer', 'desc' => 'Heeft u een grotere groep? Neem contact op en wij zorgen voor een passende oplossing.'],
                ['icon' => 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', 'title' => 'Ritten op Maat', 'desc' => 'Ziekenhuis, treinstation, evenement of een ander adres — wij rijden overal naartoe.'],
            ] as $dienst)
            <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center mb-5">
                    <svg class="w-6 h-6 text-[#f5c518]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="{{ $dienst['icon'] }}"/>
                    </svg>
                </div>
                <h3 class="text-gray-900 font-bold text-lg mb-3">{{ $dienst['title'] }}</h3>
                <p class="text-gray-500 text-sm leading-relaxed mb-5">{{ $dienst['desc'] }}</p>
                <a href="tel:+31XXXXXXXXX" class="inline-flex items-center gap-2 text-[#f5c518] text-sm font-semibold hover:gap-3 transition-all">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                    Bel voor een offerte
                </a>
            </div>
            @endforeach
        </div>

        <div class="bg-white border border-[#f5c518]/30 rounded-3xl p-10 text-center shadow-sm">
            <div class="w-16 h-16 bg-[#f5c518]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg class="w-8 h-8 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
            </div>
            <h3 class="text-2xl font-black mb-3 text-gray-900">Vragen of een speciale rit?</h3>
            <p class="text-gray-500 mb-6">Bel ons direct — wij zijn 24/7 bereikbaar en helpen u graag verder.</p>
            <a href="tel:+31XXXXXXXXX" class="inline-flex items-center gap-3 bg-[#f5c518] hover:bg-yellow-400 text-black font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-yellow-500/25 text-lg">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                +31 XX XXX XXXX
            </a>
        </div>
    </div>
</section>

@endsection
