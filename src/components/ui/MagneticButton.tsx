'use client';

import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
}

export function MagneticButton({ children, className = '', onClick, href }: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      // Magnetic effect - pull towards cursor
      const magneticForce = 0.3;
      x.set(distanceX * magneticForce);
      y.set(distanceY * magneticForce);
    };

    const handleMouseLeave = () => {
      x.set(0);
      y.set(0);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [x, y]);

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      ref={ref as any}
      href={href}
      onClick={onClick}
      className={`relative inline-block ${className}`}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </Component>
  );
}
