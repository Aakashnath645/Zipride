import { useState, useEffect, useCallback } from 'react';
import type { LatLng } from '@/types';
import { KOLKATA_CENTER } from '@/lib/constants';

interface GeolocationState {
  position: LatLng;
  error: string | null;
  loading: boolean;
}

export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>({
    position: KOLKATA_CENTER,
    error: null,
    loading: true,
  });

  const updatePosition = useCallback(() => {
    if (!navigator.geolocation) {
      setState((prev) => ({ ...prev, loading: false, error: 'Geolocation not supported' }));
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        setState({
          position: { lat: pos.coords.latitude, lng: pos.coords.longitude },
          error: null,
          loading: false,
        });
      },
      (err) => {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: err.message,
        }));
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 30000 }
    );

    return watchId;
  }, []);

  useEffect(() => {
    const watchId = updatePosition();
    return () => {
      if (watchId !== undefined) navigator.geolocation.clearWatch(watchId);
    };
  }, [updatePosition]);

  return state;
}
