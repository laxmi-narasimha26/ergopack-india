'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useSpring, useTransform } from 'framer-motion';

interface StatCounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  className?: string;
  delay?: number;
}

export function StatCounter({
  end,
  duration = 2,
  suffix = '',
  prefix = '',
  decimals = 0,
  className = '',
  delay = 0,
}: StatCounterProps) {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  const [hasStarted, setHasStarted] = useState(false);
  const springValue = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(springValue, (latest) => {
    if (decimals > 0) {
      return prefix + latest.toFixed(decimals) + suffix;
    }
    return prefix + Math.floor(latest).toLocaleString() + suffix;
  });

  useEffect(() => {
    if (inView && !hasStarted) {
      setTimeout(() => {
        springValue.set(end);
        setHasStarted(true);
      }, delay * 1000);
    }
  }, [inView, end, springValue, delay, hasStarted]);

  return (
    <motion.span ref={ref} className={`tabular-nums ${className}`}>
      <motion.span>{display}</motion.span>
    </motion.span>
  );
}
