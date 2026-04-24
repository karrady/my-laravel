@extends('layouts.app')

@section('title', 'TaxiCentrale — Betrouwbaar Taxivervoer 24/7')
@section('description', 'Professioneel taxivervoer 24/7. Airport transfers, zakelijk vervoer en ritten op maat. Vaste prijzen, geen verrassingen. Boek direct online.')

@section('content')

{{-- Hero --}}
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
    {{-- Background gradient --}}
    <div class="absolute inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#1a1a1a]"></div>
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,197,24,0.12)_0%,_transparent_60%)]"></div>
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#f5c518]/30 to-transparent"></div>

    {{-- Grid pattern overlay --}}
    <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px); background-size: 50px 50px;"></div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-32">
        {{-- Badge --}}
        <div class="inline-flex items-center gap-2 bg-[#f5c518]/10 border border-[#f5c518]/20 rounded-full px-4 py-2 mb-8">
            <div class="w-2 h-2 bg-[#f5c518] rounded-full animate-pulse"></div>
            <span class="text-[#f5c518] text-sm font-medium">24/7 Beschikbaar</span>
        </div>

        <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-none">
            Altijd op tijd,<br>
            <span class="text-[#f5c518]">altijd comfortabel.</span>
        </h1>

        <p class="text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
            Professioneel taxivervoer met vaste prijzen en betrouwbare chauffeurs. Boek in 60 seconden — wij doen de rest.
        </p>

        {{-- Quick booking CTA --}}
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a href="{{ route('reserveren') }}" class="group bg-[#f5c518] hover:bg-yellow-400 text-black font-bold text-lg px-8 py-4 rounded-xl transition-all hover:shadow-2xl hover:shadow-yellow-500/30 hover:-translate-y-1 flex items-center gap-3">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
                Direct Boeken
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
            <a href="tel:+31XXXXXXXXX" class="flex items-center gap-3 border border-white/20 hover:border-white/40 text-white font-semibold text-lg px-8 py-4 rounded-xl transition-all hover:-translate-y-1 hover:bg-white/5">
                <svg class="w-5 h-5 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                Bel direct
            </a>
        </div>

        {{-- Stats --}}
        <div class="grid grid-cols-3 gap-8 max-w-lg mx-auto">
            <div class="text-center">
                <div class="text-3xl font-black text-[#f5c518]">24/7</div>
                <div class="text-gray-500 text-xs mt-1 uppercase tracking-wider">Bereikbaar</div>
            </div>
            <div class="text-center border-x border-white/10">
                <div class="text-3xl font-black text-white">100%</div>
                <div class="text-gray-500 text-xs mt-1 uppercase tracking-wider">Vaste prijzen</div>
            </div>
            <div class="text-center">
                <div class="text-3xl font-black text-white">5★</div>
                <div class="text-gray-500 text-xs mt-1 uppercase tracking-wider">Beoordeling</div>
            </div>
        </div>
    </div>

    {{-- Scroll indicator --}}
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
        <span class="text-xs uppercase tracking-widest">Scroll</span>
        <div class="w-px h-8 bg-gradient-to-b from-gray-600 to-transparent animate-pulse"></div>
    </div>
</section>

{{-- USPs --}}
<section class="py-20 bg-[#0a0a0a]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @foreach([
                ['icon' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z', 'title' => 'Altijd Op Tijd', 'desc' => 'Stipt en betrouwbaar, elke rit'],
                ['icon' => 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z', 'title' => 'Vaste Prijzen', 'desc' => 'Geen verrassingen, transparant tarief'],
                ['icon' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93C9.33 17.79 7 14.5 7 11V7.18L12 5z', 'title' => 'Gecertificeerde Chauffeurs', 'desc' => 'Professioneel en vriendelijk'],
                ['icon' => 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z', 'title' => '24/7 Bereikbaar', 'desc' => 'Dag en nacht voor u klaar'],
            ] as $usp)
            <div class="group bg-[#1a1a1a] hover:bg-[#1f1f1f] border border-white/5 hover:border-[#f5c518]/20 rounded-2xl p-6 transition-all hover:-translate-y-1">
                <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#f5c518]/20 transition-colors">
                    <svg class="w-6 h-6 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="{{ $usp['icon'] }}"/>
                    </svg>
                </div>
                <h3 class="font-bold text-white mb-1">{{ $usp['title'] }}</h3>
                <p class="text-gray-500 text-sm">{{ $usp['desc'] }}</p>
            </div>
            @endforeach
        </div>
    </div>
</section>

{{-- Diensten overzicht --}}
<section class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Wat wij doen</span>
            <h2 class="text-4xl sm:text-5xl font-black mt-3 mb-4">Onze Diensten</h2>
            <p class="text-gray-400 max-w-xl mx-auto">Van luchthaven naar hotel, van kantoor naar vergadering — wij rijden u overal naartoe.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach([
                ['title' => 'Luchthavenvervoer', 'desc' => 'Stressvrij van deur tot gate. Wij volgen uw vlucht en wachten op u bij aankomst.', 'icon' => 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z', 'color' => 'blue'],
                ['title' => 'Zakelijk Vervoer', 'desc' => 'Representatief en punctueel. Ideaal voor congressen, meetings en zakenreizen.', 'icon' => 'M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm10 15H4v-2h16v2zm0-5H4V9h16v6z', 'color' => 'purple'],
                ['title' => 'Groepsvervoer', 'desc' => 'Uitstapjes, bruiloften, vrijgezellenfeesten — samen reizen in stijl.', 'icon' => 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z', 'color' => 'green'],
                ['title' => 'Ritten op Maat', 'desc' => 'Dokter, ziekenhuis, station of gewoon thuis — wij rijden u waar u naartoe wilt.', 'icon' => 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z', 'color' => 'yellow'],
                ['title' => 'Avond & Nacht', 'desc' => 'Veilig thuiskomen na een avondje uit. Wij rijden u dag en nacht veilig naar huis.', 'icon' => 'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z', 'color' => 'orange'],
                ['title' => 'Lange Afstand', 'desc' => 'Comfortabel reizen door heel Nederland en naar het buitenland op aanvraag.', 'icon' => 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z', 'color' => 'red'],
            ] as $dienst)
            <div class="group bg-[#1a1a1a] hover:bg-[#1f1f1f] border border-white/5 hover:border-[#f5c518]/20 rounded-2xl p-8 transition-all hover:-translate-y-1 cursor-pointer">
                <div class="w-14 h-14 bg-[#f5c518]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#f5c518]/20 transition-colors">
                    <svg class="w-7 h-7 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="{{ $dienst['icon'] }}"/>
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-white mb-2">{{ $dienst['title'] }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed mb-5">{{ $dienst['desc'] }}</p>
                <a href="{{ route('reserveren') }}" class="text-[#f5c518] text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Boek nu
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
            </div>
            @endforeach
        </div>

        <div class="text-center mt-12">
            <a href="{{ route('diensten') }}" class="inline-flex items-center gap-2 border border-white/20 hover:border-[#f5c518]/40 text-gray-300 hover:text-white font-semibold px-6 py-3 rounded-xl transition-all hover:bg-white/5">
                Alle diensten bekijken
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
        </div>
    </div>
</section>

{{-- Hoe het werkt --}}
<section class="py-24 bg-[#0a0a0a]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Simpel en snel</span>
            <h2 class="text-4xl sm:text-5xl font-black mt-3 mb-4">Hoe het werkt</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {{-- Connector line --}}
            <div class="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-gradient-to-r from-[#f5c518]/50 via-[#f5c518] to-[#f5c518]/50"></div>

            @foreach([
                ['step' => '01', 'title' => 'Vul het formulier in', 'desc' => 'Geef uw ophaallocatie, bestemming, datum en tijd op. Duurt minder dan een minuut.'],
                ['step' => '02', 'title' => 'Ontvang bevestiging', 'desc' => 'Wij bevestigen uw boeking snel per telefoon of e-mail.'],
                ['step' => '03', 'title' => 'Wij rijden u', 'desc' => 'Uw chauffeur staat klaar op het afgesproken tijdstip. Comfortabel en op tijd.'],
            ] as $step)
            <div class="relative text-center">
                <div class="w-16 h-16 bg-[#f5c518] rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-yellow-500/20">
                    <span class="text-black font-black text-lg">{{ $step['step'] }}</span>
                </div>
                <h3 class="text-xl font-bold mb-3">{{ $step['title'] }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">{{ $step['desc'] }}</p>
            </div>
            @endforeach
        </div>

        <div class="text-center mt-14">
            <a href="{{ route('reserveren') }}" class="bg-[#f5c518] hover:bg-yellow-400 text-black font-bold px-10 py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-yellow-500/30 hover:-translate-y-1 inline-block text-lg">
                Start nu met boeken
            </a>
        </div>
    </div>
</section>

{{-- Reviews --}}
<section class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Klantervaringen</span>
            <h2 class="text-4xl sm:text-5xl font-black mt-3 mb-2">Wat klanten zeggen</h2>
            <div class="flex items-center justify-center gap-2 mt-4">
                <div class="flex text-[#f5c518]">
                    @for($i = 0; $i < 5; $i++)
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    @endfor
                </div>
                <span class="text-white font-semibold">4.9 / 5</span>
                <span class="text-gray-500 text-sm">gebaseerd op klantreviews</span>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            @foreach([
                ['name' => 'Mohammed Al-Rashid', 'text' => 'Fantastische service! De chauffeur was precies op tijd voor mijn vlucht naar Schiphol. Heel professioneel en vriendelijk. Zeker voor herhaling vatbaar.', 'city' => 'Amsterdam'],
                ['name' => 'Sandra de Vries', 'text' => 'Al meerdere keren gebruik gemaakt van deze taxicentrale. Altijd stipt, altijd schone auto en altijd een vriendelijke chauffeur. Absoluut aanrader!', 'city' => 'Utrecht'],
                ['name' => 'Pieter Janssen', 'text' => 'Geweldig bedrijf voor zakelijke ritten. Zeer representatief, punctueel en ze denken mee. Mijn vaste taxibedrijf voor alle zakenreizen.', 'city' => 'Rotterdam'],
            ] as $review)
            <div class="bg-[#1a1a1a] border border-white/5 rounded-2xl p-8">
                <div class="flex text-[#f5c518] mb-4">
                    @for($i = 0; $i < 5; $i++)
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    @endfor
                </div>
                <p class="text-gray-300 text-sm leading-relaxed mb-6">"{{ $review['text'] }}"</p>
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 bg-[#f5c518]/20 rounded-full flex items-center justify-center text-[#f5c518] font-bold text-sm">
                        {{ substr($review['name'], 0, 1) }}
                    </div>
                    <div>
                        <div class="text-white font-semibold text-sm">{{ $review['name'] }}</div>
                        <div class="text-gray-500 text-xs">{{ $review['city'] }}</div>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</section>

{{-- CTA Banner --}}
<section class="py-20 bg-[#f5c518]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl sm:text-5xl font-black text-black mb-4">Klaar om te rijden?</h2>
        <p class="text-black/70 text-lg mb-8">Boek online of bel ons direct. 24/7 bereikbaar.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="{{ route('reserveren') }}" class="bg-black hover:bg-gray-900 text-white font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl text-lg">
                Online Boeken
            </a>
            <a href="tel:+31XXXXXXXXX" class="bg-black/10 hover:bg-black/20 text-black font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 text-lg border-2 border-black/20">
                Bel +31 XX XXX XXXX
            </a>
        </div>
    </div>
</section>

@endsection
