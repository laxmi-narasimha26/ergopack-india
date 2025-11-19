'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import StandardPreloader from '@/components/ui/StandardPreloader';
import {
  ArrowRight,
  X,
  Plus,
  CheckCircle2,
  Zap,
  DollarSign,
  Battery,
  Gauge,
  Award,
  Shield,
  Package,
  TrendingUp,
  Sparkles,
} from 'lucide-react';
import Link from 'next/link';
import productsData from '@/../../products-data.json';

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [showSelector, setShowSelector] = useState(false);
  const maxSelections = 3;

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

  const handleProductToggle = (productKey: string) => {
    if (selectedProducts.includes(productKey)) {
      setSelectedProducts(selectedProducts.filter(k => k !== productKey));
    } else if (selectedProducts.length < maxSelections) {
      setSelectedProducts([...selectedProducts, productKey]);
    }
  };

  const handleRemove = (productKey: string) => {
    setSelectedProducts(selectedProducts.filter(k => k !== productKey));
  };

  const getProductData = (key: string) => {
    return allProducts.find(p => p.key === key);
  };

  return (
    <>
      <StandardPreloader />
      <MainLayout>
        <div className="bg-gradient-to-b from-white via-crimson-50/20 to-white min-h-screen">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-crimson-50 via-white to-crimson-100/40 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-crimson-500/30 bg-gradient-to-r from-crimson-50/80 to-white/80 backdrop-blur-xl shadow-2xl shadow-crimson-500/10 mb-12">
                  <Gauge className="h-5 w-5 text-crimson-600" />
                  <span className="text-sm font-semibold text-crimson-700 tracking-wide">
                    Side-by-Side Comparison
                  </span>
                </div>

                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-luxury-dark-gray leading-tight mb-6">
                  Compare ErgoPack Models
                </h1>
                <p className="text-lg sm:text-xl text-platinum-600 font-light leading-relaxed max-w-3xl mx-auto mb-8">
                  Select up to {maxSelections} models to compare their specifications, features, and capabilities side by side
                </p>

                {/* Selection Counter */}
                <div className="flex items-center justify-center gap-3 mb-8">
                  {[...Array(maxSelections)].map((_, i) => (
                    <div
                      key={i}
                      className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all ${
                        i < selectedProducts.length
                          ? 'bg-crimson-600 border-crimson-600 text-white'
                          : 'bg-white border-platinum-300 text-platinum-400'
                      }`}
                    >
                      {i < selectedProducts.length ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <span className="text-sm font-bold">{i + 1}</span>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setShowSelector(true)}
                  className="btn-premium group text-lg px-12 py-6"
                >
                  <span className="relative z-10 flex items-center">
                    <Plus className="mr-2 h-6 w-6" />
                    {selectedProducts.length === 0 ? 'Select Products to Compare' : 'Add More Products'}
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />
                  </span>
                </button>
              </motion.div>
            </div>
          </section>

          {/* Selected Products Pills */}
          {selectedProducts.length > 0 && (
            <section className="py-8 bg-white border-b border-platinum-200">
              <div className="max-w-7xl mx-auto px-8 sm:px-12">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="text-sm font-medium text-platinum-600">Comparing:</span>
                  {selectedProducts.map((key) => {
                    const product = getProductData(key);
                    if (!product) return null;
                    const isXpert = product.line === 'X-pert Line';

                    return (
                      <motion.div
                        key={key}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                          isXpert
                            ? 'bg-crimson-500/10 border border-crimson-500/30'
                            : 'bg-platinum-100 border border-platinum-200'
                        }`}
                      >
                        <span className={`font-medium ${isXpert ? 'text-crimson-700' : 'text-platinum-700'}`}>
                          {product.model}
                        </span>
                        <button
                          onClick={() => handleRemove(key)}
                          className="p-1 rounded-full hover:bg-white/50 transition-colors"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Comparison Table */}
          {selectedProducts.length > 0 ? (
            <section className="py-16 bg-gradient-to-b from-white to-crimson-50/20">
              <div className="max-w-7xl mx-auto px-8 sm:px-12">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b-2 border-platinum-200">
                        <th className="px-6 py-6 text-left text-sm font-semibold uppercase tracking-wider text-platinum-600 bg-white sticky left-0 z-10">
                          Specification
                        </th>
                        {selectedProducts.map((key) => {
                          const product = getProductData(key);
                          if (!product) return null;
                          const isXpert = product.line === 'X-pert Line';

                          return (
                            <th
                              key={key}
                              className={`px-6 py-6 text-center min-w-[280px] ${
                                isXpert
                                  ? 'bg-gradient-to-br from-crimson-50 to-red-50'
                                  : 'bg-platinum-50'
                              }`}
                            >
                              <div className="flex flex-col items-center gap-2">
                                {isXpert ? (
                                  <Zap className="h-6 w-6 text-crimson-600" />
                                ) : (
                                  <Package className="h-6 w-6 text-platinum-600" />
                                )}
                                <div className="font-serif text-2xl font-bold text-luxury-dark-gray">
                                  {product.model}
                                </div>
                                <div className={`text-xs font-medium ${isXpert ? 'text-crimson-600' : 'text-platinum-600'}`}>
                                  {product.line}
                                </div>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Model Name */}
                      <ComparisonRow
                        label="Full Name"
                        icon={Award}
                        values={selectedProducts.map(key => {
                          const product = getProductData(key);
                          return product?.fullName || '-';
                        })}
                        selectedProducts={selectedProducts}
                      />

                      {/* Application Type */}
                      <ComparisonRow
                        label="Application"
                        icon={Package}
                        values={selectedProducts.map(key => {
                          const product = getProductData(key);
                          return product?.applicationType || '-';
                        })}
                        selectedProducts={selectedProducts}
                      />

                      {/* Max Tension */}
                      <ComparisonRow
                        label="Max Tension"
                        icon={Gauge}
                        values={selectedProducts.map(key => {
                          const product = getProductData(key);
                          return product?.sealingHead?.tensionPower
                            ? `${product.sealingHead.tensionPower.max} ${product.sealingHead.tensionPower.unit}`
                            : '-';
                        })}
                        selectedProducts={selectedProducts}
                        highlight={true}
                      />

                      {/* Chain Speed */}
                      <ComparisonRow
                        label="Chain Speed"
                        icon={TrendingUp}
                        values={selectedProducts.map(key => {
                          const product = getProductData(key);
                          return product?.performance?.chainSpeed
                            ? `${product.performance.chainSpeed} ${product.performance.chainSpeedUnit || 'm/min'}`
                            : product?.performance?.operationType || '-';
                        })}
                        selectedProducts={selectedProducts}
                      />

                      {/* Battery Type */}
                      <ComparisonRow
                        label="Battery"
                        icon={Battery}
                        values={selectedProducts.map(key => {
                          const product = getProductData(key);
                          return product?.battery?.type || '-';
                        })}
                        selectedProducts={selectedProducts}
                        highlight={true}
                      />

                      {/* System Weight */}
                      <ComparisonRow
                        label="System Weight"
                        icon={Shield}
                        values={selectedProducts.map(key => {
                          const product = getProductData(key);
                          return product?.system?.weight
                            ? `${product.system.weight} ${product.system.weightUnit}`
                            : '-';
                        })}
                        selectedProducts={selectedProducts}
                      />

                      {/* Key Features */}
                      <tr className="border-b border-platinum-200 bg-white">
                        <td className="px-6 py-6 font-semibold text-luxury-dark-gray sticky left-0 z-10 bg-white border-r border-platinum-200">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-platinum-500" />
                            Key Features
                          </div>
                        </td>
                        {selectedProducts.map((key, index) => {
                          const product = getProductData(key);
                          if (!product) return <td key={key}>-</td>;
                          const isXpert = product.line === 'X-pert Line';

                          return (
                            <td
                              key={key}
                              className={`px-6 py-6 ${
                                isXpert ? 'bg-crimson-50/30' : 'bg-white'
                              } ${index < selectedProducts.length - 1 ? 'border-r border-platinum-200' : ''}`}
                            >
                              <div className="space-y-2">
                                {product.includedFeatures?.slice(0, 5).map((feature: string, i: number) => (
                                  <div key={i} className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                                      isXpert ? 'text-crimson-500' : 'text-platinum-600'
                                    }`} />
                                    <span className="text-platinum-700">{feature}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                          );
                        })}
                      </tr>

                      {/* CTA Row */}
                      <tr className="bg-platinum-50">
                        <td className="px-6 py-8 sticky left-0 z-10 bg-platinum-50"></td>
                        {selectedProducts.map((key) => {
                          const product = getProductData(key);
                          if (!product) return null;
                          const slug = key.toLowerCase().replace(/\s+/g, '-');

                          return (
                            <td key={key} className="px-6 py-8 text-center">
                              <Link href={`/products/${slug}`}>
                                <button className="btn-premium text-sm px-8 py-4 w-full">
                                  <span className="relative z-10 flex items-center justify-center">
                                    View Details
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                  </span>
                                </button>
                              </Link>
                            </td>
                          );
                        })}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>
          ) : (
            /* Empty State */
            <section className="py-32 bg-gradient-to-b from-white to-crimson-50/20">
              <div className="max-w-3xl mx-auto px-8 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-crimson-100 flex items-center justify-center">
                    <Gauge className="h-12 w-12 text-crimson-600" />
                  </div>
                  <h2 className="font-serif text-3xl font-semibold text-luxury-dark-gray mb-4">
                    Select Products to Start Comparing
                  </h2>
                  <p className="text-lg text-platinum-600 font-light mb-8">
                    Choose up to {maxSelections} ErgoPack models to see a detailed side-by-side comparison of their features and specifications.
                  </p>
                  <button
                    onClick={() => setShowSelector(true)}
                    className="btn-premium-secondary text-lg px-12 py-6"
                  >
                    Browse All Models
                  </button>
                </motion.div>
              </div>
            </section>
          )}

          {/* Product Selector Modal */}
          <AnimatePresence>
            {showSelector && (
              <ProductSelectorModal
                selectedProducts={selectedProducts}
                onToggle={handleProductToggle}
                onClose={() => setShowSelector(false)}
                maxSelections={maxSelections}
                productsByLine={productsByLine}
              />
            )}
          </AnimatePresence>
        </div>
      </MainLayout>
    </>
  );
}

// Comparison Row Component
function ComparisonRow({
  label,
  icon: Icon,
  values,
  selectedProducts,
  highlight = false,
}: {
  label: string;
  icon: any;
  values: string[];
  selectedProducts: string[];
  highlight?: boolean;
}) {
  const allProducts = Object.entries(productsData.products).map(([key, product]) => ({
    key,
    ...product,
  }));

  const getProductData = (key: string) => {
    return allProducts.find(p => p.key === key);
  };

  return (
    <tr className={`border-b border-platinum-200 ${highlight ? 'bg-white' : 'bg-white'}`}>
      <td className="px-6 py-6 font-semibold text-luxury-dark-gray sticky left-0 z-10 bg-white border-r border-platinum-200">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-platinum-500" />
          {label}
        </div>
      </td>
      {values.map((value, index) => {
        const product = getProductData(selectedProducts[index]);
        const isXpert = product?.line === 'X-pert Line';

        return (
          <td
            key={index}
            className={`px-6 py-6 text-center ${
              isXpert && highlight ? 'bg-crimson-50/30' : isXpert ? 'bg-crimson-50/10' : 'bg-white'
            } ${index < values.length - 1 ? 'border-r border-platinum-200' : ''}`}
          >
            <span className={`${isXpert ? 'text-luxury-dark-gray font-medium' : 'text-platinum-700'}`}>
              {value}
            </span>
          </td>
        );
      })}
    </tr>
  );
}

// Product Selector Modal
function ProductSelectorModal({
  selectedProducts,
  onToggle,
  onClose,
  maxSelections,
  productsByLine,
}: {
  selectedProducts: string[];
  onToggle: (key: string) => void;
  onClose: () => void;
  maxSelections: number;
  productsByLine: any;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md cursor-auto"
      onClick={onClose}
      style={{ cursor: 'auto' }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-7xl w-full mx-4 max-h-[85vh] overflow-y-auto bg-white rounded-3xl shadow-2xl"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-3 rounded-full bg-platinum-100 hover:bg-platinum-200 transition-colors group"
        >
          <X className="h-6 w-6 text-luxury-dark-gray group-hover:rotate-90 transition-transform duration-300" />
        </button>

        {/* Header */}
        <div className="text-center pt-16 pb-12 px-8 border-b border-platinum-200 bg-gradient-to-br from-crimson-50 to-white">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-luxury-dark-gray">
            Select Products to Compare
          </h2>
          <p className="text-base text-platinum-600 max-w-2xl mx-auto">
            Choose up to {maxSelections} models • {selectedProducts.length} / {maxSelections} selected
          </p>
        </div>

        {/* Products Grid */}
        <div className="p-8 sm:p-12 space-y-12">
          {Object.entries(productsByLine).map(([lineName, products]: [string, any]) => {
            if (products.length === 0) return null;

            const isXpert = lineName === 'X-pert Line';

            return (
              <div key={lineName}>
                <div className="flex items-center gap-3 mb-6">
                  {isXpert ? (
                    <Zap className="h-6 w-6 text-crimson-600" />
                  ) : (
                    <DollarSign className="h-6 w-6 text-platinum-600" />
                  )}
                  <h3 className={`text-xl font-bold ${isXpert ? 'text-crimson-600' : 'text-luxury-dark-gray'}`}>
                    {lineName}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                  {products.map((product: any) => {
                    const isSelected = selectedProducts.includes(product.key);
                    const canSelect = selectedProducts.length < maxSelections || isSelected;

                    return (
                      <button
                        key={product.key}
                        onClick={() => canSelect && onToggle(product.key)}
                        disabled={!canSelect}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 text-left ${
                          isSelected
                            ? 'bg-crimson-600 border-crimson-600 text-white scale-105'
                            : canSelect
                            ? isXpert
                              ? 'bg-crimson-50 border-crimson-200 hover:border-crimson-400 hover:shadow-lg'
                              : 'bg-white border-platinum-200 hover:border-platinum-400 hover:shadow-lg'
                            : 'bg-platinum-50 border-platinum-100 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        {/* Selection Badge */}
                        {isSelected && (
                          <div className="absolute top-3 right-3">
                            <div className="w-6 h-6 rounded-full bg-white text-crimson-600 flex items-center justify-center">
                              <CheckCircle2 className="h-4 w-4" />
                            </div>
                          </div>
                        )}

                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3 ${
                          isSelected
                            ? 'bg-white/20 text-white'
                            : isXpert
                            ? 'bg-crimson-100 text-crimson-700'
                            : 'bg-platinum-100 text-platinum-700'
                        }`}>
                          {product.applicationType}
                        </div>

                        <h4 className={`text-xl font-black mb-1 ${
                          isSelected ? 'text-white' : isXpert ? 'text-crimson-700' : 'text-luxury-dark-gray'
                        }`}>
                          {product.model}
                        </h4>

                        <p className={`text-xs mb-3 ${
                          isSelected ? 'text-white/80' : 'text-platinum-600'
                        }`}>
                          {product.fullName}
                        </p>

                        <div className="space-y-1 text-xs">
                          {product.sealingHead?.tensionPower && (
                            <div className="flex justify-between">
                              <span className={isSelected ? 'text-white/70' : 'text-platinum-500'}>
                                Max Tension:
                              </span>
                              <span className={isSelected ? 'text-white font-medium' : 'text-platinum-700'}>
                                {product.sealingHead.tensionPower.max} {product.sealingHead.tensionPower.unit}
                              </span>
                            </div>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center py-8 px-8 border-t border-platinum-200 bg-platinum-50">
          <button
            onClick={onClose}
            className="btn-premium text-base px-12 py-4"
            disabled={selectedProducts.length === 0}
          >
            <span className="relative z-10 flex items-center">
              Compare Selected Products
              <ArrowRight className="ml-2 h-5 w-5" />
            </span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
