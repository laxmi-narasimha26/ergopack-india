'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';
import { Users, Factory, TrendingUp } from 'lucide-react';

export default function EliteNetworkSection({ sectionNumber }: { sectionNumber: number }) {
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
          ELITE NETWORK
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 max-w-4xl mx-auto text-center space-y-8"
      >
        <p className="text-xl text-gray-300">
          Join India&apos;s category leaders who have already transformed their operations
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: Users, num: '47', label: 'Elite Partners in India' },
            { icon: Factory, num: '2,500+', label: 'Machines Deployed' },
            { icon: TrendingUp, num: '99.7%', label: 'Average Uptime' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2.5, delay: 1 + idx * 0.3 }}
              viewport={{ once: true }}
              className="bg-black/60 border border-[#C8102E] p-8 rounded-lg"
            >
              <stat.icon className="w-8 h-8 text-[#FFB81C] mx-auto mb-4" strokeWidth={1.5} />
              <div className="text-5xl font-black text-[#C8102E] mb-2">{stat.num}</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.9 }}
          viewport={{ once: true }}
          className="text-gray-500 text-sm mt-8"
        >
          Partnership applications are reviewed quarterly. Selection criteria include production
          volume, quality standards, and commitment to operational excellence.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}
