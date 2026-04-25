@extends('layouts.app')

@section('title', 'TaxiCentrale — Betrouwbaar Taxivervoer 24/7')
@section('description', 'Professioneel taxivervoer 24/7. Airport transfers, zakelijk vervoer en ritten op maat. Vaste prijzen, geen verrassingen. Boek direct online.')

@section('content')

{{-- Hero Carousel --}}
<section id="hero">

    {{-- Slide 1: Airport --}}
    <div class="hero-slide active" id="slide-0">
        <img class="hero-slide-img" src="/vliegveld.jpg" alt="Airport" style="filter:brightness(0.5)">
        <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 100%)"></div>
        <div class="hero-content">
            <span class="hero-label">Airport Transfer</span>
            <h1 class="hero-title">Uw taxi naar<br><span class="hero-accent">alle luchthavens</span></h1>
            <p class="hero-sub">Betrouwbaar, punctueel en comfortabel naar Schiphol, Rotterdam en meer. 24/7 beschikbaar.</p>
            <div class="hero-stats">
                <div class="hero-stat"><span class="hero-stat-val accent">24/7</span><span class="hero-stat-lbl">Beschikbaar</span></div>
                <div class="hero-stat"><span class="hero-stat-val">€79,-</span><span class="hero-stat-lbl">Vanaf Gouda</span></div>
                <div class="hero-stat"><span class="hero-stat-val">6+</span><span class="hero-stat-lbl">Luchthavens</span></div>
            </div>
            <div class="hero-btns">
                <a href="{{ route('reserveren') }}" class="hero-btn-primary">Direct Boeken</a>
                <a href="{{ route('airport-service') }}" class="hero-btn-secondary">Bekijk Tarieven</a>
            </div>
        </div>
    </div>

    {{-- Slide 2: Gouda regio --}}
    <div class="hero-slide" id="slide-1">
        <img class="hero-slide-img" src="/gouda stad.png" alt="Gouda" style="filter:brightness(0.5)">
        <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 100%)"></div>
        <div class="hero-content">
            <span class="hero-label">Lokaal Vervoer</span>
            <h2 class="hero-title">Taxi in Gouda<br><span class="hero-accent">& omgeving</span></h2>
            <p class="hero-sub">Van station Gouda naar uw bestemming, of door heel de regio. Snel, betrouwbaar en altijd op tijd.</p>
            <div class="hero-stats">
                <div class="hero-stat"><span class="hero-stat-val accent">Gouda</span><span class="hero-stat-lbl">& Omgeving</span></div>
                <div class="hero-stat"><span class="hero-stat-val">Snel</span><span class="hero-stat-lbl">Op Tijd</span></div>
                <div class="hero-stat"><span class="hero-stat-val">24/7</span><span class="hero-stat-lbl">Bereikbaar</span></div>
            </div>
            <div class="hero-btns">
                <a href="{{ route('reserveren') }}" class="hero-btn-primary">Rit Boeken</a>
                <a href="{{ route('diensten') }}" class="hero-btn-secondary">Meer Info</a>
            </div>
        </div>
    </div>

    {{-- Slide 3: Zakelijk --}}
    <div class="hero-slide" id="slide-2">
        <img class="hero-slide-img" src="/Gemini zakelijk.png" alt="Zakelijk" style="filter:brightness(0.5)">
        <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 100%)"></div>
        <div class="hero-content">
            <span class="hero-label">Zakelijk Vervoer</span>
            <h2 class="hero-title">Zakelijk vervoer<br><span class="hero-accent">op maat</span></h2>
            <p class="hero-sub">Representatief en betrouwbaar voor uw zakelijke afspraken. Altijd netjes, altijd op tijd.</p>
            <div class="hero-stats">
                <div class="hero-stat"><span class="hero-stat-val accent">100%</span><span class="hero-stat-lbl">Betrouwbaar</span></div>
                <div class="hero-stat"><span class="hero-stat-val">Vast</span><span class="hero-stat-lbl">Tarief</span></div>
                <div class="hero-stat"><span class="hero-stat-val">Punctueel</span><span class="hero-stat-lbl">Gegarandeerd</span></div>
            </div>
            <div class="hero-btns">
                <a href="{{ route('reserveren') }}" class="hero-btn-primary">Zakelijk Boeken</a>
                <a href="{{ route('contact') }}" class="hero-btn-secondary">Neem Contact Op</a>
            </div>
        </div>
    </div>

    {{-- Slide 4: Schoolvervoer --}}
    <div class="hero-slide" id="slide-4">
        <img class="hero-slide-img" src="/Gemini_Generated_Image_y6uy9qy6uy9qy6uy.png" alt="Schoolvervoer" style="filter:brightness(0.5)">
        <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 100%)"></div>
        <div class="hero-content">
            <span class="hero-label">Schoolvervoer</span>
            <h2 class="hero-title">Veilig naar school,<br><span class="hero-accent">elke dag weer</span></h2>
            <p class="hero-sub">Betrouwbaar schoolvervoer voor uw kind. Vaste chauffeur, vaste tijden, altijd veilig op de bestemming.</p>
            <div class="hero-stats">
                <div class="hero-stat"><span class="hero-stat-val accent">Veilig</span><span class="hero-stat-lbl">Gegarandeerd</span></div>
                <div class="hero-stat"><span class="hero-stat-val">Vast</span><span class="hero-stat-lbl">Chauffeur</span></div>
                <div class="hero-stat"><span class="hero-stat-val">Dagelijks</span><span class="hero-stat-lbl">Beschikbaar</span></div>
            </div>
            <div class="hero-btns">
                <a href="tel:+31XXXXXXXXX" class="hero-btn-primary">Info Aanvragen</a>
                <a href="{{ route('contact') }}" class="hero-btn-secondary">Meer Info</a>
            </div>
        </div>
    </div>

    {{-- Pijl links --}}
    <button id="carousel-prev" class="carousel-arrow" style="left:1.5rem;display:none">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"/></svg>
    </button>

    {{-- Pijl rechts --}}
    <button id="carousel-next" class="carousel-arrow" style="right:1.5rem;display:none">
        <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/></svg>
    </button>

    {{-- Dots (midden-onder) --}}
    <div class="carousel-dots-bar">
        <button class="carousel-dot active" data-index="0"></button>
        <button class="carousel-dot" data-index="1"></button>
        <button class="carousel-dot" data-index="2"></button>
        <button class="carousel-dot" data-index="3"></button>
    </div>

</section>

<style>
#hero { position:relative; width:100%; height:78vh; min-height:520px; overflow:hidden; }
.hero-slide          { position:absolute; inset:0; opacity:0; transition:opacity 1.2s ease; }
.hero-slide.active   { opacity:1; }
.hero-slide          { background:#000; }
.hero-slide-img      { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; }

/* Content layout */
.hero-content {
    position:absolute; inset:0; z-index:10;
    display:flex; flex-direction:column; justify-content:center;
    padding:0 4rem;
    max-width:720px;
}
.hero-label {
    display:inline-block; margin-bottom:0.75rem;
    font-size:0.7rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase;
    color:#f5c518; border:1px solid rgba(245,197,24,0.4);
    padding:0.25rem 0.75rem; border-radius:4px;
    background:rgba(245,197,24,0.08);
    width:fit-content;
}
.hero-title {
    font-size:clamp(2rem,4.5vw,3.5rem); font-weight:900; line-height:1.1;
    color:#fff; margin-bottom:1rem;
    text-shadow:0 2px 8px rgba(0,0,0,0.5);
}
.hero-accent { color:#f5c518; }
.hero-sub {
    font-size:1rem; color:#e5e7eb; font-weight:400; line-height:1.65;
    max-width:480px; margin-bottom:1.5rem;
    text-shadow:0 1px 4px rgba(0,0,0,0.6);
}
.hero-btns { display:flex; flex-wrap:wrap; gap:0.75rem; margin-bottom:1.75rem; }
.hero-btn-primary {
    background:#f5c518; color:#111; font-weight:700;
    padding:0.75rem 2rem; border-radius:9999px; font-size:0.9rem;
    transition:background 0.2s, transform 0.2s; text-decoration:none;
}
.hero-btn-primary:hover { background:#fdd835; transform:translateY(-2px); }
.hero-btn-secondary {
    border:1.5px solid rgba(255,255,255,0.45); color:#fff; font-weight:600;
    padding:0.75rem 2rem; border-radius:9999px; font-size:0.9rem;
    transition:border-color 0.2s, transform 0.2s; text-decoration:none;
    backdrop-filter:blur(4px); background:rgba(30,30,30,0.5);
}
.hero-btn-secondary:hover { border-color:#f5c518; color:#f5c518; transform:translateY(-2px); }
.hero-stats {
    display:flex; gap:2rem;
    padding-bottom:1.25rem; border-bottom:1px solid rgba(255,255,255,0.2);
    margin-bottom:1.5rem;
}
.hero-stat { display:flex; flex-direction:column; }
.hero-stat-val {
    font-size:1.35rem; font-weight:900; color:#fff;
    text-shadow:0 1px 4px rgba(0,0,0,0.5);
}
.hero-stat-val.accent { color:#f5c518; }
.hero-stat-lbl {
    font-size:0.65rem; text-transform:uppercase; letter-spacing:0.1em;
    color:rgba(255,255,255,0.75); margin-top:2px;
    text-shadow:0 1px 3px rgba(0,0,0,0.6);
}
@media(max-width:640px){
    .hero-content { padding:0 1.5rem; }
    .hero-title { font-size:1.75rem; }
}

/* Arrows */
.carousel-arrow {
    position:absolute; top:50%; transform:translateY(-50%); z-index:20;
    width:48px; height:48px; border-radius:50%;
    background:rgba(0,0,0,0.45); border:1px solid rgba(255,255,255,0.25);
    color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center;
    transition:background 0.2s, border-color 0.2s, color 0.2s;
    backdrop-filter:blur(6px);
}
.carousel-arrow:hover { background:#f5c518; border-color:#f5c518; color:#000; }

/* Dots */
.carousel-dots-bar {
    position:absolute; bottom:2rem; left:0; right:0; z-index:20;
    display:flex; align-items:center; justify-content:center; gap:10px;
}
.carousel-dot { width:10px; height:10px; border-radius:50%; background:rgba(255,255,255,0.4); border:none; cursor:pointer; transition:all 0.3s; padding:0; }
.carousel-dot.active { background:#f5c518; transform:scale(1.4); }
</style>

<script>
(function () {
    const slides = document.querySelectorAll('.hero-slide');
    const dots   = document.querySelectorAll('.carousel-dot');
    const total  = slides.length;
    let current  = 0, timer, startX = 0;

    function goTo(i) {
        slides[current].classList.remove('active');
        dots[current].classList.remove('active');
        current = (i + total) % total;
        slides[current].classList.add('active');
        dots[current].classList.add('active');
    }

    function restart() { clearInterval(timer); timer = setInterval(() => goTo(current + 1), 5000); }

    document.getElementById('carousel-prev').addEventListener('click', () => { goTo(current - 1); restart(); });
    document.getElementById('carousel-next').addEventListener('click', () => { goTo(current + 1); restart(); });
    dots.forEach(d => d.addEventListener('click', () => { goTo(+d.dataset.index); restart(); }));

    const hero = document.getElementById('hero');
    hero.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', e => {
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) { goTo(diff > 0 ? current + 1 : current - 1); restart(); }
    });

    restart();
})();
</script>

{{-- USPs --}}
<section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @foreach([
                ['icon' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z', 'title' => 'Altijd Op Tijd', 'desc' => 'Stipt en betrouwbaar, elke rit'],
                ['icon' => 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z', 'title' => 'Vaste Prijzen', 'desc' => 'Geen verrassingen, transparant tarief'],
                ['icon' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93C9.33 17.79 7 14.5 7 11V7.18L12 5z', 'title' => 'Gecertificeerde Chauffeurs', 'desc' => 'Professioneel en vriendelijk'],
                ['icon' => 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z', 'title' => '24/7 Bereikbaar', 'desc' => 'Dag en nacht voor u klaar'],
            ] as $usp)
            <div class="group bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#f5c518]/40 rounded-2xl p-6 transition-all hover:-translate-y-1 shadow-sm">
                <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#f5c518]/20 transition-colors">
                    <svg class="w-6 h-6 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="{{ $usp['icon'] }}"/>
                    </svg>
                </div>
                <h3 class="font-bold text-gray-900 mb-1">{{ $usp['title'] }}</h3>
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
            <h2 class="text-4xl sm:text-5xl font-black mt-3 mb-4 text-gray-900">Onze Diensten</h2>
            <p class="text-gray-500 max-w-xl mx-auto">Van luchthaven naar hotel, van kantoor naar vergadering — wij rijden u overal naartoe.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach([
                ['title' => 'Luchthavenvervoer', 'desc' => 'Stressvrij van deur tot gate. Wij volgen uw vlucht en wachten op u bij aankomst.', 'icon' => 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z'],
                ['title' => 'Zakelijk Vervoer', 'desc' => 'Representatief en punctueel. Ideaal voor congressen, meetings en zakenreizen.', 'icon' => 'M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm10 15H4v-2h16v2zm0-5H4V9h16v6z'],
                ['title' => 'Groepsvervoer', 'desc' => 'Uitstapjes, bruiloften, vrijgezellenfeesten — samen reizen in stijl.', 'icon' => 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'],
                ['title' => 'Ritten op Maat', 'desc' => 'Dokter, ziekenhuis, station of gewoon thuis — wij rijden u waar u naartoe wilt.', 'icon' => 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z'],
                ['title' => 'Avond & Nacht', 'desc' => 'Veilig thuiskomen na een avondje uit. Wij rijden u dag en nacht veilig naar huis.', 'icon' => 'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z'],
                ['title' => 'Lange Afstand', 'desc' => 'Comfortabel reizen door heel Nederland en naar het buitenland op aanvraag.', 'icon' => 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'],
            ] as $dienst)
            <div class="group bg-white hover:bg-gray-50 border border-gray-200 hover:border-[#f5c518]/40 rounded-2xl p-8 transition-all hover:-translate-y-1 shadow-sm">
                <div class="w-14 h-14 bg-[#f5c518]/10 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#f5c518]/20 transition-colors">
                    <svg class="w-7 h-7 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                        <path d="{{ $dienst['icon'] }}"/>
                    </svg>
                </div>
                <h3 class="text-xl font-bold text-gray-900 mb-2">{{ $dienst['title'] }}</h3>
                <p class="text-gray-500 text-sm leading-relaxed mb-5">{{ $dienst['desc'] }}</p>
                <a href="{{ route('reserveren') }}" class="text-[#f5c518] text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                    Boek nu
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
            </div>
            @endforeach
        </div>

        <div class="text-center mt-12">
            <a href="{{ route('diensten') }}" class="inline-flex items-center gap-2 border border-gray-300 hover:border-[#f5c518]/40 text-gray-600 hover:text-gray-900 font-semibold px-6 py-3 rounded-xl transition-all hover:bg-gray-50">
                Alle diensten bekijken
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
        </div>
    </div>
</section>

{{-- Hoe het werkt --}}
<section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Simpel en snel</span>
            <h2 class="text-4xl sm:text-5xl font-black mt-3 mb-4 text-gray-900">Hoe het werkt</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
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
                <h3 class="text-xl font-bold mb-3 text-gray-900">{{ $step['title'] }}</h3>
                <p class="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{{ $step['desc'] }}</p>
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
