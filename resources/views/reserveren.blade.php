@extends('layouts.app')

@section('title', __('site.reserveren_meta_title'))
@section('description', __('site.reserveren_meta_desc'))

@section('content')

<section class="relative pt-40 pb-8 bg-gradient-to-b from-gray-50 to-white">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,197,24,0.06)_0%,_transparent_60%)]"></div>
    <div class="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">{{ __('site.reserveren_hero_label') }}</span>
        <h1 class="text-5xl sm:text-6xl font-black mt-3 mb-4 text-gray-900">{{ __('site.reserveren_hero_title') }}</h1>
        <p class="text-gray-500 text-lg">{{ __('site.reserveren_hero_sub') }}</p>
    </div>
</section>

<section class="py-16">
    <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

        @if(session('success'))
        <div class="mb-8 bg-green-50 border border-green-200 rounded-2xl p-6 flex items-start gap-4">
            <div class="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                </svg>
            </div>
            <div>
                <h3 class="text-green-700 font-bold mb-1">{{ __('site.reserveren_success_title') }}</h3>
                <p class="text-green-600 text-sm">{{ session('success') }}</p>
            </div>
        </div>
        @endif

        <div class="bg-white border border-gray-200 rounded-3xl p-8 sm:p-10 shadow-sm">
            <form action="{{ route('reserveren.store') }}" method="POST" class="space-y-8">
                @csrf

                {{-- Persoonlijke gegevens --}}
                <div>
                    <h2 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <span class="w-7 h-7 bg-[#f5c518] rounded-lg flex items-center justify-center text-black text-sm font-black">1</span>
                        {{ __('site.reserveren_step1_title') }}
                    </h2>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">{{ __('site.reserveren_label_name') }}</label>
                            <input type="text" name="name" value="{{ old('name') }}" required
                                class="w-full bg-gray-50 border border-gray-200 focus:border-[#f5c518] rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors outline-none text-sm"
                                placeholder="{{ __('site.reserveren_ph_name') }}">
                            @error('name')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">{{ __('site.reserveren_label_phone') }}</label>
                            <input type="tel" name="phone" value="{{ old('phone') }}" required
                                class="w-full bg-gray-50 border border-gray-200 focus:border-[#f5c518] rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors outline-none text-sm"
                                placeholder="+31 6 12345678">
                            @error('phone')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                        </div>
                        <div class="sm:col-span-2">
                            <label class="block text-sm font-medium text-gray-700 mb-2">{{ __('site.reserveren_label_email') }}</label>
                            <input type="email" name="email" value="{{ old('email') }}" required
                                class="w-full bg-gray-50 border border-gray-200 focus:border-[#f5c518] rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors outline-none text-sm"
                                placeholder="{{ __('site.reserveren_ph_email') }}">
                            @error('email')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                        </div>
                    </div>
                </div>

                {{-- Rit details --}}
                <div>
                    <h2 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <span class="w-7 h-7 bg-[#f5c518] rounded-lg flex items-center justify-center text-black text-sm font-black">2</span>
                        {{ __('site.reserveren_step2_title') }}
                    </h2>
                    <div class="space-y-4">
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">{{ __('site.reserveren_label_date') }}</label>
                                <input type="date" name="date" value="{{ old('date') }}" required
                                    min="{{ date('Y-m-d', strtotime('+1 day')) }}"
                                    class="w-full bg-gray-50 border border-gray-200 focus:border-[#f5c518] rounded-xl px-4 py-3 text-gray-900 transition-colors outline-none text-sm">
                                @error('date')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">{{ __('site.reserveren_label_time') }}</label>
                                <input type="time" name="time" value="{{ old('time') }}" required
                                    class="w-full bg-gray-50 border border-gray-200 focus:border-[#f5c518] rounded-xl px-4 py-3 text-gray-900 transition-colors outline-none text-sm">
                                @error('time')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                            </div>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">{{ __('site.reserveren_label_pickup') }}</label>
                            <input type="text" name="pickup_location" value="{{ old('pickup_location') }}" required
                                class="w-full bg-gray-50 border border-gray-200 focus:border-[#f5c518] rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors outline-none text-sm"
                                placeholder="{{ __('site.reserveren_ph_pickup') }}">
                            @error('pickup_location')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-2">{{ __('site.reserveren_label_dest') }}</label>
                            <input type="text" name="destination" value="{{ old('destination') }}" required
                                class="w-full bg-gray-50 border border-gray-200 focus:border-[#f5c518] rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors outline-none text-sm"
                                placeholder="{{ __('site.reserveren_ph_dest') }}">
                            @error('destination')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">{{ __('site.reserveren_label_pax') }}</label>
                                <select name="passengers" required
                                    class="w-full bg-gray-50 border border-gray-200 focus:border-[#f5c518] rounded-xl px-4 py-3 text-gray-900 transition-colors outline-none text-sm">
                                    @for($i = 1; $i <= 4; $i++)
                                    <option value="{{ $i }}" {{ old('passengers') == $i ? 'selected' : '' }}>{{ $i }} {{ $i === 1 ? __('site.reserveren_pax_singular') : __('site.reserveren_pax_plural') }}</option>
                                    @endfor
                                </select>
                                @error('passengers')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">{{ __('site.reserveren_label_type') }}</label>
                                <select name="service_type" required
                                    class="w-full bg-gray-50 border border-gray-200 focus:border-[#f5c518] rounded-xl px-4 py-3 text-gray-900 transition-colors outline-none text-sm">
                                    <option value="luchthaven" {{ old('service_type') == 'luchthaven' ? 'selected' : '' }}>{{ __('site.reserveren_type_airport') }}</option>
                                    <option value="standaard" {{ old('service_type') == 'standaard' ? 'selected' : '' }}>{{ __('site.reserveren_type_standard') }}</option>
                                    <option value="zakelijk" {{ old('service_type') == 'zakelijk' ? 'selected' : '' }}>{{ __('site.reserveren_type_business') }}</option>
                                </select>
                                @error('service_type')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                            </div>
                        </div>
                    </div>
                </div>

                {{-- Opmerkingen --}}
                <div>
                    <h2 class="text-lg font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <span class="w-7 h-7 bg-[#f5c518] rounded-lg flex items-center justify-center text-black text-sm font-black">3</span>
                        {{ __('site.reserveren_step3_title') }} <span class="text-gray-400 font-normal text-sm">{{ __('site.reserveren_step3_opt') }}</span>
                    </h2>
                    <textarea name="notes" rows="3"
                        class="w-full bg-gray-50 border border-gray-200 focus:border-[#f5c518] rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors outline-none text-sm resize-none"
                        placeholder="{{ __('site.reserveren_ph_notes') }}">{{ old('notes') }}</textarea>
                    @error('notes')<p class="text-red-500 text-xs mt-1">{{ $message }}</p>@enderror
                </div>

                <div class="pt-4">
                    <button type="submit"
                        class="w-full bg-[#f5c518] hover:bg-yellow-400 text-black font-bold text-lg py-4 rounded-xl transition-all hover:shadow-xl hover:shadow-yellow-500/30 hover:-translate-y-0.5 flex items-center justify-center gap-3">
                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"/></svg>
                        {{ __('site.reserveren_btn_submit') }}
                    </button>
                    <p class="text-center text-gray-400 text-xs mt-4">{{ __('site.reserveren_confirm_note') }}</p>
                </div>
            </form>
        </div>

        <div class="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <a href="tel:+31XXXXXXXXX" class="flex items-center gap-4 bg-white border border-gray-200 hover:border-[#f5c518]/40 rounded-2xl p-5 transition-all hover:-translate-y-0.5 group shadow-sm">
                <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center group-hover:bg-[#f5c518]/20 transition-colors">
                    <svg class="w-6 h-6 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </div>
                <div>
                    <div class="text-gray-900 font-semibold text-sm">{{ __('site.reserveren_prefer_call') }}</div>
                    <div class="text-[#f5c518] text-sm">+31 XX XXX XXXX</div>
                </div>
            </a>
            <div class="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div class="w-12 h-12 bg-[#f5c518]/10 rounded-xl flex items-center justify-center">
                    <svg class="w-6 h-6 text-[#f5c518]" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm4.24 16L12 15.45 7.77 18l1.12-4.81-3.73-3.23 4.92-.42L12 5l1.92 4.53 4.92.42-3.73 3.23L16.23 18z"/></svg>
                </div>
                <div>
                    <div class="text-gray-900 font-semibold text-sm">{{ __('site.reserveren_available') }}</div>
                    <div class="text-gray-400 text-xs">{{ __('site.reserveren_day_night') }}</div>
                </div>
            </div>
        </div>
    </div>
</section>

@endsection
