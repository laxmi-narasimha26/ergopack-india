'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';
import { Globe, Award, Shield } from 'lucide-react';

export default function GlobalStandardSection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <div className="text-center space-y-12">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
        >
          GLOBAL STANDARD
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Trusted by the world&apos;s most demanding manufacturers
        </motion.p>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: Globe, label: 'Global Presence', value: '50+ Countries' },
            { icon: Award, label: 'Industry Recognition', value: 'ISO Certified' },
            { icon: Shield, label: 'Reliability', value: '99.7% Uptime' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1 + idx * 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1A0000] to-black border border-[#C8102E] p-6 rounded-lg"
            >
              <item.icon className="w-8 h-8 text-[#FFB81C] mx-auto mb-4" strokeWidth={1.5} />
              <div className="text-xl font-bold text-white mb-1">{item.value}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{item.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Logo Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto mt-12">
          {['Airbus', 'Bosch', 'Siemens', 'BMW', 'Volkswagen', 'ThyssenKrupp', 'BASF', 'Henkel'].map((company, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1.9 + idx * 0.1 }}
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
