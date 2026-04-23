<!DOCTYPE html>
<html lang="nl" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    {{-- SEO --}}
    <title>@yield('title', 'TaxiCentrale — Betrouwbaar en Snel Taxivervoer')</title>
    <meta name="description" content="@yield('description', 'Professioneel taxivervoer 24/7 beschikbaar. Airport transfers, zakelijk vervoer en meer. Boek eenvoudig online.')">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{{ url()->current() }}">

    {{-- Open Graph --}}
    <meta property="og:type" content="website">
    <meta property="og:url" content="{{ url()->current() }}">
    <meta property="og:title" content="@yield('title', 'TaxiCentrale — Betrouwbaar en Snel Taxivervoer')">
    <meta property="og:description" content="@yield('description', 'Professioneel taxivervoer 24/7 beschikbaar.')">

    {{-- Schema.org LocalBusiness --}}
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "TaxiService",
        "name": "TaxiCentrale",
        "description": "Professioneel taxivervoer 24/7 beschikbaar",
        "telephone": "+31-XX-XXX-XXXX",
        "url": "{{ config('app.url') }}",
        "openingHours": "Mo-Su 00:00-24:00",
        "priceRange": "€€",
        "areaServed": {
            "@type": "City",
            "name": "Nederland"
        }
    }
    </script>

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
</head>
<body class="bg-[#0f0f0f] text-white font-sans antialiased">

    {{-- Navigation --}}
    <nav class="fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-20">
                {{-- Logo --}}
                <a href="{{ route('home') }}" class="flex items-center gap-3 group">
                    <div class="w-10 h-10 bg-[#f5c518] rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                        <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
                            <circle cx="7.5" cy="14.5" r="1.5"/>
                            <circle cx="16.5" cy="14.5" r="1.5"/>
                        </svg>
                    </div>
                    <span class="text-xl font-bold tracking-tight">
                        Taxi<span class="text-[#f5c518]">Centrale</span>
                    </span>
                </a>

                {{-- Desktop nav --}}
                <div class="hidden md:flex items-center gap-8">
                    <a href="{{ route('home') }}" class="nav-link {{ request()->routeIs('home') ? 'text-[#f5c518]' : 'text-gray-300 hover:text-white' }} text-sm font-medium transition-colors">Home</a>
                    <a href="{{ route('diensten') }}" class="nav-link {{ request()->routeIs('diensten') ? 'text-[#f5c518]' : 'text-gray-300 hover:text-white' }} text-sm font-medium transition-colors">Diensten</a>
                    <a href="{{ route('over-ons') }}" class="nav-link {{ request()->routeIs('over-ons') ? 'text-[#f5c518]' : 'text-gray-300 hover:text-white' }} text-sm font-medium transition-colors">Over ons</a>
                    <a href="{{ route('contact') }}" class="nav-link {{ request()->routeIs('contact') ? 'text-[#f5c518]' : 'text-gray-300 hover:text-white' }} text-sm font-medium transition-colors">Contact</a>
                </div>

                {{-- CTA --}}
                <div class="hidden md:flex items-center gap-4">
                    <a href="tel:+31XXXXXXXXX" class="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors">
                        <svg class="w-4 h-4 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                        +31 XX XXX XXXX
                    </a>
                    <a href="{{ route('boeken') }}" class="bg-[#f5c518] hover:bg-yellow-400 text-black font-semibold text-sm px-5 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-yellow-500/25 hover:-translate-y-0.5">
                        Nu Boeken
                    </a>
                </div>

                {{-- Mobile menu button --}}
                <button id="mobile-menu-btn" class="md:hidden text-gray-300 hover:text-white p-2">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path id="menu-icon" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                        <path id="close-icon" class="hidden" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>

        {{-- Mobile menu --}}
        <div id="mobile-menu" class="hidden md:hidden bg-[#1a1a1a] border-t border-white/10">
            <div class="px-4 py-4 space-y-3">
                <a href="{{ route('home') }}" class="block text-gray-300 hover:text-white py-2 text-sm font-medium">Home</a>
                <a href="{{ route('diensten') }}" class="block text-gray-300 hover:text-white py-2 text-sm font-medium">Diensten</a>
                <a href="{{ route('over-ons') }}" class="block text-gray-300 hover:text-white py-2 text-sm font-medium">Over ons</a>
                <a href="{{ route('contact') }}" class="block text-gray-300 hover:text-white py-2 text-sm font-medium">Contact</a>
                <div class="pt-2 border-t border-white/10">
                    <a href="{{ route('boeken') }}" class="block w-full text-center bg-[#f5c518] text-black font-semibold text-sm px-5 py-3 rounded-lg">
                        Nu Boeken
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
    <footer class="bg-[#0a0a0a] border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                {{-- Brand --}}
                <div class="lg:col-span-2">
                    <a href="{{ route('home') }}" class="flex items-center gap-3 mb-4">
                        <div class="w-10 h-10 bg-[#f5c518] rounded-lg flex items-center justify-center">
                            <svg class="w-6 h-6 text-black" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.08 3.11H5.77L6.85 7zM19 17H5v-5h14v5z"/>
                                <circle cx="7.5" cy="14.5" r="1.5"/>
                                <circle cx="16.5" cy="14.5" r="1.5"/>
                            </svg>
                        </div>
                        <span class="text-xl font-bold">Taxi<span class="text-[#f5c518]">Centrale</span></span>
                    </a>
                    <p class="text-gray-400 text-sm leading-relaxed max-w-sm">
                        Betrouwbaar, professioneel en 24/7 beschikbaar. Wij zorgen dat u altijd op tijd en comfortabel op uw bestemming aankomt.
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
                    <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Navigatie</h3>
                    <ul class="space-y-3">
                        <li><a href="{{ route('home') }}" class="text-gray-400 hover:text-white text-sm transition-colors">Home</a></li>
                        <li><a href="{{ route('diensten') }}" class="text-gray-400 hover:text-white text-sm transition-colors">Diensten</a></li>
                        <li><a href="{{ route('boeken') }}" class="text-gray-400 hover:text-white text-sm transition-colors">Boeken</a></li>
                        <li><a href="{{ route('over-ons') }}" class="text-gray-400 hover:text-white text-sm transition-colors">Over ons</a></li>
                        <li><a href="{{ route('contact') }}" class="text-gray-400 hover:text-white text-sm transition-colors">Contact</a></li>
                    </ul>
                </div>

                {{-- Diensten --}}
                <div>
                    <h3 class="text-sm font-semibold text-white uppercase tracking-wider mb-4">Diensten</h3>
                    <ul class="space-y-3">
                        <li><a href="{{ route('diensten') }}" class="text-gray-400 hover:text-white text-sm transition-colors">Luchthavenvervoer</a></li>
                        <li><a href="{{ route('diensten') }}" class="text-gray-400 hover:text-white text-sm transition-colors">Zakelijk vervoer</a></li>
                        <li><a href="{{ route('diensten') }}" class="text-gray-400 hover:text-white text-sm transition-colors">Groepsvervoer</a></li>
                        <li><a href="{{ route('diensten') }}" class="text-gray-400 hover:text-white text-sm transition-colors">Ritten op maat</a></li>
                    </ul>
                </div>
            </div>

            <div class="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p class="text-gray-500 text-sm">&copy; {{ date('Y') }} TaxiCentrale. Alle rechten voorbehouden.</p>
                <p class="text-gray-600 text-xs">24/7 beschikbaar &mdash; Altijd op tijd</p>
            </div>
        </div>
    </footer>

    <script>
        // Navbar scroll effect
        const navbar = document.getElementById('navbar');
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('bg-[#0f0f0f]/95', 'backdrop-blur-sm', 'border-b', 'border-white/10', 'shadow-xl');
            } else {
                navbar.classList.remove('bg-[#0f0f0f]/95', 'backdrop-blur-sm', 'border-b', 'border-white/10', 'shadow-xl');
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
