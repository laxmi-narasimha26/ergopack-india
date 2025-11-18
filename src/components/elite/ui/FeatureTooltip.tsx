'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Premium Feature Tooltip Component
 * Displays detailed explanations for complex product features on hover
 * Designed for ultra-premium aesthetics with smooth animations
 */

interface FeatureTooltipProps {
  feature: string;
  explanation: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export default function FeatureTooltip({
  feature,
  explanation,
  children,
  position = 'top',
  delay = 300,
}: FeatureTooltipProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setIsHovered(true);
    }, delay);
    setTimeoutId(id);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    setIsHovered(false);
  };

  const getPositionStyles = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-3';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-3';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-3';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-3';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-3';
    }
  };

  const getArrowStyles = () => {
    switch (position) {
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 -mt-px border-t-[#1A0000] border-l-transparent border-r-transparent border-b-transparent';
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 -mb-px border-b-[#1A0000] border-l-transparent border-r-transparent border-t-transparent';
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 -ml-px border-l-[#1A0000] border-t-transparent border-b-transparent border-r-transparent';
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 -mr-px border-r-[#1A0000] border-t-transparent border-b-transparent border-l-transparent';
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 -mt-px border-t-[#1A0000] border-l-transparent border-r-transparent border-b-transparent';
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Trigger element with visual indicator */}
      <div className="relative group cursor-help">
        {children}
        {/* Subtle indicator that tooltip is available */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-[#FFB81C] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Tooltip content */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: position === 'top' ? 10 : -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: position === 'top' ? 10 : -10 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute z-50 ${getPositionStyles()}`}
            style={{ pointerEvents: 'none' }}
          >
            <div className="relative">
              {/* Main tooltip container */}
              <div className="bg-gradient-to-br from-[#1A0000] to-black backdrop-blur-2xl border-2 border-[#C8102E]/50 rounded-xl shadow-2xl max-w-sm">
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8102E]/10 to-[#FFB81C]/10 rounded-xl blur-xl" />

                {/* Content */}
                <div className="relative p-6">
                  {/* Feature name */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-1 h-6 bg-gradient-to-b from-[#C8102E] to-[#FFB81C] rounded-full" />
                    <h4 className="text-sm font-bold text-[#FFB81C] uppercase tracking-wider">
                      {feature}
                    </h4>
                  </div>

                  {/* Explanation */}
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {explanation}
                  </p>

                  {/* Bottom accent */}
                  <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#C8102E]/50 to-transparent" />

                  {/* Subtle badge */}
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-gray-600 font-mono uppercase tracking-wider">
                      Technical Detail
                    </span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 bg-[#C8102E] rounded-full animate-pulse" />
                      <div className="w-1 h-1 bg-[#FFB81C] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1 h-1 bg-[#00D9FF] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div
                className={`absolute w-0 h-0 border-8 ${getArrowStyles()}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Compact inline version for shorter explanations
 */
export function InlineTooltip({
  text,
  children,
}: {
  text: string;
  children: React.ReactNode;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative inline-block cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="border-b border-dashed border-[#FFB81C]/50 hover:border-[#FFB81C] transition-colors duration-300">
        {children}
      </span>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50"
            style={{ pointerEvents: 'none' }}
          >
            <div className="bg-black/95 backdrop-blur-md border border-[#C8102E]/50 rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
              <p className="text-xs text-gray-300">{text}</p>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-px w-0 h-0 border-4 border-t-black/95 border-l-transparent border-r-transparent border-b-transparent" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
