'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Battery, ArrowRight, Scale } from 'lucide-react';
import { ComprehensiveProduct } from '@/data/comprehensive-products';
import { useComparison } from '@/contexts/ComparisonContext';

interface HorizontalProductCardProps {
  product: ComprehensiveProduct;
  index: number;
  theme?: 'dark' | 'light';
}

export const HorizontalProductCard: React.FC<HorizontalProductCardProps> = ({
  product,
  index,
  theme = 'light',
}) => {
  const { addProduct, removeProduct, isSelected } = useComparison();
  const selected = isSelected(product.id);
  const isLithium = product.battery?.type === 'Lithium-Ion';

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (selected) {
      removeProduct(product.id);
    } else {
      addProduct(product.id);
    }
  };

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-white/5 border-white/10' : 'bg-white border-gray-200';
  const textClass = isDark ? 'text-white' : 'text-gray-900';
  const subtextClass = isDark ? 'text-gray-400' : 'text-gray-600';
  const badgeClass = isDark
    ? 'bg-crimson-500/10 text-crimson-400 border-crimson-500/20'
    : 'bg-red-50 text-red-600 border-red-200';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="h-full"
    >
      <div
        className={`relative group h-full flex flex-col border rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${bgClass}`}
      >
        {/* New Badge */}
        {isLithium && (
          <div className="absolute top-4 right-4 z-10">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeClass} flex items-center gap-1`}
            >
              <Battery className="w-3 h-3" />
              Li-Ion
            </span>
          </div>
        )}

        {/* Compare Button */}
        <button
          onClick={toggleCompare}
          className={`absolute top-4 left-4 z-10 p-2 rounded-full transition-all duration-300 ${
            selected
              ? 'bg-red-600 text-white shadow-lg'
              : isDark
                ? 'bg-white/10 text-white hover:bg-white/20'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
          aria-label={selected ? 'Remove from comparison' : 'Add to comparison'}
        >
          <Scale className="w-4 h-4" />
        </button>

        {/* Product Image */}
        <Link href={`/products/${product.id.toLowerCase()}`} className="flex-1 flex flex-col">
          <div
            className={`relative h-64 flex items-center justify-center p-10 ${isDark ? 'bg-gradient-to-br from-white/5 to-transparent' : 'bg-gradient-to-br from-gray-50 to-white'}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_70%)]" />
            <Image
              src={product.images.hero}
              alt={product.name}
              width={400}
              height={400}
              className="object-contain max-h-full w-auto relative z-10 group-hover:scale-105 transition-transform duration-500"
            />
          </div>

          {/* Content */}
          <div className="p-8 flex flex-col flex-1">
            {/* Tagline */}
            <div className={`text-xs uppercase tracking-wider mb-2 font-medium ${subtextClass}`}>
              {product.tagline}
            </div>

            {/* Model Name */}
            <h3 className={`text-2xl font-serif font-bold mb-3 ${textClass}`}>{product.name}</h3>

            {/* Description */}
            <p className={`text-sm mb-6 line-clamp-2 ${subtextClass} flex-1`}>
              {product.description}
            </p>

            {/* Key Specs Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className={`text-xs uppercase tracking-wider mb-1 ${subtextClass}`}>Speed</div>
                <div className={`text-lg font-bold ${textClass}`}>
                  {product.specifications.chainSpeed}
                </div>
              </div>
              <div className={`p-3 rounded-xl ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}>
                <div className={`text-xs uppercase tracking-wider mb-1 ${subtextClass}`}>
                  Battery
                </div>
                <div className={`text-lg font-bold ${textClass} truncate`}>
                  {product.battery?.type?.split(' ')[0] || 'Manual'}
                </div>
              </div>
            </div>

            {/* CTA Button */}
            <div
              className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 w-full ${
                isDark
                  ? 'bg-crimson-600 text-white hover:bg-crimson-700'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              <span>Learn More</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};
