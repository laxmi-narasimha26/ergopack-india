'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';
import { Ruler, Settings, CheckCircle, Timer } from 'lucide-react';

export default function ConsistencySection({ sectionNumber }: { sectionNumber: number }) {
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
          0.1MM TOLERANCE
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 2, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        {/* Technical Annotations */}
        <div className="max-w-5xl mx-auto bg-black/60 border border-[#C8102E] rounded-lg p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Settings, metric: '±0.08mm', label: 'Strap Tension Variance' },
              { icon: Ruler, metric: '±0.1mm', label: 'Position Accuracy' },
              { icon: CheckCircle, metric: '100%', label: 'Consistency Rate' },
              { icon: Timer, metric: '<2s', label: 'Cycle Time' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 2, delay: 0.8 + idx * 0.2 }}
                viewport={{ once: true }}
              >
                <item.icon className="w-6 h-6 text-[#C8102E] mx-auto mb-3" strokeWidth={1.5} />
                <div className="text-3xl font-bold text-white mb-1">{item.metric}</div>
                <div className="text-xs text-gray-500 uppercase">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.6 }}
          viewport={{ once: true }}
          className="text-center text-gray-400 mt-8 max-w-2xl mx-auto"
        >
          Laser-guided positioning. Servo-controlled tensioning. Every strap identical.
        </motion.p>
      </motion.div>
    </SectionWrapper>
  );
}
