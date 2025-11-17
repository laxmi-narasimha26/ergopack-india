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
  Zap,
  CheckCircle2,
  Package,
  Car,
  Cpu,
  TrendingUp,
  Target,
  AlertTriangle,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Industry Solutions - Pharmaceuticals, Automotive, Electronics | ErgoPack India',
  description:
    'Specialized cargo securing solutions for pharmaceuticals, automotive, and electronics industries. Learn how ErgoPack systems solve industry-specific challenges.',
  keywords: [
    'pharmaceutical cargo securing',
    'automotive logistics',
    'electronics shipping',
    'industry solutions',
  ],
  openGraph: {
    title: 'Industry Solutions - ErgoPack India',
    description: 'Specialized cargo securing solutions tailored to your industry needs.',
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
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-500">
            Industry Solutions
          </p>
          <h1 className="mb-6 text-5xl font-bold leading-tight text-white lg:text-6xl">
            Precision Solutions for
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Mission-Critical Industries
            </span>
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-slate-300">
            Each industry has unique cargo securing challenges. Our solutions are engineered to meet
            the exacting standards of pharmaceuticals, automotive, and electronics sectors.
          </p>
        </div>
      </div>
    </section>
  );
}

// Pharmaceuticals Industry Section
function PharmaceuticalsSection() {
  const sectionRef = useFadeIn({ start: 'top 75%' });
  const contentRef = useSlideInLeft({ start: 'top 70%' });

  const challenges = [
    'Temperature-sensitive cargo requiring vibration-free transport',
    'Regulatory compliance (GDP, GMP) with documented chain of custody',
    'Zero damage tolerance for high-value medications',
    'Time-critical deliveries with no room for delays',
  ];

  const solutions = [
    'ChainLance precision eliminates load shifting and vibration',
    'Automatic compliance documentation for regulatory audits',
    'Real-time monitoring alerts for any load integrity issues',
    '99.99% reliability ensures on-time delivery',
  ];

  return (
    <section className="bg-slate-950 py-24 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div ref={contentRef} className="flex flex-col justify-center">
            <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-cyan-500/50 bg-cyan-500/10 px-4 py-2">
              <Package className="h-5 w-5 text-cyan-500" />
              <span className="text-sm font-semibold text-cyan-500">Pharmaceuticals</span>
            </div>

            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Zero Tolerance for Pharmaceutical Cargo
            </h2>

            <p className="mb-8 text-xl leading-relaxed text-slate-300">
              When transporting life-saving medications, vaccines, and medical supplies, cargo
              securing isn't just about preventing damage—it's about protecting lives and
              maintaining regulatory compliance.
            </p>

            {/* Challenges */}
            <div className="mb-8">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                Industry Challenges
              </h3>
              <ul className="space-y-3">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-500">
                      !
                    </span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="mb-8">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                ErgoPack Solutions
              </h3>
              <ul className="space-y-3">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/contact">
              <Button
                size="lg"
                variant="primary"
                className="group self-start bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white shadow-lg shadow-cyan-500/30"
              >
                Discuss Pharmaceutical Needs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Visual Card */}
          <div className="flex items-center justify-center">
            <Card className="border-cyan-500/50 bg-gradient-to-br from-cyan-500/10 to-slate-950 p-8">
              <div className="aspect-square flex flex-col items-center justify-center text-center">
                <div className="mb-8 inline-flex h-32 w-32 items-center justify-center rounded-full bg-cyan-500/20">
                  <Package className="h-16 w-16 text-cyan-500" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">Pharmaceutical Excellence</h3>
                <div className="space-y-4 text-slate-300">
                  <div className="rounded-lg bg-slate-900/50 p-4">
                    <p className="text-3xl font-bold text-cyan-500">100%</p>
                    <p className="text-sm">GDP Compliance</p>
                  </div>
                  <div className="rounded-lg bg-slate-900/50 p-4">
                    <p className="text-3xl font-bold text-cyan-500">0</p>
                    <p className="text-sm">Temperature Excursions</p>
                  </div>
                  <div className="rounded-lg bg-slate-900/50 p-4">
                    <p className="text-3xl font-bold text-cyan-500">24/7</p>
                    <p className="text-sm">Real-Time Monitoring</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// Automotive Industry Section
function AutomotiveSection() {
  const sectionRef = useFadeIn({ start: 'top 75%' });
  const contentRef = useSlideInLeft({ start: 'top 70%' });

  const challenges = [
    'Just-in-time delivery windows with zero margin for error',
    'Heavy loads requiring maximum tension force',
    'Complex load shapes (engines, chassis, body panels)',
    'High penalty costs for production line disruptions',
  ];

  const solutions = [
    '1500 daN high-tension capability handles heavy components',
    'Precision positioning ensures consistent, secure loading',
    'Automated documentation tracks every shipment',
    'Proven reliability eliminates production delays',
  ];

  return (
    <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Visual Card */}
          <div className="flex items-center justify-center lg:order-1">
            <Card className="border-amber-500/50 bg-gradient-to-br from-amber-500/10 to-slate-950 p-8">
              <div className="aspect-square flex flex-col items-center justify-center text-center">
                <div className="mb-8 inline-flex h-32 w-32 items-center justify-center rounded-full bg-amber-500/20">
                  <Car className="h-16 w-16 text-amber-500" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">Automotive Precision</h3>
                <div className="space-y-4 text-slate-300">
                  <div className="rounded-lg bg-slate-900/50 p-4">
                    <p className="text-3xl font-bold text-amber-500">1500</p>
                    <p className="text-sm">daN Tension Force</p>
                  </div>
                  <div className="rounded-lg bg-slate-900/50 p-4">
                    <p className="text-3xl font-bold text-amber-500">±1mm</p>
                    <p className="text-sm">Positioning Accuracy</p>
                  </div>
                  <div className="rounded-lg bg-slate-900/50 p-4">
                    <p className="text-3xl font-bold text-amber-500">Zero</p>
                    <p className="text-sm">Production Delays</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Content */}
          <div ref={contentRef} className="flex flex-col justify-center lg:order-2">
            <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-amber-500/50 bg-amber-500/10 px-4 py-2">
              <Car className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-semibold text-amber-500">Automotive</span>
            </div>

            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Just-in-Time Demands Precision
            </h2>

            <p className="mb-8 text-xl leading-relaxed text-slate-300">
              Automotive supply chains operate on razor-thin margins. A single delayed shipment or
              damaged component can halt an entire production line, costing millions per hour.
            </p>

            {/* Challenges */}
            <div className="mb-8">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                Industry Challenges
              </h3>
              <ul className="space-y-3">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-500">
                      !
                    </span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="mb-8">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                ErgoPack Solutions
              </h3>
              <ul className="space-y-3">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/contact">
              <Button
                size="lg"
                variant="primary"
                className="group self-start bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/30"
              >
                Discuss Automotive Needs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Electronics Industry Section
function ElectronicsSection() {
  const sectionRef = useFadeIn({ start: 'top 75%' });
  const contentRef = useSlideInLeft({ start: 'top 70%' });

  const challenges = [
    'ESD-sensitive components requiring vibration-free transport',
    'High product value with catastrophic failure costs',
    'Rapid product cycles demand reliable, fast logistics',
    'Global supply chains with multiple handoff points',
  ];

  const solutions = [
    'Vibration-eliminating ChainLance system protects delicate circuits',
    'Real-time alerts prevent damage before it occurs',
    'Automated compliance tracking across supply chain',
    'IoT integration provides end-to-end visibility',
  ];

  return (
    <section className="bg-slate-950 py-24 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Content */}
          <div ref={contentRef} className="flex flex-col justify-center">
            <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-purple-500/50 bg-purple-500/10 px-4 py-2">
              <Cpu className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-semibold text-purple-500">Electronics</span>
            </div>

            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Protecting Next-Gen Technology
            </h2>

            <p className="mb-8 text-xl leading-relaxed text-slate-300">
              Electronics manufacturing operates at the cutting edge—where microscopic damage can
              render products worthless and supply chain delays cascade globally.
            </p>

            {/* Challenges */}
            <div className="mb-8">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                <AlertTriangle className="h-6 w-6 text-red-500" />
                Industry Challenges
              </h3>
              <ul className="space-y-3">
                {challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-500/20 text-xs font-bold text-red-500">
                      !
                    </span>
                    <span>{challenge}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="mb-8">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-white">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                ErgoPack Solutions
              </h3>
              <ul className="space-y-3">
                {solutions.map((solution, index) => (
                  <li key={index} className="flex items-start gap-3 text-slate-300">
                    <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-green-500 mt-0.5" />
                    <span>{solution}</span>
                  </li>
                ))}
              </ul>
            </div>

            <Link href="/contact">
              <Button
                size="lg"
                variant="primary"
                className="group self-start bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg shadow-purple-500/30"
              >
                Discuss Electronics Needs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Visual Card */}
          <div className="flex items-center justify-center">
            <Card className="border-purple-500/50 bg-gradient-to-br from-purple-500/10 to-slate-950 p-8">
              <div className="aspect-square flex flex-col items-center justify-center text-center">
                <div className="mb-8 inline-flex h-32 w-32 items-center justify-center rounded-full bg-purple-500/20">
                  <Cpu className="h-16 w-16 text-purple-500" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">Electronics Protection</h3>
                <div className="space-y-4 text-slate-300">
                  <div className="rounded-lg bg-slate-900/50 p-4">
                    <p className="text-3xl font-bold text-purple-500">Zero</p>
                    <p className="text-sm">Vibration Damage</p>
                  </div>
                  <div className="rounded-lg bg-slate-900/50 p-4">
                    <p className="text-3xl font-bold text-purple-500">Real-Time</p>
                    <p className="text-sm">Supply Chain Visibility</p>
                  </div>
                  <div className="rounded-lg bg-slate-900/50 p-4">
                    <p className="text-3xl font-bold text-purple-500">99.99%</p>
                    <p className="text-sm">Product Integrity</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// Cross-Industry Benefits Section
function CrossIndustryBenefitsSection() {
  const sectionRef = useFadeIn({ start: 'top 75%' });
  const cardsRef = useStaggerAnimation('.benefit-card', { start: 'top 70%' });

  const benefits = [
    {
      icon: Shield,
      title: 'Regulatory Compliance',
      description: 'Automatic documentation and audit trails meet industry-specific regulations.',
      industries: ['Pharma', 'Auto', 'Electronics'],
    },
    {
      icon: TrendingUp,
      title: 'Damage Reduction',
      description: '95%+ reduction in cargo damage claims across all industries.',
      industries: ['Pharma', 'Auto', 'Electronics'],
    },
    {
      icon: Zap,
      title: 'Operational Efficiency',
      description: 'Faster loading times and reduced labor costs improve bottom-line results.',
      industries: ['Pharma', 'Auto', 'Electronics'],
    },
    {
      icon: Target,
      title: 'Precision Control',
      description: 'Exact tension force and positioning for consistent, repeatable results.',
      industries: ['Pharma', 'Auto', 'Electronics'],
    },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef} className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-500">
            Universal Excellence
          </p>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Benefits Across Industries
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-400">
            While each industry has unique challenges, ErgoPack delivers consistent value
            propositions across all sectors.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className="benefit-card border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-amber-500/50"
            >
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600">
                <benefit.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">{benefit.title}</h3>
              <p className="mb-6 leading-relaxed text-slate-300">{benefit.description}</p>
              <div className="flex flex-wrap gap-2">
                {benefit.industries.map((industry, i) => (
                  <span
                    key={i}
                    className="rounded-full border border-slate-700 bg-slate-800/50 px-3 py-1 text-sm text-slate-400"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// CTA Section
function CTASection() {
  const sectionRef = useScaleIn({ start: 'top 75%' });

  return (
    <section className="bg-slate-950 py-24 border-t border-slate-800">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <Card className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/30 p-12 text-center">
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Ready to Transform Your Industry Operations?
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-slate-300">
              Our industry specialists understand your unique challenges and can design a cargo
              securing solution that addresses your specific requirements.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="primary"
                  className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-5 text-lg shadow-2xl shadow-amber-500/50"
                >
                  Discuss Your Industry Needs
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products/compare">
                <Button
                  size="lg"
                  variant="ghost"
                  className="px-10 py-5 text-lg text-slate-300 hover:text-white"
                >
                  Compare Products
                </Button>
              </Link>
            </div>

            <div className="mt-12 border-t border-slate-800 pt-8">
              <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  <span>Industry-Specific Solutions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  <span>Expert Consultation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  <span>Custom Integration</span>
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
export default function IndustriesPage() {
  return (
    <MainLayout>
      <div className="bg-slate-950">
        <HeroSection />
        <PharmaceuticalsSection />
        <AutomotiveSection />
        <ElectronicsSection />
        <CrossIndustryBenefitsSection />
        <CTASection />
      </div>
    </MainLayout>
  );
}
