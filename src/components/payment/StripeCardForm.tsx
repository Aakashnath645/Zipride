import { useState } from 'react';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';

interface StripeCardFormProps {
  amount: number;
  onSuccess: () => void;
  onError?: (error: string) => void;
}

export default function StripeCardForm({ amount, onSuccess, onError }: StripeCardFormProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [name, setName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Auto-format card number with a space every 4 digits
  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 16);
    return cleaned.replace(/(.{4})/g, '$1 ').trim();
  };

  // Auto-format expiry as MM/YY
  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 4);
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
    }
    return cleaned;
  };

  const detectCardBrand = (number: string): string => {
    const cleaned = number.replace(/\s/g, '');
    if (/^4/.test(cleaned)) return 'Visa';
    if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) return 'Mastercard';
    if (/^3[47]/.test(cleaned)) return 'Amex';
    if (/^6(?:011|5)/.test(cleaned)) return 'Discover';
    if (/^65|^81|^82|^508/.test(cleaned)) return 'RuPay';
    return '';
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    // Cardholder name
    if (name.trim().length < 2) {
      newErrors.name = 'Cardholder name is required';
    }

    // Card number: strip spaces and check length
    const cleanedCard = cardNumber.replace(/\s/g, '');
    if (cleanedCard.length < 13 || cleanedCard.length > 19) {
      newErrors.cardNumber = 'Invalid card number';
    }

    // Expiry: must match MM/YY format
    if (!expiry.match(/^\d{2}\/\d{2}$/)) {
      newErrors.expiry = 'Invalid expiry (MM/YY)';
    } else {
      const [monthStr, yearStr] = expiry.split('/');
      const month = parseInt(monthStr, 10);
      const year = parseInt(yearStr, 10) + 2000;
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();

      if (month < 1 || month > 12) {
        newErrors.expiry = 'Invalid month';
      } else if (year < currentYear || (year === currentYear && month < currentMonth)) {
        newErrors.expiry = 'Card has expired';
      }
    }

    // CVC: 3 or 4 digits
    if (cvc.length < 3 || cvc.length > 4) {
      newErrors.cvc = 'Invalid CVC';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      onError?.('Please fix the validation errors');
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate 1.5s processing delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('Card payment successful!');
      onSuccess();
    } catch {
      const errorMessage = 'Payment failed. Please try again.';
      toast.error(errorMessage);
      onError?.(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const cardBrand = detectCardBrand(cardNumber);

  return (
    <Card className="border-[var(--border)]">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <CreditCard className="h-5 w-5 text-[var(--accent)]" />
          Card Payment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Cardholder Name */}
          <div>
            <Input
              placeholder="Cardholder name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isProcessing}
              autoComplete="cc-name"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-[var(--error)]">{errors.name}</p>
            )}
          </div>

          {/* Card Number */}
          <div>
            <div className="relative">
              <Input
                placeholder="4242 4242 4242 4242"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                disabled={isProcessing}
                inputMode="numeric"
                autoComplete="cc-number"
              />
              {cardBrand && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[var(--text-muted)]">
                  {cardBrand}
                </span>
              )}
            </div>
            {errors.cardNumber && (
              <p className="mt-1 text-xs text-[var(--error)]">{errors.cardNumber}</p>
            )}
          </div>

          {/* Expiry and CVC side by side */}
          <div className="flex gap-3">
            <div className="flex-1">
              <Input
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
                disabled={isProcessing}
                inputMode="numeric"
                autoComplete="cc-exp"
              />
              {errors.expiry && (
                <p className="mt-1 text-xs text-[var(--error)]">{errors.expiry}</p>
              )}
            </div>
            <div className="flex-1">
              <Input
                placeholder="CVC"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').slice(0, 4))}
                maxLength={4}
                type="password"
                disabled={isProcessing}
                inputMode="numeric"
                autoComplete="cc-csc"
              />
              {errors.cvc && (
                <p className="mt-1 text-xs text-[var(--error)]">{errors.cvc}</p>
              )}
            </div>
          </div>

          {/* Secure badge */}
          <div className="flex items-center justify-center gap-1.5 text-[10px] text-[var(--text-muted)]">
            <Lock className="h-3 w-3" />
            <span>Secured with 256-bit SSL encryption</span>
            <ShieldCheck className="h-3 w-3" />
          </div>

          {/* Submit button */}
          <Button type="submit" disabled={isProcessing} className="mt-1 w-full">
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--primary-text)] border-t-transparent" />
                Processing...
              </div>
            ) : (
              `Pay \u20B9${amount}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
