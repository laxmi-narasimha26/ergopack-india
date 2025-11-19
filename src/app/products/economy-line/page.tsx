'use client';

import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import {
  useFadeIn,
  useSlideInLeft,
  useScaleIn,
  useStaggerAnimation,
} from '@/lib/hooks/useScrollAnimation';
import {
  ArrowRight,
  Shield,
  CheckCircle2,
  TrendingUp,
  Award,
  Target,
  Settings,
  Gauge,
  ExternalLink,
  DollarSign,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

// SEO Metadata
export const metadata: Metadata = {
  title: 'E-conomy Line - Reliable Cargo Securing System | ErgoPack India',
  description:
    'The E-conomy Line delivers proven performance and reliability for professional cargo securing. Time-tested technology, robust construction, and consistent results at exceptional value.',
  keywords: [
    'E-conomy Line',
    'cargo securing',
    'reliable',
    'proven technology',
    'cost-effective',
    'load securing',
    'logistics',
  ],
  openGraph: {
    title: 'E-conomy Line - Reliable Cargo Securing System',
    description:
      'Proven performance and reliability for professional cargo securing at exceptional value.',
    type: 'website',
  },
};

// Hero Section
function HeroSection() {
  const titleRef = useFadeIn({ start: 'top 80%' });
  const contentRef = useSlideInLeft({ start: 'top 70%' });

  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-32 pb-20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-grid-slate-700/50 [mask-image:linear-gradient(0deg,transparent,black)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div ref={contentRef} className="flex flex-col justify-center">
            <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-blue-500/50 bg-blue-500/10 px-4 py-2">
              <Award className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-semibold text-blue-500">Professional Series</span>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-white lg:text-6xl">
              E-conomy Line
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                Proven Performance
              </span>
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-slate-300">
              The E-conomy Line represents decades of engineering excellence—delivering reliable,
              consistent cargo securing performance that professionals trust. Time-tested technology
              meets exceptional value.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="primary"
                  className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg shadow-blue-500/30"
                >
                  Request Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products/compare-machines">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-600 text-slate-200 hover:bg-slate-800"
                >
                  Compare Machines
                </Button>
              </Link>
            </div>
          </div>

          {/* Product Image Placeholder */}
          <div ref={titleRef} className="flex items-center justify-center">
            <Card className="aspect-square w-full max-w-lg bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 p-8">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-blue-500/20">
                  <Settings className="h-12 w-12 text-blue-500" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">E-conomy Line</h3>
                <p className="mb-6 text-slate-400">
                  Reliable cargo securing system with proven track record in demanding environments.
                </p>
                <div className="rounded-lg bg-slate-800/50 px-4 py-2 text-sm text-slate-400">
                  <p className="font-semibold text-blue-500">10+ Years</p>
                  <p className="text-xs text-slate-500">Proven in the field</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// Key Features Section
function KeyFeaturesSection() {
  const titleRef = useFadeIn({ start: 'top 75%' });
  const featuresRef = useStaggerAnimation('.feature-card', { start: 'top 70%' });

  const features = [
    {
      icon: Shield,
      title: 'Proven Reliability',
      description:
        'Over a decade of field-proven performance in the most demanding logistics environments. Trusted by thousands of operators worldwide.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Settings,
      title: 'Robust Construction',
      description:
        'Heavy-duty steel construction and industrial-grade components ensure long service life and minimal maintenance requirements.',
      color: 'from-slate-500 to-slate-600',
    },
    {
      icon: Gauge,
      title: 'Consistent Tension',
      description:
        'Reliable tensioning system delivers up to 1000 daN of securing force with consistent, repeatable performance every time.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Target,
      title: 'Intuitive Operation',
      description:
        'Simple, straightforward controls reduce training time and operator error. Get your team up to speed quickly.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Award,
      title: 'Industry Standards',
      description:
        'Fully compliant with all major cargo securing regulations and standards. CE certified and ISO 9001 manufactured.',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: DollarSign,
      title: 'Exceptional Value',
      description:
        'Professional-grade performance at a price point that makes sense for growing operations. Best ROI in its class.',
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  return (
    <section className="bg-slate-950 py-24 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-500">
            Core Strengths
          </p>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Built to Last, Priced to Perform
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-400">
            The E-conomy Line combines time-tested reliability with modern efficiency—delivering
            professional results without compromise.
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="feature-card group border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-blue-500/50"
            >
              <div
                className={`mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color}`}
              >
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-white">{feature.title}</h3>
              <p className="leading-relaxed text-slate-400">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Technical Specifications Section
function TechnicalSpecsSection() {
  const sectionRef = useFadeIn({ start: 'top 75%' });

  const specifications = [
    { category: 'Control System', spec: 'Manual/Semi-Automatic', value: 'Proven' },
    { category: 'Positioning', spec: 'Visual Guides', value: 'Operator Assisted' },
    { category: 'Lifting System', spec: 'Standard Lift', value: 'Mechanical' },
    { category: 'Max Tension Force', spec: 'Standard Tension', value: '1000 daN' },
    { category: 'Tensioning Mechanism', spec: 'Ratchet System', value: 'Reliable' },
    { category: 'Strap Width', spec: 'Compatible Range', value: '25-50mm' },
    { category: 'Power Supply', spec: 'Operating Voltage', value: '230V' },
    { category: 'Operating Temperature', spec: 'Range', value: '-20°C to +50°C' },
    { category: 'Certification', spec: 'Standards', value: 'CE, ISO 9001' },
    { category: 'Warranty', spec: 'Coverage', value: '2 Years' },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-500">
              Technical Details
            </p>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">Specifications</h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-400">
              Solid engineering backed by years of real-world performance data.
            </p>
          </div>

          <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-500">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-500">
                      Specification
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-blue-500">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {specifications.map((spec, index) => (
                    <tr
                      key={index}
                      className="border-b border-slate-800 transition-colors hover:bg-slate-800/50"
                    >
                      <td className="px-6 py-4 font-medium text-white">{spec.category}</td>
                      <td className="px-6 py-4 text-slate-300">{spec.spec}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-sm font-semibold text-blue-500">
                          {spec.value}
                        </span>
                      </td>
                    </tr>
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

// Benefits Section
function BenefitsSection() {
  const sectionRef = useFadeIn({ start: 'top 75%' });

  const benefits = [
    {
      title: 'Lower Initial Investment',
      description:
        'Professional-grade performance at a price that works for growing businesses and fleet expansions.',
    },
    {
      title: 'Minimal Training Required',
      description:
        'Intuitive controls mean your team can become proficient in hours, not days or weeks.',
    },
    {
      title: 'Proven Track Record',
      description:
        'Over 10 years of field data demonstrates reliability and consistent performance.',
    },
    {
      title: 'Low Maintenance Costs',
      description:
        'Simple, robust design means fewer service calls and lower total cost of ownership.',
    },
    {
      title: 'Universal Compatibility',
      description:
        'Works with standard strap sizes and integrates easily into existing workflows.',
    },
    {
      title: 'Fast ROI',
      description:
        'Most customers see return on investment within 6-12 months through reduced damage claims.',
    },
  ];

  return (
    <section className="bg-slate-950 py-24 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-blue-500">
              Why Choose E-conomy
            </p>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Real-World Benefits
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-400">
              The E-conomy Line delivers measurable value from day one.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="flex gap-4 rounded-lg border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-blue-500/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex-shrink-0">
                  <CheckCircle2 className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-bold text-white">{benefit.title}</h3>
                  <p className="text-slate-400">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Comparison CTA Section
function ComparisonCTASection() {
  const sectionRef = useScaleIn({ start: 'top 75%' });

  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <Card className="border-slate-800 bg-slate-900/50 p-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
                  Not Sure Which Line is Right for You?
                </h2>
                <p className="mb-8 text-lg leading-relaxed text-slate-300">
                  Compare the E-conomy Line with our premium X-pert Line to understand which
                  solution best fits your operational requirements and budget.
                </p>
                <Link href="/products/compare-machines">
                  <Button
                    size="lg"
                    variant="primary"
                    className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                  >
                    Compare All Machines
                    <ExternalLink className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    E-conomy Line
                  </h3>
                  <p className="text-slate-300">
                    Ideal for operations seeking proven reliability, straightforward operation, and
                    excellent value. Perfect for standard cargo securing applications.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-700 bg-slate-800/50 p-6">
                  <h3 className="mb-3 flex items-center gap-2 text-lg font-bold text-white">
                    <Target className="h-5 w-5 text-amber-500" />
                    X-pert Line
                  </h3>
                  <p className="text-slate-300">
                    Best for mission-critical applications requiring real-time monitoring, precision
                    control, and advanced automation. Maximum performance and reliability.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function CTASection() {
  const sectionRef = useScaleIn({ start: 'top 75%' });

  return (
    <section className="bg-slate-950 py-24 border-t border-slate-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <Card className="bg-gradient-to-br from-blue-500/10 via-slate-900 to-slate-900 border-blue-500/30 p-12 text-center">
            <div className="mb-8">
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-slate-300">
                Join thousands of professionals who trust the E-conomy Line for reliable cargo
                securing. Request a quote or schedule a demonstration today.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="primary"
                  className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-10 py-5 text-lg shadow-2xl shadow-blue-500/50"
                >
                  Request Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products/compare-machines">
                <Button
                  size="lg"
                  variant="ghost"
                  className="px-10 py-5 text-lg text-slate-300 hover:text-white"
                >
                  Compare All Machines
                </Button>
              </Link>
            </div>

            <div className="mt-12 border-t border-slate-800 pt-8">
              <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                  <span>2-Year Warranty</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                  <span>Expert Installation Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-500" />
                  <span>Flexible Financing Options</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Main Page Component
export default function EconomyLinePage() {
  return (
    <MainLayout>
      <div className="bg-slate-950">
        <HeroSection />
        <KeyFeaturesSection />
        <TechnicalSpecsSection />
        <BenefitsSection />
        <ComparisonCTASection />
        <CTASection />
      </div>
    </MainLayout>
  );
}
