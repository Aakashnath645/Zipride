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

export const MOCK_WALLET_TRANSACTIONS: WalletTransaction[] = [
  { id: 'tx-1', type: 'credit', amount: 500, description: 'Added via UPI', date: '2026-03-14T10:30:00Z', category: 'topup' },
  { id: 'tx-2', type: 'debit', amount: 125, description: 'ZipGo to Park Street', date: '2026-03-13T18:45:00Z', category: 'ride' },
  { id: 'tx-3', type: 'credit', amount: 75, description: 'Referral bonus', date: '2026-03-12T09:00:00Z', category: 'promo' },
  { id: 'tx-4', type: 'debit', amount: 85, description: 'ZipMini to Howrah', date: '2026-03-11T14:20:00Z', category: 'ride' },
  { id: 'tx-5', type: 'credit', amount: 30, description: 'Promo ZIPNEW applied', date: '2026-03-10T11:15:00Z', category: 'promo' },
  { id: 'tx-6', type: 'debit', amount: 145, description: 'ZipPrime to Airport', date: '2026-03-09T06:30:00Z', category: 'ride' },
];

export const MOCK_RIDES: Ride[] = [
  {
    id: 'ride-1',
    pickup: { position: { lat: 22.5726, lng: 88.3639 }, address: 'Esplanade, Kolkata', name: 'Esplanade' },
    drop: { position: { lat: 22.5513, lng: 88.3527 }, address: 'Park Street, Kolkata', name: 'Park Street' },
    rideType: 'go',
    fare: { baseFare: 55, distanceCharge: 42, surgeCharge: 0, promoDiscount: 0, total: 97, distance: 3000, duration: 600, surgeMultiplier: 1.0 },
    status: 'completed',
    driver: { id: 'drv-001', name: 'Rajan Kumar', phone: '+919876543211', rating: 4.8, vehicleNumber: 'WB-02-AB-1234', vehicleModel: 'Maruti Swift', vehicleColor: 'White', avatar: '', position: { lat: 22.5513, lng: 88.3527 } },
    paymentMethod: 'upi',
    createdAt: '2026-03-14T09:30:00Z',
    completedAt: '2026-03-14T09:50:00Z',
    rating: 5,
  },
  {
    id: 'ride-2',
    pickup: { position: { lat: 22.5258, lng: 88.3634 }, address: 'Ballygunge, Kolkata', name: 'Ballygunge Phari' },
    drop: { position: { lat: 22.6520, lng: 88.4463 }, address: 'Airport, Kolkata', name: 'Airport' },
    rideType: 'prime',
    fare: { baseFare: 80, distanceCharge: 252, surgeCharge: 33, promoDiscount: 30, total: 335, distance: 14000, duration: 2400, surgeMultiplier: 1.1 },
    status: 'completed',
    driver: { id: 'drv-002', name: 'Amit Das', phone: '+919876543212', rating: 4.6, vehicleNumber: 'WB-04-CD-5678', vehicleModel: 'Toyota Innova', vehicleColor: 'Silver', avatar: '', position: { lat: 22.6520, lng: 88.4463 } },
    paymentMethod: 'card',
    createdAt: '2026-03-13T06:00:00Z',
    completedAt: '2026-03-13T06:40:00Z',
    rating: 4,
  },
  {
    id: 'ride-3',
    pickup: { position: { lat: 22.5726, lng: 88.4340 }, address: 'Salt Lake Sector V', name: 'Sector V' },
    drop: { position: { lat: 22.5839, lng: 88.3422 }, address: 'Howrah Station', name: 'Howrah Station' },
    rideType: 'mini',
    fare: { baseFare: 40, distanceCharge: 100, surgeCharge: 0, promoDiscount: 0, total: 140, distance: 10000, duration: 1800, surgeMultiplier: 1.0 },
    status: 'completed',
    driver: { id: 'drv-003', name: 'Sunil Roy', phone: '+919876543213', rating: 4.5, vehicleNumber: 'WB-06-EF-9012', vehicleModel: 'Maruti Alto', vehicleColor: 'Red', avatar: '', position: { lat: 22.5839, lng: 88.3422 } },
    paymentMethod: 'wallet',
    createdAt: '2026-03-12T17:30:00Z',
    completedAt: '2026-03-12T18:00:00Z',
    rating: 4,
  },
  {
    id: 'ride-4',
    pickup: { position: { lat: 22.5448, lng: 88.3426 }, address: 'Victoria Memorial', name: 'Victoria Memorial' },
    drop: { position: { lat: 22.6551, lng: 88.3576 }, address: 'Dakshineswar', name: 'Dakshineswar' },
    rideType: 'go',
    fare: { baseFare: 55, distanceCharge: 168, surgeCharge: 28, promoDiscount: 75, total: 176, distance: 12000, duration: 2100, surgeMultiplier: 1.2 },
    status: 'cancelled',
    driver: { id: 'drv-004', name: 'Biswajit Pal', phone: '+919876543214', rating: 4.3, vehicleNumber: 'WB-08-GH-3456', vehicleModel: 'Hyundai i20', vehicleColor: 'Blue', avatar: '', position: { lat: 22.5448, lng: 88.3426 } },
    paymentMethod: 'upi',
    createdAt: '2026-03-11T12:00:00Z',
  },
  {
    id: 'ride-5',
    pickup: { position: { lat: 22.5630, lng: 88.3527 }, address: 'Esplanade, Kolkata', name: 'Esplanade' },
    drop: { position: { lat: 22.5398, lng: 88.3964 }, address: 'Science City, Kolkata', name: 'Science City' },
    rideType: 'mini',
    fare: { baseFare: 40, distanceCharge: 60, surgeCharge: 10, promoDiscount: 0, total: 110, distance: 6000, duration: 1200, surgeMultiplier: 1.1 },
    status: 'completed',
    driver: { id: 'drv-001', name: 'Rajan Kumar', phone: '+919876543211', rating: 4.8, vehicleNumber: 'WB-02-AB-1234', vehicleModel: 'Maruti Swift', vehicleColor: 'White', avatar: '', position: { lat: 22.5398, lng: 88.3964 } },
    paymentMethod: 'cash',
    createdAt: '2026-03-10T15:30:00Z',
    completedAt: '2026-03-10T15:50:00Z',
    rating: 5,
    tip: 20,
  },
];

export const STRIPE_TEST_KEY = 'pk_test_51OxDummyKeyForDevelopment000000000000000000';
