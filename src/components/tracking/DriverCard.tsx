import { Phone, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { IconStar } from '@/components/icons';
import type { Driver } from '@/types';

interface DriverCardProps {
  driver: Driver;
}

export default function DriverCard({ driver }: DriverCardProps) {
  const initials = driver.name.split(' ').map((n) => n[0]).join('').toUpperCase();

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarFallback className="bg-[var(--accent)] text-white font-semibold">{initials}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h3 className="font-semibold text-[var(--text-primary)]">{driver.name}</h3>
          <div className="flex items-center gap-1">
            <IconStar size={14} className="text-[var(--primary)]" />
            <span className="text-sm text-[var(--text-secondary)]">{driver.rating}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full" asChild>
            <a href={`tel:${driver.phone}`}>
              <Phone className="h-4 w-4" />
            </a>
          </Button>
          <Button variant="outline" size="icon" className="h-10 w-10 rounded-full">
            <MessageCircle className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-[var(--text-muted)]">
        <span>{driver.vehicleModel} · {driver.vehicleColor}</span>
        <span className="font-mono font-semibold text-[var(--text-primary)]">{driver.vehicleNumber}</span>
      </div>
    </div>
  );
}
