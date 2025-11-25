'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ComprehensiveProduct } from '@/data/comprehensive-products';
import { HorizontalProductCard } from './HorizontalProductCard';
import MainLayout from '@/components/layout/MainLayout';
import { ProductNavigation } from './ProductNavigation';

interface SeriesPageProps {
  series: string;
  products: ComprehensiveProduct[];
}

export const SeriesPage: React.FC<SeriesPageProps> = ({ series, products }) => {
  return (
    <MainLayout>
      <div className="min-h-screen bg-background">
        <ProductNavigation />

        <div className="container mx-auto px-6 py-12 md:py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
              ErgoPack {series} Series
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our complete range of {series} series strapping systems, designed for
              efficiency and ergonomics.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div key={product.id} className="h-[600px]">
                <HorizontalProductCard product={product} index={index} theme="light" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};
