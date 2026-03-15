import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  Plus,
  ArrowDownLeft,
  ArrowUpRight,
  Wallet as WalletIcon,
  Gift,
  RefreshCw,
  Car,
  Copy,
  Check,
} from 'lucide-react';
import PageTransition from '@/components/shared/PageTransition';
import AnimatedNumber from '@/components/shared/AnimatedNumber';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { toast } from '@/components/ui/toast';
import { useWalletStore } from '@/stores/walletStore';
import { formatCurrency } from '@/lib/utils';
import type { WalletTransaction } from '@/types';

const QUICK_AMOUNTS = [100, 200, 500, 1000];

const OFFERS = [
  {
    code: 'FIRST50',
    label: 'FIRST50 - 50% off max ₹75',
    description: 'Get 50% off on your first ride, up to ₹75 discount.',
    color: 'var(--primary)',
  },
  {
    code: 'ZIPNEW',
    label: 'ZIPNEW - Flat ₹30 off',
    description: 'Flat ₹30 off on any ride. No minimum fare required.',
    color: 'var(--success)',
  },
];

function getCategoryIcon(category: WalletTransaction['category']) {
  switch (category) {
    case 'topup':
      return <WalletIcon className="h-4 w-4" />;
    case 'ride':
      return <Car className="h-4 w-4" />;
    case 'refund':
      return <RefreshCw className="h-4 w-4" />;
    case 'promo':
      return <Gift className="h-4 w-4" />;
    default:
      return <WalletIcon className="h-4 w-4" />;
  }
}

function TransactionItem({ tx }: { tx: WalletTransaction }) {
  const isCredit = tx.type === 'credit';

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center gap-3 py-3"
    >
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
        style={{
          backgroundColor: isCredit ? 'rgba(34,197,94,0.12)' : 'rgba(239,68,68,0.12)',
          color: isCredit ? 'var(--success)' : 'var(--error)',
        }}
      >
        {getCategoryIcon(tx.category)}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-[var(--text-primary)] truncate">
          {tx.description}
        </p>
        <p className="text-xs text-[var(--text-muted)]">
          {format(new Date(tx.date), 'dd MMM yyyy, hh:mm a')}
        </p>
      </div>
      <div className="shrink-0 text-right">
        <p
          className="text-sm font-bold"
          style={{ color: isCredit ? 'var(--success)' : 'var(--error)' }}
        >
          {isCredit ? '+' : '-'}{formatCurrency(tx.amount)}
        </p>
        <p className="text-[10px] uppercase font-medium text-[var(--text-muted)]">
          {tx.type}
        </p>
      </div>
    </motion.div>
  );
}

function PromoCard({
  code,
  label,
  description,
  color,
}: {
  code: string;
  label: string;
  description: string;
  color: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      toast.success(`Promo code ${code} copied!`);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-sm font-bold text-[var(--text-primary)]">{label}</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 gap-1.5"
            onClick={handleCopy}
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-[var(--success)]" />
                <span className="text-xs text-[var(--success)]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span className="text-xs">Copy</span>
              </>
            )}
          </Button>
        </div>
        <p className="text-xs text-[var(--text-muted)]">{description}</p>
      </div>
    </Card>
  );
}

function Wallet() {
  const balance = useWalletStore((s) => s.balance);
  const transactions = useWalletStore((s) => s.transactions);
  const addMoney = useWalletStore((s) => s.addMoney);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState('');

  const effectiveAmount = selectedAmount ?? (customAmount ? parseInt(customAmount, 10) : 0);

  const handleQuickAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
  };

  const handleConfirmAdd = () => {
    if (effectiveAmount > 0) {
      addMoney(effectiveAmount, `Added ₹${effectiveAmount} to wallet`);
      toast.success(`₹${effectiveAmount} added to wallet`);
      setDialogOpen(false);
      setSelectedAmount(null);
      setCustomAmount('');
    }
  };

  const handleDialogOpen = () => {
    setSelectedAmount(null);
    setCustomAmount('');
    setDialogOpen(true);
  };

  return (
    <PageTransition>
      <div className="h-full flex flex-col">
        <ScrollArea className="flex-1">
          <div className="mx-auto max-w-lg px-4 py-6 space-y-6 md:max-w-2xl">
            {/* Balance Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="overflow-hidden bg-gradient-to-br from-[var(--primary)] to-[var(--primary-hover)]">
                <div className="p-6 text-center space-y-3">
                  <p className="text-sm font-medium text-[var(--primary-text)] opacity-80">
                    Wallet Balance
                  </p>
                  <div className="text-4xl font-bold text-[var(--primary-text)]">
                    <span>₹</span>
                    <AnimatedNumber value={balance} duration={800} />
                  </div>
                  <Button
                    variant="secondary"
                    className="mt-2 gap-2"
                    onClick={handleDialogOpen}
                  >
                    <Plus className="h-4 w-4" />
                    Add Money
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Offers Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="space-y-3"
            >
              <h2 className="text-base font-semibold text-[var(--text-primary)]">
                Offers & Promos
              </h2>
              <div className="space-y-2">
                {OFFERS.map((offer) => (
                  <PromoCard
                    key={offer.code}
                    code={offer.code}
                    label={offer.label}
                    description={offer.description}
                    color={offer.color}
                  />
                ))}
              </div>
            </motion.div>

            {/* Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-[var(--text-primary)]">
                  Transactions
                </h2>
                <span className="text-xs text-[var(--text-muted)]">
                  {transactions.length} transaction{transactions.length !== 1 ? 's' : ''}
                </span>
              </div>

              {transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[var(--surface-raised)] mb-3">
                    <WalletIcon className="h-7 w-7 text-[var(--text-muted)]" />
                  </div>
                  <p className="text-sm text-[var(--text-muted)]">No transactions yet</p>
                </div>
              ) : (
                <Card>
                  <div className="px-4">
                    {transactions.map((tx, index) => (
                      <div key={tx.id}>
                        <TransactionItem tx={tx} />
                        {index < transactions.length - 1 && <Separator />}
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        </ScrollArea>

        {/* Add Money Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add Money to Wallet</DialogTitle>
              <DialogDescription>
                Select a quick amount or enter a custom amount.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 pt-2">
              {/* Quick amount buttons */}
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {QUICK_AMOUNTS.map((amount) => (
                  <motion.button
                    key={amount}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleQuickAmountSelect(amount)}
                    className={`rounded-lg border-2 px-3 py-3 text-center text-sm font-semibold transition-colors ${
                      selectedAmount === amount
                        ? 'border-[var(--primary)] bg-[var(--primary)]/10 text-[var(--primary)]'
                        : 'border-[var(--border)] text-[var(--text-primary)] hover:border-[var(--primary)]/50'
                    }`}
                  >
                    ₹{amount}
                  </motion.button>
                ))}
              </div>

              {/* Custom amount input */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-[var(--text-muted)]">
                  Or enter custom amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm font-medium text-[var(--text-muted)]">
                    ₹
                  </span>
                  <Input
                    type="number"
                    min="1"
                    max="10000"
                    value={customAmount}
                    onChange={(e) => handleCustomAmountChange(e.target.value)}
                    placeholder="Enter amount"
                    className="pl-7"
                  />
                </div>
              </div>

              {/* Selected amount preview */}
              {effectiveAmount > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="rounded-lg bg-[var(--surface-raised)] p-3 text-center"
                >
                  <p className="text-xs text-[var(--text-muted)]">Amount to add</p>
                  <p className="text-xl font-bold text-[var(--text-primary)]">
                    {formatCurrency(effectiveAmount)}
                  </p>
                </motion.div>
              )}

              {/* Confirm button */}
              <Button
                className="w-full gap-2"
                disabled={effectiveAmount <= 0}
                onClick={handleConfirmAdd}
              >
                <Plus className="h-4 w-4" />
                Add {effectiveAmount > 0 ? formatCurrency(effectiveAmount) : 'Money'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </PageTransition>
  );
}

export default Wallet;
