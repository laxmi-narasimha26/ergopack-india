'use client';

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
    <section className="relative bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-slate-700/50 [mask-image:linear-gradient(0deg,transparent,black)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
            Product Comparison
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-white lg:text-6xl">
            Choose Your
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-blue-400 to-amber-400 bg-clip-text text-transparent">
              Perfect Solution
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
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
    <section className="bg-slate-950 py-16 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* X-pert Line Card */}
          <Card className="group border-2 border-amber-500/50 bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 p-8 transition-all duration-300 hover:border-amber-500">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-amber-500/50 bg-amber-500/10 px-3 py-1">
                  <Zap className="h-4 w-4 text-amber-500" />
                  <span className="text-xs font-semibold text-amber-500">Premium</span>
                </div>
                <h3 className="text-3xl font-bold text-white">X-pert Line</h3>
              </div>
            </div>

            <p className="mb-6 text-lg text-slate-300">
              The ultimate in cargo securing precision—advanced automation, real-time monitoring, and
              zero-failure reliability for mission-critical applications.
            </p>

            <div className="mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-amber-500" />
                <span className="text-slate-300">Siemens Touchscreen Control</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-amber-500" />
                <span className="text-slate-300">Triplex-Tool-Lift System</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-amber-500" />
                <span className="text-slate-300">Line-Laser Positioning (±1mm)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-amber-500" />
                <span className="text-slate-300">ChainLance Precision (1500 daN)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-amber-500" />
                <span className="text-slate-300">Real-Time IoT Monitoring</span>
              </div>
            </div>

            <Link href="/products/xpert-line">
              <Button
                size="lg"
                variant="primary"
                className="group w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white"
              >
                View X-pert Line
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </Card>

          {/* E-conomy Line Card */}
          <Card className="group border-2 border-blue-500/50 bg-gradient-to-br from-blue-500/10 via-slate-900 to-slate-900 p-8 transition-all duration-300 hover:border-blue-500">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-blue-500/50 bg-blue-500/10 px-3 py-1">
                  <Award className="h-4 w-4 text-blue-500" />
                  <span className="text-xs font-semibold text-blue-500">Professional</span>
                </div>
                <h3 className="text-3xl font-bold text-white">E-conomy Line</h3>
              </div>
            </div>

            <p className="mb-6 text-lg text-slate-300">
              Proven reliability and consistent performance—time-tested technology that professionals
              trust for standard cargo securing applications.
            </p>

            <div className="mb-8 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                <span className="text-slate-300">Manual/Semi-Automatic Control</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                <span className="text-slate-300">Standard Lift System</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                <span className="text-slate-300">Visual Guide Positioning</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                <span className="text-slate-300">Reliable Ratchet System (1000 daN)</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                <span className="text-slate-300">Proven Field Performance</span>
              </div>
            </div>

            <Link href="/products/economy-line">
              <Button
                size="lg"
                variant="primary"
                className="group w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
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
    <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Feature by Feature
            </p>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Detailed Comparison
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-400">
              See exactly how the two product lines compare across all major features and
              specifications.
            </p>
          </div>

          <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-800 bg-slate-950/50">
                    <th className="px-6 py-5 text-left text-sm font-semibold uppercase tracking-wider text-slate-400">
                      Feature
                    </th>
                    <th className="px-6 py-5 text-left">
                      <div className="flex items-center gap-2">
                        <Zap className="h-5 w-5 text-amber-500" />
                        <span className="text-sm font-semibold uppercase tracking-wider text-amber-500">
                          X-pert Line
                        </span>
                      </div>
                    </th>
                    <th className="px-6 py-5 text-left">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-blue-500" />
                        <span className="text-sm font-semibold uppercase tracking-wider text-blue-500">
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
                      className="border-b border-slate-800 transition-colors hover:bg-slate-800/30"
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <item.icon className="h-5 w-5 text-slate-500" />
                          <span className="font-medium text-white">{item.category}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          {item.xpertHighlight && (
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-amber-500" />
                          )}
                          <span className="text-slate-300">{item.xpert}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          {!item.xpertHighlight && (
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500" />
                          )}
                          <span className="text-slate-300">{item.economy}</span>
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
    <section className="bg-slate-950 py-24 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
              Which is Right for You?
            </p>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Ideal Use Cases
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-400">
              Choose based on your cargo type, industry requirements, and operational needs.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* X-pert Line Use Cases */}
            <Card className="border-amber-500/50 bg-gradient-to-br from-amber-500/5 to-slate-900 p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">X-pert Line</h3>
              </div>
              <p className="mb-6 text-slate-300">Best suited for:</p>
              <ul className="space-y-3">
                {xpertUseCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-amber-500 mt-0.5" />
                    <span className="text-slate-300">{useCase}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* E-conomy Line Use Cases */}
            <Card className="border-blue-500/50 bg-gradient-to-br from-blue-500/5 to-slate-900 p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                  <Award className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">E-conomy Line</h3>
              </div>
              <p className="mb-6 text-slate-300">Best suited for:</p>
              <ul className="space-y-3">
                {economyUseCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-blue-500 mt-0.5" />
                    <span className="text-slate-300">{useCase}</span>
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
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <Card className="border-slate-800 bg-slate-900/50 p-12 text-center">
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Still Not Sure Which to Choose?
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-slate-300">
              Our cargo securing specialists can help you evaluate your specific requirements and
              recommend the optimal solution for your operation.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="primary"
                  className="group bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white px-10 py-5 text-lg"
                >
                  Schedule Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/industries">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-600 px-10 py-5 text-lg text-slate-300 hover:bg-slate-800"
                >
                  View Industry Solutions
                </Button>
              </Link>
            </div>

            <div className="mt-12 border-t border-slate-800 pt-8">
              <p className="text-sm text-slate-400">
                Questions? Contact our team at{' '}
                <a href="mailto:sales@ergopack.in" className="text-amber-500 hover:underline">
                  sales@ergopack.in
                </a>{' '}
                or call{' '}
                <a href="tel:+911234567890" className="text-amber-500 hover:underline">
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
      <div className="bg-slate-950">
        <HeroSection />
        <QuickComparisonSection />
        <DetailedComparisonSection />
        <UseCasesSection />
        <CTASection />
      </div>
    </MainLayout>
  );
}
