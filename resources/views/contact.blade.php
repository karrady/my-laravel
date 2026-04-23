@extends('layouts.app')

@section('title', 'Contact — TaxiCentrale')
@section('description', 'Neem contact op met TaxiCentrale. Bel ons, stuur een e-mail of gebruik het contactformulier. 24/7 bereikbaar voor al uw taxivragen.')

@section('content')

<section class="relative pt-40 pb-24 bg-gradient-to-b from-[#111] to-[#0f0f0f]">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,197,24,0.08)_0%,_transparent_60%)]"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Neem contact op</span>
        <h1 class="text-5xl sm:text-6xl font-black mt-3 mb-6">Contact</h1>
        <p class="text-gray-400 text-xl max-w-xl mx-auto">Bel, mail of stuur een bericht. Wij reageren snel.</p>
    </div>
</section>

<section class="py-16">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {{-- Contact info --}}
            <div class="lg:col-span-2 space-y-6">
                <div>
                    <h2 class="text-2xl font-black mb-6">Bereikbaarheid</h2>
                </div>

                <a href="tel:+31XXXXXXXXX" class="flex items-start gap-4 bg-[#1a1a1a] border border-white/5 hover:border-[#f5c518]/20 rounded-2xl p-6 transition-all hover:-translate-y-0.5 group">
                    <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#f5c518]/20 transition-colors">
                        <svg class="w-6 h-6 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                        </svg>
                    </div>
                    <div>
                        <div class="text-white font-semibold mb-1">Telefoon</div>
                        <div class="text-[#f5c518] font-bold text-lg">+31 XX XXX XXXX</div>
                        <div class="text-gray-500 text-xs mt-1">24 uur per dag, 7 dagen per week</div>
                    </div>
                </a>

                <a href="mailto:info@taxicentrale.nl" class="flex items-start gap-4 bg-[#1a1a1a] border border-white/5 hover:border-[#f5c518]/20 rounded-2xl p-6 transition-all hover:-translate-y-0.5 group">
                    <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-[#f5c518]/20 transition-colors">
                        <svg class="w-6 h-6 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                        </svg>
                    </div>
                    <div>
                        <div class="text-white font-semibold mb-1">E-mail</div>
                        <div class="text-[#f5c518] font-bold">info@taxicentrale.nl</div>
                        <div class="text-gray-500 text-xs mt-1">Reactie binnen 24 uur</div>
                    </div>
                </a>

                <div class="flex items-start gap-4 bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
                    <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                        </svg>
                    </div>
                    <div>
                        <div class="text-white font-semibold mb-1">Werkgebied</div>
                        <div class="text-gray-300 text-sm">Heel Nederland</div>
                        <div class="text-gray-500 text-xs mt-1">En op aanvraag ook internationaal</div>
                    </div>
                </div>

                <div class="flex items-start gap-4 bg-[#1a1a1a] border border-white/5 rounded-2xl p-6">
                    <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg class="w-6 h-6 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/>
                        </svg>
                    </div>
                    <div>
                        <div class="text-white font-semibold mb-1">Openingstijden</div>
                        <div class="text-gray-300 text-sm">Maandag — Zondag</div>
                        <div class="text-[#f5c518] text-sm font-semibold">00:00 — 24:00 uur</div>
                    </div>
                </div>
            </div>

            {{-- Contact form --}}
            <div class="lg:col-span-3">
                <div class="bg-[#1a1a1a] border border-white/5 rounded-3xl p-8 sm:p-10">
                    <h2 class="text-2xl font-black mb-8">Stuur een bericht</h2>

                    @if(session('success'))
                    <div class="mb-6 bg-green-500/10 border border-green-500/30 rounded-2xl p-5 flex items-start gap-3">
                        <svg class="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                        </svg>
                        <p class="text-green-300 text-sm">{{ session('success') }}</p>
                    </div>
                    @endif

                    <form action="{{ route('contact.store') }}" method="POST" class="space-y-5">
                        @csrf
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Naam *</label>
                                <input type="text" name="name" value="{{ old('name') }}" required
                                    class="w-full bg-[#111] border border-white/10 focus:border-[#f5c518] rounded-xl px-4 py-3 text-white placeholder-gray-600 transition-colors outline-none text-sm"
                                    placeholder="Uw naam">
                                @error('name')<p class="text-red-400 text-xs mt-1">{{ $message }}</p>@enderror
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-300 mb-2">Telefoon</label>
                                <input type="tel" name="phone" value="{{ old('phone') }}"
                                    class="w-full bg-[#111] border border-white/10 focus:border-[#f5c518] rounded-xl px-4 py-3 text-white placeholder-gray-600 transition-colors outline-none text-sm"
                                    placeholder="+31 6 ...">
                                @error('phone')<p class="text-red-400 text-xs mt-1">{{ $message }}</p>@enderror
                            </div>
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">E-mailadres *</label>
                            <input type="email" name="email" value="{{ old('email') }}" required
                                class="w-full bg-[#111] border border-white/10 focus:border-[#f5c518] rounded-xl px-4 py-3 text-white placeholder-gray-600 transition-colors outline-none text-sm"
                                placeholder="uw@email.nl">
                            @error('email')<p class="text-red-400 text-xs mt-1">{{ $message }}</p>@enderror
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Onderwerp *</label>
                            <select name="subject" required
                                class="w-full bg-[#111] border border-white/10 focus:border-[#f5c518] rounded-xl px-4 py-3 text-white transition-colors outline-none text-sm">
                                <option value="">Kies een onderwerp</option>
                                <option value="Boeking aanvraag" {{ old('subject') == 'Boeking aanvraag' ? 'selected' : '' }}>Boeking aanvraag</option>
                                <option value="Prijsopgave" {{ old('subject') == 'Prijsopgave' ? 'selected' : '' }}>Prijsopgave</option>
                                <option value="Zakelijk account" {{ old('subject') == 'Zakelijk account' ? 'selected' : '' }}>Zakelijk account</option>
                                <option value="Vraag over diensten" {{ old('subject') == 'Vraag over diensten' ? 'selected' : '' }}>Vraag over diensten</option>
                                <option value="Overig" {{ old('subject') == 'Overig' ? 'selected' : '' }}>Overig</option>
                            </select>
                            @error('subject')<p class="text-red-400 text-xs mt-1">{{ $message }}</p>@enderror
                        </div>

                        <div>
                            <label class="block text-sm font-medium text-gray-300 mb-2">Bericht *</label>
                            <textarea name="message" rows="5" required
                                class="w-full bg-[#111] border border-white/10 focus:border-[#f5c518] rounded-xl px-4 py-3 text-white placeholder-gray-600 transition-colors outline-none text-sm resize-none"
                                placeholder="Uw bericht...">{{ old('message') }}</textarea>
                            @error('message')<p class="text-red-400 text-xs mt-1">{{ $message }}</p>@enderror
                        </div>

                        <button type="submit"
                            class="w-full bg-[#f5c518] hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-yellow-500/30 hover:-translate-y-0.5 text-sm">
                            Bericht Versturen
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection
