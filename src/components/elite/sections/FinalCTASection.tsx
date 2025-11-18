'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';

export default function FinalCTASection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber} className="min-h-screen">
      <div className="text-center space-y-12">
        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-7xl md:text-9xl lg:text-[12rem] font-black text-white leading-none mb-8">
            JOIN INDIA&apos;S
            <br />
            <span className="text-[#C8102E]">ELITE OPERATORS</span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-2xl text-gray-400 max-w-3xl mx-auto"
        >
          Transform your packaging operation. Apply for Elite Partnership today.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12"
        >
          {/* Primary CTA */}
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: '0 0 40px rgba(255, 184, 28, 0.5)' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="px-12 py-6 bg-[#FFB81C] text-black font-bold text-xl rounded-full hover:bg-[#FFC940] transition-colors min-w-[300px]"
          >
            Apply for Partnership
          </motion.button>

          {/* Secondary CTA */}
          <motion.button
            whileHover={{ scale: 1.05, borderColor: '#FFB81C' }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="px-12 py-6 bg-transparent border-2 border-[#C8102E] text-white font-bold text-xl rounded-full hover:border-[#FFB81C] transition-colors min-w-[300px]"
          >
            Schedule Site Visit
          </motion.button>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
          viewport={{ once: true }}
          className="mt-16 pt-12 border-t border-gray-800"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto text-gray-500">
            <div>
              <h5 className="text-white font-semibold mb-2">Email</h5>
              <a href="mailto:elite@ergopack.in" className="hover:text-[#FFB81C] transition-colors">
                elite@ergopack.in
              </a>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-2">Phone</h5>
              <a href="tel:+911234567890" className="hover:text-[#FFB81C] transition-colors">
                +91 123 456 7890
              </a>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-2">Location</h5>
              <p>Mumbai, India</p>
            </div>
          </div>
        </motion.div>

        {/* Footer Note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          viewport={{ once: true }}
          className="text-gray-600 text-sm mt-16 pb-12"
        >
          © 2024 Ergopack India. Elite Partnership Program.
          <br />
          Engineered in Germany. Deployed across India.
        </motion.p>
      </div>
    </SectionWrapper>
  );
}
