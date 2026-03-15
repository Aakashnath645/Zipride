import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Progress } from '@/components/ui/progress';
import { formatCurrency } from '@/lib/utils';
import confetti from 'canvas-confetti';

interface PaymentSuccessProps {
  amount: number;
  redirectTo?: string;
  redirectDelay?: number;
}

export default function PaymentSuccess({ amount, redirectTo = '/app/tracking', redirectDelay = 2500 }: PaymentSuccessProps) {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#FFD700', '#FFC200', '#FFFFFF', '#6C63FF'] });
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 100 / (redirectDelay / 50);
      });
    }, 50);
    const timer = setTimeout(() => navigate(redirectTo), redirectDelay);
    return () => { clearTimeout(timer); clearInterval(interval); };
  }, [navigate, redirectTo, redirectDelay]);

  return (
    <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 25 }} className="flex min-h-[400px] flex-col items-center justify-center gap-6 p-6">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 15 }}>
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="38" stroke="var(--success)" strokeWidth="3" fill="none" />
          <motion.path d="M22 40 L34 52 L58 28" stroke="var(--success)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }} />
        </svg>
      </motion.div>
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-xl font-bold text-[var(--text-primary)]">Payment Successful!</h2>
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-2xl font-bold text-[var(--success)]">{formatCurrency(amount)}</motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }} className="text-sm text-[var(--text-muted)]">Ride Confirmed</motion.p>
      </div>
      <div className="w-full max-w-xs">
        <Progress value={progress} className="h-1" />
        <p className="mt-2 text-center text-xs text-[var(--text-muted)]">Redirecting to tracking...</p>
      </div>
    </motion.div>
  );
}
