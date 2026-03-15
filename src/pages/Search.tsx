import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/shared/PageTransition';
import LocationSearch from '@/components/booking/LocationSearch';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/stores/bookingStore';
import { useRideStore } from '@/stores/rideStore';
import type { Location } from '@/types';

function Search() {
  const navigate = useNavigate();
  const setDrop = useBookingStore((s) => s.setDrop);
  const rides = useRideStore((s) => s.rides);

  const recentDropLocations = rides
    .filter((r) => r.status === 'completed')
    .slice(0, 3)
    .map((r) => r.drop);

  const handleSelect = useCallback(
    (location: Location) => {
      setDrop(location);
      navigate('/app/ride-select');
    },
    [setDrop, navigate]
  );

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <PageTransition>
      <div className="flex h-full flex-col bg-[var(--background)]">
        {/* Header with back button */}
        <div className="flex items-center gap-3 border-b border-[var(--border)] px-4 py-3">
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              aria-label="Go back"
              className="shrink-0"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </motion.div>
          <h1 className="text-lg font-semibold text-[var(--text-primary)]">
            Choose destination
          </h1>
        </div>

        {/* Search content */}
        <div className="flex-1 overflow-y-auto px-4 pt-4 pb-6">
          <LocationSearch
            placeholder="Search for a destination..."
            onSelect={handleSelect}
            recentSearches={recentDropLocations}
          />
        </div>
      </div>
    </PageTransition>
  );
}

export default Search;
