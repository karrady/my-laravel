@extends('layouts.app')

@section('title', __('site.meta_title_default'))
@section('description', __('site.meta_desc_default'))

@section('content')

{{-- Hero Carousel --}}
<section id="hero">

    {{-- Slide 1: Airport --}}
    <div class="hero-slide active" id="slide-0">
        <img class="hero-slide-img" src="/vliegveld.jpg" alt="Airport" style="filter:brightness(0.5)">
        <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 100%)"></div>
        <div class="hero-content">
            <span class="hero-label">{{ __('site.hero1_label') }}</span>
            <h1 class="hero-title">{{ __('site.hero1_title') }}<br><span class="hero-accent">{{ __('site.hero1_title_accent') }}</span></h1>
            <p class="hero-sub">{{ __('site.hero1_sub') }}</p>
            <div class="hero-stats">
                <div class="hero-stat"><span class="hero-stat-val accent">{{ __('site.hero1_stat1_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero1_stat1_lbl') }}</span></div>
                <div class="hero-stat"><span class="hero-stat-val">{{ __('site.hero1_stat2_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero1_stat2_lbl') }}</span></div>
                <div class="hero-stat"><span class="hero-stat-val">{{ __('site.hero1_stat3_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero1_stat3_lbl') }}</span></div>
            </div>
            <div class="hero-btns">
                <a href="{{ route('reserveren') }}" class="hero-btn-primary">{{ __('site.hero1_btn_primary') }}</a>
                <a href="{{ route('airport-service') }}" class="hero-btn-secondary">{{ __('site.hero1_btn_secondary') }}</a>
            </div>
        </div>
    </div>

    {{-- Slide 2: Gouda regio --}}
    <div class="hero-slide" id="slide-1">
        <img class="hero-slide-img" src="/gouda stad.png" alt="Gouda" style="filter:brightness(0.5)">
        <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 100%)"></div>
        <div class="hero-content">
            <span class="hero-label">{{ __('site.hero2_label') }}</span>
            <h2 class="hero-title">{{ __('site.hero2_title') }}<br><span class="hero-accent">{{ __('site.hero2_title_accent') }}</span></h2>
            <p class="hero-sub">{{ __('site.hero2_sub') }}</p>
            <div class="hero-stats">
                <div class="hero-stat"><span class="hero-stat-val accent">{{ __('site.hero2_stat1_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero2_stat1_lbl') }}</span></div>
                <div class="hero-stat"><span class="hero-stat-val">{{ __('site.hero2_stat2_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero2_stat2_lbl') }}</span></div>
                <div class="hero-stat"><span class="hero-stat-val">{{ __('site.hero2_stat3_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero2_stat3_lbl') }}</span></div>
            </div>
            <div class="hero-btns">
                <a href="{{ route('reserveren') }}" class="hero-btn-primary">{{ __('site.hero2_btn_primary') }}</a>
                <a href="{{ route('diensten') }}" class="hero-btn-secondary">{{ __('site.hero2_btn_secondary') }}</a>
            </div>
        </div>
    </div>

    {{-- Slide 3: Zakelijk --}}
    <div class="hero-slide" id="slide-2">
        <img class="hero-slide-img" src="/Gemini zakelijk.png" alt="Zakelijk" style="filter:brightness(0.5)">
        <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 100%)"></div>
        <div class="hero-content">
            <span class="hero-label">{{ __('site.hero3_label') }}</span>
            <h2 class="hero-title">{{ __('site.hero3_title') }}<br><span class="hero-accent">{{ __('site.hero3_title_accent') }}</span></h2>
            <p class="hero-sub">{{ __('site.hero3_sub') }}</p>
            <div class="hero-stats">
                <div class="hero-stat"><span class="hero-stat-val accent">{{ __('site.hero3_stat1_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero3_stat1_lbl') }}</span></div>
                <div class="hero-stat"><span class="hero-stat-val">{{ __('site.hero3_stat2_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero3_stat2_lbl') }}</span></div>
                <div class="hero-stat"><span class="hero-stat-val">{{ __('site.hero3_stat3_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero3_stat3_lbl') }}</span></div>
            </div>
            <div class="hero-btns">
                <a href="{{ route('reserveren') }}" class="hero-btn-primary">{{ __('site.hero3_btn_primary') }}</a>
                <a href="{{ route('contact') }}" class="hero-btn-secondary">{{ __('site.hero3_btn_secondary') }}</a>
            </div>
        </div>
    </div>

    {{-- Slide 4: Zorgvervoer --}}
    <div class="hero-slide" id="slide-3">
        <img class="hero-slide-img" src="/regiovervoer.png" alt="Zorgvervoer" style="filter:brightness(0.55); object-position:center 30%">
        <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(0,0,0,0.72) 0%,rgba(0,0,0,0.28) 100%)"></div>
        <div style="position:absolute;bottom:0;right:0;width:80px;height:40px;background:#000;z-index:5;opacity:0.7"></div>
        <div class="hero-content">
            <span class="hero-label">{{ __('site.hero4_label') }}</span>
            <h2 class="hero-title">{{ __('site.hero4_title') }}<br><span class="hero-accent">{{ __('site.hero4_title_accent') }}</span></h2>
            <p class="hero-sub">{{ __('site.hero4_sub') }}</p>
            <div class="hero-stats">
                <div class="hero-stat"><span class="hero-stat-val accent">{{ __('site.hero4_stat1_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero4_stat1_lbl') }}</span></div>
                <div class="hero-stat"><span class="hero-stat-val">{{ __('site.hero4_stat2_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero4_stat2_lbl') }}</span></div>
                <div class="hero-stat"><span class="hero-stat-val">{{ __('site.hero4_stat3_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero4_stat3_lbl') }}</span></div>
            </div>
            <div class="hero-btns">
                <a href="{{ route('reserveren') }}" class="hero-btn-primary">{{ __('site.hero4_btn_primary') }}</a>
                <a href="{{ route('contact') }}" class="hero-btn-secondary">{{ __('site.hero4_btn_secondary') }}</a>
            </div>
        </div>
    </div>

    {{-- Slide 5: Schoolvervoer --}}
    <div class="hero-slide" id="slide-4">
        <img class="hero-slide-img" src="/Gemini_Generated_Image_y6uy9qy6uy9qy6uy.png" alt="Schoolvervoer" style="filter:brightness(0.5)">
        <div class="absolute inset-0" style="background:linear-gradient(135deg,rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 100%)"></div>
        <div class="hero-content">
            <span class="hero-label">{{ __('site.hero5_label') }}</span>
            <h2 class="hero-title">{{ __('site.hero5_title') }}<br><span class="hero-accent">{{ __('site.hero5_title_accent') }}</span></h2>
            <p class="hero-sub">{{ __('site.hero5_sub') }}</p>
            <div class="hero-stats">
                <div class="hero-stat"><span class="hero-stat-val accent">{{ __('site.hero5_stat1_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero5_stat1_lbl') }}</span></div>
                <div class="hero-stat"><span class="hero-stat-val">{{ __('site.hero5_stat2_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero5_stat2_lbl') }}</span></div>
                <div class="hero-stat"><span class="hero-stat-val">{{ __('site.hero5_stat3_val') }}</span><span class="hero-stat-lbl">{{ __('site.hero5_stat3_lbl') }}</span></div>
            </div>
            <div class="hero-btns">
                <a href="tel:+31XXXXXXXXX" class="hero-btn-primary">{{ __('site.hero5_btn_primary') }}</a>
                <a href="{{ route('contact') }}" class="hero-btn-secondary">{{ __('site.hero5_btn_secondary') }}</a>
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

    {{-- Dots --}}
    <div class="carousel-dots-bar">
        <button class="carousel-dot active" data-index="0"></button>
        <button class="carousel-dot" data-index="1"></button>
        <button class="carousel-dot" data-index="2"></button>
        <button class="carousel-dot" data-index="3"></button>
        <button class="carousel-dot" data-index="4"></button>
    </div>

</section>

<style>
#hero { position:relative; width:100%; height:78vh; min-height:520px; overflow:hidden; }
.hero-slide          { position:absolute; inset:0; opacity:0; transition:opacity 1.2s ease; }
.hero-slide.active   { opacity:1; }
.hero-slide          { background:#000; }
.hero-slide-img      { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; }
.hero-content {
    position:absolute; inset:0; z-index:10;
    display:flex; flex-direction:column; justify-content:center;
    padding:0 4rem; max-width:720px;
}
.hero-label {
    display:inline-block; margin-bottom:0.75rem;
    font-size:0.7rem; font-weight:700; letter-spacing:0.15em; text-transform:uppercase;
    color:#f5c518; border:1px solid rgba(245,197,24,0.4);
    padding:0.25rem 0.75rem; border-radius:4px;
    background:rgba(245,197,24,0.08); width:fit-content;
}
.hero-title {
    font-size:clamp(2rem,4.5vw,3.5rem); font-weight:900; line-height:1.1;
    color:#fff; margin-bottom:1rem; text-shadow:0 2px 8px rgba(0,0,0,0.5);
}
.hero-accent { color:#f5c518; }
.hero-sub {
    font-size:1rem; color:#e5e7eb; font-weight:400; line-height:1.65;
    max-width:480px; margin-bottom:1.5rem; text-shadow:0 1px 4px rgba(0,0,0,0.6);
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
.hero-stat-val { font-size:1.35rem; font-weight:900; color:#fff; text-shadow:0 1px 4px rgba(0,0,0,0.5); }
.hero-stat-val.accent { color:#f5c518; }
.hero-stat-lbl {
    font-size:0.65rem; text-transform:uppercase; letter-spacing:0.1em;
    color:rgba(255,255,255,0.75); margin-top:2px; text-shadow:0 1px 3px rgba(0,0,0,0.6);
}
@media(max-width:640px){
    .hero-content { padding:0 1.5rem; }
    .hero-title { font-size:1.75rem; }
}
.carousel-arrow {
    position:absolute; top:50%; transform:translateY(-50%); z-index:20;
    width:48px; height:48px; border-radius:50%;
    background:rgba(0,0,0,0.45); border:1px solid rgba(255,255,255,0.25);
    color:#fff; cursor:pointer; display:flex; align-items:center; justify-content:center;
    transition:background 0.2s, border-color 0.2s, color 0.2s; backdrop-filter:blur(6px);
}
.carousel-arrow:hover { background:#f5c518; border-color:#f5c518; color:#000; }
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

{{-- Reviews --}}
<section class="py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
                <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">{{ __('site.reviews_label') }}</span>
                <h2 class="text-3xl sm:text-4xl font-black mt-2 text-gray-900">{{ __('site.reviews_title') }}</h2>
            </div>
            <a href="#" class="reviews-google-btn inline-flex items-center gap-2 border border-gray-200 hover:border-[#f5c518]/40 rounded-xl px-4 py-2.5 text-sm text-gray-500 hover:text-gray-800 transition-all self-start sm:self-auto">
                <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                <span class="font-medium">{{ __('site.reviews_google_btn') }}</span>
                <span class="bg-gray-100 text-gray-400 text-xs px-2 py-0.5 rounded-full">{{ __('site.reviews_coming_soon') }}</span>
            </a>
        </div>

        <div class="flex flex-col items-center justify-center py-16 text-center border border-dashed border-gray-200 rounded-2xl bg-gray-50">
            <svg class="w-10 h-10 text-gray-300 mb-4" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"/>
            </svg>
            <p class="text-gray-400 font-medium text-sm">{{ __('site.reviews_empty') }}</p>
        </div>

    </div>
</section>

{{-- USPs --}}
<section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            @foreach([
                ['icon' => 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z', 'title' => __('site.usp1_title'), 'desc' => __('site.usp1_desc')],
                ['icon' => 'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z', 'title' => __('site.usp2_title'), 'desc' => __('site.usp2_desc')],
                ['icon' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93C9.33 17.79 7 14.5 7 11V7.18L12 5z', 'title' => __('site.usp3_title'), 'desc' => __('site.usp3_desc')],
                ['icon' => 'M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z', 'title' => __('site.usp4_title'), 'desc' => __('site.usp4_desc')],
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
            <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">{{ __('site.home_services_label') }}</span>
            <h2 class="text-4xl sm:text-5xl font-black mt-3 mb-4 text-gray-900">{{ __('site.home_services_title') }}</h2>
            <p class="text-gray-500 max-w-xl mx-auto">{{ __('site.home_services_sub') }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            @foreach([
                ['title' => __('site.service_airport_title'),   'desc' => __('site.service_airport_desc'),   'icon' => 'M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z'],
                ['title' => __('site.service_business_title'),  'desc' => __('site.service_business_desc'),  'icon' => 'M20 7h-4V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v2H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zM10 5h4v2h-4V5zm10 15H4v-2h16v2zm0-5H4V9h16v6z'],
                ['title' => __('site.service_group_title'),     'desc' => __('site.service_group_desc'),     'icon' => 'M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z'],
                ['title' => __('site.service_custom_title'),    'desc' => __('site.service_custom_desc'),    'icon' => 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z'],
                ['title' => __('site.service_night_title'),     'desc' => __('site.service_night_desc'),     'icon' => 'M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z'],
                ['title' => __('site.service_distance_title'),  'desc' => __('site.service_distance_desc'),  'icon' => 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'],
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
                    {{ __('site.service_book_now') }}
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
            </div>
            @endforeach
        </div>

        <div class="text-center mt-12">
            <a href="{{ route('diensten') }}" class="inline-flex items-center gap-2 border border-gray-300 hover:border-[#f5c518]/40 text-gray-600 hover:text-gray-900 font-semibold px-6 py-3 rounded-xl transition-all hover:bg-gray-50">
                {{ __('site.home_services_all') }}
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
            </a>
        </div>
    </div>
</section>

{{-- Hoe het werkt --}}
<section class="py-24 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">{{ __('site.hiw_label') }}</span>
            <h2 class="text-4xl sm:text-5xl font-black mt-3 mb-4 text-gray-900">{{ __('site.hiw_title') }}</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            <div class="hidden md:block absolute top-8 left-1/3 right-1/3 h-px bg-gradient-to-r from-[#f5c518]/50 via-[#f5c518] to-[#f5c518]/50"></div>

            @foreach([
                ['step' => '01', 'title' => __('site.hiw_step1_title'), 'desc' => __('site.hiw_step1_desc')],
                ['step' => '02', 'title' => __('site.hiw_step2_title'), 'desc' => __('site.hiw_step2_desc')],
                ['step' => '03', 'title' => __('site.hiw_step3_title'), 'desc' => __('site.hiw_step3_desc')],
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
                {{ __('site.hiw_cta') }}
            </a>
        </div>
    </div>
</section>

{{-- CTA Banner --}}
<section class="py-20 bg-[#f5c518]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl sm:text-5xl font-black text-black mb-4">{{ __('site.cta_title') }}</h2>
        <p class="text-black/70 text-lg mb-8">{{ __('site.cta_sub') }}</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="{{ route('reserveren') }}" class="bg-black hover:bg-gray-900 text-white font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl text-lg">
                {{ __('site.cta_book_online') }}
            </a>
            <a href="tel:+31XXXXXXXXX" class="bg-black/10 hover:bg-black/20 text-black font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 text-lg border-2 border-black/20">
                {{ __('site.cta_call') }}
            </a>
        </div>
    </div>
</section>

@endsection
