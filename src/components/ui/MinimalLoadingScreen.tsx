'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MinimalLoadingScreenProps {
  onLoadingComplete?: () => void;
}

/**
 * Minimal Premium Loading Screen
 *
 * Features:
 * - Elegant minimalist design
 * - Smooth geometric animations
 * - Premium color palette (platinum/charcoal)
 * - Fast and lightweight
 * - NO crimson red background
 */
export function MinimalLoadingScreen({ onLoadingComplete }: MinimalLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Fast loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            onLoadingComplete?.();
          }, 400);
          return 100;
        }
        return prev + Math.random() * 20;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-black"
        >
          {/* Subtle animated orbs */}
          <div className="absolute inset-0 overflow-hidden opacity-20">
            <motion.div
              className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 30, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-1/3 left-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-3xl"
              animate={{
                scale: [1.2, 1, 1.2],
                x: [0, -30, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center gap-12">
            {/* Geometric Logo Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative"
            >
              {/* Hexagon Shape */}
              <svg width="100" height="100" viewBox="0 0 100 100" className="relative z-10">
                {/* Outer hexagon */}
                <motion.path
                  d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
                  stroke="url(#premiumGradient)"
                  strokeWidth="1.5"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />

                {/* Inner hexagon */}
                <motion.path
                  d="M50 20 L75 35 L75 65 L50 80 L25 65 L25 35 Z"
                  stroke="url(#premiumGradient)"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2, delay: 0.3, ease: 'easeInOut' }}
                />

                {/* Center circle */}
                <motion.circle
                  cx="50"
                  cy="50"
                  r="8"
                  fill="url(#premiumGradient)"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1 }}
                />

                <defs>
                  <linearGradient id="premiumGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#E5E7EB" />
                    <stop offset="50%" stopColor="#9CA3AF" />
                    <stop offset="100%" stopColor="#6B7280" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-xl opacity-30"
                style={{
                  background: 'radial-gradient(circle, #9CA3AF 0%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
              />
            </motion.div>

            {/* Brand Name */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col items-center gap-3"
            >
              <h1 className="font-sans text-3xl font-light tracking-[0.3em] text-gray-100">
                ERGOPACK
              </h1>
              <div className="h-px w-40 bg-gradient-to-r from-transparent via-gray-500 to-transparent" />
              <p className="font-sans text-xs tracking-[0.25em] text-gray-500 uppercase">India</p>
            </motion.div>

            {/* Minimal Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="w-72"
            >
              <div className="h-px overflow-hidden bg-gray-800/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>

              {/* Progress percentage */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-center font-sans text-xs tracking-widest text-gray-600"
              >
                {Math.round(progress)}%
              </motion.p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
