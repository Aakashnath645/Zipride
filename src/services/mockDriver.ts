import type { Driver, LatLng } from '@/types';
import { DEFAULT_DRIVER, DRIVER_START } from '@/lib/constants';

let driverPosition: LatLng = { ...DRIVER_START };

export function getDriver(): Driver {
  return { ...DEFAULT_DRIVER, position: { ...driverPosition } };
}

export function getDriverPosition(): LatLng {
  return { ...driverPosition };
}

export function setDriverPosition(pos: LatLng): void {
  driverPosition = { ...pos };
}

export function resetDriver(): void {
  driverPosition = { ...DRIVER_START };
}

export function generateDriverETA(distanceMeters: number): number {
  const speedMps = 8;
  return Math.round(distanceMeters / speedMps);
}
