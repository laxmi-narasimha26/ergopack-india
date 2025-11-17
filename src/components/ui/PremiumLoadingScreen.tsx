'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PremiumLoadingScreenProps {
  onLoadingComplete?: () => void;
}

export function PremiumLoadingScreen({ onLoadingComplete }: PremiumLoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsComplete(true);
            onLoadingComplete?.();
          }, 800);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.77, 0, 0.175, 1] } }}
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-luxury-space-black"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute inset-0 opacity-20"
              animate={{
                background: [
                  'radial-gradient(circle at 20% 50%, #9B1C1C 0%, transparent 50%)',
                  'radial-gradient(circle at 80% 50%, #9B1C1C 0%, transparent 50%)',
                  'radial-gradient(circle at 50% 80%, #9B1C1C 0%, transparent 50%)',
                  'radial-gradient(circle at 20% 50%, #9B1C1C 0%, transparent 50%)',
                ],
              }}
              transition={{
                duration: 8,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative flex flex-col items-center gap-12">
            {/* Logo Animation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center gap-6"
            >
              {/* Geometric Logo Mark */}
              <div className="relative">
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  className="relative z-10"
                >
                  {/* Outer ring */}
                  <motion.circle
                    cx="40"
                    cy="40"
                    r="38"
                    stroke="url(#crimsonGradient)"
                    strokeWidth="1"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />

                  {/* Inner geometric pattern */}
                  <motion.path
                    d="M40 10 L65 30 L65 50 L40 70 L15 50 L15 30 Z"
                    stroke="url(#crimsonGradient)"
                    strokeWidth="1.5"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, delay: 0.3, ease: 'easeInOut' }}
                  />

                  {/* Center E */}
                  <motion.text
                    x="40"
                    y="48"
                    textAnchor="middle"
                    className="font-serif text-2xl font-bold fill-crimson-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    E
                  </motion.text>

                  <defs>
                    <linearGradient id="crimsonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#9B1C1C" />
                      <stop offset="50%" stopColor="#CC0000" />
                      <stop offset="100%" stopColor="#9B1C1C" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 blur-xl opacity-40"
                  style={{
                    background: 'radial-gradient(circle, #9B1C1C 0%, transparent 70%)',
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{
                    duration: 3,
                    ease: 'easeInOut',
                    repeat: Infinity,
                  }}
                />
              </div>

              {/* Brand Name */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="flex flex-col items-center gap-1"
              >
                <h1 className="font-serif text-3xl font-bold tracking-wider text-luxury-off-white">
                  ERGOPACK
                </h1>
                <div className="h-px w-32 bg-gradient-to-r from-transparent via-crimson-500 to-transparent" />
                <p className="font-sans text-xs tracking-[0.2em] text-platinum-400">
                  INDIA
                </p>
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="w-64"
            >
              <div className="h-px overflow-hidden bg-platinum-800">
                <motion.div
                  className="h-full bg-gradient-to-r from-crimson-500 via-ruby-500 to-crimson-600"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>

              {/* Progress percentage */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-3 text-center font-sans text-xs tracking-wider text-platinum-500"
              >
                {Math.round(progress)}%
              </motion.p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="font-sans text-sm italic tracking-wide text-platinum-600"
            >
              Crafting Excellence
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
