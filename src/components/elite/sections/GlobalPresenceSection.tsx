'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GlobalIcon, CertificateIcon, IndustryIcon, SupportIcon } from '@/components/elite/ui/PremiumIcons';
import FeatureTooltip from '@/components/elite/ui/FeatureTooltip';

/**
 * Global Presence & Certifications Section
 * Premium showcase of worldwide reach, certifications, and industry partnerships
 */

const GLOBAL_STATS = [
  { value: '45+', label: 'Countries', Icon: GlobalIcon, color: '#FFB81C' },
  { value: '500K+', label: 'Machines', Icon: IndustryIcon, color: '#00D9FF' },
  { value: '24/7', label: 'Support', Icon: SupportIcon, color: '#00FF88' },
  { value: '100+', label: 'Certifications', Icon: CertificateIcon, color: '#C8102E' },
];

const CERTIFICATIONS = [
  {
    name: 'ISO 12100:2010',
    description: 'Safety of machinery - General principles for design',
    fullExplanation: 'International standard ensuring ErgopackGermany machines meet the highest safety requirements through risk assessment and reduction protocols.',
  },
  {
    name: 'EU Declaration of Conformity',
    description: 'Compliance with European safety standards',
    fullExplanation: 'Official certification confirming all products meet stringent EU Machinery Directive requirements for safe operation across European markets.',
  },
  {
    name: 'AGR Certified',
    description: 'Aktion Gesunder Rücken - Back-friendly design certification',
    fullExplanation: 'Premium ergonomic certification awarded by German back health experts, confirming our machines reduce operator strain and prevent workplace injuries.',
  },
  {
    name: 'CE Marking',
    description: 'European conformity certification',
    fullExplanation: 'Mandatory European certification indicating products meet EU health, safety, and environmental protection standards.',
  },
  {
    name: 'TÜV Approved',
    description: 'German Technical Inspection Association approval',
    fullExplanation: 'Independent verification by Germany\'s leading technical inspection authority, ensuring superior quality and safety standards.',
  },
  {
    name: 'RoHS Compliant',
    description: 'Restriction of Hazardous Substances compliance',
    fullExplanation: 'Environmental certification ensuring products are free from hazardous materials, meeting global sustainability standards.',
  },
];

const KEY_REGIONS = [
  { region: 'Europe', countries: '28+ Countries', highlight: 'Manufacturing Hub' },
  { region: 'North America', countries: '3 Countries', highlight: 'Innovation Center' },
  { region: 'Asia Pacific', countries: '12+ Countries', highlight: 'Growing Market' },
  { region: 'Middle East', countries: '6+ Countries', highlight: 'Strategic Expansion' },
];

export default function GlobalPresenceSection({ sectionNumber }: { sectionNumber?: number }) {
  return (
    <section
      data-section={sectionNumber}
      className="relative min-h-screen py-32 px-8 bg-gradient-to-b from-black via-[#0A0A0A] to-black overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,16,46,0.1),transparent_50%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[#FFB81C] font-mono text-sm tracking-[0.3em] uppercase mb-6 block">
            Worldwide Excellence
          </span>
          <h2 className="text-6xl md:text-8xl font-black mb-8">
            <span className="text-theme-primary">GLOBAL</span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#C8102E] to-[#FFB81C]">
              PRESENCE
            </span>
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {GLOBAL_STATS.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-black/80 to-[#1A0000]/80 backdrop-blur-xl border-2 border-[#4A0000] rounded-2xl p-8 hover:border-[#C8102E] transition-all duration-500 group text-center"
            >
              <div className="flex justify-center mb-4">
                <stat.Icon size={56} color={stat.color} />
              </div>
              <div className="text-5xl font-black mb-2" style={{ color: stat.color }}>
                {stat.value}
              </div>
              <div className="text-theme-secondary uppercase tracking-wider text-sm">
                {stat.label}
              </div>
              <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#C8102E] to-[#FFB81C] transition-all duration-500 mx-auto" />
            </motion.div>
          ))}
        </div>

        {/* Certifications Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-24"
        >
          <h3 className="text-4xl md:text-5xl font-black text-theme-primary mb-12 text-center">
            Industry Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATIONS.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <FeatureTooltip
                  feature={cert.name}
                  explanation={cert.fullExplanation}
                  position="top"
                >
                  <div className="bg-gradient-to-br from-black/60 to-[#1A0000]/60 backdrop-blur-xl border border-[#4A0000] rounded-xl p-6 hover:border-[#FFB81C] transition-all duration-500 group cursor-help h-full">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        <CertificateIcon size={40} color="#FFB81C" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-theme-primary mb-2 group-hover:text-[#FFB81C] transition-colors duration-300">
                          {cert.name}
                        </h4>
                        <p className="text-sm text-theme-secondary leading-relaxed">
                          {cert.description}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 h-px bg-gradient-to-r from-transparent via-[#4A0000] to-transparent group-hover:via-[#FFB81C] transition-colors duration-500" />
                  </div>
                </FeatureTooltip>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Regional Presence */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-4xl md:text-5xl font-black text-theme-primary mb-12 text-center">
            Regional Coverage
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {KEY_REGIONS.map((region, index) => (
              <motion.div
                key={region.region}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-[#1A0000]/80 to-black/80 backdrop-blur-xl border-2 border-[#4A0000] rounded-2xl p-8 hover:border-[#C8102E] transition-all duration-500 group text-center"
              >
                <div className="mb-4">
                  <GlobalIcon size={48} color="#C8102E" className="mx-auto" />
                </div>
                <h4 className="text-2xl font-bold text-theme-primary mb-3 group-hover:text-[#FFB81C] transition-colors duration-300">
                  {region.region}
                </h4>
                <p className="text-theme-secondary text-sm mb-4">{region.countries}</p>
                <div className="inline-block px-4 py-2 bg-[#C8102E]/20 border border-[#C8102E]/30 rounded-full">
                  <span className="text-xs text-[#FFB81C] font-bold uppercase tracking-wider">
                    {region.highlight}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
