import { motion } from 'framer-motion';
import type { RideStatus } from '@/types';

interface RideStatusBarProps {
  status: RideStatus;
}

const steps: { key: RideStatus; label: string }[] = [
  { key: 'assigned', label: 'Assigned' },
  { key: 'approaching', label: 'Approaching' },
  { key: 'arrived', label: 'Arrived' },
  { key: 'in_ride', label: 'In Ride' },
  { key: 'completed', label: 'Completing' },
];

export default function RideStatusBar({ status }: RideStatusBarProps) {
  const currentIndex = steps.findIndex((s) => s.key === status);

  return (
    <div className="flex items-center gap-1">
      {steps.map((step, index) => {
        const isActive = index <= currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <div key={step.key} className="flex flex-1 flex-col items-center gap-1">
            <div className="relative flex w-full items-center">
              <div className={`h-1 flex-1 rounded-full ${index === 0 ? 'bg-transparent' : isActive ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'}`} />
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.2 : 1,
                  backgroundColor: isActive ? 'var(--primary)' : 'var(--border)',
                }}
                className="relative z-10 flex h-3 w-3 items-center justify-center rounded-full"
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {isCurrent && (
                  <motion.div
                    className="absolute h-3 w-3 rounded-full bg-[var(--primary)]"
                    animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
              <div className={`h-1 flex-1 rounded-full ${index === steps.length - 1 ? 'bg-transparent' : index < currentIndex ? 'bg-[var(--primary)]' : 'bg-[var(--border)]'}`} />
            </div>
            <span className={`text-[10px] truncate max-w-full ${isActive ? 'font-semibold text-[var(--primary)]' : 'text-[var(--text-muted)]'} hidden sm:block`}>
              {step.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
