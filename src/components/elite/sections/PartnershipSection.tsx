'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function PartnershipSection({ sectionNumber }: { sectionNumber: number }) {
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
          PARTNERSHIP PROCESS
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Elite Partnership is by application. Here&apos;s how it works:
        </motion.p>

        {/* Process Timeline */}
        <div className="max-w-5xl mx-auto mt-16">
          {[
            {
              step: '01',
              title: 'Application',
              desc: 'Submit your facility details and production requirements',
              time: 'Day 1',
            },
            {
              step: '02',
              title: 'Site Assessment',
              desc: 'Our engineers visit your facility for compatibility analysis',
              time: 'Week 1-2',
            },
            {
              step: '03',
              title: 'Custom Configuration',
              desc: 'We design a tailored solution for your specific needs',
              time: 'Week 3-4',
            },
            {
              step: '04',
              title: 'Installation & Training',
              desc: 'Professional installation and comprehensive operator training',
              time: 'Week 5-6',
            },
            {
              step: '05',
              title: 'Go Live',
              desc: 'Start production with full support infrastructure',
              time: 'Week 7',
            },
          ].map((phase, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 2, delay: 1 + idx * 0.2 }}
              viewport={{ once: true }}
              className="flex items-start gap-6 mb-8 bg-gradient-to-r from-[#1A0000] to-transparent border-l-4 border-[#C8102E] p-6 rounded-r-lg"
            >
              <div className="flex-shrink-0 w-16 h-16 bg-[#C8102E] rounded-full flex items-center justify-center">
                <span className="text-white font-black text-xl">{phase.step}</span>
              </div>
              <div className="flex-grow text-left">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="text-white font-bold text-2xl">{phase.title}</h4>
                  <span className="text-[#FFB81C] text-sm font-semibold">{phase.time}</span>
                </div>
                <p className="text-gray-400">{phase.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Eligibility Criteria */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 2 }}
          viewport={{ once: true }}
          className="bg-black/60 border border-[#4A0000] p-8 rounded-lg max-w-3xl mx-auto text-left"
        >
          <h4 className="text-white font-bold text-xl mb-4 text-center">Eligibility Criteria</h4>
          <ul className="space-y-2 text-gray-400">
            {[
              'Minimum 1,000 packages/day production volume',
              'Commitment to quality and operational excellence',
              'Facility infrastructure suitable for automation',
              'Dedicated team for operator training',
            ].map((criterion, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 2, delay: 2.3 + idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3"
              >
                <Check className="w-5 h-5 text-[#FFB81C] flex-shrink-0 mt-0.5" strokeWidth={2} />
                <span>{criterion}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
