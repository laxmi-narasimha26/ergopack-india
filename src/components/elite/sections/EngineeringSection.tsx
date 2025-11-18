'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import MassiveText from '../shared/MassiveText';
import { motion } from 'framer-motion';

export default function EngineeringSection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <MassiveText text="GERMAN ENGINEERING" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {[
          { label: 'Carbon Steel Frame', desc: 'Industrial-grade durability' },
          { label: 'Precision Sensors', desc: 'Real-time quality control' },
          { label: 'Modular Design', desc: 'Easy maintenance access' },
        ].map((item, idx) => (
          <div key={idx} className="border border-[#4A0000] bg-black/40 p-6 rounded">
            <h3 className="text-white font-bold text-xl mb-2">{item.label}</h3>
            <p className="text-gray-500 text-sm">{item.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Image Placeholder */}
      <div className="mt-8 max-w-4xl mx-auto aspect-video bg-gradient-to-br from-[#1A0000] to-black rounded-lg border border-[#4A0000] flex items-center justify-center">
        <span className="text-gray-600 text-xl">[ IMAGE: Internal Components View ]</span>
      </div>
    </SectionWrapper>
  );
}
