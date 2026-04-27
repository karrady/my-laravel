import { FormEvent, useMemo, useState } from "react";
import { AddressAutocomplete } from "@/components/address-autocomplete";
import { FlightLookup } from "@/components/booking/flight-lookup";
import type { FlightDirection } from "@/components/booking/flight-lookup";
import { Button } from "@/components/base/buttons/button";
import { useBookingStore } from "@/stores/booking-store";
import { ArrowRight, Plane } from "@untitledui/icons";

const PASSENGER_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8];

const AIRPORT_KEYWORDS = ["schiphol", "rotterdam airport", "rotterdam the hague", "eindhoven airport", "ams", "rtm", "ein"];

function isAirportAddress(address: string): boolean {
    const lower = address.toLowerCase();
    return AIRPORT_KEYWORDS.some((kw) => lower.includes(kw));
}

interface Step1Props {
    onNext: () => void;
}

export function Step1Rit({ onNext }: Step1Props) {
    const { step1, setStep1 } = useBookingStore();
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [showFlight, setShowFlight] = useState(!!step1.flightNumber);

    const flightDirection = useMemo<FlightDirection>(() => {
        if (isAirportAddress(step1.destinationAddress)) return "to_airport";
        if (isAirportAddress(step1.pickupAddress)) return "from_airport";
        return "to_airport";
    }, [step1.pickupAddress, step1.destinationAddress]);

    const flightDate = step1.pickupAt
        ? step1.pickupAt.slice(0, 10)
        : new Date().toISOString().slice(0, 10);

    const validate = () => {
        const e: Record<string, string> = {};
        if (!step1.pickupAddress || step1.pickupLat === null) e.pickup = "Vul een geldig ophaaladres in.";
        if (!step1.destinationAddress || step1.destinationLat === null) e.destination = "Vul een geldig bestemmingsadres in.";
        if (!step1.pickupAt) e.pickupAt = "Kies een datum en tijd.";
        else if (new Date(step1.pickupAt) <= new Date()) e.pickupAt = "De ophaaltijd moet in de toekomst liggen.";
        if (step1.returnAt && new Date(step1.returnAt) <= new Date(step1.pickupAt)) {
            e.returnAt = "De terugreis moet na de heenreis zijn.";
        }
        return e;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const errs = validate();
        setErrors(errs);
        if (Object.keys(errs).length === 0) onNext();
    };

    const airportDetected = isAirportAddress(step1.destinationAddress) || isAirportAddress(step1.pickupAddress);

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <AddressAutocomplete
                label="Ophaaladres"
                placeholder="Bijv. Markt 1, Gouda"
                value={step1.pickupAddress}
                isRequired
                isInvalid={!!errors.pickup}
                hint={errors.pickup}
                onChange={(address, lat, lng) =>
                    setStep1({ pickupAddress: address, pickupLat: lat, pickupLng: lng })
                }
            />

            <AddressAutocomplete
                label="Bestemming"
                placeholder="Bijv. Amsterdam Schiphol"
                value={step1.destinationAddress}
                isRequired
                isInvalid={!!errors.destination}
                hint={errors.destination}
                onChange={(address, lat, lng) =>
                    setStep1({ destinationAddress: address, destinationLat: lat, destinationLng: lng })
                }
            />

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-secondary">
                        Datum &amp; tijd <span className="text-error-primary">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        value={step1.pickupAt}
                        min={new Date(Date.now() + 60 * 60 * 1000).toISOString().slice(0, 16)}
                        onChange={(e) => setStep1({ pickupAt: e.target.value })}
                        className="rounded-lg border border-primary bg-primary px-3.5 py-2.5 text-sm text-primary shadow-xs outline-none transition duration-100 ease-linear focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                    {errors.pickupAt && <p className="text-xs text-error-primary">{errors.pickupAt}</p>}
                </div>

                <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-secondary">Terugreis (optioneel)</label>
                    <input
                        type="datetime-local"
                        value={step1.returnAt ?? ""}
                        min={step1.pickupAt || new Date().toISOString().slice(0, 16)}
                        onChange={(e) => setStep1({ returnAt: e.target.value || null })}
                        className="rounded-lg border border-primary bg-primary px-3.5 py-2.5 text-sm text-primary shadow-xs outline-none transition duration-100 ease-linear focus:border-brand focus:ring-2 focus:ring-brand/20"
                    />
                    {errors.returnAt && <p className="text-xs text-error-primary">{errors.returnAt}</p>}
                </div>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-secondary">
                    Aantal passagiers <span className="text-error-primary">*</span>
                </label>
                <div className="flex flex-wrap gap-2">
                    {PASSENGER_OPTIONS.map((n) => (
                        <button
                            key={n}
                            type="button"
                            onClick={() => setStep1({ passengers: n })}
                            className={`flex size-10 items-center justify-center rounded-lg border text-sm font-medium transition duration-100 ease-linear ${
                                step1.passengers === n
                                    ? "border-brand bg-brand-primary text-brand-secondary"
                                    : "border-secondary bg-primary text-secondary hover:bg-primary_hover"
                            }`}
                        >
                            {n}
                        </button>
                    ))}
                </div>
            </div>

            {/* Flight tracker — auto-shown for airport trips, manually toggled otherwise */}
            {!showFlight && (
                <button
                    type="button"
                    onClick={() => setShowFlight(true)}
                    className="flex w-full items-center gap-2 rounded-xl border border-dashed border-secondary bg-secondary px-4 py-3 text-sm text-tertiary transition duration-100 ease-linear hover:border-brand hover:text-brand-secondary"
                >
                    <Plane className="size-4 shrink-0" aria-hidden />
                    {airportDetected
                        ? "Vluchtnummer toevoegen (aanbevolen voor luchthaventrips)"
                        : "Heeft u een vlucht? Voeg uw vluchtnummer toe"}
                </button>
            )}

            {showFlight && step1.pickupAt && (
                <FlightLookup
                    direction={flightDirection}
                    date={flightDate}
                    pickupLat={step1.pickupLat}
                    pickupLng={step1.pickupLng}
                    onFlightFound={(flightNumber, res) => {
                        setStep1({
                            flightNumber,
                            flightDirection: res.direction,
                            flightAirportIata: res.flight.arrival_iata || res.flight.departure_iata,
                            flightScheduledAt: res.flight.scheduled_departure_at ?? res.flight.scheduled_arrival_at ?? null,
                            flightPickupAt: res.advice.advised_at ?? null,
                            // Geen auto-fill van pickupAt — klant kiest zelf de definitieve tijd
                        });
                    }}
                    onFlightCleared={() => {
                        setStep1({ flightNumber: "", flightDirection: null, flightAirportIata: null, flightScheduledAt: null, flightPickupAt: null });
                    }}
                />
            )}

            {showFlight && !step1.pickupAt && (
                <p className="text-xs text-warning-primary">Vul eerst een datum en tijd in om de vlucht op te zoeken.</p>
            )}

            <div className="flex justify-end">
                <Button type="submit" iconTrailing={ArrowRight}>
                    Voertuig kiezen
                </Button>
            </div>
        </form>
    );
}
