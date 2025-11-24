'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Gauge, Boxes } from 'lucide-react';

export default function EngineeringSection({
  sectionNumber: _sectionNumber,
}: {
  sectionNumber: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Gentle parallax
  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  const features = [
    {
      icon: Shield,
      title: 'Carbon Steel Frame',
      description:
        'Industrial-grade durability engineered for 24/7 continuous operation. Precision-welded joints ensure structural integrity under extreme loads.',
      badge: 'ISO 9001 Certified',
      delay: 0,
    },
    {
      icon: Gauge,
      title: 'Precision Sensors',
      description:
        'Real-time quality control with microsecond response times. Laser-guided positioning ensures 0.1mm tolerance accuracy.',
      badge: 'Sub-millisecond Response',
      delay: 0.3,
    },
    {
      icon: Boxes,
      title: 'Modular Design',
      description:
        'Tool-free maintenance access with hot-swappable components to minimize downtime. Designed for rapid service and maximum uptime.',
      badge: '15-minute Component Swap',
      delay: 0.6,
    },
  ];

  return (
    <section ref={sectionRef} data-section className="relative min-h-screen py-32 px-8">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-center mb-24"
      >
        <div className="inline-block mb-6">
          <span className="text-xs text-[#FFB81C] uppercase tracking-[0.3em] font-mono">
            Engineering Excellence
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-theme-primary tracking-tight">
          German Precision
        </h2>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Three-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {features.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 2.5, delay: feature.delay, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative h-full">
                  {/* Vertical accent line */}
                  <motion.div
                    className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-[#C8102E] via-[#C8102E]/50 to-transparent"
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    transition={{ duration: 2, delay: feature.delay + 0.3 }}
                    viewport={{ once: true }}
                  />

                  <div className="pl-6">
                    {/* Icon */}
                    <div className="mb-6">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border border-[#C8102E]/30 bg-[#C8102E]/5 transition-all duration-500 group-hover:border-[#C8102E]/50 group-hover:bg-[#C8102E]/10">
                        <Icon className="w-7 h-7 text-[#C8102E]" strokeWidth={1.5} />
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl md:text-3xl font-bold text-theme-primary mb-4 tracking-tight">
                      {feature.title}
                    </h3>

                    <p className="text-theme-secondary text-base leading-relaxed font-light mb-6">
                      {feature.description}
                    </p>

                    {/* Badge */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: feature.delay + 0.8, duration: 2 }}
                      viewport={{ once: true }}
                      className="inline-block"
                    >
                      <span className="text-[#FFB81C] text-xs font-mono uppercase tracking-wider">
                        {feature.badge}
                      </span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Large Image Placeholder */}
        <motion.div
          style={{ y }}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mt-24 relative"
        >
          <div className="aspect-[21/9] bg-gradient-to-br from-[#1A0000] via-black to-[#1A0000] rounded-2xl overflow-hidden border border-[#4A0000]/50 relative group">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-700 text-xl font-mono">
                [ IMAGE: Internal Components View ]
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
