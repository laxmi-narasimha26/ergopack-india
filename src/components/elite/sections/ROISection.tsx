'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, DollarSign } from 'lucide-react';

export default function ROISection({ sectionNumber }: { sectionNumber: number }) {
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
          3× THROUGHPUT
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 max-w-5xl mx-auto"
      >
        <div className="bg-gradient-to-br from-[#1A0000] to-black border border-[#FFB81C] p-12 rounded-lg">
          <div className="flex items-center justify-center gap-3 mb-8">
            <DollarSign className="w-10 h-10 text-[#FFB81C]" strokeWidth={2} />
            <h3 className="text-4xl font-bold text-white text-center">
              Average ROI: <span className="text-[#FFB81C]">18 Months</span>
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cost Savings */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingDown className="w-6 h-6 text-[#FFB81C]" strokeWidth={2} />
                <h4 className="text-xl font-bold text-white">Cost Reduction</h4>
              </div>
              <ul className="space-y-3 text-gray-300">
                {[
                  { label: 'Labor costs', value: '↓ 75%' },
                  { label: 'Material waste', value: '↓ 40%' },
                  { label: 'Rework', value: '↓ 95%' },
                  { label: 'Downtime', value: '↓ 85%' },
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2, delay: 1 + idx * 0.2 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center"
                  >
                    <span>{item.label}:</span>
                    <span className="text-[#FFB81C] font-bold text-lg">{item.value}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Output Increase */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-6 h-6 text-[#FFB81C]" strokeWidth={2} />
                <h4 className="text-xl font-bold text-white">Output Increase</h4>
              </div>
              <ul className="space-y-3 text-gray-300">
                {[
                  { label: 'Daily capacity', value: '↑ 300%' },
                  { label: 'Quality consistency', value: '↑ 100%' },
                  { label: 'Customer satisfaction', value: '↑ 45%' },
                  { label: 'On-time delivery', value: '↑ 60%' },
                ].map((item, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 2, delay: 1 + idx * 0.2 }}
                    viewport={{ once: true }}
                    className="flex justify-between items-center"
                  >
                    <span>{item.label}:</span>
                    <span className="text-[#FFB81C] font-bold text-lg">{item.value}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.8 }}
          viewport={{ once: true }}
          className="text-center text-gray-500 mt-8 text-sm"
        >
          * Based on average data from 47 Elite Partners across India (2023-2024)
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}
