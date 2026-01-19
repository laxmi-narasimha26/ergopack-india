'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { pgPresentationData } from '@/data/pg-presentation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import SmartImage from '@/components/media/SmartImage';

// Premium slide intro component with Awwwards-level design
const PremiumIntroSlide = ({ onNext, slide }: { onNext: () => void; slide: any }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for parallax
  const springConfig = { damping: 25, stiffness: 150 };
  const machineX = useSpring(useTransform(mouseX, [-500, 500], [15, -15]), springConfig);
  const machineY = useSpring(useTransform(mouseY, [-300, 300], [10, -10]), springConfig);
  const logoX = useSpring(useTransform(mouseX, [-500, 500], [-8, 8]), springConfig);
  const logoY = useSpring(useTransform(mouseY, [-300, 300], [-5, 5]), springConfig);

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)',
      }}
    >
      {/* Subtle animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            x: [0, 100, 0],
            y: [0, 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[30%] -left-[20%] w-[60%] h-[60%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0,91,166,0.15) 0%, transparent 70%)',
          }}
        />
        <motion.div
          animate={{
            x: [0, -80, 0],
            y: [0, -40, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
          className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(255,102,0,0.12) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <div className="container mx-auto px-8 md:px-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Typography & Logos */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={isLoaded ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-left"
            style={{ x: logoX, y: logoY }}
          >
            {/* Partnership Logos */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex items-center gap-6 mb-12"
            >
              {/* P&G Logo - Clean white on dark */}
              <div className="relative">
                <SmartImage
                  src="/images/presentation/pg_logo.png"
                  alt="Procter & Gamble"
                  width={240}
                  height={120}
                  className="h-16 md:h-20 w-auto object-contain brightness-0 invert opacity-95"
                />
              </div>

              {/* Elegant divider */}
              <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/30 to-transparent" />

              {/* ErgoPack Logo */}
              <div className="relative">
                <SmartImage
                  src="/images/presentation/ergopack_logo.svg"
                  alt="ErgoPack"
                  width={200}
                  height={80}
                  className="h-12 md:h-16 w-auto object-contain brightness-0 invert opacity-95"
                />
              </div>
            </motion.div>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-blue-400 text-sm md:text-base tracking-[0.4em] uppercase mb-6 font-light"
            >
              Strategic Innovation Partnership
            </motion.p>

            {/* Main Headline - Apple-style massive typography */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-[0.9] mb-8"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              The
              <br />
              Alliance
            </motion.h1>

            {/* Subtext */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isLoaded ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.3 }}
              className="text-white/50 text-lg md:text-xl max-w-md leading-relaxed font-light"
              style={{ fontFamily: 'var(--font-proza), system-ui, sans-serif' }}
            >
              When the load is shared with ErgoPack,
              <br />
              <span className="text-white/80">strength is no longer required.</span>
            </motion.p>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={isLoaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.5 }}
              onClick={onNext}
              className="mt-12 group flex items-center gap-4 text-white/80 hover:text-white transition-colors"
            >
              <span className="text-sm tracking-widest uppercase">Begin Journey</span>
              <motion.div
                whileHover={{ x: 5 }}
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-white/60 group-hover:bg-white/5 transition-all"
              >
                <ArrowRight size={18} />
              </motion.div>
            </motion.button>
          </motion.div>

          {/* Right: Product Image with parallax */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isLoaded ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center"
            style={{ x: machineX, y: machineY }}
          >
            {/* Glow effect behind machine */}
            <div
              className="absolute w-[120%] h-[120%] rounded-full blur-3xl"
              style={{
                background: 'radial-gradient(circle, rgba(255,102,0,0.15) 0%, transparent 60%)',
              }}
            />

            {/* Real ErgoPack 726X Machine */}
            <motion.div
              className="relative z-10 w-full max-w-[600px] h-auto object-contain drop-shadow-2xl"
              initial={{ y: 30 }}
              animate={{ y: [0, -10, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <SmartImage
                src="/images/presentation/ergopack_726x_real.png"
                alt="ErgoPack 726X Mobile Strapping Machine"
                width={1200}
                height={800}
                className="w-full h-auto object-contain"
              />
            </motion.div>

            {/* Floating specs badge */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isLoaded ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.8 }}
              className="absolute bottom-[15%] right-[5%] bg-black/60 backdrop-blur-lg border border-white/10 rounded-2xl px-6 py-4 text-white"
            >
              <p className="text-xs text-white/50 uppercase tracking-wider mb-1">Model Series</p>
              <p className="text-2xl font-bold tracking-tight">726X-LI</p>
              <p className="text-xs text-orange-400 mt-1">X-pert Line</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/50 to-transparent" />

      {/* Slide indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isLoaded ? { opacity: 1 } : {}}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-8 text-white/30 text-sm tracking-widest"
      >
        01 / 20
      </motion.div>
    </div>
  );
};

export default function PGPresentationDeck() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slides = pgPresentationData;

  const nextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex > 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlideIndex]);

  const currentSlide = slides[currentSlideIndex];

  // Render Premium Intro for slide 1
  if (currentSlide.type === 'intro' && currentSlideIndex === 0) {
    return <PremiumIntroSlide slide={currentSlide} onNext={nextSlide} />;
  }

  return (
    <div className="w-full h-screen bg-black text-white overflow-hidden relative font-sans">
      {/* Background Image with Transition */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide.image}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 z-0"
        >
          <SmartImage
            src={currentSlide.image}
            alt={currentSlide.title}
            fill
            sizes="100vw"
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content Layer */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-12 md:p-24">
        {/* Header / Logo Area */}
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold tracking-wider text-blue-400">
            ERGOPACK <span className="text-white">INDIA</span>
          </div>
          <div className="text-sm text-gray-400">P&G STRATEGIC PARTNERSHIP</div>
        </div>

        {/* Main Content Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.id}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -50, opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl"
          >
            {currentSlide.subtitle && (
              <h3 className="text-blue-400 text-xl md:text-2xl font-medium mb-4 uppercase tracking-widest">
                {currentSlide.subtitle}
              </h3>
            )}

            <h1
              className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                background: 'linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.7) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {currentSlide.title}
            </h1>

            <div className="w-24 h-1 bg-blue-500 mb-8" />

            <p
              className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-2xl border-l-4 border-white/20 pl-6"
              style={{ fontFamily: 'var(--font-proza), system-ui, sans-serif' }}
            >
              {currentSlide.content}
            </p>

            {currentSlide.tagline && (
              <div className="mt-12 inline-block bg-white/10 backdrop-blur-md px-8 py-4 rounded-lg border border-white/20">
                <p className="text-xl italic font-serif text-white">
                  &quot;{currentSlide.tagline}&quot;
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Footer / Controls */}
        <div className="flex justify-between items-end">
          <div className="text-sm text-gray-500">
            SLIDE {currentSlideIndex + 1} / {slides.length}
          </div>

          <div className="flex gap-4">
            <button
              onClick={prevSlide}
              disabled={currentSlideIndex === 0}
              className="p-4 rounded-full bg-white/10 hover:bg-white/20 transition-all disabled:opacity-30 backdrop-blur-sm"
            >
              <ArrowLeft size={24} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentSlideIndex === slides.length - 1}
              className="p-4 rounded-full bg-blue-600 hover:bg-blue-500 transition-all disabled:opacity-30 shadow-lg shadow-blue-900/50"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 h-1 bg-blue-900 w-full">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${((currentSlideIndex + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  );
}
