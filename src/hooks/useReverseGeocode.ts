import { useQuery } from '@tanstack/react-query';
import type { LatLng } from '@/types';
import { reverseGeocode } from '@/services/geocoding';

export function useReverseGeocode(position: LatLng | null) {
  return useQuery({
    queryKey: ['reverse-geocode', position?.lat, position?.lng],
    queryFn: () => reverseGeocode(position!),
    enabled: !!position,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
