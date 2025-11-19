'use client';

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ScrollProgressProps {
  totalSections: number;
}

/**
 * Scroll Progress Counter (01/15 format)
 *
 * Top-right corner indicator showing:
 * - Current section number
 * - Total sections
 * - Smooth transitions between numbers
 */
export default function ScrollProgress({ totalSections }: ScrollProgressProps) {
  const [currentSection, setCurrentSection] = useState(1);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const section = Math.min(Math.ceil(latest * totalSections) || 1, totalSections);
      setCurrentSection(section);
    });

    return () => unsubscribe();
  }, [scrollYProgress, totalSections]);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-8 right-8 z-50 text-white font-mono"
    >
      <div className="flex items-baseline gap-1">
        <motion.span
          key={currentSection}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-4xl font-bold"
        >
          {String(currentSection).padStart(2, '0')}
        </motion.span>
        <span className="text-2xl text-gray-500">/</span>
        <span className="text-2xl text-gray-500">{String(totalSections).padStart(2, '0')}</span>
      </div>
      <motion.div
        className="h-0.5 bg-[#C8102E] mt-2"
        style={{
          width: useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
        }}
      />
    </motion.div>
  );
}
