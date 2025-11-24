'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface GlitchTextProps {
  text: string;
  className?: string;
  triggerOnView?: boolean;
}

/**
 * Glitch Text Effect (Boulder Group inspired)
 *
 * Features:
 * - Random character replacement glitch
 * - Color shift effect
 * - Trigger on scroll into view
 * - Premium cyberpunk aesthetic
 */
export default function GlitchText({
  text,
  className = '',
  triggerOnView = true,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchChars = '▀▁▂▃▄▅▆▇█▉▊▋▌▍▎▏░▒▓↘►⮧01';

  const triggerGlitch = () => {
    setIsGlitching(true);

    let iterations = 0;
    const maxIterations = 10;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations) return text[index];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('')
      );

      iterations += 1;

      if (iterations > maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, 50);
  };

  return (
    <motion.span
      initial={triggerOnView ? { opacity: 0 } : {}}
      whileInView={triggerOnView ? { opacity: 1 } : {}}
      onViewportEnter={triggerOnView ? triggerGlitch : undefined}
      viewport={{ once: true }}
      onMouseEnter={() => !isGlitching && triggerGlitch()}
      className={`inline-block cursor-pointer ${className}`}
      style={{
        textShadow: isGlitching ? '2px 2px 0px #C8102E, -2px -2px 0px #00D9FF' : 'none',
      }}
    >
      {displayText}
    </motion.span>
  );
}
