'use client';

import { motion } from 'framer-motion';
import { ScrollReveal } from '@/components/premium/ScrollReveal';
import { ArrowRight, Download, MessageCircle, HelpCircle } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

interface FinalCTASectionProps {
  model: string;
  onRequestDemo: () => void;
  onDownloadBrochure: () => void;
  faqs?: { question: string; answer: string }[];
}

export function FinalCTASection({
  model,
  onRequestDemo,
  onDownloadBrochure,
  faqs = [],
}: FinalCTASectionProps) {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <section className="py-24 bg-secondary relative overflow-hidden">
      {/* Background Glow */}
      {/* Background Glow - Removed for plain look */}
      <div className="absolute inset-0 bg-secondary" />

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Main CTA Content */}
          <div className="text-center mb-16">
            <ScrollReveal delay={0.1} direction="fade">
              <span
                className="inline-block px-4 py-2 rounded-full glass border-premium text-xs uppercase 
                             tracking-[0.2em] text-primary mb-6"
              >
                Ready to Transform Your Operations?
              </span>
            </ScrollReveal>

            <ScrollReveal delay={0.2} direction="up">
              <h2 className="text-4xl sm:text-6xl font-bold mb-6 text-foreground leading-tight">
                Experience the <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                  Model {model} Difference
                </span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.3} direction="up">
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-12">
                Join leading organizations worldwide who trust ErgoPack for their critical
                operations. Request a personalized demonstration or download our comprehensive
                technical guide.
              </p>
            </ScrollReveal>

            {/* Dual Path CTAs */}
            <ScrollReveal delay={0.4} direction="up">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                {/* Primary CTA */}
                <MagneticButton
                  onClick={onRequestDemo}
                  className="group relative px-10 py-5 bg-primary text-primary-foreground 
                           font-bold text-lg rounded-full transition-all duration-300 hover:shadow-premium-xl 
                           hover:scale-105 min-w-[240px]"
                >
                  <span className="flex items-center justify-center">
                    Request a Demo
                    <ArrowRight className="ml-3 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <div className="absolute inset-0 rounded-full glow-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </MagneticButton>

                {/* Secondary CTA */}
                <MagneticButton
                  onClick={onDownloadBrochure}
                  className="px-10 py-5 bg-transparent border-2 border-primary/20 text-foreground font-bold text-lg
                           rounded-full transition-all duration-300 hover:bg-primary/10 min-w-[240px]
                           flex items-center justify-center"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Download Brochure
                </MagneticButton>
              </div>
            </ScrollReveal>

            {/* Contact Options */}
            <ScrollReveal delay={0.5} direction="up">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-secondary">
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-gold" />
                  <span className="text-sm">Live Chat Available</span>
                </div>
                <div className="hidden sm:block w-px h-4 bg-premium" />
                <div className="flex items-center gap-2">
                  <span className="text-sm">Or call: +91 (800) XXX-XXXX</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* FAQ Section */}
          {faqs.length > 0 && (
            <div className="mt-20">
              <ScrollReveal delay={0.6} direction="up">
                <div className="text-center mb-12">
                  <h3 className="text-3xl font-bold mb-3 text-primary flex items-center justify-center gap-3">
                    <HelpCircle className="w-8 h-8 text-gold" />
                    Questions?
                  </h3>
                  <p className="text-secondary">Find answers to common inquiries</p>
                </div>
              </ScrollReveal>

              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <ScrollReveal key={index} delay={0.7 + index * 0.1} direction="up">
                    <motion.div
                      className="glass rounded-xl border-premium overflow-hidden"
                      whileHover={{ borderColor: 'rgba(212,175,55,0.3)' }}
                    >
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                        className="w-full px-6 py-4 flex items-center justify-between text-left group"
                      >
                        <span className="font-semibold text-primary group-hover:text-gold transition-colors">
                          {faq.question}
                        </span>
                        <motion.div
                          animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="w-5 h-5 text-gold rotate-90" />
                        </motion.div>
                      </button>

                      <AnimatePresence>
                        {expandedFaq === index && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-4 text-secondary leading-relaxed border-t border-premium pt-4">
                              {faq.answer}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
