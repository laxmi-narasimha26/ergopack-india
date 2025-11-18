'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import MassiveText from '../shared/MassiveText';
import { motion } from 'framer-motion';

export default function EliteNetworkSection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <MassiveText text="ELITE NETWORK" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 max-w-4xl mx-auto text-center space-y-8"
      >
        <p className="text-2xl text-gray-300">
          Join India&apos;s category leaders who have already transformed their operations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { num: '47', label: 'Elite Partners in India' },
            { num: '2,500+', label: 'Machines Deployed' },
            { num: '99.7%', label: 'Average Uptime' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-black/60 border border-[#C8102E] p-8 rounded-lg">
              <div className="text-5xl font-black text-[#C8102E] mb-2">{stat.num}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>

        <p className="text-gray-500 text-sm mt-8">
          Partnership applications are reviewed quarterly. Selection criteria include production volume,
          quality standards, and commitment to operational excellence.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
