'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';
import { Settings2, Monitor, Award } from 'lucide-react';

export default function ScalabilitySection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <div className="text-center space-y-12">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
        >
          INFINITE SCALABILITY
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Start with one machine. Scale to hundreds. Same performance, every time.
        </motion.p>

        {/* Visualization: Multiple Machines */}
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          {Array.from({ length: 8 }).map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 2, delay: 1 + idx * 0.1 }}
              viewport={{ once: true }}
              className="aspect-square bg-gradient-to-br from-[#1A0000] to-black border border-[#4A0000] rounded-lg flex items-center justify-center relative"
            >
              <Settings2 className="w-12 h-12 text-[#C8102E]" strokeWidth={1.5} />
              <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          {[
            { icon: Settings2, title: 'Modular Architecture', desc: 'Add machines as demand grows' },
            { icon: Monitor, title: 'Centralized Control', desc: 'Manage entire fleet from one dashboard' },
            { icon: Award, title: 'Consistent Quality', desc: 'Same precision across all units' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1.8 + idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-black/60 border border-[#4A0000] p-6 rounded-lg"
            >
              <item.icon className="w-8 h-8 text-[#C8102E] mx-auto mb-4" strokeWidth={1.5} />
              <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
