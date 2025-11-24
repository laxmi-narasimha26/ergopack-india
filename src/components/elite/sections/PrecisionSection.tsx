'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';
import { Target, Gauge, Zap } from 'lucide-react';

export default function PrecisionSection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-theme-primary tracking-tight">
          PRECISION
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="text-lg text-theme-secondary max-w-2xl mx-auto mb-12">
          Close-up strapping mechanism engineered to 0.1mm tolerances. Every strap, perfectly
          tensioned. Every package, secured with precision.
        </p>

        {/* Precision Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          {[
            { icon: Target, label: 'Position Accuracy', value: '±0.1mm' },
            { icon: Gauge, label: 'Tension Control', value: '±0.08mm' },
            { icon: Zap, label: 'Response Time', value: '<50ms' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 0.8 + idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1A0000] to-black border border-[#4A0000] p-6 rounded-lg"
            >
              <item.icon className="w-8 h-8 text-[#C8102E] mx-auto mb-4" strokeWidth={1.5} />
              <div className="text-2xl font-bold text-theme-primary mb-1">{item.value}</div>
              <div className="text-sm text-theme-secondary uppercase tracking-wider">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Placeholder */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.4 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto aspect-video bg-gradient-to-br from-[#1A0000] to-black rounded-lg border border-[#4A0000] flex items-center justify-center"
        >
          <span className="text-theme-secondary text-xl">
            [ VIDEO: Strapping Mechanism Close-Up ]
          </span>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}
