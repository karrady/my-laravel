import { cx } from "@/utils/cx";
import { CheckDone01 } from "@untitledui/icons";

interface StepIndicatorProps {
  currentStep: 1 | 2 | 3 | 4;
}

const STEPS = [
  { number: 1, label: "Uw rit" },
  { number: 2, label: "Voertuig" },
  { number: 3, label: "Uw gegevens" },
  { number: 4, label: "Bevestiging" },
] as const;

export function StepIndicator({ currentStep }: StepIndicatorProps) {
  return (
    <nav aria-label="Boekingsstappen" className="flex items-center justify-center gap-0">
      {STEPS.map((step, i) => {
        const isCompleted = step.number < currentStep;
        const isActive = step.number === currentStep;
        const isLast = i === STEPS.length - 1;

        return (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cx(
                  "flex size-10 items-center justify-center rounded-full border-2 text-sm font-semibold transition duration-100 ease-linear",
                  isCompleted && "border-brand-solid bg-brand-solid text-white",
                  isActive && "border-brand bg-brand-primary text-brand-secondary",
                  !isCompleted && !isActive && "border-secondary bg-primary text-quaternary",
                )}
                aria-current={isActive ? "step" : undefined}
              >
                {isCompleted ? (
                  <CheckDone01 className="size-5 text-white" aria-hidden />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={cx(
                  "hidden text-xs font-medium sm:block",
                  isActive ? "text-brand-secondary" : isCompleted ? "text-secondary" : "text-quaternary",
                )}
              >
                {step.label}
              </span>
            </div>
            {!isLast && (
              <div
                className={cx(
                  "mx-2 mb-5 h-0.5 w-10 sm:w-16 transition duration-100 ease-linear",
                  isCompleted ? "bg-brand-solid" : "bg-tertiary",
                )}
              />
            )}
          </div>
        );
      })}
    </nav>
  );
}
