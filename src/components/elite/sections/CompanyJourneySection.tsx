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
    year: '1998',
    title: 'The Beginning - First Prototype',
    description: 'First prototype of a strapping device based on a double scissors system',
    detailedStory: 'The ErgoPack journey began with a revolutionary idea - a strapping device based on a double scissors system similar to a scissors lifting table. This innovative approach would lay the foundation for decades of engineering excellence and transform pallet strapping forever.',
    icon: IndustryIcon,
    color: '#FFB81C',
    achievements: [
      'First prototype developed with scissors lifting mechanism',
      'Innovative double scissors system design',
      'Foundation for future ErgoPack innovations',
    ],
  },
  {
    year: '1999',
    title: 'ChainLance Innovation',
    description: 'Invention and patenting of the world\'s first ChainLance',
    detailedStory: 'A groundbreaking invention that would define ErgoPack\'s future - the world\'s first ChainLance system was invented and patented. This revolutionary technology enabled precise strap placement and became the hallmark of ErgoPack systems worldwide.',
    icon: InnovationIcon,
    color: '#00D9FF',
    achievements: [
      'World\'s first ChainLance invented and patented',
      'Revolutionary strap guidance system',
      'Set new standards for strapping precision',
    ],
  },
  {
    year: '2000',
    title: 'First Production Model',
    description: 'ErgoPack 300 - First serial model with crank operation',
    detailedStory: 'The ErgoPack 300 marked the transition from prototype to production. Designed for composite straps with a 75mm core diameter and operated by a crank, this model brought ErgoPack technology to the market and established the brand\'s reputation for reliability.',
    icon: IndustryIcon,
    color: '#C8102E',
    achievements: [
      'First serial model ErgoPack 300 launched',
      'Crank-operated system for composite straps',
      '75mm core diameter compatibility',
      'Market entry with proven technology',
    ],
  },
  {
    year: '2001',
    title: 'Heavy-Duty Innovation',
    description: 'ErgoPack 500 - 5m ChainLance for larger pallets',
    detailedStory: 'Meeting the demands of larger applications, the ErgoPack 500 introduced a 5-meter long ChainLance to strap larger pallets with PP and PET straps. Supporting 406mm core diameter, this model expanded ErgoPack\'s capabilities into heavy-duty applications.',
    icon: InnovationIcon,
    color: '#FFB81C',
    achievements: [
      'ErgoPack 500 with 5m ChainLance introduced',
      '406mm core diameter support',
      'PP and PET strap compatibility',
      'Expanded into large pallet applications',
    ],
  },
  {
    year: '2002',
    title: 'Award-Winning Excellence',
    description: 'ErgoPack 600 wins Gold Medal and German Inventor\'s Award',
    detailedStory: 'The ErgoPack 600 represented a quantum leap in ergonomics and functionality. Winning the gold medal at the International Exhibition of Inventions in Geneva and the German Inventor\'s Award, it introduced the revolutionary strap lifter - eliminating the need for operators to bend down.',
    icon: GlobalIcon,
    color: '#C8102E',
    achievements: [
      'Gold Medal at International Exhibition of Inventions, Geneva',
      'German Inventor\'s Award winner',
      'Revolutionary strap lifter technology',
      'Zero-bend operation for perfect ergonomics',
    ],
  },
  {
    year: '2003',
    title: 'Electronic Revolution',
    description: 'Battery-powered operation and Tool-Lift system introduced',
    detailedStory: 'The industry took notice as ErgoPack transitioned from manual crank operation to electronic drive powered by battery. The innovative Tool-Lift system made side strapping of high pallets even easier, allowing different sealing tools to be attached without manual holding.',
    icon: InnovationIcon,
    color: '#00D9FF',
    achievements: [
      'Electronic battery drive replaces manual crank',
      'ErgoPack Tool-Lift system launched',
      'Enhanced capability for high pallet strapping',
      'Improved operator comfort and efficiency',
    ],
  },
  {
    year: '2008',
    title: 'Integrated Sealing Systems',
    description: 'ErgoPack 720E & 730E - First complete strapping systems',
    detailedStory: 'A new era began with the 720E and 730E models - the first complete strapping systems with integrated sealing heads and centralized battery power supply. These all-in-one solutions simplified operations and set new standards for integrated strapping technology.',
    icon: InnovationIcon,
    color: '#FFB81C',
    achievements: [
      'First integrated sealing head systems',
      'Centralized battery power supply',
      'Complete strapping solution in one unit',
      'Enhanced operational efficiency',
    ],
  },
  {
    year: '2011',
    title: 'State-of-the-Art Sealing',
    description: 'ErgoPack 725E & 740E with advanced sealing technology',
    detailedStory: 'Continuous innovation led to the 725E and 740E models, featuring a totally new state-of-the-art sealing head. This generation combined proven reliability with cutting-edge sealing technology for superior performance.',
    icon: InnovationIcon,
    color: '#C8102E',
    achievements: [
      'Advanced state-of-the-art sealing head',
      'Enhanced sealing reliability and speed',
      'Improved strap quality and strength',
      'Refined user interface and controls',
    ],
  },
  {
    year: '2014',
    title: 'ErgoPack Air Milestone',
    description: 'World\'s only mobile system for elevated pallets',
    detailedStory: 'The ErgoPack Air became a true milestone in pallet strapping history. As the worldwide one and only mobile system capable of strapping elevated pallets, it opened entirely new applications and demonstrated ErgoPack\'s commitment to solving unique industry challenges.',
    icon: GlobalIcon,
    color: '#00FF88',
    achievements: [
      'World\'s first mobile system for elevated pallets',
      'Unique capability for raised pallet strapping',
      'Industry milestone achievement',
      'Expanded application possibilities',
    ],
  },
  {
    year: '2016',
    title: 'Complete Redesign - Model 2017',
    description: 'Revolutionary Model 2017 with over 40 new features',
    detailedStory: 'A completely revised design introduced the Model 2017 with over 40 new features. This comprehensive update represented years of customer feedback, engineering refinement, and technological advancement in a single transformative release.',
    icon: InnovationIcon,
    color: '#FFB81C',
    achievements: [
      'Complete redesign with 40+ new features',
      'Enhanced reliability and performance',
      'Improved ergonomics and user experience',
      'Next-generation engineering excellence',
    ],
  },
  {
    year: '2018',
    title: 'Touchscreen Innovation',
    description: 'Model 2017 enhanced with ergonomic touchscreen control',
    detailedStory: 'The Model 2017 received significant enhancements with a new sealing head featuring touchscreen control. The ergonomic design and intuitive interface impressed operators worldwide, making ErgoPack systems even more user-friendly while maintaining nearly 20 years of reliable and safe strapping performance.',
    icon: InnovationIcon,
    color: '#00D9FF',
    achievements: [
      'New sealing head with touchscreen interface',
      'Ergonomic fit for operator comfort',
      'Intuitive touchscreen controls',
      '20 years of proven reliability',
    ],
  },
  {
    year: '2019',
    title: 'X-pert Line - New Benchmark',
    description: 'Advanced electronics and dual touchscreens set new standards',
    detailedStory: 'The X-pert Line established a new benchmark in strapping technology. With advanced electronics, newly designed touchscreens on both the sealing head and strapping system, the X-pert Line delivered an intuitive user interface and set a new high standard for ergonomics and performance.',
    icon: InnovationIcon,
    color: '#C8102E',
    achievements: [
      'X-pert Line sets new industry benchmark',
      'Advanced electronics and dual touchscreens',
      'Intuitive user interface across system',
      'Highest ergonomic standards achieved',
    ],
  },
  {
    year: '2025',
    title: 'Global Excellence & India Partnership',
    description: 'Over 15,000 systems sold in 60+ countries - Now in India',
    detailedStory: 'With over 15,000 ErgoPack systems sold in more than 60 countries worldwide, ErgoPack represents decades of proven excellence. Through our strategic partnership with Benz Packaging, we bring this legacy of German engineering and innovation to India\'s rapidly growing manufacturing and logistics sectors.',
    icon: GlobalIcon,
    color: '#00FF88',
    achievements: [
      '15,000+ systems sold worldwide',
      'Presence in 60+ countries',
      'Strategic India partnership with Benz Packaging',
      'Bringing German excellence to Indian market',
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
              Since 1998
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black mb-3"
          >
            <span className="text-theme-primary">THE ERGOPACK </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8102E] to-[#FFB81C]">
              JOURNEY
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm md:text-base text-theme-secondary max-w-3xl mx-auto leading-relaxed"
          >
            Over 15,000 sold systems in more than 60 countries - 27 years of innovation
          </motion.p>

          {/* Navigation Instructions */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-4 flex items-center justify-center gap-6 text-xs text-theme-secondary font-mono"
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

                    <h3 className="text-3xl md:text-4xl font-bold text-theme-primary mb-6 leading-tight">
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
                    <p className="text-lg md:text-xl text-theme-secondary leading-relaxed mb-8">
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
                          <span className="text-theme-secondary leading-relaxed">{achievement}</span>
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
            { value: '27+', label: 'Years Innovation' },
            { value: '60+', label: 'Countries' },
            { value: '15K+', label: 'Systems Sold' },
            { value: '99.8%', label: 'Satisfaction' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="text-center p-4 bg-gradient-to-br from-black/60 to-[#1A0000]/60 backdrop-blur-xl border border-[#4A0000] rounded-lg hover:border-[#C8102E] transition-all duration-300"
            >
              <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C8102E] to-[#FFB81C]">
                {stat.value}
              </div>
              <div className="text-xs text-theme-secondary font-medium uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
