'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  sectionNumber: number;
  className?: string;
}

/**
 * Reusable Section Wrapper
 *
 * Provides:
 * - Full viewport height
 * - Scroll-triggered animations
 * - Fade-in effects
 * - Consistent spacing
 */
export default function SectionWrapper({ children, sectionNumber, className = '' }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <motion.section
      ref={sectionRef}
      style={{ opacity, y }}
      className={`relative min-h-screen flex items-center justify-center px-8 ${className}`}
    >
      <div className="max-w-7xl mx-auto w-full">{children}</div>
    </motion.section>
  );
}
