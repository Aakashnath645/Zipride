import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import type { LatLng } from '@/types';
import { useTheme } from '@/hooks/useTheme';
import UserMarker from './UserMarker';
import CabMarker from './CabMarker';
import DestinationMarker from './DestinationMarker';
import RoutePolyline from './RoutePolyline';
import MapControls from './MapControls';

const LIGHT_TILES = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const DARK_TILES = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

interface RideMapProps {
  userPosition: LatLng;
  cabPosition?: LatLng | null;
  cabBearing?: number;
  destination?: LatLng | null;
  routeWaypoints?: LatLng[];
  fitBounds?: boolean;
  className?: string;
}

function TileLayerSwitcher() {
  const { isDark } = useTheme();
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [map]);

  return (
    <TileLayer
      key={isDark ? 'dark' : 'light'}
      url={isDark ? DARK_TILES : LIGHT_TILES}
      attribution={ATTRIBUTION}
    />
  );
}

function FitBoundsHandler({ userPosition, destination }: { userPosition: LatLng; destination?: LatLng | null }) {
  const map = useMap();

  useEffect(() => {
    if (destination) {
      const bounds = [
        [userPosition.lat, userPosition.lng],
        [destination.lat, destination.lng],
      ] as [[number, number], [number, number]];
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 15 });
    }
  }, [map, userPosition, destination]);

  return null;
}

export default function RideMap({
  userPosition,
  cabPosition,
  cabBearing = 0,
  destination,
  routeWaypoints = [],
  fitBounds = false,
  className = '',
}: RideMapProps) {
  return (
    <div className={`relative h-full w-full ${className}`}>
      <MapContainer
        center={[userPosition.lat, userPosition.lng]}
        zoom={14}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayerSwitcher />
        <UserMarker position={userPosition} />
        {cabPosition && <CabMarker position={cabPosition} bearing={cabBearing} />}
        {destination && <DestinationMarker position={destination} />}
        {routeWaypoints.length > 0 && <RoutePolyline waypoints={routeWaypoints} />}
        {fitBounds && <FitBoundsHandler userPosition={userPosition} destination={destination} />}
        <MapControls userPosition={userPosition} />
      </MapContainer>
    </div>
  );
}
