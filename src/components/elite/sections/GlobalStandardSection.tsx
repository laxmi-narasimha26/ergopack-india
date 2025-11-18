'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';

export default function GlobalStandardSection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <div className="text-center space-y-12">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-black text-white"
        >
          GLOBAL STANDARD
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Trusted by the world&apos;s most demanding manufacturers
        </motion.p>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-12">
          {['Airbus', 'Bosch', 'Siemens', 'BMW', 'Volkswagen', 'ThyssenKrupp', 'BASF', 'Henkel'].map((company, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1A0000] to-black border border-[#4A0000] p-8 rounded-lg flex items-center justify-center aspect-square"
            >
              <span className="text-gray-600 font-bold text-lg">[ {company} ]</span>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
