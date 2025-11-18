'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';

export default function FacilitySection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <div className="text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-6xl md:text-8xl font-black text-white"
        >
          FACILITY IMPACT
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Transform your entire packaging operation. From receiving to dispatch, Ergopack Elite
          integrates seamlessly into your workflow.
        </motion.p>

        {/* Facility Visualization */}
        <div className="mt-12 max-w-6xl mx-auto aspect-video bg-gradient-to-br from-[#1A0000] to-black rounded-lg border border-[#C8102E] flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#C8102E33_0%,_transparent_70%)]" />
          <span className="text-gray-600 text-2xl relative z-10">[ VIDEO: Full Facility Operation ]</span>
        </div>
      </div>
    </SectionWrapper>
  );
}
