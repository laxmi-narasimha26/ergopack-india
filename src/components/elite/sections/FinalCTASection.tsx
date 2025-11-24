'use client';

import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';

export default function FinalCTASection() {
  return (
    <section className="py-40 bg-white text-center">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-serif text-5xl sm:text-7xl text-artisan-black mb-12">
            Experience the <span className="italic text-artisan-gold">Excellence.</span>
          </h2>
          <MagneticButton href="/contact">
            <button className="px-12 py-5 bg-artisan-black text-white rounded-full text-sm uppercase tracking-widest hover:bg-gray-900 transition-colors duration-300">
              Request Private Briefing
            </button>
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  );
}
