'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import {
  useFadeIn,
  useSlideInLeft,
  useSlideInRight,
  useScaleIn,
  useStaggerAnimation,
} from '@/lib/hooks/useScrollAnimation';
import {
  ArrowRight,
  Zap,
  Shield,
  Cpu,
  Target,
  TrendingUp,
  Settings,
  Gauge,
  Lock,
  CheckCircle2,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { Metadata } from 'next';
import Link from 'next/link';

// Lazy load Three.js components
const ChainLanceAnimation = lazy(() => import('@/components/three/ChainLanceAnimation'));

// SEO Metadata
export const metadata: Metadata = {
  title: 'X-pert Line - Premium Cargo Securing System | ErgoPack India',
  description:
    'The X-pert Line represents the pinnacle of cargo securing technology with Siemens touchscreen control, Triplex-Tool-Lift, Line-Laser positioning, and ChainLance precision tensioning for zero-failure logistics.',
  keywords: [
    'X-pert Line',
    'cargo securing',
    'Siemens touchscreen',
    'Triplex-Tool-Lift',
    'Line-Laser',
    'high tension',
    'ChainLance',
    'load securing',
    'logistics',
  ],
  openGraph: {
    title: 'X-pert Line - Premium Cargo Securing System',
    description:
      'Industry-leading cargo securing technology with advanced control systems and precision engineering.',
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
            <div className="mb-6 inline-flex items-center gap-2 self-start rounded-full border border-amber-500/50 bg-amber-500/10 px-4 py-2">
              <Zap className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-amber-500">Premium Series</span>
            </div>

            <h1 className="mb-6 text-5xl font-bold leading-tight text-white lg:text-6xl">
              X-pert Line
              <br />
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                Precision Redefined
              </span>
            </h1>

            <p className="mb-8 text-xl leading-relaxed text-slate-300">
              The X-pert Line represents the pinnacle of cargo securing technology—combining
              advanced Siemens control systems, precision engineering, and our revolutionary
              ChainLance tensioning mechanism for absolute load integrity.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="primary"
                  className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/30"
                >
                  Request Invitation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products/compare">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-600 text-slate-200 hover:bg-slate-800"
                >
                  Compare Products
                </Button>
              </Link>
            </div>
          </div>

          {/* 3D Model Placeholder */}
          <div ref={titleRef} className="flex items-center justify-center">
            <Card className="aspect-square w-full max-w-lg bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 p-8">
              <div className="flex h-full flex-col items-center justify-center text-center">
                <div className="mb-6 inline-flex h-24 w-24 items-center justify-center rounded-full bg-amber-500/20">
                  <Eye className="h-12 w-12 text-amber-500" />
                </div>
                <h3 className="mb-4 text-2xl font-bold text-white">360° Interactive View</h3>
                <p className="mb-6 text-slate-400">
                  Explore the X-pert Line in stunning detail with our interactive 3D model viewer.
                </p>
                <div className="rounded-lg bg-slate-800/50 px-4 py-2 text-sm text-slate-400">
                  <p>3D Model: Click and drag to rotate</p>
                  <p className="text-xs text-slate-500">Scroll to zoom</p>
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
      icon: Cpu,
      title: 'Siemens Touchscreen Control',
      description:
        'Intuitive 7-inch Siemens touchscreen provides real-time monitoring, precise control, and comprehensive diagnostics for complete operational transparency.',
      color: 'from-blue-500 to-blue-600',
      highlight: true,
    },
    {
      icon: Settings,
      title: 'Triplex-Tool-Lift System',
      description:
        'Advanced three-stage lifting mechanism ensures precise positioning and effortless operation, reducing operator fatigue while maximizing efficiency.',
      color: 'from-purple-500 to-purple-600',
      highlight: true,
    },
    {
      icon: Target,
      title: 'Line-Laser Positioning',
      description:
        'Precision laser alignment system eliminates guesswork, ensuring perfect strap placement every time for consistent, reliable load securing.',
      color: 'from-green-500 to-green-600',
      highlight: true,
    },
    {
      icon: Gauge,
      title: 'High Tension Capability',
      description:
        'Industry-leading tension force up to 1500 daN ensures maximum load security, even for the most demanding applications and challenging cargo.',
      color: 'from-red-500 to-red-600',
      highlight: true,
    },
    {
      icon: Zap,
      title: 'ChainLance Precision',
      description:
        'Our patented ChainLance mechanism maintains constant tension throughout transit, automatically compensating for load settling and temperature changes.',
      color: 'from-amber-500 to-amber-600',
    },
    {
      icon: Shield,
      title: 'Real-Time Monitoring',
      description:
        'IoT-enabled sensors provide continuous feedback on strap tension, load integrity, and system status with instant alerts for any anomalies.',
      color: 'from-cyan-500 to-cyan-600',
    },
  ];

  return (
    <section className="bg-slate-950 py-24 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-500">
            Advanced Technology
          </p>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            Engineered for Excellence
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-400">
            Every component of the X-pert Line is designed with precision, reliability, and
            performance in mind.
          </p>
        </div>

        <div ref={featuresRef} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card
              key={index}
              className={`feature-card group border-slate-800 bg-slate-900/50 p-8 transition-all duration-300 hover:border-amber-500/50 ${
                feature.highlight ? 'lg:transform lg:scale-105' : ''
              }`}
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
    { category: 'Control System', spec: 'Siemens 7" Touchscreen', value: 'Advanced' },
    { category: 'Positioning', spec: 'Line-Laser Guidance', value: '±1mm Accuracy' },
    { category: 'Lifting System', spec: 'Triplex-Tool-Lift', value: '3-Stage' },
    { category: 'Max Tension Force', spec: 'High Tension Capability', value: '1500 daN' },
    { category: 'Tensioning Mechanism', spec: 'ChainLance System', value: 'Patented' },
    { category: 'Strap Width', spec: 'Compatible Range', value: '25-50mm' },
    { category: 'Power Supply', spec: 'Operating Voltage', value: '230V/400V' },
    { category: 'Monitoring', spec: 'IoT Integration', value: 'Real-Time' },
    { category: 'Operating Temperature', spec: 'Range', value: '-20°C to +60°C' },
    { category: 'Certification', spec: 'Standards', value: 'CE, ISO 9001' },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-500">
              Technical Details
            </p>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Specifications
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-400">
              Precision engineering backed by rigorous testing and industry-leading standards.
            </p>
          </div>

          <Card className="border-slate-800 bg-slate-900/50 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-500">
                      Category
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-500">
                      Specification
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-amber-500">
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
                        <span className="inline-flex items-center rounded-full bg-amber-500/10 px-3 py-1 text-sm font-semibold text-amber-500">
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

// Exploded View Section
function ExplodedViewSection() {
  const sectionRef = useScaleIn({ start: 'top 75%' });

  const components = [
    { name: 'Control Unit', description: 'Siemens touchscreen interface' },
    { name: 'Triplex-Tool-Lift', description: 'Three-stage lifting mechanism' },
    { name: 'Line-Laser Module', description: 'Precision positioning system' },
    { name: 'ChainLance Assembly', description: 'Patented tensioning mechanism' },
    { name: 'Tension Sensors', description: 'Real-time force monitoring' },
    { name: 'Power System', description: 'Dual voltage support' },
  ];

  return (
    <section className="bg-slate-950 py-24 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <div className="mb-16 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-500">
              Engineering Breakdown
            </p>
            <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
              Exploded View Diagram
            </h2>
            <p className="mx-auto max-w-3xl text-xl text-slate-400">
              Every component designed for precision, durability, and seamless integration.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
            {/* Diagram Placeholder */}
            <Card className="aspect-square bg-gradient-to-br from-slate-900 to-slate-950 border-slate-800 p-8">
              <div className="flex h-full flex-col items-center justify-center">
                <div className="mb-6 text-center">
                  <Settings className="mx-auto h-24 w-24 text-amber-500 animate-spin" style={{ animationDuration: '10s' }} />
                  <p className="mt-4 text-lg font-semibold text-white">
                    Interactive Exploded View
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    3D visualization showing all components
                  </p>
                </div>
              </div>
            </Card>

            {/* Component List */}
            <div className="space-y-4">
              {components.map((component, index) => (
                <motion.div
                  key={index}
                  className="flex gap-4 rounded-lg border border-slate-800 bg-slate-900/50 p-6 transition-colors hover:border-amber-500/50"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-500/20 text-lg font-bold text-amber-500">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="mb-1 text-lg font-bold text-white">{component.name}</h3>
                    <p className="text-slate-400">{component.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// How It Works Section with ChainLance Animation
function HowItWorksSection() {
  const [isClient, setIsClient] = useState(false);
  const titleRef = useFadeIn({ start: 'top 75%' });
  const animationRef = useScaleIn({ start: 'top 70%' });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const steps = [
    {
      number: '01',
      title: 'Position',
      description: 'Line-Laser guides precise strap placement with ±1mm accuracy.',
    },
    {
      number: '02',
      title: 'Lift',
      description: 'Triplex-Tool-Lift system raises and positions the tensioning mechanism.',
    },
    {
      number: '03',
      title: 'Tension',
      description: 'ChainLance applies and maintains optimal tension force automatically.',
    },
    {
      number: '04',
      title: 'Monitor',
      description: 'Real-time sensors verify and maintain load integrity throughout transit.',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="mb-16 text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-amber-500">
            The Process
          </p>
          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
            How ChainLance Works
          </h2>
          <p className="mx-auto max-w-3xl text-xl text-slate-400">
            Our revolutionary ChainLance mechanism represents a paradigm shift in cargo securing
            technology.
          </p>
        </div>

        {/* ChainLance Animation */}
        <div ref={animationRef} className="mb-16">
          <Card className="border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 overflow-hidden">
            <div className="h-[500px]">
              {isClient && (
                <Suspense fallback={<LoadingSpinner />}>
                  <ChainLanceAnimation />
                </Suspense>
              )}
            </div>
          </Card>
        </div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="border-slate-800 bg-slate-900/50 p-8 text-center h-full">
                <div className="mb-6 text-6xl font-bold text-amber-500/20">{step.number}</div>
                <h3 className="mb-4 text-xl font-bold text-white">{step.title}</h3>
                <p className="text-slate-400">{step.description}</p>
              </Card>
              {index < steps.length - 1 && (
                <div className="absolute -right-4 top-1/2 hidden lg:block">
                  <ArrowRight className="h-8 w-8 text-amber-500/50" />
                </div>
              )}
            </motion.div>
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
            <div className="mb-8">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-500/50 bg-amber-500/20 px-4 py-2 text-sm font-semibold text-amber-400">
                <Lock className="h-4 w-4" />
                Exclusive Access
              </div>
              <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                Experience the X-pert Difference
              </h2>
              <p className="mx-auto mb-8 max-w-3xl text-xl leading-relaxed text-slate-300">
                Join industry leaders who have eliminated cargo securing failures with the X-pert
                Line. Request your confidential briefing and on-site demonstration.
              </p>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="primary"
                  className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-5 text-lg shadow-2xl shadow-amber-500/50"
                >
                  Request Invitation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/products/compare">
                <Button
                  size="lg"
                  variant="ghost"
                  className="px-10 py-5 text-lg text-slate-300 hover:text-white"
                >
                  Compare with E-conomy Line
                  <ExternalLink className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="mt-12 border-t border-slate-800 pt-8">
              <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  <span>99.99% Reliability Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  <span>On-Site Installation & Training</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  <span>24/7 Technical Support</span>
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
export default function XpertLinePage() {
  return (
    <MainLayout>
      <div className="bg-slate-950">
        <HeroSection />
        <KeyFeaturesSection />
        <TechnicalSpecsSection />
        <ExplodedViewSection />
        <HowItWorksSection />
        <CTASection />
      </div>
    </MainLayout>
  );
}
