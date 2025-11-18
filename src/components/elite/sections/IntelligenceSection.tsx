'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BarChart3, Link2, Smartphone, Bell } from 'lucide-react';

export default function IntelligenceSection({ sectionNumber }: { sectionNumber: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const features = [
    {
      icon: BarChart3,
      title: 'Real-Time Analytics',
      description: 'Live production metrics with performance dashboards and predictive insights for data-driven decision making.',
      delay: 0,
    },
    {
      icon: Link2,
      title: 'ERP Integration',
      description: 'Seamless SAP and Oracle integration with bi-directional data flow and API-first architecture.',
      delay: 0.3,
    },
    {
      icon: Smartphone,
      title: 'Remote Monitoring',
      description: '24/7 access from anywhere with mobile-first interface and cloud-synchronized operations.',
      delay: 0.6,
    },
    {
      icon: Bell,
      title: 'Predictive Maintenance',
      description: 'AI-powered alerts to prevent downtime before it happens with smart diagnostics and scheduling.',
      delay: 0.9,
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
            Industry 4.0
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
          Intelligent Connectivity
        </h2>
      </motion.div>

      <div className="mt-20 max-w-6xl mx-auto">
        {/* Clean Grid Layout - 2x2 with proper spacing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {features.map((feature, idx) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 2.5, delay: feature.delay, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="relative">
                  {/* Icon with subtle glow */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-[#C8102E]/30 bg-[#C8102E]/5 transition-all duration-500 group-hover:border-[#C8102E]/50 group-hover:bg-[#C8102E]/10">
                      <Icon className="w-8 h-8 text-[#C8102E]" strokeWidth={1.5} />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 text-base md:text-lg leading-relaxed font-light">
                    {feature.description}
                  </p>

                  {/* Subtle bottom accent */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 2, delay: feature.delay + 0.5 }}
                    viewport={{ once: true }}
                    className="mt-6 h-px bg-gradient-to-r from-[#C8102E]/50 to-transparent origin-left"
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
