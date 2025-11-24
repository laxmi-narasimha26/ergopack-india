'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

/**
 * Magnetic Cursor Effect
 *
 * Enhanced cursor that:
 * - Smoothly follows mouse
 * - Magnetic attraction to interactive elements
 * - Scale and color changes on hover
 * - Glow trail effect
 */
export default function MagneticCursor() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [cursorState, setCursorState] = useState<'default' | 'hover' | 'magnetic'>('default');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) {
      return;
    }

    setIsVisible(true);

    const handleMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Check if hovering over interactive element
      const isInteractive =
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.hasAttribute('data-magnetic');

      if (isInteractive) {
        // Magnetic effect - pull cursor towards element center
        const element = target.closest('[data-magnetic], button, a') as HTMLElement;
        if (element) {
          const rect = element.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;

          const deltaX = (centerX - e.clientX) * 0.3;
          const deltaY = (centerY - e.clientY) * 0.3;

          cursorX.set(e.clientX + deltaX);
          cursorY.set(e.clientY + deltaY);
          setCursorState('magnetic');
          return;
        }
      }

      // Normal cursor movement
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setCursorState(isInteractive ? 'hover' : 'default');
    };

    const handleMouseLeave = () => {
      setCursorState('default');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  const cursorSize = cursorState === 'magnetic' ? 60 : cursorState === 'hover' ? 50 : 40;
  const cursorColor =
    cursorState === 'magnetic' ? '#FFB81C' : cursorState === 'hover' ? '#C8102E' : '#FFFFFF';

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: -cursorSize / 2,
          translateY: -cursorSize / 2,
        }}
      >
        <motion.div
          animate={{
            width: cursorSize,
            height: cursorSize,
            borderColor: cursorColor,
          }}
          transition={{ duration: 0.2 }}
          className="border-2 rounded-full"
        />
      </motion.div>

      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: -4,
          translateY: -4,
        }}
      >
        <motion.div
          animate={{
            backgroundColor: cursorColor,
            scale: cursorState !== 'default' ? 0 : 1,
          }}
          transition={{ duration: 0.2 }}
          className="w-2 h-2 rounded-full"
        />
      </motion.div>

      {/* Glow Trail */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: -20,
          translateY: -20,
        }}
      >
        <motion.div
          animate={{
            width: cursorSize * 1.5,
            height: cursorSize * 1.5,
            opacity: cursorState !== 'default' ? 0.3 : 0.1,
          }}
          transition={{ duration: 0.3 }}
          className="rounded-full blur-xl"
          style={{
            background: `radial-gradient(circle, ${cursorColor}66 0%, transparent 70%)`,
          }}
        />
      </motion.div>
    </>
  );
}
