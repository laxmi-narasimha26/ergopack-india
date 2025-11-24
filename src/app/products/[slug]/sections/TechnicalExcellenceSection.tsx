'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ScrollReveal } from '@/components/premium/ScrollReveal';
import { Download, MessageCircle, FileText, Settings, Zap, Ruler } from 'lucide-react';

interface SpecItem {
  label: string;
  value: string | number;
  unit?: string;
  highlight?: boolean;
}

interface SpecSection {
  title: string;
  icon: React.ReactNode;
  items: SpecItem[];
}

interface TechnicalExcellenceSectionProps {
  model: string;
  specs: {
    system: SpecItem[];
    performance: SpecItem[];
    power: SpecItem[];
    materials?: SpecItem[];
  };
  pdfPath?: string;
}

export function TechnicalExcellenceSection({
  model,
  specs,
  pdfPath,
}: TechnicalExcellenceSectionProps) {
  const [activeTab, setActiveTab] = useState(0);

  const tabs: SpecSection[] = [
    { title: 'System', icon: <Settings className="w-5 h-5" />, items: specs.system },
    { title: 'Performance', icon: <Zap className="w-5 h-5" />, items: specs.performance },
    { title: 'Power', icon: <FileText className="w-5 h-5" />, items: specs.power },
  ];

  if (specs.materials) {
    tabs.push({ title: 'Materials', icon: <Ruler className="w-5 h-5" />, items: specs.materials });
  }

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(212,175,55,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(212,175,55,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 pb-8 border-b border-premium">
          <div className="mb-6 lg:mb-0">
            <ScrollReveal delay={0.1} direction="fade">
              <span
                className="inline-block px-4 py-2 rounded-full glass border-premium text-xs uppercase 
                             tracking-[0.2em] text-gold mb-4"
              >
                Technical Specifications
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="up">
              <h2 className="text-4xl sm:text-5xl font-bold mb-2 text-primary">
                Precision Metrics
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3} direction="up">
              <p className="text-secondary">
                Engineering excellence in every detail for Model {model}
              </p>
            </ScrollReveal>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            {pdfPath && (
              <ScrollReveal delay={0.4} direction="left">
                <motion.a
                  href={pdfPath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 rounded-full glass border-premium
                           text-gold hover:border-gold/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download className="w-4 h-4 mr-2 group-hover:animate-bounce" />
                  <span>Download Technical Datasheet</span>
                </motion.a>
              </ScrollReveal>
            )}

            <ScrollReveal delay={0.5} direction="left">
              <motion.button
                className="inline-flex items-center px-6 py-3 rounded-full bg-gold text-luxury-dark-gray
                         font-semibold hover:shadow-premium-xl transition-all duration-300 group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <MessageCircle className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                <span>Talk to Engineer</span>
              </motion.button>
            </ScrollReveal>
          </div>
        </div>

        {/* Tabbed Interface */}
        <div className="max-w-5xl mx-auto">
          {/* Tab Buttons */}
          <ScrollReveal delay={0.3} direction="up">
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab.title}
                  onClick={() => setActiveTab(index)}
                  className={`px-8 py-4 rounded-xl font-medium transition-all duration-300 flex items-center gap-2
                            ${
                              activeTab === index
                                ? 'bg-gold text-luxury-dark-gray shadow-premium-md'
                                : 'glass border-premium text-secondary hover:border-gold/30'
                            }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab.icon}
                  {tab.title}
                </motion.button>
              ))}
            </div>
          </ScrollReveal>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="glass rounded-2xl p-8 border-premium"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {tabs[activeTab].items.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className={`flex justify-between items-baseline pb-4 border-b 
                              ${item.highlight ? 'border-gold/30' : 'border-premium'}
                              transition-colors duration-300 group`}
                  >
                    <span
                      className="text-secondary font-light text-sm tracking-wide 
                                   group-hover:text-primary transition-colors"
                    >
                      {item.label}
                    </span>
                    <span
                      className={`font-mono text-base tracking-tight font-semibold
                                    ${item.highlight ? 'text-gold' : 'text-primary'}`}
                    >
                      {item.value}
                      {item.unit && (
                        <span className="text-secondary ml-1 text-xs">{item.unit}</span>
                      )}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
