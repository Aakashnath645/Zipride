import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { LatLng } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function haversineDistance(a: LatLng, b: LatLng): number {
  const R = 6371000;
  const dLat = (b.lat - a.lat) * Math.PI / 180;
  const dLng = (b.lng - a.lng) * Math.PI / 180;
  const lat1 = a.lat * Math.PI / 180;
  const lat2 = b.lat * Math.PI / 180;
  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);
  const aVal = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  const c = 2 * Math.atan2(Math.sqrt(aVal), Math.sqrt(1 - aVal));
  return R * c;
}

export function interpolateAlongPath(path: LatLng[], distanceMeters: number): LatLng {
  if (path.length === 0) return { lat: 0, lng: 0 };
  if (path.length === 1 || distanceMeters <= 0) return path[0];

  let accumulated = 0;
  for (let i = 0; i < path.length - 1; i++) {
    const segDist = haversineDistance(path[i], path[i + 1]);
    if (accumulated + segDist >= distanceMeters) {
      const remaining = distanceMeters - accumulated;
      const fraction = remaining / segDist;
      return {
        lat: path[i].lat + (path[i + 1].lat - path[i].lat) * fraction,
        lng: path[i].lng + (path[i + 1].lng - path[i].lng) * fraction,
      };
    }
    accumulated += segDist;
  }
  return path[path.length - 1];
}

export function calculateBearing(prev: LatLng, curr: LatLng): number {
  const dLng = (curr.lng - prev.lng) * Math.PI / 180;
  const lat1 = prev.lat * Math.PI / 180;
  const lat2 = curr.lat * Math.PI / 180;
  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  return (Math.atan2(y, x) * 180 / Math.PI + 360) % 360;
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toFixed(0)}`;
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export function metersToKm(meters: number): string {
  return (meters / 1000).toFixed(1);
}

export function secondsToMinutes(seconds: number): string {
  const mins = Math.round(seconds / 60);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  const remainMins = mins % 60;
  return `${hrs}h ${remainMins}m`;
}
