'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { useFadeIn, useScaleIn } from '@/lib/hooks/useScrollAnimation';
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  Zap,
  Award,
  Cpu,
  Settings,
  Target,
  Gauge,
  Shield,
  TrendingUp,
  DollarSign,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Product Comparison - X-pert vs E-conomy Line | ErgoPack India',
  description:
    'Compare the X-pert Line and E-conomy Line cargo securing systems. Understand the differences in features, specifications, and capabilities to choose the right solution for your needs.',
  keywords: [
    'product comparison',
    'X-pert Line vs E-conomy',
    'cargo securing comparison',
    'ErgoPack comparison',
  ],
  openGraph: {
    title: 'Product Comparison - X-pert vs E-conomy Line',
    description: 'Compare our cargo securing systems and find the perfect solution for your needs.',
    type: 'website',
  },
};

// Hero Section
function HeroSection() {
  const titleRef = useFadeIn({ start: 'top 80%' });

  return (
    <section className="relative bg-luxury-space-black pt-32 pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(0deg,transparent,black)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-platinum-400">
            Product Comparison
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-white lg:text-6xl">
            Choose Your
            <br />
            <span className="bg-gradient-to-r from-crimson-400 via-crimson-500 to-crimson-600 bg-clip-text text-transparent text-crimson-shine" style={{'--tw-gradient-from': '#F87171', '--tw-gradient-to': '#7F1D1D'} as React.CSSProperties}>
              Perfect Solution
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-platinum-300">
            Both the X-pert Line and E-conomy Line deliver professional cargo securing results.
            The difference is in the features, automation level, and precision capabilities.
          </p>
        </div>
      </div>
    </section>
  );
}

// Quick Comparison Cards
function QuickComparisonSection() {
  const sectionRef = useScaleIn({ start: 'top 75%' });

  return (
    <section className="bg-luxury-space-black py-16 border-t border-platinum-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* X-pert Line Card */}
          <Card className="group border-2 border-crimson-500/50 bg-gradient-to-br from-crimson-500/10 via-luxury-dark-gray to-luxury-space-black p-8 transition-all duration-300 hover:border-crimson-500">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-crimson-500/50 bg-crimson-500/10 px-3 py-1">
                  <Zap className="h-4 w-4 text-crimson-400" />
                  <span className="text-xs font-semibold text-crimson-400">Premium</span>
                </div>
                <h3 className="text-3xl font-bold text-white">X-pert Line</h3>
              </div>
            </div>

            <p className="mb-6 text-lg text-platinum-300">
              The ultimate in cargo securing precision—advanced automation, real-time monitoring, and
              zero-failure reliability for mission-critical applications.
            </p>

            <div className="mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-crimson-400" />
                <span className="text-platinum-300">Siemens Touchscreen Control</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-crimson-400" />
                <span className="text-platinum-300">Triplex-Tool-Lift System</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-crimson-400" />
                <span className="text-platinum-300">Line-Laser Positioning (±1mm)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-crimson-400" />
                <span className="text-platinum-300">ChainLance Precision (1500 daN)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-crimson-400" />
                <span className="text-platinum-300">Real-Time IoT Monitoring</span>
              </div>
            </div>

            <Link href="/products/xpert-line">
              <Button
                size="lg"
                variant="primary"
                className="group w-full bg-gradient-to-r from-crimson-500 to-crimson-600 hover:from-crimson-600 hover:to-crimson-700 text-white"
              >
                View X-pert Line
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>

          {/* E-conomy Line Card */}
          <Card className="group border-2 border-platinum-600/50 bg-gradient-to-br from-platinum-800/10 via-luxury-dark-gray to-luxury-space-black p-8 transition-all duration-300 hover:border-platinum-500">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-platinum-500/50 bg-platinum-500/10 px-3 py-1">
                  <Award className="h-4 w-4 text-platinum-400" />
                  <span className="text-xs font-semibold text-platinum-400">Professional</span>
                </div>
                <h3 className="text-3xl font-bold text-white">E-conomy Line</h3>
              </div>
            </div>

            <p className="mb-6 text-lg text-platinum-300">
              Proven reliability and consistent performance—time-tested technology that professionals
              trust for standard cargo securing applications.
            </p>

            <div className="mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-platinum-400" />
                <span className="text-platinum-300">Manual/Semi-Automatic Control</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-platinum-400" />
                <span className="text-platinum-300">Standard Lift System</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-platinum-400" />
                <span className="text-platinum-300">Visual Guide Positioning</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-platinum-400" />
                <span className="text-platinum-300">Reliable Ratchet System (1000 daN)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-platinum-400" />
                <span className="text-platinum-300">Proven Field Performance</span>
              </div>
            </div>

            <Link href="/products/economy-line">
              <Button
                size="lg"
                variant="primary"
                className="group w-full bg-gradient-to-r from-platinum-600 to-platinum-700 hover:from-platinum-700 hover:to-platinum-800 text-white"
              >
                View E-conomy Line
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Detailed Comparison Table
function DetailedComparisonSection() {
  const sectionRef = useFadeIn({ start: 'top 75%' });

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
    <section className="bg-gradient-to-b from-luxury-space-black to-luxury-dark-gray py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-platinum-400">
              Feature by Feature
            </p>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Detailed Comparison
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-platinum-400">
              See exactly how the two product lines compare across all major features and
              specifications.
            </p>
          </div>

          <Card className="border-platinum-800 bg-luxury-dark-gray/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-platinum-800 bg-luxury-space-black/50">
                    <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider text-platinum-400">
                      Feature
                    </th>
                    <th className="px-6 py-5 text-left">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-crimson-500" />
                        <span className="text-sm font-semibold uppercase tracking-wider text-crimson-500">
                          X-pert Line
                        </span>
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-platinum-500" />
                        <span className="text-sm font-semibold uppercase tracking-wider text-platinum-500">
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
                      className="border-b border-platinum-800 transition-colors hover:bg-luxury-dark-gray/30"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-platinum-500" />
                          <span className="font-medium text-white">{item.category}</span>
                        </div>
                      </td>
                      <td className={`px-6 py-5 ${item.xpertHighlight ? 'bg-crimson-500/5' : ''}`}>
                        <div className="flex items-center gap-3">
                          {item.xpertHighlight && (
                            <div className="flex-shrink-0">
                              <CheckCircle2 className="h-5 w-5 text-crimson-500" />
                            </div>
                          )}
                          <div className="flex-1">
                            <span className={`${item.xpertHighlight ? 'text-white font-semibold' : 'text-platinum-300'}`}>
                              {item.xpert}
                            </span>
                            {item.xpertHighlight && (
                              <div className="mt-1 text-xs text-crimson-400">✓ Superior Performance</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className={`px-6 py-5 ${!item.xpertHighlight ? 'bg-platinum-500/5' : ''}`}>
                        <div className="flex items-center gap-3">
                          {!item.xpertHighlight && (
                            <div className="flex-shrink-0">
                              <CheckCircle2 className="h-5 w-5 text-platinum-500" />
                            </div>
                          )}
                          <div className="flex-1">
                            <span className={`${!item.xpertHighlight ? 'text-white font-semibold' : 'text-platinum-300'}`}>
                              {item.economy}
                            </span>
                            {!item.xpertHighlight && (
                              <div className="mt-1 text-xs text-platinum-400">✓ Better Value</div>
                            )}
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Use Cases Section
function UseCasesSection() {
  const sectionRef = useFadeIn({ start: 'top 75%' });

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
    <section className="bg-luxury-space-black py-24 border-t border-platinum-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-platinum-400">
              Which is Right for You?
            </p>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Ideal Use Cases
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-platinum-400">
              Choose based on your cargo type, industry requirements, and operational needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* X-pert Line Use Cases */}
            <Card className="border-crimson-500/50 bg-gradient-to-br from-crimson-500/5 to-luxury-dark-gray p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-crimson-500 to-crimson-600">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">X-pert Line</h3>
              </div>
              <p className="mb-6 text-platinum-300">Best suited for:</p>
              <ul className="space-y-3">
                {xpertUseCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-crimson-500 mt-0.5" />
                    <span className="text-platinum-300">{useCase}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* E-conomy Line Use Cases */}
            <Card className="border-platinum-500/50 bg-gradient-to-br from-platinum-800/5 to-luxury-dark-gray p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-platinum-600 to-platinum-700">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">E-conomy Line</h3>
              </div>
              <p className="mb-6 text-platinum-300">Best suited for:</p>
              <ul className="space-y-3">
                {economyUseCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-platinum-500 mt-0.5" />
                    <span className="text-platinum-300">{useCase}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const sectionRef = useScaleIn({ start: 'top 75%' });

  return (
    <section className="bg-gradient-to-b from-luxury-dark-gray to-luxury-space-black py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <Card className="border-platinum-800 bg-luxury-dark-gray/50 p-12 text-center">
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Still Not Sure Which to Choose?
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-platinum-300">
              Our cargo securing specialists can help you evaluate your specific requirements and
              recommend the optimal solution for your operation.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/products/compare-machines">
                <Button
                  size="lg"
                  variant="primary"
                  className="group bg-gradient-to-r from-crimson-500 to-crimson-600 hover:from-crimson-600 hover:to-crimson-700 text-white px-10 py-5 text-lg shadow-2xl shadow-crimson-500/50"
                >
                  Compare All Machines
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-platinum-600 px-10 py-5 text-lg text-platinum-300 hover:bg-luxury-dark-gray"
                >
                  Schedule Consultation
                </Button>
              </Link>
            </div>

            <div className="mt-12 border-t border-platinum-800 pt-8">
              <p className="text-sm text-platinum-400">
                Questions? Contact our team at{' '}
                <a href="mailto:sales@ergopack.in" className="text-crimson-500 hover:underline">
                  sales@ergopack.in
                </a>{' '}
                or call{' '}
                <a href="tel:+911234567890" className="text-crimson-500 hover:underline">
                  +91 123 456 7890
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function ComparePage() {
  return (
    <MainLayout>
      <div className="bg-luxury-space-black">
        <HeroSection />
        <QuickComparisonSection />
        <DetailedComparisonSection />
        <UseCasesSection />
        <CTASection />
      </div>
    </MainLayout>
  );
}
