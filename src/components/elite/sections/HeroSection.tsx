'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import GlitchText from '../shared/GlitchText';
import ArrowSymbols from '../ui/ArrowSymbols';

export default function HeroSection({ sectionNumber }: { sectionNumber: number }) {
  const { scrollYProgress } = useScroll();

  // Parallax effects for premium depth
  const yTitle = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const ySubtitle = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);

  return (
    <section data-section className="relative min-h-screen flex items-center justify-center px-8 py-32">
      <motion.div style={{ y: yTitle, opacity, scale }} className="text-center max-w-6xl mx-auto">
        {/* Arrow Accent */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-8"
        >
          <ArrowSymbols variant="mixed" className="text-3xl" />
        </motion.div>

        {/* Main Headline with Glitch */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="relative">
            <GlitchText
              text="ERGOPACK"
              className="block text-[10rem] md:text-[15rem] lg:text-[20rem] font-black leading-none tracking-tighter text-white"
            />
            <GlitchText
              text="ELITE"
              className="block text-[10rem] md:text-[15rem] lg:text-[20rem] font-black leading-none tracking-tighter bg-gradient-to-r from-[#C8102E] via-[#FF4444] to-[#FFB81C] bg-clip-text text-transparent"
            />
          </h1>
        </motion.div>

        {/* Flowing Subheadline */}
        <motion.div
          style={{ y: ySubtitle }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-12 space-y-4"
        >
          <p className="text-2xl md:text-4xl text-gray-400 font-light tracking-wide">
            Operational excellence infrastructure.
          </p>

          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="h-px bg-gradient-to-r from-transparent via-[#C8102E] to-transparent mx-auto max-w-md"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2 }}
            className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed font-light"
          >
            25 years of German precision engineering.
            <br />
            Now empowering India&apos;s category leaders.
          </motion.p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="mt-20"
        >
          <div className="flex flex-col items-center gap-4">
            <span className="text-xs text-gray-700 uppercase tracking-[0.3em] font-mono">Scroll to Explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowSymbols variant="down" className="text-2xl text-[#C8102E]" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
