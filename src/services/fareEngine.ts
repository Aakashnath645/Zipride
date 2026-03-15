import type { RideType, FareBreakdown } from '@/types';
import { RIDE_OPTIONS } from '@/lib/constants';

export function calculateFare(
  rideType: RideType,
  distanceMeters: number,
  durationSeconds: number,
  promoCode?: string | null
): FareBreakdown {
  const option = RIDE_OPTIONS.find((r) => r.type === rideType);
  if (!option) throw new Error(`Unknown ride type: ${rideType}`);

  const distanceKm = distanceMeters / 1000;
  const surgeMultiplier = parseFloat((1 + Math.random() * 0.5).toFixed(1));

  const baseFare = option.baseFare;
  const distanceCharge = Math.round(option.perKmRate * distanceKm);
  const rawTotal = baseFare + distanceCharge;
  const surgeCharge = surgeMultiplier > 1.0 ? Math.round(rawTotal * (surgeMultiplier - 1)) : 0;

  let promoDiscount = 0;
  if (promoCode === 'FIRST50') {
    promoDiscount = Math.min(Math.round((rawTotal + surgeCharge) * 0.5), 75);
  } else if (promoCode === 'ZIPNEW') {
    promoDiscount = 30;
  }

  const total = Math.max(baseFare + distanceCharge + surgeCharge - promoDiscount, baseFare);

  return {
    baseFare,
    distanceCharge,
    surgeCharge,
    promoDiscount,
    total,
    distance: distanceMeters,
    duration: durationSeconds,
    surgeMultiplier,
  };
}
