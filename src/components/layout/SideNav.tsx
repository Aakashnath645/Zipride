import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LogoFull, IconHome, IconMyRides, IconWallet, IconProfile, IconMap, IconShield } from '@/components/icons';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { path: '/app/home', label: 'Home', Icon: IconHome },
  { path: '/app/rides', label: 'My Rides', Icon: IconMyRides },
  { path: '/app/wallet', label: 'Wallet', Icon: IconWallet },
  { path: '/app/profile', label: 'Profile', Icon: IconProfile },
];

export default function SideNav() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-[240px] border-r border-[var(--border)] bg-[var(--surface)] h-full">
      <div className="flex items-center gap-2 px-4 py-5 border-b border-[var(--border)]">
        <LogoFull size={24} className="h-7 w-auto text-[var(--text-primary)]" />
      </div>

      <nav className="flex-1 flex flex-col gap-1 p-3">
        {navItems.map(({ path, label, Icon }) => {
          const isActive = location.pathname === path || location.pathname.startsWith(path + '/');
          return (
            <button
              key={path}
              onClick={() => navigate(path)}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-[var(--primary)]/10 text-[var(--primary)]'
                  : 'text-[var(--text-secondary)] hover:bg-[var(--surface-raised)] hover:text-[var(--text-primary)]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="sidenav-indicator"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full bg-[var(--primary)]"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
              <Icon size={20} />
              {label}
            </button>
          );
        })}
      </nav>

      <div className="border-t border-[var(--border)] p-3">
        <div className="flex items-center justify-between px-3 py-2">
          <span className="text-xs text-[var(--text-muted)]">Theme</span>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
