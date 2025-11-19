'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Activity } from 'lucide-react';

export default function ThroughputSection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-center"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
          900 STRAPS/HOUR
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
          15 packages per minute. Zero compromise on quality.
        </p>

        {/* Animated Counter */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            { icon: TrendingUp, value: '900', label: 'Straps/Hour' },
            { icon: Clock, value: '15', label: 'Packages/Min' },
            { icon: Activity, value: '99.7%', label: 'Uptime' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.5, delay: 0.8 + idx * 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1A0000] to-black border border-[#C8102E] p-8 rounded-lg"
            >
              <stat.icon className="w-8 h-8 text-[#FFB81C] mx-auto mb-4" strokeWidth={1.5} />
              <div className="text-5xl font-black text-[#C8102E] mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
