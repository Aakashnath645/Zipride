import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Ride } from '@/types';
import { MOCK_RIDES } from '@/lib/constants';

interface RideState {
  rides: Ride[];
  currentRide: Ride | null;
  addRide: (ride: Ride) => void;
  setCurrentRide: (ride: Ride | null) => void;
  updateRide: (id: string, updates: Partial<Ride>) => void;
  cancelRide: (id: string) => void;
}

export const useRideStore = create<RideState>()(
  persist(
    (set) => ({
      rides: MOCK_RIDES,
      currentRide: null,
      addRide: (ride) =>
        set((state) => ({ rides: [ride, ...state.rides] })),
      setCurrentRide: (ride) => set({ currentRide: ride }),
      updateRide: (id, updates) =>
        set((state) => ({
          rides: state.rides.map((r) => (r.id === id ? { ...r, ...updates } : r)),
          currentRide:
            state.currentRide?.id === id
              ? { ...state.currentRide, ...updates }
              : state.currentRide,
        })),
      cancelRide: (id) =>
        set((state) => ({
          rides: state.rides.map((r) =>
            r.id === id ? { ...r, status: 'cancelled' as const } : r
          ),
          currentRide:
            state.currentRide?.id === id ? null : state.currentRide,
        })),
    }),
    { name: 'zipride-rides' }
  )
);
