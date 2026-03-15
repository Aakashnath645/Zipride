import { motion } from 'framer-motion';
import { Users, Zap } from 'lucide-react';
import { IconZipMini, IconZipGo, IconZipPrime } from '@/components/icons';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';
import type { RideType, FareBreakdown } from '@/types';
import { RIDE_OPTIONS } from '@/lib/constants';

interface RideOptionsProps {
  selectedRide: RideType | null;
  fares: Record<RideType, FareBreakdown>;
  onSelect: (type: RideType) => void;
}

const iconMap = {
  mini: IconZipMini,
  go: IconZipGo,
  prime: IconZipPrime,
};

export default function RideOptions({ selectedRide, fares, onSelect }: RideOptionsProps) {
  return (
    <div className="flex flex-col gap-3">
      {RIDE_OPTIONS.map((option) => {
        const isSelected = selectedRide === option.type;
        const fare = fares[option.type];
        const Icon = iconMap[option.type];

        return (
          <motion.button
            key={option.type}
            layoutId={`ride-card-${option.type}`}
            onClick={() => onSelect(option.type)}
            className={`relative flex items-center gap-4 rounded-xl border-2 p-4 transition-all ${
              isSelected
                ? 'border-[var(--primary)] bg-[var(--surface)] shadow-lg scale-[1.02]'
                : 'border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-strong)]'
            }`}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--surface-raised)]">
              <Icon size={32} className="text-[var(--text-primary)]" />
            </div>

            <div className="flex-1 text-left">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[var(--text-primary)]">{option.name}</span>
                {fare && fare.surgeMultiplier > 1 && (
                  <Badge variant="warning" className="text-[10px] px-1.5 py-0">
                    <Zap className="mr-0.5 h-3 w-3" />
                    {fare.surgeMultiplier}x
                  </Badge>
                )}
              </div>
              <p className="text-xs text-[var(--text-muted)]">{option.description}</p>
              <div className="mt-1 flex items-center gap-2 text-xs text-[var(--text-secondary)]">
                <Users className="h-3 w-3" />
                <span>{option.capacity} seats</span>
                <span>·</span>
                <span>{option.eta} min away</span>
              </div>
            </div>

            <div className="text-right">
              <p className="text-lg font-bold text-[var(--text-primary)]">
                {fare ? formatCurrency(fare.total) : '...'}
              </p>
            </div>

            {isSelected && (
              <motion.div
                layoutId="ride-selection-ring"
                className="absolute -inset-px rounded-xl border-2 border-[var(--primary)]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
}
