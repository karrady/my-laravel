# SEO-plan — Lokale vindbaarheid Rijn en Gouwe
## YAS TaxiCentrale | Gouda → Alphen aan den Rijn

**Doel:** Domineer de lokale zoekresultaten voor taxivervoer in de gemeenten Gouda, Waddinxveen, Alphen aan den Rijn, Boskoop, Bodegraven-Reeuwijk en omgeving.

---

## 1. Zoekwoordenstrategie

### Primaire zoekwoorden (hoog volume, directe intentie)
| Zoekwoord | Type | Prioriteit |
|-----------|------|-----------|
| taxi Gouda | Lokaal | ★★★★★ |
| taxi Alphen aan den Rijn | Lokaal | ★★★★★ |
| taxi Waddinxveen | Lokaal | ★★★★☆ |
| taxi Boskoop | Lokaal | ★★★☆☆ |
| taxi Bodegraven | Lokaal | ★★★☆☆ |
| taxi Reeuwijk | Lokaal | ★★★☆☆ |
| taxicentrale Gouda | Brand+Lokaal | ★★★★★ |
| taxi boeken Gouda | Transactioneel | ★★★★★ |

### Secundaire zoekwoorden (dienst + locatie)
| Zoekwoord | Dienst |
|-----------|--------|
| taxi Schiphol Gouda | Luchthaventransfer |
| luchthaventaxi Gouda | Luchthaventransfer |
| taxi Rotterdam airport Gouda | Luchthaventransfer |
| zakelijke taxi Gouda | Zakelijk vervoer |
| rolstoeltaxi Gouda | Zorgvervoer |
| zorgvervoer Alphen aan den Rijn | Zorgvervoer |
| taxi Gouda station | Stationsvervoer |
| taxi Alphen aan den Rijn Schiphol | Luchthaventransfer |
| taxi Rijn en Gouwe | Regionaal |

### Long-tail zoekwoorden (lage concurrentie, hoge conversie)
- "goedkope taxi Gouda naar Schiphol"
- "vaste prijs taxi Gouda Rotterdam"
- "taxi bestellen Waddinxveen"
- "taxi voor ouderen Alphen aan den Rijn"
- "nacht taxi Gouda"
- "taxi op rekening Gouda zakelijk"

---

## 2. Technische SEO (website)

### 2.1 Meta-data per pagina
Elke pagina krijgt een unieke, geografisch geladen title en description:

| Pagina | Title | Description |
|--------|-------|-------------|
| `/` | YAS TaxiCentrale — Taxi Gouda & Rijn en Gouwe | Betrouwbare taxi in Gouda, Alphen aan den Rijn en de Rijn en Gouwe regio. Vaste prijzen, 24/7. Bel 085 212 83 02. |
| `/airport-service` | Luchthaventaxi Gouda — Schiphol, Rotterdam, Eindhoven | Vaste prijs taxi van Gouda naar Schiphol (€105), Rotterdam Airport (€65) en Eindhoven Airport. Direct boeken. |
| `/diensten` | Taxidiensten Rijn en Gouwe — YAS TaxiCentrale | Zakelijk vervoer, zorgvervoer, luchthaventransfers in Gouda, Waddinxveen, Alphen aan den Rijn en omgeving. |
| `/over-ons` | Over YAS TaxiCentrale — Lokale taxi in Gouda | Al jaren betrouwbare taxichauffeurs in Gouda en de Rijn en Gouwe regio. |
| `/contact` | Contact YAS TaxiCentrale — Bel 085 212 83 02 | Neem contact op met YAS TaxiCentrale in Gouda. Direct bereikbaar via telefoon, e-mail of contactformulier. |
| `/reserveren` | Taxi reserveren Gouda — Snel en vaste prijs | Reserveer eenvoudig uw taxi in Gouda en omgeving. 4 stappen, direct bevestigd. |

### 2.2 Schema.org structured data
Huidige `TaxiService` JSON-LD uitbreiden:
```json
{
  "@context": "https://schema.org",
  "@type": "TaxiService",
  "name": "YAS TaxiCentrale",
  "telephone": "+31852128302",
  "url": "https://yastaxicentrale.nl",
  "areaServed": [
    {"@type": "City", "name": "Gouda"},
    {"@type": "City", "name": "Alphen aan den Rijn"},
    {"@type": "City", "name": "Waddinxveen"},
    {"@type": "City", "name": "Boskoop"},
    {"@type": "City", "name": "Bodegraven"},
    {"@type": "City", "name": "Reeuwijk"},
    {"@type": "AdministrativeArea", "name": "Rijn en Gouwe"}
  ],
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "52.017",
    "longitude": "4.707"
  },
  "openingHours": "Mo-Su 00:00-24:00",
  "priceRange": "€€",
  "paymentAccepted": "Cash, PIN"
}
```

### 2.3 Lokale landingspagina's (nieuw te bouwen — Sprint 3)
Eén pagina per gemeente, met unieke tekst:

| URL | Titel | Woordcount |
|-----|-------|-----------|
| `/taxi-gouda` | Taxi Gouda — YAS TaxiCentrale | 600+ woorden |
| `/taxi-alphen-aan-den-rijn` | Taxi Alphen aan den Rijn | 600+ woorden |
| `/taxi-waddinxveen` | Taxi Waddinxveen | 400+ woorden |
| `/taxi-boskoop` | Taxi Boskoop | 400+ woorden |
| `/taxi-bodegraven` | Taxi Bodegraven | 400+ woorden |
| `/taxi-reeuwijk` | Taxi Reeuwijk | 400+ woorden |

**Structuur per landingspagina:**
1. H1: "Taxi [Gemeente] — Betrouwbaar & Vaste Prijs"
2. Intro alinea (lokale context, bekende plekken)
3. Diensten die in die gemeente beschikbaar zijn
4. Prijsoverzicht (Schiphol, Rotterdam Airport etc. vanuit die gemeente)
5. FAQ (3-5 vragen specifiek voor die gemeente)
6. CTA: "Direct boeken" + telefoonnummer

### 2.4 Sitemap & robots.txt
- XML sitemap aanmaken en indienen bij Google Search Console
- Alle pagina's + lokale landingspagina's opnemen
- Prioriteiten: homepage 1.0, dienstpagina's 0.8, lokale pages 0.7

---

## 3. Google Business Profile

**Actie:** Maak of claim het Google Business Profile voor YAS TaxiCentrale.

### Verplichte velden:
| Veld | Waarde |
|------|--------|
| Bedrijfsnaam | YAS TaxiCentrale |
| Categorie | Taxibedrijf |
| Telefoonnummer | 085 212 83 02 |
| Website | https://yastaxicentrale.nl |
| Adres | Gouda (of servicepunt) |
| Servicegebied | Gouda, Alphen aan den Rijn, Waddinxveen, Boskoop, Bodegraven, Reeuwijk |
| Openingstijden | 24/7 |

### Optimalisaties:
- **Foto's toevoegen:** voertuigen (sedan, taxibus), chauffeur, Gouda omgeving
- **Berichten posten:** maandelijks 1-2 berichten (kortingsacties, luchthavenprijzen)
- **Reviews actief verzamelen:** klanten na elke rit vragen via WhatsApp/SMS
- **Q&A sectie:** zelf vragen plaatsen + beantwoorden ("Rijdt u ook naar Schiphol?")
- **Services toevoegen:** luchthaventransfer, zakelijk, zorg, regio

### NAP-consistentie (Name, Address, Phone):
Overal exact dezelfde spelling gebruiken:
> **YAS TaxiCentrale** | Gouda | **085 212 83 02** | yastaxicentrale.nl

---

## 4. Lokale linkbuilding

### 4.1 Vermeldingen (citaties)
Aanmelden bij de volgende directories — altijd met dezelfde NAP:

| Platform | Type | Prioriteit |
|----------|------|-----------|
| Google Business Profile | Primair | ★★★★★ |
| Yelp Nederland | Directory | ★★★★☆ |
| Thuisbezorgd / Foursquare | Directory | ★★★☆☆ |
| 123taxi.nl | Branche | ★★★★☆ |
| Taxicentrale.nl | Branche | ★★★★☆ |
| Goudse.nl | Lokaal | ★★★★☆ |
| Alphen.nl | Lokaal | ★★★☆☆ |
| Waddinxveen.nl | Lokaal | ★★★☆☆ |
| KVK bedrijfsprofiel | Officieel | ★★★★★ |

### 4.2 Lokale partnerships
- Contact opnemen met **hotels in Gouda** voor verwijzing (NH Hotel, De Utrechtsche Dom)
- Partnership met **bedrijventerreinen** (Gouwe Park, Goudse Poort) voor zakelijk vervoer
- Vermelding bij **ziekenhuizen/klinieken** (Groene Hart Ziekenhuis) voor zorgvervoer
- Samenwerking met **reisbureau's** in Alphen aan den Rijn

### 4.3 Persberichten / lokale pers
- Nieuw bedrijf aankondigen in Goudse Courant
- Artikel over "betrouwbaar taxivervoer in Gouda" aanbieden aan lokale blogs

---

## 5. Content marketing

### 5.1 Blog (nieuw in Sprint 4)
Minimaal 1 artikel per maand, gericht op lokale zoekintentie:

| Artikel | Zoekwoord | Maand |
|---------|-----------|-------|
| "Taxi van Gouda naar Schiphol: alles wat u moet weten" | taxi Gouda Schiphol | Mei |
| "Luchthaven Eindhoven vanuit Alphen aan den Rijn: de beste optie" | taxi Alphen Eindhoven | Juni |
| "Zakelijk taxivervoer in de Rijn en Gouwe regio" | zakelijke taxi Gouda | Juli |
| "Zorgvervoer in Gouda: wat zijn uw opties?" | zorgvervoer Gouda | Augustus |
| "Taxi voor bedrijfsuitjes vanuit Gouda" | groepsvervoer Gouda | September |

### 5.2 FAQ-pagina uitbreiden
Lokaal gerichte FAQ toevoegen:
- "Rijdt u ook naar Alphen aan den Rijn?"
- "Wat kost een taxi van Waddinxveen naar Schiphol?"
- "Kunt u meerdere adressen aandoen in Gouda?"
- "Heeft u ook een rolstoeltaxi in Gouda?"

---

## 6. Technische checklist

### Direct uitvoeren:
- [x] Telefoonnummer 085 212 83 02 overal consistent
- [x] Schema.org areaServed uitgebreid met Rijn en Gouwe gemeenten
- [x] Meta description bijgewerkt met regio
- [ ] Google Business Profile aanmaken/claimen
- [ ] Google Search Console koppelen aan yastaxicentrale.nl
- [ ] XML sitemap aanmaken (`php artisan sitemap:generate`)
- [ ] robots.txt aanmaken

### Sprint 3 (volgende fase):
- [ ] Lokale landingspagina's bouwen (6 gemeenten)
- [ ] Blog sectie opzetten
- [ ] Sitemap indienen bij Google
- [ ] NAP-vermeldingen aanmaken in directories
- [ ] Google Business Profile foto's + berichten

### Sprint 4:
- [ ] Backlinks opbouwen via partnerships
- [ ] Blog artikelen schrijven (1/maand)
- [ ] Google Reviews actief verzamelen (target: 20+ reviews, 4.5+ gemiddeld)
- [ ] Core Web Vitals optimaliseren (LCP < 2.5s, CLS < 0.1)
- [ ] Open Graph tags toevoegen voor social sharing

---

## 7. KPI's en meting

| Metric | Huidig | Doel (3 mnd) | Doel (6 mnd) |
|--------|--------|--------------|--------------|
| Google ranking "taxi Gouda" | - | Top 10 | Top 5 |
| Google ranking "taxi Alphen aan den Rijn" | - | Top 10 | Top 5 |
| Organisch verkeer/maand | 0 | 200 | 500 |
| Google Business profiel views | 0 | 500/mnd | 1.500/mnd |
| Google reviews | 0 | 10 (4.5★) | 25 (4.7★) |
| Telefonische aanvragen | - | +20% | +50% |

**Tools:**
- Google Search Console (gratis, verplicht)
- Google Analytics 4 (gratis)
- Google Business Profile Insights (gratis)
- Screaming Frog of Ahrefs (optioneel, voor technische audit)

---

## 8. Tijdlijn

| Periode | Acties |
|---------|--------|
| Week 1-2 | Google Business Profile, NAP-vermeldingen, Search Console, robots.txt |
| Week 3-4 | Lokale landingspagina's schrijven en bouwen |
| Maand 2 | Sitemap indienen, eerste blog artikel, partnerships benaderen |
| Maand 3 | Reviews campagne starten, tweede blog artikel, resultaten meten |
| Maand 4-6 | Schalen op basis van data, meer landingspagina's, backlinks |
