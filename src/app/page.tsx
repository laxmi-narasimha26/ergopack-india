'use client';

export const dynamic = 'force-dynamic';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import ScrollHeader from '@/components/layout/ScrollHeader';
import { MagneticButton } from '@/components/ui/MagneticButton';
import AppleStyleProductShowcase from '@/components/elite/sections/AppleStyleProductShowcase';
import VideoHeroSection from '@/components/elite/sections/VideoHeroSection';
import PhilosophySection from '@/components/elite/sections/PhilosophySection';
import SocialProofSection from '@/components/elite/sections/SocialProofSection';
import FinalCTASection from '@/components/elite/sections/FinalCTASection';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import productsData from '../../products-data.json';

// --- Components ---

function ProductLinesSection() {
  return (
    <section className="py-8 md:py-40 bg-white relative">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-32"
        >
          <h2 className="font-serif text-6xl sm:text-8xl text-artisan-black mb-6">One Standard.</h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LFP India Exclusive - The "India Card" */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Link href="/products/lfp-india-exclusive" className="block group h-full">
              <div className="h-full bg-gradient-to-br from-orange-50 via-white to-green-50 border border-orange-100 p-10 rounded-[2rem] relative overflow-hidden transition-transform duration-700 group-hover:-translate-y-2 shadow-xl shadow-orange-900/5">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-orange-500 via-white to-green-500" />

                <div className="relative z-10">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-200 bg-orange-50 mb-10">
                    <span className="text-lg">🇮🇳</span>
                    <span className="text-xs uppercase tracking-widest text-orange-700 font-bold">
                      India Exclusive
                    </span>
                  </div>

                  <h3 className="font-serif text-4xl sm:text-5xl text-gray-900 mb-6">LFP India</h3>
                  <p className="text-gray-600 text-lg font-light leading-relaxed mb-12">
                    Premium Lithium-Iron-Phosphate technology engineered specifically for Indian
                    industrial conditions. Safest, longest-lasting power.
                  </p>

                  <div className="space-y-4 mb-12">
                    {[
                      'LFP Battery Technology',
                      '600 Strapping Cycles',
                      '8-Hour Charging',
                      'Superior Safety',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border border-orange-500/30 flex items-center justify-center bg-orange-50">
                          <CheckCircle2 className="w-3 h-3 text-orange-600" />
                        </div>
                        <span className="text-gray-700 font-light text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-orange-600 font-bold group-hover:gap-6 transition-all duration-300">
                    <span>Explore LFP India</span>
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>

          {/* X-pert Line - The "Black Card" */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <Link href="/products/xpert-line" className="block group h-full">
              <div className="h-full bg-[#111111] p-10 rounded-[2rem] relative overflow-hidden transition-transform duration-700 group-hover:-translate-y-2">
                <div className="relative z-10">
                  <div className="inline-block px-4 py-1.5 rounded-full border border-red-900/50 bg-red-900/10 mb-10">
                    <span className="text-xs uppercase tracking-widest text-red-400 font-medium">
                      Premium Series
                    </span>
                  </div>

                  <h3 className="font-serif text-4xl sm:text-5xl text-white mb-6">X-pert Line</h3>
                  <p className="text-gray-400 text-lg font-light leading-relaxed mb-12">
                    For operations that demand certainty. IoT monitoring, Siemens control, and
                    blockchain documentation.
                  </p>

                  <div className="space-y-4 mb-12">
                    {[
                      'IoT Real-Time Monitoring',
                      'Up to 4500N Tension',
                      'Blockchain Documentation',
                      'Siemens Touchscreen',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border border-red-500/30 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                        </div>
                        <span className="text-gray-300 font-light text-sm">{item}</span>
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
              <div className="h-full bg-artisan-white border border-gray-100 p-10 rounded-[2rem] relative overflow-hidden transition-transform duration-700 group-hover:-translate-y-2 shadow-2xl shadow-black/5">
                <div className="relative z-10">
                  <div className="inline-block px-4 py-1.5 rounded-full border border-gray-200 bg-gray-50 mb-10">
                    <span className="text-xs uppercase tracking-widest text-gray-500 font-medium">
                      Professional Series
                    </span>
                  </div>

                  <h3 className="font-serif text-4xl sm:text-5xl text-artisan-black mb-6">
                    E-conomy Line
                  </h3>
                  <p className="text-gray-500 text-lg font-light leading-relaxed mb-12">
                    The industry standard for ergonomic pallet strapping. Reliable, efficient, and
                    proven technology.
                  </p>

                  <div className="space-y-4 mb-12">
                    {[
                      'Proven Reliability',
                      'AGR Certified',
                      'Lead-Fleece Batteries',
                      'Cost-Effective',
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                        </div>
                        <span className="text-gray-700 font-light text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-gray-900 font-medium group-hover:gap-6 transition-all duration-300">
                    <span>Explore E-conomy</span>
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
