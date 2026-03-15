import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Bell, CheckCheck, Trash2, Tag, Car, CreditCard, Settings } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotificationStore, type Notification } from '@/stores/notificationStore';

const typeConfig: Record<Notification['type'], { icon: typeof Bell; color: string; bg: string }> = {
  ride: { icon: Car, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  promo: { icon: Tag, color: 'text-green-500', bg: 'bg-green-500/10' },
  system: { icon: Settings, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  payment: { icon: CreditCard, color: 'text-purple-500', bg: 'bg-purple-500/10' },
};

function NotificationItem({ notification }: { notification: Notification }) {
  const markAsRead = useNotificationStore((s) => s.markAsRead);
  const config = typeConfig[notification.type];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.2 }}
    >
      <button
        type="button"
        className={`w-full text-left p-4 rounded-xl border transition-colors ${
          notification.read
            ? 'border-[var(--border)] bg-[var(--surface)]'
            : 'border-[var(--accent)]/20 bg-[var(--accent)]/5'
        } hover:bg-[var(--surface-raised)]`}
        onClick={() => markAsRead(notification.id)}
      >
        <div className="flex gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${config.bg}`}>
            <Icon className={`h-5 w-5 ${config.color}`} />
          </div>
          <div className="flex-1 min-w-0 space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className={`text-sm font-medium ${notification.read ? 'text-[var(--text-secondary)]' : 'text-[var(--text-primary)]'}`}>
                {notification.title}
              </h3>
              {!notification.read && (
                <div className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--accent)]" />
              )}
            </div>
            <p className="text-xs leading-relaxed text-[var(--text-muted)]">{notification.message}</p>
            <p className="text-[10px] text-[var(--text-muted)]">
              {formatDistanceToNow(new Date(notification.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function Notifications() {
  const navigate = useNavigate();
  const notifications = useNotificationStore((s) => s.notifications);
  const markAllAsRead = useNotificationStore((s) => s.markAllAsRead);
  const clearAll = useNotificationStore((s) => s.clearAll);
  const unreadCount = useNotificationStore((s) => s.unreadCount);

  return (
    <div className="h-full flex flex-col bg-[var(--background)]">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface)] px-4 py-3">
        <div className="flex items-center gap-3 min-w-0">
          <Button variant="ghost" size="sm" onClick={() => navigate(-1)} className="h-10 w-10 shrink-0 p-0">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg font-semibold text-[var(--text-primary)]">Notifications</h1>
            {unreadCount() > 0 && (
              <p className="text-xs text-[var(--text-muted)]">{unreadCount()} unread</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 shrink-0">
          {unreadCount() > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-10 gap-1.5 text-xs px-2 sm:px-3">
              <CheckCheck className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Read all</span>
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll} className="h-10 gap-1.5 text-xs text-[var(--error)] px-2 sm:px-3">
              <Trash2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Clear</span>
            </Button>
          )}
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="mx-auto max-w-lg px-4 py-4 space-y-3">
          <AnimatePresence mode="popLayout">
            {notifications.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-raised)] mb-4">
                  <Bell className="h-7 w-7 text-[var(--text-muted)]" />
                </div>
                <h2 className="text-base font-medium text-[var(--text-primary)]">No notifications</h2>
                <p className="text-sm text-[var(--text-muted)] mt-1">You're all caught up!</p>
              </motion.div>
            ) : (
              notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))
            )}
          </AnimatePresence>
        </div>
      </ScrollArea>
    </div>
  );
}

export default Notifications;
