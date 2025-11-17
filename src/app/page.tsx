'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import { PremiumLoadingScreen } from '@/components/ui/PremiumLoadingScreen';
import { ArrowRight, CheckCircle2, Shield, Award, Sparkles } from 'lucide-react';

// Hero Section - Apple/Rolex inspired minimalism
function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.95]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-luxury-white">
      {/* Elegant gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-off-white via-white to-platinum-50" />

      {/* Subtle animated orb */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #D4AF37 0%, transparent 70%)',
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="relative z-10 max-w-6xl mx-auto px-8 sm:px-12 lg:px-16 py-40 text-center"
        style={{ opacity, scale }}
      >
        {/* Premium badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-gold-500/20 bg-gold-50/50 backdrop-blur-sm"
        >
          <Sparkles className="h-4 w-4 text-gold-600" />
          <span className="text-sm font-medium text-gold-700 tracking-wide">
            German Precision. Indian Excellence.
          </span>
        </motion.div>

        {/* Main headline - use premium serif font */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-7xl sm:text-8xl lg:text-9xl font-bold text-luxury-dark-gray mb-12 leading-[0.95] tracking-tight"
        >
          Where Precision
          <br />
          <span className="bg-gradient-to-r from-gold-600 via-gold-500 to-gold-600 bg-clip-text text-transparent">
            Meets Certainty
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-2xl text-platinum-600 max-w-3xl mx-auto leading-relaxed mb-16 font-light"
        >
          Every pallet. Every strap. Every time.
          <br />
          <span className="text-luxury-dark-gray font-normal">
            Engineered for those who refuse compromise.
          </span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href="/contact">
            <button className="btn-premium group">
              <span className="relative z-10 flex items-center">
                Begin Your Journey
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </Link>
          <Link href="/products/xpert-line">
            <button className="btn-premium-secondary">
              Discover Excellence
            </button>
          </Link>
        </motion.div>

        {/* Minimal trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="mt-24 flex flex-wrap justify-center gap-16 text-sm text-platinum-500 font-light"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-serif font-semibold text-luxury-dark-gray">99.99%</div>
            <span>Reliability</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-serif font-semibold text-luxury-dark-gray">10M+</div>
            <span>Loads Secured</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-2xl font-serif font-semibold text-luxury-dark-gray">Made in</div>
            <span>Germany</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-16 bg-gradient-to-b from-transparent via-platinum-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}

// Philosophy Section - Storytelling over specs
function PhilosophySection() {
  return (
    <section className="py-48 bg-white">
      <div className="max-w-5xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-gold-600 mb-8 font-medium">
            Our Philosophy
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-luxury-dark-gray mb-12 leading-tight">
            Crafted for the
            <br />
            <span className="italic">Uncompromising</span>
          </h2>
          <div className="space-y-8 text-lg sm:text-xl text-platinum-600 leading-relaxed font-light max-w-4xl mx-auto">
            <p>
              In a world obsessed with speed, we obsess over precision. Because when pharmaceutical shipments cross continents, when automotive parts arrive at just-in-time production lines, when electronics must reach markets pristine—there is no room for approximation.
            </p>
            <p className="text-luxury-dark-gray font-normal">
              ErgoPack isn't merely a tool. It's a commitment to excellence that transforms uncertainty into documented, verifiable certainty.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Feature Showcase - Visual storytelling
function FeatureShowcaseSection() {
  const features = [
    {
      title: 'ChainLance Precision',
      description: 'Our patented mechanism maintains exact tension across every strap, eliminating human error and delivering consistent, documented results.',
      stat: '1500 daN',
      statLabel: 'Peak Tension',
    },
    {
      title: 'German Engineering',
      description: 'Designed in the same workshops that supply Mercedes and BMW logistics. Adapted for the demanding realities of global supply chains.',
      stat: 'Made in',
      statLabel: 'Germany',
    },
    {
      title: 'Zero Compromise',
      description: 'Join pharmaceutical exporters, automotive operations, and electronics manufacturers who refuse to accept "good enough."',
      stat: 'Elite',
      statLabel: 'Operations',
    },
  ];

  return (
    <section className="py-48 bg-gradient-to-b from-luxury-off-white to-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 1,
                delay: index * 0.2,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="group"
            >
              {/* Stat badge */}
              <div className="mb-8">
                <div className="inline-flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-gold-50 to-white border border-gold-200/50 transition-all duration-700 group-hover:border-gold-400/50 group-hover:shadow-2xl group-hover:shadow-gold-200/20">
                  <div className="text-4xl font-serif font-bold text-gold-600 mb-2">
                    {feature.stat}
                  </div>
                  <div className="text-sm text-platinum-600 font-medium tracking-wide">
                    {feature.statLabel}
                  </div>
                </div>
              </div>

              <h3 className="font-serif text-3xl font-semibold text-luxury-dark-gray mb-6">
                {feature.title}
              </h3>
              <p className="text-lg text-platinum-600 leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Product Lines - Elegant presentation
function ProductLinesSection() {
  return (
    <section className="py-48 bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-gold-600 mb-8 font-medium">
            Our Collection
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-luxury-dark-gray">
            Two Philosophies.
            <br />
            One Standard.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* X-pert Line */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/products/xpert-line">
              <div className="premium-card-dark group p-12 min-h-[600px] flex flex-col justify-between">
                <div>
                  <div className="inline-block px-4 py-2 rounded-full bg-gold-500/10 border border-gold-500/20 mb-8">
                    <span className="text-sm font-medium text-gold-400 tracking-wide">
                      Premium Series
                    </span>
                  </div>
                  <h3 className="font-serif text-5xl font-bold text-white mb-6">
                    X-pert Line
                  </h3>
                  <p className="text-xl text-platinum-300 font-light leading-relaxed mb-12">
                    For operations that demand certainty. IoT monitoring, Siemens control, and blockchain documentation in a system engineered for perfection.
                  </p>

                  <div className="space-y-4">
                    {['IoT Real-Time Monitoring', 'Up to 4500N Tension', 'Blockchain Documentation', 'Siemens Touchscreen'].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-platinum-200">
                        <div className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                        <span className="font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                  <div className="inline-flex items-center gap-3 text-gold-400 font-medium group-hover:gap-5 transition-all duration-500">
                    <span>Explore X-pert Line</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* E-conomy Line */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link href="/products/economy-line">
              <div className="premium-card group p-12 min-h-[600px] flex flex-col justify-between bg-gradient-to-br from-white to-platinum-50">
                <div>
                  <div className="inline-block px-4 py-2 rounded-full bg-platinum-100 border border-platinum-200 mb-8">
                    <span className="text-sm font-medium text-platinum-700 tracking-wide">
                      Professional Series
                    </span>
                  </div>
                  <h3 className="font-serif text-5xl font-bold text-luxury-dark-gray mb-6">
                    E-conomy Line
                  </h3>
                  <p className="text-xl text-platinum-600 font-light leading-relaxed mb-12">
                    Proven performance. Reliable tension control. The same German engineering in a format that emphasizes hands-on precision.
                  </p>

                  <div className="space-y-4">
                    {['Reliable Tension Control', 'Up to 3500N Tension', 'Manual Operation', 'Documented Quality'].map((feature, i) => (
                      <div key={i} className="flex items-center gap-3 text-platinum-700">
                        <div className="w-1.5 h-1.5 rounded-full bg-platinum-500" />
                        <span className="font-light">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12">
                  <div className="inline-flex items-center gap-3 text-luxury-dark-gray font-medium group-hover:gap-5 transition-all duration-500">
                    <span>Explore E-conomy Line</span>
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Social Proof - Minimal and elegant
function SocialProofSection() {
  return (
    <section className="py-48 bg-luxury-space-black text-white">
      <div className="max-w-6xl mx-auto px-8 sm:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-gold-500 mb-8 font-medium">
            Trusted Worldwide
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl font-semibold mb-20">
            Join India's Elite Operations
          </h2>

          <div className="grid grid-cols-3 gap-24 max-w-3xl mx-auto">
            <div>
              <div className="text-6xl font-serif font-bold text-gold-500 mb-4">99.99%</div>
              <div className="text-platinum-400 font-light">Success Rate</div>
            </div>
            <div>
              <div className="text-6xl font-serif font-bold text-gold-500 mb-4">10M+</div>
              <div className="text-platinum-400 font-light">Loads Secured</div>
            </div>
            <div>
              <div className="text-6xl font-serif font-bold text-gold-500 mb-4">Zero</div>
              <div className="text-platinum-400 font-light">Failures</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA - Invitation style
function FinalCTASection() {
  return (
    <section className="py-48 bg-gradient-to-br from-gold-50 via-white to-platinum-50 relative overflow-hidden">
      {/* Elegant glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20 blur-3xl bg-gradient-to-br from-gold-300 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-8 sm:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-luxury-dark-gray mb-12 leading-tight">
            Your Journey to
            <br />
            <span className="italic">Excellence</span> Begins Here
          </h2>
          <p className="text-xl sm:text-2xl text-platinum-600 mb-16 font-light leading-relaxed max-w-2xl mx-auto">
            Request a private briefing and discover how the world's most demanding operations engineer certainty into every load.
          </p>

          <Link href="/contact">
            <button className="btn-premium text-lg group">
              <span className="relative z-10 flex items-center">
                Request Your Invitation
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </Link>

          <div className="mt-16 flex flex-wrap justify-center gap-12 text-sm text-platinum-500 font-light">
            {['No Obligation Briefing', 'Custom ROI Analysis', 'Dedicated Specialist'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-gold-600" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Homepage
export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <PremiumLoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <MainLayout>
          <div className="bg-luxury-white">
            <HeroSection />
            <PhilosophySection />
            <FeatureShowcaseSection />
            <ProductLinesSection />
            <SocialProofSection />
            <FinalCTASection />
          </div>
        </MainLayout>
      )}
    </>
  );
}
