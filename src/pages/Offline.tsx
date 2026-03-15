import { WifiOff, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LogoIcon } from '@/components/icons';

export default function Offline() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-[var(--background)] p-6 text-center">
      <LogoIcon size={48} className="text-[var(--primary)]" />
      <WifiOff className="h-16 w-16 text-[var(--text-muted)]" />
      <div>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">You're Offline</h1>
        <p className="mt-2 text-sm text-[var(--text-muted)]">
          Check your internet connection and try again.
        </p>
      </div>
      <Button onClick={() => window.location.reload()} className="gap-2">
        <RefreshCw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
