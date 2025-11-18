'use client';

import { useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { PremiumLoadingScreen } from '@/components/ui/PremiumLoadingScreen';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { Premium3DCard } from '@/components/ui/Premium3DCard';
import { TextReveal, LineReveal } from '@/components/ui/TextReveal';
import { ParallaxLayer } from '@/components/ui/ParallaxSection';
import { ArrowRight, CheckCircle2, Sparkles, Zap, Shield, Award, Package, Battery, Gauge } from 'lucide-react';
import productsData from '@/../../products-data.json';

// Hero Section - Ultra Premium with Parallax
function HeroSection() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.8]);
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-luxury-off-white via-white to-crimson-50/30" />

      {/* Parallax floating elements */}
      <ParallaxLayer speed={-0.2} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full opacity-20 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #9B1C1C 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </ParallaxLayer>

      <ParallaxLayer speed={0.3} className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{
            background: 'radial-gradient(circle, #FEC9C9 0%, transparent 70%)',
          }}
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </ParallaxLayer>

      <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-40">
        {/* Premium badge with magnetic effect */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16 flex justify-center lg:justify-start"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-crimson-500/30 bg-gradient-to-r from-crimson-50/80 to-white/80 backdrop-blur-xl shadow-2xl shadow-crimson-500/10">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Sparkles className="h-5 w-5 text-crimson-600" />
            </motion.div>
            <span className="text-sm font-semibold text-crimson-700 tracking-wide">
              German Precision. Indian Excellence.
            </span>
          </div>
        </motion.div>

        {/* Hero Grid: Text on left, Video on right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
          {/* Left Column: Headline & Text */}
          <motion.div style={{ opacity, scale, y }}>
            {/* Main headline with text reveal */}
            <div className="mb-12">
              <LineReveal delay={0.4}>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-luxury-dark-gray leading-[0.9] tracking-tighter mb-6">
                  Where Precision
                </h1>
              </LineReveal>
              <LineReveal delay={0.6}>
                <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold leading-[0.9] tracking-tighter">
                  <span className="bg-gradient-to-r from-crimson-600 via-crimson-500 to-crimson-600 bg-clip-text text-transparent">
                    Meets Certainty
                  </span>
                </h1>
              </LineReveal>
            </div>

            {/* Subheadline with word reveal */}
            <TextReveal
              text="Every pallet. Every strap. Every time. Engineered for those who refuse compromise."
              className="text-xl sm:text-2xl text-platinum-600 leading-relaxed mb-12 font-light"
              delay={0.8}
            />

            {/* CTAs with magnetic buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-6 mb-16"
            >
              <MagneticButton href="/contact">
                <button className="btn-premium group text-lg px-12 py-6">
                  <span className="relative z-10 flex items-center">
                    Begin Your Journey
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </button>
              </MagneticButton>

              <MagneticButton href="/products/xpert-line">
                <button className="btn-premium-secondary text-lg px-12 py-6">
                  Discover Excellence
                </button>
              </MagneticButton>
            </motion.div>

            {/* Stats with animated counters */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
              className="flex flex-wrap gap-12 text-sm text-platinum-500 font-light"
            >
              {[
                { value: '99.99%', label: 'Reliability' },
                { value: '10M+', label: 'Loads Secured' },
                { value: 'Made in', label: 'Germany' },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col gap-2"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                >
                  <div className="relative">
                    <div className="text-3xl font-serif font-bold text-luxury-dark-gray">
                      {stat.value}
                    </div>
                    <motion.div
                      className="absolute -inset-4 rounded-full bg-crimson-400/20 blur-xl"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        delay: index * 0.5,
                      }}
                    />
                  </div>
                  <span>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column: Video Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="premium-card overflow-hidden aspect-video bg-gradient-to-br from-luxury-dark-gray to-luxury-space-black relative group">
              {/* Video placeholder content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 text-white">
                <motion.div
                  className="w-20 h-20 rounded-full bg-crimson-500/20 backdrop-blur-sm flex items-center justify-center border border-crimson-500/30 group-hover:bg-crimson-500/30 transition-all duration-500"
                  whileHover={{ scale: 1.1 }}
                >
                  <div className="w-0 h-0 border-t-[12px] border-t-transparent border-l-[20px] border-l-white border-b-[12px] border-b-transparent ml-1" />
                </motion.div>
                <div className="text-center">
                  <p className="text-lg font-serif font-semibold mb-2">Watch ErgoPack in Action</p>
                  <p className="text-sm text-platinum-400 font-light">See precision engineering at work</p>
                </div>
              </div>

              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 opacity-30"
                animate={{
                  background: [
                    'radial-gradient(circle at 20% 50%, rgba(155, 28, 28, 0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 80% 50%, rgba(155, 28, 28, 0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 50% 80%, rgba(155, 28, 28, 0.3) 0%, transparent 50%)',
                    'radial-gradient(circle at 20% 50%, rgba(155, 28, 28, 0.3) 0%, transparent 50%)',
                  ],
                }}
                transition={{
                  duration: 10,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
              />

              {/* Premium glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-crimson-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs text-platinum-400 tracking-wider">SCROLL</span>
          <div className="w-px h-20 bg-gradient-to-b from-platinum-400 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

// Philosophy Section with 3D Cards
function PhilosophySection() {
  return (
    <section className="py-48 bg-white relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-crimson-50/30 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto px-8 sm:px-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-600 mb-8 font-medium">
            Our Philosophy
          </p>
          <h2 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-semibold text-luxury-dark-gray mb-16 leading-tight">
            Crafted for the
            <br />
            <span className="italic text-crimson-600">Uncompromising</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <p className="text-xl sm:text-2xl text-platinum-600 leading-relaxed font-light">
              In a world obsessed with speed, we obsess over precision.
            </p>
            <p className="text-lg text-platinum-600 leading-relaxed font-light">
              When pharmaceutical shipments cross continents, when automotive parts arrive at
              just-in-time production lines, when electronics must reach markets pristine—there is no
              room for approximation.
            </p>
            <p className="text-xl text-luxury-dark-gray font-normal leading-relaxed">
              ErgoPack isn't merely a tool. It's a commitment to excellence that transforms
              uncertainty into documented, verifiable certainty.
            </p>
          </motion.div>

          {/* Right side - 3D Visual element */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Premium3DCard className="premium-card p-12 bg-gradient-to-br from-white to-crimson-50/30">
              <div className="space-y-8">
                {[
                  { icon: Zap, label: 'Speed as Weapon', value: '45s' },
                  { icon: Shield, label: 'German Engineering', value: 'Mercedes-Grade' },
                  { icon: Award, label: 'Elite Operations', value: 'Zero Failures' },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-6 group"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="p-4 rounded-2xl bg-crimson-500/10 border border-crimson-500/20 group-hover:bg-crimson-500/20 transition-colors duration-500">
                      <item.icon className="h-8 w-8 text-crimson-600" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-platinum-500 font-medium mb-1">
                        {item.label}
                      </div>
                      <div className="text-2xl font-serif font-bold text-luxury-dark-gray">
                        {item.value}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Premium3DCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Product Lines with 3D Cards
function ProductLinesSection() {
  return (
    <section className="py-48 bg-gradient-to-b from-white to-luxury-off-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-600 mb-8 font-medium">
            Our Collection
          </p>
          <h2 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-semibold text-luxury-dark-gray leading-tight">
            Two Philosophies.
            <br />
            <span className="text-crimson-600">One Standard.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* X-pert Line Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Premium3DCard glowColor="rgba(155, 28, 28, 0.4)">
              <Link href="/products/xpert-line" className="block group">
                <div className="premium-card-dark p-12 min-h-[650px] flex flex-col justify-between">
                  <div>
                    <motion.div
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-crimson-500/20 border border-crimson-500/30 mb-8"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Sparkles className="h-4 w-4 text-crimson-400" />
                      <span className="text-sm font-medium text-crimson-400 tracking-wide">
                        Premium Series
                      </span>
                    </motion.div>

                    <h3 className="font-serif text-6xl font-bold text-white mb-6 group-hover:text-crimson-400 transition-colors duration-500">
                      X-pert Line
                    </h3>
                    <p className="text-xl text-platinum-300 font-light leading-relaxed mb-12">
                      For operations that demand certainty. IoT monitoring, Siemens control, and
                      blockchain documentation in a system engineered for perfection.
                    </p>

                    <div className="space-y-5">
                      {[
                        'IoT Real-Time Monitoring',
                        'Up to 4500N Tension',
                        'Blockchain Documentation',
                        'Siemens Touchscreen',
                      ].map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-4 text-platinum-200"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-crimson-500 flex-shrink-0" />
                          <span className="font-light">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    className="mt-12 inline-flex items-center gap-3 text-crimson-400 font-medium"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>Explore X-pert Line</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>
              </Link>
            </Premium3DCard>
          </motion.div>

          {/* E-conomy Line Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Premium3DCard glowColor="rgba(113, 113, 122, 0.3)">
              <Link href="/products/economy-line" className="block group">
                <div className="premium-card p-12 min-h-[650px] flex flex-col justify-between bg-gradient-to-br from-white to-platinum-50">
                  <div>
                    <motion.div
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-platinum-100 border border-platinum-200 mb-8"
                      whileHover={{ scale: 1.05 }}
                    >
                      <span className="text-sm font-medium text-platinum-700 tracking-wide">
                        Professional Series
                      </span>
                    </motion.div>

                    <h3 className="font-serif text-6xl font-bold text-luxury-dark-gray mb-6 group-hover:text-platinum-700 transition-colors duration-500">
                      E-conomy Line
                    </h3>
                    <p className="text-xl text-platinum-600 font-light leading-relaxed mb-12">
                      Proven performance. Reliable tension control. The same German engineering in
                      a format that emphasizes hands-on precision.
                    </p>

                    <div className="space-y-5">
                      {[
                        'Reliable Tension Control',
                        'Up to 3500N Tension',
                        'Manual Operation',
                        'Documented Quality',
                      ].map((feature, i) => (
                        <motion.div
                          key={i}
                          className="flex items-center gap-4 text-platinum-700"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <CheckCircle2 className="h-5 w-5 text-platinum-600 flex-shrink-0" />
                          <span className="font-light">{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.div
                    className="mt-12 inline-flex items-center gap-3 text-luxury-dark-gray font-medium"
                    whileHover={{ x: 8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <span>Explore E-conomy Line</span>
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>
              </Link>
            </Premium3DCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Product Showcase - All 11 Models
function ProductShowcaseSection() {
  const productSeries = [
    {
      name: '745 Series',
      subtitle: 'Heavy-Duty Champions',
      description: 'Maximum power for your toughest packaging challenges',
      models: ['745E', '745X'],
      gradient: 'from-red-600 to-crimson-600',
      bgGradient: 'from-red-50 to-crimson-50',
    },
    {
      name: '726 Series',
      subtitle: 'Light-Duty Performers',
      description: 'Perfect balance for everyday applications',
      models: ['726E', '726X'],
      gradient: 'from-orange-600 to-amber-600',
      bgGradient: 'from-orange-50 to-amber-50',
    },
    {
      name: '713 Series',
      subtitle: 'Ultra-Light Precision',
      description: 'Delicate handling meets professional results',
      models: ['713E', '713X'],
      gradient: 'from-yellow-600 to-orange-600',
      bgGradient: 'from-yellow-50 to-orange-50',
    },
    {
      name: '700 Series',
      subtitle: 'Complete Flexibility',
      description: 'Manual, Economy, or X-pert - your choice',
      models: ['700', '700E', '700X'],
      gradient: 'from-blue-600 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
    },
    {
      name: 'Mobile Systems',
      subtitle: 'Portable Power',
      description: 'Take precision anywhere with RE & GO',
      models: ['RE', 'GO'],
      gradient: 'from-green-600 to-emerald-600',
      bgGradient: 'from-green-50 to-emerald-50',
    },
  ];

  return (
    <section className="py-48 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-600 mb-8 font-medium">
            Complete Product Range
          </p>
          <h2 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-semibold text-luxury-dark-gray leading-tight mb-8">
            All 11 Models.
            <br />
            <span className="text-crimson-600">Every Need Covered.</span>
          </h2>
          <p className="text-xl text-platinum-600 max-w-3xl mx-auto font-light">
            From ultra-light to heavy-duty, manual to IoT-enabled - discover the perfect ErgoPack for your operation.
          </p>
        </motion.div>

        {/* Series Grid */}
        <div className="space-y-24">
          {productSeries.map((series, seriesIndex) => (
            <motion.div
              key={series.name}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: seriesIndex * 0.1 }}
            >
              {/* Series Header */}
              <div className={`mb-12 p-8 rounded-3xl bg-gradient-to-br ${series.bgGradient} border border-platinum-200`}>
                <h3 className={`font-serif text-4xl sm:text-5xl font-bold bg-gradient-to-r ${series.gradient} bg-clip-text text-transparent mb-3`}>
                  {series.name}
                </h3>
                <p className="text-2xl text-luxury-dark-gray font-semibold mb-2">
                  {series.subtitle}
                </p>
                <p className="text-lg text-platinum-600 font-light">
                  {series.description}
                </p>
              </div>

              {/* Model Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {series.models.map((modelKey, modelIndex) => {
                  const product = productsData.products[modelKey];
                  if (!product) return null;

                  const isXpert = product.productLine === 'X-pert Line';
                  const cardClass = isXpert
                    ? 'premium-card-dark'
                    : 'premium-card bg-gradient-to-br from-white to-platinum-50';

                  return (
                    <motion.div
                      key={modelKey}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: modelIndex * 0.1 }}
                    >
                      <Premium3DCard glowColor={isXpert ? "rgba(155, 28, 28, 0.3)" : "rgba(113, 113, 122, 0.2)"}>
                        <Link href={`/products/${product.slug}`} className="block group">
                          <div className={`${cardClass} p-8 min-h-[520px] flex flex-col justify-between`}>
                            <div>
                              {/* Badge */}
                              <div className="flex items-center justify-between mb-6">
                                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                                  isXpert
                                    ? 'bg-crimson-500/20 border border-crimson-500/30'
                                    : 'bg-platinum-100 border border-platinum-200'
                                }`}>
                                  <span className={`text-xs font-medium tracking-wide ${
                                    isXpert ? 'text-crimson-400' : 'text-platinum-700'
                                  }`}>
                                    {product.productLine}
                                  </span>
                                </div>
                                {product.batteryTechnology === 'Lithium-Ion' && (
                                  <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
                                    <Battery className="h-4 w-4 text-amber-400" />
                                  </div>
                                )}
                              </div>

                              {/* Model Name */}
                              <h4 className={`font-serif text-4xl font-bold mb-4 ${
                                isXpert
                                  ? 'text-white group-hover:text-crimson-400'
                                  : 'text-luxury-dark-gray group-hover:text-platinum-700'
                              } transition-colors duration-500`}>
                                {product.modelNumber}
                              </h4>
                              <p className={`text-lg mb-8 ${
                                isXpert ? 'text-platinum-300' : 'text-platinum-600'
                              } font-light`}>
                                {product.fullName}
                              </p>

                              {/* Key Specs */}
                              <div className="space-y-4 mb-8">
                                <div className="flex items-center justify-between">
                                  <span className={`text-sm ${isXpert ? 'text-platinum-400' : 'text-platinum-500'}`}>
                                    Application
                                  </span>
                                  <span className={`text-sm font-medium ${isXpert ? 'text-white' : 'text-luxury-dark-gray'}`}>
                                    {product.applicationType}
                                  </span>
                                </div>
                                {product.maxTension && (
                                  <div className="flex items-center justify-between">
                                    <span className={`text-sm ${isXpert ? 'text-platinum-400' : 'text-platinum-500'}`}>
                                      Max Tension
                                    </span>
                                    <span className={`text-sm font-medium ${isXpert ? 'text-white' : 'text-luxury-dark-gray'}`}>
                                      {product.maxTension}
                                    </span>
                                  </div>
                                )}
                                {product.chainSpeed && (
                                  <div className="flex items-center justify-between">
                                    <span className={`text-sm ${isXpert ? 'text-platinum-400' : 'text-platinum-500'}`}>
                                      Chain Speed
                                    </span>
                                    <span className={`text-sm font-medium ${isXpert ? 'text-white' : 'text-luxury-dark-gray'}`}>
                                      {product.chainSpeed}
                                    </span>
                                  </div>
                                )}
                                {product.batteryTechnology && (
                                  <div className="flex items-center justify-between">
                                    <span className={`text-sm ${isXpert ? 'text-platinum-400' : 'text-platinum-500'}`}>
                                      Battery
                                    </span>
                                    <span className={`text-sm font-medium ${isXpert ? 'text-white' : 'text-luxury-dark-gray'}`}>
                                      {product.batteryTechnology}
                                    </span>
                                  </div>
                                )}
                              </div>

                              {/* Top Features */}
                              <div className="space-y-3">
                                {product.includedFeatures?.slice(0, 3).map((feature: string, i: number) => (
                                  <div
                                    key={i}
                                    className={`flex items-start gap-2 text-sm ${
                                      isXpert ? 'text-platinum-300' : 'text-platinum-600'
                                    }`}
                                  >
                                    <CheckCircle2 className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                                      isXpert ? 'text-crimson-500' : 'text-platinum-600'
                                    }`} />
                                    <span className="font-light">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* CTA */}
                            <motion.div
                              className={`mt-8 pt-6 border-t ${
                                isXpert ? 'border-platinum-700' : 'border-platinum-200'
                              } inline-flex items-center gap-3 ${
                                isXpert ? 'text-crimson-400' : 'text-luxury-dark-gray'
                              } font-medium`}
                              whileHover={{ x: 8 }}
                              transition={{ duration: 0.3 }}
                            >
                              <span>View Details</span>
                              <ArrowRight className="h-5 w-5" />
                            </motion.div>
                          </div>
                        </Link>
                      </Premium3DCard>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <MagneticButton href="/products/compare-all">
            <button className="btn-premium-secondary text-lg px-12 py-6 group">
              <span className="flex items-center">
                Compare All Models
                <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}

// Social Proof Section
function SocialProofSection() {
  return (
    <section className="py-48 bg-luxury-space-black text-white relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 opacity-10">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, #9B1C1C 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-8 sm:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="text-sm uppercase tracking-[0.3em] text-crimson-500 mb-8 font-medium">
            Trusted Worldwide
          </p>
          <h2 className="font-serif text-6xl sm:text-7xl font-semibold mb-24">
            Join India's Elite Operations
          </h2>

          <div className="grid grid-cols-3 gap-24 max-w-4xl mx-auto">
            {[
              { value: '99.99%', label: 'Success Rate' },
              { value: '10M+', label: 'Loads Secured' },
              { value: 'Zero', label: 'Failures' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="text-7xl font-serif font-bold text-crimson-500 mb-4">
                  {stat.value}
                </div>
                <div className="text-platinum-400 font-light">{stat.label}</div>

                {/* Glow effect */}
                <motion.div
                  className="absolute -inset-8 rounded-full bg-crimson-500/10 blur-3xl"
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.1, 0.2, 0.1],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  return (
    <section className="py-48 bg-gradient-to-br from-crimson-50 via-white to-platinum-50 relative overflow-hidden">
      {/* Elegant background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full opacity-20 blur-3xl bg-gradient-to-br from-crimson-300 to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-8 sm:px-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-semibold text-luxury-dark-gray mb-16 leading-tight">
            Your Journey to
            <br />
            <span className="italic text-crimson-600">Excellence</span> Begins Here
          </h2>
          <p className="text-2xl sm:text-3xl text-platinum-600 mb-20 font-light leading-relaxed max-w-3xl mx-auto">
            Request a private briefing and discover how the world's most demanding operations
            engineer certainty into every load.
          </p>

          <MagneticButton href="/contact">
            <button className="btn-premium text-xl px-16 py-7 group">
              <span className="relative z-10 flex items-center">
                Request Your Invitation
                <ArrowRight className="ml-4 h-7 w-7 group-hover:translate-x-2 transition-transform duration-500" />
              </span>
            </button>
          </MagneticButton>

          <div className="mt-20 flex flex-wrap justify-center gap-16 text-sm text-platinum-500 font-light">
            {['No Obligation Briefing', 'Custom ROI Analysis', 'Dedicated Specialist'].map(
              (item, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <CheckCircle2 className="h-5 w-5 text-crimson-600" />
                  <span>{item}</span>
                </motion.div>
              )
            )}
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
            <ProductLinesSection />
            <ProductShowcaseSection />
            <SocialProofSection />
            <FinalCTASection />
          </div>
        </MainLayout>
      )}
    </>
  );
}
