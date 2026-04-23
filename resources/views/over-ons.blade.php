@extends('layouts.app')

@section('title', 'Over Ons — TaxiCentrale')
@section('description', 'Leer meer over TaxiCentrale. Betrouwbaar taxivervoer met professionele chauffeurs. Onze missie: u altijd op tijd en comfortabel op uw bestemming brengen.')

@section('content')

<section class="relative pt-40 pb-24 bg-gradient-to-b from-[#111] to-[#0f0f0f]">
    <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,197,24,0.08)_0%,_transparent_60%)]"></div>
    <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Wie zijn wij</span>
        <h1 class="text-5xl sm:text-6xl font-black mt-3 mb-6">Over Ons</h1>
        <p class="text-gray-400 text-xl max-w-2xl mx-auto">
            Betrouwbaar, professioneel en altijd klaar voor u. Dat is TaxiCentrale.
        </p>
    </div>
</section>

{{-- Verhaal --}}
<section class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
                <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Ons verhaal</span>
                <h2 class="text-4xl font-black mt-3 mb-6">Passie voor vervoer, oog voor detail</h2>
                <div class="space-y-4 text-gray-400 leading-relaxed">
                    <p>
                        TaxiCentrale is opgericht met één doel: betrouwbaar en professioneel vervoer bieden aan iedereen die dat nodig heeft. Of u nu een airport transfer zoekt, zakelijk vervoer nodig heeft of gewoon een rit naar huis wilt — wij staan voor u klaar.
                    </p>
                    <p>
                        Onze chauffeurs zijn geselecteerd op professionaliteit, vriendelijkheid en kennis van de regio. Elk voertuig in onze vloot is goed onderhouden, schoon en comfortabel. U zit altijd goed bij ons.
                    </p>
                    <p>
                        Wij geloven in transparantie: vaste prijzen vooraf, geen verborgen kosten en eerlijke communicatie. Zo weet u altijd waar u aan toe bent.
                    </p>
                </div>
            </div>

            {{-- Stats --}}
            <div class="grid grid-cols-2 gap-6">
                @foreach([
                    ['number' => '24/7', 'label' => 'Bereikbaar', 'desc' => 'Dag en nacht voor u klaar'],
                    ['number' => '5★', 'label' => 'Beoordeling', 'desc' => 'Gemiddeld door onze klanten'],
                    ['number' => '100%', 'label' => 'Vaste prijzen', 'desc' => 'Geen verrassingen achteraf'],
                    ['number' => '∞', 'label' => 'Toewijding', 'desc' => 'Altijd de beste service'],
                ] as $stat)
                <div class="bg-[#1a1a1a] border border-white/5 rounded-2xl p-6 text-center">
                    <div class="text-4xl font-black text-[#f5c518] mb-1">{{ $stat['number'] }}</div>
                    <div class="text-white font-bold text-sm mb-1">{{ $stat['label'] }}</div>
                    <div class="text-gray-500 text-xs">{{ $stat['desc'] }}</div>
                </div>
                @endforeach
            </div>
        </div>
    </div>
</section>

{{-- Waarden --}}
<section class="py-24 bg-[#0a0a0a]">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
            <span class="text-[#f5c518] text-sm font-semibold uppercase tracking-widest">Waar wij voor staan</span>
            <h2 class="text-4xl font-black mt-3">Onze Waarden</h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            @foreach([
                ['icon' => 'M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4l5 2.18V11c0 3.5-2.33 6.79-5 7.93C9.33 17.79 7 14.5 7 11V7.18L12 5z', 'title' => 'Betrouwbaarheid', 'desc' => 'U kunt op ons rekenen. Altijd op de afgesproken tijd, altijd met dezelfde hoge kwaliteit. Betrouwbaarheid is de basis van alles wat wij doen.'],
                ['icon' => 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', 'title' => 'Veiligheid', 'desc' => 'Uw veiligheid staat voorop. Onze chauffeurs rijden veilig en defensief. Alle voertuigen worden regelmatig gekeurd en onderhouden.'],
                ['icon' => 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z', 'title' => 'Klantvriendelijkheid', 'desc' => 'Elke klant verdient de beste service. Onze chauffeurs zijn vriendelijk, behulpzaam en spreken vloeiend Nederlands.'],
            ] as $waarde)
            <div class="text-center">
                <div class="w-16 h-16 bg-[#f5c518]/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <svg class="w-8 h-8 text-[#f5c518]" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" d="{{ $waarde['icon'] }}"/>
                    </svg>
                </div>
                <h3 class="text-xl font-bold mb-3">{{ $waarde['title'] }}</h3>
                <p class="text-gray-400 text-sm leading-relaxed">{{ $waarde['desc'] }}</p>
            </div>
            @endforeach
        </div>
    </div>
</section>

{{-- CTA --}}
<section class="py-20 bg-[#f5c518]">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-black text-black mb-4">Maak kennis met onze service</h2>
        <p class="text-black/70 text-lg mb-8">Boek uw eerste rit en ervaar het verschil zelf.</p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="{{ route('boeken') }}" class="bg-black hover:bg-gray-900 text-white font-bold px-10 py-4 rounded-xl transition-all hover:-translate-y-1 hover:shadow-xl text-lg">
                Boek Nu
            </a>
            <a href="{{ route('contact') }}" class="bg-black/10 hover:bg-black/20 text-black font-bold px-10 py-4 rounded-xl transition-all text-lg border-2 border-black/20">
                Neem Contact Op
            </a>
        </div>
    </div>
</section>

@endsection
