'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Button from '@/components/ui/Button';
import { MinimalLoadingScreen } from '@/components/ui/MinimalLoadingScreen';
import { CheckCircle2, ArrowRight, Package, Settings, Shield, ChevronRight } from 'lucide-react';
import { ComprehensiveProduct } from '@/data/comprehensive-products';

interface PremiumProductPageProps {
  product: ComprehensiveProduct;
}

export default function PremiumProductPage({ product }: PremiumProductPageProps) {
  const isXpert = product.line === 'xpert';
  const accentColor = isXpert ? 'text-crimson-600' : 'text-crimson-600';
  const borderColor = isXpert ? 'border-crimson-500/30' : 'border-crimson-500/30';
  const bgAccent = isXpert ? 'bg-crimson-500/10' : 'bg-crimson-500/10';

  return (
    <>
      <MinimalLoadingScreen />
      <MainLayout>
        <div className="bg-gradient-to-b from-white via-crimson-50/20 to-white min-h-screen">
          {/* Hero Section - Premium, not boxy */}
          <section className="relative min-h-[90vh] bg-gradient-to-br from-crimson-100 via-crimson-50 to-white overflow-hidden">
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
                  <div
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${borderColor} ${bgAccent} mb-6`}
                  >
                    <Package className={`h-4 w-4 ${accentColor}`} />
                    <span className={`text-sm font-semibold ${accentColor}`}>
                      {product.specifications.line}
                    </span>
                  </div>

                  <h1 className="text-6xl lg:text-7xl font-bold text-luxury-dark-gray mb-6 leading-tight">
                    {product.name}
                  </h1>

                  <p className="text-2xl text-platinum-700 mb-8 leading-relaxed">
                    {product.tagline}
                  </p>

                  <p className="text-lg text-platinum-600 mb-10 leading-relaxed max-w-2xl">
                    {product.description}
                  </p>

                  {/* Key Specs Pills */}
                  <div className="flex flex-wrap gap-4 mb-10">
                    <div className="px-6 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-crimson-200 shadow-lg">
                      <div className={`text-sm ${accentColor} mb-1 font-semibold`}>Chain Speed</div>
                      <div className="text-xl font-bold text-luxury-dark-gray">
                        {product.specifications.chainSpeed}
                      </div>
                    </div>
                    {product.battery && (
                      <div className="px-6 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-crimson-200 shadow-lg">
                        <div className={`text-sm ${accentColor} mb-1 font-semibold`}>
                          Cycles/Charge
                        </div>
                        <div className="text-xl font-bold text-luxury-dark-gray">
                          {product.battery.strappingCycles}
                        </div>
                      </div>
                    )}
                    <div className="px-6 py-3 rounded-xl bg-white/80 backdrop-blur-sm border border-crimson-200 shadow-lg">
                      <div className={`text-sm ${accentColor} mb-1 font-semibold`}>
                        Pallet Range
                      </div>
                      <div className="text-xl font-bold text-luxury-dark-gray">
                        {product.specifications.palletWidth.min}-
                        {product.specifications.palletWidth.max}cm
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link href="/contact">
                      <Button
                        size="lg"
                        variant="primary"
                        className="group bg-gradient-to-r from-crimson-600 to-crimson-700 hover:from-crimson-700 hover:to-crimson-800 text-white shadow-2xl"
                      >
                        Request Quote
                        <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                    <Link href="/compare?auto=true">
                      <Button
                        size="lg"
                        variant="outline"
                        className="border-2 border-crimson-500 text-crimson-700 hover:bg-crimson-50"
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
                  <div className="absolute inset-0 bg-gradient-to-br from-crimson-500/20 to-transparent rounded-3xl blur-3xl" />
                  <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/50 backdrop-blur-sm border border-crimson-200 shadow-2xl">
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
            <section className="py-24 bg-gradient-to-b from-white to-crimson-50/30">
              <div className="max-w-7xl mx-auto px-6 sm:px-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4 font-bold`}>
                    Visual Tour
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-bold text-luxury-dark-gray mb-6">
                    Product Gallery
                  </h2>
                  <p className="text-platinum-600 max-w-2xl mx-auto text-lg">
                    Explore the {product.name} from every angle. Premium engineering meets practical
                    design.
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
                      className="group relative aspect-square rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-crimson-200 hover:border-crimson-400 hover:shadow-2xl transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-crimson-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
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
          <section className="py-24 bg-gradient-to-b from-crimson-50/30 to-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4 font-bold`}>
                  Key Features
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-luxury-dark-gray mb-6">
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
                    className="group p-6 rounded-2xl bg-white border border-crimson-200 hover:border-crimson-400 hover:shadow-xl transition-all duration-300"
                  >
                    <CheckCircle2 className={`h-6 w-6 ${accentColor} mb-4`} />
                    <p className="text-platinum-700 leading-relaxed">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Technical Specifications - Modern table design */}
          <section className="py-24 bg-gradient-to-b from-white to-crimson-50/30">
            <div className="max-w-6xl mx-auto px-6 sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4 font-bold`}>
                  Technical Details
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-luxury-dark-gray mb-6">
                  Specifications
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border-2 border-crimson-200 rounded-3xl shadow-2xl overflow-hidden"
              >
                <div className="p-8 space-y-4">
                  {[
                    { label: 'Model', value: product.specifications.model },
                    { label: 'Product Line', value: product.specifications.line },
                    {
                      label: 'Dimensions (L×W×H)',
                      value: `${product.specifications.dimensions.length} × ${product.specifications.dimensions.width} × ${product.specifications.dimensions.height} mm`,
                    },
                    {
                      label: 'Weight',
                      value: `${product.specifications.weight} ${product.specifications.weightUnit}`,
                    },
                    {
                      label: 'Pallet Width Range',
                      value: `${product.specifications.palletWidth.min} - ${product.specifications.palletWidth.max} ${product.specifications.palletWidth.unit}`,
                    },
                    {
                      label: 'Pallet Height Range',
                      value: `${product.specifications.palletHeight.min} - ${product.specifications.palletHeight.max} ${product.specifications.palletHeight.unit}`,
                    },
                    { label: 'Chain Speed', value: product.specifications.chainSpeed },
                    { label: 'Chain Length', value: product.specifications.chainLength },
                    { label: 'Control System', value: product.specifications.control },
                  ].map((spec, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between py-4 border-b border-crimson-100 last:border-0"
                    >
                      <span className="text-platinum-600 font-medium">{spec.label}</span>
                      <span className="text-luxury-dark-gray font-semibold text-right">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* Accessories Visual Showcase */}
          {product.images.accessories && product.images.accessories.length > 0 && (
            <section className="py-24 bg-gradient-to-b from-crimson-50/30 to-white">
              <div className="max-w-7xl mx-auto px-6 sm:px-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4 font-bold`}>
                    Accessories & Add-ons
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-bold text-luxury-dark-gray mb-6">
                    Enhanced Functionality
                  </h2>
                  <p className="text-platinum-600 max-w-2xl mx-auto text-lg">
                    Customize your {product.name} with premium accessories designed for maximum
                    versatility.
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
                      className="group relative aspect-square rounded-2xl overflow-hidden bg-white/80 backdrop-blur-sm border border-crimson-200 hover:border-crimson-400 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-crimson-500/5 to-transparent" />
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
          <section className="py-24 bg-gradient-to-b from-white to-crimson-50/30">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4 font-bold`}>
                  What's Included
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-luxury-dark-gray mb-6">
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
                    className="p-8 rounded-2xl bg-white border border-crimson-200 hover:shadow-xl transition-all duration-300"
                  >
                    <div
                      className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bgAccent} mb-6`}
                    >
                      <CheckCircle2 className={`h-6 w-6 ${accentColor}`} />
                    </div>
                    <h3 className="text-xl font-bold text-luxury-dark-gray mb-3">
                      {accessory.name}
                    </h3>
                    <p className="text-platinum-600 mb-4 leading-relaxed">
                      {accessory.description}
                    </p>
                    {accessory.details && accessory.details.length > 0 && (
                      <ul className="space-y-2">
                        {accessory.details.map((detail, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-platinum-500">
                            <ChevronRight
                              className={`h-4 w-4 ${accentColor} flex-shrink-0 mt-0.5`}
                            />
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
          <section className="py-24 bg-gradient-to-b from-crimson-50/30 to-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4 font-bold`}>
                  Expand Your Capabilities
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-luxury-dark-gray mb-6">
                  Optional Accessories
                </h2>
                <p className="text-xl text-platinum-600 max-w-3xl mx-auto">
                  Customize your {product.name} with these optional accessories to meet your
                  specific needs
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
                    className="p-6 rounded-2xl bg-white border border-crimson-200 hover:border-crimson-400 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div
                        className={`flex-shrink-0 w-10 h-10 rounded-lg ${bgAccent} flex items-center justify-center`}
                      >
                        <Settings className={`h-5 w-5 ${accentColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-luxury-dark-gray mb-2">
                          {accessory.name}
                        </h3>
                        <p className="text-platinum-600 text-sm mb-3">{accessory.description}</p>
                        {accessory.details && accessory.details.length > 0 && (
                          <ul className="space-y-1">
                            {accessory.details.map((detail, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-xs text-platinum-500"
                              >
                                <ChevronRight
                                  className={`h-3 w-3 ${accentColor} flex-shrink-0 mt-0.5`}
                                />
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
            <section className="py-24 bg-gradient-to-b from-white to-crimson-50/30">
              <div className="max-w-7xl mx-auto px-6 sm:px-12">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-center mb-16"
                >
                  <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4 font-bold`}>
                    Real-World Solutions
                  </p>
                  <h2 className="text-4xl lg:text-5xl font-bold text-luxury-dark-gray mb-6">
                    Applications in Action
                  </h2>
                  <p className="text-platinum-600 max-w-2xl mx-auto text-lg">
                    See how the {product.name} delivers exceptional results across diverse packaging
                    scenarios.
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
                      className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-white border border-crimson-200 hover:border-crimson-400 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-crimson-50/60 via-transparent to-transparent z-10" />
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
          <section className="py-24 bg-gradient-to-b from-crimson-50/30 to-white">
            <div className="max-w-7xl mx-auto px-6 sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className={`text-sm uppercase tracking-widest ${accentColor} mb-4 font-bold`}>
                  Perfect For
                </p>
                <h2 className="text-4xl lg:text-5xl font-bold text-luxury-dark-gray mb-6">
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
                    className={`p-6 rounded-xl bg-white border ${borderColor} hover:shadow-lg transition-all duration-300 text-center`}
                  >
                    <p className="text-platinum-700 font-medium">{application}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-24 bg-gradient-to-br from-crimson-100 via-crimson-50 to-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-crimson-500 to-transparent blur-3xl" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-12 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-4xl lg:text-5xl font-bold text-luxury-dark-gray mb-6">
                  Ready to Get Started?
                </h2>
                <p className="text-xl text-platinum-700 mb-10 leading-relaxed">
                  Contact our team for a personalized quote and discover how the {product.name} can
                  transform your operations.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <Button
                      size="lg"
                      variant="primary"
                      className="bg-crimson-600 hover:bg-crimson-700 text-white px-10 py-5 text-lg shadow-2xl"
                    >
                      Request Quote
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/compare?auto=true">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-crimson-500 px-10 py-5 text-lg text-crimson-700 hover:bg-crimson-50"
                    >
                      Compare Models
                    </Button>
                  </Link>
                </div>

                {product.certifications && (
                  <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-platinum-600">
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
