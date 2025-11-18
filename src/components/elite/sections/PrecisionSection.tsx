'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import MassiveText from '../shared/MassiveText';
import { motion } from 'framer-motion';

export default function PrecisionSection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <MassiveText text="PRECISION" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          Close-up strapping mechanism engineered to 0.1mm tolerances.
          Every strap, perfectly tensioned. Every package, secured with precision.
        </p>

        {/* Video Placeholder */}
        <div className="mt-8 max-w-4xl mx-auto aspect-video bg-gradient-to-br from-[#1A0000] to-black rounded-lg border border-[#4A0000] flex items-center justify-center">
          <span className="text-gray-600 text-xl">[ VIDEO: Strapping Mechanism Close-Up ]</span>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
