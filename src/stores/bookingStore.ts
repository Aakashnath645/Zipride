import { create } from 'zustand';
import type { Location, RideType, FareBreakdown, PaymentMethod, RideStatus } from '@/types';

interface BookingState {
  pickup: Location | null;
  drop: Location | null;
  selectedRide: RideType | null;
  fare: FareBreakdown | null;
  paymentMethod: PaymentMethod;
  promoCode: string | null;
  rideStatus: RideStatus;
  setPickup: (location: Location) => void;
  setDrop: (location: Location) => void;
  setSelectedRide: (type: RideType) => void;
  setFare: (fare: FareBreakdown) => void;
  setPaymentMethod: (method: PaymentMethod) => void;
  setPromoCode: (code: string | null) => void;
  setRideStatus: (status: RideStatus) => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingState>()((set) => ({
  pickup: null,
  drop: null,
  selectedRide: null,
  fare: null,
  paymentMethod: 'upi',
  promoCode: null,
  rideStatus: 'idle',
  setPickup: (location) => set({ pickup: location }),
  setDrop: (location) => set({ drop: location }),
  setSelectedRide: (type) => set({ selectedRide: type }),
  setFare: (fare) => set({ fare }),
  setPaymentMethod: (method) => set({ paymentMethod: method }),
  setPromoCode: (code) => set({ promoCode: code }),
  setRideStatus: (status) => set({ rideStatus: status }),
  resetBooking: () =>
    set({
      pickup: null,
      drop: null,
      selectedRide: null,
      fare: null,
      paymentMethod: 'upi',
      promoCode: null,
      rideStatus: 'idle',
    }),
}));
