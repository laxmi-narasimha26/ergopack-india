'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import MassiveText from '../shared/MassiveText';
import { motion } from 'framer-motion';

export default function ROISection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <MassiveText text="3× THROUGHPUT" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 max-w-5xl mx-auto"
      >
        <div className="bg-gradient-to-br from-[#1A0000] to-black border border-[#FFB81C] p-12 rounded-lg">
          <h3 className="text-4xl font-bold text-white mb-8 text-center">
            Average ROI: <span className="text-[#FFB81C]">18 Months</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Cost Savings */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Cost Reduction</h4>
              <ul className="space-y-3 text-gray-300">
                {[
                  { label: 'Labor costs', value: '↓ 75%' },
                  { label: 'Material waste', value: '↓ 40%' },
                  { label: 'Rework', value: '↓ 95%' },
                  { label: 'Downtime', value: '↓ 85%' },
                ].map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>{item.label}:</span>
                    <span className="text-[#FFB81C] font-bold text-lg">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Output Increase */}
            <div>
              <h4 className="text-xl font-bold text-white mb-4">Output Increase</h4>
              <ul className="space-y-3 text-gray-300">
                {[
                  { label: 'Daily capacity', value: '↑ 300%' },
                  { label: 'Quality consistency', value: '↑ 100%' },
                  { label: 'Customer satisfaction', value: '↑ 45%' },
                  { label: 'On-time delivery', value: '↑ 60%' },
                ].map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center">
                    <span>{item.label}:</span>
                    <span className="text-[#FFB81C] font-bold text-lg">{item.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 mt-8 text-sm">
          * Based on average data from 47 Elite Partners across India (2023-2024)
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
