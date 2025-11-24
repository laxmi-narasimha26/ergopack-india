'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/premium/ScrollReveal';
import { Award, CheckCircle2, Shield, Globe } from 'lucide-react';
import Image from 'next/image';

interface Certification {
  name: string;
  icon?: string;
  description?: string;
}

interface TrustSignalsSectionProps {
  certifications: Certification[];
  madeInGermany?: boolean;
  warranty?: string;
}

export function TrustSignalsSection({
  certifications,
  madeInGermany = true,
  warranty,
}: TrustSignalsSectionProps) {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <ScrollReveal delay={0.1} direction="fade">
            <span
              className="inline-block px-4 py-2 rounded-full glass border-premium text-xs uppercase 
                           tracking-[0.2em] text-gold mb-6"
            >
              Trust & Assurance
            </span>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="up">
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-primary">
              Certified{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">
                Excellence
              </span>
            </h2>
          </ScrollReveal>

          <ScrollReveal delay={0.3} direction="up">
            <p className="text-xl text-secondary max-w-3xl mx-auto leading-relaxed">
              Backed by industry certifications, rigorous testing, and decades of German engineering
              heritage.
            </p>
          </ScrollReveal>
        </div>

        {/* Trust Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
          {/* Made in Germany */}
          {madeInGermany && (
            <ScrollReveal delay={0.4} direction="up">
              <motion.div
                className="text-center p-8 rounded-2xl glass border-premium group hover:border-gold/30 transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div
                  className="w-20 h-20 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-6 
                              group-hover:bg-gold/20 transition-colors"
                >
                  <Globe className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-primary">Made in Germany</h3>
                <p className="text-secondary leading-relaxed">
                  Precision engineering and uncompromising quality from the heart of industrial
                  excellence.
                </p>
              </motion.div>
            </ScrollReveal>
          )}

          {/* Warranty */}
          {warranty && (
            <ScrollReveal delay={0.5} direction="up">
              <motion.div
                className="text-center p-8 rounded-2xl glass border-premium group hover:border-gold/30 transition-all duration-300"
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div
                  className="w-20 h-20 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-6 
                              group-hover:bg-gold/20 transition-colors"
                >
                  <Shield className="w-10 h-10 text-gold" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-primary">{warranty} Warranty</h3>
                <p className="text-secondary leading-relaxed">
                  Comprehensive protection and dedicated support for your investment.
                </p>
              </motion.div>
            </ScrollReveal>
          )}

          {/* 24/7 Support */}
          <ScrollReveal delay={0.6} direction="up">
            <motion.div
              className="text-center p-8 rounded-2xl glass border-premium group hover:border-gold/30 transition-all duration-300"
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <div
                className="w-20 h-20 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-6 
                            group-hover:bg-gold/20 transition-colors"
              >
                <CheckCircle2 className="w-10 h-10 text-gold" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-primary">Expert Support</h3>
              <p className="text-secondary leading-relaxed">
                Direct access to our engineering team for technical assistance and optimization.
              </p>
            </motion.div>
          </ScrollReveal>
        </div>

        {/* Certifications Grid */}
        <ScrollReveal delay={0.7} direction="up">
          <div className="glass rounded-2xl p-8 border-premium max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center text-primary">
              Industry Certifications
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  className="flex flex-col items-center"
                >
                  <div
                    className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-3
                                hover:bg-gold/10 transition-colors"
                  >
                    <Award className="w-8 h-8 text-gold" />
                  </div>
                  <span className="text-xs text-center text-secondary font-medium">
                    {cert.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
