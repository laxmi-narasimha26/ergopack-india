'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';
import { Building2, Workflow, Package } from 'lucide-react';

export default function FacilitySection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <div className="text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
        >
          FACILITY IMPACT
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-xl text-gray-400 max-w-3xl mx-auto"
        >
          Transform your entire packaging operation. From receiving to dispatch, Ergopack Elite
          integrates seamlessly into your workflow.
        </motion.p>

        {/* Integration Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
          {[
            { icon: Building2, label: 'Facility Integration', desc: 'Seamless fit into existing layout' },
            { icon: Workflow, label: 'Workflow Optimization', desc: 'End-to-end process enhancement' },
            { icon: Package, label: 'Output Quality', desc: 'Consistent, reliable results' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 2, delay: 1 + idx * 0.3 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1A0000] to-black border border-[#4A0000] p-6 rounded-lg"
            >
              <item.icon className="w-8 h-8 text-[#C8102E] mx-auto mb-4" strokeWidth={1.5} />
              <h4 className="text-white font-bold text-lg mb-2">{item.label}</h4>
              <p className="text-gray-500 text-sm">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Facility Visualization */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1.9 }}
          viewport={{ once: true }}
          className="mt-12 max-w-6xl mx-auto aspect-video bg-gradient-to-br from-[#1A0000] to-black rounded-lg border border-[#C8102E] flex items-center justify-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#C8102E33_0%,_transparent_70%)]" />
          <span className="text-gray-600 text-2xl relative z-10">[ VIDEO: Full Facility Operation ]</span>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
