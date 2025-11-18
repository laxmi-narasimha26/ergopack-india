'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Custom Cursor Effect
 *
 * Premium cursor with:
 * - Smooth following animation
 * - Scale on hover over interactive elements
 * - Glowing effect
 * - Hidden on touch devices
 */
export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          scale: isHovering ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 30,
          stiffness: 400,
          mass: 0.5,
        }}
      >
        <div className="w-6 h-6 border-2 border-white rounded-full" />
      </motion.div>

      {/* Trailing Glow */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovering ? 2 : 1,
        }}
        transition={{
          type: 'spring',
          damping: 20,
          stiffness: 200,
          mass: 0.8,
        }}
      >
        <div className="w-2 h-2 bg-[#C8102E] rounded-full blur-sm opacity-60" />
      </motion.div>
    </>
  );
}
