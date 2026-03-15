import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Search, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/shared/PageTransition';
import RideMap from '@/components/map/RideMap';
import { Card } from '@/components/ui/card';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useReverseGeocode } from '@/hooks/useReverseGeocode';
import { useBookingStore } from '@/stores/bookingStore';
import { useUserStore } from '@/stores/userStore';
import { useRideStore } from '@/stores/rideStore';
import { getGreeting, formatCurrency } from '@/lib/utils';
import { QUICK_DESTINATIONS } from '@/lib/constants';
import type { Location } from '@/types';

function Home() {
  const navigate = useNavigate();
  const { position, loading: geoLoading } = useGeolocation();
  const { data: address, isLoading: addressLoading } = useReverseGeocode(position);
  const setPickup = useBookingStore((s) => s.setPickup);
  const setDrop = useBookingStore((s) => s.setDrop);
  const user = useUserStore((s) => s.user);
  const rides = useRideStore((s) => s.rides);

  const recentRides = useMemo(() => {
    return rides
      .filter((r) => r.status === 'completed')
      .slice(0, 3);
  }, [rides]);

  useEffect(() => {
    if (address && position) {
      const pickupLocation: Location = {
        position,
        address: address,
        name: address.split(',')[0].trim(),
      };
      setPickup(pickupLocation);
    }
  }, [address, position, setPickup]);

  const handleDestinationClick = () => {
    navigate('/app/search');
  };

  const handleQuickDestination = (destination: (typeof QUICK_DESTINATIONS)[number]) => {
    setDrop(destination.location);
    navigate('/app/ride-select');
  };

  const handleRecentRide = (ride: (typeof recentRides)[number]) => {
    setDrop(ride.drop);
    navigate('/app/ride-select');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const pickupDisplayText = geoLoading || addressLoading
    ? 'Detecting location...'
    : address || 'Current Location';

  return (
    <PageTransition>
      <div className="relative h-full">
        {/* Map fills full space */}
        <div className="absolute inset-0">
          <RideMap userPosition={position} />
        </div>

        {/* Floating content card */}
        <div className="absolute bottom-0 left-0 right-0 z-10 max-h-[70%] p-4 md:absolute md:top-4 md:left-4 md:right-auto md:bottom-auto md:max-h-none md:w-[380px]">
          <Card className="overflow-hidden backdrop-blur-sm bg-[var(--surface)]/95 shadow-lg">
            <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(70vh-2rem)] md:max-h-none scrollbar-hide">
              {/* Greeting */}
              <div>
                <h1 className="text-lg font-semibold text-[var(--text-primary)]">
                  {getGreeting()}, {user.name.split(' ')[0]}
                </h1>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Where are you headed?
                </p>
              </div>

              {/* Pickup location */}
              <div className="flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--success)]/15">
                  <div className="h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    Pickup
                  </p>
                  <p className="text-sm text-[var(--text-primary)] truncate">
                    {pickupDisplayText}
                  </p>
                </div>
                {(geoLoading || addressLoading) && (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--border)] border-t-[var(--primary)]" />
                )}
              </div>

              {/* Destination input */}
              <button
                type="button"
                onClick={handleDestinationClick}
                className="flex w-full items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-2.5 text-left transition-colors hover:bg-[var(--border)]/50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]/15">
                  <Search className="h-3.5 w-3.5 text-[var(--accent)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    Drop-off
                  </p>
                  <p className="text-sm text-[var(--text-muted)]">
                    Where to?
                  </p>
                </div>
                <ArrowRight className="h-4 w-4 text-[var(--text-muted)]" />
              </button>

              {/* Quick destination pills */}
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {QUICK_DESTINATIONS.map((dest) => (
                  <motion.button
                    key={dest.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickDestination(dest)}
                    className="flex shrink-0 items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-raised)] px-3 py-1.5 text-sm transition-colors hover:bg-[var(--border)]/50"
                  >
                    <span className="text-base">{dest.emoji}</span>
                    <span className="text-xs font-medium text-[var(--text-primary)]">
                      {dest.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Recent rides */}
              {recentRides.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                    <p className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider">
                      Recent
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    {recentRides.map((ride) => (
                      <motion.button
                        key={ride.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleRecentRide(ride)}
                        className="flex w-full items-center gap-3 rounded-lg p-2 text-left transition-colors hover:bg-[var(--surface-raised)]"
                      >
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--surface-raised)]">
                          <MapPin className="h-4 w-4 text-[var(--accent)]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1 text-sm text-[var(--text-primary)]">
                            <span className="truncate font-medium">{ride.pickup.name}</span>
                            <ArrowRight className="h-3 w-3 shrink-0 text-[var(--text-muted)]" />
                            <span className="truncate font-medium">{ride.drop.name}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs text-[var(--text-muted)]">
                              {formatCurrency(ride.fare.total)}
                            </span>
                            <span className="text-[var(--border)]">|</span>
                            <span className="text-xs text-[var(--text-muted)]">
                              {formatDate(ride.createdAt)}
                            </span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}

export default Home;
