export interface LatLng {
  lat: number;
  lng: number;
}

export interface Location {
  position: LatLng;
  address: string;
  name: string;
}

export type RideType = 'mini' | 'go' | 'prime';

export interface RideOption {
  type: RideType;
  name: string;
  description: string;
  capacity: number;
  baseFare: number;
  perKmRate: number;
  eta: number;
  icon: string;
}

export interface FareBreakdown {
  baseFare: number;
  distanceCharge: number;
  surgeCharge: number;
  promoDiscount: number;
  total: number;
  distance: number;
  duration: number;
  surgeMultiplier: number;
}

export type PaymentMethod = 'upi' | 'card' | 'wallet' | 'cash';

export type RideStatus = 'idle' | 'searching' | 'assigned' | 'approaching' | 'arrived' | 'in_ride' | 'completed' | 'cancelled';

export interface Driver {
  id: string;
  name: string;
  phone: string;
  rating: number;
  vehicleNumber: string;
  vehicleModel: string;
  vehicleColor: string;
  avatar: string;
  position: LatLng;
}

export interface Ride {
  id: string;
  pickup: Location;
  drop: Location;
  rideType: RideType;
  fare: FareBreakdown;
  status: RideStatus;
  driver: Driver;
  paymentMethod: PaymentMethod;
  createdAt: string;
  completedAt?: string;
  rating?: number;
  tip?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isAuthenticated: boolean;
  memberSince: string;
}

export interface WalletTransaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
  category: 'ride' | 'topup' | 'refund' | 'promo';
}

export interface PromoCode {
  code: string;
  type: 'percentage' | 'flat';
  value: number;
  maxDiscount?: number;
  description: string;
}

export interface QuickDestination {
  id: string;
  name: string;
  emoji: string;
  location: Location;
}

export interface NominatimResult {
  place_id: number;
  display_name: string;
  lat: string;
  lon: string;
  type: string;
  address: Record<string, string>;
}

export interface OSRMRoute {
  distance: number;
  duration: number;
  geometry: {
    type: string;
    coordinates: [number, number][];
  };
}
