import { useQuery } from '@tanstack/react-query';
import type { LatLng } from '@/types';
import { getRoute, decodeRouteToLatLngs } from '@/services/routing';

export function useRouting(from: LatLng | null, to: LatLng | null) {
  const query = useQuery({
    queryKey: ['route', from?.lat, from?.lng, to?.lat, to?.lng],
    queryFn: async () => {
      const route = await getRoute(from!, to!);
      const waypoints = decodeRouteToLatLngs(route);
      return { route, waypoints };
    },
    enabled: !!from && !!to,
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });

  return {
    route: query.data?.route ?? null,
    waypoints: query.data?.waypoints ?? [],
    isLoading: query.isLoading,
    error: query.error,
  };
}
