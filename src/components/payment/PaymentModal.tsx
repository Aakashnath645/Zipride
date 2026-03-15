import { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { formatCurrency } from '@/lib/utils';
import FareBreakdown from '@/components/booking/FareBreakdown';
import PromoCodeInput from '@/components/booking/PromoCodeInput';
import StripeCardForm from './StripeCardForm';
import UpiPayment from './UpiPayment';
import WalletPay from './WalletPay';
import PaymentSuccess from './PaymentSuccess';
import type { FareBreakdown as FareBreakdownType, PaymentMethod } from '@/types';
import { Banknote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

interface PaymentModalProps {
  fare: FareBreakdownType;
  promoCode: string | null;
  onPromoApply: (code: string) => void;
  onPromoRemove: () => void;
  onComplete: (method: PaymentMethod) => void;
}

export default function PaymentModal({ fare, promoCode, onPromoApply, onPromoRemove, onComplete }: PaymentModalProps) {
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('upi');

  if (paymentComplete) {
    return <PaymentSuccess amount={fare.total} />;
  }

  const handleSuccess = () => {
    setPaymentComplete(true);
    setTimeout(() => onComplete(selectedMethod), 2600);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <FareBreakdown fare={fare} />
      <PromoCodeInput appliedCode={promoCode} onApply={onPromoApply} onRemove={onPromoRemove} />
      <Separator />
      <Tabs defaultValue="upi" onValueChange={(v) => setSelectedMethod(v as PaymentMethod)} className="w-full">
        <TabsList className="w-full grid grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="upi">UPI</TabsTrigger>
          <TabsTrigger value="card">Card</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
          <TabsTrigger value="cash">Cash</TabsTrigger>
        </TabsList>
        <TabsContent value="upi" className="mt-4">
          <UpiPayment amount={fare.total} onSuccess={handleSuccess} />
        </TabsContent>
        <TabsContent value="card" className="mt-4">
          <StripeCardForm amount={fare.total} onSuccess={handleSuccess} />
        </TabsContent>
        <TabsContent value="wallet" className="mt-4">
          <WalletPay amount={fare.total} onSuccess={handleSuccess} onInsufficientBalance={() => toast.error('Insufficient wallet balance')} />
        </TabsContent>
        <TabsContent value="cash" className="mt-4">
          <div className="flex flex-col items-center gap-4 py-6">
            <Banknote className="h-16 w-16 text-[var(--success)]" />
            <div className="text-center">
              <p className="text-lg font-semibold text-[var(--text-primary)]">Pay {formatCurrency(fare.total)} in cash</p>
              <p className="text-sm text-[var(--text-muted)]">Pay your driver at the end of the ride</p>
            </div>
            <Button onClick={handleSuccess} className="w-full max-w-xs">Confirm Cash Payment</Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
