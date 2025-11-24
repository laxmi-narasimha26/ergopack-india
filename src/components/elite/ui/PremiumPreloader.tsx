'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Premium Preloader with Brand Animation
 *
 * Features:
 * - Animated Ergopack logo reveal
 * - Loading progress bar with percentage
 * - Glitch effect on logo
 * - Smooth curtain exit transition
 * - Performance metrics display
 */
export default function PremiumPreloader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('INITIALIZING');

  useEffect(() => {
    const stages = [
      { percent: 20, text: 'LOADING ASSETS' },
      { percent: 40, text: 'RENDERING 3D SCENE' },
      { percent: 60, text: 'OPTIMIZING PERFORMANCE' },
      { percent: 80, text: 'PREPARING EXPERIENCE' },
      { percent: 100, text: 'READY' },
    ];

    let currentStage = 0;

    const interval = setInterval(() => {
      if (currentStage < stages.length) {
        setProgress(stages[currentStage].percent);
        setLoadingText(stages[currentStage].text);
        currentStage++;
      } else {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 400);
      }
    }, 320); // Sped up by 20% (was 400ms)

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
        >
          {/* Animated Grid Background */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                linear-gradient(#C8102E 1px, transparent 1px),
                linear-gradient(90deg, #C8102E 1px, transparent 1px)
              `,
                backgroundSize: '50px 50px',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 text-center">
            {/* Logo with Glitch Effect */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mb-12"
            >
              <motion.h1
                animate={{
                  textShadow: [
                    '0 0 0px #C8102E',
                    '2px 2px 4px #C8102E, -2px -2px 4px #FFB81C',
                    '0 0 0px #C8102E',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                className="text-8xl font-black tracking-tighter"
              >
                <span className="text-white">ERGO</span>
                <span className="text-[#C8102E]">PACK</span>
              </motion.h1>
              <p className="text-gray-500 text-sm mt-2 tracking-[0.3em]">E L I T E</p>
            </motion.div>

            {/* Progress Bar */}
            <div className="w-[400px] mx-auto">
              <div className="h-1 bg-gray-900 rounded-full overflow-hidden mb-4">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-[#C8102E] to-[#FFB81C]"
                />
              </div>

              {/* Loading Text & Percentage */}
              <div className="flex justify-between items-center text-xs font-mono">
                <motion.span
                  key={loadingText}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-gray-600 tracking-wider"
                >
                  {loadingText}
                </motion.span>
                <span className="text-[#FFB81C] font-bold">{progress}%</span>
              </div>
            </div>

            {/* Arrow Symbols */}
            <motion.div
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="mt-8 text-gray-700 text-2xl"
            >
              ↘ ► ↘
            </motion.div>
          </div>

          {/* Curtain Exit Effect */}
          {progress === 100 && (
            <>
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute top-0 left-0 right-0 h-1/2 bg-[#C8102E] origin-top"
              />
              <motion.div
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#C8102E] origin-bottom"
              />
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
