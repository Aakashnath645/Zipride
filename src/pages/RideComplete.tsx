import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Download, ArrowRight, MapPin, Clock, Route, IndianRupee } from 'lucide-react';
import confetti from 'canvas-confetti';
import html2canvas from 'html2canvas';
import PageTransition from '@/components/shared/PageTransition';
import FareBreakdown from '@/components/booking/FareBreakdown';
import RatingStars from '@/components/shared/RatingStars';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useRideStore } from '@/stores/rideStore';
import { useBookingStore } from '@/stores/bookingStore';
import { formatCurrency, metersToKm, secondsToMinutes } from '@/lib/utils';
import type { FareBreakdown as FareBreakdownType } from '@/types';

const TIP_OPTIONS = [10, 20, 50];

function AnimatedCheckmark() {
  return (
    <motion.svg
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      className="mx-auto"
    >
      {/* Outer circle */}
      <motion.circle
        cx={40}
        cy={40}
        r={36}
        stroke="var(--success)"
        strokeWidth={3}
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeInOut' }}
      />
      {/* Inner filled circle background */}
      <motion.circle
        cx={40}
        cy={40}
        r={30}
        fill="var(--success)"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.12 }}
        transition={{ duration: 0.4, delay: 0.4 }}
      />
      {/* Checkmark */}
      <motion.path
        d="M24 42l10 10 22-24"
        stroke="var(--success)"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: 'easeOut' }}
      />
    </motion.svg>
  );
}

function RideComplete() {
  const navigate = useNavigate();
  const currentRide = useRideStore((s) => s.currentRide);
  const updateRide = useRideStore((s) => s.updateRide);
  const setCurrentRide = useRideStore((s) => s.setCurrentRide);
  const bookingFare = useBookingStore((s) => s.fare);
  const resetBooking = useBookingStore((s) => s.resetBooking);

  const fare: FareBreakdownType | null = currentRide?.fare ?? bookingFare;

  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [customTip, setCustomTip] = useState('');
  const [showCustomTip, setShowCustomTip] = useState(false);
  const [rated, setRated] = useState(false);

  const tripCardRef = useRef<HTMLDivElement>(null);

  // Confetti burst on mount
  useEffect(() => {
    const duration = 2000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ['#7C3AED', '#22C55E', '#F59E0B', '#3B82F6'],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ['#7C3AED', '#22C55E', '#F59E0B', '#3B82F6'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    requestAnimationFrame(frame);
  }, []);

  // Redirect if no ride data
  useEffect(() => {
    if (!currentRide && !bookingFare) {
      navigate('/app/home', { replace: true });
    }
  }, [currentRide, bookingFare, navigate]);

  const handleRate = useCallback(
    (rating: number) => {
      setRated(true);
      if (currentRide) {
        updateRide(currentRide.id, { rating });
      }
    },
    [currentRide, updateRide]
  );

  const handleTipSelect = useCallback(
    (amount: number) => {
      setSelectedTip(amount);
      setShowCustomTip(false);
      setCustomTip('');
      if (currentRide) {
        updateRide(currentRide.id, { tip: amount });
      }
    },
    [currentRide, updateRide]
  );

  const handleCustomTipConfirm = useCallback(() => {
    const amount = parseInt(customTip, 10);
    if (amount > 0) {
      setSelectedTip(amount);
      if (currentRide) {
        updateRide(currentRide.id, { tip: amount });
      }
    }
  }, [customTip, currentRide, updateRide]);

  const handleDownloadReceipt = useCallback(async () => {
    if (!tripCardRef.current) return;
    try {
      const canvas = await html2canvas(tripCardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `zipride-receipt-${currentRide?.id ?? 'ride'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      // Silently handle error
    }
  }, [currentRide]);

  const handleBookAgain = useCallback(() => {
    resetBooking();
    setCurrentRide(null);
    navigate('/app/home');
  }, [resetBooking, setCurrentRide, navigate]);

  if (!currentRide && !bookingFare) {
    return null;
  }

  const displayFare = fare ?? {
    baseFare: 0,
    distanceCharge: 0,
    surgeCharge: 0,
    promoDiscount: 0,
    total: 0,
    distance: 0,
    duration: 0,
    surgeMultiplier: 1,
  };

  return (
    <PageTransition>
      <div className="h-full overflow-y-auto">
        <div className="mx-auto max-w-lg px-4 py-6 space-y-6 md:max-w-2xl md:py-10">
          {/* Success header */}
          <motion.div
            className="text-center space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <AnimatedCheckmark />
            <motion.h1
              className="text-2xl font-bold text-[var(--text-primary)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              Ride Completed!
            </motion.h1>
            <motion.p
              className="text-sm text-[var(--text-muted)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
            >
              Thanks for riding with ZipRide
            </motion.p>
          </motion.div>

          {/* Trip summary card */}
          <motion.div
            ref={tripCardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <div className="p-5 space-y-4">
                {/* Pickup and drop */}
                {currentRide && (
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full bg-[var(--success)]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                          Pickup
                        </p>
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {currentRide.pickup.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] truncate">
                          {currentRide.pickup.address}
                        </p>
                      </div>
                    </div>

                    <div className="ml-1 border-l-2 border-dashed border-[var(--border)] h-3" />

                    <div className="flex items-start gap-3">
                      <div className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-sm bg-[var(--error)]" />
                      <div className="flex-1 min-w-0">
                        <p className="text-[10px] font-medium uppercase tracking-wider text-[var(--text-muted)]">
                          Drop-off
                        </p>
                        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                          {currentRide.drop.name}
                        </p>
                        <p className="text-xs text-[var(--text-muted)] truncate">
                          {currentRide.drop.address}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Separator />

                {/* Trip stats */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-[var(--surface-raised)] p-3">
                    <Route className="h-4 w-4 text-[var(--accent)]" />
                    <span className="text-xs text-[var(--text-muted)]">Distance</span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {metersToKm(displayFare.distance)} km
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-[var(--surface-raised)] p-3">
                    <Clock className="h-4 w-4 text-[var(--accent)]" />
                    <span className="text-xs text-[var(--text-muted)]">Duration</span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {secondsToMinutes(displayFare.duration)}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 rounded-lg bg-[var(--surface-raised)] p-3">
                    <IndianRupee className="h-4 w-4 text-[var(--accent)]" />
                    <span className="text-xs text-[var(--text-muted)]">Total</span>
                    <span className="text-sm font-bold text-[var(--text-primary)]">
                      {formatCurrency(displayFare.total)}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Fare breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <FareBreakdown fare={displayFare} />
          </motion.div>

          {/* Rating section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <Card>
              <div className="p-5 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  Rate your ride
                </h3>
                {currentRide && (
                  <p className="text-xs text-[var(--text-muted)]">
                    How was your ride with {currentRide.driver.name}?
                  </p>
                )}
                <div className="flex justify-center py-2">
                  <RatingStars size={36} interactive onRate={handleRate} />
                </div>
                {rated && (
                  <motion.p
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center text-xs text-[var(--success)] font-medium"
                  >
                    Thank you for your feedback!
                  </motion.p>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Tip section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
          >
            <Card>
              <div className="p-5 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                  Add a tip for your driver
                </h3>
                <p className="text-xs text-[var(--text-muted)]">
                  100% of the tip goes to your driver
                </p>
                <div className="grid grid-cols-2 gap-2 sm:flex sm:gap-2">
                  {TIP_OPTIONS.map((amount) => (
                    <motion.button
                      key={amount}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleTipSelect(amount)}
                      className={`flex-1 rounded-lg border-2 px-3 py-2.5 text-center text-sm font-semibold transition-colors ${
                        selectedTip === amount && !showCustomTip
                          ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                          : 'border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)]/50'
                      }`}
                    >
                      {formatCurrency(amount)}
                    </motion.button>
                  ))}
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowCustomTip(true);
                      setSelectedTip(null);
                    }}
                    className={`flex-1 rounded-lg border-2 px-3 py-2.5 text-center text-sm font-semibold transition-colors ${
                      showCustomTip
                        ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                        : 'border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)]/50'
                    }`}
                  >
                    Custom
                  </motion.button>
                </div>

                {showCustomTip && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="flex gap-2"
                  >
                    <div className="relative flex-1">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)]">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="1"
                        value={customTip}
                        onChange={(e) => setCustomTip(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] py-2.5 pl-7 pr-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:border-[var(--primary)] focus:outline-none focus:ring-1 focus:ring-[var(--primary)]"
                      />
                    </div>
                    <Button
                      onClick={handleCustomTipConfirm}
                      disabled={!customTip || parseInt(customTip, 10) <= 0}
                      size="default"
                    >
                      Add
                    </Button>
                  </motion.div>
                )}

                {selectedTip !== null && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center text-xs text-[var(--success)] font-medium"
                  >
                    {formatCurrency(selectedTip)} tip added!
                  </motion.p>
                )}
              </div>
            </Card>
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col gap-3 pb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
          >
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleDownloadReceipt}
            >
              <Download className="h-4 w-4" />
              Download Receipt
            </Button>

            <Button className="w-full gap-2" onClick={handleBookAgain}>
              <MapPin className="h-4 w-4" />
              Book Again
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

export default RideComplete;
