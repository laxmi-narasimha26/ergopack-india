'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Battery, ArrowRight, Scale, CheckCircle2 } from 'lucide-react';
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
  const isLithium =
    product.battery?.type === 'Lithium-Ion' ||
    product.battery?.type === 'Lithium-Iron-Phosphate (LFP)';

  const toggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
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
      <Link href={`/products/${product.id.toLowerCase()}`} className="block h-full">
        <div
          className={`relative group h-full flex flex-col border rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${bgClass}`}
        >
          {/* Badge */}
          {isLithium && (
            <div className="absolute top-4 right-4 z-10">
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold border ${badgeClass} flex items-center gap-1`}
              >
                <Battery className="w-3 h-3" />
                <span>Lithium-Ion</span>
              </span>
            </div>
          )}

          {/* Image Section */}
          <div className="relative h-64 w-full p-6 flex items-center justify-center bg-gradient-to-b from-transparent to-black/5">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.03),transparent_70%)]" />
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

            {/* Actions */}
            <div className="flex items-center gap-3 mt-auto">
              {/* Learn More Button */}
              <div
                className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  isDark
                    ? 'bg-crimson-600 text-white hover:bg-crimson-700'
                    : 'bg-gray-900 text-white hover:bg-gray-800'
                }`}
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>

              {/* Compare Button */}
              <button
                onClick={toggleCompare}
                className={`px-4 py-3 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 border ${
                  selected
                    ? 'bg-red-600 border-red-600 text-white hover:bg-red-700'
                    : isDark
                      ? 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                      : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
                title={selected ? 'Remove from comparison' : 'Add to compare'}
              >
                {selected ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span className="text-sm">Added</span>
                  </>
                ) : (
                  <>
                    <Scale className="w-5 h-5" />
                    <span className="text-sm">Compare</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
