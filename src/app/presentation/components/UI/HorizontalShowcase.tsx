'use client';

import { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// =====================================================
// HORIZONTAL PRODUCT SHOWCASE
// =====================================================
// Keeps user pinned while they swipe sideways to compare
// Model 700 vs GO vs 726X Li
// Dense, table-like data structure

interface ProductData {
  id: string;
  model: string;
  tagline: string;
  color: string;
  features: { label: string; value: string }[];
  description: string;
}

const PRODUCTS: ProductData[] = [
  {
    id: '700',
    model: 'Model 700',
    tagline: 'The Legendary Standard',
    color: '#C8102E',
    description: 'The world’s most widely used ergonomic strapping system. Pure manual efficiency.',
    features: [
      { label: 'Operation', value: 'Manual Hand Crank' },
      { label: 'Tension Force', value: 'Up to 2500 N' },
      { label: 'Battery', value: 'None (Mechanical)' },
      { label: 'Pallet Height', value: 'Max 2.30m' },
      { label: 'Weight', value: '88 kg' },
    ],
  },
  {
    id: 'go',
    model: 'Model GO',
    tagline: 'Economy & Speed',
    color: '#4A90D9',
    description: 'Perfect entry-level solution. Lightweight, battery-assisted, and cost-effective.',
    features: [
      { label: 'Operation', value: 'Semi-Automatic' },
      { label: 'Tension Force', value: 'Electric Tensioning (Variable)' },
      { label: 'Battery', value: 'Li-Ion 18V' },
      { label: 'Pallet Height', value: 'Max 2.00m' },
      { label: 'Weight', value: '65 kg (Lightweight)' },
    ],
  },
  {
    id: '726x',
    model: 'Model 726X Li',
    tagline: 'The Ultimate Flagship',
    color: '#C8102E',
    description: 'Maximum power, touchscreen interface, and full automated tensioning cycles.',
    features: [
      { label: 'Operation', value: 'Fully Automatic' },
      { label: 'Tension Force', value: 'Max 4000 N (Heavy Duty)' },
      { label: 'Battery', value: 'Adv. Li-Ion 24V' },
      { label: 'Pallet Height', value: 'Max 3.00m' },
      { label: 'Interface', value: 'Touchscreen Control' },
    ],
  },
];

export function HorizontalShowcase({
  active,
  onSelect,
}: {
  active: boolean;
  onSelect: (id: string) => void;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % PRODUCTS.length);
    onSelect(PRODUCTS[(currentIndex + 1) % PRODUCTS.length].id);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + PRODUCTS.length) % PRODUCTS.length);
    onSelect(PRODUCTS[(currentIndex - 1 + PRODUCTS.length) % PRODUCTS.length].id);
  };

  if (!active) return null;

  const currentProduct = PRODUCTS[currentIndex];

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
      <div className="w-full max-w-4xl px-4 pointer-events-auto">
        {/* --- Main Card Container --- */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          className="relative bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/50"
        >
          {/* Header Strip */}
          <div className="h-2 w-full" style={{ backgroundColor: currentProduct.color }} />

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* --- LEFT: Visual / Title --- */}
            <div className="p-8 md:p-12 flex flex-col justify-center bg-gradient-to-br from-gray-50 to-gray-100">
              <motion.div
                key={currentProduct.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <span className="text-sm font-bold tracking-widest uppercase text-gray-400">
                  ErgoPack Series
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-4">
                  {currentProduct.model}
                </h2>
                <p className="text-lg font-medium mb-6" style={{ color: currentProduct.color }}>
                  {currentProduct.tagline}
                </p>
                <p className="text-gray-600 leading-relaxed">{currentProduct.description}</p>
              </motion.div>

              {/* Navigation Controls */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={prevSlide}
                  className="p-3 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
                >
                  ← Prev
                </button>
                <button
                  onClick={nextSlide}
                  className="p-3 rounded-full bg-gray-900 text-white shadow-md hover:bg-black transition-colors"
                >
                  Next Model →
                </button>
              </div>
            </div>

            {/* --- RIGHT: Dense Specs Table --- */}
            <div className="p-8 md:p-12 bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-6 border-b pb-2">
                Technical Specifications
              </h3>

              <div className="space-y-4">
                <AnimatePresence mode="wait">
                  {currentProduct.features.map((feature, i) => (
                    <motion.div
                      key={`${currentProduct.id}-${i}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
                    >
                      <span className="text-gray-500 font-medium text-sm">{feature.label}</span>
                      <span className="text-gray-900 font-bold text-base text-right">
                        {feature.value}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <div className="mt-8 p-4 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                <p className="text-xs text-gray-500 text-center">
                  * Swipe to compare models. All specifications subject to change.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
