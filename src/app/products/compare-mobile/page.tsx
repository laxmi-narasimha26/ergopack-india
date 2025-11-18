'use client';

import MainLayout from '@/components/layout/MainLayout';
import ComparisonMatrix from '@/components/products/ComparisonMatrix';
import productsData from '@/../../products-data.json';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function CompareMobilePage() {
  const products = [productsData.products['RE'], productsData.products['GO']];

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
                  Mobile Systems Comparison
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
              >
                Portable Power
                <br />
                <span className="bg-gradient-to-r from-amber-400 to-crimson-500 bg-clip-text text-transparent">
                  RE vs GO
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="text-xl text-platinum-300 max-w-3xl mx-auto"
              >
                Compare our mobile strapping solutions: RE for automatic retracting applications and GO for portable, multi-material strapping. Perfect for on-the-go operations.
              </motion.p>
            </div>
          </div>

          {/* Key Differences Highlight */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
          >
            <div className="premium-card-dark p-6">
              <div className="text-3xl font-serif font-bold bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent mb-3">
                RE Mobile
              </div>
              <ul className="text-platinum-400 text-sm space-y-2">
                <li>• Automatic retracting mechanism</li>
                <li>• Li-Ion battery technology</li>
                <li>• 1200 battery cycles</li>
                <li>• Quick 3.5-hour charging</li>
                <li>• Ideal for repetitive applications</li>
              </ul>
            </div>
            <div className="premium-card-dark p-6">
              <div className="text-3xl font-serif font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-3">
                GO Portable
              </div>
              <ul className="text-platinum-400 text-sm space-y-2">
                <li>• Multi-material capability</li>
                <li>• Li-Ion battery technology</li>
                <li>• 1200 battery cycles</li>
                <li>• Fast 3.5-hour charging</li>
                <li>• Perfect for diverse strapping needs</li>
              </ul>
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
