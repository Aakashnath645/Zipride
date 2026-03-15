import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBookingStore } from '@/stores/bookingStore';
import { useRideStore } from '@/stores/rideStore';
import type { Location, RideType, FareBreakdown, PaymentMethod, Ride } from '@/types';
import { DEFAULT_DRIVER } from '@/lib/constants';
import { generateId } from '@/lib/utils';

export function useBookingFlow() {
  const navigate = useNavigate();
  const store = useBookingStore();
  const { addRide, setCurrentRide } = useRideStore();

  const selectPickup = useCallback(
    (location: Location) => {
      store.setPickup(location);
    },
    [store]
  );

  const selectDrop = useCallback(
    (location: Location) => {
      store.setDrop(location);
      navigate('/app/ride-select');
    },
    [store, navigate]
  );

  const selectRide = useCallback(
    (type: RideType, fare: FareBreakdown) => {
      store.setSelectedRide(type);
      store.setFare(fare);
    },
    [store]
  );

  const proceedToPayment = useCallback(() => {
    navigate('/app/payment');
  }, [navigate]);

  const confirmPayment = useCallback(
    (method: PaymentMethod) => {
      store.setPaymentMethod(method);
      store.setRideStatus('searching');

      const ride: Ride = {
        id: generateId(),
        pickup: store.pickup!,
        drop: store.drop!,
        rideType: store.selectedRide!,
        fare: store.fare!,
        status: 'assigned',
        driver: DEFAULT_DRIVER,
        paymentMethod: method,
        createdAt: new Date().toISOString(),
      };

      addRide(ride);
      setCurrentRide(ride);
      store.setRideStatus('assigned');
      navigate('/app/tracking');
    },
    [store, addRide, setCurrentRide, navigate]
  );

  const completeRide = useCallback(() => {
    store.setRideStatus('completed');
    navigate('/app/complete');
  }, [store, navigate]);

  const cancelRide = useCallback(() => {
    store.resetBooking();
    navigate('/app/home');
  }, [store, navigate]);

  return {
    selectPickup,
    selectDrop,
    selectRide,
    proceedToPayment,
    confirmPayment,
    completeRide,
    cancelRide,
  };
}
