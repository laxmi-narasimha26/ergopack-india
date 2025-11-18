'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { InnovationIcon, GlobalIcon, IndustryIcon } from '@/components/elite/ui/PremiumIcons';

/**
 * Company Journey Section - ErgopackGermany History & Evolution
 * Premium storytelling section showcasing company heritage and innovation
 */

interface JourneyMilestone {
  year: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

const MILESTONES: JourneyMilestone[] = [
  {
    year: '1985',
    title: 'Foundation in Germany',
    description: 'ErgopackGermany founded with vision to revolutionize packaging automation',
    icon: IndustryIcon,
    color: '#FFB81C',
  },
  {
    year: '1995',
    title: 'First Mobile Strapping System',
    description: 'Pioneered mobile pallet strapping technology, setting industry standards',
    icon: InnovationIcon,
    color: '#00D9FF',
  },
  {
    year: '2005',
    title: 'Global Expansion',
    description: 'Established presence across 45+ countries, serving Fortune 500 companies',
    icon: GlobalIcon,
    color: '#C8102E',
  },
  {
    year: '2015',
    title: 'Lithium-Ion Revolution',
    description: 'Launched X-pert Line with advanced Li-Ion technology - 3.4x performance boost',
    icon: InnovationIcon,
    color: '#FFB81C',
  },
  {
    year: '2025',
    title: 'AI-Powered Precision',
    description: 'Next-generation smart strapping with predictive maintenance and Industry 4.0 integration',
    icon: InnovationIcon,
    color: '#00FF88',
  },
];

export default function CompanyJourneySection({ sectionNumber }: { sectionNumber?: number }) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <section
      ref={containerRef}
      data-section={sectionNumber}
      className="relative min-h-screen flex items-center justify-center py-32 px-8 overflow-hidden"
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

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto w-full"
      >
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <span className="text-[#FFB81C] font-mono text-sm tracking-[0.3em] uppercase">
              Since 1985
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black mb-8"
          >
            <span className="text-white">THE ERGOPACK</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8102E] to-[#FFB81C]">
              JOURNEY
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
          >
            40 years of German engineering excellence, pushing the boundaries of
            packaging automation and setting global standards for quality and innovation
          </motion.p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#C8102E] to-transparent" />

          {/* Milestones */}
          <div className="space-y-32">
            {MILESTONES.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-16' : 'text-left pl-16'}`}>
                  <div className="bg-gradient-to-br from-black/80 to-[#1A0000]/80 backdrop-blur-xl border-2 border-[#4A0000] rounded-2xl p-8 hover:border-[#C8102E] transition-all duration-500 group">
                    <div className="mb-4 flex justify-between items-center">
                      <span
                        className="text-5xl font-black tracking-tighter"
                        style={{ color: milestone.color }}
                      >
                        {milestone.year}
                      </span>
                      <div className={index % 2 === 0 ? 'order-first' : ''}>
                        <milestone.icon size={48} color={milestone.color} />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#FFB81C] transition-colors duration-300">
                      {milestone.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {milestone.description}
                    </p>

                    {/* Hover accent line */}
                    <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#C8102E] to-[#FFB81C] transition-all duration-500" />
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div
                      className="w-6 h-6 rounded-full border-4 border-black z-10 relative"
                      style={{ backgroundColor: milestone.color }}
                    />
                    {/* Pulse effect */}
                    <motion.div
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                      className="absolute inset-0 rounded-full"
                      style={{ backgroundColor: milestone.color }}
                    />
                  </motion.div>
                </div>

                {/* Spacer */}
                <div className="w-5/12" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { value: '40+', label: 'Years of Innovation', suffix: 'Years' },
            { value: '45+', label: 'Countries Worldwide', suffix: 'Countries' },
            { value: '500K+', label: 'Machines Deployed', suffix: 'Machines' },
            { value: '99.8%', label: 'Customer Satisfaction', suffix: '%' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-8 bg-gradient-to-br from-black/60 to-[#1A0000]/60 backdrop-blur-xl border border-[#4A0000] rounded-xl hover:border-[#C8102E] transition-all duration-500 group"
            >
              <div className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#C8102E] to-[#FFB81C] mb-3">
                {stat.value}
              </div>
              <div className="text-sm md:text-base text-gray-400 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
              {/* Accent bar */}
              <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#C8102E] to-[#FFB81C] transition-all duration-500 mx-auto" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
