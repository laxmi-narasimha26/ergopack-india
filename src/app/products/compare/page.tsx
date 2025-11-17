'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { PremiumLoadingScreen } from '@/components/ui/PremiumLoadingScreen';
import { Premium3DCard } from '@/components/ui/Premium3DCard';
import {
  ArrowRight,
  CheckCircle2,
  Zap,
  Award,
  Cpu,
  Settings,
  Target,
  Gauge,
  Shield,
  TrendingUp,
  DollarSign,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';

export default function ComparePage() {
  const [isLoading, setIsLoading] = useState(true);
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

  return (
    <>
      <PremiumLoadingScreen onLoadingComplete={() => setIsLoading(false)} />
      {!isLoading && (
        <MainLayout>
          <div className="bg-luxury-off-white">
            <HeroSection opacity={opacity} scale={scale} />
            <QuickComparisonSection />
            <DetailedComparisonSection />
            <UseCasesSection />
            <CTASection />
          </div>
        </MainLayout>
      )}
    </>
  );
}

// Hero Section
function HeroSection({ opacity, scale }: { opacity: any; scale: any }) {
  return (
    <section className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-luxury-space-black via-luxury-dark-gray to-luxury-space-black overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #9B1C1C 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-8 sm:px-12 py-32 text-center"
        style={{ opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-500 font-medium">
            Product Comparison
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight"
        >
          Choose Your
          <br />
          <span className="bg-gradient-to-r from-crimson-400 via-crimson-500 to-crimson-600 bg-clip-text text-transparent">
            Perfect Solution
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-xl sm:text-2xl text-platinum-300 max-w-4xl mx-auto font-light leading-relaxed"
        >
          Both the X-pert Line and E-conomy Line deliver professional cargo securing results.
          <br />
          The difference is in precision, automation, and advanced features.
        </motion.p>
      </motion.div>
    </section>
  );
}

// Quick Comparison Section
function QuickComparisonSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* X-pert Line Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Premium3DCard glowColor="rgba(155, 28, 28, 0.3)">
              <div className="premium-card p-10 h-full flex flex-col">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-crimson-500/20 border border-crimson-500/30 mb-4">
                    <Sparkles className="h-4 w-4 text-crimson-600" />
                    <span className="text-sm font-semibold text-crimson-600">Premium Series</span>
                  </div>
                  <h3 className="font-serif text-4xl font-bold text-luxury-dark-gray">X-pert Line</h3>
                </div>

                <p className="text-lg text-platinum-700 mb-8 flex-grow leading-relaxed">
                  The ultimate in cargo securing precision—advanced automation, real-time monitoring, and
                  zero-failure reliability for mission-critical applications.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    'Siemens Touchscreen Control',
                    'Triplex-Tool-Lift System',
                    'Line-Laser Positioning (±1mm)',
                    'ChainLance Precision (1500 daN)',
                    'Real-Time IoT Monitoring',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-crimson-600 mt-0.5" />
                      <span className="text-platinum-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/products/xpert-line">
                  <button className="btn-premium w-full group">
                    <span className="relative z-10 flex items-center justify-center">
                      View X-pert Line
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                </Link>
              </div>
            </Premium3DCard>
          </motion.div>

          {/* E-conomy Line Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Premium3DCard glowColor="rgba(155, 28, 28, 0.2)">
              <div className="premium-card p-10 h-full flex flex-col">
                <div className="mb-6">
                  <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-platinum-500/20 border border-platinum-500/30 mb-4">
                    <Award className="h-4 w-4 text-platinum-600" />
                    <span className="text-sm font-semibold text-platinum-600">Professional Series</span>
                  </div>
                  <h3 className="font-serif text-4xl font-bold text-luxury-dark-gray">E-conomy Line</h3>
                </div>

                <p className="text-lg text-platinum-700 mb-8 flex-grow leading-relaxed">
                  Proven reliability and consistent performance—time-tested technology that professionals
                  trust for standard cargo securing applications.
                </p>

                <div className="space-y-4 mb-10">
                  {[
                    'Manual/Semi-Automatic Control',
                    'Standard Lift System',
                    'Visual Guide Positioning',
                    'Reliable Ratchet System (1000 daN)',
                    'Proven Field Performance',
                  ].map((feature, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-platinum-600 mt-0.5" />
                      <span className="text-platinum-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link href="/products/economy-line">
                  <button className="btn-premium-secondary w-full">
                    <span className="flex items-center justify-center">
                      View E-conomy Line
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </span>
                  </button>
                </Link>
              </div>
            </Premium3DCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Detailed Comparison Table
function DetailedComparisonSection() {
  const comparisonData = [
    {
      category: 'Control Interface',
      icon: Cpu,
      xpert: 'Siemens 7" Color Touchscreen',
      economy: 'Manual/Semi-Automatic Controls',
      xpertHighlight: true,
    },
    {
      category: 'Engineering',
      icon: Settings,
      xpert: 'Triplex-Tool-Lift (3-Stage)',
      economy: 'Standard Mechanical Lift',
      xpertHighlight: true,
    },
    {
      category: 'Positioning System',
      icon: Target,
      xpert: 'Line-Laser (±1mm accuracy)',
      economy: 'Visual Guide Marks',
      xpertHighlight: true,
    },
    {
      category: 'Tension Force',
      icon: Gauge,
      xpert: '1500 daN (High Tension)',
      economy: '1000 daN (Standard)',
      xpertHighlight: true,
    },
    {
      category: 'Tensioning Mechanism',
      icon: Zap,
      xpert: 'ChainLance Patented System',
      economy: 'Proven Ratchet System',
      xpertHighlight: true,
    },
    {
      category: 'Monitoring',
      icon: Shield,
      xpert: 'Real-Time IoT Sensors',
      economy: 'Manual Inspection',
      xpertHighlight: true,
    },
    {
      category: 'Automation Level',
      icon: TrendingUp,
      xpert: 'Fully Automated',
      economy: 'Manual/Semi-Automatic',
      xpertHighlight: true,
    },
    {
      category: 'Compliance Documentation',
      icon: Award,
      xpert: 'Automatic Digital Records',
      economy: 'Manual Documentation',
      xpertHighlight: true,
    },
    {
      category: 'Training Required',
      icon: Settings,
      xpert: '1-2 Days',
      economy: 'Few Hours',
      xpertHighlight: false,
    },
    {
      category: 'Ideal For',
      icon: Target,
      xpert: 'Mission-Critical, High-Value Cargo',
      economy: 'Standard Logistics Operations',
      xpertHighlight: false,
    },
    {
      category: 'Investment Level',
      icon: DollarSign,
      xpert: 'Premium',
      economy: 'Value-Focused',
      xpertHighlight: false,
    },
    {
      category: 'ROI Timeline',
      icon: TrendingUp,
      xpert: '90 Days',
      economy: '6-12 Months',
      xpertHighlight: true,
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-white to-crimson-50/30">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-600 mb-8 font-medium">
            Feature by Feature
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-luxury-dark-gray leading-tight">
            Detailed
            <br />
            <span className="italic text-crimson-600">Comparison</span>
          </h2>
        </motion.div>

        <div className="premium-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-platinum-200 bg-platinum-50">
                  <th className="px-8 py-6 text-left text-sm font-semibold uppercase tracking-wider text-platinum-700">
                    Feature
                  </th>
                  <th className="px-8 py-6 text-left">
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-5 w-5 text-crimson-600" />
                      <span className="text-sm font-semibold uppercase tracking-wider text-crimson-600">
                        X-pert Line
                      </span>
                    </div>
                  </th>
                  <th className="px-8 py-6 text-left">
                    <div className="flex items-center gap-2">
                      <Award className="h-5 w-5 text-platinum-600" />
                      <span className="text-sm font-semibold uppercase tracking-wider text-platinum-600">
                        E-conomy Line
                      </span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((item, index) => (
                  <motion.tr
                    key={index}
                    className="border-b border-platinum-200 hover:bg-crimson-50/30 transition-colors"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <item.icon className="h-5 w-5 text-platinum-500" />
                        <span className="font-medium text-luxury-dark-gray">{item.category}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {item.xpertHighlight && (
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-crimson-600" />
                        )}
                        <span className="text-platinum-700">{item.xpert}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        {!item.xpertHighlight && (
                          <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-platinum-600" />
                        )}
                        <span className="text-platinum-700">{item.economy}</span>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

// Use Cases Section
function UseCasesSection() {
  const xpertUseCases = [
    'Pharmaceutical and medical supplies',
    'High-value electronics and semiconductors',
    'Precision machinery and equipment',
    'Time-sensitive perishable goods',
    'Aerospace and defense components',
    'Regulatory-critical shipments',
  ];

  const economyUseCases = [
    'Standard manufacturing goods',
    'Consumer products and retail',
    'Construction materials',
    'General freight and LTL',
    'Seasonal inventory distribution',
    'Growing fleet operations',
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-600 mb-8 font-medium">
            Which is Right for You?
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-luxury-dark-gray leading-tight">
            Ideal Use
            <br />
            <span className="italic text-crimson-600">Cases</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* X-pert Line Use Cases */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Premium3DCard>
              <div className="premium-card p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="inline-flex items-center justify-center p-5 rounded-2xl bg-crimson-50 border border-crimson-500/20">
                    <Sparkles className="h-8 w-8 text-crimson-600" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-luxury-dark-gray">X-pert Line</h3>
                </div>
                <p className="text-platinum-700 mb-6">Best suited for:</p>
                <ul className="space-y-4">
                  {xpertUseCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-crimson-600 mt-0.5" />
                      <span className="text-platinum-700">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Premium3DCard>
          </motion.div>

          {/* E-conomy Line Use Cases */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <Premium3DCard>
              <div className="premium-card p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="inline-flex items-center justify-center p-5 rounded-2xl bg-platinum-50 border border-platinum-500/20">
                    <Award className="h-8 w-8 text-platinum-600" />
                  </div>
                  <h3 className="font-serif text-3xl font-bold text-luxury-dark-gray">E-conomy Line</h3>
                </div>
                <p className="text-platinum-700 mb-6">Best suited for:</p>
                <ul className="space-y-4">
                  {economyUseCases.map((useCase, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-platinum-600 mt-0.5" />
                      <span className="text-platinum-700">{useCase}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Premium3DCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  return (
    <section className="py-48 bg-luxury-space-black text-white relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-10 blur-3xl bg-gradient-to-br from-crimson-500 to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-8 sm:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold mb-12 leading-tight">
            Still Not Sure
            <br />
            <span className="italic text-crimson-500">Which to Choose?</span>
          </h2>
          <p className="text-xl sm:text-2xl text-platinum-300 mb-16 font-light leading-relaxed max-w-3xl mx-auto">
            Our cargo securing specialists can help you evaluate your specific requirements and
            recommend the optimal solution for your operation.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <Link href="/contact">
              <button className="btn-premium text-lg px-12 py-6">
                <span className="relative z-10">Schedule Consultation</span>
              </button>
            </Link>
            <a href="tel:+911800ERGOPACK">
              <button className="btn-premium-secondary text-lg px-12 py-6">
                Call Us Now
              </button>
            </a>
          </div>

          <div className="text-sm text-platinum-400">
            Questions? Email us at{' '}
            <a href="mailto:sales@ergopack.in" className="text-crimson-500 hover:underline">
              sales@ergopack.in
            </a>
            {' '}or call{' '}
            <a href="tel:+911800ERGOPACK" className="text-crimson-500 hover:underline">
              +91 1800-ERGOPACK
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
