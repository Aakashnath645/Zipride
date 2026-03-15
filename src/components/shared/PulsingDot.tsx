interface PulsingDotProps {
  color?: string;
  size?: number;
}

export default function PulsingDot({ color = 'var(--success)', size = 8 }: PulsingDotProps) {
  return (
    <span className="relative inline-flex">
      <span
        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
        style={{ backgroundColor: color, width: size, height: size }}
      />
      <span
        className="relative inline-flex rounded-full"
        style={{ backgroundColor: color, width: size, height: size }}
      />
    </span>
  );
}
