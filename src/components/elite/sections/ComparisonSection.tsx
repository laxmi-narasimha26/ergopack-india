'use client';

import React from 'react';
import SectionWrapper from '../shared/SectionWrapper';
import { motion } from 'framer-motion';
import { X, Check, ArrowRight, Zap, Battery, Gauge, TrendingUp, Award } from 'lucide-react';

export default function ComparisonSection({ sectionNumber }: { sectionNumber: number }) {
  const comparisonData = [
    {
      category: 'Performance',
      economy: '40 m/min chain speed',
      xpert: '66 m/min chain speed',
      improvement: '65% faster',
    },
    {
      category: 'Battery',
      economy: '24V Lead-Fleece',
      xpert: 'Lithium-Ion 36.3V',
      improvement: '3.4x more cycles',
    },
    {
      category: 'Strapping Cycles',
      economy: '350 cycles per charge',
      xpert: '1200 cycles per charge',
      improvement: '3.4x productivity',
    },
    {
      category: 'Charging Time',
      economy: '8-10 hours',
      xpert: '3.5 hours',
      improvement: '65% faster',
    },
    {
      category: 'Control Interface',
      economy: 'Manual/Semi-Automatic',
      xpert: 'Siemens Touchscreen',
      improvement: 'Premium UX',
    },
    {
      category: 'Positioning',
      economy: 'Visual Guides',
      xpert: 'Line Laser Type 2',
      improvement: '±1mm precision',
    },
  ];

  return (
    <SectionWrapper sectionNumber={sectionNumber}>
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl lg:text-6xl font-black text-white text-center mb-16 tracking-tight"
      >
        ECONOMY vs X-PERT LINE
      </motion.h2>

      {/* Hero Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
        {/* Economy Line */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-blue-900/20 to-black border-2 border-blue-500/30 p-8 rounded-lg"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
              <Award className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">Economy Line</h3>
              <p className="text-sm text-blue-400">Proven & Affordable</p>
            </div>
          </div>
          <ul className="space-y-4 text-gray-300">
            {[
              '40 m/min chain speed',
              '24V lead-fleece battery',
              '350 strapping cycles',
              '8-10 hour charging time',
              'Manual/semi-auto control',
              'Visual guide positioning',
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 2, delay: 0.5 + idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <Check className="w-5 h-5 text-blue-500 flex-shrink-0" strokeWidth={2} />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-blue-500/30">
            <p className="text-sm text-gray-400">
              Models: 745E, 726E, 713E, 700, 700E, GO
            </p>
          </div>
        </motion.div>

        {/* X-pert Line */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-900/20 to-black border-2 border-[#FFB81C] p-8 rounded-lg relative overflow-hidden"
        >
          <div className="absolute top-4 right-4 bg-[#FFB81C] text-black text-xs font-bold px-3 py-1 rounded-full">
            PREMIUM
          </div>
          <div className="flex items-center gap-3 mb-6">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-3xl font-bold text-white">X-pert Line</h3>
              <p className="text-sm text-[#FFB81C]">Premium Performance</p>
            </div>
          </div>
          <ul className="space-y-4 text-gray-300">
            {[
              '66 m/min chain speed (65% faster)',
              'Lithium-Ion battery (lighter)',
              '1200 strapping cycles (3.4x more)',
              '3.5 hour charging time (65% faster)',
              'Siemens touchscreen control',
              'Line laser Type 2 positioning',
            ].map((item, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 2, delay: 0.5 + idx * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-3"
              >
                <Check className="w-5 h-5 text-[#FFB81C] flex-shrink-0" strokeWidth={2} />
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          <div className="mt-6 pt-6 border-t border-[#FFB81C]/30">
            <p className="text-sm text-gray-400">
              Models: 745X Li, 726X Li, 713X Li, 700X Li, RE
            </p>
          </div>
        </motion.div>
      </div>

      {/* Detailed Comparison Table */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto"
      >
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-700 rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-700 bg-gray-900/50">
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Feature
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Award className="h-5 w-5 text-blue-500" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-blue-500">
                        Economy Line
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Zap className="h-5 w-5 text-[#FFB81C]" />
                      <span className="text-xs font-semibold uppercase tracking-wider text-[#FFB81C]">
                        X-pert Line
                      </span>
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Improvement
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, idx) => (
                  <motion.tr
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-gray-800 hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-6 py-5">
                      <span className="font-medium text-white">{row.category}</span>
                    </td>
                    <td className="px-6 py-5 text-center text-gray-300">
                      {row.economy}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="font-semibold text-[#FFB81C]">{row.xpert}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                      <div className="inline-flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1 text-xs font-bold text-green-500">
                        <TrendingUp className="h-3 w-3" />
                        {row.improvement}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Key Takeaway */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        viewport={{ once: true }}
        className="mt-16 max-w-4xl mx-auto text-center"
      >
        <div className="bg-gradient-to-br from-[#1A0000] to-black border-2 border-[#FFB81C] rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-4">The X-pert Advantage</h3>
          <p className="text-lg text-gray-300 mb-6">
            X-pert Line delivers <span className="text-[#FFB81C] font-bold">65% faster performance</span>,{' '}
            <span className="text-[#FFB81C] font-bold">3.4x more productivity</span>, and{' '}
            <span className="text-[#FFB81C] font-bold">65% faster charging</span> compared to Economy Line
          </p>
          <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <Battery className="h-4 w-4 text-green-500" />
              <span>Lithium-Ion Technology</span>
            </div>
            <div className="flex items-center gap-2">
              <Gauge className="h-4 w-4 text-amber-500" />
              <span>66 m/min Speed</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-500" />
              <span>1200 Cycles</span>
            </div>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
}
