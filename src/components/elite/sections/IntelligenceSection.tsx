'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MassiveText from '../shared/MassiveText';

export default function IntelligenceSection({ sectionNumber }: { sectionNumber: number }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const features = [
    {
      icon: '📊',
      title: 'Real-Time Analytics',
      description: 'Live production metrics. Performance dashboards. Predictive insights.',
      delay: 0,
    },
    {
      icon: '🔗',
      title: 'ERP Integration',
      description: 'Seamless SAP, Oracle integration. Bi-directional data flow. API-first architecture.',
      delay: 0.2,
    },
    {
      icon: '📱',
      title: 'Remote Monitoring',
      description: '24/7 access anywhere. Mobile-first interface. Cloud-synchronized.',
      delay: 0.4,
    },
    {
      icon: '🔔',
      title: 'Predictive Maintenance',
      description: 'AI-powered alerts. Prevent downtime before it happens. Smart diagnostics.',
      delay: 0.6,
    },
  ];

  return (
    <section ref={sectionRef} data-section className="relative min-h-screen py-32 px-8">
      <MassiveText text="INDUSTRY 4.0" />

      <div className="mt-20 max-w-7xl mx-auto">
        {/* Flowing Diagonal Layout - NO GRID */}
        <div className="relative space-y-24">
          {features.map((feature, idx) => {
            const isEven = idx % 2 === 0;
            const y = useTransform(scrollYProgress, [0, 1], [idx * 50, -idx * 50]);

            return (
              <motion.div
                key={idx}
                style={{ y }}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1.2, delay: feature.delay, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                className={`flex items-start gap-8 ${isEven ? 'flex-row' : 'flex-row-reverse'} max-w-4xl ${isEven ? '' : 'ml-auto'}`}
              >
                {/* Icon with Glow */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="flex-shrink-0"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-[#C8102E] blur-2xl opacity-30" />
                    <div className="relative text-8xl">{feature.icon}</div>
                  </div>
                </motion.div>

                {/* Content */}
                <div className={`flex-1 ${isEven ? 'text-left' : 'text-right'}`}>
                  <motion.div
                    className={`mb-4 h-px bg-gradient-to-${isEven ? 'r' : 'l'} from-[#C8102E] via-[#FFB81C] to-transparent`}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 1, delay: feature.delay + 0.3 }}
                    viewport={{ once: true }}
                    style={{ transformOrigin: isEven ? 'left' : 'right' }}
                  />

                  <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                    {feature.title}
                  </h3>

                  <p className="text-gray-500 text-lg leading-relaxed font-light max-w-md">
                    {feature.description}
                  </p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: feature.delay + 0.6 }}
                    viewport={{ once: true }}
                    className={`mt-6 inline-block`}
                  >
                    <span className="text-[#FFB81C] text-sm font-mono uppercase tracking-wider">
                      ► Learn More
                    </span>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
