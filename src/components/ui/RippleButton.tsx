'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface RippleButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  rippleColor?: string;
}

interface Ripple {
  x: number;
  y: number;
  id: number;
}

export function RippleButton({
  children,
  className = '',
  onClick,
  rippleColor = 'rgba(255, 255, 255, 0.6)',
}: RippleButtonProps) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newRipple = {
      x,
      y,
      id: Date.now(),
    };

    setRipples((prev) => [...prev, newRipple]);

    setTimeout(() => {
      setRipples((prev) => prev.filter((ripple) => ripple.id !== newRipple.id));
    }, 800);

    onClick?.();
  };

  return (
    <button className={`relative overflow-hidden ${className}`} onClick={handleClick}>
      {children}

      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.span
            key={ripple.id}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: ripple.x,
              top: ripple.y,
              backgroundColor: rippleColor,
            }}
            initial={{ width: 0, height: 0, x: '-50%', y: '-50%' }}
            animate={{
              width: 500,
              height: 500,
              opacity: [1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </button>
  );
}
