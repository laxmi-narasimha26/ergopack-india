'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { InnovationIcon, GlobalIcon, IndustryIcon } from '@/components/elite/ui/PremiumIcons';
import { ChevronLeft, ChevronRight, ArrowDown } from 'lucide-react';

/**
 * Company Journey Section - ErgopackGermany History & Evolution
 * Premium horizontal scrolling timeline showcasing company heritage and innovation
 * Navigate with left/right arrows or keyboard controls
 */

interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  detailedStory: string;
  icon: React.ComponentType<any>;
  color: string;
  achievements: string[];
}

const MILESTONES: JourneyMilestone[] = [
  {
    year: '1985',
    title: 'Foundation in Germany',
    description: 'ErgopackGermany founded with vision to revolutionize packaging automation',
    detailedStory: 'In the heart of Germany\'s industrial region, a team of packaging engineers identified a critical gap in the market - existing strapping solutions were either too complex, unreliable, or lacked the precision demanded by modern logistics. ErgopackGermany was born from the vision to create the world\'s most reliable, user-friendly pallet strapping systems.',
    icon: IndustryIcon,
    color: '#FFB81C',
    achievements: [
      'Established R&D facility in Stuttgart',
      'Developed first prototype strapping system',
      'Secured key automotive industry partnerships',
    ],
  },
  {
    year: '1995',
    title: 'First Mobile Strapping System',
    description: 'Pioneered mobile pallet strapping technology, setting industry standards',
    detailedStory: 'A decade of intensive research culminated in a breakthrough - the world\'s first truly mobile, battery-powered pallet strapping machine. This innovation freed warehouses from fixed strapping stations and revolutionized workflow efficiency. The patented ChainLance® system ensured perfect strap placement regardless of operator skill level.',
    icon: InnovationIcon,
    color: '#00D9FF',
    achievements: [
      'Launched revolutionary mobile strapping technology',
      'Patent granted for ChainLance® guidance system',
      'Expanded into 12 European markets',
      'Achieved ISO 9001 certification',
    ],
  },
  {
    year: '2005',
    title: 'Global Expansion',
    description: 'Established presence across 45+ countries, serving Fortune 500 companies',
    detailedStory: 'ErgopackGermany\'s reputation for uncompromising quality attracted global attention. Major logistics providers and manufacturing giants adopted our systems worldwide. Strategic partnerships in Asia, Americas, and Africa established ErgopackGermany as the global standard for premium strapping solutions.',
    icon: GlobalIcon,
    color: '#C8102E',
    achievements: [
      'Presence established in 45+ countries',
      'Partnership with Fortune 500 companies',
      '100,000th machine delivered globally',
      'Launched 24/7 international support network',
    ],
  },
  {
    year: '2015',
    title: 'Lithium-Ion Revolution',
    description: 'Launched X-pert Line with advanced Li-Ion technology - 3.4x performance boost',
    detailedStory: 'Recognizing the limitations of traditional battery technology, ErgopackGermany invested heavily in lithium-ion R&D. The breakthrough X-pert Line delivered unprecedented performance - 65% faster operation, 3.4x more cycles per charge, and 60% weight reduction. Siemens touchscreen integration brought Industry 4.0 capabilities to pallet strapping.',
    icon: InnovationIcon,
    color: '#FFB81C',
    achievements: [
      'X-pert Line launched with Li-Ion technology',
      'Siemens industrial touchscreen integration',
      '240% improvement in battery cycles',
      'Winner of German Innovation Award',
    ],
  },
  {
    year: '2025',
    title: 'AI-Powered Precision & India Partnership',
    description: 'Next-generation smart strapping with predictive maintenance and Industry 4.0 integration. Strategic partnership brings German excellence to India',
    detailedStory: 'The latest generation integrates artificial intelligence for predictive maintenance, adaptive tension control, and seamless integration with warehouse management systems. Real-time data analytics optimize strapping parameters automatically. Through our partnership with Benz Packaging, we bring 40 years of German engineering excellence to India\'s rapidly growing manufacturing and logistics sectors.',
    icon: InnovationIcon,
    color: '#00FF88',
    achievements: [
      'AI-powered predictive maintenance launched',
      'Industry 4.0 full integration capability',
      'Strategic India partnership with Benz Packaging',
      '500,000+ machines deployed worldwide',
      'Expansion into emerging markets across Asia',
    ],
  },
];

export default function CompanyJourneySection({ sectionNumber }: { sectionNumber?: number }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentSlide(prev => Math.max(0, prev - 1));
      } else if (e.key === 'ArrowRight') {
        setCurrentSlide(prev => Math.min(MILESTONES.length - 1, prev + 1));
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentMilestone = MILESTONES[currentSlide];

  return (
    <section
      ref={containerRef}
      data-section={sectionNumber}
      className="relative flex items-center justify-center overflow-hidden"
      style={{ minHeight: '100vh', maxHeight: '100vh' }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1A0000] to-black opacity-90" />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #C8102E 1px, transparent 1px),
              linear-gradient(to bottom, #C8102E 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 w-full h-full flex flex-col px-8 sm:px-12 py-16">
        {/* Section Header - Compact */}
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-3"
          >
            <span className="text-[#FFB81C] font-mono text-xs tracking-[0.3em] uppercase">
              Since 1985
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-3"
          >
            <span className="text-white">THE ERGOPACK </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8102E] to-[#FFB81C]">
              JOURNEY
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            40 years of German engineering excellence
          </motion.p>

          {/* Navigation Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 flex items-center justify-center gap-6 text-xs text-gray-500 font-mono"
          >
            <div className="flex items-center gap-2">
              <ChevronLeft className="h-4 w-4" />
              <span>TIMELINE</span>
              <ChevronRight className="h-4 w-4" />
            </div>
            <div className="w-px h-4 bg-gray-700" />
            <div className="flex items-center gap-2">
              <ArrowDown className="h-4 w-4" />
              <span>NEXT SECTION</span>
            </div>
          </motion.div>
        </div>

        {/* Main Content - Horizontal Timeline */}
        <div className="flex-1 flex items-center justify-center max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full">
            {/* Left Navigation */}
            <div className="lg:col-span-1 flex lg:flex-col items-center justify-center gap-4">
              <button
                onClick={() => setCurrentSlide(prev => Math.max(0, prev - 1))}
                disabled={currentSlide === 0}
                className={`p-4 rounded-full transition-all duration-300 ${
                  currentSlide === 0
                    ? 'bg-white/5 text-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-br from-[#C8102E] to-red-700 text-white hover:scale-110 hover:shadow-2xl hover:shadow-[#C8102E]/50'
                }`}
                aria-label="Previous milestone"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            </div>

            {/* Timeline Content */}
            <div className="lg:col-span-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
                >
                  {/* Left: Year & Icon */}
                  <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      className="mb-8"
                    >
                      <currentMilestone.icon size={120} color={currentMilestone.color} />
                    </motion.div>

                    <div
                      className="text-8xl md:text-9xl font-black tracking-tighter mb-6 leading-none"
                      style={{ color: currentMilestone.color }}
                    >
                      {currentMilestone.year}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                      {currentMilestone.title}
                    </h3>

                    {/* Timeline Progress Indicator */}
                    <div className="flex gap-2 mt-6">
                      {MILESTONES.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`transition-all duration-300 ${
                            index === currentSlide
                              ? 'w-12 h-1.5 bg-gradient-to-r from-[#C8102E] to-[#FFB81C]'
                              : 'w-6 h-1.5 bg-white/20 hover:bg-white/40'
                          } rounded-full`}
                          aria-label={`Go to ${MILESTONES[index].year}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Right: Story & Achievements */}
                  <div className="flex flex-col justify-center">
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                      {currentMilestone.detailedStory}
                    </p>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-px flex-1 bg-gradient-to-r from-[#C8102E] to-transparent" />
                        <span className="text-xs font-mono text-[#FFB81C] tracking-wider">KEY ACHIEVEMENTS</span>
                        <div className="h-px flex-1 bg-gradient-to-l from-[#C8102E] to-transparent" />
                      </div>

                      {currentMilestone.achievements.map((achievement, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-r from-white/5 to-transparent border-l-2 hover:border-l-4 transition-all duration-300"
                          style={{ borderColor: currentMilestone.color }}
                        >
                          <div
                            className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                            style={{ backgroundColor: currentMilestone.color }}
                          />
                          <span className="text-gray-300 leading-relaxed">{achievement}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Right Navigation */}
            <div className="lg:col-span-1 flex lg:flex-col items-center justify-center gap-4">
              <button
                onClick={() => setCurrentSlide(prev => Math.min(MILESTONES.length - 1, prev + 1))}
                disabled={currentSlide === MILESTONES.length - 1}
                className={`p-4 rounded-full transition-all duration-300 ${
                  currentSlide === MILESTONES.length - 1
                    ? 'bg-white/5 text-gray-700 cursor-not-allowed'
                    : 'bg-gradient-to-br from-[#C8102E] to-red-700 text-white hover:scale-110 hover:shadow-2xl hover:shadow-[#C8102E]/50'
                }`}
                aria-label="Next milestone"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Section - Bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-auto pt-8 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {[
            { value: '40+', label: 'Years Innovation' },
            { value: '45+', label: 'Countries' },
            { value: '500K+', label: 'Machines' },
            { value: '99.8%', label: 'Satisfaction' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 bg-gradient-to-br from-black/60 to-[#1A0000]/60 backdrop-blur-xl border border-[#4A0000] rounded-lg hover:border-[#C8102E] transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C8102E] to-[#FFB81C]">
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
