'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Award, Globe, ShieldCheck, Headphones } from 'lucide-react';

export default function VideoHeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Main Hero Video - Go Model (ErgoPack RE) */}
      <div className="absolute inset-0 z-0">
        <video autoPlay loop muted playsInline className="w-full h-full object-cover opacity-90">
          <source src="/videos/mobile.mp4" type="video/mp4" media="(max-width: 768px)" />
          <source src="/videos/ErgoPack_RE.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />
      </div>

      {/* Center Title - REMOVED because ScrollHeader.tsx handles the main title transition */}

      {/* Bottom Left Content - The Premium Detail */}
      <div className="absolute bottom-12 left-0 z-20 w-full px-8 md:px-16 pointer-events-none">
        <div className="max-w-[1800px] mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="w-full grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 border-t border-white/10 pt-8 backdrop-blur-sm"
          >
            {[
              { title: 'German Engineering', subtitle: 'Precision Crafted', icon: 'Award' },
              { title: 'Global Leader', subtitle: '55+ Countries', icon: 'Globe' },
              {
                title: 'Patented Technology',
                subtitle: 'Ergonomic Excellence',
                icon: 'ShieldCheck',
              },
              { title: 'Premium Support', subtitle: '24/7 Assistance', icon: 'Headphones' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-4 group">
                <div className="p-3 rounded-full bg-white/5 border border-white/10 group-hover:border-ergopack/50 transition-colors duration-500">
                  {item.icon === 'Award' && (
                    <Award className="w-6 h-6 text-ergopack" strokeWidth={1.5} />
                  )}
                  {item.icon === 'Globe' && (
                    <Globe className="w-6 h-6 text-ergopack" strokeWidth={1.5} />
                  )}
                  {item.icon === 'ShieldCheck' && (
                    <ShieldCheck className="w-6 h-6 text-ergopack" strokeWidth={1.5} />
                  )}
                  {item.icon === 'Headphones' && (
                    <Headphones className="w-6 h-6 text-ergopack" strokeWidth={1.5} />
                  )}
                </div>
                <div>
                  <h3 className="text-white font-serif text-lg tracking-wide">{item.title}</h3>
                  <p className="text-white/60 text-xs uppercase tracking-widest">{item.subtitle}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
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
