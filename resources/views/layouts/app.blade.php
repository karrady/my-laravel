<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    {{-- SEO --}}
    <title>@yield('title', __('site.meta_title_default'))</title>
    <meta name="description" content="@yield('description', __('site.meta_desc_default'))">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{{ url()->current() }}">

    {{-- Open Graph --}}
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="@yield('title', __('site.meta_title_default'))">
    <meta property="og:description" content="@yield('description', __('site.meta_og_desc_default'))">

    {{-- Schema.org LocalBusiness --}}
    <script type="application/ld+json">
    @verbatim
    {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": "TaxiCentrale",
        "description": "Professioneel taxivervoer 24/7 beschikbaar",
        "telephone": "+31-XX-XXX-XXXX",
        "openingHours": "Mo-Su 00:00-24:00",
        "priceRange": "€€",
        "areaServed": {
            "@type": "City",
            "name": "Nederland"
        }
    }
    @endverbatim
    </script>

    <link rel="icon" type="image/svg+xml" href="/images/logo-icon.svg">

    @viteReactRefresh
    @vite('resources/js/app.tsx')
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body class="bg-white text-gray-900 font-sans antialiased">

    {{-- Navigation --}}
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                {{-- Logo --}}
                <a href="{{ route('home') }}" class="group hover:opacity-90 transition-opacity">
                    <img src="/images/logo.svg" alt="TaxiCentrale" class="h-10 w-auto">
                </a>

                {{-- Desktop nav --}}
                <div class="hidden md:flex items-center gap-8">
                    <a href="{{ route('home') }}" class="nav-link {{ request()->routeIs('home') ? 'text-[#f5c518]' : 'text-gray-600 hover:text-gray-900' }} text-sm font-medium transition-colors">{{ __('site.nav_home') }}</a>
                    <a href="{{ route('diensten') }}" class="nav-link {{ request()->routeIs('diensten') ? 'text-[#f5c518]' : 'text-gray-600 hover:text-gray-900' }} text-sm font-medium transition-colors">{{ __('site.nav_diensten') }}</a>
                    <a href="{{ route('airport-service') }}" class="nav-link {{ request()->routeIs('airport-service') ? 'text-[#f5c518]' : 'text-gray-600 hover:text-gray-900' }} text-sm font-medium transition-colors">{{ __('site.nav_airport') }}</a>
                    <a href="{{ route('reserveren') }}" class="nav-link {{ request()->routeIs('reserveren') ? 'text-[#f5c518]' : 'text-gray-600 hover:text-gray-900' }} text-sm font-medium transition-colors">{{ __('site.nav_reserveren') }}</a>
                    <a href="{{ route('contact') }}" class="nav-link {{ request()->routeIs('contact') ? 'text-[#f5c518]' : 'text-gray-600 hover:text-gray-900' }} text-sm font-medium transition-colors">{{ __('site.nav_contact') }}</a>
                </div>

                {{-- CTA + Language switcher --}}
                <div class="hidden md:flex items-center gap-4">
                    {{-- Language switcher --}}
                    <div class="flex items-center gap-1">
                        @foreach(['nl', 'en'] as $lang)
                        <form action="{{ route('language.switch', $lang) }}" method="POST" class="inline">
                            @csrf
                            <button type="submit"
                                class="text-xs font-bold px-2 py-1 rounded transition-colors
                                    {{ app()->getLocale() === $lang
                                        ? 'bg-[#f5c518] text-black'
                                        : 'text-gray-400 hover:text-gray-700' }}">
                                {{ strtoupper($lang) }}
                            </button>
                        </form>
                        @endforeach
                    </div>

                    <a href="tel:+31XXXXXXXXX" class="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                        <svg class="w-4 h-4 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        +31 XX XXX XXXX
                    </a>
                    <a href="{{ route('reserveren') }}" class="bg-[#f5c518] hover:bg-yellow-400 text-black font-semibold text-sm px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-yellow-500/25 hover:-translate-y-0.5">
                        {{ __('site.nav_book_now') }}
                    </a>
                </div>

                {{-- Mobile menu button --}}
                <button id="mobile-menu-btn" class="md:hidden text-gray-600 hover:text-gray-900 p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        <path id="close-icon" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>

        {{-- Mobile menu --}}
        <div id="mobile-menu" class="hidden md:hidden bg-white border-t border-gray-200">
            <div class="px-4 py-4 space-y-3">
                <a href="{{ route('home') }}" class="block text-gray-600 hover:text-gray-900 py-2 text-sm font-medium">{{ __('site.nav_home') }}</a>
                <a href="{{ route('diensten') }}" class="block text-gray-600 hover:text-gray-900 py-2 text-sm font-medium">{{ __('site.nav_diensten') }}</a>
                <a href="{{ route('airport-service') }}" class="block text-gray-600 hover:text-gray-900 py-2 text-sm font-medium">{{ __('site.nav_airport') }}</a>
                <a href="{{ route('reserveren') }}" class="block text-gray-600 hover:text-gray-900 py-2 text-sm font-medium">{{ __('site.nav_reserveren') }}</a>
                <a href="{{ route('contact') }}" class="block text-gray-600 hover:text-gray-900 py-2 text-sm font-medium">{{ __('site.nav_contact') }}</a>

                {{-- Mobile language switcher --}}
                <div class="flex items-center gap-2 pt-1">
                    @foreach(['nl', 'en'] as $lang)
                    <form action="{{ route('language.switch', $lang) }}" method="POST" class="inline">
                        @csrf
                        <button type="submit"
                            class="text-xs font-bold px-3 py-1.5 rounded transition-colors
                                {{ app()->getLocale() === $lang
                                    ? 'bg-[#f5c518] text-black'
                                    : 'bg-gray-100 text-gray-500 hover:text-gray-700' }}">
                            {{ strtoupper($lang) }}
                        </button>
                    </form>
                    @endforeach
                </div>

                <div class="pt-2 border-t border-gray-200">
                    <a href="{{ route('reserveren') }}" class="block w-full text-center bg-[#f5c518] text-black font-semibold text-sm px-5 py-3 rounded-lg">
                        {{ __('site.nav_book_now') }}
                    </a>
                </div>
            </div>
        </div>
    </nav>

    {{-- Main content --}}
    <main>
        @yield('content')
    </main>

    {{-- Footer --}}
    <footer class="bg-black border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {{-- Brand --}}
                <div class="lg:col-span-2">
                    <a href="{{ route('home') }}" class="inline-block mb-4 hover:opacity-80 transition-opacity">
                        <img src="/images/logo.svg" alt="TaxiCentrale" class="h-9 w-auto brightness-0 invert">
                    </a>
                    <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
                        {{ __('site.footer_tagline') }}
                    </p>
                    <div class="flex gap-4 mt-6">
                        <a href="tel:+31XXXXXXXXX" class="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors">
                            <svg class="w-4 h-4 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                            +31 XX XXX XXXX
                        </a>
                    </div>
                </div>

                {{-- Links --}}
                <div>
                    <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">{{ __('site.footer_nav_title') }}</h3>
                    <ul class="space-y-3">
                        <li><a href="{{ route('home') }}" class="text-gray-400 hover:text-white text-sm transition-colors">{{ __('site.nav_home') }}</a></li>
                        <li><a href="{{ route('diensten') }}" class="text-gray-400 hover:text-white text-sm transition-colors">{{ __('site.nav_diensten') }}</a></li>
                        <li><a href="{{ route('airport-service') }}" class="text-gray-400 hover:text-white text-sm transition-colors">{{ __('site.nav_airport') }}</a></li>
                        <li><a href="{{ route('reserveren') }}" class="text-gray-400 hover:text-white text-sm transition-colors">{{ __('site.nav_reserveren') }}</a></li>
                        <li><a href="{{ route('contact') }}" class="text-gray-400 hover:text-white text-sm transition-colors">{{ __('site.nav_contact') }}</a></li>
                    </ul>
                </div>

                {{-- Diensten --}}
                <div>
                    <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">{{ __('site.footer_services_title') }}</h3>
                    <ul class="space-y-3">
                        <li><a href="{{ route('airport-service') }}" class="text-gray-400 hover:text-white text-sm transition-colors">{{ __('site.footer_service_airport') }}</a></li>
                        <li><a href="{{ route('diensten') }}" class="text-gray-400 hover:text-white text-sm transition-colors">{{ __('site.footer_service_business') }}</a></li>
                        <li><a href="{{ route('diensten') }}" class="text-gray-400 hover:text-white text-sm transition-colors">{{ __('site.footer_service_group') }}</a></li>
                        <li><a href="{{ route('diensten') }}" class="text-gray-400 hover:text-white text-sm transition-colors">{{ __('site.footer_service_custom') }}</a></li>
                    </ul>
                </div>
            </div>

            <div class="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p class="text-gray-500 text-sm">{{ __('site.footer_copyright', ['year' => date('Y')]) }}</p>
                <p class="text-gray-600 text-xs">{{ __('site.footer_available') }}</p>
            </div>
        </div>
    </footer>

    <script>
        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('bg-white/95', 'backdrop-blur-sm', 'border-b', 'border-gray-200', 'shadow-sm');
            } else {
                navbar.classList.remove('bg-white/95', 'backdrop-blur-sm', 'border-b', 'border-gray-200', 'shadow-sm');
            }
        });

        // Mobile menu toggle
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        const menuIcon = document.getElementById('menu-icon');
        const closeIcon = document.getElementById('close-icon');
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
            menuIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    </script>
</body>
</html>
