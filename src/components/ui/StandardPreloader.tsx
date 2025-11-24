'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Standard Preloader with Complete Crimson Background
 *
 * Features:
 * - Full crimson red background
 * - Animated ERGOPACK logo reveal
 * - Loading progress bar with percentage
 * - Smooth fade out transition
 */
export default function StandardPreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress animation
    const duration = 2000; // 2 seconds total
    const steps = 100;
    const interval = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += 1;
      setProgress(current);

      if (current >= 100) {
        clearInterval(timer);
        setTimeout(() => setLoading(false), 400);
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-gradient-to-br from-crimson-600 via-crimson-700 to-crimson-800 flex items-center justify-center"
        >
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black,transparent)]" />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-12">
            {/* Logo Animation */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 1,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex flex-col items-center gap-6"
            >
              {/* Geometric Logo Mark */}
              <div className="relative">
                <svg width="120" height="120" viewBox="0 0 120 120" className="relative z-10">
                  {/* Outer hexagon */}
                  <motion.path
                    d="M60 10 L100 32.5 L100 77.5 L60 100 L20 77.5 L20 32.5 Z"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 2, ease: 'easeInOut' }}
                  />

                  {/* Inner diamond */}
                  <motion.path
                    d="M60 30 L85 55 L60 80 L35 55 Z"
                    stroke="white"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 2.5, delay: 0.3, ease: 'easeInOut' }}
                  />

                  {/* Center E */}
                  <motion.text
                    x="60"
                    y="66"
                    textAnchor="middle"
                    className="font-serif text-3xl font-bold fill-white"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 1.2 }}
                  >
                    E
                  </motion.text>
                </svg>

                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 blur-2xl opacity-60"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)',
                  }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.4, 0.7, 0.4],
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
                className="flex flex-col items-center gap-2"
              >
                <h1 className="font-serif text-5xl font-bold tracking-wider text-white">
                  ERGOPACK
                </h1>
                <div className="h-px w-40 bg-gradient-to-r from-transparent via-white to-transparent" />
                <p className="font-sans text-sm tracking-[0.3em] text-white/90">INDIA</p>
              </motion.div>
            </motion.div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
              className="w-80"
            >
              <div className="h-1 overflow-hidden bg-white/20 rounded-full">
                <motion.div
                  className="h-full bg-white rounded-full shadow-lg shadow-white/50"
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
              </div>

              {/* Progress percentage */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-4 text-center font-sans text-sm tracking-wider text-white/80"
              >
                {Math.round(progress)}%
              </motion.p>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5 }}
              className="font-sans text-base italic tracking-wide text-white/70"
            >
              Crafting Excellence
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
