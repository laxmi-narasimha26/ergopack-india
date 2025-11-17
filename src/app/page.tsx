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
import { ArrowRight, CheckCircle2, Shield, Zap, Target, Award, TrendingUp } from 'lucide-react';

// Lazy load Three.js components for better performance
const HeroScene = lazy(() => import('@/components/three/HeroScene'));
const ChainLanceAnimation = lazy(() => import('@/components/three/ChainLanceAnimation'));

// Hero Section Component
function HeroSection() {
  const [isClient, setIsClient] = useState(false);
  const titleRef = useFadeIn({ start: 'top 80%' });
  const subtitleRef = useSlideInLeft({ start: 'top 70%' });
  const ctaRef = useScaleIn({ start: 'top 60%' });

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Three.js Background */}
      {isClient && (
        <Suspense fallback={<div className="absolute inset-0 bg-slate-950" />}>
          <HeroScene />
        </Suspense>
      )}

      {/* Overlay gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">
          {/* Main Headline */}
          <div ref={titleRef}>
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              Verifiable Load Integrity.
              <br />
              <span className="bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 bg-clip-text text-transparent">
                The C-Suite's Control System
              </span>
              <br />
              for Zero-Failure Logistics.
            </motion.h1>
          </div>

          {/* Subtitle */}
          <div ref={subtitleRef}>
            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              When a single load failure costs millions in penalties, compliance violations,
              and brand damage—precision isn't optional. It's survival.
            </motion.p>
          </div>

          {/* CTA Buttons */}
          <div ref={ctaRef}>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <Button
                size="lg"
                variant="primary"
                className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-8 py-4 text-lg shadow-2xl shadow-amber-500/50"
              >
                Request Invitation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-slate-600 text-slate-200 hover:bg-slate-800 px-8 py-4 text-lg"
              >
                View Case Studies
              </Button>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-slate-400 text-sm">Scroll to explore</span>
              <motion.div
                className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center pt-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                <div className="w-1 h-3 bg-amber-500 rounded-full" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Social Proof Section
function SocialProofSection() {
  const sectionRef = useFadeIn({ start: 'top 75%' });

  const clients = [
    { name: 'Fortune 500 Automotive', logo: '/placeholder-logo-1.svg' },
    { name: 'Global Logistics Leader', logo: '/placeholder-logo-2.svg' },
    { name: 'Premium Manufacturing', logo: '/placeholder-logo-3.svg' },
    { name: 'International Shipping', logo: '/placeholder-logo-4.svg' },
    { name: 'Aerospace Industry', logo: '/placeholder-logo-5.svg' },
  ];

  return (
    <section className="bg-slate-950 py-20 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <div className="text-center mb-12">
            <p className="text-slate-400 text-sm uppercase tracking-wider mb-4">
              Trusted by Industry Leaders
            </p>
            <h2 className="text-3xl font-bold text-white">
              Securing Mission-Critical Loads Worldwide
            </h2>
          </div>

          {/* Client Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 items-center">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                className="flex items-center justify-center p-6 bg-slate-900/50 border border-slate-800 rounded-lg hover:border-amber-500/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-slate-500 text-center">
                  <div className="w-24 h-24 bg-slate-800 rounded-lg mb-2 flex items-center justify-center">
                    <span className="text-4xl">🏢</span>
                  </div>
                  <p className="text-xs">{client.name}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">
                99.99%
              </div>
              <p className="text-slate-400">Load Security Rate</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">
                10M+
              </div>
              <p className="text-slate-400">Loads Secured</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-2">
                Zero
              </div>
              <p className="text-slate-400">Compliance Failures</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Problem Section
function ProblemSection() {
  const titleRef = useFadeIn({ start: 'top 75%' });
  const cardsRef = useStaggerAnimation('.problem-card', { start: 'top 70%' });

  const problems = [
    {
      icon: Shield,
      title: 'Catastrophic Load Failures',
      description: 'A single strap failure on the highway leads to millions in damaged cargo, third-party liability, and regulatory penalties.',
      impact: '$2.3M average cost per incident',
      color: 'from-red-500 to-red-600',
    },
    {
      icon: Target,
      title: 'Zero Visibility, Zero Control',
      description: 'Your logistics team cannot verify strap integrity in real-time. When failures occur, you discover it too late—at destination or worse, on the road.',
      impact: '47% of failures go undetected until delivery',
      color: 'from-orange-500 to-orange-600',
    },
    {
      icon: TrendingUp,
      title: 'Compliance Exposure',
      description: 'Regulatory bodies demand documented proof of load securing standards. Manual processes leave gaps that auditors exploit, risking operational licenses.',
      impact: 'Up to $500K in compliance fines',
      color: 'from-amber-500 to-amber-600',
    },
  ];

  return (
    <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <p className="text-amber-500 text-sm uppercase tracking-wider mb-4 font-semibold">
            The Hidden Crisis
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Three High-Consequence Failures
            <br />
            <span className="text-slate-400">Your Competition Ignores</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            While others accept cargo securing as a "necessary risk," industry leaders recognize
            these failure modes as unacceptable threats to their bottom line.
          </p>
        </div>

        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <Card
              key={index}
              className="problem-card bg-slate-900/50 border-slate-800 hover:border-amber-500/50 transition-all duration-300 p-8"
            >
              <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${problem.color} mb-6`}>
                <problem.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{problem.title}</h3>
              <p className="text-slate-400 mb-6 leading-relaxed">{problem.description}</p>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-sm text-amber-500 font-semibold">{problem.impact}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Solution Section with ChainLance Animation
function SolutionSection() {
  const [isClient, setIsClient] = useState(false);
  const titleRef = useFadeIn({ start: 'top 75%' });
  const animationRef = useScaleIn({ start: 'top 70%' });
  const featuresRef = useStaggerAnimation('.feature-item', { start: 'top 70%' });

  useEffect(() => {
    setIsClient(true);
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'ChainLance Precision System',
      description: 'Patent-pending mechanism that maintains constant strap tension across all load conditions, eliminating slack and over-tensioning.',
    },
    {
      icon: Shield,
      title: 'Real-Time Monitoring',
      description: 'IoT-enabled sensors provide live tension data, alerting your team to potential failures before they occur.',
    },
    {
      icon: Award,
      title: 'Compliance Automation',
      description: 'Automatic documentation and reporting for regulatory compliance, with blockchain-verified load securing records.',
    },
    {
      icon: CheckCircle2,
      title: 'Zero-Failure Guarantee',
      description: 'Industry-first 99.99% reliability guarantee, backed by comprehensive insurance and performance bonds.',
    },
  ];

  return (
    <section className="bg-slate-950 py-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16">
          <p className="text-amber-500 text-sm uppercase tracking-wider mb-4 font-semibold">
            The X-pert Line Solution
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Engineered for
            <br />
            <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Mission-Critical Precision
            </span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            The X-pert Line isn't another strap system. It's a complete load integrity platform
            that transforms cargo securing from a liability into a competitive advantage.
          </p>
        </div>

        {/* ChainLance Animation */}
        <div ref={animationRef} className="mb-16 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl border border-slate-800 overflow-hidden">
          <div className="h-[500px]">
            {isClient && (
              <Suspense fallback={<LoadingSpinner />}>
                <ChainLanceAnimation />
              </Suspense>
            )}
          </div>
        </div>

        {/* Features Grid */}
        <div ref={featuresRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-item flex gap-6 p-8 bg-slate-900/50 border border-slate-800 rounded-xl hover:border-amber-500/50 transition-colors"
            >
              <div className="flex-shrink-0">
                <div className="p-3 bg-gradient-to-br from-amber-500 to-amber-600 rounded-lg">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.description}</p>
              </div>
            </div>
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
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={sectionRef}>
          <Card className="bg-gradient-to-br from-amber-500/10 via-slate-900 to-slate-900 border-amber-500/30 p-12 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/20 border border-amber-500/50 rounded-full text-amber-400 text-sm font-semibold mb-6">
                <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
                Limited Availability
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Join the Zero-Failure Elite
              </h2>
              <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                The X-pert Line is available exclusively to organizations that demand verifiable
                load integrity. Request your confidential briefing to discover how industry leaders
                are eliminating cargo securing failures.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                variant="primary"
                className="group bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white px-10 py-5 text-lg shadow-2xl shadow-amber-500/50"
              >
                Request Invitation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button
                size="lg"
                variant="ghost"
                className="text-slate-300 hover:text-white px-10 py-5 text-lg"
              >
                Download Technical Brief
              </Button>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-800">
              <div className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  <span>No long-term contracts</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  <span>Performance guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-amber-500" />
                  <span>ROI within 90 days</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}

// Main Homepage Component
export default function HomePage() {
  return (
    <MainLayout>
      <div className="bg-slate-950">
        <HeroSection />
        <SocialProofSection />
        <ProblemSection />
        <SolutionSection />
        <CTASection />
      </div>
    </MainLayout>
  );
}
