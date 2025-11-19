'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';

/**
 * Premium Theme Toggle Component
 * Switches between dark and light modes with sophisticated animation
 */
export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      className="fixed top-24 right-8 z-50 group"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
    >
      <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 to-black dark:from-white dark:to-gray-200 border-2 border-gray-700 dark:border-gray-300 shadow-2xl flex items-center justify-center overflow-hidden backdrop-blur-xl">
        {/* Background glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#C8102E]/20 to-[#FFB81C]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Icon container */}
        <AnimatePresence mode="wait">
          {theme === 'dark' ? (
            <motion.div
              key="sun"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Sun icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#FFB81C]"
              >
                <circle cx="12" cy="12" r="5" fill="currentColor" />
                <path
                  d="M12 1V3M12 21V23M23 12H21M3 12H1M20.49 3.51L19.07 4.93M4.93 19.07L3.51 20.49M20.49 20.49L19.07 19.07M4.93 4.93L3.51 3.51"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </motion.div>
          ) : (
            <motion.div
              key="moon"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {/* Moon icon */}
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gray-900"
              >
                <path
                  d="M21 12.79C20.74 15.62 19.17 18.12 16.87 19.62C14.57 21.12 11.73 21.46 9.17 20.57C6.61 19.68 4.55 17.65 3.66 15.09C2.77 12.53 3.11 9.69 4.61 7.39C6.11 5.09 8.61 3.52 11.44 3.26C11.3 3.83 11.23 4.41 11.23 5C11.23 9.42 14.81 13 19.23 13C19.82 13 20.4 12.93 20.97 12.79H21Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-[#C8102E]"
          initial={{ scale: 1, opacity: 0 }}
          whileHover={{ scale: 1.4, opacity: [0, 0.5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        />
      </div>

      {/* Tooltip */}
      <div className="absolute top-full right-0 mt-2 px-3 py-1 bg-black/90 dark:bg-white/90 backdrop-blur-md rounded-lg text-xs text-white dark:text-black font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        {theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        <div className="absolute -top-1 right-6 w-2 h-2 bg-black/90 dark:bg-white/90 rotate-45" />
      </div>
    </motion.button>
  );
}
