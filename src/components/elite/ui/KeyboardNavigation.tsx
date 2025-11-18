'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Keyboard Navigation System
 *
 * Controls:
 * - ↓/Space: Next section
 * - ↑: Previous section
 * - Home: Jump to top
 * - End: Jump to bottom
 * - Numbers 1-9: Jump to specific section
 */
export default function KeyboardNavigation() {
  const [showHint, setShowHint] = useState(true);
  const [lastKey, setLastKey] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const sections = document.querySelectorAll('section, [data-section]');
      const currentScroll = window.scrollY;
      const windowHeight = window.innerHeight;

      // Find current section
      let currentSection = 0;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          currentSection = index;
        }
      });

      switch (e.key) {
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          if (currentSection < sections.length - 1) {
            sections[currentSection + 1].scrollIntoView({ behavior: 'smooth' });
            setLastKey('↓');
          }
          break;

        case 'ArrowUp':
          e.preventDefault();
          if (currentSection > 0) {
            sections[currentSection - 1].scrollIntoView({ behavior: 'smooth' });
            setLastKey('↑');
          }
          break;

        case 'Home':
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setLastKey('Home');
          break;

        case 'End':
          e.preventDefault();
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
          setLastKey('End');
          break;

        // Number keys 1-9 for direct section navigation
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          e.preventDefault();
          const sectionIndex = parseInt(e.key) - 1;
          if (sections[sectionIndex]) {
            sections[sectionIndex].scrollIntoView({ behavior: 'smooth' });
            setLastKey(e.key);
          }
          break;
      }

      setShowHint(false);
      setTimeout(() => setShowHint(false), 3000);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Hide hint after first scroll
    const handleScroll = () => setShowHint(false);
    window.addEventListener('scroll', handleScroll, { once: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Keyboard Hint (appears on load) */}
      <AnimatePresence>
        {showHint && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, delay: 2 }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40"
          >
            <div className="bg-black/80 backdrop-blur-md border border-[#4A0000] px-6 py-3 rounded-full">
              <div className="flex items-center gap-4 text-sm font-mono">
                <span className="text-gray-500">Navigate:</span>
                <kbd className="px-2 py-1 bg-gray-800 text-white rounded text-xs">↑ ↓</kbd>
                <kbd className="px-2 py-1 bg-gray-800 text-white rounded text-xs">1-9</kbd>
                <kbd className="px-2 py-1 bg-gray-800 text-white rounded text-xs">Home</kbd>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Key Press Indicator */}
      <AnimatePresence>
        {lastKey && (
          <motion.div
            key={lastKey}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-32 right-12 z-40 pointer-events-none"
          >
            <div className="bg-[#C8102E] text-white px-4 py-2 rounded-lg font-mono font-bold text-lg shadow-2xl shadow-[#C8102E]/50">
              {lastKey}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
