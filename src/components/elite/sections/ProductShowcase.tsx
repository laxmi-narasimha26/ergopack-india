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
  Weight,
  Layers,
  Target,
  TrendingUp,
  Shield,
  Clock,
  BarChart,
  Activity
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
    return `/images/products/${folderName}/0.jpg`;
  };

  return (
    <div className="space-y-0">
      {/* Hero Section - Full viewport with split design */}
      <section data-section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C8102E_0%,transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Premium Product Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8102E]/30 to-transparent rounded-3xl blur-3xl" />
              <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 backdrop-blur-sm p-8 bg-gradient-to-br from-white/5 to-transparent">
                <Image
                  src={getProductImagePath()}
                  alt={`${productData.fullName} - Industrial Strapping Machine`}
                  fill
                  className="object-contain drop-shadow-2xl"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </motion.div>

            {/* Right: Product Overview */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              {/* Product Line Badge */}
              <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 ${
                isXpert
                  ? 'bg-gradient-to-r from-[#C8102E]/20 to-red-900/20 border-[#C8102E]'
                  : 'bg-white/10 border-white/30'
              }`}>
                <Package className={`h-6 w-6 ${isXpert ? 'text-[#FFB81C]' : 'text-white'}`} />
                <span className={`font-bold tracking-wide text-lg ${isXpert ? 'text-[#FFB81C]' : 'text-white'}`}>
                  {productData.line}
                </span>
              </div>

              {/* Model Name */}
              <div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-4 text-white">
                  {productData.model}
                </h1>
                <p className="text-2xl sm:text-3xl text-gray-300 font-light leading-relaxed">
                  {productData.fullName}
                </p>
              </div>

              {/* Application Type */}
              <div className={`inline-block px-8 py-4 rounded-2xl text-xl font-bold ${
                isXpert
                  ? 'bg-gradient-to-r from-[#C8102E] to-red-700 text-white'
                  : 'bg-white/20 text-gray-200'
              }`}>
                {productData.applicationType}
              </div>

              {/* Description */}
              <p className="text-xl text-gray-400 leading-relaxed">
                {productData.description}
              </p>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-6">
                {productData.performance?.chainSpeed && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
                    <Zap className="h-8 w-8 text-[#FFB81C] mb-3" />
                    <div className="text-sm text-gray-400 mb-1">Chain Speed</div>
                    <div className="text-3xl font-black text-white">
                      {productData.performance.chainSpeed}
                    </div>
                    <div className="text-sm text-gray-500">{productData.performance.chainSpeedUnit}</div>
                  </div>
                )}

                {productData.battery?.strappingCycles && (
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm">
                    <Battery className="h-8 w-8 text-[#FFB81C] mb-3" />
                    <div className="text-sm text-gray-400 mb-1">Cycles/Charge</div>
                    <div className="text-3xl font-black text-white">
                      {productData.battery.strappingCycles}
                    </div>
                    <div className="text-sm text-gray-500">cycles</div>
                  </div>
                )}
              </div>

              <motion.div
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-[#C8102E] text-2xl font-mono"
              >
                ↓ SCROLL FOR FULL SPECIFICATIONS ↓
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Performance & Power Section */}
      <section data-section className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-black via-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#C8102E]/20 border border-[#C8102E] mb-6">
                <Gauge className="h-6 w-6 text-[#FFB81C]" />
                <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Performance Metrics</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
                Engineered For Maximum Efficiency
              </h2>
              <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                Precision engineering delivers consistent, reliable performance across all operational parameters
              </p>
            </div>

            {/* Performance Grid - Flowing Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Chain Speed */}
              {productData.performance?.chainSpeed && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 via-transparent to-transparent border border-[#C8102E]/30 hover:border-[#C8102E] transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8102E]/10 rounded-full blur-3xl group-hover:bg-[#C8102E]/20 transition-all duration-500" />
                  <Zap className="h-12 w-12 text-[#FFB81C] mb-6" />
                  <h3 className="text-lg text-gray-400 mb-3 font-medium">Chain Speed</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-6xl font-black text-white">
                      {productData.performance.chainSpeed}
                    </p>
                    <p className="text-2xl text-gray-500 font-light">
                      {productData.performance.chainSpeedUnit || 'm/min'}
                    </p>
                  </div>
                  <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#C8102E] to-[#FFB81C] transition-all duration-500" />
                </motion.div>
              )}

              {/* Tension Power */}
              {productData.sealingHead?.tensionPower && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 via-transparent to-transparent border border-[#C8102E]/30 hover:border-[#C8102E] transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8102E]/10 rounded-full blur-3xl group-hover:bg-[#C8102E]/20 transition-all duration-500" />
                  <Target className="h-12 w-12 text-[#FFB81C] mb-6" />
                  <h3 className="text-lg text-gray-400 mb-3 font-medium">Tension Power Range</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Minimum</span>
                      <span className="text-2xl font-bold text-white">
                        {productData.sealingHead.tensionPower.min} {productData.sealingHead.tensionPower.unit}
                      </span>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-[#C8102E]/50 to-[#FFB81C]/50 rounded-full" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Maximum</span>
                      <span className="text-2xl font-bold text-white">
                        {productData.sealingHead.tensionPower.max} {productData.sealingHead.tensionPower.unit}
                      </span>
                    </div>
                  </div>
                  <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#C8102E] to-[#FFB81C] transition-all duration-500" />
                </motion.div>
              )}

              {/* Chain Length */}
              {productData.performance?.standardChainLength && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 via-transparent to-transparent border border-[#C8102E]/30 hover:border-[#C8102E] transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8102E]/10 rounded-full blur-3xl group-hover:bg-[#C8102E]/20 transition-all duration-500" />
                  <Ruler className="h-12 w-12 text-[#FFB81C] mb-6" />
                  <h3 className="text-lg text-gray-400 mb-3 font-medium">Standard Chain Length</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-6xl font-black text-white">
                      {productData.performance.standardChainLength}
                    </p>
                    <p className="text-2xl text-gray-500 font-light">
                      {productData.performance.chainLengthUnit}
                    </p>
                  </div>
                  <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#C8102E] to-[#FFB81C] transition-all duration-500" />
                </motion.div>
              )}

              {/* System Weight */}
              {productData.system?.weight && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 via-transparent to-transparent border border-[#C8102E]/30 hover:border-[#C8102E] transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8102E]/10 rounded-full blur-3xl group-hover:bg-[#C8102E]/20 transition-all duration-500" />
                  <Weight className="h-12 w-12 text-[#FFB81C] mb-6" />
                  <h3 className="text-lg text-gray-400 mb-3 font-medium">Total System Weight</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-6xl font-black text-white">
                      {productData.system.weight}
                    </p>
                    <p className="text-2xl text-gray-500 font-light">
                      {productData.system.weightUnit}
                    </p>
                  </div>
                  <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#C8102E] to-[#FFB81C] transition-all duration-500" />
                </motion.div>
              )}

              {/* Strap Width Range */}
              {productData.sealingHead?.strapWidth && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 via-transparent to-transparent border border-[#C8102E]/30 hover:border-[#C8102E] transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8102E]/10 rounded-full blur-3xl group-hover:bg-[#C8102E]/20 transition-all duration-500" />
                  <Layers className="h-12 w-12 text-[#FFB81C] mb-6" />
                  <h3 className="text-lg text-gray-400 mb-3 font-medium">Strap Width Range</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-black text-white">
                      {productData.sealingHead.strapWidth.min}-{productData.sealingHead.strapWidth.max}
                    </p>
                    <p className="text-2xl text-gray-500 font-light">
                      {productData.sealingHead.strapWidth.unit}
                    </p>
                  </div>
                  <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#C8102E] to-[#FFB81C] transition-all duration-500" />
                </motion.div>
              )}

              {/* Strap Thickness */}
              {productData.sealingHead?.strapThickness && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="group relative p-8 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 via-transparent to-transparent border border-[#C8102E]/30 hover:border-[#C8102E] transition-all duration-500"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8102E]/10 rounded-full blur-3xl group-hover:bg-[#C8102E]/20 transition-all duration-500" />
                  <Activity className="h-12 w-12 text-[#FFB81C] mb-6" />
                  <h3 className="text-lg text-gray-400 mb-3 font-medium">Strap Thickness Range</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-black text-white">
                      {productData.sealingHead.strapThickness.min}-{productData.sealingHead.strapThickness.max}
                    </p>
                    <p className="text-2xl text-gray-500 font-light">
                      {productData.sealingHead.strapThickness.unit}
                    </p>
                  </div>
                  <div className="mt-4 h-1 w-0 group-hover:w-full bg-gradient-to-r from-[#C8102E] to-[#FFB81C] transition-all duration-500" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Battery Technology Section */}
      {productData.battery && productData.battery.type !== 'None - Manual Operation' && (
        <section data-section className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-black via-gray-900 to-black py-20">
          <div className="max-w-7xl mx-auto px-8 sm:px-12 w-full">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 ${
                  isLithium
                    ? 'bg-amber-500/20 border border-amber-500'
                    : 'bg-white/10 border border-white/30'
                }`}>
                  <Battery className={`h-6 w-6 ${isLithium ? 'text-amber-400' : 'text-gray-300'}`} />
                  <span className={`text-sm font-bold tracking-wider uppercase ${
                    isLithium ? 'text-amber-400' : 'text-gray-300'
                  }`}>
                    {isLithium ? 'Advanced Lithium-Ion Technology' : 'Reliable Power System'}
                  </span>
                </div>
                <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
                  {isLithium ? 'Next-Generation Battery Performance' : 'Proven Battery Technology'}
                </h2>
                <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                  {isLithium
                    ? 'Advanced lithium-ion technology delivers 3.4x more cycles, 65% faster operation, and 60% weight reduction'
                    : 'Dependable lead-fleece battery technology ensures consistent, reliable power for all-day operation'
                  }
                </p>
              </div>

              {/* Battery Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {/* Battery Type */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className={`p-8 rounded-2xl border-2 ${
                    isLithium
                      ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/50'
                      : 'bg-white/5 border-white/20'
                  }`}
                >
                  <h3 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Battery Type</h3>
                  <p className={`text-3xl font-bold leading-tight ${isLithium ? 'text-amber-400' : 'text-white'}`}>
                    {isLithium ? 'Lithium-Ion' : 'Lead-Fleece'}
                  </p>
                </motion.div>

                {/* Strapping Cycles */}
                {productData.battery.strappingCycles && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className={`p-8 rounded-2xl border-2 ${
                      isLithium
                        ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/50'
                        : 'bg-white/5 border-white/20'
                    }`}
                  >
                    <h3 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Cycles per Charge</h3>
                    <p className={`text-4xl font-bold ${isLithium ? 'text-amber-400' : 'text-white'}`}>
                      {productData.battery.strappingCycles}
                    </p>
                  </motion.div>
                )}

                {/* Loading Time */}
                {productData.battery.loadingTime && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className={`p-8 rounded-2xl border-2 ${
                      isLithium
                        ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/50'
                        : 'bg-white/5 border-white/20'
                    }`}
                  >
                    <h3 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Charge Time</h3>
                    <p className={`text-3xl font-bold ${isLithium ? 'text-amber-400' : 'text-white'}`}>
                      {typeof productData.battery.loadingTime === 'object'
                        ? `${productData.battery.loadingTime.min}-${productData.battery.loadingTime.max}`
                        : productData.battery.loadingTime
                      }
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {typeof productData.battery.loadingTime === 'object' ? productData.battery.loadingTime.unit || 'hours' : 'hours'}
                    </p>
                  </motion.div>
                )}

                {/* Battery Weight */}
                {productData.battery.weight && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className={`p-8 rounded-2xl border-2 ${
                      isLithium
                        ? 'bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-amber-500/50'
                        : 'bg-white/5 border-white/20'
                    }`}
                  >
                    <h3 className="text-sm text-gray-400 mb-3 uppercase tracking-wider">Battery Weight</h3>
                    <p className={`text-4xl font-bold ${isLithium ? 'text-amber-400' : 'text-white'}`}>
                      {productData.battery.weight} <span className="text-2xl">{productData.battery.weightUnit}</span>
                    </p>
                  </motion.div>
                )}
              </div>

              {/* Lithium-Ion Advantages */}
              {isLithium && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-2 border-amber-500/30"
                >
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                    <div className="text-6xl font-black text-amber-400 mb-2">65%</div>
                    <p className="text-lg text-gray-300 font-medium">Faster Chain Speed</p>
                    <p className="text-sm text-gray-500 mt-2">vs. lead-fleece technology</p>
                  </div>
                  <div className="text-center">
                    <Battery className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                    <div className="text-6xl font-black text-amber-400 mb-2">60%</div>
                    <p className="text-lg text-gray-300 font-medium">Lighter Battery</p>
                    <p className="text-sm text-gray-500 mt-2">Enhanced maneuverability</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                    <div className="text-6xl font-black text-amber-400 mb-2">70%</div>
                    <p className="text-lg text-gray-300 font-medium">Faster Charging</p>
                    <p className="text-sm text-gray-500 mt-2">Minimize downtime</p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Flexibility & Coverage Section */}
      <section data-section className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-black via-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#C8102E]/20 border border-[#C8102E] mb-6">
                <Box className="h-6 w-6 text-[#FFB81C]" />
                <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Operational Flexibility</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
                Versatile Pallet Coverage
              </h2>
              <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                Engineered to handle a wide range of pallet sizes with precision and consistency
              </p>
            </div>

            {/* Flexibility Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Pallet Width Range */}
              {productData.flexibility?.palletWidth && (
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm"
                >
                  <Ruler className="h-12 w-12 text-[#FFB81C] mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-8">Pallet Width Coverage</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Minimum Width</p>
                        <p className="text-4xl font-black text-white">
                          {productData.flexibility.palletWidth.min} <span className="text-2xl text-gray-400">{productData.flexibility.palletWidth.unit}</span>
                        </p>
                      </div>
                      <div className="text-4xl text-[#C8102E]">←</div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-[#C8102E] to-[#FFB81C] rounded-full" />
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5">
                      <div className="text-4xl text-[#C8102E]">→</div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Maximum Width</p>
                        <p className="text-4xl font-black text-white">
                          {productData.flexibility.palletWidth.max} <span className="text-2xl text-gray-400">{productData.flexibility.palletWidth.unit}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Pallet Height Range */}
              {productData.flexibility?.palletHeight && (
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-10 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 backdrop-blur-sm"
                >
                  <BarChart className="h-12 w-12 text-[#FFB81C] mb-6" />
                  <h3 className="text-2xl font-bold text-white mb-8">Pallet Height Coverage</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Minimum Height</p>
                        <p className="text-4xl font-black text-white">
                          {productData.flexibility.palletHeight.min} <span className="text-2xl text-gray-400">{productData.flexibility.palletHeight.unit}</span>
                        </p>
                      </div>
                      <div className="text-4xl text-[#C8102E]">↓</div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-[#C8102E] to-[#FFB81C] rounded-full" />
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5">
                      <div className="text-4xl text-[#C8102E]">↑</div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500 mb-1">Maximum Height</p>
                        <p className="text-4xl font-black text-white">
                          {productData.flexibility.palletHeight.max} <span className="text-2xl text-gray-400">{productData.flexibility.palletHeight.unit}</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* System Dimensions */}
            {productData.system?.dimensions && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <div className="flex items-center gap-4 mb-8">
                  <Settings className="h-12 w-12 text-[#FFB81C]" />
                  <h3 className="text-3xl font-bold text-white">Machine Dimensions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Length</p>
                    <p className="text-4xl font-black text-white">
                      {productData.system.dimensions.length} <span className="text-xl text-gray-500">{productData.system.dimensions.unit}</span>
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Width</p>
                    <p className="text-4xl font-black text-white">
                      {productData.system.dimensions.width} <span className="text-xl text-gray-500">{productData.system.dimensions.unit}</span>
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-sm text-gray-400 mb-2 uppercase tracking-wider">Height</p>
                    <p className="text-4xl font-black text-white">
                      {productData.system.dimensions.height} <span className="text-xl text-gray-500">{productData.system.dimensions.unit}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Materials & Features Section */}
      <section data-section className="min-h-screen flex items-center justify-center relative bg-gradient-to-b from-black via-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-8 sm:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Section Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#C8102E]/20 border border-[#C8102E] mb-6">
                <CheckCircle2 className="h-6 w-6 text-[#FFB81C]" />
                <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Materials & Features</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
                Premium Construction & Compatibility
              </h2>
              <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                Built with professional-grade materials and comprehensive feature set for demanding industrial applications
              </p>
            </div>

            {/* Compatible Strap Materials */}
            {productData.sealingHead?.strapMaterials && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16 p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <div className="flex items-center gap-4 mb-8">
                  <Layers className="h-12 w-12 text-[#FFB81C]" />
                  <h3 className="text-3xl font-bold text-white">Compatible Strap Materials</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                  {productData.sealingHead.strapMaterials.map((material: string, index: number) => (
                    <div
                      key={index}
                      className="px-8 py-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/20 text-white text-lg font-semibold"
                    >
                      {material}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Included Features List */}
            {productData.includedFeatures && productData.includedFeatures.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-16"
              >
                <h3 className="text-3xl font-bold text-white mb-8">Included Features</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {productData.includedFeatures.map((feature: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-[#C8102E]/50 transition-all duration-300"
                    >
                      <CheckCircle2 className="h-6 w-6 text-[#C8102E] flex-shrink-0 mt-1" />
                      <span className="text-lg text-gray-200 leading-relaxed">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Certifications */}
            {productData.certifications && productData.certifications.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <div className="flex items-center gap-4 mb-8">
                  <Award className="h-12 w-12 text-[#FFB81C]" />
                  <h3 className="text-3xl font-bold text-white">Certifications & Standards</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {productData.certifications.map((cert: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30"
                    >
                      <Shield className="h-10 w-10 text-amber-400 flex-shrink-0" />
                      <div>
                        <p className="text-xl font-bold text-white">{cert}</p>
                        <p className="text-sm text-gray-400 mt-1">Certified Standard</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
