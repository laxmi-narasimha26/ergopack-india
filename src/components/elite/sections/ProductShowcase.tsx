'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Battery,
  Gauge,
  Package,
  Zap,
  CheckCircle2,
  Award,
  Settings,
  Box,
  Ruler,
  Weight
} from 'lucide-react';

interface ProductShowcaseProps {
  productKey: string;
  productData: any;
}

export default function ProductShowcase({ productData }: ProductShowcaseProps) {
  const isXpert = productData.line === 'X-pert Line';
  const isLithium = productData.battery?.type === 'Lithium-Ion';

  // Helper function to get product image path
  const getProductImagePath = () => {
    // Map model names to folder names
    const modelMap: { [key: string]: string } = {
      '745E': '745E',
      '745X Li': '745X',
      '726E': '726E',
      '726X Li': '726X',
      '713E': '713E',
      '713X Li': '713X',
      '700E': '700E',
      '700X Li': '700X',
      '700': '700',
      '700 Go!': '700',
      '700 Go! Li': '700'
    };

    const folderName = modelMap[productData.model] || '700';
    return `/images/products/${folderName}/0.jpg`; // Use the main product image (0.jpg)
  };

  return (
    <div className="space-y-0">
      {/* Slide 1: Product Hero */}
      <section data-section className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center lg:text-left"
            >
              {/* Badge */}
              <div className={`inline-flex items-center gap-3 px-8 py-4 rounded-full mb-8 ${
                isXpert
                  ? 'bg-[#C8102E]/20 border-2 border-[#C8102E]/50'
                  : 'bg-white/10 border-2 border-white/20'
              }`}>
                <Package className={`h-6 w-6 ${isXpert ? 'text-[#FFB81C]' : 'text-white'}`} />
                <span className={`font-bold tracking-wide ${isXpert ? 'text-[#FFB81C]' : 'text-white'}`}>
                  {productData.line}
                </span>
              </div>

              {/* Model Name */}
              <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tighter mb-6">
                <span className="text-white">{productData.model}</span>
              </h1>

              {/* Full Name */}
              <p className="text-2xl sm:text-3xl text-gray-400 font-light mb-8">
                {productData.fullName}
              </p>

              {/* Application Type */}
              <div className={`inline-block px-6 py-3 rounded-full text-lg font-semibold ${
                isXpert
                  ? 'bg-gradient-to-r from-[#C8102E] to-red-700 text-white'
                  : 'bg-white/10 text-gray-300'
              }`}>
                {productData.applicationType}
              </div>

              {/* Description */}
              <p className="text-lg text-gray-500 mt-8 max-w-2xl leading-relaxed">
                {productData.description}
              </p>

              {/* Arrow Symbols */}
              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-12 text-[#C8102E] text-3xl"
              >
                ↓ SCROLL FOR SPECS ↓
              </motion.div>
            </motion.div>

            {/* Right: Product Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative"
            >
              {/* Glow effect behind image */}
              <div className={`absolute inset-0 blur-3xl opacity-20 rounded-full ${
                isXpert ? 'bg-[#C8102E]' : 'bg-white'
              }`} />

              {/* Image Container */}
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur-sm p-8">
                <Image
                  src={getProductImagePath()}
                  alt={`${productData.fullName} - Industrial Strapping Machine`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Slide 2: Performance Specs */}
      <section data-section className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Section Title */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#C8102E]/20 border border-[#C8102E]/50 mb-6">
                <Gauge className="h-6 w-6 text-[#FFB81C]" />
                <span className="text-sm font-bold text-[#FFB81C] tracking-wider">PERFORMANCE</span>
              </div>
              <h2 className="text-6xl sm:text-7xl font-black text-white mb-6">
                Built For Speed
              </h2>
              <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
                Engineered for maximum efficiency and throughput
              </p>
            </div>

            {/* Performance Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {productData.performance?.chainSpeed && (
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                  <Zap className="h-12 w-12 text-[#FFB81C] mb-4" />
                  <h3 className="text-lg text-gray-400 mb-2">Chain Speed</h3>
                  <p className="text-5xl font-black text-white">
                    {productData.performance.chainSpeed}
                  </p>
                  <p className="text-xl text-gray-500 mt-2">
                    {productData.performance.chainSpeedUnit || 'm/min'}
                  </p>
                </div>
              )}

              {productData.sealingHead?.tensionPower && (
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                  <Settings className="h-12 w-12 text-[#FFB81C] mb-4" />
                  <h3 className="text-lg text-gray-400 mb-2">Maximum Tension</h3>
                  <p className="text-5xl font-black text-white">
                    {productData.sealingHead.tensionPower.max}
                  </p>
                  <p className="text-xl text-gray-500 mt-2">
                    {productData.sealingHead.tensionPower.unit}
                  </p>
                </div>
              )}

              {productData.performance?.standardChainLength && (
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                  <Ruler className="h-12 w-12 text-[#FFB81C] mb-4" />
                  <h3 className="text-lg text-gray-400 mb-2">Chain Length</h3>
                  <p className="text-5xl font-black text-white">
                    {productData.performance.standardChainLength}
                  </p>
                  <p className="text-xl text-gray-500 mt-2">
                    {productData.performance.chainLengthUnit}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slide 3: Battery Technology */}
      {productData.battery && productData.battery.type !== 'None - Manual Operation' && (
        <section data-section className="min-h-screen flex items-center justify-center relative">
          <div className="max-w-7xl mx-auto px-8 sm:px-12">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
            >
              {/* Section Title */}
              <div className="text-center mb-20">
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 ${
                  isLithium
                    ? 'bg-amber-500/20 border border-amber-500/50'
                    : 'bg-white/10 border border-white/20'
                }`}>
                  <Battery className={`h-6 w-6 ${isLithium ? 'text-amber-400' : 'text-gray-400'}`} />
                  <span className={`text-sm font-bold tracking-wider ${
                    isLithium ? 'text-amber-400' : 'text-gray-400'
                  }`}>
                    {isLithium ? 'LITHIUM-ION TECHNOLOGY' : 'RELIABLE POWER'}
                  </span>
                </div>
                <h2 className="text-6xl sm:text-7xl font-black text-white mb-6">
                  {isLithium ? '3.4x More Cycles' : 'Proven Performance'}
                </h2>
                <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
                  {isLithium
                    ? 'Advanced lithium-ion battery delivers superior performance and longevity'
                    : 'Dependable lead-fleece battery technology for consistent operation'
                  }
                </p>
              </div>

              {/* Battery Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`rounded-2xl p-8 border-2 ${
                  isLithium
                    ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/30'
                    : 'bg-white/5 border-white/10'
                }`}>
                  <h3 className="text-sm text-gray-400 mb-2">Battery Type</h3>
                  <p className={`text-2xl font-bold ${isLithium ? 'text-amber-400' : 'text-white'}`}>
                    {isLithium ? 'Lithium-Ion' : 'Lead-Fleece'}
                  </p>
                </div>

                {productData.battery.strappingCycles && (
                  <div className={`rounded-2xl p-8 border-2 ${
                    isLithium
                      ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <h3 className="text-sm text-gray-400 mb-2">Cycles per Charge</h3>
                    <p className={`text-2xl font-bold ${isLithium ? 'text-amber-400' : 'text-white'}`}>
                      {productData.battery.strappingCycles}
                    </p>
                  </div>
                )}

                {productData.battery.loadingTime && (
                  <div className={`rounded-2xl p-8 border-2 ${
                    isLithium
                      ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <h3 className="text-sm text-gray-400 mb-2">Charge Time</h3>
                    <p className={`text-2xl font-bold ${isLithium ? 'text-amber-400' : 'text-white'}`}>
                      {typeof productData.battery.loadingTime === 'object'
                        ? `${productData.battery.loadingTime.min}-${productData.battery.loadingTime.max}`
                        : productData.battery.loadingTime
                      }
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {productData.battery.loadingTimeUnit || 'hours'}
                    </p>
                  </div>
                )}

                {productData.battery.weight && (
                  <div className={`rounded-2xl p-8 border-2 ${
                    isLithium
                      ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/30'
                      : 'bg-white/5 border-white/10'
                  }`}>
                    <h3 className="text-sm text-gray-400 mb-2">Battery Weight</h3>
                    <p className={`text-2xl font-bold ${isLithium ? 'text-amber-400' : 'text-white'}`}>
                      {productData.battery.weight} {productData.battery.weightUnit}
                    </p>
                  </div>
                )}
              </div>

              {/* Lithium Advantages */}
              {isLithium && (
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6">
                    <div className="text-5xl font-black text-amber-400 mb-2">65%</div>
                    <p className="text-gray-400">Faster Chain Speed</p>
                  </div>
                  <div className="text-center p-6">
                    <div className="text-5xl font-black text-amber-400 mb-2">60%</div>
                    <p className="text-gray-400">Lighter Battery</p>
                  </div>
                  <div className="text-center p-6">
                    <div className="text-5xl font-black text-amber-400 mb-2">70%</div>
                    <p className="text-gray-400">Faster Charging</p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Slide 4: Flexibility & Dimensions */}
      <section data-section className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Section Title */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#C8102E]/20 border border-[#C8102E]/50 mb-6">
                <Box className="h-6 w-6 text-[#FFB81C]" />
                <span className="text-sm font-bold text-[#FFB81C] tracking-wider">FLEXIBILITY</span>
              </div>
              <h2 className="text-6xl sm:text-7xl font-black text-white mb-6">
                Versatile Coverage
              </h2>
              <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
                Handles a wide range of pallet sizes with precision
              </p>
            </div>

            {/* Flexibility Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Pallet Range */}
              {productData.flexibility && (
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-white mb-6">Pallet Coverage</h3>

                  {productData.flexibility.palletWidth && (
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                      <h4 className="text-lg text-gray-400 mb-4">Pallet Width Range</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Minimum</p>
                          <p className="text-3xl font-bold text-white">
                            {productData.flexibility.palletWidth.min} {productData.flexibility.palletWidth.unit}
                          </p>
                        </div>
                        <div className="text-3xl text-[#C8102E]">↔</div>
                        <div>
                          <p className="text-sm text-gray-500">Maximum</p>
                          <p className="text-3xl font-bold text-white">
                            {productData.flexibility.palletWidth.max} {productData.flexibility.palletWidth.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {productData.flexibility.palletHeight && (
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                      <h4 className="text-lg text-gray-400 mb-4">Pallet Height Range</h4>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">Minimum</p>
                          <p className="text-3xl font-bold text-white">
                            {productData.flexibility.palletHeight.min} {productData.flexibility.palletHeight.unit}
                          </p>
                        </div>
                        <div className="text-3xl text-[#C8102E]">↕</div>
                        <div>
                          <p className="text-sm text-gray-500">Maximum</p>
                          <p className="text-3xl font-bold text-white">
                            {productData.flexibility.palletHeight.max} {productData.flexibility.palletHeight.unit}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* System Dimensions */}
              {productData.system && (
                <div className="space-y-8">
                  <h3 className="text-3xl font-bold text-white mb-6">System Specifications</h3>

                  {productData.system.dimensions && (
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                      <h4 className="text-lg text-gray-400 mb-6">Machine Dimensions</h4>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Length</span>
                          <span className="text-2xl font-bold text-white">
                            {productData.system.dimensions.length} {productData.system.dimensions.unit}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Width</span>
                          <span className="text-2xl font-bold text-white">
                            {productData.system.dimensions.width} {productData.system.dimensions.unit}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Height</span>
                          <span className="text-2xl font-bold text-white">
                            {productData.system.dimensions.height} {productData.system.dimensions.unit}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}

                  {productData.system.weight && (
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                      <Weight className="h-12 w-12 text-[#FFB81C] mb-4" />
                      <h4 className="text-lg text-gray-400 mb-2">Total System Weight</h4>
                      <p className="text-5xl font-black text-white">
                        {productData.system.weight}
                      </p>
                      <p className="text-xl text-gray-500 mt-2">
                        {productData.system.weightUnit}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Slide 5: Features & Certifications */}
      <section data-section className="min-h-screen flex items-center justify-center relative">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            {/* Section Title */}
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#C8102E]/20 border border-[#C8102E]/50 mb-6">
                <Award className="h-6 w-6 text-[#FFB81C]" />
                <span className="text-sm font-bold text-[#FFB81C] tracking-wider">EXCELLENCE</span>
              </div>
              <h2 className="text-6xl sm:text-7xl font-black text-white mb-6">
                Premium Features
              </h2>
              <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto">
                Certified quality with advanced capabilities
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Included Features */}
              {productData.includedFeatures && productData.includedFeatures.length > 0 && (
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8">Included Features</h3>
                  <div className="space-y-4">
                    {productData.includedFeatures.map((feature: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10"
                      >
                        <CheckCircle2 className="h-6 w-6 text-[#C8102E] flex-shrink-0 mt-1" />
                        <span className="text-lg text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Certifications */}
              {productData.certifications && productData.certifications.length > 0 && (
                <div>
                  <h3 className="text-3xl font-bold text-white mb-8">Certifications</h3>
                  <div className="space-y-4">
                    {productData.certifications.map((cert: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-4 p-6 rounded-xl bg-gradient-to-br from-[#C8102E]/10 to-red-900/5 border border-[#C8102E]/30"
                      >
                        <Award className="h-8 w-8 text-[#FFB81C] flex-shrink-0" />
                        <div>
                          <span className="text-xl font-semibold text-white block">{cert}</span>
                          <span className="text-sm text-gray-400">Certified Standard</span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Strap Materials */}
            {productData.sealingHead?.strapMaterials && (
              <div className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10">
                <h3 className="text-2xl font-bold text-white mb-6">Compatible Strap Materials</h3>
                <div className="flex flex-wrap gap-4">
                  {productData.sealingHead.strapMaterials.map((material: string, index: number) => (
                    <div
                      key={index}
                      className="px-6 py-3 rounded-full bg-[#C8102E]/20 border border-[#C8102E]/50 text-white font-medium"
                    >
                      {material}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
