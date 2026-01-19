'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export default function ScrollHeader() {
  const { scrollY } = useScroll();

  // Fade out as user scrolls and PremiumNavigation takes over
  const opacity = useTransform(scrollY, [300, 400], [1, 0]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[101] pointer-events-none">
      {/* Match PremiumNavigation exactly: py-6 (24px top + 24px bottom) + h-16 content = ~88px total */}
      {/* Using exact same structure as PremiumNavigation for alignment */}
      <div className="py-6">
        <div className="max-w-7xl mx-auto px-6 flex items-center h-16">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            style={{ opacity }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-serif font-medium text-white whitespace-nowrap text-lg sm:text-xl md:text-2xl tracking-[0.15em] uppercase"
          >
            ERGOPACK INDIA
          </motion.h1>
        </div>
      </div>
    </div>
  );
}
