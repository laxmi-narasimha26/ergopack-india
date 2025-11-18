'use client';

import React from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '../shared/SectionWrapper';

export default function HeroSection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <div className="text-center space-y-8">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black text-white leading-none tracking-tighter">
            ERGOPACK
            <br />
            <span className="text-[#C8102E]">ELITE</span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed"
        >
          Operational excellence infrastructure.
        </motion.p>

        {/* Context Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          Ergopack Elite represents 25 years of German precision engineering,
          now empowering India&apos;s category-leading manufacturers to achieve
          operational excellence through automated strapping infrastructure.
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
