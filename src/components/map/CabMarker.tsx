import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { useMemo } from 'react';
import type { LatLng } from '@/types';

interface CabMarkerProps {
  position: LatLng;
  bearing: number;
}

export default function CabMarker({ position, bearing }: CabMarkerProps) {
  const icon = useMemo(
    () =>
      L.divIcon({
        className: '',
        html: `
          <div style="width:36px;height:36px;transition:transform 0.5s ease;transform:rotate(${bearing}deg);">
            <svg viewBox="0 0 36 36" width="36" height="36" xmlns="http://www.w3.org/2000/svg">
              <rect x="8" y="4" width="20" height="28" rx="6" fill="#FFD700" stroke="#E6C200" stroke-width="1.5"/>
              <rect x="11" y="7" width="14" height="8" rx="2" fill="#FFF8DC" opacity="0.8"/>
              <rect x="12" y="24" width="5" height="3" rx="1" fill="#333"/>
              <rect x="19" y="24" width="5" height="3" rx="1" fill="#333"/>
              <circle cx="12" cy="32" r="2.5" fill="#333"/>
              <circle cx="24" cy="32" r="2.5" fill="#333"/>
              <circle cx="12" cy="4" r="2.5" fill="#333"/>
              <circle cx="24" cy="4" r="2.5" fill="#333"/>
              <rect x="14" y="0" width="8" height="3" rx="1" fill="#FFD700" stroke="#E6C200" stroke-width="0.5"/>
            </svg>
          </div>
        `,
        iconSize: [36, 36],
        iconAnchor: [18, 18],
      }),
    [bearing]
  );

  return <Marker position={[position.lat, position.lng]} icon={icon} />;
}
