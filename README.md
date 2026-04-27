# YAS TaxiCentrale

Professionele taxiwebsite voor YAS TaxiCentrale in Gouda. Gebouwd als een React 19 SPA op een Laravel 13 backend.

## Tech Stack

| Laag | Technologie |
|------|-------------|
| Frontend | React 19 + TypeScript, Untitled UI Pro, Tailwind CSS v4 |
| Routing | React Router 7 (lazy-loaded pagina's) |
| State | Zustand v5 + localStorage persistentie |
| Backend | Laravel 13 (PHP 8.3) |
| Database | MySQL / MariaDB (via DBngin) |
| HTTP | Laravel Sanctum (token auth, toekomstig) |
| Mailing | Kerio Connect via mail.worxone.nl |
| Facturatie | MoneyBird API (draft facturen) |
| Kaarten | Nominatim (adresautocomplete) + OSRM (routering) |
| Tests | Pest PHP |
| Lokaal | Laravel Herd + Vite dev server |

## Pagina's

| Route | Pagina |
|-------|--------|
| `/` | Homepage (hero carousel, diensten, reviews, FAQ, CTA) |
| `/diensten` | Dienstenoverzicht |
| `/airport-service` | Luchthavenprijzen per bestemming |
| `/over-ons` | Bedrijfsverhaal en waarden |
| `/contact` | Contactformulier |
| `/reserveren` | 4-staps boekingswizard |

## API Endpoints

| Methode | Endpoint | Omschrijving |
|---------|----------|--------------|
| GET | `/api/v1/vehicles` | Alle voertuigtypen met tarieven |
| POST | `/api/v1/bookings/estimate` | Prijsberekening (vaste prijs of OSRM) |
| POST | `/api/v1/bookings` | Nieuwe boeking aanmaken |
| POST | `/contact` | Contactbericht opslaan |
| POST | `/language/{locale}` | Taalwissel (nl / en) |

## Lokale installatie

```bash
git clone git@github.com:karrady/my-laravel.git
cd my-laravel

composer install
npm install

cp .env.example .env
php artisan key:generate
php artisan migrate --seed

npm run dev
# of voor productie:
npm run build
```

Vereist Laravel Herd (php artisan serve werkt ook).

## Tests

```bash
php artisan test
```

Huidige status: **75 passed, 7 skipped** (EP04 Google Reviews — Sprint 3), 0 failed.

## Omgevingsvariabelen

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=yas_taxi

MAIL_MAILER=smtp
MAIL_HOST=mail.worxone.nl
MAIL_PORT=465
MAIL_USERNAME=info@yastaxicentrale.nl
MAIL_PASSWORD=

MONEYBIRD_API_TOKEN=
MONEYBIRD_ADMINISTRATION_ID=
```

## Projectstructuur

```
app/
├── Http/Controllers/
│   ├── Api/BookingApiController.php
│   ├── Api/PriceController.php
│   └── ContactController.php
├── Models/
│   ├── Booking.php          # Auto-genereert YAS-XXXXXX booking_number
│   ├── ContactMessage.php
│   ├── Faq.php
│   ├── FixedPrice.php       # Vaste routeprijzen (bidirectioneel)
│   ├── Review.php
│   ├── ServiceArea.php
│   └── Vehicle.php          # sedan / business / taxibus
└── Services/
    ├── MoneybirdService.php  # Draft factuur aanmaken
    ├── OsrmService.php       # Routeberekening (fallback)
    └── PriceCalculator.php   # Vaste prijs → OSRM fallback

resources/js/
├── components/
│   ├── address-autocomplete.tsx   # Nominatim (NL, 350ms debounce)
│   ├── booking/
│   │   ├── step-1-rit.tsx
│   │   ├── step-2-voertuig.tsx
│   │   ├── step-3-contact.tsx
│   │   ├── step-4-bevestiging.tsx
│   │   └── step-indicator.tsx
│   └── layout/
│       ├── yas-header.tsx
│       └── yas-footer.tsx
├── pages/
│   ├── home.tsx
│   ├── diensten.tsx
│   ├── airport-service.tsx
│   ├── over-ons.tsx
│   ├── contact.tsx
│   └── reserveren.tsx
└── stores/
    └── booking-store.ts       # Zustand + localStorage
```

## Sprint Planning

| Sprint | Status | Inhoud |
|--------|--------|--------|
| Sprint 1 | ✅ Klaar | Publieke website, formulieren, meertaligheid, SEO |
| Sprint 2 | ✅ Klaar | React SPA, boekingswizard, backend API, brand kleuren |
| Sprint 3 | 📋 Gepland | Google Reviews API, bevestigingsmails |
| Sprint 4 | 📋 Gepland | Google Maps, performance, admin panel |
