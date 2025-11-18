'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import MassiveText from '../shared/MassiveText';
import { motion } from 'framer-motion';

export default function ConsistencySection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <MassiveText text="0.1MM TOLERANCE" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        {/* Technical Annotations */}
        <div className="max-w-5xl mx-auto bg-black/60 border border-[#C8102E] rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { metric: '±0.08mm', label: 'Strap Tension Variance' },
              { metric: '±0.1mm', label: 'Position Accuracy' },
              { metric: '100%', label: 'Consistency Rate' },
              { metric: '<2s', label: 'Cycle Time' },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-3xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-xs text-gray-500 uppercase">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-gray-400 mt-8 max-w-2xl mx-auto">
          Laser-guided positioning. Servo-controlled tensioning. Every strap identical.
        </p>
      </motion.div>
    </SectionWrapper>
  );
}
