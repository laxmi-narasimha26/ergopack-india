'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Fixed Header with Blur Backdrop
 *
 * Features:
 * - Logo left, CTA right, hamburger menu
 * - Frosted glass blur effect
 * - Always visible during scroll
 * - Premium iOS/macOS aesthetic
 */
export default function FixedHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'backdrop-blur-xl bg-theme-primary/40' : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1800px] mx-auto px-8 py-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="text-theme-primary font-bold text-2xl tracking-tight"
          >
            <span className="text-[#C8102E]">ERGO</span>
            <span>PACK</span>
            <span className="ml-2 text-sm font-normal text-theme-secondary">ELITE</span>
          </motion.div>
        </Link>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 184, 28, 0.4)' }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="px-8 py-3 rounded-full bg-[#FFB81C] text-black font-semibold text-sm tracking-wide hover:bg-[#FFC940] transition-colors"
        >
          Request Partnership
        </motion.button>
      </div>
    </motion.header>
  );
}
