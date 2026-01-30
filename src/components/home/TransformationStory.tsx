'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

/**
 * TransformationStory Component
 *
 * A fluid, scroll-animated infographic showing the transformation
 * from manual (120s) to ErgoPack (40s) process.
 *
 * Sections:
 * 1. Hero Headline
 * 2. Before/After Visual with Arrow
 * 3. Zero Fatigue Factor (Graph)
 * 4. Employee Safety Stats (100% Metrics)
 */

export default function TransformationStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-white overflow-hidden relative z-10">
      <div className="container mx-auto px-4 lg:px-6 max-w-7xl">
        {/* ═══════════════════════════════════════════════════════════════
            HEADLINE
        ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-10 md:mb-16 pt-10"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight font-display tracking-tight">
            From a <span className="text-[#C8102E]">120-Second Liability</span>
            <br className="hidden md:block" /> to a{' '}
            <span className="text-[#1a365d]">40-Second Asset</span>
          </h2>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            EFFICIENCY GAINS - Before/After Visual
        ═══════════════════════════════════════════════════════════════ */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 lg:mb-20"
        >
          <h3 className="text-center text-xl md:text-2xl font-bold text-neutral-800 mb-10 md:mb-12">
            Efficiency Gains
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-20">
            {/* BEFORE: Manual Process */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center group"
            >
              <div className="text-6xl md:text-8xl font-black text-neutral-400 mb-6 transition-colors group-hover:text-neutral-500">
                120<span className="text-4xl md:text-5xl">s</span>
              </div>
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                <Image
                  src="/images/infographic/manual-worker.png"
                  alt="Manual strapping - worker bending"
                  fill
                  className="object-contain grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                {/* Fallback if image missing */}
                <div className="absolute inset-0 bg-neutral-100/50 rounded-2xl -z-10" />
              </div>
              <p className="mt-6 text-sm md:text-base text-neutral-500 font-bold uppercase tracking-wider">
                Manual Process
              </p>
            </motion.div>

            {/* ARROW with 66% Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5, type: 'spring' }}
              className="flex flex-col items-center py-6 md:py-0 relative z-20"
            >
              {/* Desktop Arrow */}
              <div className="relative hidden md:block">
                <div className="w-32 lg:w-48 h-16 lg:h-20 bg-gradient-to-r from-[#C8102E] to-[#A00D24] flex items-center justify-center shadow-xl relative pr-8">
                  <span className="text-white font-black text-sm lg:text-lg leading-tight text-center px-4">
                    66% TIME
                    <br />
                    REDUCTION
                  </span>
                  {/* Arrow Head */}
                  <div className="absolute -right-8 top-0 w-0 h-0 border-t-[32px] lg:border-t-[40px] border-t-transparent border-b-[32px] lg:border-b-[40px] border-b-transparent border-l-[32px] border-l-[#A00D24]" />
                </div>
              </div>

              {/* Mobile Badge */}
              <div className="md:hidden bg-[#C8102E] text-white font-bold px-6 py-3 rounded-full shadow-lg text-sm">
                66% TIME REDUCTION ↓
              </div>
            </motion.div>

            {/* AFTER: ErgoPack Process */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center group"
            >
              <div className="text-6xl md:text-8xl font-black text-[#1a365d] mb-6 transition-transform group-hover:scale-110 duration-300">
                40<span className="text-4xl md:text-5xl">s</span>
              </div>
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                <Image
                  src="/images/products/726x.png"
                  alt="ErgoPack 726X - zero bending"
                  fill
                  className="object-contain drop-shadow-xl transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-blue-50/30 rounded-full blur-3xl -z-10 opacity-50" />
              </div>
              <p className="mt-6 text-sm md:text-base text-[#1a365d] font-bold uppercase tracking-wider">
                ErgoPack Process
              </p>
            </motion.div>
          </div>

          {/* Labor Redeployment Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-center mt-12 md:mt-16 text-neutral-600 text-base md:text-xl max-w-3xl mx-auto leading-relaxed bg-neutral-50 py-4 px-8 rounded-full border border-neutral-100"
          >
            <span className="font-bold text-neutral-900">Labor Redeployment:</span> Saved hours can
            be reallocated to higher-value tasks, significantly boosting overall operational
            throughput.
          </motion.p>
        </motion.div>

        {/* ═══════════════════════════════════════════════════════════════
            BOTTOM SECTION: Two Columns (Graph + Safety Stats)
        ═══════════════════════════════════════════════════════════════ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mt-16 md:mt-24">
          {/* LEFT: The Zero Fatigue Factor (Graph) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="bg-neutral-50 rounded-3xl p-8 md:p-12 border border-neutral-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-8 flex items-center gap-3">
              The Zero Fatigue Factor
              <span className="text-xs font-normal text-white bg-[#C8102E] px-2 py-1 rounded">
                Proven
              </span>
            </h3>

            {/* Graph Visualization (SVG) */}
            <div className="relative h-64 md:h-72 w-full mb-8 bg-white rounded-2xl p-4 border border-neutral-200/50 shadow-inner">
              <svg
                viewBox="0 0 500 250"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                {/* Grid lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                  <line
                    key={i}
                    x1="60"
                    y1={40 + i * 40}
                    x2="480"
                    y2={40 + i * 40}
                    stroke="#f3f4f6"
                    strokeWidth="1"
                  />
                ))}

                {/* Y-Axis Labels */}
                <text x="20" y="45" fontSize="12" fill="#6b7280" fontWeight="600">
                  High
                </text>
                <text x="20" y="205" fontSize="12" fill="#6b7280" fontWeight="600">
                  Low
                </text>
                <text
                  x="15"
                  y="125"
                  fontSize="11"
                  fill="#9ca3af"
                  transform="rotate(-90 15 125)"
                  fontWeight="500"
                >
                  Performance Level
                </text>

                {/* X-Axis */}
                <line x1="60" y1="200" x2="480" y2="200" stroke="#d1d5db" strokeWidth="2" />
                {[1, 2, 3, 4, 5, 6, 7, 8].map((hour, i) => (
                  <text
                    key={i}
                    x={60 + i * 60}
                    y="225"
                    fontSize="12"
                    fill="#6b7280"
                    textAnchor="middle"
                  >
                    {hour}h
                  </text>
                ))}
                <text
                  x="270"
                  y="245"
                  fontSize="12"
                  fill="#4b5563"
                  textAnchor="middle"
                  fontWeight="600"
                >
                  Shift Duration (Hours)
                </text>

                {/* Machine Performance Line (Flat, High) */}
                <motion.path
                  d="M 60 50 L 480 50"
                  stroke="#C8102E"
                  strokeWidth="4"
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 1 }}
                />
                <circle cx="480" cy="50" r="5" fill="#C8102E" />
                <text x="485" y="45" fontSize="12" fill="#C8102E" fontWeight="700" textAnchor="end">
                  Machine Performance
                </text>

                {/* Manual Labor Performance Line (Declining curve) */}
                <motion.path
                  d="M 60 60 Q 200 70, 270 110 T 400 170 T 480 190"
                  stroke="#1a365d"
                  strokeWidth="3"
                  fill="none"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0 }}
                  animate={isInView ? { pathLength: 1 } : {}}
                  transition={{ duration: 1.5, delay: 1.2 }}
                />
                <circle cx="480" cy="190" r="5" fill="#1a365d" />
                <text
                  x="485"
                  y="180"
                  fontSize="12"
                  fill="#1a365d"
                  fontWeight="700"
                  textAnchor="end"
                >
                  Manual Labor Performance
                </text>
              </svg>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg text-neutral-800">
                Consistent Output, Shift After Shift
              </h4>
              <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
                Unlike manual labor where fatigue naturally degrades performance by{' '}
                <span className="font-bold text-red-600">up to 40%</span> in the later hours of a
                shift, ErgoPack maintains{' '}
                <span className="font-bold text-[#1a365d]">100% efficiency</span> from the first
                minute to the last. This eliminates the "after-lunch dip" and ensures standardized
                pallet security regardless of the time of day.
              </p>
            </div>
          </motion.div>

          {/* RIGHT: Employee Safety & Well-being */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="bg-white rounded-3xl p-8 md:p-12 border border-neutral-200 shadow-xl"
          >
            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-10">
              Employee Safety & Well-being
            </h3>

            <div className="space-y-10">
              {/* Stat 1: Bending Elimination */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 bg-red-50/50 p-6 rounded-2xl border border-red-100"
              >
                {/* Illustration */}
                <div className="relative w-24 h-24 flex-shrink-0 bg-white rounded-full p-2 shadow-sm border border-red-100">
                  <Image
                    src="/images/infographic/no-bending-icon.png"
                    alt="No Bending Illustration"
                    width={96}
                    height={96}
                    className="object-contain w-full h-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <span className="text-5xl font-black text-[#C8102E]">100%</span>
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 mb-2">Bending Eliminated</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    The patented ChainLance system slides the strap under the pallet, removing the
                    need for operators to bend. This directly prevents spinal compression injuries.
                  </p>
                </div>
              </motion.div>

              {/* Stat 2: Walking Around Pallet Eliminated */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6 bg-blue-50/50 p-6 rounded-2xl border border-blue-100"
              >
                {/* Illustration */}
                <div className="relative w-24 h-24 flex-shrink-0 bg-white rounded-full p-2 shadow-sm border border-blue-100">
                  <Image
                    src="/images/infographic/no-walking-icon.png"
                    alt="No Walking Illustration"
                    width={96}
                    height={96}
                    className="object-contain w-full h-full"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
                    <span className="text-5xl font-black text-[#1a365d]">100%</span>
                  </div>
                  <h4 className="text-lg font-bold text-neutral-900 mb-2">Walking Eliminated</h4>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Operations become stationary. No more walking around the pallet reduces fatigue,
                    trip hazards, and time wasted in transit by over 60%.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
