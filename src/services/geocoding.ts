import type { NominatimResult, LatLng } from '@/types';

const NOMINATIM_BASE = 'https://nominatim.openstreetmap.org';

export async function forwardGeocode(query: string): Promise<NominatimResult[]> {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    addressdetails: '1',
    limit: '8',
    countrycodes: 'in',
    viewbox: '88.20,22.45,88.55,22.70',
    bounded: '0',
  });

  const response = await fetch(`${NOMINATIM_BASE}/search?${params}`, {
    headers: { 'Accept-Language': 'en' },
  });

  if (!response.ok) throw new Error('Geocoding failed');
  return response.json();
}

export async function reverseGeocode(position: LatLng): Promise<string> {
  const params = new URLSearchParams({
    lat: position.lat.toString(),
    lon: position.lng.toString(),
    format: 'json',
    addressdetails: '1',
  });

  const response = await fetch(`${NOMINATIM_BASE}/reverse?${params}`, {
    headers: { 'Accept-Language': 'en' },
  });

  if (!response.ok) throw new Error('Reverse geocoding failed');
  const data = await response.json();

  const addr = data.address;
  const parts: string[] = [];
  if (addr.road) parts.push(addr.road);
  if (addr.neighbourhood) parts.push(addr.neighbourhood);
  if (addr.suburb) parts.push(addr.suburb);
  if (addr.city || addr.town) parts.push(addr.city || addr.town);

  return parts.length > 0 ? parts.slice(0, 3).join(', ') : data.display_name.split(',').slice(0, 3).join(',');
}
