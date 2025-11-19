'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface ArrowSymbolsProps {
  variant?: 'diagonal' | 'right' | 'down' | 'mixed';
  className?: string;
  animate?: boolean;
}

/**
 * Arrow Symbols Visual Language
 *
 * Creates premium visual punctuation using arrows
 * Inspired by Boulder Group's distinctive typography
 */
export default function ArrowSymbols({
  variant = 'mixed',
  className = '',
  animate = true
}: ArrowSymbolsProps) {
  const symbols = {
    diagonal: '↘',
    right: '►',
    down: '⮧',
    mixed: '↘ ► ⮧',
  };

  const symbol = symbols[variant];

  if (!animate) {
    return <span className={`text-[#C8102E] ${className}`}>{symbol}</span>;
  }

  return (
    <motion.span
      animate={{
        opacity: [0.4, 1, 0.4],
        scale: [1, 1.1, 1],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={`inline-block text-[#C8102E] ${className}`}
    >
      {symbol}
    </motion.span>
  );
}

/**
 * Numbered Section with Arrow
 *
 * Creates numbered navigation items like "① About ↘"
 */
export function NumberedSection({
  number,
  label,
  isActive = false,
  onClick
}: {
  number: number;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}) {
  const circledNumbers = ['⓪', '①', '②', '③', '④', '⑤', '⑥', '⑦', '⑧', '⑨', '⑩',
                          '⑪', '⑫', '⑬', '⑭', '⑮'];

  return (
    <motion.button
      whileHover={{ scale: 1.05, x: 5 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`flex items-center gap-2 font-mono transition-colors ${
        isActive ? 'text-white' : 'text-gray-500 hover:text-gray-300'
      }`}
    >
      <span className="text-[#C8102E]">{circledNumbers[number]}</span>
      <span className="font-semibold tracking-wider">{label}</span>
      <ArrowSymbols variant="diagonal" className="text-sm" />
    </motion.button>
  );
}
