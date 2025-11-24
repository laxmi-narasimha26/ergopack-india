'use client';

import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { ParallaxProductCard } from '@/components/ui/ParallaxProductCard';
import { motion } from 'framer-motion';

export default function DemoVisualsPage() {
  const products = [
    {
      id: '700',
      title: 'ErgoPack 700',
      subtitle: 'Universal System',
      image: '/images/products/700.png',
    },
    {
      id: '700x',
      title: 'ErgoPack 700X',
      subtitle: 'X-pert Line',
      image: '/images/products/700x.png',
    },
    {
      id: '726e',
      title: 'ErgoPack 726E',
      subtitle: 'E-conomy Line',
      image: '/images/products/726e.png',
    },
    {
      id: '726x',
      title: 'ErgoPack 726X',
      subtitle: 'Heavy Duty',
      image: '/images/products/726x.png',
    },
  ];

  return (
    <MainLayout>
      <section className="min-h-screen bg-luxury-off-white py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <p className="text-sm uppercase tracking-[0.3em] text-crimson-600 mb-6 font-medium">
              Visual Innovation
            </p>
            <h1 className="font-serif text-5xl sm:text-6xl font-bold text-luxury-dark-gray mb-8">
              Interactive 2.5D Visualization
            </h1>
            <p className="text-xl text-platinum-600 max-w-2xl mx-auto font-light">
              Experience depth and dimension. While not fully 3D, these interactive cards create a
              premium tactile feel using your existing imagery.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
              >
                <ParallaxProductCard
                  imageSrc={product.image}
                  title={product.title}
                  subtitle={product.subtitle}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
