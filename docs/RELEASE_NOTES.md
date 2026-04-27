# Release Notes — v1.1.0

**Datum:** 2026-04-27
**Sprint:** Sprint 2 — React SPA + Backend Rebuild
**Tests:** 75 passed · 7 skipped · 0 failed

---

## Wat is er nieuw?

### Boekingswizard

Bezoekers kunnen nu volledig online een rit reserveren via een 4-staps wizard:

1. **Rit** — ophaaladres (met live autocomplete), bestemming, datum/tijd, aantal passagiers
2. **Voertuig** — keuze uit 3 types (Sedan, Business, Taxibus) met prijsberekening per voertuig
3. **Contact** — naam, e-mail, telefoon, opmerkingen, betalingsvoorkeur
4. **Bevestiging** — boekingsnummer (YAS-XXXXXX), volledig ritoverzicht, totaalprijs

Wizard-state blijft bewaard bij terugknoppen en paginaverversing (localStorage).

### Adresautocomplete

Ophaal- en bestemmingsvelden zoeken live via OpenStreetMap Nominatim. Alleen Nederlandse adressen, minimaal 3 tekens, 350ms debounce voor performance.

### Slimme prijsberekening

Het systeem berekent automatisch de ritprijs:
- **Vaste prijs** — als het traject overeenkomt met een bekende route (bijv. Gouda → Schiphol: €105)
- **Afstandsprijs** — bij onbekende trajecten via OSRM routeberekening + tarieven per voertuigtype

### Backend API

Drie nieuwe REST endpoints:
- `GET /api/v1/vehicles` — voertuigopties ophalen
- `POST /api/v1/bookings/estimate` — prijsberekening (veilig, server-side)
- `POST /api/v1/bookings` — boeking aanmaken + MoneyBird draft factuur

### Brand kleuren

Kleurenschema bijgewerkt naar een warm taxi-palet:
- Taxi geel `#F5C518` als accentkleur
- Donkerbruin `#7B3F00` voor diepte
- Warm zwart als hero/CTA achtergrond

---

## Vaste vaste routeprijzen (enkele rit, incl. BTW)

| Van | Naar | Sedan | Business | Taxibus |
|-----|------|-------|----------|---------|
| Gouda | Schiphol | €105 | €131 | €147 |
| Gouda | Rotterdam Airport | €65 | €81 | €91 |
| Gouda | Eindhoven Airport | €175 | €219 | €245 |
| Gouda | Den Haag CS | €55 | €69 | €77 |
| Gouda | Rotterdam CS | €45 | €56 | €63 |
| Gouda | Utrecht CS | €48 | €60 | €67 |

Alle routes zijn bidirectioneel.

---

## Upgrade instructies

```bash
git pull origin main
composer install
npm install
php artisan migrate
php artisan db:seed
npm run build
```

Geen breaking changes voor eindgebruikers.

---

## Bekende beperkingen

- Bevestigingsmails worden nog niet verstuurd (Sprint 3)
- Google Reviews tonen placeholder data (Sprint 3)
- Google Maps embed nog niet aanwezig (Sprint 4)
- MoneyBird integratie vereist `MONEYBIRD_API_TOKEN` en `MONEYBIRD_ADMINISTRATION_ID` in `.env`

---

## Volgende sprint (Sprint 3)

- Transactionele e-mails: bevestiging aan klant + notificatie aan beheerder
- Google Places API koppeling voor echte reviews
- DKIM configuratie voor yastaxicentrale.nl (Kerio Connect)
