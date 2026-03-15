import { useMemo } from 'react';
import type { RideType, FareBreakdown } from '@/types';
import { calculateFare } from '@/services/fareEngine';

export function useFare(
  rideType: RideType | null,
  distanceMeters: number,
  durationSeconds: number,
  promoCode?: string | null
): FareBreakdown | null {
  return useMemo(() => {
    if (!rideType || distanceMeters <= 0) return null;
    return calculateFare(rideType, distanceMeters, durationSeconds, promoCode);
  }, [rideType, distanceMeters, durationSeconds, promoCode]);
}
