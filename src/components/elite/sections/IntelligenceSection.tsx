'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import MassiveText from '../shared/MassiveText';
import { motion } from 'framer-motion';

export default function IntelligenceSection({ sectionNumber }: { sectionNumber: number }) {
  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <MassiveText text="INDUSTRY 4.0" />

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: true }}
        className="mt-12 max-w-5xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Connectivity Features */}
          {[
            { icon: '📊', title: 'Real-Time Analytics', desc: 'Live production metrics and performance dashboards' },
            { icon: '🔗', title: 'ERP Integration', desc: 'Seamless connection with SAP, Oracle, and custom systems' },
            { icon: '📱', title: 'Remote Monitoring', desc: '24/7 access from anywhere via mobile and web' },
            { icon: '🔔', title: 'Predictive Maintenance', desc: 'AI-powered alerts prevent downtime before it happens' },
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1A0000] to-black border border-[#4A0000] p-6 rounded-lg"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-500 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
