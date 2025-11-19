'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown, Sparkles } from 'lucide-react';

export default function HeroSection({ sectionNumber: _sectionNumber }: { sectionNumber: number }) {
  const { scrollYProgress } = useScroll();

  // Gentle parallax effects
  const yTitle = useTransform(scrollYProgress, [0, 0.3], [0, -80]);
  const ySubtitle = useTransform(scrollYProgress, [0, 0.3], [0, -40]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.3], [1, 0.8, 0]);

  return (
    <section data-section className="relative min-h-screen flex items-center justify-center px-8 py-32">
      <div className="text-center max-w-6xl mx-auto">
        {/* Premium Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.3 }}
          className="mb-12 flex justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#C8102E]/30 bg-[#C8102E]/5">
            <Sparkles className="w-4 h-4 text-[#FFB81C]" />
            <span className="text-xs text-theme-secondary uppercase tracking-[0.2em] font-medium">
              Industry 4.0 Ready
            </span>
          </div>
        </motion.div>

        {/* Main Headline - REFINED PREMIUM SIZE */}
        <motion.div style={{ y: yTitle, opacity }}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <span className="block text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tight text-theme-primary mb-3">
              ERGOPACK
            </span>
            <span className="block text-4xl md:text-5xl lg:text-6xl font-black leading-none tracking-tight bg-gradient-to-r from-[#C8102E] via-[#FF4444] to-[#FFB81C] bg-clip-text text-transparent">
              ELITE
            </span>
          </motion.h1>
        </motion.div>

        {/* Elegant Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.5, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="h-px bg-gradient-to-r from-transparent via-[#C8102E] to-transparent mx-auto max-w-md my-12"
        />

        {/* Subheadline */}
        <motion.div style={{ y: ySubtitle }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2, delay: 1.2 }}
            className="text-lg md:text-xl text-theme-secondary font-light tracking-wide mb-6"
          >
            Automated Strapping Excellence
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, delay: 1.6 }}
            className="text-sm md:text-base text-theme-secondary max-w-2xl mx-auto leading-relaxed font-light"
          >
            25 years of German precision engineering, now empowering India's category leaders
            with world-class automated strapping solutions.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2.2 }}
          className="mt-24"
        >
          <div className="flex flex-col items-center gap-3">
            <span className="text-xs text-theme-secondary uppercase tracking-[0.3em] font-mono">
              Scroll to Explore
            </span>
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-[#C8102E]" strokeWidth={1.5} />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
