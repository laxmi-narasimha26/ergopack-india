'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Standard Preloader with Brand Animation
 *
 * Features:
 * - Red rotating circle with 100% text in background
 * - ERGOPACK and INDIA text in foreground
 * - Pentagon line border around text
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
        setTimeout(() => setLoading(false), 300);
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
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 z-[10000] bg-white flex items-center justify-center"
        >
          {/* Red rotating circle in background with 100% text */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="relative w-64 h-64"
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            >
              {/* Outer circle */}
              <svg
                className="w-full h-full"
                viewBox="0 0 256 256"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="128"
                  cy="128"
                  r="120"
                  stroke="#9B1C1C"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="754"
                  strokeDashoffset={754 - (754 * progress) / 100}
                  className="transition-all duration-100"
                />
              </svg>

              {/* 100% text in the circle */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: progress >= 100 ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-6xl font-black text-[#9B1C1C]/30">
                  {progress}%
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* ERGOPACK and INDIA text with pentagon border in foreground */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Pentagon border */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Pentagon SVG border */}
              <svg
                className="absolute -inset-12 w-[calc(100%+6rem)] h-[calc(100%+6rem)]"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M100 10 L190 75 L155 170 L45 170 L10 75 Z"
                  stroke="#9B1C1C"
                  strokeWidth="2"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
              </svg>

              {/* Text content */}
              <div className="relative px-8 py-6">
                <motion.h1
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-5xl font-black tracking-tighter text-[#1A1A1A] mb-1"
                >
                  ERGOPACK
                </motion.h1>
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="h-px bg-gradient-to-r from-transparent via-[#9B1C1C] to-transparent mb-1"
                />
                <motion.p
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="text-2xl font-bold tracking-[0.3em] text-[#9B1C1C] text-center"
                >
                  INDIA
                </motion.p>
              </div>
            </motion.div>
          </div>

          {/* Loading dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-20 flex gap-2"
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full bg-[#9B1C1C]"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
