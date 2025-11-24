'use client';

import { motion } from 'framer-motion';

export default function PhilosophySection() {
  return (
    <section className="py-40 bg-artisan-white relative overflow-hidden">
      <div className="max-w-[1800px] mx-auto px-8 sm:px-12 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-serif text-7xl sm:text-8xl lg:text-9xl text-artisan-black leading-[0.9] mb-12">
            Crafted for <br />
            <span className="italic text-artisan-gold">Perfection.</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-8"
        >
          <p className="text-2xl font-light text-artisan-charcoal leading-relaxed max-w-xl">
            In a world of approximation, we choose precision. ErgoPack is not just a tool; it is a
            statement of uncompromising quality.
          </p>
          <div className="h-[1px] w-24 bg-artisan-gold" />
          <p className="text-lg font-light text-gray-500 leading-relaxed max-w-xl">
            German engineering meets ergonomic excellence. Every curve, every mechanism is designed
            to transform the mundane task of strapping into a seamless, dignified operation.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
