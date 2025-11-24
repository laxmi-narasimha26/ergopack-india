'use client';

import { motion } from 'framer-motion';

export default function SocialProofSection() {
  return (
    <section className="py-32 bg-artisan-black text-white border-t border-white/5">
      <div className="max-w-7xl mx-auto px-8 sm:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { value: '10K+', label: 'Systems Deployed' },
            { value: '55+', label: 'Countries' },
            { value: '100%', label: 'Made in Germany' },
            { value: '24/7', label: 'Global Support' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="font-serif text-4xl sm:text-5xl mb-2 text-white">{stat.value}</div>
              <div className="text-sm uppercase tracking-widest text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
