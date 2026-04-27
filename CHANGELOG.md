# Changelog — YAS TaxiCentrale

Alle noemenswaardige wijzigingen worden hier bijgehouden.
Formaat gebaseerd op [Keep a Changelog](https://keepachangelog.com/nl/1.0.0/).

---

## [1.1.0] — 2026-04-27 — React SPA + Backend Rebuild

### Toegevoegd
- **4-staps boekingswizard** (`/reserveren`): rit → voertuig → contact → bevestiging
- **Zustand booking store** met localStorage persistentie (`yas-booking`)
- **AddressAutocomplete** component op basis van Nominatim/OpenStreetMap (NL, 350ms debounce)
- **PriceCalculator service**: vaste routeprijzen via FixedPrice tabel (Haversine), fallback via OSRM
- **OsrmService**: gratis routeberekening via router.project-osrm.org
- **MoneybirdService**: automatisch draft factuur aanmaken bij nieuwe boeking
- **API endpoints**: `GET /api/v1/vehicles`, `POST /api/v1/bookings/estimate`, `POST /api/v1/bookings`
- **Models**: Vehicle, FixedPrice, Review, Faq, ServiceArea (aanvulling op Booking)
- **Seeders**: VehicleSeeder (3 types), FixedPriceSeeder (6 routes), ReviewSeeder, FaqSeeder, ServiceAreaSeeder
- **Laravel Sanctum** geconfigureerd voor toekomstige tokenauth
- **StepIndicator** component met voltooide/actieve/toekomstige states
- Homepage volledig herbouwd met 10 secties (hero, trustbar, diensten, USP, reviews, metrics, FAQ, servicegebied, CTA)
- Taxi geel/amber brand kleurenschema (`#F5C518` als accent, `#7B3F00` als donkerbruin)

### Gewijzigd
- **Alle GET routes** serveren nu `view('spa')` — SPA laadt correct in browser
- `spa.blade.php` volledig herschreven met SEO (title, meta description, canonical, LD+JSON TaxiService)
- JSON-LD opgebouwd via `@php` block + `json_encode()` (voorkomt Blade parse-fouten op `@context`/`@type`)
- Brand kleur gewijzigd van navy blauw naar taxi geel/amber palette
- `booking_number` auto-gegenereerd in `Booking::booted()` als `YAS-XXXXXX`

### Gerepareerd
- Routes wezen naar oude Blade controllers → SPA was niet zichtbaar in browser
- `onPress`/`isDisabled` vervangen door `onClick`/`disabled` op UUI Button (HTMLButtonElement basis)
- `MapPin01` niet beschikbaar → vervangen door `MarkerPin01`
- `partialMerge` is geen geldig Zustand persist optie → verwijderd
- MoneybirdService crashte bij ontbrekende env vars → opgelost via `config(...) ?? ''`
- Blade parse-fout door `@context` in JSON-LD → opgelost via `@php` block

### Tests
- 4 testbestanden herschreven voor SPA-architectuur (server levert alleen HTML shell, React rendert content)
- `ReserveringTest` volledig herschreven naar `/api/v1/bookings` API endpoint
- `ContactTest` en `TaalWisselaarTest` ontdaan van React-gemaakte contentcontroles
- Resultaat: **75 passed, 7 skipped, 0 failed**

---

## [1.0.0] — 2026-04-25 — Eerste Publieke Website

### Toegevoegd
- Laravel 13 projectstructuur met Pest
- Hero carousel met 5 slides (airport, lokaal, zakelijk, zorg, school) met Ken Burns effect
- Dienstenpagina met 6 gelijke kaarten
- Airport service pagina met prijstabellen (AMS/RTM/EIN)
- Over ons pagina
- Contactformulier met `ContactMessage` model en validatie
- Reserveringspagina (eerste versie, Blade-formulier)
- Meertaligheid NL/EN via `POST /language/{locale}` en sessie
- SEO: meta-titels, canonical URLs, Schema.org TaxiService LD+JSON
- YAS logo (SVG) in header/footer
- Foto's: vliegveld, station Gouda (avond), schoolvervoer, zakelijk vervoer, zorgvervoer
- Testsuites EP01 t/m EP05 (Pest)

### Technisch
- Vite + React 19 + TypeScript frontend
- Tailwind CSS v4.2
- Untitled UI Pro componentenbibliotheek
- React Router 7 met lazy-loading

---

## [0.1.0] — 2026-04-20 — Initiële setup

- Laravel Boost installatie
- Pest configuratie
- Basis projectstructuur
