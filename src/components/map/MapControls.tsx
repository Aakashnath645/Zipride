import { useMap } from 'react-leaflet';
import { Crosshair, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { LatLng } from '@/types';

interface MapControlsProps {
  userPosition: LatLng;
}

export default function MapControls({ userPosition }: MapControlsProps) {
  const map = useMap();

  return (
    <div className="absolute bottom-24 right-3 z-[1000] flex flex-col gap-2 md:bottom-4">
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full bg-[var(--surface)] shadow-md"
        onClick={() => map.flyTo([userPosition.lat, userPosition.lng], 15, { duration: 1 })}
      >
        <Crosshair className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full bg-[var(--surface)] shadow-md"
        onClick={() => map.zoomIn()}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-10 w-10 rounded-full bg-[var(--surface)] shadow-md"
        onClick={() => map.zoomOut()}
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
    </div>
  );
}
