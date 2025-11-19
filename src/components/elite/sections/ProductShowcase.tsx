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
      <section data-section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-theme-primary">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C8102E_0%,transparent_50%)]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left: Premium Product Image - OPTIMIZED SIZE */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative max-w-lg mx-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#C8102E]/20 to-transparent rounded-3xl blur-3xl" />
              <div className="relative rounded-3xl overflow-hidden border border-white/10 dark:border-white/10 border-gray-200 backdrop-blur-sm p-8 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5">
                <div className="relative w-full h-[400px]">
                  <Image
                    src={getProductImagePath()}
                    alt={`${productData.fullName} - Industrial Strapping Machine`}
                    fill
                    className="object-contain drop-shadow-2xl"
                    sizes="(max-width: 1024px) 100vw, 500px"
                    priority
                  />
                </div>
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
                <Package className={`h-6 w-6 ${isXpert ? 'text-[#FFB81C]' : 'text-theme-primary'}`} />
                <span className={`font-bold tracking-wide text-lg ${isXpert ? 'text-[#FFB81C]' : 'text-theme-primary'}`}>
                  {productData.line}
                </span>
              </div>

              {/* Model Name */}
              <div>
                <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tighter mb-4 text-theme-primary">
                  {productData.model}
                </h1>
                <p className="text-2xl sm:text-3xl text-theme-secondary font-light leading-relaxed">
                  {productData.fullName}
                </p>
              </div>

              {/* Application Type */}
              <div className={`inline-block px-8 py-4 rounded-2xl text-xl font-bold ${
                isXpert
                  ? 'bg-gradient-to-r from-[#C8102E] to-red-700 text-theme-primary'
                  : 'bg-white/20 text-gray-200'
              }`}>
                {productData.applicationType}
              </div>

              {/* Description */}
              <p className="text-xl text-theme-secondary leading-relaxed">
                {productData.description}
              </p>

              {/* Quick Specs Grid */}
              <div className="grid grid-cols-2 gap-6">
                {productData.performance?.chainSpeed && (
                  <div className="p-6 rounded-2xl glass-theme">
                    <Zap className="h-8 w-8 text-[#FFB81C] mb-3" />
                    <div className="text-sm text-theme-secondary mb-1">Chain Speed</div>
                    <div className="text-3xl font-black text-theme-primary">
                      {productData.performance.chainSpeed}
                    </div>
                    <div className="text-sm text-theme-secondary">{productData.performance.chainSpeedUnit}</div>
                  </div>
                )}

                {productData.battery?.strappingCycles && (
                  <div className="p-6 rounded-2xl glass-theme">
                    <Battery className="h-8 w-8 text-[#FFB81C] mb-3" />
                    <div className="text-sm text-theme-secondary mb-1">Cycles/Charge</div>
                    <div className="text-3xl font-black text-theme-primary">
                      {productData.battery.strappingCycles}
                    </div>
                    <div className="text-sm text-theme-secondary">cycles</div>
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
              <h2 className="text-5xl sm:text-6xl font-black text-theme-primary mb-6 leading-tight">
                Engineered For Maximum Efficiency
              </h2>
              <p className="text-2xl text-theme-secondary font-light max-w-3xl mx-auto leading-relaxed">
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
                  <h3 className="text-lg text-theme-secondary mb-3 font-medium">Chain Speed</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-6xl font-black text-theme-primary">
                      {productData.performance.chainSpeed}
                    </p>
                    <p className="text-2xl text-theme-secondary font-light">
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
                  <h3 className="text-lg text-theme-secondary mb-3 font-medium">Tension Power Range</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-theme-secondary">Minimum</span>
                      <span className="text-2xl font-bold text-theme-primary">
                        {productData.sealingHead.tensionPower.min} {productData.sealingHead.tensionPower.unit}
                      </span>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-[#C8102E]/50 to-[#FFB81C]/50 rounded-full" />
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-theme-secondary">Maximum</span>
                      <span className="text-2xl font-bold text-theme-primary">
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
                  <h3 className="text-lg text-theme-secondary mb-3 font-medium">Standard Chain Length</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-6xl font-black text-theme-primary">
                      {productData.performance.standardChainLength}
                    </p>
                    <p className="text-2xl text-theme-secondary font-light">
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
                  <h3 className="text-lg text-theme-secondary mb-3 font-medium">Total System Weight</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-6xl font-black text-theme-primary">
                      {productData.system.weight}
                    </p>
                    <p className="text-2xl text-theme-secondary font-light">
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
                  <h3 className="text-lg text-theme-secondary mb-3 font-medium">Strap Width Range</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-black text-theme-primary">
                      {productData.sealingHead.strapWidth.min}-{productData.sealingHead.strapWidth.max}
                    </p>
                    <p className="text-2xl text-theme-secondary font-light">
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
                  <h3 className="text-lg text-theme-secondary mb-3 font-medium">Strap Thickness Range</h3>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-black text-theme-primary">
                      {productData.sealingHead.strapThickness.min}-{productData.sealingHead.strapThickness.max}
                    </p>
                    <p className="text-2xl text-theme-secondary font-light">
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
                  <Battery className={`h-6 w-6 ${isLithium ? 'text-amber-400' : 'text-theme-secondary'}`} />
                  <span className={`text-sm font-bold tracking-wider uppercase ${
                    isLithium ? 'text-amber-400' : 'text-theme-secondary'
                  }`}>
                    {isLithium ? 'Advanced Lithium-Ion Technology' : 'Reliable Power System'}
                  </span>
                </div>
                <h2 className="text-5xl sm:text-6xl font-black text-theme-primary mb-6 leading-tight">
                  {isLithium ? 'Next-Generation Battery Performance' : 'Proven Battery Technology'}
                </h2>
                <p className="text-2xl text-theme-secondary font-light max-w-3xl mx-auto leading-relaxed">
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
                  <h3 className="text-sm text-theme-secondary mb-3 uppercase tracking-wider">Battery Type</h3>
                  <p className={`text-3xl font-bold leading-tight ${isLithium ? 'text-amber-400' : 'text-theme-primary'}`}>
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
                    <h3 className="text-sm text-theme-secondary mb-3 uppercase tracking-wider">Cycles per Charge</h3>
                    <p className={`text-4xl font-bold ${isLithium ? 'text-amber-400' : 'text-theme-primary'}`}>
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
                    <h3 className="text-sm text-theme-secondary mb-3 uppercase tracking-wider">Charge Time</h3>
                    <p className={`text-3xl font-bold ${isLithium ? 'text-amber-400' : 'text-theme-primary'}`}>
                      {typeof productData.battery.loadingTime === 'object'
                        ? `${productData.battery.loadingTime.min}-${productData.battery.loadingTime.max}`
                        : productData.battery.loadingTime
                      }
                    </p>
                    <p className="text-sm text-theme-secondary mt-1">
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
                    <h3 className="text-sm text-theme-secondary mb-3 uppercase tracking-wider">Battery Weight</h3>
                    <p className={`text-4xl font-bold ${isLithium ? 'text-amber-400' : 'text-theme-primary'}`}>
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
                    <p className="text-lg text-theme-secondary font-medium">Faster Chain Speed</p>
                    <p className="text-sm text-theme-secondary mt-2">vs. lead-fleece technology</p>
                  </div>
                  <div className="text-center">
                    <Battery className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                    <div className="text-6xl font-black text-amber-400 mb-2">60%</div>
                    <p className="text-lg text-theme-secondary font-medium">Lighter Battery</p>
                    <p className="text-sm text-theme-secondary mt-2">Enhanced maneuverability</p>
                  </div>
                  <div className="text-center">
                    <Clock className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                    <div className="text-6xl font-black text-amber-400 mb-2">70%</div>
                    <p className="text-lg text-theme-secondary font-medium">Faster Charging</p>
                    <p className="text-sm text-theme-secondary mt-2">Minimize downtime</p>
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
              <h2 className="text-5xl sm:text-6xl font-black text-theme-primary mb-6 leading-tight">
                Versatile Pallet Coverage
              </h2>
              <p className="text-2xl text-theme-secondary font-light max-w-3xl mx-auto leading-relaxed">
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
                  className="p-10 rounded-3xl glass-theme"
                >
                  <Ruler className="h-12 w-12 text-[#FFB81C] mb-6" />
                  <h3 className="text-2xl font-bold text-theme-primary mb-8">Pallet Width Coverage</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5">
                      <div>
                        <p className="text-sm text-theme-secondary mb-1">Minimum Width</p>
                        <p className="text-4xl font-black text-theme-primary">
                          {productData.flexibility.palletWidth.min} <span className="text-2xl text-theme-secondary">{productData.flexibility.palletWidth.unit}</span>
                        </p>
                      </div>
                      <div className="text-4xl text-[#C8102E]">←</div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-[#C8102E] to-[#FFB81C] rounded-full" />
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5">
                      <div className="text-4xl text-[#C8102E]">→</div>
                      <div className="text-right">
                        <p className="text-sm text-theme-secondary mb-1">Maximum Width</p>
                        <p className="text-4xl font-black text-theme-primary">
                          {productData.flexibility.palletWidth.max} <span className="text-2xl text-theme-secondary">{productData.flexibility.palletWidth.unit}</span>
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
                  className="p-10 rounded-3xl glass-theme"
                >
                  <BarChart className="h-12 w-12 text-[#FFB81C] mb-6" />
                  <h3 className="text-2xl font-bold text-theme-primary mb-8">Pallet Height Coverage</h3>
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5">
                      <div>
                        <p className="text-sm text-theme-secondary mb-1">Minimum Height</p>
                        <p className="text-4xl font-black text-theme-primary">
                          {productData.flexibility.palletHeight.min} <span className="text-2xl text-theme-secondary">{productData.flexibility.palletHeight.unit}</span>
                        </p>
                      </div>
                      <div className="text-4xl text-[#C8102E]">↓</div>
                    </div>
                    <div className="h-1 bg-gradient-to-r from-[#C8102E] to-[#FFB81C] rounded-full" />
                    <div className="flex items-center justify-between p-6 rounded-2xl bg-white/5">
                      <div className="text-4xl text-[#C8102E]">↑</div>
                      <div className="text-right">
                        <p className="text-sm text-theme-secondary mb-1">Maximum Height</p>
                        <p className="text-4xl font-black text-theme-primary">
                          {productData.flexibility.palletHeight.max} <span className="text-2xl text-theme-secondary">{productData.flexibility.palletHeight.unit}</span>
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
                  <h3 className="text-3xl font-bold text-theme-primary">Machine Dimensions</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-sm text-theme-secondary mb-2 uppercase tracking-wider">Length</p>
                    <p className="text-4xl font-black text-theme-primary">
                      {productData.system.dimensions.length} <span className="text-xl text-theme-secondary">{productData.system.dimensions.unit}</span>
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-sm text-theme-secondary mb-2 uppercase tracking-wider">Width</p>
                    <p className="text-4xl font-black text-theme-primary">
                      {productData.system.dimensions.width} <span className="text-xl text-theme-secondary">{productData.system.dimensions.unit}</span>
                    </p>
                  </div>
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-sm text-theme-secondary mb-2 uppercase tracking-wider">Height</p>
                    <p className="text-4xl font-black text-theme-primary">
                      {productData.system.dimensions.height} <span className="text-xl text-theme-secondary">{productData.system.dimensions.unit}</span>
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
              <h2 className="text-5xl sm:text-6xl font-black text-theme-primary mb-6 leading-tight">
                Premium Construction & Compatibility
              </h2>
              <p className="text-2xl text-theme-secondary font-light max-w-3xl mx-auto leading-relaxed">
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
                  <h3 className="text-3xl font-bold text-theme-primary">Compatible Strap Materials</h3>
                </div>
                <div className="flex flex-wrap gap-4">
                  {productData.sealingHead.strapMaterials.map((material: string, index: number) => (
                    <div
                      key={index}
                      className="px-8 py-4 rounded-2xl glass-theme text-theme-primary text-lg font-semibold"
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
                <h3 className="text-3xl font-bold text-theme-primary mb-8">Included Features</h3>
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
                  <h3 className="text-3xl font-bold text-theme-primary">Certifications & Standards</h3>
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
                        <p className="text-xl font-bold text-theme-primary">{cert}</p>
                        <p className="text-sm text-theme-secondary mt-1">Certified Standard</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Advanced Technology & Innovation Section */}
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
                <Settings className="h-6 w-6 text-[#FFB81C]" />
                <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Advanced Technology</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-theme-primary mb-6 leading-tight">
                Cutting-Edge Engineering Innovation
              </h2>
              <p className="text-2xl text-theme-secondary font-light max-w-3xl mx-auto leading-relaxed">
                German precision engineering meets advanced automation for unmatched reliability and performance
              </p>
            </div>

            {/* Technology Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <Zap className="h-16 w-16 text-[#FFB81C] mb-6" />
                <h3 className="text-3xl font-bold text-theme-primary mb-4">Intelligent Control System</h3>
                <p className="text-lg text-theme-secondary leading-relaxed mb-6">
                  {isXpert
                    ? 'Siemens touchscreen interface provides intuitive control with programmable settings for different load types, tension requirements, and operational modes. Save up to 99 programs for instant recall.'
                    : 'Precision electromechanical control system ensures consistent strapping quality with reliable, repeatable performance across all operational parameters.'
                  }
                </p>
                <div className="space-y-3">
                  {isXpert ? (
                    <>
                      <div className="flex items-center gap-3 text-theme-secondary">
                        <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                        <span>7-inch color touchscreen display</span>
                      </div>
                      <div className="flex items-center gap-3 text-theme-secondary">
                        <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                        <span>Multi-language support (12+ languages)</span>
                      </div>
                      <div className="flex items-center gap-3 text-theme-secondary">
                        <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                        <span>Real-time diagnostics & error reporting</span>
                      </div>
                      <div className="flex items-center gap-3 text-theme-secondary">
                        <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                        <span>Production counter & statistics tracking</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 text-theme-secondary">
                        <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                        <span>LED status indicators</span>
                      </div>
                      <div className="flex items-center gap-3 text-theme-secondary">
                        <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                        <span>Simple tactile controls</span>
                      </div>
                      <div className="flex items-center gap-3 text-theme-secondary">
                        <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                        <span>Reliable mechanical systems</span>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <Shield className="h-16 w-16 text-[#FFB81C] mb-6" />
                <h3 className="text-3xl font-bold text-theme-primary mb-4">Precision Sealing Technology</h3>
                <p className="text-lg text-theme-secondary leading-relaxed mb-6">
                  Advanced friction welding technology ensures 100% hermetic seals with consistent quality, creating tamper-evident closures that maintain their integrity throughout the entire supply chain journey.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-theme-secondary">
                    <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                    <span>Friction welding for maximum seal strength</span>
                  </div>
                  <div className="flex items-center gap-3 text-theme-secondary">
                    <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                    <span>Adjustable sealing temperature control</span>
                  </div>
                  <div className="flex items-center gap-3 text-theme-secondary">
                    <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                    <span>Multi-layer seal verification</span>
                  </div>
                  <div className="flex items-center gap-3 text-theme-secondary">
                    <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                    <span>Tamper-evident closure system</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <Target className="h-16 w-16 text-[#FFB81C] mb-6" />
                <h3 className="text-3xl font-bold text-theme-primary mb-4">Precision Tensioning System</h3>
                <p className="text-lg text-theme-secondary leading-relaxed mb-6">
                  Electronically controlled tension adjustment ensures optimal strap tightness for every load type, from fragile electronics to heavy machinery components, preventing damage while ensuring secure transport.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-theme-secondary">
                    <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                    <span>Digital tension force monitoring</span>
                  </div>
                  <div className="flex items-center gap-3 text-theme-secondary">
                    <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                    <span>Load-adaptive tension control</span>
                  </div>
                  <div className="flex items-center gap-3 text-theme-secondary">
                    <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                    <span>Programmable tension presets</span>
                  </div>
                  <div className="flex items-center gap-3 text-theme-secondary">
                    <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                    <span>Anti-damage protection algorithms</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <Activity className="h-16 w-16 text-[#FFB81C] mb-6" />
                <h3 className="text-3xl font-bold text-theme-primary mb-4">Ergonomic Design Excellence</h3>
                <p className="text-lg text-theme-secondary leading-relaxed mb-6">
                  Thoughtfully engineered for operator comfort and efficiency, reducing fatigue during extended operations while maximizing productivity and maintaining consistent strapping quality throughout shifts.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-theme-secondary">
                    <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                    <span>Optimized weight distribution</span>
                  </div>
                  <div className="flex items-center gap-3 text-theme-secondary">
                    <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                    <span>Intuitive control placement</span>
                  </div>
                  <div className="flex items-center gap-3 text-theme-secondary">
                    <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                    <span>Reduced vibration technology</span>
                  </div>
                  <div className="flex items-center gap-3 text-theme-secondary">
                    <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                    <span>Easy-access maintenance points</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Patented Technologies */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-10 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-2 border-amber-500/30"
            >
              <div className="text-center mb-12">
                <Award className="h-16 w-16 text-amber-400 mx-auto mb-6" />
                <h3 className="text-4xl font-bold text-theme-primary mb-4">Proprietary German Engineering</h3>
                <p className="text-xl text-theme-secondary max-w-3xl mx-auto">
                  40+ years of innovation with multiple patented technologies exclusive to ErgopackGermany
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center p-8 rounded-2xl bg-white/5">
                  <div className="text-5xl font-black text-amber-400 mb-3">ChainLance®</div>
                  <p className="text-theme-secondary leading-relaxed">
                    Patented chain guidance system for perfectly aligned strap placement every time
                  </p>
                </div>
                <div className="text-center p-8 rounded-2xl bg-white/5">
                  <div className="text-5xl font-black text-amber-400 mb-3">TrippleTool™</div>
                  <p className="text-theme-secondary leading-relaxed">
                    Revolutionary three-position tool head for versatile strapping angles and positions
                  </p>
                </div>
                <div className="text-center p-8 rounded-2xl bg-white/5">
                  <div className="text-5xl font-black text-amber-400 mb-3">SafeSeal®</div>
                  <p className="text-theme-secondary leading-relaxed">
                    Advanced seal verification technology ensuring tamper-evident load security
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Industrial Applications & Use Cases Section */}
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
                <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Industry Applications</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
                Trusted Across Critical Industries
              </h2>
              <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                Proven performance in the most demanding industrial environments worldwide
              </p>
            </div>

            {/* Industries Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="group p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30 hover:border-[#C8102E] transition-all duration-500"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#C8102E]/20 flex items-center justify-center mb-4">
                    <Shield className="h-10 w-10 text-[#FFB81C]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Pharmaceutical</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  GMP-compliant strapping ensuring tamper-evident security for high-value pharmaceutical shipments, clinical trial materials, and sensitive medical supplies.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>Regulatory compliance (FDA, GMP)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>Contamination prevention</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>Chain-of-custody documentation</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="group p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30 hover:border-[#C8102E] transition-all duration-500"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#C8102E]/20 flex items-center justify-center mb-4">
                    <Settings className="h-10 w-10 text-[#FFB81C]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Automotive</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Precision load securing for JIT manufacturing, protecting high-value components from assembly line to global distribution networks.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>Zero-defect transport standards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>VDA/AIAG compliance</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>Just-In-Time reliability</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="group p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30 hover:border-[#C8102E] transition-all duration-500"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#C8102E]/20 flex items-center justify-center mb-4">
                    <Zap className="h-10 w-10 text-[#FFB81C]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Electronics</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  ESD-safe strapping protecting sensitive electronic components, semiconductors, and finished consumer electronics from static and physical damage.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>ESD protection certified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>Vibration dampening</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>Moisture protection sealing</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="group p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30 hover:border-[#C8102E] transition-all duration-500"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#C8102E]/20 flex items-center justify-center mb-4">
                    <Package className="h-10 w-10 text-[#FFB81C]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Food & Beverage</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Food-grade materials and hygienic design for securing packaged goods, bottled products, and perishable items in temperature-controlled logistics.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>FDA food-contact approved</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>Washdown capability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>Cold storage compatible</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="group p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30 hover:border-[#C8102E] transition-all duration-500"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#C8102E]/20 flex items-center justify-center mb-4">
                    <Layers className="h-10 w-10 text-[#FFB81C]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Building Materials</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Heavy-duty strapping for construction materials, tiles, pipes, and bulk goods requiring maximum tension force and weather resistance.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>Maximum tension capability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>UV-resistant materials</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>Outdoor storage rated</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="group p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30 hover:border-[#C8102E] transition-all duration-500"
              >
                <div className="mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-[#C8102E]/20 flex items-center justify-center mb-4">
                    <Award className="h-10 w-10 text-[#FFB81C]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">E-Commerce & Logistics</h3>
                </div>
                <p className="text-gray-300 leading-relaxed mb-6">
                  High-volume fulfillment center operations requiring rapid strapping cycles, minimal downtime, and consistent quality across millions of shipments.
                </p>
                <div className="space-y-2 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>Maximum throughput speed</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-[#C8102E]" />
                    <span>Multi-shift reliability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#C8102E]" />
                    <span>Minimal training required</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ROI & Business Benefits Section */}
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
                <TrendingUp className="h-6 w-6 text-[#FFB81C]" />
                <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Return On Investment</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
                Proven ROI & Cost Savings
              </h2>
              <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                Quantifiable business benefits that justify your investment from day one
              </p>
            </div>

            {/* ROI Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-[#C8102E]/20 flex items-center justify-center">
                    <Clock className="h-12 w-12 text-[#FFB81C]" />
                  </div>
                  <div>
                    <div className="text-5xl font-black text-white">45s</div>
                    <div className="text-sm text-gray-400 mt-1">Per Pallet Cycle Time</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Productivity Gains</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {isXpert
                    ? 'Process up to 80 pallets per hour with X-pert Line lithium-ion technology - 65% faster than conventional lead-battery systems. Operators can complete entire warehouse sections in half the time.'
                    : 'Reliable 60-cycle-per-hour performance ensures consistent productivity throughout your shift, with proven uptime exceeding 99.5% in industrial environments.'
                  }
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-3xl font-black text-[#C8102E] mb-1">
                      {isXpert ? '80+' : '60+'}
                    </div>
                    <div className="text-xs text-gray-400">Pallets/Hour</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-3xl font-black text-[#C8102E] mb-1">99.5%</div>
                    <div className="text-xs text-gray-400">Uptime</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-[#C8102E]/20 flex items-center justify-center">
                    <BarChart className="h-12 w-12 text-[#FFB81C]" />
                  </div>
                  <div>
                    <div className="text-5xl font-black text-white">85%</div>
                    <div className="text-sm text-gray-400 mt-1">Damage Reduction</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Quality & Loss Prevention</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Precision tensioning eliminates over-tightening damage and under-tensioning failures. Customers report 85% reduction in transit damage claims and complete elimination of strap-related product losses.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-3xl font-black text-[#C8102E] mb-1">₹0</div>
                    <div className="text-xs text-gray-400">Damage Claims</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-3xl font-black text-[#C8102E] mb-1">100%</div>
                    <div className="text-xs text-gray-400">Consistency</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-[#C8102E]/20 flex items-center justify-center">
                    <Battery className="h-12 w-12 text-[#FFB81C]" />
                  </div>
                  <div>
                    <div className="text-5xl font-black text-white">
                      {isLithium ? '70%' : '40%'}
                    </div>
                    <div className="text-sm text-gray-400 mt-1">Labor Cost Reduction</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Operational Efficiency</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {isLithium
                    ? 'Lithium-ion battery technology eliminates battery change downtime and reduces operator fatigue. One battery handles full 8-hour shifts with rapid charging during breaks.'
                    : 'Ergonomic design reduces operator fatigue, enabling consistent productivity throughout shifts. Minimal training requirements reduce onboarding costs and errors.'
                  }
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-3xl font-black text-[#C8102E] mb-1">
                      {isLithium ? '1' : '2'}
                    </div>
                    <div className="text-xs text-gray-400">Batteries Needed</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-3xl font-black text-[#C8102E] mb-1">
                      {isLithium ? '<2h' : '8-10h'}
                    </div>
                    <div className="text-xs text-gray-400">Training Time</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-20 h-20 rounded-2xl bg-[#C8102E]/20 flex items-center justify-center">
                    <Shield className="h-12 w-12 text-[#FFB81C]" />
                  </div>
                  <div>
                    <div className="text-5xl font-black text-white">5-7</div>
                    <div className="text-sm text-gray-400 mt-1">Months Payback</div>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">Total Cost of Ownership</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Typical ROI achieved in 5-7 months through combined savings from reduced damage claims, lower labor costs, eliminated battery replacements, and minimal maintenance requirements over 10+ year operational lifespan.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-3xl font-black text-[#C8102E] mb-1">10+</div>
                    <div className="text-xs text-gray-400">Years Service</div>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5">
                    <div className="text-3xl font-black text-[#C8102E] mb-1">95%</div>
                    <div className="text-xs text-gray-400">Cost Savings</div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Cost Savings Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-2 border-amber-500/30"
            >
              <div className="text-center mb-10">
                <h3 className="text-4xl font-bold text-white mb-4">Typical Annual Savings Example</h3>
                <p className="text-xl text-gray-300">Based on 200 pallets/day operation (50,000 pallets/year)</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="p-6 rounded-2xl bg-white/10 text-center">
                  <div className="text-sm text-gray-400 mb-2">Damage Reduction</div>
                  <div className="text-4xl font-black text-amber-400">₹18L</div>
                  <div className="text-xs text-gray-500 mt-2">Eliminated claims</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/10 text-center">
                  <div className="text-sm text-gray-400 mb-2">Labor Efficiency</div>
                  <div className="text-4xl font-black text-amber-400">₹12L</div>
                  <div className="text-xs text-gray-500 mt-2">Productivity gains</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/10 text-center">
                  <div className="text-sm text-gray-400 mb-2">Battery Savings</div>
                  <div className="text-4xl font-black text-amber-400">
                    {isLithium ? '₹4L' : '₹2L'}
                  </div>
                  <div className="text-xs text-gray-500 mt-2">Reduced replacements</div>
                </div>
                <div className="p-6 rounded-2xl bg-gradient-to-br from-[#C8102E] to-red-700 text-center">
                  <div className="text-sm text-white/80 mb-2">Total Annual</div>
                  <div className="text-4xl font-black text-white">
                    {isLithium ? '₹34L' : '₹32L'}
                  </div>
                  <div className="text-xs text-white/70 mt-2">Combined savings</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Safety & Reliability Section */}
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
                <Shield className="h-6 w-6 text-[#FFB81C]" />
                <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Safety & Reliability</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
                Industrial-Grade Safety Standards
              </h2>
              <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                Engineered for operator safety and long-term reliability in demanding industrial environments
              </p>
            </div>

            {/* Safety Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <Shield className="h-16 w-16 text-[#FFB81C] mb-6" />
                <h3 className="text-3xl font-bold text-white mb-6">Operator Safety Systems</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                    <CheckCircle2 className="h-6 w-6 text-[#C8102E] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white font-semibold mb-1">Emergency Stop System</div>
                      <div className="text-sm text-gray-400">Instant shutdown with clearly marked controls accessible from all operating positions</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                    <CheckCircle2 className="h-6 w-6 text-[#C8102E] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white font-semibold mb-1">Tool Head Protection</div>
                      <div className="text-sm text-gray-400">Enclosed sealing mechanism prevents operator contact with heated components</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                    <CheckCircle2 className="h-6 w-6 text-[#C8102E] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white font-semibold mb-1">Anti-Pinch Technology</div>
                      <div className="text-sm text-gray-400">Chain movement sensors prevent hand/finger injuries during operation</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5">
                    <CheckCircle2 className="h-6 w-6 text-[#C8102E] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white font-semibold mb-1">Battery Safety</div>
                      <div className="text-sm text-gray-400">
                        {isLithium
                          ? 'Lithium-ion battery with BMS (Battery Management System) prevents overcharge, overdischarge, and thermal runaway'
                          : 'Sealed lead-fleece battery with overcharge protection and low-voltage cutoff'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <Award className="h-16 w-16 text-[#FFB81C] mb-6" />
                <h3 className="text-3xl font-bold text-white mb-6">Compliance & Certifications</h3>
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Award className="h-7 w-7 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white">CE Certified</div>
                        <div className="text-sm text-gray-400">European safety standards</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Meets all EU machinery directives including EMC, LVD, and safety requirements
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Shield className="h-7 w-7 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white">ISO 9001:2015</div>
                        <div className="text-sm text-gray-400">Quality management</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Manufactured under certified quality management system ensuring consistent excellence
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Settings className="h-7 w-7 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-xl font-bold text-white">RoHS Compliant</div>
                        <div className="text-sm text-gray-400">Environmental standards</div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      Restriction of hazardous substances - environmentally responsible manufacturing
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Reliability Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
            >
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-white mb-4">Proven Reliability Metrics</h3>
                <p className="text-xl text-gray-300">Real-world performance data from industrial installations worldwide</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center p-8 rounded-2xl bg-white/5">
                  <div className="text-6xl font-black text-[#C8102E] mb-3">99.7%</div>
                  <div className="text-lg text-white font-semibold mb-2">Uptime</div>
                  <div className="text-sm text-gray-400">Average across all installations</div>
                </div>
                <div className="text-center p-8 rounded-2xl bg-white/5">
                  <div className="text-6xl font-black text-[#C8102E] mb-3">10+</div>
                  <div className="text-lg text-white font-semibold mb-2">Years</div>
                  <div className="text-sm text-gray-400">Average service life</div>
                </div>
                <div className="text-center p-8 rounded-2xl bg-white/5">
                  <div className="text-6xl font-black text-[#C8102E] mb-3">
                    {isLithium ? '3.4M' : '1M'}
                  </div>
                  <div className="text-lg text-white font-semibold mb-2">Cycles</div>
                  <div className="text-sm text-gray-400">Lifetime strapping capacity</div>
                </div>
                <div className="text-center p-8 rounded-2xl bg-white/5">
                  <div className="text-6xl font-black text-[#C8102E] mb-3">&lt;0.1%</div>
                  <div className="text-lg text-white font-semibold mb-2">Failure Rate</div>
                  <div className="text-sm text-gray-400">Industry-leading reliability</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Maintenance & Support Section */}
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
                <Settings className="h-6 w-6 text-[#FFB81C]" />
                <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Maintenance & Support</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
                Lifetime Partnership & Support
              </h2>
              <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                Comprehensive maintenance programs and expert technical support ensuring maximum uptime and performance
              </p>
            </div>

            {/* Maintenance Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <Clock className="h-16 w-16 text-[#FFB81C] mb-6" />
                <h3 className="text-3xl font-bold text-white mb-6">Minimal Maintenance Design</h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  Engineered for extended service intervals with easy-access maintenance points and modular component design reducing downtime to minutes instead of hours.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-[#C8102E] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white font-semibold mb-1">Quick-Change Components</div>
                      <div className="text-sm text-gray-400">Tool-free battery removal, snap-fit covers, modular seal head replacement in under 5 minutes</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-[#C8102E] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white font-semibold mb-1">Self-Diagnostic System</div>
                      <div className="text-sm text-gray-400">
                        {isXpert
                          ? 'Touchscreen displays error codes, maintenance schedules, and component wear status with predictive failure warnings'
                          : 'LED indicators provide clear status information and alert operators to service requirements'
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-[#C8102E] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white font-semibold mb-1">Lubrication-Free Operation</div>
                      <div className="text-sm text-gray-400">Sealed bearings and self-lubricating components eliminate messy maintenance tasks</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <CheckCircle2 className="h-6 w-6 text-[#C8102E] flex-shrink-0 mt-1" />
                    <div>
                      <div className="text-white font-semibold mb-1">Extended Service Intervals</div>
                      <div className="text-sm text-gray-400">
                        {isLithium
                          ? 'Lithium-ion battery requires zero maintenance - no water top-ups, no cleaning, no memory effect'
                          : 'Sealed lead-fleece battery technology minimizes water loss and maintenance requirements'
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <Award className="h-16 w-16 text-[#FFB81C] mb-6" />
                <h3 className="text-3xl font-bold text-white mb-6">Comprehensive Support Programs</h3>
                <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                  ErgopackIndia provides multi-tier support ensuring your operations never stop, backed by German engineering expertise and local service presence.
                </p>
                <div className="space-y-4">
                  <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Shield className="h-7 w-7 text-amber-400" />
                      </div>
                      <div className="text-xl font-bold text-white">24/7 Technical Hotline</div>
                    </div>
                    <p className="text-sm text-gray-300">
                      Round-the-clock access to certified technicians for troubleshooting, remote diagnostics, and emergency support
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Settings className="h-7 w-7 text-amber-400" />
                      </div>
                      <div className="text-xl font-bold text-white">On-Site Service</div>
                    </div>
                    <p className="text-sm text-gray-300">
                      Nationwide service network with guaranteed 48-hour response time for critical failures
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Package className="h-7 w-7 text-amber-400" />
                      </div>
                      <div className="text-xl font-bold text-white">Genuine Parts Inventory</div>
                    </div>
                    <p className="text-sm text-gray-300">
                      Complete spare parts availability with next-day delivery across India for all ErgopackGermany models
                    </p>
                  </div>

                  <div className="p-6 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border border-amber-500/30">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                        <Award className="h-7 w-7 text-amber-400" />
                      </div>
                      <div className="text-xl font-bold text-white">Training & Certification</div>
                    </div>
                    <p className="text-sm text-gray-300">
                      Comprehensive operator and maintenance training programs with certification for in-house technical teams
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Warranty Coverage */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-12 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
            >
              <div className="text-center mb-10">
                <Shield className="h-20 w-20 text-[#FFB81C] mx-auto mb-6" />
                <h3 className="text-4xl font-bold text-white mb-4">Industry-Leading Warranty Protection</h3>
                <p className="text-xl text-gray-300">Comprehensive coverage protecting your investment</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-5xl font-black text-[#C8102E] mb-4">2 Years</div>
                  <div className="text-xl text-white font-semibold mb-3">Full Machine Warranty</div>
                  <div className="text-sm text-gray-400 leading-relaxed">
                    Complete coverage on all mechanical, electrical, and electronic components including labor and parts
                  </div>
                </div>
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-5xl font-black text-[#C8102E] mb-4">
                    {isLithium ? '3 Years' : '18 Months'}
                  </div>
                  <div className="text-xl text-white font-semibold mb-3">Battery Warranty</div>
                  <div className="text-sm text-gray-400 leading-relaxed">
                    {isLithium
                      ? 'Extended lithium-ion battery warranty covering capacity degradation and cell failures'
                      : 'Lead-fleece battery coverage including replacement for manufacturing defects'
                    }
                  </div>
                </div>
                <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-5xl font-black text-[#C8102E] mb-4">10 Years</div>
                  <div className="text-xl text-white font-semibold mb-3">Parts Availability</div>
                  <div className="text-sm text-gray-400 leading-relaxed">
                    Guaranteed spare parts availability for minimum 10 years after purchase protecting long-term investment
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Competitive Advantages Section */}
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
                <Award className="h-6 w-6 text-[#FFB81C]" />
                <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Competitive Edge</span>
              </div>
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-6 leading-tight">
                Why ErgoPack Leads The Industry
              </h2>
              <p className="text-2xl text-gray-400 font-light max-w-3xl mx-auto leading-relaxed">
                40 years of German engineering excellence translated into measurable competitive advantages
              </p>
            </div>

            {/* Comparison Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#C8102E]/20 flex items-center justify-center">
                    <TrendingUp className="h-10 w-10 text-[#FFB81C]" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">vs. Manual Strapping</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5">
                    <div className="flex-shrink-0">
                      <div className="text-4xl font-black text-[#C8102E]">10x</div>
                      <div className="text-xs text-gray-400 mt-1">Faster</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Speed Advantage</div>
                      <div className="text-sm text-gray-400">
                        Complete pallet in 45 seconds vs. 7-8 minutes with manual tools - transforming warehouse productivity
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5">
                    <div className="flex-shrink-0">
                      <div className="text-4xl font-black text-[#C8102E]">100%</div>
                      <div className="text-xs text-gray-400 mt-1">Better</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Consistency</div>
                      <div className="text-sm text-gray-400">
                        Programmable tension eliminates human error - every strap perfect, every time, regardless of operator skill level
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5">
                    <div className="flex-shrink-0">
                      <div className="text-4xl font-black text-[#C8102E]">90%</div>
                      <div className="text-xs text-gray-400 mt-1">Reduction</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Labor Intensity</div>
                      <div className="text-sm text-gray-400">
                        Eliminate operator fatigue, repetitive strain injuries, and training requirements for complex manual strapping techniques
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="p-10 rounded-3xl bg-gradient-to-br from-[#C8102E]/10 to-transparent border border-[#C8102E]/30"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-[#C8102E]/20 flex items-center justify-center">
                    <Shield className="h-10 w-10 text-[#FFB81C]" />
                  </div>
                  <h3 className="text-3xl font-bold text-white">vs. Competitor Systems</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5">
                    <div className="flex-shrink-0">
                      <div className="text-4xl font-black text-[#C8102E]">
                        {isLithium ? '65%' : '25%'}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">Faster</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Chain Speed</div>
                      <div className="text-sm text-gray-400">
                        {isLithium
                          ? 'Lithium-ion technology delivers industry-leading 66m/min vs. 40m/min lead-battery competitors'
                          : 'Optimized motor and chain system outperforms equivalent economy-class competitors by 25%'
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5">
                    <div className="flex-shrink-0">
                      <div className="text-4xl font-black text-[#C8102E]">
                        {isLithium ? '240%' : '120%'}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">More</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Battery Capacity</div>
                      <div className="text-sm text-gray-400">
                        {isLithium
                          ? '1200 cycles vs. 350-cycle competitors - complete 3-shift operation on single charge'
                          : '350 cycles vs. 160-cycle basic models - full-day operation without battery changes'
                        }
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/5">
                    <div className="flex-shrink-0">
                      <div className="text-4xl font-black text-[#C8102E]">5+</div>
                      <div className="text-xs text-gray-400 mt-1">Years</div>
                    </div>
                    <div>
                      <div className="text-white font-semibold mb-2">Longevity</div>
                      <div className="text-sm text-gray-400">
                        German precision manufacturing means 10+ year service life vs. 5-7 years for Asian competitors - superior TCO
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Premium Feature Summary */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-16 p-12 rounded-3xl bg-gradient-to-br from-amber-500/10 to-orange-500/5 border-2 border-amber-500/30"
            >
              <div className="text-center mb-12">
                <h3 className="text-4xl font-bold text-white mb-4">The ErgopackGermany Difference</h3>
                <p className="text-xl text-gray-300">Features you won't find in competitor systems</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-6 rounded-2xl bg-white/10">
                  <Package className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                  <div className="text-white font-bold mb-2">ChainLance® System</div>
                  <div className="text-sm text-gray-400">Patented chain guidance ensuring perfect placement</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-white/10">
                  <Settings className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                  <div className="text-white font-bold mb-2">TrippleTool™ Head</div>
                  <div className="text-sm text-gray-400">Versatile 3-position sealing capability</div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-white/10">
                  {isXpert ? (
                    <Zap className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                  ) : (
                    <Shield className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                  )}
                  <div className="text-white font-bold mb-2">
                    {isXpert ? 'Siemens Control' : 'Precision Control'}
                  </div>
                  <div className="text-sm text-gray-400">
                    {isXpert
                      ? 'Industrial touchscreen with 99 program memory'
                      : 'Reliable electromechanical control system'
                    }
                  </div>
                </div>
                <div className="text-center p-6 rounded-2xl bg-white/10">
                  <Award className="h-12 w-12 text-amber-400 mx-auto mb-4" />
                  <div className="text-white font-bold mb-2">Made in Germany</div>
                  <div className="text-sm text-gray-400">40 years engineering excellence & quality</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
