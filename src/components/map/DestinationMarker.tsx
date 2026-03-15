import { Marker } from 'react-leaflet';
import L from 'leaflet';
import type { LatLng } from '@/types';

interface DestinationMarkerProps {
  position: LatLng;
}

const destIcon = L.divIcon({
  className: '',
  html: `
    <div style="width:28px;height:36px;">
      <svg viewBox="0 0 28 36" width="28" height="36" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0C6.3 0 0 6.3 0 14c0 10.5 14 22 14 22s14-11.5 14-22C28 6.3 21.7 0 14 0z" fill="#EF4444"/>
        <circle cx="14" cy="14" r="6" fill="white"/>
        <circle cx="14" cy="14" r="3" fill="#EF4444"/>
      </svg>
    </div>
  `,
  iconSize: [28, 36],
  iconAnchor: [14, 36],
});

export default function DestinationMarker({ position }: DestinationMarkerProps) {
  return <Marker position={[position.lat, position.lng]} icon={destIcon} />;
}
