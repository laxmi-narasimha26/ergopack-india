'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function ScrollHeader() {
  const { scrollY } = useScroll();
  const [isScrolledPast, setIsScrolledPast] = useState(false);

  // Animation values
  // 0 -> 400px scroll range for the transition
  // Scale: Large to small logo size
  const scale = useTransform(scrollY, [0, 400], [1, 0.35]);

  // X: Center (50%) to Left (roughly 2rem/32px from edge)
  const x = useTransform(scrollY, [0, 400], ['0%', '-45%']);

  // Y: Center (50vh) to Top (roughly 1.5rem/24px from top)
  const y = useTransform(scrollY, [0, 400], ['45vh', '-2vh']);

  // Text tracking: Ultra wide to normal-wide
  const letterSpacing = useTransform(scrollY, [0, 400], ['0.25em', '0.1em']);

  // Color: White to Black (for contrast on video)
  const color = useTransform(scrollY, [0, 400], ['#FFFFFF', '#000000']);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolledPast(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[101] pointer-events-none h-screen flex justify-center">
      <motion.div style={{ scale, x, y }} className="origin-center absolute top-0">
        <motion.h1
          className="font-serif font-medium text-luxury-dark-gray whitespace-nowrap text-6xl md:text-8xl lg:text-9xl tracking-widest uppercase"
          style={{ letterSpacing, color }}
        >
          ERGOPACK INDIA
        </motion.h1>
      </motion.div>
    </div>
  );
}
