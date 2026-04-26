@extends('layouts.app')

@section('title', 'Airport Service | TaxiCentrale')
@section('description', 'Betrouwbaar luchthavenvervoer van en naar Schiphol, Rotterdam The Hague Airport en meer. Vaste tarieven, 24/7 beschikbaar, vluchten worden gevolgd.')

@section('content')

{{-- Hero --}}
<section class="relative pt-40 pb-24 overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-white"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,197,24,0.1)_0%,_transparent_60%)]"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-flex items-center gap-2 text-[#f5c518] text-sm font-semibold uppercase tracking-widest mb-4">
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
            Luchthavenvervoer
        </span>
        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight text-gray-900">
            Airport <span class="text-[#f5c518]">Service</span>
        </h1>
        <p class="text-gray-500 text-xl max-w-2xl mx-auto mb-10">
            Zorgeloos naar het vliegveld. Vaste tarieven, geen verrassingen. Dag en nacht voor u klaar.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="{{ route('reserveren') }}" class="bg-[#f5c518] hover:bg-yellow-400 text-black font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-yellow-500/25 text-lg">
                Direct Reserveren
            </a>
            <a href="tel:+31XXXXXXXXX" class="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 font-semibold px-8 py-4 rounded-xl transition-all text-lg">
                <svg class="w-5 h-5 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                Bel Ons
            </a>
        </div>
    </div>
</section>

{{-- USPs --}}
<section class="py-16 border-y border-gray-100 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            @foreach([
                ['icon' => 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', 'title' => 'Vaste Tarieven', 'desc' => 'Geen verborgen kosten'],
                ['icon' => 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', 'title' => '24/7 Beschikbaar', 'desc' => 'Dag en nacht voor u'],
                ['icon' => 'M5 3l14 9-14 9V3z', 'title' => 'Vlucht Tracking', 'desc' => 'Wij volgen uw vlucht'],
                ['icon' => 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', 'title' => 'Deur tot Deur', 'desc' => 'Thuis opgehaald'],
            ] as $usp)
            <div class="flex flex-col items-center text-center p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
                <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center mb-4">
                    <svg class="w-6 h-6 text-[#f5c518]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="{{ $usp['icon'] }}"/>
                    </svg>
                </div>
                <div class="font-bold text-gray-900 text-sm mb-1">{{ $usp['title'] }}</div>
                <div class="text-gray-400 text-xs">{{ $usp['desc'] }}</div>
            </div>
            @endforeach
        </div>
    </div>
</section>

{{-- Prijstabellen --}}
<section class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="text-center mb-16">
            <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Tarieven</span>
            <h2 class="text-4xl font-black mt-3 mb-4 text-gray-900">Vaste Prijzen per Luchthaven</h2>
            <p class="text-gray-500 max-w-xl mx-auto text-sm">Alle tarieven zijn <strong class="text-gray-900">enkele reis</strong> voor 1 t/m 4 personen, van uw startlocatie naar de luchthaven. Prijzen gelden bij boeking minimaal <strong class="text-gray-900">24 uur van tevoren</strong>.</p>

            <div class="mt-6 inline-flex items-center gap-4 bg-[#f5c518]/10 border border-[#f5c518]/30 rounded-2xl px-6 py-4 max-w-xl mx-auto">
                <svg class="w-5 h-5 text-[#f5c518] shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <p class="text-sm text-gray-700 text-left">Staat uw startlocatie er niet bij? <strong class="text-gray-900">Bel of stuur een bericht</strong>, wij maken altijd een prijs op maat.
                    <span class="flex gap-3 mt-2">
                        <a href="tel:+31XXXXXXXXX" class="inline-flex items-center gap-1.5 text-[#f5c518] font-semibold text-xs hover:underline">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                            Bel ons
                        </a>
                        <a href="{{ route('contact') }}" class="inline-flex items-center gap-1.5 text-[#f5c518] font-semibold text-xs hover:underline">
                            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
                            Stuur een bericht
                        </a>
                    </span>
                </p>
            </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {{-- Schiphol --}}
            <div class="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
                <div class="bg-[#f5c518] px-8 py-5 flex items-center gap-3">
                    <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                    <div>
                        <h3 class="text-black font-black text-xl">Amsterdam Schiphol</h3>
                        <p class="text-black/70 text-xs font-medium">Enkele reis · 1 t/m 4 personen · van startlocatie naar airport</p>
                    </div>
                </div>
                <div class="divide-y divide-gray-100">
                    @foreach([
                        ['plaats' => 'Ammerstol',               'prijs' => '€99,50'],
                        ['plaats' => 'Bergambacht',             'prijs' => '€99,50'],
                        ['plaats' => 'Berkenwoude',             'prijs' => '€99,50'],
                        ['plaats' => 'Bodegraven',              'prijs' => '€79,50'],
                        ['plaats' => 'Boskoop',                 'prijs' => '€79,50'],
                        ['plaats' => 'Capelle a/d IJssel',      'prijs' => '€99,50'],
                        ['plaats' => 'Gouda',                   'prijs' => '€79,50'],
                        ['plaats' => 'Gouderak',                'prijs' => '€89,50'],
                        ['plaats' => 'Haastrecht',              'prijs' => '€89,50'],
                        ['plaats' => 'Krimpen a/d IJssel',      'prijs' => '€94,50'],
                        ['plaats' => 'Krimpen a/d Lek',         'prijs' => '€109,50'],
                        ['plaats' => 'Lekkerkerk',              'prijs' => '€109,50'],
                        ['plaats' => 'Moerkapelle',             'prijs' => '€89,50'],
                        ['plaats' => 'Moordrecht',              'prijs' => '€84,50'],
                        ['plaats' => 'Nieuwerkerk a/d IJssel',  'prijs' => '€94,50'],
                        ['plaats' => 'Oudekerk a/d IJssel',     'prijs' => '€99,50'],
                        ['plaats' => 'Oudewater',               'prijs' => '€99,50'],
                        ['plaats' => 'Reeuwijk',                'prijs' => '€79,50'],
                        ['plaats' => 'Schoonhoven',             'prijs' => '€109,50'],
                        ['plaats' => 'Stolwijk',                'prijs' => '€94,50'],
                        ['plaats' => 'Vlist',                   'prijs' => '€94,50'],
                        ['plaats' => 'Waddinxveen',             'prijs' => '€79,50'],
                        ['plaats' => 'Zevenhuizen',             'prijs' => '€89,50'],
                    ] as $i => $rij)
                    <div class="flex items-center justify-between px-8 py-3.5 {{ $i % 2 === 0 ? 'bg-white' : 'bg-gray-50' }} hover:bg-yellow-50 transition-colors">
                        <span class="text-gray-700 text-sm">{{ $rij['plaats'] }}</span>
                        <span class="text-gray-900 font-bold text-sm">{{ $rij['prijs'] }}</span>
                    </div>
                    @endforeach
                </div>
            </div>

            {{-- Rotterdam --}}
            <div class="bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-sm">
                <div class="bg-[#f5c518] px-8 py-5 flex items-center gap-3">
                    <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24"><path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/></svg>
                    <div>
                        <h3 class="text-black font-black text-xl">Rotterdam The Hague Airport</h3>
                        <p class="text-black/70 text-xs font-medium">Enkele reis · 1 t/m 4 personen · van startlocatie naar airport</p>
                    </div>
                </div>
                <div class="divide-y divide-gray-100">
                    @foreach([
                        ['plaats' => 'Ammerstol',               'prijs' => '€89,50'],
                        ['plaats' => 'Bergambacht',             'prijs' => '€89,50'],
                        ['plaats' => 'Berkenwoude',             'prijs' => '€89,50'],
                        ['plaats' => 'Bodegraven',              'prijs' => '€84,50'],
                        ['plaats' => 'Boskoop',                 'prijs' => '€84,50'],
                        ['plaats' => 'Capelle a/d IJssel',      'prijs' => '€69,50'],
                        ['plaats' => 'Gouda',                   'prijs' => '€69,50'],
                        ['plaats' => 'Gouderak',                'prijs' => '€74,50'],
                        ['plaats' => 'Haastrecht',              'prijs' => '€89,50'],
                        ['plaats' => 'Krimpen a/d IJssel',      'prijs' => '€74,50'],
                        ['plaats' => 'Krimpen a/d Lek',         'prijs' => '€74,50'],
                        ['plaats' => 'Lekkerkerk',              'prijs' => '€84,50'],
                        ['plaats' => 'Moerkapelle',             'prijs' => '€69,50'],
                        ['plaats' => 'Moordrecht',              'prijs' => '€69,50'],
                        ['plaats' => 'Nieuwerkerk a/d IJssel',  'prijs' => '€69,50'],
                        ['plaats' => 'Oudekerk a/d IJssel',     'prijs' => '€79,50'],
                        ['plaats' => 'Oudewater',               'prijs' => '€89,50'],
                        ['plaats' => 'Reeuwijk',                'prijs' => '€74,50'],
                        ['plaats' => 'Schoonhoven',             'prijs' => '€94,50'],
                        ['plaats' => 'Stolwijk',                'prijs' => '€84,50'],
                        ['plaats' => 'Vlist',                   'prijs' => '€84,50'],
                        ['plaats' => 'Waddinxveen',             'prijs' => '€74,50'],
                        ['plaats' => 'Zevenhuizen',             'prijs' => '€74,50'],
                    ] as $i => $rij)
                    <div class="flex items-center justify-between px-8 py-3.5 {{ $i % 2 === 0 ? 'bg-white' : 'bg-gray-50' }} hover:bg-yellow-50 transition-colors">
                        <span class="text-gray-700 text-sm">{{ $rij['plaats'] }}</span>
                        <span class="text-gray-900 font-bold text-sm">{{ $rij['prijs'] }}</span>
                    </div>
                    @endforeach
                </div>
            </div>

        </div>

        {{-- 24u notice --}}
        <div class="mt-8 flex items-start gap-4 bg-[#f5c518]/10 border border-[#f5c518]/20 rounded-2xl px-6 py-5">
            <svg class="w-5 h-5 text-[#f5c518] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
            </svg>
            <div class="text-gray-600 text-sm leading-relaxed space-y-1">
                <p><strong class="text-gray-900">Let op:</strong> Bovenstaande prijzen zijn alleen van toepassing indien u de taxi <strong class="text-[#f5c518]">minimaal 24 uur van tevoren</strong> bestelt.</p>
                <p>Ritten tussen <strong class="text-gray-900">00:00 – 06:00 uur</strong> worden vermeerderd met een nachtopslag van <strong class="text-gray-900">€20,00</strong>.</p>
            </div>
        </div>

        {{-- Andere luchthavens --}}
        <div class="mt-6 flex items-start gap-4 bg-gray-50 border border-gray-200 rounded-2xl px-6 py-5">
            <svg class="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"/>
            </svg>
            <p class="text-gray-500 text-sm leading-relaxed">
                Rijdt u naar <strong class="text-gray-900">Eindhoven, Brussel, Düsseldorf of een andere luchthaven?</strong> Bel ons voor een offerte op maat.
                <a href="tel:+31XXXXXXXXX" class="text-[#f5c518] font-semibold hover:underline ml-1">+31 XX XXX XXXX</a>
            </p>
        </div>

    </div>
</section>

{{-- Andere diensten op aanvraag --}}
<section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
            <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Meer vervoer</span>
            <h2 class="text-4xl font-black mt-3 mb-4 text-gray-900">Andere Diensten</h2>
            <p class="text-gray-500">Alle overige ritten zijn beschikbaar op aanvraag. Bel ons voor een prijs op maat.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach([
                ['icon' => 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', 'title' => 'Zakelijk Vervoer', 'desc' => 'Representatief vervoer voor vergaderingen, events en zakenreizen.'],
                ['icon' => 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', 'title' => 'Groepsvervoer', 'desc' => 'Vervoer voor groepen. Vraag naar de mogelijkheden.'],
                ['icon' => 'M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.499-12.99l.75-1.3m-6.751 16.58l.25-1.498m5.002-12.997l.25-1.498m-4.253 14.745l-.25-1.497m3.002-12.998l-.25-1.497', 'title' => 'Ritten op Maat', 'desc' => 'Stad, ziekenhuis, evenement of anders. Wij rijden overal naartoe.'],
            ] as $dienst)
            <div class="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm flex flex-col gap-5">
                <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg class="w-6 h-6 text-[#f5c518]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="{{ $dienst['icon'] }}"/>
                    </svg>
                </div>
                <div>
                    <h3 class="text-gray-900 font-bold text-lg mb-2">{{ $dienst['title'] }}</h3>
                    <p class="text-gray-500 text-sm leading-relaxed mb-4">{{ $dienst['desc'] }}</p>
                    <a href="tel:+31XXXXXXXXX" class="inline-flex items-center gap-2 text-[#f5c518] text-sm font-semibold hover:gap-3 transition-all">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                        Op aanvraag, bel ons
                    </a>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</section>

{{-- CTA --}}
<section class="py-20 bg-[#f5c518]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-black text-black mb-4">Klaar voor vertrek?</h2>
        <p class="text-black/70 text-lg mb-8">Reserveer uw taxi online of bel ons direct. Wij staan 24/7 voor u klaar.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="{{ route('reserveren') }}" class="bg-black hover:bg-gray-900 text-white font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl text-lg">
                Online Reserveren
            </a>
            <a href="tel:+31XXXXXXXXX" class="bg-black/10 hover:bg-black/20 text-black font-bold px-10 py-4 rounded-xl transition-all text-lg border-2 border-black/20">
                +31 XX XXX XXXX
            </a>
        </div>
    </div>
</section>

@endsection
