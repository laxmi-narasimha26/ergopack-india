'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import Image from 'next/image';

/**
 * ImmersiveTransformationSection
 *
 * A premium, scroll-animated infographic with:
 * - Parallax floating machine images
 * - Animated counters (120 → 40)
 * - Scroll-triggered reveals
 * - Smooth transitions and micro-interactions
 *
 * Uses actual product images from /images/products/
 */
export default function ImmersiveTransformationSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Parallax transforms
  const manualY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const machineY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const arrowScale = useTransform(scrollYProgress, [0.2, 0.5], [0.8, 1]);
  const arrowX = useTransform(scrollYProgress, [0.2, 0.5], [-20, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-gradient-to-b from-white via-neutral-50 to-white overflow-hidden"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-red-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-blue-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* ═══════════════════════════════════════════════════════════════
            ANIMATED HEADLINE
        ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 bg-neutral-900 text-white text-xs font-bold uppercase tracking-widest rounded-full mb-6"
          >
            The Transformation
          </motion.span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight">
            From a{' '}
            <span className="relative inline-block">
              <span className="text-[#C8102E]">120-Second Liability</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#C8102E]/20 origin-left"
              />
            </span>
            <br className="hidden md:block" />
            to a{' '}
            <span className="relative inline-block">
              <span className="text-[#1a365d]">40-Second Asset</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ duration: 0.6, delay: 1 }}
                className="absolute bottom-0 left-0 right-0 h-1 bg-[#1a365d]/20 origin-left"
              />
            </span>
          </h2>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            EFFICIENCY COMPARISON - Main Visual
        ═══════════════════════════════════════════════════════════════ */}
        <div className="relative mb-20 md:mb-32">
          <motion.h3
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center text-lg md:text-xl font-bold text-neutral-700 mb-12"
          >
            Efficiency Gains
          </motion.h3>

          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
            {/* ─── BEFORE: Manual Process ─── */}
            <motion.div
              style={{ y: manualY }}
              initial={{ opacity: 0, x: -60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="relative group"
            >
              {/* Red glow effect */}
              <div className="absolute -inset-4 bg-red-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-neutral-100 hover:shadow-2xl transition-shadow duration-500">
                {/* Time badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.8, type: 'spring' }}
                  className="absolute -top-4 -left-4 bg-[#C8102E] text-white text-3xl md:text-4xl font-black px-4 py-2 rounded-2xl shadow-lg"
                >
                  120s
                </motion.div>

                {/* Manual worker image */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-4">
                  <Image
                    src="/images/infographic/manual-worker.png"
                    alt="Manual strapping - worker bending"
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Label */}
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-[#C8102E] text-sm font-bold rounded-full">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                    Manual Method
                  </span>
                  <p className="text-neutral-500 text-sm mt-2">5 Steps • High Strain</p>
                </div>
              </div>
            </motion.div>

            {/* ─── ARROW ANIMATION ─── */}
            <motion.div
              style={{ scale: arrowScale, x: arrowX }}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.6, type: 'spring' }}
              className="flex-shrink-0 py-8 lg:py-0"
            >
              <div className="relative">
                {/* Animated pulse ring */}
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 bg-[#C8102E] rounded-full blur-xl"
                />

                {/* Arrow body */}
                <div className="relative flex items-center">
                  <div className="bg-gradient-to-r from-[#C8102E] to-[#A00D24] text-white font-bold text-sm md:text-base px-6 md:px-8 py-4 md:py-5 rounded-l-full shadow-xl whitespace-nowrap text-center">
                    <span className="text-xl md:text-2xl font-black">66%</span>
                    <br />
                    <span className="text-[10px] md:text-xs uppercase tracking-wider">
                      Time Saved
                    </span>
                  </div>
                  {/* Arrow head */}
                  <div className="w-0 h-0 border-t-[28px] md:border-t-[36px] border-t-transparent border-b-[28px] md:border-b-[36px] border-b-transparent border-l-[20px] md:border-l-[28px] border-l-[#A00D24]" />
                </div>
              </div>
            </motion.div>

            {/* ─── AFTER: ErgoPack Process ─── */}
            <motion.div
              style={{ y: machineY }}
              initial={{ opacity: 0, x: 60 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
              className="relative group"
            >
              {/* Blue glow effect */}
              <div className="absolute -inset-4 bg-blue-500/10 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-neutral-100 hover:shadow-2xl transition-shadow duration-500">
                {/* Time badge */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.9, type: 'spring' }}
                  className="absolute -top-4 -right-4 bg-[#1a365d] text-white text-3xl md:text-4xl font-black px-4 py-2 rounded-2xl shadow-lg"
                >
                  40s
                </motion.div>

                {/* ErgoPack machine image */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mb-4">
                  <Image
                    src="/images/products/726x.png"
                    alt="ErgoPack 726X - zero bending"
                    fill
                    className="object-contain transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Label */}
                <div className="text-center">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#1a365d] text-sm font-bold rounded-full">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    ErgoPack Solution
                  </span>
                  <p className="text-neutral-500 text-sm mt-2">3 Steps • Zero Strain</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Labor Redeployment Note */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-center text-neutral-600 mt-12 text-base md:text-lg max-w-2xl mx-auto"
          >
            <span className="font-bold text-neutral-900">Labor Redeployment:</span> Saved hours can
            be reallocated to higher-value tasks
          </motion.p>
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            STATS GRID - Zero Fatigue & Safety
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* LEFT: Zero Fatigue Factor */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-neutral-100 hover:shadow-2xl transition-shadow duration-500"
          >
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-6">
              The Zero Fatigue Factor
            </h3>

            {/* Animated Graph */}
            <div className="relative bg-neutral-50 rounded-2xl p-6 mb-6">
              <svg viewBox="0 0 400 160" className="w-full h-auto">
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="50"
                    y1={30 + i * 30}
                    x2="380"
                    y2={30 + i * 30}
                    stroke="#f0f0f0"
                    strokeWidth="1"
                  />
                ))}

                {/* Y-Axis */}
                <text x="15" y="35" fontSize="10" fill="#9ca3af">
                  High
                </text>
                <text x="15" y="125" fontSize="10" fill="#9ca3af">
                  Low
                </text>

                {/* X-Axis */}
                <line x1="50" y1="120" x2="380" y2="120" stroke="#e5e7eb" strokeWidth="2" />
                {[0, 2, 4, 6, 8].map((n, i) => (
                  <text
                    key={i}
                    x={50 + i * 82}
                    y="140"
                    fontSize="10"
                    fill="#6b7280"
                    textAnchor="middle"
                  >
                    {n}
                  </text>
                ))}
                <text x="215" y="155" fontSize="10" fill="#6b7280" textAnchor="middle">
                  Hours in Shift
                </text>

                {/* Machine Performance Line (FLAT) */}
                <motion.line
                  x1="50"
                  y1="40"
                  x2="370"
                  y2="40"
                  stroke="#C8102E"
                  strokeWidth="4"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 1.3 }}
                />
                <circle cx="375" cy="40" r="4" fill="#C8102E" />
                <text x="385" y="38" fontSize="9" fill="#C8102E" fontWeight="600">
                  Machine
                </text>
                <text x="385" y="50" fontSize="9" fill="#C8102E" fontWeight="600">
                  Performance
                </text>

                {/* Manual Labor Performance Line (DECLINING) */}
                <motion.path
                  d="M50 45 Q120 55, 180 75 T280 100 T370 115"
                  stroke="#1a365d"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="8 4"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 1.5 }}
                />
                <circle cx="370" cy="115" r="4" fill="#1a365d" />
                <text x="385" y="110" fontSize="9" fill="#1a365d">
                  Manual
                </text>
                <text x="385" y="122" fontSize="9" fill="#1a365d">
                  Labor
                </text>
              </svg>
            </div>

            <p className="text-neutral-600 text-sm leading-relaxed">
              ErgoPack delivers the same perfect tension on the{' '}
              <span className="font-semibold text-neutral-900">first pallet</span> of the day and
              the <span className="font-semibold text-neutral-900">last</span>. No fatigue, no
              variation, no compromise.
            </p>
          </motion.div>

          {/* RIGHT: Employee Safety & Well-being */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border border-neutral-100 hover:shadow-2xl transition-shadow duration-500"
          >
            <h3 className="text-xl md:text-2xl font-bold text-neutral-900 mb-6">
              Employee Safety & Well-being
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {/* Stat 1: 100% Bending Elimination */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.4, type: 'spring' }}
                className="text-center p-4 bg-red-50 rounded-2xl"
              >
                <div className="relative inline-block mb-2">
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 1.5 }}
                    className="text-4xl md:text-5xl font-black text-[#C8102E]"
                  >
                    100%
                  </motion.span>
                  {/* Animated X mark */}
                  <motion.svg
                    initial={{ scale: 0, rotate: -180 }}
                    animate={isInView ? { scale: 1, rotate: 0 } : {}}
                    transition={{ duration: 0.5, delay: 1.6, type: 'spring' }}
                    className="absolute -top-2 -right-4 w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#C8102E"
                    strokeWidth="4"
                    strokeLinecap="round"
                  >
                    <line x1="4" y1="4" x2="20" y2="20" />
                    <line x1="20" y1="4" x2="4" y2="20" />
                  </motion.svg>
                </div>
                <h4 className="font-bold text-neutral-900 text-sm mb-1">Bending Eliminated</h4>
                <p className="text-xs text-neutral-600">Zero spinal compression risk</p>
              </motion.div>

              {/* Stat 2: 100% Walking Eliminated */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.5, delay: 1.5, type: 'spring' }}
                className="text-center p-4 bg-blue-50 rounded-2xl"
              >
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 1.6 }}
                  className="text-4xl md:text-5xl font-black text-[#1a365d] block mb-2"
                >
                  100%
                </motion.span>
                <h4 className="font-bold text-neutral-900 text-sm mb-1">Walking Eliminated</h4>
                <p className="text-xs text-neutral-600">Operator stays in position</p>
              </motion.div>
            </div>

            <p className="text-neutral-600 text-sm mt-6 leading-relaxed">
              The patented chain-lance system removes all bending and walking requirements, directly
              aligning with <span className="font-semibold">"every accident is preventable"</span>{' '}
              safety goals.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
