'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

/**
 * Circular Section Badge (Bottom-left)
 *
 * Features:
 * - Circle with red border
 * - Current section number inside
 * - Smooth number transitions
 * - Professional presentation aesthetic
 */
export default function SectionBadge() {
  const [currentSection, setCurrentSection] = useState(1);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const section = Math.min(Math.ceil(latest * 15) || 1, 15);
      setCurrentSection(section);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-12 left-12 z-50"
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Outer Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-[#C8102E] opacity-60" />

        {/* Inner Ring (Animated) */}
        <motion.div
          key={currentSection}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-full border-2 border-[#C8102E]"
        />

        {/* Number */}
        <motion.span
          key={currentSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-white text-3xl font-bold font-mono relative z-10"
        >
          {currentSection}
        </motion.span>
      </div>
    </motion.div>
  );
}
