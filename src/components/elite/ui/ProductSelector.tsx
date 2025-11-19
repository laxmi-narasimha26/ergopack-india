'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X, Zap, DollarSign, Truck, Package } from 'lucide-react';
import productsData from '@/../../products-data.json';

interface ProductSelectorProps {
  onSelect: (productKey: string) => void;
  onClose: () => void;
}

export default function ProductSelector({ onSelect, onClose }: ProductSelectorProps) {
  const allProducts = Object.entries(productsData.products).map(([key, product]) => ({
    key,
    ...product,
  }));

  const productsByLine = {
    'X-pert Line': allProducts.filter(p => p.line === 'X-pert Line'),
    'Economy Line': allProducts.filter(p => p.line === 'Economy Line'),
    'RE Line - Mobile Retracting': allProducts.filter(p => p.line === 'RE Line - Mobile Retracting'),
    'GO Line - Economy Portable': allProducts.filter(p => p.line === 'GO Line - Economy Portable'),
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-theme-primary/90 backdrop-blur-xl cursor-auto"
      onClick={onClose}
      style={{ cursor: 'auto' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-7xl w-full mx-4 max-h-[85vh] overflow-y-auto bg-gradient-to-br from-theme-secondary via-theme-primary to-theme-secondary rounded-3xl border border-[#C8102E]/30 shadow-2xl cursor-auto"
        style={{ cursor: 'auto' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors group cursor-pointer"
          style={{ cursor: 'pointer' }}
        >
          <X className="h-6 w-6 text-theme-primary group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Header */}
        <div className="text-center pt-16 pb-12 px-8 border-b border-white/10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              <span className="text-theme-primary">SELECT YOUR</span>
              <br />
              <span className="text-[#C8102E]">MACHINE</span>
            </h2>
            <p className="text-base sm:text-lg text-theme-secondary max-w-2xl mx-auto font-light">
              Choose a model to see its complete specifications, features, and capabilities in stunning detail
            </p>
          </motion.div>
        </div>

        {/* Products Grid */}
        <div className="p-8 sm:p-12 space-y-12">
          {Object.entries(productsByLine).map(([lineName, products], lineIndex) => {
            if (products.length === 0) return null;

            const isXpert = lineName === 'X-pert Line';

            return (
              <motion.div
                key={lineName}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: lineIndex * 0.1 + 0.2 }}
              >
                {/* Line Header */}
                <div className="flex items-center gap-4 mb-6">
                  {isXpert ? (
                    <Zap className="h-8 w-8 text-[#C8102E]" />
                  ) : lineName.includes('RE Line') ? (
                    <Truck className="h-8 w-8 text-theme-secondary" />
                  ) : lineName.includes('GO Line') ? (
                    <Package className="h-8 w-8 text-theme-secondary" />
                  ) : (
                    <DollarSign className="h-8 w-8 text-theme-secondary" />
                  )}
                  <h3 className={`text-3xl font-bold ${isXpert ? 'text-[#C8102E]' : 'text-theme-primary'}`}>
                    {lineName}
                  </h3>
                </div>

                {/* Products */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {products.map((product, index) => {
                    const isLithium = product.battery?.type === 'Lithium-Ion';

                    return (
                      <motion.button
                        key={product.key}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: lineIndex * 0.1 + index * 0.05 + 0.3 }}
                        whileHover={{ scale: 1.05, y: -8 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => onSelect(product.key)}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 group cursor-pointer ${
                          isXpert
                            ? 'bg-gradient-to-br from-[#C8102E]/20 to-red-900/20 border-[#C8102E]/50 hover:border-[#C8102E] hover:shadow-2xl hover:shadow-[#C8102E]/30'
                            : 'bg-white/5 border-white/10 hover:border-white/30 hover:bg-white/10'
                        }`}
                        style={{ cursor: 'pointer' }}
                      >
                        {/* Model Badge */}
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                          isXpert
                            ? 'bg-[#C8102E]/30 text-[#FFB81C]'
                            : 'bg-white/10 text-theme-secondary'
                        }`}>
                          {product.applicationType}
                        </div>

                        {/* Model Name */}
                        <h4 className={`text-2xl sm:text-3xl font-black mb-2 ${
                          isXpert ? 'text-theme-primary' : 'text-theme-primary'
                        }`}>
                          {product.model}
                        </h4>

                        {/* Full Name */}
                        <p className="text-sm text-theme-secondary mb-4 font-light">
                          {product.fullName}
                        </p>

                        {/* Key Specs */}
                        <div className="space-y-2 text-xs text-left">
                          {product.sealingHead?.tensionPower && (
                            <div className="flex justify-between">
                              <span className="text-theme-secondary">Max Tension:</span>
                              <span className="text-theme-primary font-medium">
                                {product.sealingHead.tensionPower.max} {product.sealingHead.tensionPower.unit}
                              </span>
                            </div>
                          )}
                          {product.performance?.chainSpeed && (
                            <div className="flex justify-between">
                              <span className="text-theme-secondary">Speed:</span>
                              <span className="text-theme-primary font-medium">
                                {product.performance.chainSpeed} {product.performance.chainSpeedUnit || 'm/min'}
                              </span>
                            </div>
                          )}
                          {product.battery?.type && product.battery.type !== 'None - Manual Operation' && (
                            <div className="flex justify-between">
                              <span className="text-theme-secondary">Battery:</span>
                              <span className={`font-medium ${isLithium ? 'text-amber-400' : 'text-theme-primary'}`}>
                                {isLithium ? 'Li-Ion' : 'Lead'}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Hover Arrow */}
                        <div className={`absolute bottom-4 right-4 transition-all duration-300 ${
                          isXpert ? 'text-[#FFB81C]' : 'text-theme-primary'
                        } opacity-0 group-hover:opacity-100 group-hover:translate-x-1`}>
                          ↘
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center py-8 px-8 border-t border-white/10">
          <p className="text-theme-secondary text-sm">
            Click on any model to explore its complete specifications in the Elite presentation
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
