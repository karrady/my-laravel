# SAFe Agile Backlog — YAS TaxiCentrale

> Werkwijze: Plan → Verify → Act → Test → Log → Release

---

## Legenda
| Status | Betekenis |
|--------|-----------|
| ✅ Klaar | Geïmplementeerd en getest |
| 🔄 In uitvoering | Wordt momenteel gebouwd |
| 📋 Gepland | Staat op de backlog |
| ⏸ On hold | Geblokkeerd of uitgesteld |

---

## EP-01 | Publieke Website & Gebruikerservaring
> **Doel:** Bezoekers kunnen alle pagina's bezoeken en krijgen een professionele eerste indruk van YAS TaxiCentrale.

### F-01.1 | Pagina-navigatie
| ID | User Story | Acceptatiecriteria | Status |
|----|-----------|-------------------|--------|
| US-01 | Als bezoeker wil ik de **homepage** bezoeken zodat ik een eerste indruk krijg van het bedrijf | Homepage laadt (HTTP 200), React SPA root aanwezig | ✅ Klaar |
| US-02 | Als bezoeker wil ik de **dienstenpagina** bezoeken zodat ik weet welke diensten er zijn | /diensten laadt (HTTP 200) | ✅ Klaar |
| US-03 | Als bezoeker wil ik de **airport service pagina** bezoeken zodat ik tarieven zie | /airport-service laadt (HTTP 200) | ✅ Klaar |
| US-04 | Als bezoeker wil ik de **over ons pagina** bezoeken zodat ik meer over het bedrijf leer | /over-ons laadt (HTTP 200) | ✅ Klaar |
| US-05 | Als bezoeker wil ik de **contactpagina** bezoeken zodat ik contact kan opnemen | /contact laadt (HTTP 200) | ✅ Klaar |
| US-06 | Als bezoeker wil ik de **reserveringspagina** bezoeken zodat ik een rit kan boeken | /reserveren laadt (HTTP 200) | ✅ Klaar |

### F-01.2 | Hero Carousel
| ID | User Story | Acceptatiecriteria | Status |
|----|-----------|-------------------|--------|
| US-07 | Als bezoeker wil ik een **hero carousel** zien met meerdere diensten | 5 slides (airport, lokaal, zakelijk, zorg, school), Ken Burns effect | ✅ Klaar |
| US-08 | Als bezoeker wil ik door de slides kunnen **navigeren** met pijlen en dots | Pijlen en dots aanwezig | ✅ Klaar |

### F-01.3 | Diensten Overzicht
| ID | User Story | Acceptatiecriteria | Status |
|----|-----------|-------------------|--------|
| US-09 | Als bezoeker wil ik een **overzicht van diensten** zien op de homepage | Diensten sectie aanwezig op homepage | ✅ Klaar |

---

## EP-02 | Formulierverwerking & Communicatie
> **Doel:** Klanten kunnen ritten reserveren en contact opnemen, met bevestiging per e-mail.

### F-02.1 | Reserveringswizard
| ID | User Story | Acceptatiecriteria | Status |
|----|-----------|-------------------|--------|
| US-10 | Als klant wil ik een **rit reserveren** via een 4-staps wizard | Stap 1-4 doorlopen → boeking opgeslagen in DB met YAS-XXXXXX nummer | ✅ Klaar |
| US-11 | Als klant wil ik **validatiefouten** zien als ik het formulier verkeerd invul | Verplichte velden gevalideerd op client én server | ✅ Klaar |
| US-12 | Als klant wil ik een **bevestigingsmail** ontvangen na reservering | Mail verstuurd naar klant na succesvolle reservering | 📋 Gepland |
| US-13 | Als beheerder wil ik een **notificatiemail** ontvangen bij nieuwe reservering | Mail verstuurd naar beheerder bij nieuwe boeking | 📋 Gepland |

### F-02.2 | Contactformulier
| ID | User Story | Acceptatiecriteria | Status |
|----|-----------|-------------------|--------|
| US-14 | Als bezoeker wil ik een **contactbericht sturen** | POST /contact → bericht opgeslagen in DB | ✅ Klaar |
| US-15 | Als bezoeker wil ik **validatiefouten** zien als ik het formulier verkeerd invul | Verplichte velden gevalideerd | ✅ Klaar |
| US-16 | Als bezoeker wil ik een **bevestigingsmail** ontvangen na het sturen van een bericht | Mail verstuurd naar bezoeker | 📋 Gepland |
| US-17 | Als beheerder wil ik een **notificatiemail** ontvangen bij nieuw contactbericht | Mail verstuurd naar beheerder | 📋 Gepland |

### F-02.3 | Prijsberekening
| ID | User Story | Acceptatiecriteria | Status |
|----|-----------|-------------------|--------|
| US-10a | Als klant wil ik een **directe prijsindicatie** zien bij het kiezen van een voertuig | PriceCalculator berekent vaste prijs of OSRM-prijs, getoond in voertuigkaarten | ✅ Klaar |
| US-10b | Als klant wil ik **3 voertuigtypes** kunnen kiezen met duidelijke verschillen | Sedan / Business / Taxibus met passagiersaantal en prijs | ✅ Klaar |

---

## EP-03 | Meertaligheid (NL / EN)
> **Doel:** De website is volledig beschikbaar in het Nederlands en Engels.

### F-03.1 | Taalwisselaar
| ID | User Story | Acceptatiecriteria | Status |
|----|-----------|-------------------|--------|
| US-18 | Als bezoeker wil ik kunnen **schakelen tussen NL en EN** | POST /language/{locale} werkt, alleen nl/en geaccepteerd | ✅ Klaar |
| US-19 | Als bezoeker wil ik dat mijn **taalkeuze onthouden** wordt | Taal opgeslagen in sessie | ✅ Klaar |
| US-20 | Als bezoeker wil ik dat **alle pagina's bereikbaar** zijn in beide talen | Alle routes laden in nl én en | ✅ Klaar |
| US-21 | Als bezoeker wil ik dat **ongeldige taalcodes** geweigerd worden | Alleen nl/en, anders geen sessie-update | ✅ Klaar |

---

## EP-04 | Google Integraties
> **Doel:** Echte Google Reviews worden getoond en het werkgebied is zichtbaar op een kaart.

### F-04.1 | Google Reviews API
| ID | User Story | Acceptatiecriteria | Status |
|----|-----------|-------------------|--------|
| US-22 | Als websitebeheerder wil ik **echte Google Reviews** tonen | Reviews via Google Places API geladen en getoond in carousel | 📋 Gepland |
| US-23 | Als bezoeker wil ik **klantreviews kunnen lezen** met naam, sterren en tekst | Reviewkaarten tonen naam, sterrenscore en recensietekst | 📋 Gepland |
| US-24 | Als beheerder wil ik dat bij een **API-fout** een lege staat getoond wordt | Graceful fallback zonder foutmelding voor bezoeker | 📋 Gepland |

### F-04.2 | Google Maps
| ID | User Story | Acceptatiecriteria | Status |
|----|-----------|-------------------|--------|
| US-25 | Als bezoeker wil ik het **werkgebied op een kaart** zien | Google Maps embed aanwezig op contactpagina | 📋 Gepland |

---

## EP-05 | SEO & Performance
> **Doel:** De website scoort goed in zoekmachines en laadt snel.

### F-05.1 | SEO Meta Tags
| ID | User Story | Acceptatiecriteria | Status |
|----|-----------|-------------------|--------|
| US-26 | Als beheerder wil ik **unieke meta-titels** zodat elke pagina goed vindbaar is | Title tag aanwezig in spa.blade.php | ✅ Klaar |
| US-27 | Als beheerder wil ik **structured data** (Schema.org TaxiService) | LD+JSON script aanwezig in head | ✅ Klaar |
| US-28 | Als beheerder wil ik **canonical URLs** per pagina | Canonical link tag aanwezig | ✅ Klaar |

### F-05.2 | Performance
| ID | User Story | Acceptatiecriteria | Status |
|----|-----------|-------------------|--------|
| US-29 | Als bezoeker wil ik dat de website **snel laadt** | Vite code-splitting actief, lazy-loading per pagina | ✅ Klaar |

---

## Release Plan

| Sprint | Status | Epics / Features | Doel |
|--------|--------|-----------------|------|
| Sprint 1 | ✅ Klaar | EP-01, EP-02 basis, EP-03, EP-05 | Werkende publieke website met formulieren, meertaligheid en SEO |
| Sprint 2 | ✅ Klaar | React SPA rebuild, EP-02 wizard, backend API, brand kleuren | Volledige SPA met boekingswizard, prijsberekening en MoneyBird |
| Sprint 3 | 📋 Gepland | EP-02 mails, EP-04 F-04.1 | Bevestigingsmails + Google Reviews API |
| Sprint 4 | 📋 Gepland | EP-04 F-04.2, admin panel | Google Maps + beheerportaal voor boekingen |

---

## Sprint 2 — React SPA + Backend Rebuild (Voltooid 2026-04-27)

### Geleverd
- React 19 + TypeScript SPA volledig opgebouwd met **Untitled UI Pro** componenten
- Brand kleur bijgewerkt naar taxi geel/amber palet (`#F5C518`, `#7B3F00`)
- 6 pagina's gebouwd en gekoppeld via React Router 7
- 4-staps boekingswizard met Zustand state + localStorage persistentie
- AddressAutocomplete op basis van Nominatim (NL, 350ms debounce)
- PriceCalculator: vaste prijs (FixedPrice tabel) → OSRM fallback
- API: `/api/v1/vehicles`, `/api/v1/bookings/estimate`, `/api/v1/bookings`
- MoneyBird draft factuur integratie (graceful no-op bij ontbrekende credentials)
- Alle GET routes serveren `view('spa')` — SPA laadt correct in browser
- `spa.blade.php` volledig herschreven met SEO en Schema.org JSON-LD
- Seeders: 3 voertuigen, 6 vaste routes, 6 reviews, 8 FAQs, 8 servicegebieden

### Testresultaten Sprint 2
- `npm run build`: ✅ succesvol (2566 modules, 537ms)
- `php artisan test`: **75 passed, 7 skipped, 0 failed**

---

## Sprint 1 — Eerste Publieke Website (Voltooid 2026-04-25)

### Geleverd
- Laravel 13 projectstructuur met Pest testframework
- Hero carousel: 5 slides met echte foto's en Ken Burns effect
- Dienstenpagina, airport service pagina met prijstabellen
- Over ons pagina, contactformulier (DB-opslag + validatie)
- Meertaligheid NL/EN via sessie
- SEO: title, meta description, canonical URL, LD+JSON TaxiService
- YAS logo geïntegreerd
- Testsuites EP01 t/m EP05

### Testresultaten Sprint 1
- `php artisan test`: **81 passed, 7 skipped, 0 failed**
