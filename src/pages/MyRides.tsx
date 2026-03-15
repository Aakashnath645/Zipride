import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { format } from 'date-fns';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import FareBreakdown from '@/components/booking/FareBreakdown';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { IconPinPickup, IconPinDrop, IconMyRides } from '@/components/icons';
import { useRideStore } from '@/stores/rideStore';
import { useBookingStore } from '@/stores/bookingStore';
import { formatCurrency } from '@/lib/utils';
import type { Ride, RideStatus } from '@/types';

function getStatusBadgeVariant(status: RideStatus): 'success' | 'destructive' | 'secondary' {
  if (status === 'completed') return 'success';
  if (status === 'cancelled') return 'destructive';
  return 'secondary';
}

function getStatusLabel(status: RideStatus): string {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'cancelled':
      return 'Cancelled';
    case 'searching':
      return 'Searching';
    case 'assigned':
      return 'Assigned';
    case 'approaching':
      return 'Approaching';
    case 'arrived':
      return 'Arrived';
    case 'in_ride':
      return 'In Ride';
    case 'idle':
      return 'Idle';
    default:
      return status;
  }
}

function EmptyState({ message }: { message: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-16 px-4"
    >
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[var(--surface-raised)] mb-4">
        <IconMyRides size={40} className="text-[var(--text-muted)]" />
      </div>
      <p className="text-sm text-[var(--text-muted)] text-center">{message}</p>
    </motion.div>
  );
}

function RideCard({ ride }: { ride: Ride }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const setPickup = useBookingStore((s) => s.setPickup);
  const setDrop = useBookingStore((s) => s.setDrop);

  const handleRebook = () => {
    setPickup(ride.pickup);
    setDrop(ride.drop);
    navigate('/app/ride-select');
  };

  return (
    <motion.div layout onClick={() => setExpanded((prev) => !prev)} className="cursor-pointer">
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        <motion.div layout="position" className="p-4 space-y-3">
          {/* Header: date and status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
              <Calendar className="h-3.5 w-3.5" />
              <span>{format(new Date(ride.createdAt), 'dd MMM yyyy, hh:mm a')}</span>
            </div>
            <Badge variant={getStatusBadgeVariant(ride.status)}>
              {getStatusLabel(ride.status)}
            </Badge>
          </div>

          {/* Pickup and drop */}
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <IconPinPickup size={18} className="shrink-0" />
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                {ride.pickup.name}
              </p>
            </div>
            <div className="ml-2 border-l-2 border-dashed border-[var(--border)] h-2" />
            <div className="flex items-center gap-2.5">
              <IconPinDrop size={18} className="shrink-0" />
              <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                {ride.drop.name}
              </p>
            </div>
          </div>

          {/* Fare and ride type */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium uppercase text-[var(--text-muted)] bg-[var(--surface-raised)] px-2 py-0.5 rounded">
                {ride.rideType === 'mini' ? 'ZipMini' : ride.rideType === 'go' ? 'ZipGo' : 'ZipPrime'}
              </span>
              {ride.completedAt && (
                <span className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                  <Clock className="h-3 w-3" />
                  {Math.round(ride.fare.duration / 60)} min
                </span>
              )}
            </div>
            <span className="text-base font-bold text-[var(--text-primary)]">
              {formatCurrency(ride.fare.total)}
            </span>
          </div>
        </motion.div>

        {/* Expanded section */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <div className="px-4 pb-4 space-y-3 border-t border-[var(--border)] pt-3">
                {/* Addresses */}
                <div className="space-y-1">
                  <p className="text-xs text-[var(--text-muted)]">{ride.pickup.address}</p>
                  <div className="flex items-center gap-1 text-xs text-[var(--text-muted)]">
                    <ArrowRight className="h-3 w-3" />
                  </div>
                  <p className="text-xs text-[var(--text-muted)]">{ride.drop.address}</p>
                </div>

                {/* Driver info */}
                <div className="flex items-center gap-3 rounded-lg bg-[var(--surface-raised)] p-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--primary)]/15 text-sm font-bold text-[var(--primary)]">
                    {ride.driver.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[var(--text-primary)]">{ride.driver.name}</p>
                    <p className="text-xs text-[var(--text-muted)]">
                      {ride.driver.vehicleModel} - {ride.driver.vehicleNumber}
                    </p>
                  </div>
                  {ride.rating && (
                    <div className="flex items-center gap-1 text-xs font-medium text-[var(--warning)]">
                      <span>{'*'}</span>
                      <span>{ride.rating}/5</span>
                    </div>
                  )}
                </div>

                {/* Fare breakdown */}
                <FareBreakdown fare={ride.fare} />

                {/* Rebook button */}
                <Button
                  className="w-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRebook();
                  }}
                >
                  Rebook this Ride
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

function RideList({ rides, emptyMessage }: { rides: Ride[]; emptyMessage: string }) {
  if (rides.length === 0) {
    return <EmptyState message={emptyMessage} />;
  }

  return (
    <div className="space-y-3">
      {rides.map((ride) => (
        <RideCard key={ride.id} ride={ride} />
      ))}
    </div>
  );
}

function MyRides() {
  const rides = useRideStore((s) => s.rides);

  const completedRides = useMemo(
    () => rides.filter((r) => r.status === 'completed'),
    [rides]
  );

  const cancelledRides = useMemo(
    () => rides.filter((r) => r.status === 'cancelled'),
    [rides]
  );

  return (
    <PageTransition>
      <div className="h-full flex flex-col">
        <div className="px-4 pt-4 pb-2">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">My Rides</h1>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">
            {rides.length} ride{rides.length !== 1 ? 's' : ''} total
          </p>
        </div>

        <Tabs defaultValue="all" className="flex-1 flex flex-col">
          <div className="px-4">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
          </div>

          <ScrollArea className="flex-1 px-4 pb-4">
            <LayoutGroup>
              <TabsContent value="all">
                <RideList rides={rides} emptyMessage="You haven't taken any rides yet. Book your first ride now!" />
              </TabsContent>

              <TabsContent value="completed">
                <RideList rides={completedRides} emptyMessage="No completed rides yet." />
              </TabsContent>

              <TabsContent value="cancelled">
                <RideList rides={cancelledRides} emptyMessage="No cancelled rides. That's great!" />
              </TabsContent>
            </LayoutGroup>
          </ScrollArea>
        </Tabs>
      </div>
    </PageTransition>
  );
}

export default MyRides;
