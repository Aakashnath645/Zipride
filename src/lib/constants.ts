import type { RideOption, Driver, QuickDestination, PromoCode, WalletTransaction, Ride } from '@/types';

export const KOLKATA_CENTER = { lat: 22.5726, lng: 88.3639 };

export const DRIVER_START = { lat: 22.5816, lng: 88.3639 };

export const RIDE_OPTIONS: RideOption[] = [
  {
    type: 'mini',
    name: 'ZipMini',
    description: 'Affordable compact rides',
    capacity: 3,
    baseFare: 40,
    perKmRate: 10,
    eta: 4,
    icon: 'mini',
  },
  {
    type: 'go',
    name: 'ZipGo',
    description: 'Comfortable sedans',
    capacity: 4,
    baseFare: 55,
    perKmRate: 14,
    eta: 6,
    icon: 'go',
  },
  {
    type: 'prime',
    name: 'ZipPrime',
    description: 'Premium SUV experience',
    capacity: 6,
    baseFare: 80,
    perKmRate: 18,
    eta: 8,
    icon: 'prime',
  },
];

export const DEFAULT_DRIVER: Driver = {
  id: 'drv-001',
  name: 'Rajan Kumar',
  phone: '+919876543211',
  rating: 4.8,
  vehicleNumber: 'WB-02-AB-1234',
  vehicleModel: 'Maruti Swift',
  vehicleColor: 'White',
  avatar: '',
  position: DRIVER_START,
};

export const QUICK_DESTINATIONS: QuickDestination[] = [
  { id: 'home', name: 'Home', emoji: '🏠', location: { position: { lat: 22.5180, lng: 88.3832 }, address: 'Ballygunge, Kolkata', name: 'Home' } },
  { id: 'work', name: 'Work', emoji: '💼', location: { position: { lat: 22.5726, lng: 88.4340 }, address: 'Salt Lake Sector V, Kolkata', name: 'Work' } },
  { id: 'airport', name: 'Airport', emoji: '✈️', location: { position: { lat: 22.6520, lng: 88.4463 }, address: 'Netaji Subhas Chandra Bose Intl Airport', name: 'Airport' } },
  { id: 'mall', name: 'Mall', emoji: '🛍️', location: { position: { lat: 22.5108, lng: 88.3625 }, address: 'South City Mall, Kolkata', name: 'Mall' } },
];

export const KOLKATA_SUGGESTIONS = [
  { name: 'Park Street', address: 'Park Street Area, Kolkata', lat: 22.5513, lng: 88.3527 },
  { name: 'Salt Lake Sector V', address: 'IT Hub, Bidhannagar, Kolkata', lat: 22.5726, lng: 88.4340 },
  { name: 'Howrah Station', address: 'Howrah Railway Station, Howrah', lat: 22.5839, lng: 88.3422 },
  { name: 'Netaji Subhas Airport', address: 'Dum Dum, Kolkata', lat: 22.6520, lng: 88.4463 },
  { name: 'New Town AA-I', address: 'New Town, Kolkata', lat: 22.5958, lng: 88.4750 },
  { name: 'Ballygunge Phari', address: 'Ballygunge, Kolkata', lat: 22.5258, lng: 88.3634 },
  { name: 'Esplanade', address: 'Esplanade, Kolkata', lat: 22.5630, lng: 88.3527 },
  { name: 'Victoria Memorial', address: 'Queen\'s Way, Kolkata', lat: 22.5448, lng: 88.3426 },
  { name: 'Dakshineswar', address: 'Dakshineswar, Kolkata', lat: 22.6551, lng: 88.3576 },
  { name: 'Science City', address: 'EM Bypass, Kolkata', lat: 22.5398, lng: 88.3964 },
];

export const PROMO_CODES: PromoCode[] = [
  { code: 'FIRST50', type: 'percentage', value: 50, maxDiscount: 75, description: '50% off (max ₹75)' },
  { code: 'ZIPNEW', type: 'flat', value: 30, description: '₹30 off your ride' },
];

export const MOCK_WALLET_TRANSACTIONS: WalletTransaction[] = [];

export const MOCK_RIDES: Ride[] = [];

export const STRIPE_TEST_KEY = 'pk_test_51OxDummyKeyForDevelopment000000000000000000';
