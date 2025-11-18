'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import MassiveText from '../shared/MassiveText';
import { motion } from 'framer-motion';

export default function ThroughputSection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <MassiveText text="900 STRAPS/HOUR" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="text-2xl text-gray-300 mb-8">
          15 packages per minute. Zero compromise on quality.
        </p>

        {/* Animated Counter */}
        <div className="flex justify-center gap-12">
          {[
            { value: '900', label: 'Straps/Hour' },
            { value: '15', label: 'Packages/Min' },
            { value: '99.7%', label: 'Uptime' },
          ].map((stat, idx) => (
            <div key={idx}>
              <div className="text-6xl font-black text-[#C8102E] mb-2">{stat.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
