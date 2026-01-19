'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Award, Globe, ShieldCheck, Headphones, ArrowDown } from 'lucide-react';

export default function PremiumImageHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax effects
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.3, 0.7]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      {/* Parallax Background Image */}
      <motion.div style={{ y: imageY }} className="absolute inset-0 z-0 w-full h-[120%] -top-[10%]">
        <Image
          src="/images/hero-product.jpg" // Replace with your product image
          alt="ErgoPack Premium Pallet Strapping System"
          fill
          priority
          quality={90}
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Animated Gradient Overlays */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/60 via-black/30 to-black/80"
      />

      {/* Radial gradient for depth */}
      <div className="absolute inset-0 z-10 bg-radial-gradient from-transparent via-black/20 to-black/60" />

      {/* Floating Particles (Optional - Subtle) */}
      <div className="absolute inset-0 z-10 opacity-30">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-20 flex flex-col items-center justify-center h-full px-8 text-center"
      >
        {/* Main Heading - Staggered Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-6xl"
        >
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-ergopack text-sm md:text-base uppercase tracking-[0.3em] mb-6 font-medium"
          >
            Made in Germany
          </motion.p>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white mb-6 leading-tight">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="block"
            >
              Verifiable
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="block bg-gradient-to-r from-white via-ergopack/70 to-white bg-clip-text text-transparent"
            >
              Load Integrity
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="text-white/80 text-lg md:text-2xl font-light max-w-3xl mx-auto leading-relaxed"
          >
            The C-Suite's Control System for Zero-Failure Logistics
          </motion.p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="flex flex-col sm:flex-row gap-4 mt-12"
        >
          <motion.a
            href="/products/xpert-line"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-ergopack text-white rounded-full font-medium hover:bg-ergopack/90 transition-colors"
          >
            Explore X-pert Line
          </motion.a>
          <motion.a
            href="/contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-10 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium border border-white/20 hover:bg-white/20 transition-colors"
          >
            Request Demo
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.5 }}
        className="absolute bottom-32 right-12 items-center gap-4 z-20 hidden md:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 text-right">
          Scroll to Explore
        </span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-[1px] h-12 bg-white/20 relative"
        >
          <div className="absolute bottom-0 w-full h-4 bg-gradient-to-t from-ergopack/60 to-transparent" />
        </motion.div>
      </motion.div>

      {/* Bottom Feature Icons - Same as before */}
      <div className="absolute bottom-8 left-0 z-20 w-full px-8 md:px-16 pointer-events-none">
        <div className="max-w-[1800px] mx-auto w-full">
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/10 pt-8 backdrop-blur-sm">
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
                transition={{ duration: 0.6, delay: 1.4 + index * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-ergopack/50 transition-colors duration-300">
                  <item.Icon className="w-6 h-6 text-ergopack" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-white font-serif text-lg tracking-wide">{item.title}</h3>
                  <p className="text-white/60 text-xs uppercase tracking-widest">{item.subtitle}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
