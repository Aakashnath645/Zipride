import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { IconHome, IconMyRides, IconWallet, IconProfile } from '@/components/icons';

const navItems = [
  { path: '/app/home', label: 'Home', Icon: IconHome },
  { path: '/app/rides', label: 'My Rides', Icon: IconMyRides },
  { path: '/app/wallet', label: 'Wallet', Icon: IconWallet },
  { path: '/app/profile', label: 'Profile', Icon: IconProfile },
];

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 items-center justify-around border-t border-[var(--border)] bg-[var(--surface)] pb-[env(safe-area-inset-bottom)] lg:hidden">
      {navItems.map(({ path, label, Icon }) => {
        const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className="relative flex min-w-[64px] flex-col items-center justify-center gap-0.5 py-1"
          >
            {isActive && (
              <motion.div
                layoutId="bottomnav-indicator"
                className="absolute -top-px left-2 right-2 h-0.5 rounded-full bg-[var(--primary)]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <Icon
              size={22}
              className={isActive ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'}
            />
            <span
              className={`text-[10px] font-medium ${
                isActive ? 'text-[var(--primary)]' : 'text-[var(--text-muted)]'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
