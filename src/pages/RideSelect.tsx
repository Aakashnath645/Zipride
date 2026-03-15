import { useMemo, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ArrowLeft, Route, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/shared/PageTransition';
import RideMap from '@/components/map/RideMap';
import RideOptions from '@/components/booking/RideOptions';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useBookingStore } from '@/stores/bookingStore';
import { useRouting } from '@/hooks/useRouting';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { calculateFare } from '@/services/fareEngine';
import { metersToKm, secondsToMinutes } from '@/lib/utils';
import { RIDE_OPTIONS } from '@/lib/constants';
import type { RideType, FareBreakdown } from '@/types';

function RideSelect() {
  const navigate = useNavigate();
  const pickup = useBookingStore((s) => s.pickup);
  const drop = useBookingStore((s) => s.drop);
  const promoCode = useBookingStore((s) => s.promoCode);
  const { selectRide, proceedToPayment } = useBookingFlow();

  const [selectedRide, setSelectedRide] = useState<RideType | null>(null);

  const { route, waypoints, isLoading: routeLoading } = useRouting(
    pickup?.position ?? null,
    drop?.position ?? null
  );

  const fares = useMemo(() => {
    if (!route) return null;
    const result = {} as Record<RideType, FareBreakdown>;
    for (const option of RIDE_OPTIONS) {
      result[option.type] = calculateFare(
        option.type,
        route.distance,
        route.duration,
        promoCode
      );
    }
    return result;
  }, [route, promoCode]);

  if (!pickup || !drop) {
    return <Navigate to="/app/home" replace />;
  }

  const handleSelect = (type: RideType) => {
    setSelectedRide(type);
  };

  const handleBook = () => {
    if (!selectedRide || !fares) return;
    const fare = fares[selectedRide];
    selectRide(selectedRide, fare);
    proceedToPayment();
  };

  const handleBack = () => {
    navigate(-1);
  };

  const selectedRideName = selectedRide
    ? RIDE_OPTIONS.find((o) => o.type === selectedRide)?.name ?? selectedRide
    : '';

  return (
    <PageTransition>
      <div className="flex h-full flex-col lg:flex-row bg-[var(--background)]">
        {/* Map section: top half on mobile, left side on lg+ */}
        <div className="relative h-[45%] w-full shrink-0 lg:h-full lg:w-1/2">
          <RideMap
            userPosition={pickup.position}
            destination={drop.position}
            routeWaypoints={waypoints}
            fitBounds
          />

          {/* Back button floating over the map */}
          <div className="absolute top-3 left-3 z-10">
            <motion.div whileTap={{ scale: 0.9 }}>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBack}
                aria-label="Go back"
                className="h-10 w-10 rounded-full bg-[var(--surface)] shadow-md hover:bg-[var(--surface-raised)]"
              >
                <ArrowLeft className="h-5 w-5 text-[var(--text-primary)]" />
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Ride options section: bottom half on mobile, right side on lg+ */}
        <div className="flex flex-1 flex-col overflow-hidden lg:w-1/2">
          <div className="flex-1 overflow-y-auto px-4 pt-4 pb-28 lg:pb-4">
            {/* Location summary */}
            <div className="mb-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--success)]" />
                <p className="text-sm text-[var(--text-primary)] truncate">
                  {pickup.name}
                </p>
              </div>
              <div className="ml-1 border-l-2 border-dashed border-[var(--border)] h-3" />
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <p className="text-sm text-[var(--text-primary)] truncate">
                  {drop.name}
                </p>
              </div>
            </div>

            {/* Route summary */}
            {routeLoading ? (
              <div className="mb-4 flex items-center gap-4">
                <Skeleton className="h-5 w-24" />
                <Skeleton className="h-5 w-24" />
              </div>
            ) : route ? (
              <Card className="mb-4 flex items-center gap-4 p-3 bg-[var(--surface-raised)]">
                <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                  <Route className="h-4 w-4 text-[var(--primary)]" />
                  <span className="font-medium">{metersToKm(route.distance)} km</span>
                </div>
                <div className="h-4 w-px bg-[var(--border)]" />
                <div className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)]">
                  <Clock className="h-4 w-4 text-[var(--primary)]" />
                  <span className="font-medium">{secondsToMinutes(route.duration)}</span>
                </div>
              </Card>
            ) : null}

            {/* Ride type cards */}
            <h2 className="mb-3 text-base font-semibold text-[var(--text-primary)]">
              Choose your ride
            </h2>

            {!fares ? (
              <div className="flex flex-col gap-3">
                {RIDE_OPTIONS.map((option) => (
                  <Skeleton key={option.type} className="h-[84px] w-full rounded-xl" />
                ))}
              </div>
            ) : (
              <RideOptions
                selectedRide={selectedRide}
                fares={fares}
                onSelect={handleSelect}
              />
            )}
          </div>

          {/* Book button pinned at bottom */}
          <div className="fixed bottom-16 left-0 right-0 z-20 border-t border-[var(--border)] bg-[var(--surface)] p-4 lg:static lg:border-t lg:mt-auto">
            <Button
              onClick={handleBook}
              disabled={!selectedRide || !fares}
              className="w-full h-12 text-base font-semibold"
            >
              {selectedRide ? `Book ${selectedRideName}` : 'Select a ride'}
            </Button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default RideSelect;
