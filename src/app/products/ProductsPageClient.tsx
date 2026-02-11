'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import {
  ArrowRight,
  Zap,
  ShieldCheck,
  Scale,
  BarChart3,
  Ruler,
  Battery,
  Timer,
} from 'lucide-react';
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

export default function ProductsPageClient() {
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
      cycles: 'Γê₧',
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
        {/* Header - Uses viewport units for universal sizing */}
        <section className="pt-[4.5rem] pb-[1vh] bg-neutral-900 border-b border-white/5">
          <div className="container-full px-[2vw] mx-auto flex flex-col md:flex-row justify-between items-center md:items-end gap-[1vh]">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-center md:text-left"
            >
              <h1 className="text-[clamp(1.5rem,4vw,3rem)] font-serif font-bold text-white mb-[0.5vh] tracking-tight">
                The Collection
              </h1>
              <p className="text-[clamp(0.7rem,1.5vw,1rem)] text-white/60">
                German engineering excellence. X-pert for performance, Economy for efficiency.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <Link href="/compare?auto=true">
                <button className="bg-[#C8102E] text-white px-[1.5vw] py-[0.8vh] rounded-full font-bold text-[clamp(0.6rem,1vw,0.875rem)] tracking-wider uppercase hover:bg-red-700 transition-colors shadow-lg flex items-center gap-[0.5vw]">
                  <Scale className="w-[clamp(0.875rem,1.2vw,1.25rem)] h-[clamp(0.875rem,1.2vw,1.25rem)]" />
                  Compare
                </button>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* X-PERT LINE - Cards fill viewport */}
        <section className="w-full bg-neutral-950 relative overflow-hidden h-[calc(100vh-10rem)]">
          {/* Ambient Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-[#C8102E] opacity-[0.04] blur-[120px] pointer-events-none" />

          <div className="w-full h-full px-4 md:px-8 py-4 flex flex-col">
            {/* Section Header */}
            <div className="flex items-center gap-3 mb-4 shrink-0">
              <Zap className="w-6 h-6 text-[#C8102E]" />
              <h2 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                X-pert Line{' '}
                <span className="text-white/30 font-normal ml-2 text-lg">Premium Series</span>
              </h2>
            </div>

            {/* Product Grid - fills remaining height */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 flex-grow min-h-0">
              {xpertProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  className="min-h-0"
                >
                  <Link
                    href={`/products/${product.id.toLowerCase()}`}
                    className="block group h-full"
                  >
                    <div className="bg-neutral-900/80 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-[#C8102E]/60 transition-all duration-300 flex flex-col h-full group-hover:shadow-2xl group-hover:shadow-red-900/20">
                      {/* Badge */}
                      <div className="absolute top-3 right-3 z-10">
                        <span className="bg-[#C8102E] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-lg">
                          {product.keyDiff}
                        </span>
                      </div>

                      {/* Image Area - Constrained to ensure specs visibility */}
                      <div className="flex-grow relative bg-gradient-to-b from-neutral-800/40 to-transparent flex items-center justify-center min-h-0 max-h-[50vh]">
                        <Image
                          src={product.images.hero}
                          alt={product.name}
                          fill
                          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>

                      {/* Content - Fixed height at bottom */}
                      <div className="p-4 bg-neutral-900 shrink-0">
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-[#C8102E] transition-colors mb-1">
                          {product.name}
                        </h3>
                        <p className="text-white/50 text-sm mb-3 line-clamp-1 hidden md:block">
                          {product.description}
                        </p>

                        {/* Specs Row */}
                        <div className="flex items-center justify-between pt-3 border-t border-white/10">
                          <div className="text-center">
                            <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider">
                              Speed
                            </div>
                            <div className="text-base font-bold text-white">
                              66m<span className="text-xs text-white/40">/min</span>
                            </div>
                          </div>
                          <div className="w-px h-8 bg-white/10" />
                          <div className="text-center">
                            <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider">
                              Cycles
                            </div>
                            <div className="text-base font-bold text-white">1200</div>
                          </div>
                          <div className="w-px h-8 bg-white/10" />
                          <div className="text-center">
                            <div className="text-[10px] text-white/40 uppercase font-bold tracking-wider">
                              Width
                            </div>
                            <div className="text-base font-bold text-white">
                              {product.strapWidth}
                            </div>
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

        {/* ECONOMY LINE - Viewport-based sizing */}
        <section className="w-full bg-slate-50 border-t border-white/10">
          <div className="w-full px-[1.5vw] py-[1.5vh]">
            <div className="flex items-center gap-[0.8vw] mb-[1vh] pl-[0.5vw]">
              <ShieldCheck className="w-[clamp(1rem,2vw,1.5rem)] h-[clamp(1rem,2vw,1.5rem)] text-slate-700" />
              <h2 className="text-[clamp(1rem,2.5vw,2rem)] font-bold text-slate-900 tracking-tight">
                Economy Line{' '}
                <span className="text-slate-400 font-normal ml-[0.5vw] text-[clamp(0.7rem,1.2vw,1.125rem)]">
                  Professional
                </span>
              </h2>
            </div>

            {/* 5-column grid with viewport-based sizing */}
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-[0.8vw]">
              {economyProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.03, duration: 0.3 }}
                >
                  <Link
                    href={`/products/${product.id.toLowerCase()}`}
                    className="block group h-full"
                  >
                    <div className="bg-white border border-slate-200 rounded-[clamp(0.3rem,0.8vw,0.75rem)] overflow-hidden hover:border-slate-400 hover:shadow-lg transition-all duration-300 flex flex-col relative h-full">
                      {/* Spec Badge */}
                      <div className="absolute top-[0.5vh] left-[0.5vw] z-10">
                        <span className="bg-slate-100 text-slate-600 text-[clamp(0.35rem,0.6vw,0.5rem)] font-bold px-[0.4vw] py-[0.2vh] rounded border border-slate-200 uppercase tracking-wide">
                          {product.keyDiff}
                        </span>
                      </div>

                      {/* Image Area - Viewport-constrained */}
                      <div className="relative aspect-square max-h-[18vh] bg-slate-50 flex items-center justify-center p-[0.5vw] overflow-hidden">
                        <Image
                          src={product.images.hero}
                          alt={product.name}
                          fill
                          className="object-contain p-[0.3vw] group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Content Area */}
                      <div className="p-[0.6vw] flex flex-col flex-grow">
                        <h3 className="text-[clamp(0.55rem,1vw,0.875rem)] font-bold text-slate-900 group-hover:text-[#C8102E] transition-colors mb-[0.2vh] truncate">
                          {product.name}
                        </h3>
                        <div className="text-[clamp(0.4rem,0.7vw,0.625rem)] font-bold text-slate-400 mb-[0.3vh]">
                          {product.strapWidth}
                        </div>

                        {/* Mini Specs */}
                        <div className="flex items-center gap-[0.5vw] mt-auto pt-[0.4vh] border-t border-slate-100">
                          <div className="text-center flex-1">
                            <div className="text-[clamp(0.3rem,0.5vw,0.4rem)] text-slate-400 uppercase font-bold">
                              Speed
                            </div>
                            <div className="text-[clamp(0.5rem,0.8vw,0.75rem)] font-bold text-slate-700">
                              {product.speed}
                            </div>
                          </div>
                          <div className="w-px h-[1.5vh] bg-slate-200" />
                          <div className="text-center flex-1">
                            <div className="text-[clamp(0.3rem,0.5vw,0.4rem)] text-slate-400 uppercase font-bold">
                              Cycles
                            </div>
                            <div className="text-[clamp(0.5rem,0.8vw,0.75rem)] font-bold text-slate-700">
                              {product.cycles}
                            </div>
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

        {/* ERGOPACK GO - Viewport-based Banner */}
        <section className="w-full bg-white border-t border-slate-200 py-[2vh]">
          <div className="container-full px-[1.5vw] mx-auto">
            <Link href="/products/go" className="block group">
              <div className="w-full bg-blue-600 rounded-[clamp(0.5rem,1vw,1rem)] overflow-hidden text-white relative h-[20vh] shadow-xl group-hover:shadow-2xl transition-all">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent z-10" />

                <div className="relative z-20 h-full flex items-center">
                  <div className="p-[2vw] w-2/3 md:w-1/2">
                    <div className="inline-block bg-white/20 backdrop-blur-md px-[0.8vw] py-[0.3vh] rounded-full text-[clamp(0.4rem,0.7vw,0.625rem)] font-bold uppercase tracking-wider mb-[0.5vh]">
                      Portable
                    </div>
                    <h2 className="text-[clamp(1rem,2.5vw,2rem)] font-bold mb-[0.3vh]">
                      ErgoPack GO
                    </h2>
                    <p className="text-[clamp(0.5rem,1vw,0.875rem)] text-blue-100 mb-[0.5vh] max-w-sm hidden lg:block">
                      The ultimate portable strapping solution.
                    </p>
                    <div className="flex items-center gap-[0.5vw] text-[clamp(0.5rem,1vw,0.875rem)] font-bold group-hover:gap-[0.8vw] transition-all">
                      <span>Discover</span>
                      <ArrowRight className="w-[clamp(0.75rem,1.2vw,1rem)] h-[clamp(0.75rem,1.2vw,1rem)]" />
                    </div>
                  </div>

                  <div className="w-1/3 md:w-1/2 h-full relative">
                    <Image
                      src={ergoPackGO.images.hero}
                      alt="ErgoPack GO"
                      fill
                      className="object-contain p-[1vw] group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
