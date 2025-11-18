'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';

export default function ComparisonSection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-6xl md:text-8xl font-black text-white text-center mb-16"
      >
        THE DIFFERENCE
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Manual Operation */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 p-8 rounded-lg"
        >
          <h3 className="text-3xl font-bold text-gray-400 mb-6">Manual Strapping</h3>
          <ul className="space-y-4 text-gray-500">
            {[
              '~180 straps/hour',
              'Inconsistent tension',
              'High labor cost',
              'Operator fatigue',
              'Variable quality',
              'Limited scalability',
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="text-red-500 text-xl">✕</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Automated Operation */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-[#1A0000] to-black border border-[#C8102E] p-8 rounded-lg"
        >
          <h3 className="text-3xl font-bold text-white mb-6">Ergopack Elite</h3>
          <ul className="space-y-4 text-gray-300">
            {[
              '900 straps/hour (5× faster)',
              '±0.08mm tension precision',
              'Minimal supervision required',
              '24/7 continuous operation',
              '100% consistency',
              'Infinitely scalable',
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3">
                <span className="text-[#FFB81C] text-xl">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
