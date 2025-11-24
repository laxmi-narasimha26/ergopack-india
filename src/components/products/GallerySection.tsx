'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export const GallerySection: React.FC = () => {
  const images = [
    '/images/products/700.png', // Placeholder - ideally these would be lifestyle/application shots
    '/images/products/726x.png',
    '/images/products/745e.png',
  ];

  return (
    <section className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-xs font-artisan-sans tracking-widest-artisan uppercase text-accent mb-4 block">
            In Action
          </span>
          <h2 className="text-4xl font-artisan-serif text-foreground">Gallery</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8 h-[80vh] lg:h-[600px]">
          {/* Large Main Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="md:col-span-2 lg:col-span-2 row-span-2 relative overflow-hidden rounded-sm group"
          >
            <Image
              src={images[0]}
              alt="ErgoPack Application"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          </motion.div>

          {/* Secondary Images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative overflow-hidden rounded-sm group"
          >
            <Image
              src={images[1]}
              alt="ErgoPack Detail"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative overflow-hidden rounded-sm group"
          >
            <Image
              src={images[2]}
              alt="ErgoPack Detail"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
