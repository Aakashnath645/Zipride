import { useState } from 'react';
import { Tag, Check, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PROMO_CODES } from '@/lib/constants';
import toast from 'react-hot-toast';

interface PromoCodeInputProps {
  appliedCode: string | null;
  onApply: (code: string) => void;
  onRemove: () => void;
}

export default function PromoCodeInput({ appliedCode, onApply, onRemove }: PromoCodeInputProps) {
  const [code, setCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleApply = async () => {
    if (!code.trim()) return;
    setIsVerifying(true);
    await new Promise((r) => setTimeout(r, 800));

    const promo = PROMO_CODES.find((p) => p.code === code.toUpperCase());
    if (promo) {
      onApply(promo.code);
      toast.success(`Promo applied! ${promo.description}`);
    } else {
      toast.error('Invalid promo code');
    }
    setIsVerifying(false);
  };

  if (appliedCode) {
    const promo = PROMO_CODES.find((p) => p.code === appliedCode);
    return (
      <div className="flex items-center gap-2 rounded-lg border border-[var(--success)]/30 bg-[var(--success)]/5 p-3">
        <Check className="h-4 w-4 text-[var(--success)]" />
        <div className="flex-1">
          <p className="text-sm font-medium text-[var(--success)]">{appliedCode}</p>
          <p className="text-xs text-[var(--text-muted)]">{promo?.description}</p>
        </div>
        <Button variant="ghost" size="icon" onClick={onRemove} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Tag className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--text-muted)]" />
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Enter promo code"
          className="pl-10 uppercase"
        />
      </div>
      <Button onClick={handleApply} disabled={!code.trim() || isVerifying} size="sm">
        {isVerifying ? (
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
        ) : (
          'Apply'
        )}
      </Button>
    </div>
  );
}
