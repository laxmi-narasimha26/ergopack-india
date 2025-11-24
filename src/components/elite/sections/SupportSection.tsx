'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';
import { Phone, Wrench, Package2, GraduationCap } from 'lucide-react';

export default function SupportSection({ sectionNumber }: { sectionNumber: number }) {
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
          24/7 SUPPORT
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Elite Partnership includes comprehensive support infrastructure
        </motion.p>

        {/* Support Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            {
              icon: Phone,
              title: 'Hotline',
              time: '24/7',
              desc: 'Dedicated technical support line',
            },
            {
              icon: Wrench,
              title: 'On-Site Service',
              time: '<24h',
              desc: 'Technician dispatch nationwide',
            },
            {
              icon: Package2,
              title: 'Spare Parts',
              time: '<48h',
              desc: 'Critical parts always in stock',
            },
            {
              icon: GraduationCap,
              title: 'Training',
              time: 'Ongoing',
              desc: 'Operator & maintenance training',
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1 + idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1A0000] to-black border border-[#C8102E] p-8 rounded-lg"
            >
              <item.icon className="w-10 h-10 text-[#C8102E] mx-auto mb-4" strokeWidth={1.5} />
              <h4 className="text-white font-bold text-xl mb-2">{item.title}</h4>
              <div className="text-[#FFB81C] font-bold text-lg mb-2">{item.time}</div>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Real-Time Support Status */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.8 }}
          viewport={{ once: true }}
          className="bg-black/60 border border-[#4A0000] p-8 rounded-lg max-w-2xl mx-auto"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white font-semibold">Support Team Online</span>
          </div>
          <p className="text-gray-500 text-sm">
            Average response time: <span className="text-white font-bold">2.3 minutes</span>
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
