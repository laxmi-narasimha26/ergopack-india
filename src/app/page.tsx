'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import ScrollHeader from '@/components/layout/ScrollHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import AppleStyleProductShowcase from '@/components/elite/sections/AppleStyleProductShowcase';
import VideoHeroSection from '@/components/elite/sections/VideoHeroSection';
import PhilosophySection from '@/components/elite/sections/PhilosophySection';
import SocialProofSection from '@/components/elite/sections/SocialProofSection';
import FinalCTASection from '@/components/elite/sections/FinalCTASection';
import { ArrowRight, CheckCircle2, Sparkles, Zap, Shield, Award, Battery } from 'lucide-react';
import productsData from '../../products-data.json';

// --- Components ---

function ProductLinesSection() {
  return (
    <section className="py-40 bg-white relative">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-32"
        >
          <h2 className="font-serif text-6xl sm:text-8xl text-artisan-black mb-6">One Standard.</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* X-pert Line - The "Black Card" */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/products/xpert-line" className="block group h-full">
              <div className="h-full bg-[#111111] p-12 sm:p-16 rounded-[2rem] relative overflow-hidden transition-transform duration-700 group-hover:-translate-y-2">
                <div className="relative z-10">
                  <div className="inline-block px-4 py-1.5 rounded-full border border-red-900/50 bg-red-900/10 mb-12">
                    <span className="text-xs uppercase tracking-widest text-red-400 font-medium">
                      Premium Series
                    </span>
                  </div>

                  <h3 className="font-serif text-5xl sm:text-6xl text-white mb-8">X-pert Line</h3>
                  <p className="text-gray-400 text-lg font-light leading-relaxed mb-16 max-w-md">
                    For operations that demand certainty. IoT monitoring, Siemens control, and
                    blockchain documentation in a system engineered for perfection.
                  </p>

                  <div className="space-y-6 mb-16">
                    {[
                      'IoT Real-Time Monitoring',
                      'Up to 4500N Tension',
                      'Blockchain Documentation',
                      'Siemens Touchscreen',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border border-red-500/30 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        </div>
                        <span className="text-gray-300 font-light">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-red-400 font-medium group-hover:gap-6 transition-all duration-300">
                    <span>Explore X-pert Line</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* E-conomy Line - The "White Card" */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link href="/products/economy-line" className="block group h-full">
              <div className="h-full bg-artisan-white border border-gray-100 p-12 sm:p-16 rounded-[2rem] relative overflow-hidden transition-transform duration-700 group-hover:-translate-y-2 shadow-2xl shadow-black/5">
                <div className="relative z-10">
                  <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 mb-12">
                    <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                      Professional Series
                    </span>
                  </div>

                  <h3 className="font-serif text-5xl sm:text-6xl text-artisan-black mb-8">
                    E-conomy Line
                  </h3>
                  <p className="text-gray-500 text-lg font-light leading-relaxed mb-16 max-w-md">
                    Proven performance. Reliable tension control. The same German engineering in a
                    format that emphasizes hands-on precision.
                  </p>

                  <div className="space-y-6 mb-16">
                    {[
                      'Reliable Tension Control',
                      'Up to 3500N Tension',
                      'Manual Operation',
                      'Documented Quality',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        </div>
                        <span className="text-gray-600 font-light">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-artisan-black font-medium group-hover:gap-6 transition-all duration-300">
                    <span>Explore E-conomy Line</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <ScrollHeader />
      <MainLayout hideLogoInitially={true} noPadding={true}>
        <div className="bg-white selection:bg-artisan-gold selection:text-white">
          <VideoHeroSection />
          <AppleStyleProductShowcase />
          <PhilosophySection />
          <SocialProofSection />
          <FinalCTASection />
        </div>
      </MainLayout>
    </>
  );
}
