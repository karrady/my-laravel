import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/base/input/input";
import { AlertCircle, Clock, InfoCircle, Plane } from "@untitledui/icons";

export type FlightDirection = "to_airport" | "from_airport";

interface FlightData {
    flight_number: string;
    status: string;
    departure_iata: string;
    arrival_iata: string;
    departure_airport_name: string;
    arrival_airport_name: string;
    scheduled_departure_at: string;
    delay_minutes: number;
    _mock?: boolean;
}

interface Breakdown {
    flight_departs?: string;
    flight_arrives?: string;
    airport_lead_minutes?: number;
    arrival_buffer_minutes?: number;
    drive_minutes: number;
    total_lead_minutes: number;
}

interface Advice {
    advised_at: string | null;
    advised_at_formatted: string | null;
    breakdown: Breakdown | null;
    disclaimer: string;
}

interface LookupResult {
    flight: FlightData;
    direction: FlightDirection;
    advice: Advice;
}

interface FlightLookupProps {
    direction: FlightDirection;
    date: string;         // YYYY-MM-DD
    pickupLat: number | null;
    pickupLng: number | null;
    onFlightFound: (flightNumber: string, result: LookupResult) => void;
    onFlightCleared: () => void;
}

const STATUS_LABELS: Record<string, string> = {
    scheduled: "Gepland",
    active: "In de lucht",
    landed: "Geland",
    cancelled: "Geannuleerd",
    diverted: "Omgeleid",
};

const STATUS_COLORS: Record<string, string> = {
    scheduled: "text-tertiary",
    active:    "text-success-primary",
    landed:    "text-success-primary",
    cancelled: "text-error-primary",
    diverted:  "text-warning-primary",
};

export function FlightLookup({ direction, date, pickupLat, pickupLng, onFlightFound, onFlightCleared }: FlightLookupProps) {
    const [number, setNumber] = useState("");
    const [result, setResult] = useState<LookupResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const lookup = async (flightNumber: string) => {
        if (flightNumber.length < 4) {
            setResult(null);
            setError(null);
            onFlightCleared();
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({ number: flightNumber, date, direction });
            if (pickupLat != null) params.set("pickup_lat", String(pickupLat));
            if (pickupLng != null) params.set("pickup_lng", String(pickupLng));

            const res = await fetch(`/api/v1/flights/lookup?${params}`, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            });

            if (res.status === 404) {
                setResult(null);
                setError("Vlucht niet gevonden. Controleer het vluchtnummer en de datum.");
                onFlightCleared();
                return;
            }
            if (!res.ok) {
                setError("Vluchtinformatie tijdelijk niet beschikbaar.");
                onFlightCleared();
                return;
            }

            const data: LookupResult = await res.json();
            setResult(data);
            setError(null);
            onFlightFound(flightNumber, data);
        } catch {
            setError("Verbinding mislukt. Voer de ophaaltijd handmatig in.");
            onFlightCleared();
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (value: string) => {
        const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        setNumber(clean);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => lookup(clean), 700);
    };

    useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

    const f = result?.flight;
    const advice = result?.advice;
    const delayed = (f?.delay_minutes ?? 0) > 5;
    const bd = advice?.breakdown;

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-secondary bg-secondary p-4">
            <div className="flex items-center gap-2">
                <Plane className="size-4 text-brand-secondary shrink-0" aria-hidden />
                <p className="text-sm font-semibold text-primary">
                    Vluchtnummer
                    <span className="ml-1 font-normal text-tertiary">
                        ({direction === "to_airport" ? "vertrekvlucht vanuit NL" : "aankomstvlucht in NL"})
                    </span>
                </p>
            </div>

            <Input
                label=""
                placeholder="Bijv. KL1234 of EZY8421"
                value={number}
                onChange={handleChange}
                isInvalid={!!error}
                hint={error ?? undefined}
            />

            {loading && (
                <p className="text-xs text-tertiary animate-pulse">Vluchtgegevens ophalen…</p>
            )}

            {f && advice && (
                <div className="flex flex-col gap-3 rounded-lg border border-secondary bg-primary p-4">
                    {/* Vlucht info */}
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="text-sm font-semibold text-primary">
                                {f.flight_number} · {f.departure_iata} → {f.arrival_iata}
                            </p>
                            <p className="text-xs text-tertiary">
                                {f.departure_airport_name} → {f.arrival_airport_name}
                            </p>
                        </div>
                        <span className={`text-xs font-medium ${STATUS_COLORS[f.status] ?? "text-tertiary"}`}>
                            {STATUS_LABELS[f.status] ?? f.status}
                        </span>
                    </div>

                    {delayed && (
                        <div className="flex items-center gap-1.5 text-warning-primary">
                            <AlertCircle className="size-3.5 shrink-0" aria-hidden />
                            <span className="text-xs font-medium">{f.delay_minutes} minuten vertraging gemeld</span>
                        </div>
                    )}

                    {/* Geadviseerde ophaaltijd */}
                    {advice.advised_at_formatted && bd && (
                        <div className="flex flex-col gap-2 rounded-lg border border-brand bg-brand-primary p-3">
                            <div className="flex items-center gap-2">
                                <Clock className="size-4 text-brand-secondary shrink-0" aria-hidden />
                                <div>
                                    <p className="text-xs text-secondary">
                                        {direction === "to_airport"
                                            ? "Geadviseerde ophaaltijd bij u thuis:"
                                            : "Wij zijn bij de aankomsthal om:"}
                                    </p>
                                    <p className="text-lg font-bold text-primary">{advice.advised_at_formatted}</p>
                                </div>
                            </div>

                            {/* Berekening tonen */}
                            {direction === "to_airport" && (
                                <div className="text-xs text-tertiary space-y-0.5 border-t border-secondary pt-2">
                                    <p>Vlucht vertrekt: <strong className="text-primary">{bd.flight_departs}</strong></p>
                                    <p>− {bd.airport_lead_minutes} min aanwezig op luchthaven</p>
                                    {bd.drive_minutes > 0 && (
                                        <p>− {bd.drive_minutes} min reistijd naar vliegveld</p>
                                    )}
                                    <p className="font-medium text-primary">
                                        = Advies ophalen om {advice.advised_at_formatted}
                                    </p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Disclaimer — verantwoordelijkheid altijd bij klant */}
                    <div className="flex items-start gap-2 rounded-lg bg-secondary p-3">
                        <InfoCircle className="size-4 text-tertiary shrink-0 mt-0.5" aria-hidden />
                        <p className="text-xs text-tertiary leading-relaxed">
                            <strong className="text-secondary">Dit is een advies.</strong>{" "}
                            U bepaalt zelf de definitieve ophaaltijd bij het invullen van datum &amp; tijd hierboven.
                            YAS TaxiCentrale is niet aansprakelijk voor gemiste vluchten.
                        </p>
                    </div>

                    {f._mock && (
                        <p className="text-xs text-quaternary italic">* Voorbeelddata — geen API-sleutel actief</p>
                    )}
                </div>
            )}

            {!result && !error && !loading && number.length === 0 && (
                <p className="text-xs text-tertiary">
                    Optioneel. Vul uw vluchtnummer in en wij berekenen een aanbevolen ophaaltijd
                    op basis van de reistijd naar het vliegveld.
                </p>
            )}
        </div>
    );
}
