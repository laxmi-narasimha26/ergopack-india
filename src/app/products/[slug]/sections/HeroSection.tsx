'use client';

import { motion } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { ScrollReveal } from '@/components/premium/ScrollReveal';
import { MagneticButton } from '@/components/ui/MagneticButton';

interface HeroSectionProps {
  model: string;
  fullName: string;
  headline: string;
  subheadline: string;
  videoSrc?: string;
  imageSrc?: string;
  specs?: { label: string; value: string }[];
  onRequestDemo: () => void;
  onDownloadBrochure: () => void;
}

export function HeroSection({
  model,
  fullName,
  headline,
  subheadline,
  videoSrc,
  imageSrc,
  specs = [],
  onRequestDemo,
  onDownloadBrochure,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary">
      {/* Background Layer */}
      <div className="absolute inset-0">
        {videoSrc ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-10"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : imageSrc ? (
          <div
            className="absolute inset-0 w-full h-full bg-cover bg-center opacity-20 dark:opacity-10"
            style={{ backgroundImage: `url(${imageSrc})` }}
          />
        ) : null}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-primary" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_50%)]" />
      </div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Model Badge */}
          <ScrollReveal delay={0.1} direction="fade">
            <motion.div
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full glass border-premium mb-8"
              whileHover={{ scale: 1.05 }}
            >
              <span className="w-2 h-2 rounded-full bg-gold-500 animate-pulse" />
              <span className="text-xs font-medium tracking-[0.2em] uppercase text-gold">
                Model {model}
              </span>
            </motion.div>
          </ScrollReveal>

          {/* Main Headline */}
          <ScrollReveal delay={0.2} direction="up">
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-primary mb-6 leading-[1.1]">
              {headline}
            </h1>
          </ScrollReveal>

          {/* Subheadline */}
          <ScrollReveal delay={0.3} direction="up">
            <p className="text-xl sm:text-2xl text-secondary max-w-3xl mx-auto mb-4 font-light leading-relaxed">
              {subheadline}
            </p>
          </ScrollReveal>

          {/* Full Name - Elegant Typography */}
          <ScrollReveal delay={0.35} direction="fade">
            <p className="text-sm font-serif italic text-gold mb-12">{fullName}</p>
          </ScrollReveal>

          {/* Floating Specs */}
          {specs.length > 0 && (
            <ScrollReveal delay={0.4} direction="up">
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                {specs.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    className="glass px-6 py-3 rounded-xl border-premium"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, duration: 0.6 }}
                    whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(212,175,55,0.2)' }}
                  >
                    <span className="text-xs uppercase tracking-wider text-secondary block mb-1">
                      {spec.label}
                    </span>
                    <span className="text-lg font-bold text-gold">{spec.value}</span>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>
          )}

          {/* Dual CTAs */}
          <ScrollReveal delay={0.5} direction="up">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
              <MagneticButton
                onClick={onRequestDemo}
                className="group relative px-8 py-4 bg-gold text-luxury-dark-gray dark:text-luxury-space-black 
                         font-semibold rounded-full transition-all duration-300 hover:shadow-premium-xl 
                         hover:scale-105 min-w-[200px]"
              >
                <span className="flex items-center justify-center">
                  Experience Innovation
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 rounded-full glow-gold opacity-0 group-hover:opacity-100 transition-opacity" />
              </MagneticButton>

              <MagneticButton
                onClick={onDownloadBrochure}
                className="px-8 py-4 bg-transparent border-2 border-gold text-gold font-semibold 
                         rounded-full transition-all duration-300 hover:bg-gold/10 min-w-[200px]"
              >
                Download Brochure
              </MagneticButton>
            </div>
          </ScrollReveal>

          {/* Scroll Indicator */}
          <ScrollReveal delay={0.6} direction="fade">
            <motion.div
              className="flex flex-col items-center text-secondary"
              initial={{ opacity: 0.5 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-xs uppercase tracking-widest mb-2">Discover More</span>
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </motion.div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
