import { createBrowserRouter, Navigate } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import AppShell from '@/components/layout/AppShell';

const Splash = lazy(() => import('@/pages/Splash'));
const Onboarding = lazy(() => import('@/pages/Onboarding'));
const Login = lazy(() => import('@/pages/Login'));
const Home = lazy(() => import('@/pages/Home'));
const Search = lazy(() => import('@/pages/Search'));
const RideSelect = lazy(() => import('@/pages/RideSelect'));
const Payment = lazy(() => import('@/pages/Payment'));
const Tracking = lazy(() => import('@/pages/Tracking'));
const RideComplete = lazy(() => import('@/pages/RideComplete'));
const MyRides = lazy(() => import('@/pages/MyRides'));
const Wallet = lazy(() => import('@/pages/Wallet'));
const Profile = lazy(() => import('@/pages/Profile'));
const TermsOfService = lazy(() => import('@/pages/TermsOfService'));
const PrivacyPolicy = lazy(() => import('@/pages/PrivacyPolicy'));
const Notifications = lazy(() => import('@/pages/Notifications'));
const Offline = lazy(() => import('@/pages/Offline'));

function SuspenseWrapper({ children }: { children: React.ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex h-full w-full items-center justify-center" style={{ backgroundColor: 'var(--background)' }}>
          <div className="flex flex-col items-center gap-3">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--border)] border-t-[var(--primary)]" />
            <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Loading...</p>
          </div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <SuspenseWrapper><Splash /></SuspenseWrapper>,
  },
  {
    path: '/onboarding',
    element: <SuspenseWrapper><Onboarding /></SuspenseWrapper>,
  },
  {
    path: '/login',
    element: <SuspenseWrapper><Login /></SuspenseWrapper>,
  },
  {
    path: '/offline',
    element: <SuspenseWrapper><Offline /></SuspenseWrapper>,
  },
  {
    path: '/app',
    element: <SuspenseWrapper><AppShell /></SuspenseWrapper>,
    children: [
      { index: true, element: <Navigate to="/app/home" replace /> },
      { path: 'home', element: <SuspenseWrapper><Home /></SuspenseWrapper> },
      { path: 'search', element: <SuspenseWrapper><Search /></SuspenseWrapper> },
      { path: 'ride-select', element: <SuspenseWrapper><RideSelect /></SuspenseWrapper> },
      { path: 'payment', element: <SuspenseWrapper><Payment /></SuspenseWrapper> },
      { path: 'tracking', element: <SuspenseWrapper><Tracking /></SuspenseWrapper> },
      { path: 'complete', element: <SuspenseWrapper><RideComplete /></SuspenseWrapper> },
      { path: 'rides', element: <SuspenseWrapper><MyRides /></SuspenseWrapper> },
      { path: 'wallet', element: <SuspenseWrapper><Wallet /></SuspenseWrapper> },
      { path: 'profile', element: <SuspenseWrapper><Profile /></SuspenseWrapper> },
      { path: 'notifications', element: <SuspenseWrapper><Notifications /></SuspenseWrapper> },
      { path: 'terms', element: <SuspenseWrapper><TermsOfService /></SuspenseWrapper> },
      { path: 'privacy', element: <SuspenseWrapper><PrivacyPolicy /></SuspenseWrapper> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
]);
