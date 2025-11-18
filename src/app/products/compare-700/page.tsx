'use client';

import MainLayout from '@/components/layout/MainLayout';
import ComparisonMatrix from '@/components/products/ComparisonMatrix';
import productsData from '@/../../products-data.json';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function Compare700Page() {
  const products = [
    productsData.products['700'],
    productsData.products['700E'],
    productsData.products['700X']
  ];

  return (
    <MainLayout>
      <div className="bg-luxury-space-black min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          {/* Header */}
          <div className="mb-12">
            <Link href="/products" className="inline-flex items-center gap-2 text-crimson-400 hover:text-crimson-300 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4" />
              Back to All Products
            </Link>

            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="mb-8 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-crimson-500/30 bg-crimson-500/10 backdrop-blur-md"
              >
                <span className="text-sm font-medium text-crimson-400 tracking-wide uppercase">
                  700 Series Comparison
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Complete 700 Series
                <br />
                <span className="bg-gradient-to-r from-amber-400 to-crimson-500 bg-clip-text text-transparent">
                  Manual • Economy • X-pert
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-platinum-300 max-w-3xl mx-auto"
              >
                Compare all three 700 Series models: manual hand-crank, battery-powered Economy Line, and advanced X-pert Line with Lithium-Ion technology.
              </motion.p>
            </div>
          </div>

          {/* Key Differences Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
          >
            <div className="premium-card-dark p-6 text-center">
              <div className="text-3xl font-serif font-bold bg-gradient-to-r from-slate-400 to-slate-300 bg-clip-text text-transparent mb-2">
                700 Manual
              </div>
              <div className="text-platinum-400 text-sm">
                Hand-crank operation, no battery needed
              </div>
            </div>
            <div className="premium-card-dark p-6 text-center">
              <div className="text-3xl font-serif font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent mb-2">
                700E Economy
              </div>
              <div className="text-platinum-400 text-sm">
                Lead-fleece battery, 40 m/min speed
              </div>
            </div>
            <div className="premium-card-dark p-6 text-center">
              <div className="text-3xl font-serif font-bold bg-gradient-to-r from-amber-400 to-crimson-500 bg-clip-text text-transparent mb-2">
                700X X-pert
              </div>
              <div className="text-platinum-400 text-sm">
                Li-Ion battery, 66 m/min speed, 1200 cycles
              </div>
            </div>
          </motion.div>

          {/* Comparison Matrix */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <ComparisonMatrix products={products} highlightDifferences={true} />
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}
