'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { Premium3DCard } from '@/components/ui/Premium3DCard';
import { MagneticButton } from '@/components/ui/MagneticButton';
import { ArrowRight, CheckCircle2, Battery, Package, Zap, ShieldCheck } from 'lucide-react';
import { EssentialsSection } from '@/components/products/EssentialsSection';
import {
  ergoPack700,
  ergoPack700E,
  ergoPack700X,
  ergoPack700XLFP,
  ergoPack713E,
  ergoPack713X,
  ergoPack713XLFP,
  ergoPack726E,
  ergoPack726X,
  ergoPack726XLFP,
  ergoPack745E,
  ergoPack745X,
  ergoPackGO,
  ComprehensiveProduct,
} from '@/data/comprehensive-products';

export default function ProductsPage() {
  const xpertLine = [
    ergoPack700X,
    ergoPack700XLFP,
    ergoPack713X,
    ergoPack713XLFP,
    ergoPack726X,
    ergoPack726XLFP,
    ergoPack745X,
  ];
  const economyLine = [ergoPack700, ergoPack700E, ergoPack713E, ergoPack726E, ergoPack745E];
  const goLine = [ergoPackGO];

  const ProductCard = ({
    product,
    isXpert,
  }: {
    product: ComprehensiveProduct;
    isXpert: boolean;
  }) => {
    const isLithium =
      product.battery?.type === 'Lithium-Ion' ||
      product.battery?.type === 'Lithium-Iron-Phosphate (LFP)';
    const cardClass = isXpert
      ? 'premium-card-dark'
      : 'premium-card bg-gradient-to-br from-white to-platinum-50';

    return (
      <Premium3DCard glowColor={isXpert ? 'rgba(155, 28, 28, 0.3)' : 'rgba(113, 113, 122, 0.2)'}>
        <Link href={`/products/${product.id.toLowerCase()}`} className="block group h-full">
          <div
            className={`${cardClass} p-8 h-full flex flex-col justify-between relative overflow-hidden`}
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:16px_16px]" />

            <div>
              {/* Badge & Icons */}
              <div className="flex items-center justify-between mb-8 relative z-10">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    isXpert
                      ? 'bg-crimson-500/20 border border-crimson-500/30'
                      : 'bg-platinum-100 border border-platinum-200'
                  }`}
                >
                  <span
                    className={`text-xs font-medium tracking-wide uppercase ${
                      isXpert ? 'text-crimson-400' : 'text-platinum-700'
                    }`}
                  >
                    {product.line === 'xpert' ? 'X-pert Line' : 'Economy Line'}
                  </span>
                </div>
                {isLithium && (
                  <div className="flex gap-2">
                    <div
                      className="p-2 rounded-lg bg-amber-500/20 border border-amber-500/30"
                      title="Lithium Technology"
                    >
                      <Battery className="h-4 w-4 text-amber-400" />
                    </div>
                  </div>
                )}
              </div>

              {/* Image */}
              <div className="relative h-64 w-full mb-8 group-hover:scale-105 transition-transform duration-700 ease-out">
                <Image
                  src={product.images.hero}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Model Name */}
              <h3
                className={`font-serif text-3xl font-bold mb-3 ${
                  isXpert
                    ? 'text-white group-hover:text-crimson-400'
                    : 'text-luxury-dark-gray group-hover:text-platinum-700'
                } transition-colors duration-500 relative z-10`}
              >
                {product.name}
              </h3>
              <p
                className={`text-sm mb-6 ${
                  isXpert ? 'text-platinum-300' : 'text-platinum-600'
                } font-medium tracking-wide uppercase opacity-80`}
              >
                {product.tagline}
              </p>

              {/* Description */}
              <p
                className={`text-sm mb-8 ${
                  isXpert ? 'text-platinum-400' : 'text-platinum-500'
                } font-light leading-relaxed line-clamp-3`}
              >
                {product.description}
              </p>

              {/* Key Specs */}
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span
                    className={`text-xs uppercase tracking-wider ${isXpert ? 'text-platinum-500' : 'text-platinum-400'}`}
                  >
                    Chain Speed
                  </span>
                  <span
                    className={`text-sm font-medium ${isXpert ? 'text-platinum-200' : 'text-luxury-dark-gray'}`}
                  >
                    {product.specifications.chainSpeed}
                  </span>
                </div>
                <div className="flex items-center justify-between py-2 border-b border-white/5">
                  <span
                    className={`text-xs uppercase tracking-wider ${isXpert ? 'text-platinum-500' : 'text-platinum-400'}`}
                  >
                    Pallet Height
                  </span>
                  <span
                    className={`text-sm font-medium ${isXpert ? 'text-platinum-200' : 'text-luxury-dark-gray'}`}
                  >
                    {product.specifications.palletHeight.min}-
                    {product.specifications.palletHeight.max}cm
                  </span>
                </div>
                {product.battery && (
                  <div className="flex items-center justify-between py-2 border-b border-white/5">
                    <span
                      className={`text-xs uppercase tracking-wider ${isXpert ? 'text-platinum-500' : 'text-platinum-400'}`}
                    >
                      Cycles/Charge
                    </span>
                    <span
                      className={`text-sm font-medium ${isXpert ? 'text-platinum-200' : 'text-luxury-dark-gray'}`}
                    >
                      {product.battery.strappingCycles}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              className={`mt-auto pt-6 border-t ${
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
    );
  };

  return (
    <>
      <MainLayout>
        <div className="bg-gradient-to-b from-white via-crimson-50/20 to-white min-h-screen">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-crimson-50 via-white to-crimson-100/40 pt-20 pb-12 overflow-hidden">
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

                <h1 className="font-serif text-4xl sm:text-5xl font-bold text-luxury-dark-gray leading-tight mb-6">
                  The ErgoPack Collection
                </h1>
                <p className="text-lg sm:text-xl text-platinum-600 font-light leading-relaxed max-w-4xl mx-auto mb-8">
                  Discover the pinnacle of ergonomic strapping technology. From the efficiency of
                  our Economy Line to the advanced precision of the X-pert Line.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <MagneticButton href="/compare?auto=true">
                    <div className="btn-premium group text-lg px-12 py-6 cursor-pointer">
                      <span className="relative z-10 flex items-center">
                        Compare Models
                        <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-500" />
                      </span>
                    </div>
                  </MagneticButton>
                </div>
              </motion.div>
            </div>
          </section>

          {/* X-pert Line Section */}
          <section className="py-16 bg-luxury-dark-gray relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:24px_24px]" />
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-crimson-900/20 to-transparent" />

            <div className="max-w-7xl mx-auto px-8 sm:px-12 relative z-10">
              <div className="mb-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-crimson-500/10 border border-crimson-500/20 mb-6"
                >
                  <Zap className="h-4 w-4 text-crimson-500" />
                  <span className="text-sm font-bold text-crimson-400 tracking-widest uppercase">
                    The Pinnacle of Performance
                  </span>
                </motion.div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                  X-pert Line
                </h2>
                <p className="text-lg text-platinum-300 max-w-3xl mx-auto font-light leading-relaxed">
                  Engineered for high-volume operations requiring maximum speed and precision.
                  Featuring Siemens Touchscreen control, Line-Laser positioning, and Lithium-Ion
                  technology.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-8">
                {xpertLine.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                  >
                    <ProductCard product={product} isXpert={true} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Economy Line Section */}
          <section className="py-16 bg-gradient-to-b from-white to-platinum-50">
            <div className="max-w-7xl mx-auto px-8 sm:px-12">
              <div className="mb-12 text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-platinum-100 border border-platinum-200 mb-6"
                >
                  <ShieldCheck className="h-4 w-4 text-platinum-600" />
                  <span className="text-sm font-bold text-platinum-600 tracking-widest uppercase">
                    The Benchmark of Efficiency
                  </span>
                </motion.div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-luxury-dark-gray mb-4">
                  Economy Line
                </h2>
                <p className="text-xl text-platinum-600 max-w-3xl mx-auto font-light leading-relaxed">
                  The industry standard for ergonomic pallet strapping. Reliable, efficient, and
                  proven technology powered by 24V lead-fleece batteries.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {economyLine.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="h-full"
                  >
                    <ProductCard product={product} isXpert={false} />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Essentials Section */}
          <EssentialsSection />

          {/* GO Line Section */}
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-8 sm:px-12">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                      <Package className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-bold text-blue-600 tracking-widest uppercase">
                        Uncompromised Mobility
                      </span>
                    </div>
                    <h2 className="font-serif text-3xl md:text-4xl font-bold text-luxury-dark-gray mb-4">
                      ErgoPack GO
                    </h2>
                    <p className="text-lg text-platinum-600 font-light leading-relaxed mb-6">
                      The portable solution for flexible strapping across multiple locations.
                      Compact, powerful, and ready to go wherever you need it.
                    </p>

                    <div className="space-y-4 mb-10">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                          <Battery className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">24V Portable Power</h4>
                          <p className="text-sm text-gray-500">
                            Reliable battery operation for mobile use
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                          <Package className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900">Universal Application</h4>
                          <p className="text-sm text-gray-500">
                            Perfect for varying pallet sizes and locations
                          </p>
                        </div>
                      </div>
                    </div>

                    <MagneticButton href="/products/go">
                      <button className="btn-premium-secondary px-10 py-4">
                        Discover ErgoPack GO
                      </button>
                    </MagneticButton>
                  </motion.div>
                </div>
                <div className="lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-50 to-transparent rounded-3xl transform rotate-3 scale-105" />
                    <Premium3DCard>
                      <div className="bg-white p-8 rounded-3xl relative z-10 border border-gray-100">
                        <div className="relative h-[400px] w-full">
                          <Image
                            src={ergoPackGO.images.hero}
                            alt="ErgoPack GO"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </Premium3DCard>
                  </motion.div>
                </div>
              </div>
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
                  Expert Guidance Awaits
                </h2>
                <p className="text-xl text-platinum-600 mb-12 font-light leading-relaxed max-w-3xl mx-auto">
                  Not sure which model fits your needs? Our specialists are ready to analyze your
                  workflow and recommend the perfect solution.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <MagneticButton href="/contact">
                    <button className="btn-premium text-lg px-12 py-6">
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
