'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { MagneticButton } from '@/components/ui/MagneticButton';

const essentials = [
  {
    id: 'tool-lift',
    name: 'Tool-Lift',
    description:
      'Ergonomic height adjustment for pallets >80cm. Reduces operator strain significantly.',
    image: '/images/products/745E/5.jpg', // Using existing accessory image
    features: ['Hydraulic Lift', 'Quick Release', 'Ergonomic Design'],
  },
  {
    id: 'sealing-head',
    name: 'Professional Sealing Head',
    description:
      'High-performance sealing with 4000N tension power. Compatible with PP and PET straps.',
    image: '/images/products/745E/6.jpg', // Using existing accessory image
    features: ['4000N Tension', 'PP & PET', 'High Speed'],
  },
  {
    id: 'triplex-tool-lift',
    name: 'Triplex-Tool-Lift',
    description:
      'Advanced lifting for low clearance. Straps pallets as low as 10cm from the floor.',
    image: '/images/products/745E/7.jpg', // Using existing accessory image
    features: ['Low Clearance', 'Versatile', 'Heavy Duty'],
  },
];

export const EssentialsSection = () => {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-30" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-crimson-600" />
            <span className="text-sm font-medium text-gray-600 tracking-wide uppercase">
              System Add-ons
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif"
          >
            ErgoPack Essentials
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 leading-relaxed"
          >
            Enhance your strapping experience with our range of professional accessories, designed
            to maximize efficiency and ergonomics.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {essentials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-gray-50 rounded-3xl overflow-hidden border border-gray-100 hover:border-crimson-100 hover:shadow-2xl hover:shadow-crimson-900/5 transition-all duration-500"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
              </div>

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-crimson-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-gray-600 mb-6 line-clamp-2">{item.description}</p>

                <div className="space-y-3 mb-8">
                  {item.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-3 text-sm text-gray-500">
                      <CheckCircle2 className="w-4 h-4 text-crimson-500" />
                      {feature}
                    </div>
                  ))}
                </div>

                <MagneticButton>
                  <div className="w-full py-4 rounded-xl bg-white border border-gray-200 text-gray-900 font-medium hover:bg-crimson-600 hover:text-white hover:border-crimson-600 transition-all duration-300 flex items-center justify-center gap-2 group/btn cursor-pointer">
                    View Details
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </div>
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
