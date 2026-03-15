import { Marker } from 'react-leaflet';
import L from 'leaflet';
import type { LatLng } from '@/types';

interface UserMarkerProps {
  position: LatLng;
}

const userIcon = L.divIcon({
  className: '',
  html: `
    <div style="position:relative;width:24px;height:24px;">
      <div style="position:absolute;inset:0;border-radius:50%;background:rgba(59,130,246,0.3);animation:pulse-ring 1.5s ease-out infinite;"></div>
      <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:50%;background:#3B82F6;border:2px solid white;box-shadow:0 0 6px rgba(59,130,246,0.5);"></div>
    </div>
  `,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export default function UserMarker({ position }: UserMarkerProps) {
  return <Marker position={[position.lat, position.lng]} icon={userIcon} />;
}
