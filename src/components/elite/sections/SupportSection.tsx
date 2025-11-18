'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';

export default function SupportSection({ sectionNumber }: { sectionNumber: number }) {
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
          24/7 SUPPORT
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Elite Partnership includes comprehensive support infrastructure
        </motion.p>

        {/* Support Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {[
            { icon: '📞', title: 'Hotline', time: '24/7', desc: 'Dedicated technical support line' },
            { icon: '🔧', title: 'On-Site Service', time: '<24h', desc: 'Technician dispatch nationwide' },
            { icon: '📦', title: 'Spare Parts', time: '<48h', desc: 'Critical parts always in stock' },
            { icon: '🎓', title: 'Training', time: 'Ongoing', desc: 'Operator & maintenance training' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1A0000] to-black border border-[#C8102E] p-8 rounded-lg"
            >
              <div className="text-5xl mb-4">{item.icon}</div>
              <h4 className="text-white font-bold text-xl mb-2">{item.title}</h4>
              <div className="text-[#FFB81C] font-bold text-lg mb-2">{item.time}</div>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Real-Time Support Status */}
        <div className="bg-black/60 border border-[#4A0000] p-8 rounded-lg max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-4 h-4 bg-green-500 rounded-full animate-pulse" />
            <span className="text-white font-semibold">Support Team Online</span>
          </div>
          <p className="text-gray-500 text-sm">
            Average response time: <span className="text-white font-bold">2.3 minutes</span>
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
