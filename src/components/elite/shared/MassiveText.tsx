'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface MassiveTextProps {
  text: string;
  className?: string;
}

/**
 * Massive Scaling Text Overlay
 *
 * Text that:
 * - Starts at 60px
 * - Scales up to 200px+ at peak
 * - Scales back down
 * - Creates dramatic emphasis
 */
export default function MassiveText({ text, className = '' }: MassiveTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0.3, 1, 1.5, 1, 0.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0, 1, 1, 1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className={`text-white font-black text-center leading-none ${className}`}
    >
      <h2 className="text-6xl md:text-9xl lg:text-[12rem] xl:text-[15rem] tracking-tight">
        {text}
      </h2>
    </motion.div>
  );
}
