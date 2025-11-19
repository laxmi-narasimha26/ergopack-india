'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Handshake, Award, Zap, Globe2, Factory, ChevronRight } from 'lucide-react';

/**
 * Partnership Introduction Section
 *
 * Tells the story of Benz Packaging Solutions + ErgoPack Germany partnership
 * Showcases the bringing of German precision and high-tech technology to India
 */
export default function PartnershipIntroSection({ sectionNumber: _sectionNumber }: { sectionNumber: number }) {
  const { scrollYProgress } = useScroll();

  const opacity = useTransform(scrollYProgress, [0.05, 0.15, 0.25], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.05, 0.15], [0.95, 1]);

  return (
    <section
      data-section
      className="relative min-h-screen flex items-center justify-center px-8 py-32 overflow-hidden"
    >
      {/* Premium Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black">
        {/* Subtle Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(#C8102E 1px, transparent 1px),
              linear-gradient(90deg, #C8102E 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />

        {/* Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-[#C8102E]/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-[#FFB81C]/5 blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        style={{ opacity, scale }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#FFB81C]/30 bg-[#FFB81C]/5 mb-8">
            <Handshake className="w-5 h-5 text-[#FFB81C]" />
            <span className="text-xs text-theme-secondary uppercase tracking-[0.25em] font-medium">
              A Strategic Alliance
            </span>
          </div>

          <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-theme-primary mb-8 leading-tight">
            German Precision
            <br />
            <span className="bg-gradient-to-r from-[#C8102E] via-[#FF4444] to-[#FFB81C] bg-clip-text text-transparent">
              Meets Indian Excellence
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-theme-secondary max-w-4xl mx-auto leading-relaxed font-light">
            The fusion of Benz Packaging Solutions' deep market expertise with ErgoPack Germany's
            cutting-edge engineering excellence, delivering world-class strapping solutions without compromise.
          </p>
        </motion.div>

        {/* Partnership Story Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Benz Packaging Solutions */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="group relative p-12 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800/50 hover:border-[#FFB81C]/30 transition-all duration-700"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#FFB81C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FFB81C]/10 border border-[#FFB81C]/20 mb-8">
                <Factory className="w-8 h-8 text-[#FFB81C]" />
              </div>

              <h3 className="text-3xl font-bold text-theme-primary mb-4">
                Benz Packaging Solutions
              </h3>

              <p className="text-theme-secondary text-lg leading-relaxed mb-6">
                India's trusted partner in packaging excellence, bringing decades of industry expertise,
                market understanding, and unwavering commitment to customer success.
              </p>

              <div className="space-y-3">
                {[
                  'Deep understanding of Indian industrial needs',
                  'Comprehensive after-sales support network',
                  'Customized solutions for diverse applications',
                  'Commitment to customer empowerment',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <ChevronRight className="w-4 h-4 text-[#FFB81C] flex-shrink-0" />
                    <span className="text-sm text-theme-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* ErgoPack Germany */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.4 }}
            className="group relative p-12 rounded-3xl bg-gradient-to-br from-gray-900/50 to-gray-950/50 border border-gray-800/50 hover:border-[#C8102E]/30 transition-all duration-700"
          >
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#C8102E]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#C8102E]/10 border border-[#C8102E]/20 mb-8">
                <Award className="w-8 h-8 text-[#C8102E]" />
              </div>

              <h3 className="text-3xl font-bold text-theme-primary mb-4">
                ErgoPack Germany
              </h3>

              <p className="text-theme-secondary text-lg leading-relaxed mb-6">
                25+ years of pioneering innovation in strapping technology, engineering solutions that
                set global benchmarks for precision, reliability, and ergonomic excellence.
              </p>

              <div className="space-y-3">
                {[
                  'Cutting-edge German engineering excellence',
                  'AGR-certified ergonomic design philosophy',
                  'Industry 4.0 ready automation technology',
                  'Uncompromising quality standards',
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <ChevronRight className="w-4 h-4 text-[#C8102E] flex-shrink-0" />
                    <span className="text-sm text-theme-secondary">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Partnership Value Proposition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative p-12 rounded-3xl bg-gradient-to-r from-[#C8102E]/10 via-gray-900/50 to-[#FFB81C]/10 border border-gray-800/50"
        >
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-gray-700/50 bg-black/30 mb-6">
              <Zap className="w-4 h-4 text-[#FFB81C]" />
              <span className="text-xs text-theme-secondary uppercase tracking-[0.25em] font-medium">
                The Result
              </span>
            </div>

            <h3 className="text-4xl md:text-5xl font-bold text-theme-primary mb-6">
              ErgoPack India
            </h3>

            <p className="text-xl text-theme-secondary max-w-3xl mx-auto leading-relaxed">
              World-class German precision engineering and hi-tech automation technology,
              delivered to Indian industries with local expertise, support, and understanding—
              <span className="text-[#FFB81C] font-medium"> without any compromises</span>.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe2,
                label: 'Global Standards',
                description: 'International quality meets local requirements',
              },
              {
                icon: Zap,
                label: 'Zero Compromise',
                description: 'Full German technology, India-optimized',
              },
              {
                icon: Handshake,
                label: 'Complete Support',
                description: 'End-to-end partnership for your success',
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700/50 mb-4">
                  <item.icon className="w-6 h-6 text-theme-secondary" />
                </div>
                <h4 className="text-lg font-semibold text-theme-primary mb-2">{item.label}</h4>
                <p className="text-sm text-theme-secondary">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
