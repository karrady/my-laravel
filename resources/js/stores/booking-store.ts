import { create } from "zustand";
import { persist } from "zustand/middleware";

export type VehicleType = "sedan" | "business" | "taxibus";
export type PaymentMethod = "in_taxi_pin" | "in_taxi_cash";

export interface BookingStep1 {
  pickupAddress: string;
  pickupLat: number | null;
  pickupLng: number | null;
  destinationAddress: string;
  destinationLat: number | null;
  destinationLng: number | null;
  pickupAt: string; // ISO datetime string
  returnAt: string | null;
  passengers: number;
}

export interface BookingStep2 {
  vehicleType: VehicleType | null;
  priceCents: number | null;
  returnPriceCents: number | null;
  distanceKm: number | null;
  durationMin: number | null;
  isFixed: boolean;
}

export interface BookingStep3 {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  flightNumber: string;
  notes: string;
  wantsSms: boolean;
  paymentMethod: PaymentMethod;
}

export interface BookingConfirmation {
  bookingNumber: string | null;
}

interface BookingState {
  step: 1 | 2 | 3 | 4;
  step1: BookingStep1;
  step2: BookingStep2;
  step3: BookingStep3;
  confirmation: BookingConfirmation;

  setStep: (step: 1 | 2 | 3 | 4) => void;
  setStep1: (data: Partial<BookingStep1>) => void;
  setStep2: (data: Partial<BookingStep2>) => void;
  setStep3: (data: Partial<BookingStep3>) => void;
  setConfirmation: (data: BookingConfirmation) => void;
  reset: () => void;
}

const initialStep1: BookingStep1 = {
  pickupAddress: "",
  pickupLat: null,
  pickupLng: null,
  destinationAddress: "",
  destinationLat: null,
  destinationLng: null,
  pickupAt: "",
  returnAt: null,
  passengers: 1,
};

const initialStep2: BookingStep2 = {
  vehicleType: null,
  priceCents: null,
  returnPriceCents: null,
  distanceKm: null,
  durationMin: null,
  isFixed: false,
};

const initialStep3: BookingStep3 = {
  customerName: "",
  customerEmail: "",
  customerPhone: "",
  flightNumber: "",
  notes: "",
  wantsSms: false,
  paymentMethod: "in_taxi_pin",
};

export const useBookingStore = create<BookingState>()(
  persist(
    (set) => ({
      step: 1,
      step1: initialStep1,
      step2: initialStep2,
      step3: initialStep3,
      confirmation: { bookingNumber: null },

      setStep: (step) => set({ step }),
      setStep1: (data) => set((s) => ({ step1: { ...s.step1, ...data } })),
      setStep2: (data) => set((s) => ({ step2: { ...s.step2, ...data } })),
      setStep3: (data) => set((s) => ({ step3: { ...s.step3, ...data } })),
      setConfirmation: (data) => set({ confirmation: data }),
      reset: () =>
        set({
          step: 1,
          step1: initialStep1,
          step2: initialStep2,
          step3: initialStep3,
          confirmation: { bookingNumber: null },
        }),
    }),
    {
      name: "yas-booking",
    },
  ),
);
