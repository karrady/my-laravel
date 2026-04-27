import { useEffect, useState } from "react";
import { Button } from "@/components/base/buttons/button";
import { useBookingStore, VehicleType } from "@/stores/booking-store";
import { ArrowLeft, ArrowRight, Users01, CheckCircle } from "@untitledui/icons";
import { cx } from "@/utils/cx";

interface VehicleOption {
  type: VehicleType;
  name: string;
  description: string;
  maxPassengers: number;
  features: string[];
  priceCents: number;
  returnPriceCents: number | null;
  distanceKm: number | null;
  durationMin: number | null;
  isFixed: boolean;
}

interface Step2Props {
  onNext: () => void;
  onBack: () => void;
}

const VEHICLE_TYPES: VehicleType[] = ["sedan", "business", "taxibus"];

function formatEur(cents: number) {
  return new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" }).format(cents / 100);
}

export function Step2Voertuig({ onNext, onBack }: Step2Props) {
  const { step1, step2, setStep2 } = useBookingStore();
  const [options, setOptions] = useState<VehicleOption[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!step1.pickupLat || !step1.destinationLat) return;

    const fetchPrices = async () => {
      setIsLoading(true);
      setError(null);

      const results: VehicleOption[] = [];

      for (const type of VEHICLE_TYPES) {
        try {
          const res = await fetch("/api/v1/bookings/estimate", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify({
              from_lat: step1.pickupLat,
              from_lng: step1.pickupLng,
              to_lat: step1.destinationLat,
              to_lng: step1.destinationLng,
              vehicle_type: type,
              has_return: !!step1.returnAt,
            }),
          });

          if (res.ok) {
            const data = await res.json();
            results.push({
              type,
              name: data.vehicle.name,
              description: "",
              maxPassengers: data.vehicle.max_passengers,
              features: data.vehicle.features ?? [],
              priceCents: data.price_cents,
              returnPriceCents: data.return_price_cents,
              distanceKm: data.distance_km,
              durationMin: data.duration_min,
              isFixed: data.is_fixed,
            });
          }
        } catch {
          // skip this vehicle type on error
        }
      }

      if (results.length === 0) {
        setError("Kon geen prijzen berekenen. Controleer de adressen en probeer opnieuw.");
      } else {
        setOptions(results);
      }

      setIsLoading(false);
    };

    fetchPrices();
  }, [step1]);

  const handleSelect = (opt: VehicleOption) => {
    setStep2({
      vehicleType: opt.type,
      priceCents: opt.priceCents,
      returnPriceCents: opt.returnPriceCents,
      distanceKm: opt.distanceKm,
      durationMin: opt.durationMin,
      isFixed: opt.isFixed,
    });
  };

  const handleNext = () => {
    if (step2.vehicleType) onNext();
  };

  return (
    <div className="flex flex-col gap-6">
      {isLoading && (
        <div className="flex items-center justify-center py-12">
          <div className="size-8 animate-spin rounded-full border-4 border-brand border-t-transparent" />
          <span className="ml-3 text-secondary">Prijzen berekenen…</span>
        </div>
      )}

      {error && (
        <p className="rounded-lg border border-error_subtle bg-error-primary px-4 py-3 text-sm text-error-primary">
          {error}
        </p>
      )}

      {!isLoading && options.length > 0 && (
        <>
          {options[0]?.distanceKm ? (
            <p className="text-sm text-tertiary">
              Afstand: ca. {options[0].distanceKm} km
              {options[0].durationMin ? ` · ${options[0].durationMin} min` : ""}
            </p>
          ) : null}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {options.map((opt) => {
              const isSelected = step2.vehicleType === opt.type;
              const tooManyPassengers = step1.passengers > opt.maxPassengers;

              return (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => !tooManyPassengers && handleSelect(opt)}
                  disabled={tooManyPassengers}
                  className={cx(
                    "relative flex flex-col gap-4 rounded-xl border-2 p-5 text-left transition duration-100 ease-linear",
                    isSelected
                      ? "border-brand bg-brand-primary"
                      : "border-secondary bg-primary hover:border-brand hover:bg-primary_hover",
                    tooManyPassengers && "cursor-not-allowed opacity-50",
                  )}
                >
                  {isSelected && (
                    <CheckCircle
                      className="absolute right-4 top-4 size-5 text-brand-secondary"
                      aria-hidden
                    />
                  )}
                  <div>
                    <p className="font-semibold text-primary">{opt.name}</p>
                    <div className="mt-1 flex items-center gap-1 text-xs text-tertiary">
                      <Users01 className="size-3.5" aria-hidden />
                      <span>max. {opt.maxPassengers} passagiers</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-2xl font-bold text-primary">{formatEur(opt.priceCents)}</p>
                    {opt.returnPriceCents && (
                      <p className="text-xs text-tertiary">
                        Terugreis: {formatEur(opt.returnPriceCents)}
                      </p>
                    )}
                    <p className="mt-0.5 text-xs text-tertiary">
                      {opt.isFixed ? "Vaste prijs" : "Berekende prijs"}
                    </p>
                  </div>

                  <ul className="flex flex-col gap-1">
                    {opt.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-secondary">
                        <CheckCircle className="size-3.5 shrink-0 text-success-secondary" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>

                  {tooManyPassengers && (
                    <p className="text-xs text-error-primary">
                      Niet beschikbaar voor {step1.passengers} passagiers
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}

      <div className="flex justify-between">
        <Button color="secondary" iconLeading={ArrowLeft} onClick={onBack}>
          Terug
        </Button>
        <Button
          iconTrailing={ArrowRight}
          disabled={!step2.vehicleType}
          onClick={handleNext}
        >
          Gegevens invullen
        </Button>
      </div>
    </div>
  );
}
