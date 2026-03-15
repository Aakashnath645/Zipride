import React from "react";

// ============================================================================
// ZipRide Custom SVG Icon Library
// ============================================================================
// Every icon is a React component with standardized props.
// All icons use viewBox="0 0 24 24" and are hand-crafted original SVG paths.
// ============================================================================

interface IconProps {
  size?: number;
  className?: string;
  color?: string;
}

// ============================================================================
// VEHICLE ICONS
// ============================================================================

/**
 * IconZipMini - Compact hatchback side profile, cute + rounded, with wheels,
 * windows, and body lines.
 */
export const IconZipMini: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Body - compact rounded hatchback shape */}
    <path d="M2 15h20v-2c0-1-.5-1.5-1-2l-2-2c-.5-.5-1.2-1-2-1.5L15 6.5c-.5-.3-1.2-.5-2-.5H9c-1 0-1.8.4-2.5 1L4 9c-.7.7-1.2 1.3-1.5 2L2 12.5V15z" />
    {/* Roof line - rounded top */}
    <path d="M6.5 9h7.5c.5 0 .8.1 1 .3L17 11" />
    {/* Window - single large rounded window */}
    <path d="M7.5 9.5L6 12h4.5V8c0-.2-.1-.3-.3-.3H9c-.5 0-1 .2-1.5.8z" />
    {/* Rear window */}
    <path d="M11.5 8v4H15l-1.5-2.5c-.3-.5-.7-.9-1.2-1.2L11.5 8z" />
    {/* Bumper line */}
    <path d="M2 15v1.5c0 .3.2.5.5.5H5" />
    <path d="M19 17h1.5c.3 0 .5-.2.5-.5V15" />
    {/* Front wheel */}
    <circle cx={6.5} cy={17} r={2} />
    <circle cx={6.5} cy={17} r={0.7} />
    {/* Rear wheel */}
    <circle cx={17.5} cy={17} r={2} />
    <circle cx={17.5} cy={17} r={0.7} />
    {/* Underline between wheels */}
    <path d="M8.5 17h9" />
    {/* Headlight */}
    <path d="M20 12.5h1" />
    {/* Taillight */}
    <path d="M2 13h.8" />
    {/* Door handle */}
    <path d="M12 13h1.5" />
  </svg>
);

/**
 * IconZipGo - Sleek sedan side profile, mid-size, with wheels, windows,
 * body lines, and door seams.
 */
export const IconZipGo: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Sedan body - long sleek shape */}
    <path d="M1 15h22v-2.5l-1-1.5-2.5-1.5L17 8l-2-1.5c-.5-.3-1-.5-1.8-.5H9.5c-.8 0-1.5.3-2 .8L5.5 9 3.5 10.5 2 12.5 1 14v1z" />
    {/* Roof line */}
    <path d="M7 9h8l2 2" />
    {/* Front windshield */}
    <path d="M7 9L5.5 12.5" />
    {/* Rear windshield */}
    <path d="M15 9l2 3.5" />
    {/* Front window */}
    <path d="M7.3 9.3L6 12h4.5V9H8c-.3 0-.5.1-.7.3z" />
    {/* Rear window */}
    <path d="M11.5 9v3H16l-1.5-3h-3z" />
    {/* Door seam - front */}
    <path d="M11 9v6" />
    {/* Door seam - rear */}
    <path d="M15.5 9.5v5.5" />
    {/* Bumper/undercarriage */}
    <path d="M1 15v1.5c0 .3.2.5.5.5H4.5" />
    <path d="M19.5 17h2c.3 0 .5-.2.5-.5V15" />
    {/* Front wheel */}
    <circle cx={6.5} cy={17} r={2} />
    <circle cx={6.5} cy={17} r={0.7} />
    {/* Rear wheel */}
    <circle cx={17.5} cy={17} r={2} />
    <circle cx={17.5} cy={17} r={0.7} />
    {/* Underline between wheels */}
    <path d="M8.5 17h9" />
    {/* Headlight */}
    <path d="M21.5 12h1" />
    {/* Taillight */}
    <path d="M1 13.5h.8" />
    {/* Front door handle */}
    <path d="M9 13h1.5" />
    {/* Rear door handle */}
    <path d="M13 13h1.5" />
    {/* Body accent line */}
    <path d="M3 14h18" />
  </svg>
);

/**
 * IconZipPrime - Bold SUV side profile, large and tall, with wheels, windows,
 * and body lines.
 */
export const IconZipPrime: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* SUV body - tall and bold */}
    <path d="M1 16h22v-5l-.5-1-1.5-1V7.5c0-.5-.2-1-.5-1.3L19 5h-4l-2.5-1H10L7.5 5 5.5 6.5 4 8.5 2.5 10 1.5 12 1 14v2z" />
    {/* Roof rack */}
    <path d="M7 5h10" />
    <path d="M8 4v1" />
    <path d="M16 4v1" />
    {/* Front windshield */}
    <path d="M6 8L4.5 12" />
    {/* Rear windshield */}
    <path d="M18 7v5" />
    {/* Window divider pillar - B pillar */}
    <path d="M12 6v6" />
    {/* Front window */}
    <path d="M6.5 8L5 11.5h6.5V6.5H8.5L6.5 8z" />
    {/* Rear window */}
    <path d="M12.5 6.5v5h5V7.5l-1-1h-4z" />
    {/* Side body line */}
    <path d="M2 14h20" />
    {/* Door seam front */}
    <path d="M9.5 7v9" />
    {/* Door seam rear */}
    <path d="M15 6.5v9.5" />
    {/* Bumper */}
    <path d="M1 16v1.5c0 .3.2.5.5.5H4" />
    <path d="M20 18h2.5c.3 0 .5-.2.5-.5V16" />
    {/* Front wheel - larger for SUV */}
    <circle cx={6} cy={18} r={2.2} />
    <circle cx={6} cy={18} r={0.8} />
    {/* Rear wheel */}
    <circle cx={18} cy={18} r={2.2} />
    <circle cx={18} cy={18} r={0.8} />
    {/* Underline between wheels */}
    <path d="M8.2 18h7.6" />
    {/* Headlight */}
    <path d="M22 11.5h.5" />
    {/* Taillight */}
    <path d="M1 13h.5" />
    {/* Front door handle */}
    <path d="M8 12h1" />
    {/* Rear door handle */}
    <path d="M13.5 12h1" />
    {/* Wheel arch accents */}
    <path d="M3.5 16c0-1.5 1.2-2.7 2.5-2.7s2.5 1.2 2.5 2.7" />
    <path d="M15.5 16c0-1.5 1.1-2.7 2.5-2.7s2.5 1.2 2.5 2.7" />
  </svg>
);

// ============================================================================
// PAYMENT ICONS
// ============================================================================

/**
 * IconGPay - Google Pay: G letter in Google colors inside a rounded rect.
 */
export const IconGPay: React.FC<IconProps> = ({
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Rounded rect background */}
    <rect
      x={1}
      y={4}
      width={22}
      height={16}
      rx={3}
      ry={3}
      fill="#F1F3F4"
      stroke="#DADCE0"
      strokeWidth={0.8}
    />
    {/* Google "G" - blue arc (top-right) */}
    <path
      d="M14.5 10.5H12v1.3h1.8c-.1.8-.8 1.4-1.8 1.4-1.1 0-2-.9-2-2s.9-2 2-2c.5 0 .9.2 1.3.5l1-.9c-.6-.6-1.4-.9-2.3-.9-1.9 0-3.4 1.5-3.4 3.3 0 1.8 1.5 3.3 3.4 3.3 1.9 0 3.2-1.3 3.2-3.2 0-.3 0-.5-.1-.7h-.6z"
      fill="#4285F4"
    />
    {/* Red portion of G (top-left arc) */}
    <path
      d="M8.6 10.2c.2-.5.5-.9.9-1.3l-1-.9c-.6.5-1 1.2-1.2 2l1.3.2z"
      fill="#EA4335"
    />
    {/* Yellow portion (bottom-left arc) */}
    <path
      d="M8.6 12.6l-1.3.2c.2.8.7 1.4 1.2 2l1-.9c-.4-.4-.7-.8-.9-1.3z"
      fill="#FBBC05"
    />
    {/* Green portion (bottom-right arc) */}
    <path
      d="M12 14.5c.7 0 1.3-.2 1.8-.6l-1-.9c-.2.2-.5.3-.8.3-.6 0-1.1-.3-1.4-.8l-1.3.2c.5 1 1.5 1.8 2.7 1.8z"
      fill="#34A853"
    />
    {/* "Pay" text */}
    <text
      x={16.2}
      y={13.8}
      fontSize={4.2}
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fill="#5F6368"
    >
      Pay
    </text>
  </svg>
);

/**
 * IconPhonePe - P with a rising arrow, purple tones.
 */
export const IconPhonePe: React.FC<IconProps> = ({
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Rounded rect background */}
    <rect
      x={2}
      y={2}
      width={20}
      height={20}
      rx={4}
      ry={4}
      fill="#5F259F"
    />
    {/* Stylized P stem */}
    <path
      d="M8 18V8.5"
      stroke="#FFFFFF"
      strokeWidth={2.2}
      strokeLinecap="round"
    />
    {/* P bowl */}
    <path
      d="M8 8.5h3.5c1.7 0 3 1.2 3 2.7s-1.3 2.7-3 2.7H8"
      stroke="#FFFFFF"
      strokeWidth={2.2}
      strokeLinecap="round"
      fill="none"
    />
    {/* Rising arrow from the P */}
    <path
      d="M14 10l2.5-3.5"
      stroke="#FFFFFF"
      strokeWidth={1.8}
      strokeLinecap="round"
    />
    <path
      d="M14.5 6.5h2.2v2.2"
      stroke="#FFFFFF"
      strokeWidth={1.8}
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/**
 * IconPaytm - Stylized PT monogram, blue tones.
 */
export const IconPaytm: React.FC<IconProps> = ({
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Rounded rect background */}
    <rect
      x={2}
      y={2}
      width={20}
      height={20}
      rx={4}
      ry={4}
      fill="#00BAF2"
    />
    {/* P stroke */}
    <path
      d="M6.5 17V7.5"
      stroke="#FFFFFF"
      strokeWidth={2}
      strokeLinecap="round"
    />
    {/* P bowl */}
    <path
      d="M6.5 7.5h2.5c1.3 0 2.3 1 2.3 2.2s-1 2.2-2.3 2.2H6.5"
      stroke="#FFFFFF"
      strokeWidth={2}
      strokeLinecap="round"
      fill="none"
    />
    {/* T vertical stroke */}
    <path
      d="M15 9v8"
      stroke="#FFFFFF"
      strokeWidth={2}
      strokeLinecap="round"
    />
    {/* T horizontal bar */}
    <path
      d="M12.5 9h5"
      stroke="#FFFFFF"
      strokeWidth={2}
      strokeLinecap="round"
    />
    {/* Small "m" */}
    <path
      d="M13 16c0-1.2.5-2 1.2-2s1 .6 1 1.5V17c0-1.2.5-2 1.3-2s1 .6 1 1.5V17"
      stroke="#002E6E"
      strokeWidth={1}
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);

/**
 * IconBHIM - Ashoka wheel inside a shield, saffron/blue.
 */
export const IconBHIM: React.FC<IconProps> = ({
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Shield shape */}
    <path
      d="M12 2L3 6v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-9-4z"
      fill="#FFFFFF"
      stroke="#002E6E"
      strokeWidth={1.2}
    />
    {/* Top saffron band */}
    <path
      d="M12 2L3 6v2.5h18V6L12 2z"
      fill="#FF9933"
      stroke="none"
    />
    {/* Bottom green band */}
    <path
      d="M3.5 14.5c1.2 3.5 4.3 6.5 8.5 7.5 4.2-1 7.3-4 8.5-7.5H3.5z"
      fill="#138808"
      stroke="none"
    />
    {/* Ashoka wheel - outer ring */}
    <circle
      cx={12}
      cy={11.5}
      r={3.5}
      stroke="#002E6E"
      strokeWidth={1}
      fill="none"
    />
    {/* Ashoka wheel - inner hub */}
    <circle
      cx={12}
      cy={11.5}
      r={0.8}
      fill="#002E6E"
    />
    {/* Ashoka wheel - 12 spokes (simplified to 8 for clarity at small size) */}
    <line x1={12} y1={8} x2={12} y2={15} stroke="#002E6E" strokeWidth={0.6} />
    <line x1={8.5} y1={11.5} x2={15.5} y2={11.5} stroke="#002E6E" strokeWidth={0.6} />
    <line x1={9.5} y1={9} x2={14.5} y2={14} stroke="#002E6E" strokeWidth={0.6} />
    <line x1={14.5} y1={9} x2={9.5} y2={14} stroke="#002E6E" strokeWidth={0.6} />
    {/* Small dots on the wheel rim */}
    <circle cx={12} cy={8.2} r={0.35} fill="#002E6E" />
    <circle cx={12} cy={14.8} r={0.35} fill="#002E6E" />
    <circle cx={8.7} cy={11.5} r={0.35} fill="#002E6E" />
    <circle cx={15.3} cy={11.5} r={0.35} fill="#002E6E" />
    <circle cx={9.7} cy={9.2} r={0.35} fill="#002E6E" />
    <circle cx={14.3} cy={13.8} r={0.35} fill="#002E6E" />
    <circle cx={14.3} cy={9.2} r={0.35} fill="#002E6E" />
    <circle cx={9.7} cy={13.8} r={0.35} fill="#002E6E" />
  </svg>
);

/**
 * IconVisa - VISA wordmark in dark blue.
 */
export const IconVisa: React.FC<IconProps> = ({
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Card background */}
    <rect
      x={1}
      y={5}
      width={22}
      height={14}
      rx={2}
      ry={2}
      fill="#FFFFFF"
      stroke="#E0E0E0"
      strokeWidth={0.8}
    />
    {/* V */}
    <path
      d="M4.2 9.5L6 15l1.8-5.5"
      stroke="#1A1F71"
      strokeWidth={1.5}
      fill="none"
    />
    {/* I */}
    <path
      d="M9.2 9.5V15"
      stroke="#1A1F71"
      strokeWidth={1.5}
    />
    {/* S */}
    <path
      d="M11 11c0-.8.7-1.5 1.5-1.5s1.5.5 1.5 1.2c0 1.5-3 1.3-3 3 0 .8.7 1.3 1.5 1.3s1.5-.6 1.5-1.3"
      stroke="#1A1F71"
      strokeWidth={1.3}
      fill="none"
    />
    {/* A */}
    <path
      d="M16 15l2-5.5L20 15"
      stroke="#1A1F71"
      strokeWidth={1.5}
      fill="none"
    />
    <path
      d="M16.8 13h4"
      stroke="#1A1F71"
      strokeWidth={1.2}
    />
    {/* Gold/orange stripe at bottom */}
    <path
      d="M1.5 17h21"
      stroke="#F7B600"
      strokeWidth={1.5}
    />
  </svg>
);

/**
 * IconMastercard - Two overlapping circles, red + orange.
 */
export const IconMastercard: React.FC<IconProps> = ({
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Card background */}
    <rect
      x={1}
      y={5}
      width={22}
      height={14}
      rx={2}
      ry={2}
      fill="#1A1F2E"
      stroke="none"
    />
    {/* Left red circle */}
    <circle
      cx={9.5}
      cy={12}
      r={4.5}
      fill="#EB001B"
      stroke="none"
    />
    {/* Right orange circle */}
    <circle
      cx={14.5}
      cy={12}
      r={4.5}
      fill="#F79E1B"
      stroke="none"
    />
    {/* Overlap region - darker orange/red */}
    <path
      d="M12 8.17c1.2 1 2 2.3 2 3.83s-.8 2.83-2 3.83c-1.2-1-2-2.3-2-3.83s.8-2.83 2-3.83z"
      fill="#FF5F00"
      stroke="none"
    />
  </svg>
);

/**
 * IconRuPay - Rupee symbol stylized, blue/orange.
 */
export const IconRuPay: React.FC<IconProps> = ({
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Card background */}
    <rect
      x={1}
      y={5}
      width={22}
      height={14}
      rx={2}
      ry={2}
      fill="#FFFFFF"
      stroke="#E0E0E0"
      strokeWidth={0.8}
    />
    {/* Blue triangle accent */}
    <path
      d="M1 17l11-4 11 4v1c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-1z"
      fill="#097A44"
      opacity={0.15}
      stroke="none"
    />
    {/* Rupee symbol - large */}
    {/* Top horizontal line */}
    <path
      d="M7 8.5h6"
      stroke="#003087"
      strokeWidth={1.8}
    />
    {/* Second horizontal line */}
    <path
      d="M7 11h6"
      stroke="#003087"
      strokeWidth={1.8}
    />
    {/* Rupee vertical curve */}
    <path
      d="M8.5 8.5c2.2 0 3.5 1 3.5 2.5s-1.3 2.5-3.5 2.5"
      stroke="#003087"
      strokeWidth={1.8}
      fill="none"
    />
    {/* Rupee diagonal slash */}
    <path
      d="M7 16l4.5-5"
      stroke="#F37021"
      strokeWidth={1.8}
    />
    {/* "Ru" text */}
    <text
      x={15}
      y={11}
      fontSize={3.5}
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fill="#003087"
    >
      Ru
    </text>
    {/* "Pay" text in orange */}
    <text
      x={15}
      y={15}
      fontSize={3.5}
      fontFamily="Arial, sans-serif"
      fontWeight="bold"
      fill="#F37021"
    >
      Pay
    </text>
  </svg>
);

/**
 * IconUPI - UPI text with flowing lines underneath.
 */
export const IconUPI: React.FC<IconProps> = ({
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Rounded rect background */}
    <rect
      x={2}
      y={3}
      width={20}
      height={18}
      rx={3}
      ry={3}
      fill="#FFFFFF"
      stroke="#E0E0E0"
      strokeWidth={0.8}
    />
    {/* U */}
    <path
      d="M5.5 8v4c0 1.5 1 2.5 2 2.5s2-1 2-2.5V8"
      stroke="#4CAF50"
      strokeWidth={1.8}
      fill="none"
    />
    {/* P */}
    <path
      d="M11.5 14.5V8h2c1.2 0 2 .8 2 1.8s-.8 1.8-2 1.8h-2"
      stroke="#4CAF50"
      strokeWidth={1.8}
      fill="none"
    />
    {/* I */}
    <path
      d="M17.5 8v6.5"
      stroke="#4CAF50"
      strokeWidth={1.8}
    />
    {/* Flowing line 1 underneath */}
    <path
      d="M4 17.5c2-.8 4-1 6-.8 2 .2 4 .8 6 .6 1.5-.1 3-.5 4.5-1"
      stroke="#128807"
      strokeWidth={1.2}
      fill="none"
    />
    {/* Flowing line 2 */}
    <path
      d="M4 19c2-.6 4-.8 6-.5 2 .3 3.5.7 5.5.5 1.5-.2 3.2-.6 5-1.2"
      stroke="#FF9933"
      strokeWidth={1.2}
      fill="none"
    />
  </svg>
);

// ============================================================================
// APP ICONS
// ============================================================================

/**
 * IconHome - House with a small location pin on roof.
 */
export const IconHome: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* House roof */}
    <path d="M3 10.5L12 3l9 7.5" />
    {/* House body */}
    <path d="M5 9.5V20h14V9.5" />
    {/* Door */}
    <path d="M9.5 20v-6h5v6" />
    {/* Window left */}
    <rect x={6.5} y={12} width={2.5} height={2.5} rx={0.3} />
    {/* Window right - not needed since we have door in center, add one on right side */}
    {/* Location pin on roof */}
    <path d="M12 3v-0.5" />
    <path d="M12 0.5c-1 0-1.8.8-1.8 1.8C10.2 3.5 12 5 12 5s1.8-1.5 1.8-2.7c0-1-.8-1.8-1.8-1.8z" />
    <circle cx={12} cy={2.4} r={0.5} />
  </svg>
);

/**
 * IconMyRides - Clock overlaid with a small car.
 */
export const IconMyRides: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Clock circle */}
    <circle cx={12} cy={10} r={8} />
    {/* Clock hands - hour */}
    <path d="M12 6v4l2.5 1.5" />
    {/* Clock tick marks */}
    <path d="M12 2.5v1" />
    <path d="M12 16.5v1" />
    <path d="M4.5 10h1" />
    <path d="M18.5 10h1" />
    {/* Small car at bottom-right overlapping the clock */}
    {/* Car body */}
    <path d="M14 19h6.5v-1.5l-.8-.8-.7-.7h-2.5l-1.5 1-.8.8V19z" />
    {/* Car wheels */}
    <circle cx={15.5} cy={19.5} r={1} />
    <circle cx={19.5} cy={19.5} r={1} />
    {/* Car window */}
    <path d="M16 16.5l1-1h1.5l.5.5" />
  </svg>
);

/**
 * IconWallet - Bifold wallet slightly open.
 */
export const IconWallet: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Wallet back panel */}
    <path d="M2 6c0-1.1.9-2 2-2h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6z" />
    {/* Wallet fold line */}
    <path d="M2 10h20" />
    {/* Card slot opening - slightly open top flap */}
    <path d="M4 4l-.5-1.5c-.1-.3.1-.5.4-.5h16.2c.3 0 .5.2.4.5L20 4" />
    {/* Card peeking out */}
    <path d="M6 7.5h6v2H6z" />
    {/* Money clasp / snap */}
    <path d="M17 13h3v3h-3z" />
    <circle cx={18.5} cy={14.5} r={0.8} />
    {/* Bills showing */}
    <path d="M5 14h8" />
    <path d="M5 16.5h10" />
  </svg>
);

/**
 * IconProfile - Person silhouette with a ring/halo.
 */
export const IconProfile: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Halo ring above head */}
    <ellipse cx={12} cy={4.5} rx={3.5} ry={1.2} />
    {/* Head */}
    <circle cx={12} cy={9} r={3.5} />
    {/* Body / shoulders */}
    <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
    {/* Subtle collar line */}
    <path d="M9.5 15.5L12 17l2.5-1.5" />
  </svg>
);

/**
 * IconMap - Folded map with a route line on it.
 */
export const IconMap: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Folded map outline */}
    <path d="M3 5l6-2 6 2 6-2v16l-6 2-6-2-6 2V5z" />
    {/* Fold line 1 */}
    <path d="M9 3v18" />
    {/* Fold line 2 */}
    <path d="M15 5v18" />
    {/* Route line - dashed/curved path across the map */}
    <path
      d="M5 9c1 1 2.5 1.5 4 1s3-.5 4 .5 2 2.5 4 2.5c1 0 2-.5 2.5-1"
      strokeDasharray="2 1.5"
    />
    {/* Route start dot */}
    <circle cx={5} cy={9} r={1} fill={color} stroke="none" />
    {/* Route end dot */}
    <circle cx={19.5} cy={12} r={1} fill={color} stroke="none" />
  </svg>
);

/**
 * IconShield - Shield with a checkmark.
 */
export const IconShield: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Shield shape */}
    <path d="M12 2L3 6v5c0 5.5 3.8 10.7 9 12 5.2-1.3 9-6.5 9-12V6l-9-4z" />
    {/* Checkmark inside */}
    <path d="M8 12l3 3 5-6" strokeWidth={2} />
  </svg>
);

/**
 * IconStar - 5-pointed star with inner glow path.
 */
export const IconStar: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Outer star */}
    <path d="M12 2l2.9 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14l-5-4.87 7.1-1.01L12 2z" />
    {/* Inner glow path - smaller concentric star */}
    <path
      d="M12 6.5l1.5 3.2 3.5.5-2.5 2.5.6 3.5L12 14.7l-3.1 1.5.6-3.5-2.5-2.5 3.5-.5L12 6.5z"
      strokeWidth={0.8}
      opacity={0.4}
    />
  </svg>
);

/**
 * IconSOS - Bold SOS text inside a diamond warning shape.
 */
export const IconSOS: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Diamond warning shape */}
    <path d="M12 1L1 12l11 11 11-11L12 1z" />
    {/* Inner diamond border */}
    <path d="M12 3.5L3.5 12 12 20.5 20.5 12 12 3.5z" strokeWidth={0.8} opacity={0.3} />
    {/* S */}
    <path
      d="M7 10.5c0-1 .8-1.7 1.5-1.7s1.3.5 1.3 1.2c0 1.5-2.8 1-2.8 2.7 0 .8.6 1.3 1.5 1.3s1.3-.5 1.3-1.2"
      strokeWidth={1.8}
    />
    {/* O */}
    <ellipse cx={12} cy={11.5} rx={1.5} ry={2.5} strokeWidth={1.8} />
    {/* S */}
    <path
      d="M15 10.5c0-1 .7-1.7 1.5-1.7s1.3.5 1.3 1.2c0 1.5-2.8 1-2.8 2.7 0 .8.6 1.3 1.5 1.3s1.3-.5 1.3-1.2"
      strokeWidth={1.8}
    />
  </svg>
);

/**
 * IconQR - QR code corners pattern.
 */
export const IconQR: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Top-left finder pattern - outer */}
    <rect x={2} y={2} width={7} height={7} rx={1} />
    {/* Top-left finder pattern - inner */}
    <rect x={4} y={4} width={3} height={3} rx={0.5} fill={color} stroke="none" />

    {/* Top-right finder pattern - outer */}
    <rect x={15} y={2} width={7} height={7} rx={1} />
    {/* Top-right finder pattern - inner */}
    <rect x={17} y={4} width={3} height={3} rx={0.5} fill={color} stroke="none" />

    {/* Bottom-left finder pattern - outer */}
    <rect x={2} y={15} width={7} height={7} rx={1} />
    {/* Bottom-left finder pattern - inner */}
    <rect x={4} y={17} width={3} height={3} rx={0.5} fill={color} stroke="none" />

    {/* Data modules - scattered pixels */}
    <rect x={11} y={2} width={2} height={2} rx={0.3} fill={color} stroke="none" />
    <rect x={11} y={6} width={2} height={2} rx={0.3} fill={color} stroke="none" />
    <rect x={2} y={11} width={2} height={2} rx={0.3} fill={color} stroke="none" />
    <rect x={6} y={11} width={2} height={2} rx={0.3} fill={color} stroke="none" />
    <rect x={11} y={11} width={2} height={2} rx={0.3} fill={color} stroke="none" />
    <rect x={15} y={11} width={2} height={2} rx={0.3} fill={color} stroke="none" />
    <rect x={19} y={11} width={2} height={2} rx={0.3} fill={color} stroke="none" />
    <rect x={11} y={15} width={2} height={2} rx={0.3} fill={color} stroke="none" />
    <rect x={15} y={15} width={2} height={2} rx={0.3} fill={color} stroke="none" />
    <rect x={19} y={15} width={2} height={2} rx={0.3} fill={color} stroke="none" />
    <rect x={15} y={19} width={2} height={2} rx={0.3} fill={color} stroke="none" />
    <rect x={19} y={19} width={2} height={2} rx={0.3} fill={color} stroke="none" />
    <rect x={11} y={19} width={2} height={2} rx={0.3} fill={color} stroke="none" />
  </svg>
);

/**
 * IconCar - Top-down aerial view of a cab with roof rack/sign.
 */
export const IconCar: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Car body top-down - rounded rectangle shape */}
    <path d="M7 3h10c1.5 0 2.5 1 3 2.5l.5 2v9l-.5 2c-.5 1.5-1.5 2.5-3 2.5H7c-1.5 0-2.5-1-3-2.5L3.5 16.5v-9l.5-2C4.5 4 5.5 3 7 3z" />
    {/* Windshield (front) */}
    <path d="M7 6.5h10c.5 0 1 .3 1.2.8l.3 1.2H5.5l.3-1.2c.2-.5.7-.8 1.2-.8z" />
    {/* Rear window */}
    <path d="M7 17.5h10c.5 0 1-.3 1.2-.8l.3-1.2H5.5l.3 1.2c.2.5.7.8 1.2.8z" />
    {/* Roof rack / taxi sign on top */}
    <rect x={9} y={9.5} width={6} height={2.5} rx={0.8} />
    {/* Center line on roof sign */}
    <path d="M10 10.7h4" />
    {/* Side mirrors */}
    <path d="M3.5 7.5L2 7v1.5l1.5-.5" />
    <path d="M20.5 7.5L22 7v1.5l-1.5-.5" />
    {/* Wheel wells - top left */}
    <path d="M4 6c-.3.3-.5.8-.5 1.5v1" />
    {/* Wheel wells - top right */}
    <path d="M20 6c.3.3.5.8.5 1.5v1" />
    {/* Wheel wells - bottom left */}
    <path d="M4 18c-.3-.3-.5-.8-.5-1.5v-1" />
    {/* Wheel wells - bottom right */}
    <path d="M20 18c.3-.3.5-.8.5-1.5v-1" />
    {/* Hood center line */}
    <path d="M12 3v3" strokeWidth={0.8} opacity={0.5} />
    {/* Trunk center line */}
    <path d="M12 18v3" strokeWidth={0.8} opacity={0.5} />
    {/* Door seams */}
    <path d="M5 12h14" strokeWidth={0.5} opacity={0.3} />
  </svg>
);

// ============================================================================
// STATUS ICONS
// ============================================================================

/**
 * IconRideStart - Green flag with a car.
 */
export const IconRideStart: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Flag pole */}
    <path d="M5 2v20" />
    {/* Flag fabric - waving */}
    <path
      d="M5 3h12c1 0 1.5.5 1 1.5l-2 2.5 2 2.5c.5 1 0 1.5-1 1.5H5"
      fill="#22C55E"
      fillOpacity={0.2}
      stroke={color}
    />
    {/* Flag stripe */}
    <path d="M5 7h10.5" strokeWidth={0.8} opacity={0.5} />
    {/* Small car below flag */}
    <path d="M9 17h8l-.5-1.5-.5-.5H12l-2 1-.8.8L9 17z" />
    {/* Car wheels */}
    <circle cx={10.5} cy={17.5} r={0.8} />
    <circle cx={15.5} cy={17.5} r={0.8} />
    {/* Car window */}
    <path d="M12.5 15l.8-.8h1.5l.7.8" />
    {/* Motion lines behind car */}
    <path d="M7 16.5h1.5" strokeWidth={1} opacity={0.4} />
    <path d="M6.5 17.5h1.5" strokeWidth={1} opacity={0.4} />
  </svg>
);

/**
 * IconRideEnd - Checkered flag.
 */
export const IconRideEnd: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Flag pole */}
    <path d="M4 2v20" />
    {/* Flag outline */}
    <path d="M4 3h14c1 0 1.5.5 1 1.5l-2 3 2 3c.5 1 0 1.5-1 1.5H4" />
    {/* Checkered pattern - row 1 */}
    <rect x={4} y={3} width={2.8} height={2.5} fill={color} fillOpacity={0.7} stroke="none" />
    <rect x={9.6} y={3} width={2.8} height={2.5} fill={color} fillOpacity={0.7} stroke="none" />
    <rect x={15.2} y={3} width={2} height={2.5} fill={color} fillOpacity={0.7} stroke="none" />
    {/* Checkered pattern - row 2 */}
    <rect x={6.8} y={5.5} width={2.8} height={2.5} fill={color} fillOpacity={0.7} stroke="none" />
    <rect x={12.4} y={5.5} width={2.8} height={2.5} fill={color} fillOpacity={0.7} stroke="none" />
    {/* Checkered pattern - row 3 */}
    <rect x={4} y={8} width={2.8} height={2.5} fill={color} fillOpacity={0.7} stroke="none" />
    <rect x={9.6} y={8} width={2.8} height={2.5} fill={color} fillOpacity={0.7} stroke="none" />
    <rect x={15.2} y={8} width={2} height={2.5} fill={color} fillOpacity={0.7} stroke="none" />
    {/* Checkered pattern - row 4 */}
    <rect x={6.8} y={10.5} width={2.8} height={1.5} fill={color} fillOpacity={0.7} stroke="none" />
    <rect x={12.4} y={10.5} width={2.8} height={1.5} fill={color} fillOpacity={0.7} stroke="none" />
    {/* Ground line */}
    <path d="M2 22h20" strokeWidth={1} opacity={0.3} />
  </svg>
);

/**
 * IconPinPickup - Circle with dot, green fill.
 */
export const IconPinPickup: React.FC<IconProps> = ({
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Outer circle with green stroke */}
    <circle
      cx={12}
      cy={12}
      r={9}
      stroke="#22C55E"
      strokeWidth={1.5}
      fill="none"
    />
    {/* Middle ring */}
    <circle
      cx={12}
      cy={12}
      r={5.5}
      stroke="#22C55E"
      strokeWidth={1}
      fill="#22C55E"
      fillOpacity={0.15}
    />
    {/* Inner dot */}
    <circle
      cx={12}
      cy={12}
      r={2.5}
      fill="#22C55E"
      stroke="none"
    />
    {/* Highlight on dot */}
    <circle
      cx={11}
      cy={11}
      r={0.8}
      fill="#FFFFFF"
      fillOpacity={0.6}
      stroke="none"
    />
  </svg>
);

/**
 * IconPinDrop - Square pin, red fill.
 */
export const IconPinDrop: React.FC<IconProps> = ({
  size = 24,
  className,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Pin body - rounded square with pointer at bottom */}
    <path
      d="M6 3h12c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2h-4l-2 5-2-5H6c-1.1 0-2-.9-2-2V5c0-1.1.9-2 2-2z"
      fill="#EF4444"
      fillOpacity={0.15}
      stroke="#EF4444"
      strokeWidth={1.5}
    />
    {/* Inner square */}
    <rect
      x={8}
      y={5.5}
      width={8}
      height={7}
      rx={1}
      fill="#EF4444"
      fillOpacity={0.3}
      stroke="#EF4444"
      strokeWidth={1}
    />
    {/* Destination square icon */}
    <rect
      x={10}
      y={7}
      width={4}
      height={4}
      rx={0.5}
      fill="#EF4444"
      stroke="none"
    />
    {/* Highlight */}
    <path
      d="M10.5 7.5h1.5v1.5"
      stroke="#FFFFFF"
      strokeWidth={0.8}
      fill="none"
    />
  </svg>
);

// ============================================================================
// LOGO COMPONENTS
// ============================================================================

/**
 * LogoIcon - The ZipRide logo mark: a lightning bolt merged with a location pin.
 */
export const LogoIcon: React.FC<IconProps> = ({
  size = 24,
  className,
  color = "currentColor",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {/* Location pin outer shape */}
    <path d="M12 1C7.6 1 4 4.4 4 8.7 4 14.5 12 23 12 23s8-8.5 8-14.3C20 4.4 16.4 1 12 1z" />
    {/* Lightning bolt inside the pin */}
    <path
      d="M13.5 5L9 12h3l-1.5 7L16 12h-3l.5-7z"
      fill={color}
      fillOpacity={0.15}
      stroke={color}
      strokeWidth={1.5}
    />
    {/* Inner highlight arc on pin */}
    <path
      d="M8 5.5c-1.2 1.3-2 3-2 4.8"
      strokeWidth={1}
      opacity={0.3}
    />
  </svg>
);

/**
 * LogoFull - Logo mark + "ZipRide" text to the right.
 */
export const LogoFull: React.FC<IconProps & { textSize?: number }> = ({
  size = 24,
  className,
  color = "currentColor",
  textSize,
}) => {
  const computedTextSize = textSize || size * 0.4;
  return (
    <svg
      width={size * 4}
      height={size}
      viewBox="0 0 96 24"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Logo icon - pin with lightning bolt */}
      <g stroke={color} strokeWidth={1.5}>
        {/* Location pin outer shape */}
        <path d="M12 1C7.6 1 4 4.4 4 8.7 4 14.5 12 23 12 23s8-8.5 8-14.3C20 4.4 16.4 1 12 1z" />
        {/* Lightning bolt inside */}
        <path
          d="M13.5 5L9 12h3l-1.5 7L16 12h-3l.5-7z"
          fill={color}
          fillOpacity={0.15}
        />
      </g>

      {/* "ZipRide" text */}
      <g fill={color} stroke="none">
        {/* Z */}
        <path d="M28 8h6.5l-6.5 8.5h6.5" stroke={color} strokeWidth={2} fill="none" />
        {/* i */}
        <circle cx={38} cy={7.5} r={1} fill={color} />
        <path d="M38 10v6.5" stroke={color} strokeWidth={2} fill="none" />
        {/* p */}
        <path
          d="M41.5 10v10M41.5 12.5c0-1.4 1.1-2.5 2.5-2.5s2.5 1.1 2.5 2.5-1.1 2.5-2.5 2.5-2.5-1.1-2.5-2.5z"
          stroke={color}
          strokeWidth={2}
          fill="none"
        />
        {/* R */}
        <path
          d="M50 16.5V7.5h3c1.4 0 2.5 1 2.5 2.3s-1.1 2.2-2.5 2.2H50M53 12l2.5 4.5"
          stroke={color}
          strokeWidth={2}
          fill="none"
        />
        {/* i */}
        <circle cx={59} cy={7.5} r={1} fill={color} />
        <path d="M59 10v6.5" stroke={color} strokeWidth={2} fill="none" />
        {/* d */}
        <path
          d="M65.5 7v9.5M65.5 12.5c0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5 1.1 2.5 2.5 2.5 2.5-1.1 2.5-2.5z"
          stroke={color}
          strokeWidth={2}
          fill="none"
        />
        {/* e */}
        <path
          d="M68.5 12.8h5c0-1.5-1.1-2.8-2.5-2.8s-2.5 1.3-2.5 2.8c0 1.7 1.1 2.8 2.5 2.8 1 0 1.8-.5 2.2-1.3"
          stroke={color}
          strokeWidth={2}
          fill="none"
        />
      </g>
    </svg>
  );
};

// ============================================================================
// EXPORT ALL
// ============================================================================
// All icons are already exported as named exports above.
// This default export provides convenient access to the full collection.
// ============================================================================

const ZipRideIcons = {
  // Vehicle
  IconZipMini,
  IconZipGo,
  IconZipPrime,
  // Payment
  IconGPay,
  IconPhonePe,
  IconPaytm,
  IconBHIM,
  IconVisa,
  IconMastercard,
  IconRuPay,
  IconUPI,
  // App
  IconHome,
  IconMyRides,
  IconWallet,
  IconProfile,
  IconMap,
  IconShield,
  IconStar,
  IconSOS,
  IconQR,
  IconCar,
  // Status
  IconRideStart,
  IconRideEnd,
  IconPinPickup,
  IconPinDrop,
  // Logo
  LogoIcon,
  LogoFull,
};

export default ZipRideIcons;
