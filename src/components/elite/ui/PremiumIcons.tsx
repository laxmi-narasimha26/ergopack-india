'use client';

import React from 'react';

/**
 * Premium Icon Library - Replaces all emojis with sophisticated SVG icons
 * Designed to maintain premium aesthetics across the Elite presentation
 */

interface IconProps {
  className?: string;
  size?: number;
  color?: string;
}

// Package Entry Icon
export const PackageEntryIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M24 4L6 12V28C6 36.84 13.92 44 24 44C34.08 44 42 36.84 42 28V12L24 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M24 4V44M6 12L24 20L42 12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Strap Feeding Icon (Circular flow)
export const StrapFeedingIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
    <path
      d="M24 6V12M42 24H36M24 42V36M6 24H12"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M32 16L38 10M38 38L32 32M16 32L10 38M10 10L16 16"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <circle cx="24" cy="24" r="4" fill={color} />
  </svg>
);

// Precision Tensioning Icon (Bolt with precision marker)
export const PrecisionTensionIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M26 4L14 22H24L22 44L34 26H24L26 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={`${color}33`}
    />
    <circle cx="38" cy="10" r="6" stroke={color} strokeWidth="1.5" fill="none" />
    <path d="M38 7V13M35 10H41" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

// Heat Sealing Icon (Flame with waves)
export const HeatSealingIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M24 4C24 4 14 14 14 24C14 29.5 18.5 34 24 34C29.5 34 34 29.5 34 24C34 14 24 4 24 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={`${color}33`}
    />
    <path
      d="M24 44C24 44 20 40 20 36C20 33.79 21.79 32 24 32C26.21 32 28 33.79 28 36C28 40 24 44 24 44Z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill={`${color}66`}
    />
    <path
      d="M8 40C10 38 10 36 8 34M16 42C18 40 18 38 16 36M32 42C34 40 34 38 32 36M40 40C42 38 42 36 40 34"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

// Success/Complete Icon (Premium checkmark)
export const CompleteIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="2" />
    <path
      d="M14 24L20 30L34 16"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="24"
      cy="24"
      r="22"
      stroke={color}
      strokeWidth="1"
      opacity="0.3"
      strokeDasharray="4 4"
    />
  </svg>
);

// Speed/Performance Icon
export const SpeedIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M42 24C42 33.94 33.94 42 24 42C14.06 42 6 33.94 6 24C6 14.06 14.06 6 24 6C33.94 6 42 14.06 42 24Z"
      stroke={color}
      strokeWidth="2"
    />
    <path d="M24 24L34 14" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="24" cy="24" r="3" fill={color} />
    <path
      d="M14 32C16 28 20 26 24 26"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="2 2"
      opacity="0.5"
    />
  </svg>
);

// Strength Icon
export const StrengthIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M8 24H14M34 24H40" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
    <rect x="14" y="18" width="6" height="12" stroke={color} strokeWidth="2" fill={`${color}33`} />
    <rect x="28" y="18" width="6" height="12" stroke={color} strokeWidth="2" fill={`${color}33`} />
    <rect x="20" y="12" width="8" height="24" stroke={color} strokeWidth="2" fill={`${color}66`} />
    <path
      d="M24 8L24 40"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="2 2"
      opacity="0.4"
    />
  </svg>
);

// Energy/Battery Icon
export const EnergyIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="10" y="14" width="28" height="20" rx="2" stroke={color} strokeWidth="2" />
    <rect x="38" y="20" width="4" height="8" rx="1" fill={color} />
    <path d="M26 20L20 26H24L22 34L28 28H24L26 20Z" fill={color} opacity="0.8" />
    <path d="M14 18H34" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
  </svg>
);

// Timer/Cycle Icon
export const TimerIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="24" cy="26" r="16" stroke={color} strokeWidth="2" />
    <path d="M24 26V16M24 26L32 32" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path d="M18 8H30M24 8V10" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="26" r="2" fill={color} />
  </svg>
);

// Global/World Icon
export const GlobalIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2" />
    <path
      d="M6 24H42M24 6C18 12 18 36 24 42M24 6C30 12 30 36 24 42"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <ellipse cx="24" cy="24" rx="8" ry="18" stroke={color} strokeWidth="2" />
  </svg>
);

// Certificate/Quality Icon
export const CertificateIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="8" y="6" width="32" height="28" rx="2" stroke={color} strokeWidth="2" />
    <path
      d="M16 38L20 34L24 42L28 34L32 38V28H16V38Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
      fill={`${color}33`}
    />
    <path
      d="M16 16H32M16 22H28"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
    <circle cx="24" cy="16" r="6" stroke={color} strokeWidth="2" fill={`${color}22`} />
  </svg>
);

// Precision/Target Icon
export const PrecisionIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <circle cx="24" cy="24" r="4" fill={color} />
    <circle cx="24" cy="24" r="8" stroke={color} strokeWidth="2" />
    <circle cx="24" cy="24" r="14" stroke={color} strokeWidth="2" />
    <circle cx="24" cy="24" r="20" stroke={color} strokeWidth="1.5" opacity="0.5" />
    <path
      d="M24 2V8M24 40V46M2 24H8M40 24H46"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Innovation/Lightbulb Icon
export const InnovationIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M24 4C18 4 13 9 13 15C13 20 15 23 18 26V32H30V26C33 23 35 20 35 15C35 9 30 4 24 4Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
      fill={`${color}22`}
    />
    <path d="M18 36H30M20 40H28M22 44H26" stroke={color} strokeWidth="2" strokeLinecap="round" />
    <path
      d="M24 12V18M18 15L20 17M30 15L28 17"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.6"
    />
  </svg>
);

// Industry/Factory Icon
export const IndustryIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M6 42H42M8 42V26L18 20V28L28 22V42M30 42V18L40 12V42"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 30H16M14 36H16M22 26H24M22 32H24M22 38H24M34 22H36M34 28H36M34 34H36"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M18 6V12M22 8V14M26 6V12"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

// Support/Handshake Icon
export const SupportIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M20 20L14 26L18 30L12 36M28 20L34 26L30 30L36 36"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 12C16 12 20 8 24 8C28 8 32 12 32 12L28 16H20L16 12Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
      fill={`${color}33`}
    />
    <circle cx="12" cy="36" r="4" stroke={color} strokeWidth="2" fill={`${color}33`} />
    <circle cx="36" cy="36" r="4" stroke={color} strokeWidth="2" fill={`${color}33`} />
  </svg>
);

// Sustainability/Leaf Icon
export const SustainabilityIcon: React.FC<IconProps> = ({
  className = '',
  size = 48,
  color = 'currentColor',
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 36C12 36 8 28 8 20C8 12 12 6 20 6C28 6 36 10 40 16C40 16 32 12 24 16C16 20 12 28 12 36Z"
      stroke={color}
      strokeWidth="2"
      strokeLinejoin="round"
      fill={`${color}22`}
    />
    <path
      d="M12 36C12 36 16 40 24 40C32 40 40 36 40 36"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path
      d="M20 16C20 16 24 20 24 26M28 20C28 20 30 24 30 28"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      opacity="0.5"
    />
  </svg>
);

export const PremiumIcons = {
  PackageEntry: PackageEntryIcon,
  StrapFeeding: StrapFeedingIcon,
  PrecisionTension: PrecisionTensionIcon,
  HeatSealing: HeatSealingIcon,
  Complete: CompleteIcon,
  Speed: SpeedIcon,
  Strength: StrengthIcon,
  Energy: EnergyIcon,
  Timer: TimerIcon,
  Global: GlobalIcon,
  Certificate: CertificateIcon,
  Precision: PrecisionIcon,
  Innovation: InnovationIcon,
  Industry: IndustryIcon,
  Support: SupportIcon,
  Sustainability: SustainabilityIcon,
};
