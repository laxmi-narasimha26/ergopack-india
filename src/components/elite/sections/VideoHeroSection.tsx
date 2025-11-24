'use client';

import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function VideoHeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Main Hero Video - Go Model (ErgoPack RE) */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90">
          <source src="/videos/ErgoPack_RE.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Center Title - REMOVED because ScrollHeader.tsx handles the main title transition */}

      {/* Bottom Left Content - The Premium Detail */}
      <div className="relative z-20 h-full flex flex-col justify-end pb-24 px-8 md:px-16 max-w-[1800px] mx-auto w-full pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="max-w-xl text-left"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] w-12 bg-artisan-gold" />
            <span className="text-xs md:text-sm uppercase tracking-[0.3em] text-white/80 font-medium">
              The Future of Strapping
            </span>
          </div>

          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed border-l border-white/20 pl-6 backdrop-blur-sm bg-black/10 py-2 pr-4 rounded-r-lg">
            Experience the next generation of ergonomic mobile pallet strapping systems.
          </p>
        </motion.div>
      </div>

      {/* Scroll Indicator - Bottom Right */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 right-12 flex items-center gap-4 z-20"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 text-right hidden md:block">
          Scroll to Explore
        </span>
        <div className="w-[1px] h-12 bg-white/20" />
      </motion.div>
    </section>
  );
}
