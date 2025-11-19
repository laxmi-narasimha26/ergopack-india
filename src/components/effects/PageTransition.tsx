'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </AnimatePresence>

      {/* Page Transition Overlay */}
      <AnimatePresence>
        {isAnimating && (
          <>
            {/* Top curtain */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-screen bg-gradient-to-b from-white via-red-50/30 to-transparent z-[9999] origin-top"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.4, ease: [0.645, 0.045, 0.355, 1] }}
            />

            {/* Bottom curtain */}
            <motion.div
              className="fixed bottom-0 left-0 right-0 h-screen bg-gradient-to-t from-white via-red-50/30 to-transparent z-[9999] origin-bottom"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              exit={{ scaleY: 0 }}
              transition={{ duration: 0.4, ease: [0.645, 0.045, 0.355, 1], delay: 0.1 }}
            />

            {/* Center logo/text */}
            <motion.div
              className="fixed inset-0 flex items-center justify-center z-[10000] pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.4 }}
            >
              <div className="text-center">
                <motion.div
                  className="text-6xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  ErgoPack India
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
