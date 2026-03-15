import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import type { FareBreakdown as FareBreakdownType } from '@/types';

interface FareBreakdownProps {
  fare: FareBreakdownType;
  showDistance?: boolean;
}

export default function FareBreakdown({ fare, showDistance = true }: FareBreakdownProps) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4">
      <h3 className="mb-3 text-sm font-semibold text-[var(--text-primary)]">Fare Breakdown</h3>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--text-secondary)]">Base fare</span>
          <span className="text-[var(--text-primary)]">{formatCurrency(fare.baseFare)}</span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <span className="text-[var(--text-secondary)]">
            Distance charge {showDistance && `(${(fare.distance / 1000).toFixed(1)} km)`}
          </span>
          <span className="text-[var(--text-primary)]">{formatCurrency(fare.distanceCharge)}</span>
        </div>
        {fare.surgeCharge > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--warning)]">Surge ({fare.surgeMultiplier}x)</span>
            <span className="text-[var(--warning)]">+{formatCurrency(fare.surgeCharge)}</span>
          </div>
        )}
        {fare.promoDiscount > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-[var(--success)]">Promo discount</span>
            <span className="text-[var(--success)]">-{formatCurrency(fare.promoDiscount)}</span>
          </div>
        )}
        <Separator className="my-1" />
        <div className="flex items-center justify-between">
          <span className="font-semibold text-[var(--text-primary)]">Total</span>
          <span className="text-lg font-bold text-[var(--text-primary)]">{formatCurrency(fare.total)}</span>
        </div>
      </div>
    </div>
  );
}
