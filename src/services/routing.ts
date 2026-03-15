import type { LatLng, OSRMRoute } from '@/types';

const OSRM_BASE = 'https://router.project-osrm.org';

export async function getRoute(from: LatLng, to: LatLng): Promise<OSRMRoute> {
  const url = `${OSRM_BASE}/route/v1/driving/${from.lng},${from.lat};${to.lng},${to.lat}?overview=full&geometries=geojson`;

  const response = await fetch(url);
  if (!response.ok) throw new Error('Routing failed');

  const data = await response.json();

  if (!data.routes || data.routes.length === 0) {
    throw new Error('No route found');
  }

  const route = data.routes[0];
  return {
    distance: route.distance,
    duration: route.duration,
    geometry: route.geometry,
  };
}

export function decodeRouteToLatLngs(route: OSRMRoute): LatLng[] {
  if (!route.geometry || !route.geometry.coordinates) return [];
  return route.geometry.coordinates.map(([lng, lat]: [number, number]) => ({
    lat,
    lng,
  }));
}
