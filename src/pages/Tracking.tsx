import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Navigation } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import RideMap from '@/components/map/RideMap';
import DriverCard from '@/components/tracking/DriverCard';
import RideStatusBar from '@/components/tracking/RideStatusBar';
import ETADisplay from '@/components/tracking/ETADisplay';
import SOSButton from '@/components/tracking/SOSButton';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog';
import { useCabTracking } from '@/hooks/useCabTracking';
import { useRideStore } from '@/stores/rideStore';
import { useBookingStore } from '@/stores/bookingStore';
import { useNotificationStore } from '@/stores/notificationStore';
import type { RideStatus } from '@/types';

const TRACKING_STATUSES: RideStatus[] = ['approaching', 'arrived', 'in_ride', 'completed'];
const STATUS_ADVANCE_MS = 25000;

const STATUS_MESSAGES: Record<string, { title: string; subtitle: string }> = {
  approaching: { title: 'Driver is on the way', subtitle: 'Your ride will arrive shortly' },
  arrived: { title: 'Driver has arrived', subtitle: 'Please head to the pickup point' },
  in_ride: { title: 'Enjoy your ride', subtitle: 'Sit back and relax' },
  completed: { title: 'Ride completed', subtitle: 'Thanks for riding with ZipRide' },
};

function Tracking() {
  const navigate = useNavigate();
  const currentRide = useRideStore((s) => s.currentRide);
  const updateRide = useRideStore((s) => s.updateRide);
  const resetBooking = useBookingStore((s) => s.resetBooking);
  const cancelRide = useRideStore((s) => s.cancelRide);
  const addNotification = useNotificationStore((s) => s.addNotification);

  const [trackingStatus, setTrackingStatus] = useState<RideStatus>('approaching');
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const rideId = currentRide?.id ?? null;

  const tracking = useCabTracking({
    driverStartPosition: currentRide?.driver.position ?? { lat: 0, lng: 0 },
    userPosition: currentRide?.pickup.position ?? { lat: 0, lng: 0 },
    dropPosition: currentRide?.drop.position,
    rideStatus: trackingStatus as 'idle' | 'approaching' | 'arrived' | 'in_ride' | 'completed',
  });

  // Auto-advance ride status every 8 seconds
  useEffect(() => {
    if (!currentRide) return;

    const interval = setInterval(() => {
      setTrackingStatus((prev) => {
        const currentIndex = TRACKING_STATUSES.indexOf(prev);
        if (currentIndex < 0 || currentIndex >= TRACKING_STATUSES.length - 1) {
          return prev;
        }
        const nextStatus = TRACKING_STATUSES[currentIndex + 1];
        return nextStatus;
      });
    }, STATUS_ADVANCE_MS);

    return () => clearInterval(interval);
  }, [currentRide]);

  // Sync ride status updates to store and send notifications
  useEffect(() => {
    if (rideId) {
      updateRide(rideId, { status: trackingStatus });
    }
    if (trackingStatus === 'arrived') {
      addNotification({
        title: 'Driver has arrived',
        message: `Your driver ${currentRide?.driver.name ?? ''} has arrived at the pickup point. Please head out.`,
        type: 'ride',
      });
    } else if (trackingStatus === 'in_ride') {
      addNotification({
        title: 'Ride started',
        message: `You are on your way to ${currentRide?.drop.name ?? 'your destination'}. Enjoy the ride!`,
        type: 'ride',
      });
    } else if (trackingStatus === 'completed') {
      addNotification({
        title: 'Ride completed',
        message: `You have arrived at ${currentRide?.drop.name ?? 'your destination'}. Thanks for riding with ZipRide!`,
        type: 'ride',
      });
    }
  }, [trackingStatus, rideId, updateRide, addNotification, currentRide?.driver.name, currentRide?.drop.name]);

  // Navigate to complete page when ride completes
  useEffect(() => {
    if (trackingStatus === 'completed' && rideId) {
      const timeout = setTimeout(() => {
        updateRide(rideId, {
          status: 'completed',
          completedAt: new Date().toISOString(),
        });
        navigate('/app/complete');
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [trackingStatus, navigate, rideId, updateRide]);

  const handleCancelRide = useCallback(() => {
    if (currentRide) {
      cancelRide(currentRide.id);
    }
    resetBooking();
    setCancelDialogOpen(false);
    navigate('/app/home');
  }, [currentRide, cancelRide, resetBooking, navigate]);

  if (!currentRide) {
    return null;
  }

  const destination =
    trackingStatus === 'in_ride' || trackingStatus === 'completed'
      ? currentRide.drop.position
      : currentRide.pickup.position;

  const statusInfo = STATUS_MESSAGES[trackingStatus] ?? STATUS_MESSAGES.approaching;

  return (
    <PageTransition>
      <div className="relative h-full">
        {/* Map fills the screen */}
        <div className="absolute inset-0 lg:right-[380px]">
          <RideMap
            userPosition={currentRide.pickup.position}
            cabPosition={tracking.cabPosition}
            cabBearing={tracking.bearing}
            destination={destination}
            routeWaypoints={tracking.routeWaypoints}
            fitBounds
          />
        </div>

        {/* SOS Button - top right on mobile, top right of map on desktop */}
        <div className="absolute top-4 right-4 z-20 lg:right-[396px]">
          <SOSButton />
        </div>

        {/* Mobile: Bottom card overlay */}
        <div className="absolute bottom-16 left-0 right-0 z-10 lg:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={trackingStatus}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <Card className="rounded-b-none rounded-t-2xl backdrop-blur-sm bg-[var(--surface)]/95 shadow-2xl">
                <div className="p-4 space-y-4">
                  {/* Status message bar */}
                  <div className="flex items-center gap-3">
                    <motion.div
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--primary)]/15"
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Navigation className="h-5 w-5 text-[var(--primary)]" />
                    </motion.div>
                    <div className="flex-1">
                      <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                        {statusInfo.title}
                      </h2>
                      <p className="text-xs text-[var(--text-muted)]">{statusInfo.subtitle}</p>
                    </div>
                    <ETADisplay etaSeconds={tracking.etaSeconds} />
                  </div>

                  {/* Status progress bar */}
                  <RideStatusBar status={trackingStatus} />

                  {/* Driver info */}
                  <DriverCard driver={currentRide.driver} />

                  {/* Cancel button */}
                  {(trackingStatus === 'approaching' || trackingStatus === 'arrived') && (
                    <Button
                      variant="outline"
                      className="w-full gap-2 text-[var(--error)] border-[var(--error)]/30 hover:bg-[var(--error)]/10"
                      onClick={() => setCancelDialogOpen(true)}
                    >
                      <X className="h-4 w-4" />
                      Cancel Ride
                    </Button>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop: Right panel */}
        <div className="hidden lg:flex lg:absolute lg:top-0 lg:right-0 lg:bottom-0 lg:w-[380px] lg:flex-col lg:border-l lg:border-[var(--border)] lg:bg-[var(--surface)]">
          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {/* Status header */}
            <div className="flex items-center gap-3">
              <motion.div
                className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--primary)]/15"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Navigation className="h-6 w-6 text-[var(--primary)]" />
              </motion.div>
              <div className="flex-1">
                <h2 className="text-base font-semibold text-[var(--text-primary)]">
                  {statusInfo.title}
                </h2>
                <p className="text-sm text-[var(--text-muted)]">{statusInfo.subtitle}</p>
              </div>
            </div>

            {/* ETA display */}
            <ETADisplay etaSeconds={tracking.etaSeconds} />

            {/* Status progress bar */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-3">
                Ride Progress
              </h3>
              <RideStatusBar status={trackingStatus} />
            </div>

            {/* Route info */}
            <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-raised)] p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-full bg-[var(--success)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    Pickup
                  </p>
                  <p className="text-sm text-[var(--text-primary)] truncate">
                    {currentRide.pickup.name}
                  </p>
                </div>
              </div>
              <div className="ml-1 border-l-2 border-dashed border-[var(--border)] h-4" />
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2.5 w-2.5 rounded-sm bg-[var(--error)]" />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                    Drop-off
                  </p>
                  <p className="text-sm text-[var(--text-primary)] truncate">
                    {currentRide.drop.name}
                  </p>
                </div>
              </div>
            </div>

            {/* Driver info */}
            <div>
              <h3 className="text-xs font-medium uppercase tracking-wider text-[var(--text-muted)] mb-3">
                Driver
              </h3>
              <DriverCard driver={currentRide.driver} />
            </div>
          </div>

          {/* Bottom action area */}
          <div className="border-t border-[var(--border)] p-4">
            {(trackingStatus === 'approaching' || trackingStatus === 'arrived') && (
              <Button
                variant="outline"
                className="w-full gap-2 text-[var(--error)] border-[var(--error)]/30 hover:bg-[var(--error)]/10"
                onClick={() => setCancelDialogOpen(true)}
              >
                <X className="h-4 w-4" />
                Cancel Ride
              </Button>
            )}
            {trackingStatus === 'in_ride' && (
              <div className="text-center text-sm text-[var(--text-muted)]">
                Heading to {currentRide.drop.name}
              </div>
            )}
          </div>
        </div>

        {/* Cancel confirmation dialog */}
        <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Cancel this ride?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to cancel? Your driver is already on the way. Cancellation charges
                may apply.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep Ride</AlertDialogCancel>
              <AlertDialogAction
                className="bg-[var(--error)] text-white hover:bg-[var(--error)]/90"
                onClick={handleCancelRide}
              >
                Yes, Cancel
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </PageTransition>
  );
}

export default Tracking;
