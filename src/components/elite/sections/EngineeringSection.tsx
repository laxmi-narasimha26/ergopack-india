'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MassiveText from '../shared/MassiveText';

export default function EngineeringSection({ sectionNumber }: { sectionNumber: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [200, -200]);

  return (
    <section ref={sectionRef} data-section className="relative min-h-screen py-32 px-8">
      <MassiveText text="GERMAN ENGINEERING" />

      <div className="mt-20 max-w-7xl mx-auto">
        {/* Flowing Staggered Layout - NO BOXES */}
        <div className="relative">
          {/* Component 1 - Top Left */}
          <motion.div
            style={{ y: y1 }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="max-w-md mb-32"
          >
            <div className="relative">
              <motion.div
                className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#C8102E] to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                viewport={{ once: true }}
              />
              <h3 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Carbon Steel Frame
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed font-light">
                Industrial-grade durability engineered for 24/7 continuous operation.
                Precision-welded joints ensure structural integrity under extreme loads.
              </p>
              <motion.div
                className="mt-6 text-[#FFB81C] text-sm font-mono uppercase tracking-wider"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                viewport={{ once: true }}
              >
                ► ISO 9001 Certified
              </motion.div>
            </div>
          </motion.div>

          {/* Component 2 - Center Right */}
          <motion.div
            style={{ y: y2 }}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            viewport={{ once: true }}
            className="max-w-md ml-auto mb-32"
          >
            <div className="relative">
              <motion.div
                className="absolute -right-4 top-0 w-1 h-full bg-gradient-to-b from-[#FFB81C] to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
              <h3 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight text-right">
                Precision Sensors
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed font-light text-right">
                Real-time quality control with microsecond response times.
                Laser-guided positioning ensures 0.1mm tolerance accuracy.
              </p>
              <motion.div
                className="mt-6 text-[#FFB81C] text-sm font-mono uppercase tracking-wider text-right"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                viewport={{ once: true }}
              >
                ► Sub-millisecond Response
              </motion.div>
            </div>
          </motion.div>

          {/* Component 3 - Bottom Left */}
          <motion.div
            style={{ y: y3 }}
            initial={{ opacity: 0, x: -100 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            viewport={{ once: true }}
            className="max-w-md"
          >
            <div className="relative">
              <motion.div
                className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-[#C8102E] to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 1, delay: 0.7 }}
                viewport={{ once: true }}
              />
              <h3 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
                Modular Design
              </h3>
              <p className="text-gray-500 text-lg leading-relaxed font-light">
                Tool-free maintenance access. Hot-swappable components minimize downtime.
                Designed for rapid service and maximum uptime.
              </p>
              <motion.div
                className="mt-6 text-[#FFB81C] text-sm font-mono uppercase tracking-wider"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                viewport={{ once: true }}
              >
                ► 15-minute Component Swap
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Large Image Placeholder with Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mt-32 relative"
        >
          <div className="aspect-[21/9] bg-gradient-to-br from-[#1A0000] via-black to-[#1A0000] rounded-2xl overflow-hidden border border-[#4A0000] relative group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#C8102E]/20 to-transparent"
              initial={{ x: '-100%' }}
              whileInView={{ x: '100%' }}
              transition={{ duration: 2, ease: "easeInOut" }}
              viewport={{ once: true }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-gray-700 text-2xl font-mono">[ IMAGE: Internal Components View ]</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
