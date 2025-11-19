'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import StandardPreloader from '@/components/ui/StandardPreloader';
import { Premium3DCard } from '@/components/ui/Premium3DCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight, CheckCircle2, Battery, Package, Zap } from 'lucide-react';
import productsData from '@/../../products-data.json';

export default function ProductsPage() {
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
    <>
      <StandardPreloader />
      <MainLayout>
        <div className="bg-gradient-to-b from-white via-crimson-50/20 to-white min-h-screen">
          {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-crimson-50 via-white to-crimson-100/40 pt-32 pb-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-grid-slate-700/50 [mask-image:linear-gradient(0deg,transparent,black)]" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-crimson-500/30 bg-gradient-to-r from-crimson-50/80 to-white/80 backdrop-blur-xl shadow-2xl shadow-crimson-500/10 mb-12">
                <Package className="h-5 w-5 text-crimson-600" />
                <span className="text-sm font-semibold text-crimson-700 tracking-wide">
                  Complete Product Range
                </span>
              </div>

              <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold text-luxury-dark-gray leading-tight mb-8">
                All 11 ErgoPack Models
              </h1>
              <p className="text-xl sm:text-2xl text-platinum-600 font-light leading-relaxed max-w-4xl mx-auto mb-12">
                From ultra-light to heavy-duty, manual to IoT-enabled — discover the perfect ErgoPack pallet strapping system for your operation
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <MagneticButton href="/products/compare-machines">
                  <button className="btn-premium group text-lg px-12 py-6">
                    <span className="relative z-10 flex items-center">
                      Compare All Models
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />
                    </span>
                  </button>
                </MagneticButton>
                <MagneticButton href="/contact">
                  <button className="btn-premium-secondary text-lg px-12 py-6">
                    Get Expert Advice
                  </button>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Products by Line */}
        <section className="py-24 bg-gradient-to-b from-white to-crimson-50/30">
          <div className="max-w-7xl mx-auto px-8 sm:px-12">
            {Object.entries(productsByLine).map(([lineName, products], lineIndex) => {
              if (products.length === 0) return null;

              const isXpert = lineName === 'X-pert Line';

              return (
                <motion.div
                  key={lineName}
                  initial={{ opacity: 0, y: 60 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: lineIndex * 0.1 }}
                  className="mb-32 last:mb-0"
                >
                  {/* Line Header */}
                  <div className={`mb-16 p-12 rounded-3xl ${
                    isXpert
                      ? 'bg-gradient-to-br from-crimson-50 to-red-50 border-2 border-crimson-200'
                      : 'bg-gradient-to-br from-platinum-50 to-slate-50 border-2 border-platinum-200'
                  }`}>
                    <div className="flex items-start justify-between flex-wrap gap-6">
                      <div>
                        <h2 className={`font-serif text-4xl sm:text-5xl font-bold mb-4 ${
                          isXpert ? 'text-crimson-600' : 'text-luxury-dark-gray'
                        }`}>
                          {lineName}
                        </h2>
                        <p className="text-xl text-platinum-600 font-light max-w-3xl">
                          {lineName === 'X-pert Line' && 'Premium performance with Li-Ion technology — 65% faster, 3.4x more cycles, Siemens touchscreen control'}
                          {lineName === 'Economy Line' && 'Reliable performance with proven lead-fleece battery technology — professional results at exceptional value'}
                          {lineName === 'RE Line - Mobile Retracting' && 'Mobile ergonomic retracting system with premium features and complete flexibility'}
                          {lineName === 'GO Line - Economy Portable' && 'Portable strapping solution for flexible operation across multiple locations'}
                        </p>
                      </div>
                      {isXpert && (
                        <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-crimson-500/20 border border-crimson-500/30">
                          <Zap className="h-5 w-5 text-crimson-600" />
                          <span className="text-sm font-semibold text-crimson-700">Premium Series</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Product Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product, index) => {
                      const slug = product.key.toLowerCase().replace(/\s+/g, '-');
                      const maxTension = product.sealingHead?.tensionPower
                        ? `${product.sealingHead.tensionPower.max} ${product.sealingHead.tensionPower.unit}`
                        : null;
                      const chainSpeed = product.performance?.chainSpeed
                        ? `${product.performance.chainSpeed} ${product.performance.chainSpeedUnit || 'm/min'}`
                        : product.performance?.operationType || null;
                      const batteryType = product.battery?.type;
                      const isLithium = batteryType === 'Lithium-Ion';
                      const cardClass = isXpert
                        ? 'premium-card-dark'
                        : 'premium-card bg-gradient-to-br from-white to-platinum-50';

                      return (
                        <motion.div
                          key={product.key}
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <Premium3DCard glowColor={isXpert ? "rgba(155, 28, 28, 0.3)" : "rgba(113, 113, 122, 0.2)"}>
                            <Link href={`/products/${slug}`} className="block group">
                              <div className={`${cardClass} p-8 min-h-[600px] flex flex-col justify-between`}>
                                <div>
                                  {/* Badge & Icons */}
                                  <div className="flex items-center justify-between mb-6">
                                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                                      isXpert
                                        ? 'bg-crimson-500/20 border border-crimson-500/30'
                                        : 'bg-platinum-100 border border-platinum-200'
                                    }`}>
                                      <span className={`text-xs font-medium tracking-wide ${
                                        isXpert ? 'text-crimson-400' : 'text-platinum-700'
                                      }`}>
                                        {product.applicationType}
                                      </span>
                                    </div>
                                    {isLithium && (
                                      <div className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30">
                                        <Battery className="h-4 w-4 text-amber-400" />
                                      </div>
                                    )}
                                  </div>

                                  {/* Model Name */}
                                  <h3 className={`font-serif text-4xl font-bold mb-2 ${
                                    isXpert
                                      ? 'text-white group-hover:text-crimson-400'
                                      : 'text-luxury-dark-gray group-hover:text-platinum-700'
                                  } transition-colors duration-500`}>
                                    {product.model}
                                  </h3>
                                  <p className={`text-lg mb-8 ${
                                    isXpert ? 'text-platinum-300' : 'text-platinum-600'
                                  } font-light`}>
                                    {product.fullName}
                                  </p>

                                  {/* Description */}
                                  <p className={`text-sm mb-8 ${
                                    isXpert ? 'text-platinum-400' : 'text-platinum-500'
                                  } font-light leading-relaxed`}>
                                    {product.description}
                                  </p>

                                  {/* Key Specs */}
                                  <div className="space-y-4 mb-8">
                                    {maxTension && (
                                      <div className="flex items-center justify-between">
                                        <span className={`text-sm ${isXpert ? 'text-platinum-400' : 'text-platinum-500'}`}>
                                          Max Tension
                                        </span>
                                        <span className={`text-sm font-medium ${isXpert ? 'text-white' : 'text-luxury-dark-gray'}`}>
                                          {maxTension}
                                        </span>
                                      </div>
                                    )}
                                    {chainSpeed && (
                                      <div className="flex items-center justify-between">
                                        <span className={`text-sm ${isXpert ? 'text-platinum-400' : 'text-platinum-500'}`}>
                                          {product.performance?.operationType ? 'Operation' : 'Chain Speed'}
                                        </span>
                                        <span className={`text-sm font-medium ${isXpert ? 'text-white' : 'text-luxury-dark-gray'}`}>
                                          {chainSpeed}
                                        </span>
                                      </div>
                                    )}
                                    {batteryType && batteryType !== 'None - Manual Operation' && (
                                      <div className="flex items-center justify-between">
                                        <span className={`text-sm ${isXpert ? 'text-platinum-400' : 'text-platinum-500'}`}>
                                          Battery
                                        </span>
                                        <span className={`text-sm font-medium ${isXpert ? 'text-white' : 'text-luxury-dark-gray'}`}>
                                          {isLithium ? 'Lithium-Ion' : '24V Lead'}
                                        </span>
                                      </div>
                                    )}
                                    {product.system?.weight && (
                                      <div className="flex items-center justify-between">
                                        <span className={`text-sm ${isXpert ? 'text-platinum-400' : 'text-platinum-500'}`}>
                                          System Weight
                                        </span>
                                        <span className={`text-sm font-medium ${isXpert ? 'text-white' : 'text-luxury-dark-gray'}`}>
                                          {product.system.weight} {product.system.weightUnit}
                                        </span>
                                      </div>
                                    )}
                                  </div>

                                  {/* Features */}
                                  <div className="space-y-3">
                                    {product.includedFeatures?.slice(0, 3).map((feature: string, i: number) => (
                                      <div
                                        key={i}
                                        className={`flex items-start gap-2 text-sm ${
                                          isXpert ? 'text-platinum-300' : 'text-platinum-600'
                                        }`}
                                      >
                                        <CheckCircle2 className={`h-4 w-4 flex-shrink-0 mt-0.5 ${
                                          isXpert ? 'text-crimson-500' : 'text-platinum-600'
                                        }`} />
                                        <span className="font-light">{feature}</span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* CTA */}
                                <motion.div
                                  className={`mt-8 pt-6 border-t ${
                                    isXpert ? 'border-platinum-700' : 'border-platinum-200'
                                  } inline-flex items-center gap-3 ${
                                    isXpert ? 'text-crimson-400' : 'text-luxury-dark-gray'
                                  } font-medium`}
                                  whileHover={{ x: 8 }}
                                  transition={{ duration: 0.3 }}
                                >
                                  <span>View Full Specifications</span>
                                  <ArrowRight className="h-5 w-5" />
                                </motion.div>
                              </div>
                            </Link>
                          </Premium3DCard>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gradient-to-br from-crimson-100 via-crimson-50 to-white">
          <div className="max-w-5xl mx-auto px-8 sm:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-serif text-5xl sm:text-6xl font-semibold text-luxury-dark-gray mb-8 leading-tight">
                Need Help Choosing?
              </h2>
              <p className="text-xl text-platinum-600 mb-12 font-light leading-relaxed max-w-3xl mx-auto">
                Our cargo securing specialists can help you evaluate your specific requirements and recommend the optimal solution for your operation.
              </p>

              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <MagneticButton href="/products/compare-machines">
                  <button className="btn-premium group text-lg px-12 py-6">
                    <span className="relative z-10 flex items-center">
                      Compare All Models
                      <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />
                    </span>
                  </button>
                </MagneticButton>
                <MagneticButton href="/contact">
                  <button className="btn-premium-secondary text-lg px-12 py-6">
                    Schedule Consultation
                  </button>
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>
        </div>
      </MainLayout>
    </>
  );
}
