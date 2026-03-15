import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Smartphone } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { IconGPay, IconPhonePe, IconPaytm, IconBHIM } from '@/components/icons';
import toast from 'react-hot-toast';

interface UpiPaymentProps {
  amount: number;
  onSuccess: () => void;
}

const upiApps = [
  { name: 'GPay', Icon: IconGPay, scheme: 'gpay' },
  { name: 'PhonePe', Icon: IconPhonePe, scheme: 'phonepe' },
  { name: 'Paytm', Icon: IconPaytm, scheme: 'paytm' },
  { name: 'BHIM', Icon: IconBHIM, scheme: 'bhim' },
];

const UPI_ID_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z]{3,}$/;

export default function UpiPayment({ amount, onSuccess }: UpiPaymentProps) {
  const [upiId, setUpiId] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedName, setVerifiedName] = useState('');
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState('');

  const upiUri = `upi://pay?pa=zipride@ybl&pn=ZipRide&am=${amount}&cu=INR&tn=ZipRide+Cab`;

  const validateUpi = (value: string) => UPI_ID_REGEX.test(value);

  const handleVerify = async () => {
    if (!validateUpi(upiId)) {
      setError('Invalid UPI ID format (e.g. name@upi)');
      return;
    }
    setError('');
    setIsVerifying(true);

    // Simulate 800ms verification delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    setVerifiedName('Aakash Kumar');
    setIsVerified(true);
    setIsVerifying(false);
  };

  const handlePay = async () => {
    setIsPaying(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast.success('UPI payment successful!');
    onSuccess();
    setIsPaying(false);
  };

  const handleAppPay = (appName: string) => {
    try {
      window.location.href = upiUri;
    } catch {
      // Silently handle navigation errors
    }

    // Show toast fallback in case the app doesn't open
    toast(`Opening ${appName}... If nothing happens, use UPI ID instead.`, {
      icon: '\uD83D\uDCF1',
    });

    // Simulate success after brief delay (app would handle the actual payment)
    setTimeout(() => {
      onSuccess();
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* UPI ID input with verify button */}
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Smartphone className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
            <Input
              value={upiId}
              onChange={(e) => {
                setUpiId(e.target.value);
                setIsVerified(false);
                setVerifiedName('');
                setError('');
              }}
              placeholder="yourname@upi"
              className="pl-10"
              disabled={isPaying}
            />
          </div>
          <Button
            onClick={handleVerify}
            disabled={!upiId || isVerifying || isPaying}
            variant="outline"
            size="sm"
          >
            {isVerifying ? (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--accent)] border-t-transparent" />
            ) : (
              'Verify'
            )}
          </Button>
        </div>

        {/* Validation error */}
        {error && <p className="text-xs text-[var(--error)]">{error}</p>}

        {/* Verified name display */}
        {isVerified && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-sm text-[var(--success)]"
          >
            <Check className="h-4 w-4" />
            <span>{verifiedName}</span>
          </motion.div>
        )}
      </div>

      {/* Pay button - visible only after verification */}
      {isVerified && (
        <Button onClick={handlePay} disabled={isPaying} className="w-full">
          {isPaying ? (
            <div className="flex items-center gap-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--primary-text)] border-t-transparent" />
              Processing...
            </div>
          ) : (
            `Pay \u20B9${amount}`
          )}
        </Button>
      )}

      {/* QR Code section */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-xs text-[var(--text-muted)]">Or scan QR code</p>
        <div className="rounded-xl border border-[var(--border)] bg-white p-3">
          <QRCodeSVG value={upiUri} size={160} level="M" />
        </div>
      </div>

      {/* UPI app buttons with Framer Motion stagger */}
      <div>
        <p className="mb-2 text-xs text-[var(--text-muted)]">Pay with UPI app</p>
        <div className="flex justify-center gap-4">
          {upiApps.map(({ name, Icon }, index) => (
            <motion.button
              key={name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => handleAppPay(name)}
              className="flex flex-col items-center gap-1 rounded-lg p-2 transition-colors hover:bg-[var(--surface-raised)]"
            >
              <Icon size={36} />
              <span className="text-[10px] text-[var(--text-muted)]">{name}</span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
