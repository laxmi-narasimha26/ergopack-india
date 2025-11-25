'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  Battery,
  Zap,
  ShieldCheck,
  Package,
  ChevronRight,
  Scale,
  Sparkles,
  Target,
  Award,
  Wifi,
} from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';
import MainLayout from '@/components/layout/MainLayout';
import { ComprehensiveProduct } from '@/data/comprehensive-products';
import { EssentialsSection } from '@/components/products/EssentialsSection';
import { ProductNavigation } from '@/components/products/ProductNavigation';
import { HorizontalProductCard } from '@/components/products/HorizontalProductCard';
import { FeatureHighlightCard } from '@/components/products/FeatureHighlightCard';

interface ProductLinePageProps {
  line: 'economy' | 'xpert' | 'go';
  products: ComprehensiveProduct[];
}

export const ProductLinePage: React.FC<ProductLinePageProps> = ({ line, products }) => {
  const isXpert = line === 'xpert';

  const getLineInfo = () => {
    switch (line) {
      case 'xpert':
        return {
          title: 'X-pert Line',
          tagline: 'The Pinnacle of Performance',
          description:
            'Engineered for high-volume operations requiring maximum speed and precision. Featuring Siemens Touchscreen control, Line-Laser positioning, and Lithium-Ion technology.',
          icon: Zap,
          accent: 'crimson',
          bgClass: 'bg-luxury-dark-gray',
          textClass: 'text-white',
          features: [
            {
              icon: Battery,
              title: 'Lithium-Ion Power',
              description: 'Up to 1200 strapping cycles per charge with fast charging technology.',
              video: '/videos/demo.mp4',
            },
            {
              icon: Target,
              title: 'Precision Positioning',
              description: 'Line-Laser technology ensures perfect strap placement every time.',
            },
            {
              icon: Sparkles,
              title: 'Siemens Touchscreen',
              description: 'Intuitive 7-inch display with real-time monitoring and diagnostics.',
            },
            {
              icon: Wifi,
              title: 'IoT Connected',
              description: 'Real-time performance tracking and predictive maintenance alerts.',
            },
          ],
        };
      case 'economy':
        return {
          title: 'Economy Line',
          tagline: 'The Benchmark of Efficiency',
          description:
            'The industry standard for ergonomic pallet strapping. Reliable, efficient, and proven technology powered by 24V lead-fleece batteries.',
          icon: ShieldCheck,
          accent: 'platinum',
          bgClass: 'bg-white',
          textClass: 'text-luxury-dark-gray',
          features: [
            {
              icon: ShieldCheck,
              title: 'Proven Reliability',
              description: 'Battle-tested design with thousands of installations worldwide.',
              video: '/videos/726E.mp4',
            },
            {
              icon: Award,
              title: 'AGR Certified',
              description: 'Certified ergonomic design protecting operator health and safety.',
            },
            {
              icon: Battery,
              title: 'Lead-Fleece Batteries',
              description: 'Dependable 24V power with up to 350 cycles per charge.',
            },
            {
              icon: CheckCircle2,
              title: 'Cost-Effective',
              description: 'Best value for reliable, everyday strapping operations.',
            },
          ],
        };
      case 'go':
        return {
          title: 'ErgoPack GO',
          tagline: 'Uncompromised Mobility',
          description:
            'The portable solution for flexible strapping across multiple locations. Compact, powerful, and ready to go wherever you need it.',
          icon: Package,
          accent: 'blue',
          bgClass: 'bg-slate-50',
          textClass: 'text-luxury-dark-gray',
          features: [
            {
              icon: Package,
              title: 'Ultra-Portable Design',
              description: 'Compact and lightweight for easy transport between locations.',
              video: '/videos/ErgoPack_RE.mp4',
            },
            {
              icon: Zap,
              title: 'Quick Setup',
              description: 'Ready to strap in seconds, no complex installation required.',
            },
            {
              icon: Target,
              title: 'Multi-Location Use',
              description: 'Perfect for warehouses with distributed strapping needs.',
            },
            {
              icon: CheckCircle2,
              title: 'Full Power',
              description: "Don't compromise on performance with complete strapping capability.",
            },
          ],
        };
    }
  };

  const info = getLineInfo();
  const Icon = info.icon;

  return (
    <MainLayout>
      <ProductNavigation />
      <div className={`min-h-screen ${info.bgClass}`}>
        {/* Hero Section */}
        <section className="relative pt-40 pb-32 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-4xl"
            >
              <div
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border ${
                  isXpert
                    ? 'bg-crimson-500/10 border-crimson-500/20 text-crimson-400'
                    : 'bg-gray-100 border-gray-200 text-gray-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-bold tracking-widest uppercase">{info.tagline}</span>
              </div>

              <h1
                className={`font-serif text-6xl md:text-8xl font-bold mb-8 leading-tight ${info.textClass}`}
              >
                {info.title}
              </h1>

              <p
                className={`text-2xl md:text-3xl font-light leading-relaxed max-w-3xl ${isXpert ? 'text-gray-400' : 'text-gray-600'}`}
              >
                {info.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* All Models Section - Horizontal Scrolling Grid */}
        <section
          className={`py-24 ${isXpert ? 'border-t border-white/5' : 'border-t border-gray-200'}`}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className={`font-serif text-5xl md:text-6xl font-bold mb-4 ${info.textClass}`}>
                All models.{' '}
                <span className={isXpert ? 'text-gray-500' : 'text-gray-400'}>Take your pick.</span>
              </h2>
            </motion.div>

            {/* Grid Layout Container */}
            <div className="relative">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product, index) => (
                  <HorizontalProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    theme={isXpert ? 'dark' : 'light'}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Why [Line]? Section - Feature Highlights */}
        <section
          className={`py-24 ${isXpert ? 'bg-gradient-to-b from-transparent to-black/20' : 'bg-gray-50'}`}
        >
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-16 text-center"
            >
              <h2 className={`font-serif text-5xl md:text-6xl font-bold mb-4 ${info.textClass}`}>
                Why {info.title}?
              </h2>
              <p
                className={`text-xl max-w-3xl mx-auto ${isXpert ? 'text-gray-400' : 'text-gray-600'}`}
              >
                Discover what makes this line the perfect choice for your operation.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {info.features.map((feature, index) => (
                <FeatureHighlightCard
                  key={index}
                  icon={feature.icon}
                  video={feature.video}
                  title={feature.title}
                  description={feature.description}
                  index={index}
                  theme={isXpert ? 'dark' : 'light'}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Experience Section (Video Showcase) */}
        <section className={`py-32 ${isXpert ? '' : 'bg-white'}`}>
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className={`font-serif text-5xl md:text-6xl font-bold mb-8 ${info.textClass}`}>
                  Experience the difference.
                </h2>
                <p
                  className={`text-xl mb-8 leading-relaxed ${isXpert ? 'text-gray-400' : 'text-gray-600'}`}
                >
                  See the {info.title} in action and discover how it transforms pallet strapping
                  operations with German precision engineering.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton as={motion.div}>
                    <Link
                      href="/contact"
                      className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                        isXpert
                          ? 'bg-crimson-600 text-white hover:bg-crimson-700'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      Request Demo
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </MagneticButton>

                  <MagneticButton as={motion.div}>
                    <Link
                      href="/compare?auto=true"
                      className={`inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-lg border-2 transition-all duration-300 ${
                        isXpert
                          ? 'border-white/20 text-white hover:bg-white/10'
                          : 'border-gray-200 text-gray-900 hover:bg-gray-50'
                      }`}
                    >
                      Compare Models
                      <Scale className="ml-2 w-5 h-5" />
                    </Link>
                  </MagneticButton>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div
                  className={`relative rounded-3xl overflow-hidden shadow-2xl border ${isXpert ? 'border-white/10' : 'border-gray-200'}`}
                >
                  <video autoPlay loop muted playsInline className="w-full h-full object-cover">
                    <source src={info.features[0].video || '/videos/demo.mp4'} type="video/mp4" />
                  </video>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Essentials Section (Only for Economy) */}
        {line === 'economy' && <EssentialsSection />}

        {/* Final CTA */}
        <section
          className={`py-32 ${isXpert ? 'bg-gradient-to-b from-luxury-dark-gray to-black' : 'bg-gray-50'}`}
        >
          <div className="container mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2
                className={`font-serif text-5xl md:text-6xl font-bold mb-8 ${isXpert ? 'text-white' : 'text-gray-900'}`}
              >
                Ready to Transform Your Workflow?
              </h2>
              <p className={`text-xl mb-12 ${isXpert ? 'text-gray-400' : 'text-gray-600'}`}>
                Our experts are ready to help you choose the perfect {info.title} model for your
                specific requirements.
              </p>
              <MagneticButton as={motion.div}>
                <Link
                  href="/contact"
                  className={`inline-flex items-center px-10 py-5 rounded-full font-bold text-xl transition-all duration-300 ${
                    isXpert
                      ? 'bg-crimson-600 text-white hover:bg-crimson-700 shadow-lg shadow-crimson-900/30'
                      : 'bg-gray-900 text-white hover:bg-gray-800 shadow-lg shadow-gray-900/20'
                  }`}
                >
                  Get a Quote
                  <ChevronRight className="ml-2 w-6 h-6" />
                </Link>
              </MagneticButton>
            </motion.div>
          </div>
        </section>
      </div>
    </MainLayout>
  );
};
