import { useQuery } from '@tanstack/react-query';
import { forwardGeocode } from '@/services/geocoding';

export function useForwardGeocode(query: string) {
  return useQuery({
    queryKey: ['forward-geocode', query],
    queryFn: () => forwardGeocode(query),
    enabled: query.length >= 3,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
}
