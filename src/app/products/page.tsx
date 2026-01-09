'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { ArrowRight, Zap, ShieldCheck, Scale, BarChart3, Ruler, Battery, Timer } from 'lucide-react';
import { EssentialsSection } from '@/components/products/EssentialsSection';
import {
  ergoPack700,
  ergoPack700E,
  ergoPack700X,
  ergoPack713E,
  ergoPack713X,
  ergoPack726E,
  ergoPack726X,
  ergoPack745E,
  ergoPack745X,
  ergoPackGO,
} from '@/data/comprehensive-products';

export default function ProductsPage() {
  // X-pert Line products
  const xpertProducts = [
    {
      ...ergoPack700X,
      strapWidth: 'Multi',
      keyDiff: 'Standard',
      description: 'The versatile powerhouse for standard strapping applications.',
    },
    {
      ...ergoPack713X,
      strapWidth: '9-13mm',
      keyDiff: 'Light Duty',
      description: 'High-speed precision for lighter pallet loads.',
    },
    {
      ...ergoPack726X,
      strapWidth: '13-16mm',
      keyDiff: 'Medium Duty',
      description: 'Perfect balance of power and speed for medium loads.',
    },
    {
      ...ergoPack745X,
      strapWidth: '16-19mm',
      keyDiff: 'Heavy Duty',
      description: 'Maximum tension force for heavy industrial loads.',
    },
  ];

  // Economy Line products
  const economyProducts = [
    {
      ...ergoPack700,
      id: '700', // Ensure string ID
      strapWidth: 'Multi',
      keyDiff: 'Manual',
      speed: 'Manual',
      cycles: '∞',
      description: 'Manual hand-crank system. Zero electricity costs.',
    },
    {
      ...ergoPack700E,
      id: '700E',
      strapWidth: '9-13mm',
      keyDiff: 'Entry Battery',
      speed: '40m/min',
      cycles: '350',
      description: 'Entry-level battery system for standard loads.',
    },
    {
      ...ergoPack713E,
      id: '713E',
      strapWidth: '9-13mm',
      keyDiff: 'Light Loads',
      speed: '40m/min',
      cycles: '350',
      description: 'Economical solution for 9-13mm light applications.',
    },
    {
      ...ergoPack726E,
      id: '726E',
      strapWidth: '13-16mm',
      keyDiff: 'Medium Loads',
      speed: '40m/min',
      cycles: '350',
      description: 'Reliable performance for 13-16mm medium straps.',
    },
    {
      ...ergoPack745E,
      id: '745E',
      strapWidth: '16-19mm',
      keyDiff: 'Heavy Loads',
      speed: '40m/min',
      cycles: '350',
      description: 'Heavy-duty capability for 16-19mm straps.',
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-neutral-900">

        {/* Header & Compare CTA */}
        <section className="pt-32 pb-12 bg-neutral-900 border-b border-white/5">
          <div className="container-full px-8 md:px-12 mx-auto flex flex-col md:flex-row justify-between items-end gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-4 tracking-tight">
                The Collection
              </h1>
              <p className="text-xl text-white/60">
                German engineering excellence. Choose X-pert for performance or Economy for efficiency.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <Link href="/compare?auto=true">
                <button className="bg-[#C8102E] text-white px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-red-700 transition-colors shadow-[0_0_30px_rgba(200,16,46,0.3)] flex items-center gap-3">
                  <Scale className="w-5 h-5" />
                  Compare Models
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* X-PERT LINE - FULL SCREEN IMMERSIVE */}
        <section className="w-full bg-neutral-950 border-b border-white/5 relative overflow-hidden">
          {/* Ambient Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-[#C8102E] opacity-[0.03] blur-[150px] pointer-events-none" />

          <div className="w-full px-6 md:px-10 py-16">
            <div className="flex items-center gap-4 mb-12 pl-2">
              <Zap className="w-8 h-8 text-[#C8102E]" />
              <h2 className="text-4xl font-bold text-white tracking-tight">X-pert Line <span className="text-white/30 font-normal ml-3 text-2xl">Premium Series</span></h2>
            </div>

            {/* Full Width Grid - 4 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {xpertProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="h-full"
                >
                  <Link href={`/products/${product.id.toLowerCase()}`} className="block group h-full">
                    <div className="bg-neutral-900 border border-white/5 rounded-2xl overflow-hidden hover:border-[#C8102E]/50 transition-all duration-500 h-[650px] flex flex-col relative group-hover:shadow-[0_0_50px_rgba(0,0,0,0.5)]">

                      {/* Floating Spec Badge */}
                      <div className="absolute top-6 right-6 z-10 flex flex-col gap-2 items-end">
                        <span className="bg-[#C8102E] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                          {product.keyDiff}
                        </span>
                        <span className="bg-white/10 backdrop-blur-md text-white border border-white/10 text-xs font-bold px-3 py-1 rounded-full">
                          {product.strapWidth}
                        </span>
                      </div>

                      {/* Image Area - TALL */}
                      <div className="h-[380px] bg-gradient-to-b from-neutral-800/30 to-transparent flex items-center justify-center p-8 relative">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <Image
                          src={product.images.hero}
                          alt={product.name}
                          fill
                          className="object-contain p-4 group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-700 ease-out"
                        />
                      </div>

                      {/* Content Area */}
                      <div className="p-8 flex flex-col flex-grow bg-neutral-900">
                        <h3 className="text-2xl font-bold text-white group-hover:text-[#C8102E] transition-colors mb-2">
                          {product.name}
                        </h3>
                        <p className="text-white/50 text-sm mb-6 flex-grow leading-relaxed">
                          {product.description}
                        </p>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-3 mb-6">
                          <div className="bg-neutral-950 rounded-lg p-3 border border-white/5">
                            <div className="flex items-center gap-2 text-[#C8102E] mb-1">
                              <Timer className="w-3 h-3" />
                              <span className="text-[10px] uppercase tracking-wider font-bold">Speed</span>
                            </div>
                            <div className="text-lg font-bold text-white">66m<span className="text-xs text-white/40 font-normal">/min</span></div>
                          </div>
                          <div className="bg-neutral-950 rounded-lg p-3 border border-white/5">
                            <div className="flex items-center gap-2 text-[#C8102E] mb-1">
                              <Battery className="w-3 h-3" />
                              <span className="text-[10px] uppercase tracking-wider font-bold">Cycles</span>
                            </div>
                            <div className="text-lg font-bold text-white">1200</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-white/40 text-sm font-medium group-hover:text-white transition-colors mt-auto">
                          <span>View Full Specs</span>
                          <ArrowRight className="w-4 h-4 text-[#C8102E]" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ECONOMY LINE - FULL SCREEN IMMERSIVE - LIGHT */}
        <section className="w-full bg-slate-50 border-t border-white/10">
          <div className="w-full px-6 md:px-10 py-16">
            <div className="flex items-center gap-4 mb-12 pl-2">
              <ShieldCheck className="w-8 h-8 text-slate-700" />
              <h2 className="text-4xl font-bold text-slate-900 tracking-tight">Economy Line <span className="text-slate-400 font-normal ml-3 text-2xl">Professional Series</span></h2>
            </div>

            {/* Full Width Grid - 5 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {economyProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                >
                  <Link href={`/products/${product.id.toLowerCase()}`} className="block group h-full">
                    <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-400 hover:shadow-xl transition-all duration-300 h-[500px] flex flex-col relative">

                      {/* Spec Badge */}
                      <div className="absolute top-4 left-4 z-10">
                        <span className="bg-slate-100 text-slate-600 text-[10px] font-bold px-2 py-1 rounded border border-slate-200 uppercase tracking-wide">
                          {product.keyDiff}
                        </span>
                      </div>

                      {/* Image Area */}
                      <div className="relative h-[250px] bg-slate-50 flex items-center justify-center p-6 overflow-hidden">
                        <Image
                          src={product.images.hero}
                          alt={product.name}
                          fill
                          className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content Area */}
                      <div className="p-5 flex flex-col flex-grow">
                        <div className="mb-auto">
                          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#C8102E] transition-colors mb-1">
                            {product.name}
                          </h3>
                          <div className="text-xs font-bold text-slate-400 mb-3">{product.strapWidth}</div>
                          <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                            {product.description}
                          </p>
                        </div>

                        {/* Mini Specs */}
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
                          <div className="text-center">
                            <div className="text-[9px] text-slate-400 uppercase font-bold">Speed</div>
                            <div className="text-sm font-bold text-slate-700">{product.speed}</div>
                          </div>
                          <div className="w-px h-6 bg-slate-200" />
                          <div className="text-center">
                            <div className="text-[9px] text-slate-400 uppercase font-bold">Cycles</div>
                            <div className="text-sm font-bold text-slate-700">{product.cycles}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ERGOPACK GO - HORIZONTAL FEATURE */}
        <section className="w-full bg-white border-t border-slate-200 py-16">
          <div className="container-full px-6 md:px-10 mx-auto">
            <Link href="/products/go" className="block group">
              <div className="w-full bg-blue-600 rounded-3xl overflow-hidden text-white relative h-[400px] shadow-2xl shadow-blue-900/20 group-hover:shadow-blue-900/30 transition-all">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent z-10" />
                <div className="absolute inset-0 bg-[url('/grid-pattern.png')] opacity-10" />

                <div className="relative z-20 h-full flex flex-col md:flex-row items-center">
                  <div className="p-12 md:p-20 md:w-1/2">
                    <div className="inline-block bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-6">
                      Portable Series
                    </div>
                    <h2 className="text-5xl font-bold mb-4">ErgoPack GO</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-lg">
                      No cords. No limits. The ultimate portable strapping solution for multi-location flexibility.
                    </p>
                    <div className="flex items-center gap-3 font-bold group-hover:gap-5 transition-all">
                      <span>Discover Freedom</span>
                      <ArrowRight className="w-6 h-6" />
                    </div>
                  </div>

                  <div className="md:w-1/2 h-full relative">
                    <Image
                      src={ergoPackGO.images.hero}
                      alt="ErgoPack GO"
                      fill
                      className="object-contain p-8 group-hover:scale-105 group-hover:-rotate-2 transition-transform duration-700"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>

        <EssentialsSection />

      </div>
    </MainLayout>
  );
}
