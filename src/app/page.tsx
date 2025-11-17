'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import { ArrowRight, CheckCircle2, Shield, Award, TrendingUp, Zap, Package, Building2 } from 'lucide-react';

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-white via-red-50/20 to-white overflow-hidden">
      {/* Subtle geometric background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-96 h-96 bg-red-600 rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-32 text-center">
        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight tracking-tight mb-6">
            Where Tension Becomes
            <br />
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Certainty
            </span>
            {' '}in Every Load
            <br />
            We Secure.
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl sm:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
        >
          German-engineered precision for India's most demanding logistics operations.
          When your reputation depends on every pallet arriving exactly as it left,
          there is no margin for approximation.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link href="/contact">
            <Button
              size="lg"
              variant="primary"
              className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-10 py-5 text-lg shadow-lg shadow-red-600/30 transition-all duration-300"
            >
              Request Private Briefing
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Link href="/products/xpert-line">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600 px-10 py-5 text-lg transition-all duration-300"
            >
              Explore the System
            </Button>
          </Link>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 flex flex-wrap justify-center gap-12 text-sm text-gray-500"
        >
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-red-600" />
            <span>Made in Germany</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5 text-red-600" />
            <span>99.99% Reliability</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-red-600" />
            <span>10M+ Loads Secured</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// What is ErgoPack Section
function WhatIsErgoPackSection() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Visual representation */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl flex items-center justify-center relative overflow-hidden border border-gray-200">
              {/* Animated strap visualization */}
              <div className="relative w-3/4 h-3/4">
                <div className="absolute inset-0 border-4 border-gray-300 rounded-lg" />
                <motion.div
                  className="absolute inset-0 border-4 border-red-600 rounded-lg"
                  initial={{ clipPath: 'polygon(0 0, 0% 0, 0% 100%, 0 100%)' }}
                  animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                  <Package className="h-16 w-16 text-gray-400 mx-auto mb-3" />
                  <div className="text-sm font-semibold text-gray-700">360° Precision Securing</div>
                </div>
              </div>
              {/* Corner accent */}
              <div className="absolute top-4 right-4 w-16 h-16 bg-red-600 opacity-10 rounded-full" />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Think of it as the{' '}
              <span className="text-red-600">invisible fortress</span>{' '}
              around your most valuable cargo.
            </h2>
            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
              <p>
                ErgoPack isn't another strapping tool. It's a complete load integrity system
                that transforms uncertainty into verifiable control.
              </p>
              <p>
                Like an orchestra conductor ensuring every note is perfect, our patented
                ChainLance mechanism maintains precise, consistent tension across every strap,
                every time—eliminating the guesswork that costs millions in damaged goods
                and compliance failures.
              </p>
              <p className="text-gray-900 font-semibold">
                The result? Every pallet leaves your facility with documented, repeatable
                precision that your insurance auditors, regulatory bodies, and premium
                clients demand.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// The Difference Section
function DifferenceSection() {
  const differences = [
    {
      icon: Zap,
      title: 'Speed as Competitive Weapon',
      description: 'While competitors fumble with manual adjustments, ErgoPack secures a full pallet in 45 seconds—with higher reliability. Time saved compounds into competitive advantage.',
    },
    {
      icon: Shield,
      title: 'German Engineering, Indian Operations',
      description: 'Designed in the same workshops that supply Mercedes and BMW logistics, adapted for the demanding conditions of Indian supply chains. No compromises.',
    },
    {
      icon: Award,
      title: 'Built for the Elite',
      description: 'Not positioned as cost-saving. Positioned as transformation. Join pharmaceutical exporters, automotive JIT operations, and electronics manufacturers who refuse to accept cargo securing as "good enough."',
    },
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-red-600 font-semibold text-sm uppercase tracking-wider mb-4"
          >
            The ErgoPack Difference
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Precision at Every Turn
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            What sets operations apart isn't just equipment—it's the transformation
            from risk management to certainty.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {differences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white border border-gray-200 rounded-xl p-8 hover:shadow-xl hover:border-red-600 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-gradient-to-br from-red-600 to-red-700 rounded-lg flex items-center justify-center mb-6">
                <item.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Product Range Section
function ProductRangeSection() {
  const models = [
    {
      name: 'X-pert Line',
      tagline: 'For Operations That Demand Certainty',
      features: ['IoT Monitoring', 'Siemens Control', 'Up to 4500N Tension', 'Blockchain Documentation'],
      href: '/products/xpert-line',
    },
    {
      name: 'E-conomy Line',
      tagline: 'Proven Performance, Accessible Entry',
      features: ['Reliable Tension Control', 'Manual Operation', 'Up to 3500N Tension', 'Documented Quality'],
      href: '/products/economy-line',
    },
  ];

  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6"
          >
            Two Philosophies.{' '}
            <span className="text-red-600">One Standard.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Whether you choose automation or prefer hands-on control,
            German engineering ensures uncompromising reliability.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {models.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-2xl p-10 hover:shadow-2xl hover:border-red-600 transition-all duration-500"
            >
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{model.name}</h3>
              <p className="text-lg text-gray-600 mb-8">{model.tagline}</p>

              <ul className="space-y-4 mb-10">
                {model.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href={model.href}>
                <Button
                  variant="outline"
                  className="w-full border-2 border-gray-300 group-hover:border-red-600 group-hover:text-red-600 transition-all duration-300"
                >
                  Explore {model.name}
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link href="/products/compare-machines">
            <Button
              variant="ghost"
              className="text-red-600 hover:text-red-700 text-lg"
            >
              Compare All Models →
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

// Client Success Section
function ClientSuccessSection() {
  return (
    <section className="py-32 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-20">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-red-400 font-semibold text-sm uppercase tracking-wider mb-4"
          >
            Join the Circle
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            Trusted by India's Elite Operations
          </motion.h2>
        </div>

        {/* Client logos placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {[1, 2, 3, 4].map((i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center border border-gray-700 hover:border-red-600 transition-colors"
            >
              <Building2 className="h-12 w-12 text-gray-600" />
            </motion.div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-gray-800 pt-16">
          <div className="text-center">
            <div className="text-5xl font-bold text-red-600 mb-2">99.99%</div>
            <div className="text-gray-400">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-red-600 mb-2">10M+</div>
            <div className="text-gray-400">Loads Secured</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-red-600 mb-2">Zero</div>
            <div className="text-gray-400">Compliance Failures</div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="py-32 bg-gradient-to-br from-red-600 to-red-800 text-white relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
            Your First ErgoPack Day
            <br />
            Is a Ceremony, Not a Delivery.
          </h2>
          <p className="text-xl text-red-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the exclusive group of operations that demand verifiable precision.
            Request a private briefing to discover how the world's most demanding
            logistics leaders engineer certainty into every load.
          </p>

          <Link href="/contact">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 px-12 py-6 text-xl font-semibold shadow-2xl"
            >
              Request Your Invitation
              <ArrowRight className="ml-2 h-6 w-6" />
            </Button>
          </Link>

          <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-red-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>No obligation briefing</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Custom ROI analysis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              <span>Dedicated specialist</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Main Homepage
export default function HomePage() {
  return (
    <MainLayout>
      <div className="bg-white">
        <HeroSection />
        <WhatIsErgoPackSection />
        <DifferenceSection />
        <ProductRangeSection />
        <ClientSuccessSection />
        <FinalCTASection />
      </div>
    </MainLayout>
  );
}
