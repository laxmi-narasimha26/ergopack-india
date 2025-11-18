'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import { MinimalLoadingScreen } from '@/components/ui/MinimalLoadingScreen';
import {
  CheckCircle2,
  ArrowRight,
  Package,
  Settings,
  Shield,
  ChevronRight,
} from 'lucide-react';
import { ComprehensiveProduct } from '@/data/comprehensive-products';

interface PremiumProductPageProps {
  product: ComprehensiveProduct;
}

export default function PremiumProductPage({ product }: PremiumProductPageProps) {
  const isXpert = product.line === 'xpert';
  const gradientFrom = isXpert ? 'from-red-900' : 'from-blue-900';
  const gradientTo = isXpert ? 'to-red-950' : 'to-blue-950';
  const accentColor = isXpert ? 'text-red-400' : 'text-blue-400';
  const borderColor = isXpert ? 'border-red-500/30' : 'border-blue-500/30';
  const bgAccent = isXpert ? 'bg-red-500/10' : 'bg-blue-500/10';

  return (
    <>
      <MinimalLoadingScreen />
      <MainLayout>
        <div className="bg-slate-950 min-h-screen">
          {/* Hero Section - Premium, not boxy */}
          <section className={`relative min-h-[90vh] bg-gradient-to-br ${gradientFrom} via-slate-900 ${gradientTo} overflow-hidden`}>
          {/* Animated background orbs */}
          <div className="absolute inset-0">
            <motion.div
              className={`absolute top-1/4 right-1/4 w-96 h-96 rounded-full ${bgAccent} blur-3xl opacity-20`}
              animate={{
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 lg:px-16 pt-32 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${borderColor} ${bgAccent} mb-6`}>
                  <Package className={`h-4 w-4 ${accentColor}`} />
                  <span className={`text-sm font-semibold ${accentColor}`}>
                    {product.specifications.line}
                  </span>
                </div>

                <h1 className="text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  {product.name}
                </h1>

                <p className="text-2xl text-slate-300 mb-8 leading-relaxed">
                  {product.tagline}
                </p>

                <p className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl">
                  {product.description}
                </p>

                {/* Key Specs Pills */}
                <div className="flex flex-wrap gap-4 mb-10">
                  <div className="px-6 py-3 rounded-xl bg-slate-800/50 border border-slate-700">
                    <div className={`text-sm ${accentColor} mb-1`}>Chain Speed</div>
                    <div className="text-xl font-bold text-white">
                      {product.specifications.chainSpeed}
                    </div>
                  </div>
                  {product.battery && (
                    <div className="px-6 py-3 rounded-xl bg-slate-800/50 border border-slate-700">
                      <div className={`text-sm ${accentColor} mb-1`}>Cycles/Charge</div>
                      <div className="text-xl font-bold text-white">
                        {product.battery.strappingCycles}
                      </div>
                    </div>
                  )}
                  <div className="px-6 py-3 rounded-xl bg-slate-800/50 border border-slate-700">
                    <div className={`text-sm ${accentColor} mb-1`}>Pallet Range</div>
                    <div className="text-xl font-bold text-white">
                      {product.specifications.palletWidth.min}-{product.specifications.palletWidth.max}cm
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="primary"
                      className={`group ${isXpert ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800' : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'} text-white shadow-2xl`}
                    >
                      Request Quote
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Link href="/products/compare-machines">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-slate-600 text-slate-200 hover:bg-slate-800"
                    >
                      Compare Models
                    </Button>
                  </Link>
                </div>
              </motion.div>

              {/* Hero Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${isXpert ? 'from-red-500/20' : 'from-blue-500/20'} to-transparent rounded-3xl blur-3xl`} />
                <div className="relative aspect-square rounded-3xl overflow-hidden bg-slate-900/50 border border-slate-800">
                  <Image
                    src={product.images.hero}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                    priority
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Gallery - Premium showcase */}
        {product.images.gallery && product.images.gallery.length > 0 && (
          <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4`}>
                  Visual Tour
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Product Gallery
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Explore the {product.name} from every angle. Premium engineering meets practical design.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {product.images.gallery.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${isXpert ? 'from-red-500/10' : 'from-blue-500/10'} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10`} />
                    <Image
                      src={image}
                      alt={`${product.name} - View ${index + 1}`}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Features Grid - Premium flowing design */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4`}>
                Key Features
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Engineered for Excellence
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {product.features.slice(0, 9).map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="group p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 hover:border-slate-700 transition-all duration-300"
                >
                  <CheckCircle2 className={`h-6 w-6 ${accentColor} mb-4`} />
                  <p className="text-slate-200 leading-relaxed">{feature}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Specifications - Modern table design */}
        <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
          <div className="max-w-6xl mx-auto px-6 sm:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4`}>
                Technical Details
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Specifications
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-900/50 rounded-3xl border border-slate-800 overflow-hidden"
            >
              <div className="p-8 space-y-4">
                {[
                  { label: 'Model', value: product.specifications.model },
                  { label: 'Product Line', value: product.specifications.line },
                  { label: 'Dimensions (L×W×H)', value: `${product.specifications.dimensions.length} × ${product.specifications.dimensions.width} × ${product.specifications.dimensions.height} mm` },
                  { label: 'Weight', value: `${product.specifications.weight} ${product.specifications.weightUnit}` },
                  { label: 'Pallet Width Range', value: `${product.specifications.palletWidth.min} - ${product.specifications.palletWidth.max} ${product.specifications.palletWidth.unit}` },
                  { label: 'Pallet Height Range', value: `${product.specifications.palletHeight.min} - ${product.specifications.palletHeight.max} ${product.specifications.palletHeight.unit}` },
                  { label: 'Chain Speed', value: product.specifications.chainSpeed },
                  { label: 'Chain Length', value: product.specifications.chainLength },
                  { label: 'Control System', value: product.specifications.control },
                ].map((spec, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-4 border-b border-slate-800 last:border-0"
                  >
                    <span className="text-slate-400 font-medium">{spec.label}</span>
                    <span className="text-white font-semibold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Accessories Visual Showcase */}
        {product.images.accessories && product.images.accessories.length > 0 && (
          <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4`}>
                  Accessories & Add-ons
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Enhanced Functionality
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  Customize your {product.name} with premium accessories designed for maximum versatility.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {product.images.accessories.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${isXpert ? 'from-red-500/5' : 'from-blue-500/5'} to-transparent`} />
                    <Image
                      src={image}
                      alt={`${product.name} Accessory ${index + 1}`}
                      fill
                      className="object-contain p-6 group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Included Accessories */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4`}>
                What's Included
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Standard Equipment
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {product.includedAccessories.map((accessory, index) => (
                <motion.div
                  key={accessory.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800"
                >
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bgAccent} mb-6`}>
                    <CheckCircle2 className={`h-6 w-6 ${accentColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{accessory.name}</h3>
                  <p className="text-slate-400 mb-4 leading-relaxed">{accessory.description}</p>
                  {accessory.details && accessory.details.length > 0 && (
                    <ul className="space-y-2">
                      {accessory.details.map((detail, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-slate-500">
                          <ChevronRight className={`h-4 w-4 ${accentColor} flex-shrink-0 mt-0.5`} />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Optional Accessories */}
        <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4`}>
                Expand Your Capabilities
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Optional Accessories
              </h2>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                Customize your {product.name} with these optional accessories to meet your specific needs
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.optionalAccessories.map((accessory, index) => (
                <motion.div
                  key={accessory.id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-lg ${bgAccent} flex items-center justify-center`}>
                      <Settings className={`h-5 w-5 ${accentColor}`} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2">{accessory.name}</h3>
                      <p className="text-slate-400 text-sm mb-3">{accessory.description}</p>
                      {accessory.details && accessory.details.length > 0 && (
                        <ul className="space-y-1">
                          {accessory.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-slate-500">
                              <ChevronRight className={`h-3 w-3 ${accentColor} flex-shrink-0 mt-0.5`} />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Applications Visual Gallery */}
        {product.images.applications && product.images.applications.length > 0 && (
          <section className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4`}>
                  Real-World Solutions
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                  Applications in Action
                </h2>
                <p className="text-slate-400 max-w-2xl mx-auto">
                  See how the {product.name} delivers exceptional results across diverse packaging scenarios.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {product.images.applications.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent z-10`} />
                    <Image
                      src={image}
                      alt={`${product.name} Application ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Applications List */}
        <section className="py-24 bg-slate-950">
          <div className="max-w-7xl mx-auto px-6 sm:px-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4`}>
                Perfect For
              </p>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Industry Applications
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {product.applications.map((application, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`p-6 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border ${borderColor} text-center`}
                >
                  <p className="text-slate-200 font-medium">{application}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={`py-24 bg-gradient-to-br ${gradientFrom} ${gradientTo} relative overflow-hidden`}>
          <div className={`absolute inset-0 opacity-10 bg-gradient-to-br ${isXpert ? 'from-red-500' : 'from-blue-500'} to-transparent blur-3xl`} />

          <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-slate-300 mb-10 leading-relaxed">
                Contact our team for a personalized quote and discover how the {product.name} can transform your operations.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    variant="primary"
                    className={`${isXpert ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'} text-white px-10 py-5 text-lg shadow-2xl`}
                  >
                    Request Quote
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/products/compare-machines">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-2 border-slate-600 px-10 py-5 text-lg text-slate-200 hover:bg-slate-800"
                  >
                    Compare Models
                  </Button>
                </Link>
              </div>

              {product.certifications && (
                <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-400">
                  {product.certifications.iso12100 && (
                    <div className="flex items-center gap-2">
                      <Shield className={`h-5 w-5 ${accentColor}`} />
                      <span>ISO 12100:2010 Certified</span>
                    </div>
                  )}
                  {product.certifications.agr && (
                    <div className="flex items-center gap-2">
                      <Shield className={`h-5 w-5 ${accentColor}`} />
                      <span>AGR Certified Ergonomic</span>
                    </div>
                  )}
                  {product.certifications.euDeclaration && (
                    <div className="flex items-center gap-2">
                      <Shield className={`h-5 w-5 ${accentColor}`} />
                      <span>EU Declaration of Conformity</span>
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          </div>
        </section>
        </div>
      </MainLayout>
    </>
  );
}
