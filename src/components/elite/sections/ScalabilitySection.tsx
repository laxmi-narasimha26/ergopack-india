'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';

export default function ScalabilitySection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <div className="text-center space-y-12">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-black text-white"
        >
          INFINITE SCALABILITY
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-2xl text-gray-400 max-w-3xl mx-auto"
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
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="aspect-square bg-gradient-to-br from-[#1A0000] to-black border border-[#4A0000] rounded-lg flex items-center justify-center relative"
            >
              <div className="text-[#C8102E] text-4xl">⚙</div>
              <div className="absolute top-2 right-2 w-3 h-3 bg-green-500 rounded-full" />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          {[
            { title: 'Modular Architecture', desc: 'Add machines as demand grows' },
            { title: 'Centralized Control', desc: 'Manage entire fleet from one dashboard' },
            { title: 'Consistent Quality', desc: 'Same precision across all units' },
          ].map((item, idx) => (
            <div key={idx} className="bg-black/60 border border-[#4A0000] p-6 rounded-lg">
              <h4 className="text-white font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
