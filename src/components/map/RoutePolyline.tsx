import { Polyline } from 'react-leaflet';
import type { LatLng } from '@/types';

interface RoutePolylineProps {
  waypoints: LatLng[];
  color?: string;
  dashed?: boolean;
}

export default function RoutePolyline({
  waypoints,
  color = '#FFD700',
  dashed = true,
}: RoutePolylineProps) {
  if (waypoints.length < 2) return null;

  const positions = waypoints.map((w) => [w.lat, w.lng] as [number, number]);

  return (
    <Polyline
      positions={positions}
      pathOptions={{
        color,
        weight: 4,
        opacity: 0.9,
        dashArray: dashed ? '8 4' : undefined,
        className: dashed ? 'route-animated' : undefined,
      }}
    />
  );
}
