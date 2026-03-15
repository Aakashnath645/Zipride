import { QRCodeSVG } from 'qrcode.react';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
  label?: string;
}

export default function QRCodeDisplay({ value, size = 180, label }: QRCodeDisplayProps) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="rounded-xl border border-[var(--border)] bg-white p-4">
        <QRCodeSVG value={value} size={size} level="M" includeMargin />
      </div>
      {label && <p className="text-xs text-[var(--text-muted)]">{label}</p>}
    </div>
  );
}
