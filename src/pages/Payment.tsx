import { useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/shared/PageTransition';
import PaymentModal from '@/components/payment/PaymentModal';
import { Button } from '@/components/ui/button';
import { useBookingStore } from '@/stores/bookingStore';
import { useBookingFlow } from '@/hooks/useBookingFlow';
import { calculateFare } from '@/services/fareEngine';
import type { PaymentMethod } from '@/types';

function Payment() {
  const navigate = useNavigate();
  const fare = useBookingStore((s) => s.fare);
  const promoCode = useBookingStore((s) => s.promoCode);
  const selectedRide = useBookingStore((s) => s.selectedRide);
  const setFare = useBookingStore((s) => s.setFare);
  const setPromoCode = useBookingStore((s) => s.setPromoCode);
  const { confirmPayment } = useBookingFlow();

  const handleComplete = useCallback(
    (method: PaymentMethod) => {
      confirmPayment(method);
    },
    [confirmPayment]
  );

  const handlePromoApply = useCallback(
    (code: string) => {
      setPromoCode(code);
      if (fare && selectedRide) {
        const updatedFare = calculateFare(
          selectedRide,
          fare.distance,
          fare.duration,
          code
        );
        setFare(updatedFare);
      }
    },
    [fare, selectedRide, setPromoCode, setFare]
  );

  const handlePromoRemove = useCallback(() => {
    setPromoCode(null);
    if (fare && selectedRide) {
      const updatedFare = calculateFare(
        selectedRide,
        fare.distance,
        fare.duration,
        null
      );
      setFare(updatedFare);
    }
  }, [fare, selectedRide, setPromoCode, setFare]);

  const handleBack = () => {
    navigate(-1);
  };

  if (!fare) {
    return <Navigate to="/app/home" replace />;
  }

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
            Payment
          </h1>
        </div>

        {/* Scrollable payment content */}
        <div className="flex-1 overflow-y-auto">
          <PaymentModal
            fare={fare}
            promoCode={promoCode}
            onPromoApply={handlePromoApply}
            onPromoRemove={handlePromoRemove}
            onComplete={handleComplete}
          />
        </div>
      </div>
    </PageTransition>
  );
}

export default Payment;
