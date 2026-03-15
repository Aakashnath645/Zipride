import { Bell } from 'lucide-react';
import { LogoFull } from '@/components/icons';
import ThemeToggle from './ThemeToggle';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useUserStore } from '@/stores/userStore';
import { useNotificationStore } from '@/stores/notificationStore';
import { useNavigate } from 'react-router-dom';

export default function TopBar() {
  const { user } = useUserStore();
  const unreadCount = useNotificationStore((s) => s.unreadCount);
  const navigate = useNavigate();
  const initials = user.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const count = unreadCount();

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4">
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/app/home')}>
        <LogoFull size={24} className="h-7 w-auto text-[var(--text-primary)]" />
      </div>

      <div className="flex items-center gap-1">
        <ThemeToggle />
        <button
          className="relative flex h-10 w-10 items-center justify-center rounded-lg hover:bg-[var(--surface-raised)]"
          onClick={() => navigate('/app/notifications')}
        >
          <Bell className="h-5 w-5 text-[var(--text-secondary)]" />
          {count > 0 && (
            <Badge className="absolute -right-0.5 -top-0.5 h-4 w-4 p-0 text-[10px] flex items-center justify-center" variant="destructive">
              {count > 9 ? '9+' : count}
            </Badge>
          )}
        </button>
        <button onClick={() => navigate('/app/profile')} className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-[var(--surface-raised)]">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-[var(--primary)] text-[var(--primary-text)]">
              {initials}
            </AvatarFallback>
          </Avatar>
        </button>
      </div>
    </header>
  );
}
