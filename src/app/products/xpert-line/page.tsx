'use client';

import { Suspense, lazy, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import PremiumPreloader from '@/components/elite/ui/PremiumPreloader';
import {
  ArrowRight,
  Zap,
  Shield,
  Cpu,
  Target,
  Settings,
  Gauge,
  CheckCircle2,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import Link from 'next/link';

// Lazy load Three.js components
const ChainLanceAnimation = lazy(() => import('@/components/three/ChainLanceAnimation'));

// Hero Section - Premium dark theme
function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, 100]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-luxury-space-black overflow-hidden">
      {/* Elegant gradient orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #9B1C1C 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full opacity-10 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FEC9C9 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -30, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-40 text-center"
        style={{ opacity, y }}
      >
        {/* Premium badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-12 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-crimson-500/30 bg-crimson-500/10 backdrop-blur-md"
        >
          <Sparkles className="h-4 w-4 text-crimson-400" />
          <span className="text-sm font-medium text-crimson-400 tracking-wide">
            Premium Series
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif text-7xl sm:text-8xl lg:text-9xl font-bold text-white mb-12 leading-[0.95]"
        >
          X-pert Line
          <br />
          <span className="bg-gradient-to-r from-crimson-400 via-crimson-500 to-crimson-600 bg-clip-text text-transparent">
            Precision Perfected
          </span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl sm:text-2xl text-platinum-300 max-w-4xl mx-auto leading-relaxed mb-16 font-light"
        >
          Where Siemens intelligence meets ChainLance precision. IoT monitoring, blockchain documentation, and automated perfection—engineered for operations that demand certainty.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-24"
        >
          <Link href="/contact">
            <button className="btn-premium group">
              <span className="relative z-10 flex items-center">
                Request Private Briefing
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </Link>
          <Link href="/products/compare-machines">
            <button className="btn-premium-secondary">
              Compare Systems
            </button>
          </Link>
        </motion.div>

        {/* Key stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.6 }}
          className="flex flex-wrap justify-center gap-16 text-sm text-platinum-400 font-light"
        >
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-serif font-bold text-crimson-500">4500N</div>
            <span>Peak Tension</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-serif font-bold text-crimson-500">IoT</div>
            <span>Real-Time Monitoring</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="text-3xl font-serif font-bold text-crimson-500">99.99%</div>
            <span>Reliability</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// Features Section - Premium cards
function FeaturesSection() {
  const features = [
    {
      icon: Cpu,
      title: 'Siemens Touchscreen Control',
      description: 'Intuitive 7-inch Siemens interface providing real-time monitoring, precise control, and comprehensive diagnostics.',
      stat: '7"',
      statLabel: 'Display',
    },
    {
      icon: Target,
      title: 'Line-Laser Positioning',
      description: 'Precision laser alignment eliminates guesswork, ensuring perfect strap placement every time.',
      stat: '±1mm',
      statLabel: 'Accuracy',
    },
    {
      icon: Settings,
      title: 'Triplex-Tool-Lift',
      description: 'Advanced three-stage lifting mechanism for precise positioning and effortless operation.',
      stat: '3-Stage',
      statLabel: 'System',
    },
    {
      icon: Gauge,
      title: 'High Tension Capability',
      description: 'Industry-leading tension force ensures maximum load security for demanding applications.',
      stat: '4500N',
      statLabel: 'Max Force',
    },
    {
      icon: Zap,
      title: 'ChainLance Precision',
      description: 'Patented mechanism maintains constant tension, automatically compensating for load settling.',
      stat: 'Patented',
      statLabel: 'Technology',
    },
    {
      icon: Shield,
      title: 'IoT Monitoring',
      description: 'Continuous feedback on strap tension, load integrity, and system status with instant alerts.',
      stat: 'Real-Time',
      statLabel: 'Data',
    },
  ];

  return (
    <section className="py-48 bg-gradient-to-b from-luxury-space-black to-luxury-dark-gray">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-500 mb-8 font-medium">
            Advanced Technology
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-12 leading-tight">
            Engineered for
            <br />
            <span className="italic">Excellence</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{
                duration: 1,
                delay: index * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="premium-card-dark group p-10"
            >
              {/* Icon */}
              <div className="mb-8 inline-flex items-center justify-center p-5 rounded-2xl bg-crimson-500/10 border border-crimson-500/20">
                <feature.icon className="h-8 w-8 text-crimson-400" />
              </div>

              {/* Stat badge */}
              <div className="mb-6">
                <div className="text-3xl font-serif font-bold text-crimson-500 mb-1">
                  {feature.stat}
                </div>
                <div className="text-sm text-platinum-500 font-medium tracking-wide">
                  {feature.statLabel}
                </div>
              </div>

              <h3 className="font-serif text-2xl font-semibold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-platinum-300 leading-relaxed font-light">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Technical Excellence Section
function TechnicalExcellenceSection() {
  const specs = [
    { label: 'Control System', value: 'Siemens 7" Touchscreen' },
    { label: 'Positioning', value: 'Line-Laser ±1mm' },
    { label: 'Lifting System', value: 'Triplex-Tool-Lift 3-Stage' },
    { label: 'Max Tension', value: '4500 daN' },
    { label: 'Tensioning', value: 'ChainLance (Patented)' },
    { label: 'Strap Width', value: '25-50mm' },
    { label: 'Power Supply', value: '230V/400V' },
    { label: 'Monitoring', value: 'IoT Real-Time' },
    { label: 'Temperature Range', value: '-20°C to +60°C' },
    { label: 'Certification', value: 'CE, ISO 9001' },
  ];

  return (
    <section className="py-48 bg-luxury-dark-gray">
      <div className="max-w-6xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-500 mb-8 font-medium">
            Technical Specifications
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl font-semibold text-white">
            Precision by Design
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {specs.map((spec, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between p-6 rounded-2xl bg-luxury-space-black/50 border border-platinum-800 hover:border-crimson-500/30 transition-all duration-500"
            >
              <span className="text-platinum-400 font-light">{spec.label}</span>
              <span className="text-white font-medium">{spec.value}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ChainLance Innovation Section
function ChainLanceSection() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="py-48 bg-gradient-to-b from-luxury-space-black to-luxury-dark-gray">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-500 mb-8 font-medium">
            The Innovation
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-12 leading-tight">
            ChainLance
            <br />
            <span className="italic text-crimson-500">Mechanism</span>
          </h2>
          <p className="text-xl text-platinum-300 max-w-3xl mx-auto font-light leading-relaxed">
            Our revolutionary patented system represents a paradigm shift in cargo securing technology—maintaining constant, precise tension throughout transit.
          </p>
        </motion.div>

        {/* 3D Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="premium-card-dark p-4 overflow-hidden"
        >
          <div className="h-[500px] rounded-xl overflow-hidden bg-luxury-space-black">
            {isClient && (
              <Suspense fallback={<div className="flex items-center justify-center h-full"><LoadingSpinner size="lg" variant="light" /></div>}>
                <ChainLanceAnimation />
              </Suspense>
            )}
          </div>
        </motion.div>

        {/* Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
          {[
            { step: '01', title: 'Position', desc: 'Line-Laser guides precise placement' },
            { step: '02', title: 'Lift', desc: 'Triplex system raises mechanism' },
            { step: '03', title: 'Tension', desc: 'ChainLance applies optimal force' },
            { step: '04', title: 'Monitor', desc: 'IoT sensors verify integrity' },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-8"
            >
              <div className="text-5xl font-serif font-bold text-crimson-500/20 mb-4">{item.step}</div>
              <h4 className="text-xl font-serif font-semibold text-white mb-2">{item.title}</h4>
              <p className="text-platinum-400 font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA
function CTASection() {
  return (
    <section className="py-48 bg-luxury-dark-gray relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-3xl bg-gradient-to-br from-crimson-500 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto px-8 sm:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-12 leading-tight">
            Experience the
            <br />
            <span className="italic text-crimson-500">X-pert Difference</span>
          </h2>
          <p className="text-xl sm:text-2xl text-platinum-300 mb-16 font-light leading-relaxed max-w-2xl mx-auto">
            Join industry leaders who have eliminated cargo securing failures. Request your confidential briefing and on-site demonstration.
          </p>

          <Link href="/contact">
            <button className="btn-premium text-lg group">
              <span className="relative z-10 flex items-center">
                Request Your Invitation
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </Link>

          <div className="mt-16 flex flex-wrap justify-center gap-12 text-sm text-platinum-400 font-light">
            {['99.99% Reliability', 'On-Site Training', '24/7 Support'].map((item, i) => (
              <div key={i} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-crimson-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Page
export default function XpertLinePage() {
  return (
    <>
      <PremiumPreloader />
      <MainLayout>
        <div className="bg-luxury-space-black">
          <HeroSection />
          <FeaturesSection />
          <TechnicalExcellenceSection />
          <ChainLanceSection />
          <CTASection />
        </div>
      </MainLayout>
    </>
  );
}
