'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Award, Globe, ShieldCheck, Headphones, ArrowRight, ChevronDown } from 'lucide-react';

export default function ImageHeroSection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-machine.png"
          alt="ErgoPack Premium Strapping System"
          fill
          priority
          className="object-cover object-center"
          quality={80}
        />
        {/* Gradient Overlays for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30" />
      </div>

      {/* Main Content - Adjusted padding for mobile */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 pb-48 md:pb-48">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-[#C8102E]/20 border border-[#C8102E]/30 mb-4 md:mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8102E] animate-pulse" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] text-[#C8102E] font-semibold">
              German Engineering Excellence
            </span>
          </motion.div>

          {/* Headline - Smaller on mobile */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white leading-[0.95] mb-4 md:mb-6"
          >
            Verifiable
            <br />
            <span className="text-[#C8102E]">Load Integrity</span>
          </motion.h1>

          {/* Subtitle - Smaller on mobile */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-base md:text-xl lg:text-2xl text-white/70 max-w-xl mb-6 md:mb-10 leading-relaxed"
          >
            The world&apos;s most advanced ergonomic pallet strapping systems. Trusted by 55+
            countries worldwide.
          </motion.p>

          {/* CTA Buttons - Stack on mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 md:gap-4"
          >
            <Link href="/products" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#C8102E] text-white px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-medium text-base md:text-lg hover:bg-red-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg shadow-red-900/30 hover:shadow-red-900/50 active:scale-[0.98]">
                Explore Products
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white/10 backdrop-blur-sm border border-white/20 text-white px-6 md:px-8 py-3.5 md:py-4 rounded-lg font-medium text-base md:text-lg hover:bg-white/20 transition-all duration-300 active:scale-[0.98]">
                Request Demo
              </button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/40">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-white/40" />
        </motion.div>
      </motion.div>

      {/* Bottom Feature Bar - Visible on all devices, 2x2 on mobile, 4-col on desktop */}
      <div className="absolute bottom-8 md:bottom-24 left-0 z-20 w-full px-6 md:px-16 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="max-w-[1800px] mx-auto w-full"
        >
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-12 border-t border-white/10 pt-6 md:pt-8 backdrop-blur-sm bg-black/30 md:bg-black/20 rounded-t-2xl px-4 md:px-6">
            {[
              { title: 'German Engineering', subtitle: 'Precision Crafted', Icon: Award },
              { title: 'Global Leader', subtitle: '55+ Countries', Icon: Globe },
              { title: 'Patented Technology', subtitle: 'Ergonomic Excellence', Icon: ShieldCheck },
              { title: 'Premium Support', subtitle: '24/7 Assistance', Icon: Headphones },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="flex items-center gap-3 md:gap-4 group"
              >
                <div className="p-2 md:p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-[#C8102E]/50 transition-colors duration-300">
                  <item.Icon className="w-4 h-4 md:w-6 md:h-6 text-[#C8102E]" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white font-serif text-sm md:text-lg tracking-wide">
                    {item.title}
                  </h3>
                  <p className="text-white/60 text-[10px] md:text-xs uppercase tracking-widest">
                    {item.subtitle}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
