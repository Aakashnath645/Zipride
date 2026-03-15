import { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

interface ETADisplayProps {
  etaSeconds: number;
}

export default function ETADisplay({ etaSeconds }: ETADisplayProps) {
  const [remaining, setRemaining] = useState(etaSeconds);

  useEffect(() => {
    setRemaining(etaSeconds);
  }, [etaSeconds]);

  useEffect(() => {
    if (remaining <= 0) return;
    const interval = setInterval(() => {
      setRemaining((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [remaining]);

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return (
    <div className="flex items-center gap-2 rounded-lg bg-[var(--surface-raised)] px-3 py-2">
      <Clock className="h-4 w-4 text-[var(--accent)]" />
      <div>
        <p className="text-xs text-[var(--text-muted)]">ETA</p>
        <p className="text-lg font-bold text-[var(--text-primary)] tabular-nums">
          {minutes > 0 ? `${minutes}m ` : ''}{seconds.toString().padStart(2, '0')}s
        </p>
      </div>
    </div>
  );
}
