import { useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useWalletStore } from '@/stores/walletStore';
import { formatCurrency } from '@/lib/utils';
import AnimatedNumber from '@/components/shared/AnimatedNumber';
import toast from 'react-hot-toast';
import confetti from 'canvas-confetti';

interface WalletPayProps {
  amount: number;
  onSuccess: () => void;
  onInsufficientBalance: () => void;
}

export default function WalletPay({ amount, onSuccess, onInsufficientBalance }: WalletPayProps) {
  const { balance, deductMoney } = useWalletStore();
  const [isPaying, setIsPaying] = useState(false);
  const hasEnough = balance >= amount;

  const handlePay = async () => {
    if (!hasEnough) {
      onInsufficientBalance();
      return;
    }
    setIsPaying(true);
    await new Promise((r) => setTimeout(r, 1000));
    deductMoney(amount, 'ZipRide ride payment');
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#FFD700', '#FFC200', '#FFFFFF', '#6C63FF'],
    });
    toast.success('Wallet payment successful!');
    onSuccess();
    setIsPaying(false);
  };

  return (
    <div className="flex flex-col items-center gap-4 py-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="flex flex-col items-center gap-2"
      >
        <Wallet className="h-12 w-12 text-[var(--accent)]" />
        <p className="text-sm text-[var(--text-muted)]">Wallet Balance</p>
        <p className="text-3xl font-bold text-[var(--text-primary)]">
          ₹<AnimatedNumber value={balance} />
        </p>
      </motion.div>
      <div className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-raised)] p-3 text-center">
        <p className="text-sm text-[var(--text-secondary)]">
          Amount to pay: <span className="font-semibold text-[var(--text-primary)]">{formatCurrency(amount)}</span>
        </p>
        {!hasEnough && (
          <p className="mt-1 text-xs text-[var(--error)]">
            Insufficient balance. Please add ₹{amount - balance} more.
          </p>
        )}
      </div>
      <Button onClick={handlePay} disabled={isPaying} className="w-full" variant={hasEnough ? 'default' : 'outline'}>
        {isPaying ? (
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--primary-text)] border-t-transparent" />
            Processing...
          </div>
        ) : hasEnough ? (
          `Pay ${formatCurrency(amount)} from Wallet`
        ) : (
          'Add Money & Pay'
        )}
      </Button>
    </div>
  );
}
