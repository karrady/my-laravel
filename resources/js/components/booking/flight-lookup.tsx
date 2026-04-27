import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Plane, Clock, AlertCircle, CheckCircle } from "@untitledui/icons";

export type FlightDirection = "to_airport" | "from_airport";

interface FlightData {
    flight_number: string;
    status: string;
    departure_iata: string;
    arrival_iata: string;
    departure_airport_name: string;
    arrival_airport_name: string;
    scheduled_departure_at: string;
    scheduled_arrival_at: string;
    actual_arrival_at: string;
    delay_minutes: number;
    is_nl_arrival: boolean;
    _mock?: boolean;
}

interface LookupResult {
    flight: FlightData;
    direction: FlightDirection;
    pickup_at: string;
    pickup_at_formatted: string;
}

interface FlightLookupProps {
    direction: FlightDirection;
    date: string; // YYYY-MM-DD
    onResult: (result: LookupResult | null) => void;
}

const STATUS_LABELS: Record<string, string> = {
    scheduled: "Gepland",
    active: "In de lucht",
    landed: "Geland",
    cancelled: "Geannuleerd",
    diverted: "Omgeleid",
    unknown: "Onbekend",
};

const STATUS_COLORS: Record<string, string> = {
    scheduled: "text-brand-secondary",
    active: "text-success-primary",
    landed: "text-success-primary",
    cancelled: "text-error-primary",
    diverted: "text-warning-primary",
};

export function FlightLookup({ direction, date, onResult }: FlightLookupProps) {
    const [number, setNumber] = useState("");
    const [result, setResult] = useState<LookupResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const directionLabel = direction === "to_airport" ? "Vertrekt" : "Aankomt";
    const airportLabel = direction === "to_airport"
        ? "Schiphol, Rotterdam of Eindhoven"
        : "Schiphol, Rotterdam of Eindhoven";

    const lookup = async (flightNumber: string) => {
        if (flightNumber.length < 4) {
            setResult(null);
            setError(null);
            onResult(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams({ number: flightNumber, date, direction });
            const res = await fetch(`/api/v1/flights/lookup?${params}`, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            });

            if (res.status === 404) {
                setResult(null);
                setError("Vlucht niet gevonden. Controleer het vluchtnummer en de datum.");
                onResult(null);
                return;
            }
            if (!res.ok) {
                setError("Vluchtinformatie tijdelijk niet beschikbaar. Voer de tijd handmatig in.");
                onResult(null);
                return;
            }

            const data: LookupResult = await res.json();
            setResult(data);
            setError(null);
            onResult(data);
        } catch {
            setError("Verbinding mislukt. Voer de ophaaltijd handmatig in.");
            onResult(null);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (value: string) => {
        const clean = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
        setNumber(clean);
        if (debounceRef.current) clearTimeout(debounceRef.current);
        debounceRef.current = setTimeout(() => lookup(clean), 600);
    };

    useEffect(() => () => { if (debounceRef.current) clearTimeout(debounceRef.current); }, []);

    const f = result?.flight;
    const delayed = (f?.delay_minutes ?? 0) > 5;

    return (
        <div className="flex flex-col gap-4 rounded-xl border border-secondary bg-secondary p-4">
            <div className="flex items-center gap-2">
                <Plane className="size-4 text-brand-secondary" aria-hidden />
                <p className="text-sm font-semibold text-primary">
                    Vluchtnummer{" "}
                    <span className="font-normal text-tertiary">({directionLabel} op {airportLabel})</span>
                </p>
            </div>

            <Input
                label=""
                placeholder="Bijv. KL1234 of EZY1234"
                value={number}
                onChange={handleChange}
                isInvalid={!!error}
                hint={error ?? undefined}
            />

            {loading && (
                <p className="text-sm text-tertiary animate-pulse">Vluchtinformatie ophalen…</p>
            )}

            {result && f && (
                <div className="flex flex-col gap-2 rounded-lg border border-secondary bg-primary p-4">
                    <div className="flex items-start justify-between gap-2">
                        <div>
                            <p className="text-sm font-semibold text-primary">
                                {f.flight_number} · {f.departure_iata} → {f.arrival_iata}
                            </p>
                            <p className="text-xs text-tertiary">
                                {f.departure_airport_name} → {f.arrival_airport_name}
                            </p>
                        </div>
                        <span className={`text-xs font-semibold ${STATUS_COLORS[f.status] ?? "text-tertiary"}`}>
                            {STATUS_LABELS[f.status] ?? f.status}
                        </span>
                    </div>

                    {delayed && (
                        <div className="flex items-center gap-1.5 text-warning-primary">
                            <AlertCircle className="size-3.5" aria-hidden />
                            <span className="text-xs font-medium">
                                {f.delay_minutes} minuten vertraging
                            </span>
                        </div>
                    )}

                    {result.pickup_at_formatted && (
                        <div className="flex items-center gap-2 rounded-lg bg-brand-primary p-3 mt-1">
                            <Clock className="size-4 text-brand-secondary shrink-0" aria-hidden />
                            <div>
                                <p className="text-xs font-medium text-secondary">
                                    {direction === "to_airport"
                                        ? "Wij halen u op om:"
                                        : "Wij staan voor u klaar om:"}
                                </p>
                                <p className="text-md font-bold text-primary">
                                    {result.pickup_at_formatted}
                                </p>
                            </div>
                        </div>
                    )}

                    {f._mock && (
                        <p className="text-xs text-quaternary italic">* Voorbeelddata — geen API-sleutel geconfigureerd</p>
                    )}
                </div>
            )}

            {!result && !error && !loading && number.length === 0 && (
                <p className="text-xs text-tertiary">
                    Vul uw vluchtnummer in. Wij passen de ophaaltijd automatisch aan bij vertragingen.
                </p>
            )}
        </div>
    );
}
