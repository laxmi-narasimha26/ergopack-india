import React from 'react';
import { motion } from 'framer-motion';
import SmartImage from '@/components/media/SmartImage';

export const IntroSlide = ({ slide, onNext }: { slide: any; onNext: () => void }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#0a192f] via-[#003DA5] to-[#000000] overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 2 }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[url('/images/presentation/grid-pattern.png')] animate-spin-slow opacity-10"
        />
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Main Content Container */}
      <div className="z-10 flex flex-col items-center justify-center space-y-12">
        {/* Logos Container */}
        <div className="flex items-center justify-center gap-12 md:gap-24">
          {/* ErgoPack Logo */}
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.5 }}
            className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl"
          >
            <SmartImage
              src="/images/presentation/ergopack_logo.png"
              alt="ErgoPack"
              width={240}
              height={120}
              className="h-16 md:h-24 w-auto object-contain brightness-110 drop-shadow-lg"
            />
          </motion.div>

          {/* X Separator */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="text-4xl md:text-6xl font-thin text-white/50"
          >
            ×
          </motion.div>

          {/* P&G Logo */}
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.8 }}
            className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl"
          >
            <SmartImage
              src="/images/presentation/pg_logo.png"
              alt="P&G"
              width={240}
              height={120}
              className="h-16 md:h-24 w-auto object-contain"
            />
          </motion.div>
        </div>

        {/* Text Content */}
        <div className="text-center space-y-6 max-w-4xl px-4">
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
          >
            <span className="block text-2xl md:text-3xl font-light text-blue-200 mb-2 tracking-widest uppercase">
              Strategic Partnership
            </span>
            Defining the Future of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Supply Chain Excellence
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2.2 }}
            className="text-xl text-gray-300 font-light tracking-wide"
          >
            ErgoPack India <span className="mx-2 text-blue-400">•</span> Procter & Gamble
          </motion.p>
        </div>

        {/* Start Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
          onClick={onNext}
          className="mt-12 px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white tracking-widest uppercase text-sm transition-all duration-300 backdrop-blur-sm group"
        >
          Begin Presentation
          <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
            →
          </span>
        </motion.button>
      </div>

      {/* Decorative Gradient Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />
    </div>
  );
};
