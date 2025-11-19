'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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
  Shield,
  Clock,
  Activity,
  ArrowLeft,
  Download,
  ChevronRight,
  Maximize2,
  Minimize2
} from 'lucide-react';
import SmoothScroll from './animations/SmoothScroll';
import FixedHeader from './ui/FixedHeader';
import ScrollProgress from './ui/ScrollProgress';
import MagneticCursor from './ui/MagneticCursor';
import ThemeToggle from './ui/ThemeToggle';

interface ProductData {
  model: string;
  fullName: string;
  line: string;
  generation?: number;
  tariffNumber?: string;
  description: string;
  applicationType: string;
  htmlPage?: string;
  system: {
    dimensions: {
      length: number;
      width: number;
      height: number;
      unit: string;
    };
    weight: number;
    weightUnit: string;
  };
  flexibility: {
    palletWidth: {
      min: number;
      max: number;
      unit: string;
    };
    palletHeight: {
      min: number;
      max: number;
      unit: string;
    };
  };
  performance: {
    chainSpeed?: number;
    chainSpeedUnit?: string;
    operationType?: string;
    standardChainLength: number;
    chainLengthUnit: string;
  };
  sealingHead: {
    tensionPower?: { min: number; max: number; unit: string };
    strapWidth?: { min: number; max: number; unit: string };
    strapThickness?: { min: number; max: number; unit: string };
    strapMaterials: string[];
    mounting?: string;
    availability?: string;
    included?: boolean;
  };
  battery: {
    type: string;
    weight?: number;
    weightUnit?: string;
    loadingTime?: number | { min: number; max: number; unit: string };
    loadingTimeUnit?: string;
    voltageNominal?: number;
    voltageUnit?: string;
    capacityNominal?: number;
    capacityUnit?: string;
    strappingCycles?: number;
    dimensions?: { length: number; width: number; height: number; unit: string };
  };
  includedFeatures?: string[];
  optionalAccessories?: string[];
  notAvailable?: string[];
  certifications: string[];
}

interface EliteProductPageTemplateProps {
  productData: ProductData;
}

export default function EliteProductPageTemplate({ productData }: EliteProductPageTemplateProps) {
  const isXpert = productData.line.includes('X-pert');
  const isLithium = productData.battery?.type?.includes('Lithium-Ion');
  const isManual = productData.model === '700';

  // Helper function to get product image path
  const getProductImagePath = (imageNum: number = 0) => {
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
      'RE': 'RE',
      'GO': 'GO'
    };

    const folderName = modelMap[productData.model] || productData.model.replace(/\s/g, '');
    return `/images/products/${folderName}/${imageNum}.jpg`;
  };

  return (
    <>
      <SmoothScroll />
      <FixedHeader />
      <ScrollProgress />
      <MagneticCursor />
      <ThemeToggle />

      <div className="min-h-screen bg-theme-base text-theme-primary">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-theme-primary/5 via-theme-base to-theme-primary/5">
          {/* Animated Background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#C8102E_0%,transparent_50%)]" />
          </div>

          {/* Back Button */}
          <Link
            href="/elite"
            className="absolute top-8 left-8 z-50 flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 text-theme-primary hover:bg-white/20 transition-all duration-300 group"
          >
            <ArrowLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back to Elite</span>
          </Link>

          <div className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 w-full py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left: Product Image */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#C8102E]/20 to-transparent rounded-3xl blur-3xl" />
                <div className="relative rounded-3xl overflow-hidden border border-theme-border backdrop-blur-sm p-8 bg-gradient-to-br from-white/10 to-transparent dark:from-white/5">
                  <div className="relative w-full h-[500px]">
                    <Image
                      src={getProductImagePath(0)}
                      alt={`${productData.fullName} - Industrial Strapping Machine`}
                      fill
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width: 1024px) 100vw, 600px"
                      priority
                    />
                  </div>
                </div>
              </motion.div>

              {/* Right: Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Product Line Badge */}
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full border-2 ${
                  isXpert
                    ? 'bg-gradient-to-r from-[#C8102E]/20 to-red-900/20 border-[#C8102E]'
                    : 'bg-white/10 dark:bg-white/5 border-white/30'
                }`}>
                  <Package className={`h-6 w-6 ${isXpert ? 'text-[#FFB81C]' : 'text-[#C8102E]'}`} />
                  <span className={`font-bold tracking-wide text-lg ${isXpert ? 'text-[#FFB81C]' : 'text-[#C8102E]'}`}>
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
                    ? 'bg-gradient-to-r from-[#C8102E] to-red-700 text-white'
                    : 'bg-white/20 dark:bg-white/10 text-theme-primary'
                }`}>
                  {productData.applicationType}
                </div>

                {/* Description */}
                <p className="text-xl text-theme-secondary leading-relaxed">
                  {productData.description}
                </p>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-6">
                  {!isManual && productData.performance?.chainSpeed && (
                    <div className="p-6 rounded-2xl glass-theme border border-theme-border">
                      <Zap className="h-8 w-8 text-[#FFB81C] mb-3" />
                      <div className="text-sm text-theme-secondary mb-1">Chain Speed</div>
                      <div className="text-3xl font-black text-theme-primary">
                        {productData.performance.chainSpeed}
                      </div>
                      <div className="text-sm text-theme-secondary">{productData.performance.chainSpeedUnit}</div>
                    </div>
                  )}

                  {productData.battery?.strappingCycles && (
                    <div className="p-6 rounded-2xl glass-theme border border-theme-border">
                      <Battery className="h-8 w-8 text-[#FFB81C] mb-3" />
                      <div className="text-sm text-theme-secondary mb-1">Cycles/Charge</div>
                      <div className="text-3xl font-black text-theme-primary">
                        {productData.battery.strappingCycles}
                      </div>
                      <div className="text-sm text-theme-secondary">cycles</div>
                    </div>
                  )}

                  {isManual && (
                    <div className="p-6 rounded-2xl glass-theme border border-theme-border">
                      <Settings className="h-8 w-8 text-[#FFB81C] mb-3" />
                      <div className="text-sm text-theme-secondary mb-1">Operation</div>
                      <div className="text-lg font-black text-theme-primary">
                        Manual Hand Crank
                      </div>
                      <div className="text-sm text-theme-secondary">No battery required</div>
                    </div>
                  )}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#C8102E] to-red-700 text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                  >
                    <Download className="h-5 w-5" />
                    Download Specs
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-theme-border text-theme-primary font-bold text-lg hover:bg-white/20 transition-all"
                  >
                    Request Quote
                    <ChevronRight className="h-5 w-5" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#C8102E] text-xl font-mono"
          >
            ↓ SCROLL FOR DETAILED SPECIFICATIONS ↓
          </motion.div>
        </section>

        {/* System Specifications Section */}
        <section className="relative py-20 bg-gradient-to-b from-theme-base via-theme-primary/5 to-theme-base">
          <div className="max-w-7xl mx-auto px-8 sm:px-12">
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
                  <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">System Specifications</span>
                </div>
                <h2 className="text-5xl sm:text-6xl font-black text-theme-primary mb-6">
                  Technical Details
                </h2>
                <p className="text-2xl text-theme-secondary font-light max-w-3xl mx-auto">
                  Precision-engineered dimensions and specifications
                </p>
              </div>

              {/* Specifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Dimensions */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl glass-theme border border-theme-border hover:border-[#C8102E] transition-all duration-300"
                >
                  <Ruler className="h-12 w-12 text-[#FFB81C] mb-4" />
                  <h3 className="text-2xl font-black text-theme-primary mb-4">Dimensions</h3>
                  <div className="space-y-3 text-theme-secondary">
                    <div className="flex justify-between">
                      <span>Length:</span>
                      <span className="font-bold text-theme-primary">
                        {productData.system.dimensions.length} {productData.system.dimensions.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Width:</span>
                      <span className="font-bold text-theme-primary">
                        {productData.system.dimensions.width} {productData.system.dimensions.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Height:</span>
                      <span className="font-bold text-theme-primary">
                        {productData.system.dimensions.height} {productData.system.dimensions.unit}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Weight */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-8 rounded-3xl glass-theme border border-theme-border hover:border-[#C8102E] transition-all duration-300"
                >
                  <Weight className="h-12 w-12 text-[#FFB81C] mb-4" />
                  <h3 className="text-2xl font-black text-theme-primary mb-4">System Weight</h3>
                  <div className="text-5xl font-black text-[#C8102E] mb-2">
                    {productData.system.weight}
                  </div>
                  <div className="text-xl text-theme-secondary">{productData.system.weightUnit}</div>
                </motion.div>

                {/* Chain Length */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-8 rounded-3xl glass-theme border border-theme-border hover:border-[#C8102E] transition-all duration-300"
                >
                  <Layers className="h-12 w-12 text-[#FFB81C] mb-4" />
                  <h3 className="text-2xl font-black text-theme-primary mb-4">Chain Length</h3>
                  <div className="text-5xl font-black text-[#C8102E] mb-2">
                    {productData.performance.standardChainLength}
                  </div>
                  <div className="text-xl text-theme-secondary">{productData.performance.chainLengthUnit} standard</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Flexibility Range Section */}
        <section className="relative py-20 bg-gradient-to-b from-theme-base to-theme-primary/5">
          <div className="max-w-7xl mx-auto px-8 sm:px-12">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Section Header */}
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#C8102E]/20 border border-[#C8102E] mb-6">
                  <Maximize2 className="h-6 w-6 text-[#FFB81C]" />
                  <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Operational Flexibility</span>
                </div>
                <h2 className="text-5xl sm:text-6xl font-black text-theme-primary mb-6">
                  Pallet Range
                </h2>
                <p className="text-2xl text-theme-secondary font-light max-w-3xl mx-auto">
                  Versatile sizing for diverse pallet configurations
                </p>
              </div>

              {/* Range Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {/* Pallet Width */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl glass-theme border border-theme-border"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-[#C8102E]/20">
                      <Ruler className="h-8 w-8 text-[#FFB81C]" />
                    </div>
                    <h3 className="text-2xl font-black text-theme-primary">Pallet Width</h3>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-theme-secondary mb-1">Minimum</div>
                      <div className="text-4xl font-black text-theme-primary">
                        {productData.flexibility.palletWidth.min}
                        <span className="text-2xl text-theme-secondary ml-2">
                          {productData.flexibility.palletWidth.unit}
                        </span>
                      </div>
                    </div>
                    <div className="text-4xl text-[#C8102E]">→</div>
                    <div>
                      <div className="text-sm text-theme-secondary mb-1">Maximum</div>
                      <div className="text-4xl font-black text-theme-primary">
                        {productData.flexibility.palletWidth.max}
                        <span className="text-2xl text-theme-secondary ml-2">
                          {productData.flexibility.palletWidth.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-[#C8102E]/30 via-[#C8102E] to-[#C8102E]/30 rounded-full" />
                </motion.div>

                {/* Pallet Height */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="p-8 rounded-3xl glass-theme border border-theme-border"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-[#C8102E]/20">
                      <Minimize2 className="h-8 w-8 text-[#FFB81C]" />
                    </div>
                    <h3 className="text-2xl font-black text-theme-primary">Pallet Height</h3>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-sm text-theme-secondary mb-1">Minimum</div>
                      <div className="text-4xl font-black text-theme-primary">
                        {productData.flexibility.palletHeight.min}
                        <span className="text-2xl text-theme-secondary ml-2">
                          {productData.flexibility.palletHeight.unit}
                        </span>
                      </div>
                    </div>
                    <div className="text-4xl text-[#C8102E]">→</div>
                    <div>
                      <div className="text-sm text-theme-secondary mb-1">Maximum</div>
                      <div className="text-4xl font-black text-theme-primary">
                        {productData.flexibility.palletHeight.max}
                        <span className="text-2xl text-theme-secondary ml-2">
                          {productData.flexibility.palletHeight.unit}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 bg-gradient-to-r from-[#C8102E]/30 via-[#C8102E] to-[#C8102E]/30 rounded-full" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sealing Head Section */}
        {productData.sealingHead && (
          <section className="relative py-20 bg-gradient-to-b from-theme-primary/5 to-theme-base">
            <div className="max-w-7xl mx-auto px-8 sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Section Header */}
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#C8102E]/20 border border-[#C8102E] mb-6">
                    <Target className="h-6 w-6 text-[#FFB81C]" />
                    <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Sealing Performance</span>
                  </div>
                  <h2 className="text-5xl sm:text-6xl font-black text-theme-primary mb-6">
                    Sealing Head Specifications
                  </h2>
                </div>

                {/* Specifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {/* Tension Power */}
                  {productData.sealingHead.tensionPower && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-3xl glass-theme border border-theme-border"
                    >
                      <Gauge className="h-12 w-12 text-[#FFB81C] mb-4" />
                      <h3 className="text-2xl font-black text-theme-primary mb-4">Tension Power</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-3xl font-black text-[#C8102E]">
                          {productData.sealingHead.tensionPower.min}
                        </div>
                        <div className="text-xl text-theme-secondary">-</div>
                        <div className="text-3xl font-black text-[#C8102E]">
                          {productData.sealingHead.tensionPower.max}
                        </div>
                        <div className="text-xl text-theme-secondary">
                          {productData.sealingHead.tensionPower.unit}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Strap Width */}
                  {productData.sealingHead.strapWidth && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="p-8 rounded-3xl glass-theme border border-theme-border"
                    >
                      <Ruler className="h-12 w-12 text-[#FFB81C] mb-4" />
                      <h3 className="text-2xl font-black text-theme-primary mb-4">Strap Width</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-3xl font-black text-[#C8102E]">
                          {productData.sealingHead.strapWidth.min}
                        </div>
                        <div className="text-xl text-theme-secondary">-</div>
                        <div className="text-3xl font-black text-[#C8102E]">
                          {productData.sealingHead.strapWidth.max}
                        </div>
                        <div className="text-xl text-theme-secondary">
                          {productData.sealingHead.strapWidth.unit}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Strap Thickness */}
                  {productData.sealingHead.strapThickness && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="p-8 rounded-3xl glass-theme border border-theme-border"
                    >
                      <Layers className="h-12 w-12 text-[#FFB81C] mb-4" />
                      <h3 className="text-2xl font-black text-theme-primary mb-4">Strap Thickness</h3>
                      <div className="flex items-center gap-2">
                        <div className="text-3xl font-black text-[#C8102E]">
                          {productData.sealingHead.strapThickness.min}
                        </div>
                        <div className="text-xl text-theme-secondary">-</div>
                        <div className="text-3xl font-black text-[#C8102E]">
                          {productData.sealingHead.strapThickness.max}
                        </div>
                        <div className="text-xl text-theme-secondary">
                          {productData.sealingHead.strapThickness.unit}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Strap Materials */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mt-8 p-8 rounded-3xl glass-theme border border-theme-border"
                >
                  <h3 className="text-2xl font-black text-theme-primary mb-6">Compatible Strap Materials</h3>
                  <div className="flex flex-wrap gap-4">
                    {productData.sealingHead.strapMaterials.map((material, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#C8102E]/20 border border-[#C8102E]"
                      >
                        <CheckCircle2 className="h-5 w-5 text-[#FFB81C]" />
                        <span className="font-semibold text-theme-primary">{material}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Battery Section */}
        {!isManual && (
          <section className="relative py-20 bg-gradient-to-b from-theme-base to-theme-primary/5">
            <div className="max-w-7xl mx-auto px-8 sm:px-12">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                {/* Section Header */}
                <div className="text-center mb-16">
                  <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#C8102E]/20 border border-[#C8102E] mb-6">
                    <Battery className="h-6 w-6 text-[#FFB81C]" />
                    <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Power System</span>
                  </div>
                  <h2 className="text-5xl sm:text-6xl font-black text-theme-primary mb-6">
                    {isLithium ? 'Lithium-Ion Technology' : 'Lead-Fleece Battery System'}
                  </h2>
                  <p className="text-2xl text-theme-secondary font-light max-w-3xl mx-auto">
                    {isLithium
                      ? 'Advanced lithium-ion power for maximum efficiency and extended runtime'
                      : 'Reliable lead-fleece battery system for consistent performance'
                    }
                  </p>
                </div>

                {/* Battery Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Battery Type */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="p-8 rounded-3xl glass-theme border border-theme-border text-center"
                  >
                    <Battery className="h-12 w-12 text-[#FFB81C] mb-4 mx-auto" />
                    <h3 className="text-lg font-bold text-theme-secondary mb-2">Battery Type</h3>
                    <div className="text-2xl font-black text-theme-primary">
                      {productData.battery.type}
                    </div>
                  </motion.div>

                  {/* Cycles */}
                  {productData.battery.strappingCycles && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 }}
                      className="p-8 rounded-3xl glass-theme border border-theme-border text-center"
                    >
                      <Activity className="h-12 w-12 text-[#FFB81C] mb-4 mx-auto" />
                      <h3 className="text-lg font-bold text-theme-secondary mb-2">Cycles/Charge</h3>
                      <div className="text-4xl font-black text-[#C8102E]">
                        {productData.battery.strappingCycles}
                      </div>
                    </motion.div>
                  )}

                  {/* Charging Time */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="p-8 rounded-3xl glass-theme border border-theme-border text-center"
                  >
                    <Clock className="h-12 w-12 text-[#FFB81C] mb-4 mx-auto" />
                    <h3 className="text-lg font-bold text-theme-secondary mb-2">Charging Time</h3>
                    <div className="text-3xl font-black text-[#C8102E]">
                      {typeof productData.battery.loadingTime === 'number'
                        ? `${productData.battery.loadingTime}h`
                        : `${productData.battery.loadingTime?.min}-${productData.battery.loadingTime?.max}h`
                      }
                    </div>
                  </motion.div>

                  {/* Battery Weight */}
                  {productData.battery.weight && (
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="p-8 rounded-3xl glass-theme border border-theme-border text-center"
                    >
                      <Weight className="h-12 w-12 text-[#FFB81C] mb-4 mx-auto" />
                      <h3 className="text-lg font-bold text-theme-secondary mb-2">Battery Weight</h3>
                      <div className="text-3xl font-black text-[#C8102E]">
                        {productData.battery.weight} {productData.battery.weightUnit}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Li-Ion Advantages */}
                {isLithium && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 p-8 rounded-3xl bg-gradient-to-br from-[#C8102E]/20 to-red-900/20 border border-[#C8102E]"
                  >
                    <h3 className="text-3xl font-black text-theme-primary mb-6 text-center">
                      Lithium-Ion Advantages
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="h-6 w-6 text-[#FFB81C] flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-bold text-theme-primary mb-1">3.4x More Cycles</div>
                          <div className="text-sm text-theme-secondary">1200 vs 350 cycles per charge</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="h-6 w-6 text-[#FFB81C] flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-bold text-theme-primary mb-1">60% Faster Charging</div>
                          <div className="text-sm text-theme-secondary">3.5 hours vs 8-10 hours</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <CheckCircle2 className="h-6 w-6 text-[#FFB81C] flex-shrink-0 mt-1" />
                        <div>
                          <div className="font-bold text-theme-primary mb-1">60% Lighter</div>
                          <div className="text-sm text-theme-secondary">5kg vs 12.3kg battery weight</div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            </div>
          </section>
        )}

        {/* Features Section */}
        {(productData.includedFeatures || productData.optionalAccessories) && (
          <section className="relative py-20 bg-gradient-to-b from-theme-primary/5 to-theme-base">
            <div className="max-w-7xl mx-auto px-8 sm:px-12">
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
                    <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Features & Accessories</span>
                  </div>
                  <h2 className="text-5xl sm:text-6xl font-black text-theme-primary mb-6">
                    Included & Optional
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                  {/* Included Features */}
                  {productData.includedFeatures && productData.includedFeatures.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-3xl glass-theme border border-theme-border"
                    >
                      <h3 className="text-3xl font-black text-theme-primary mb-6 flex items-center gap-3">
                        <CheckCircle2 className="h-8 w-8 text-[#FFB81C]" />
                        Included Features
                      </h3>
                      <div className="space-y-4">
                        {productData.includedFeatures.map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-4 rounded-xl bg-[#C8102E]/10 border border-[#C8102E]/30"
                          >
                            <CheckCircle2 className="h-5 w-5 text-[#FFB81C] flex-shrink-0" />
                            <span className="font-semibold text-theme-primary">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Optional Accessories */}
                  {productData.optionalAccessories && productData.optionalAccessories.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      className="p-8 rounded-3xl glass-theme border border-theme-border"
                    >
                      <h3 className="text-3xl font-black text-theme-primary mb-6 flex items-center gap-3">
                        <Package className="h-8 w-8 text-[#FFB81C]" />
                        Optional Accessories
                      </h3>
                      <div className="space-y-4">
                        {productData.optionalAccessories.map((accessory, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-4 rounded-xl bg-white/5 dark:bg-white/5 border border-theme-border"
                          >
                            <div className="w-2 h-2 rounded-full bg-[#FFB81C] flex-shrink-0" />
                            <span className="font-semibold text-theme-secondary">{accessory}</span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Certifications Section */}
        <section className="relative py-20 bg-gradient-to-b from-theme-base to-theme-primary/5">
          <div className="max-w-7xl mx-auto px-8 sm:px-12">
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
                  <span className="text-sm font-bold text-[#FFB81C] tracking-wider uppercase">Quality Assurance</span>
                </div>
                <h2 className="text-5xl sm:text-6xl font-black text-theme-primary mb-6">
                  Certifications
                </h2>
                <p className="text-2xl text-theme-secondary font-light max-w-3xl mx-auto">
                  Certified excellence and compliance with international standards
                </p>
              </div>

              {/* Certifications Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {productData.certifications.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="p-8 rounded-3xl glass-theme border border-theme-border text-center hover:border-[#C8102E] transition-all duration-300"
                  >
                    <Shield className="h-16 w-16 text-[#FFB81C] mb-4 mx-auto" />
                    <div className="text-xl font-black text-theme-primary">{cert}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="relative py-20 bg-gradient-to-br from-[#C8102E] to-red-900 text-white">
          <div className="max-w-5xl mx-auto px-8 sm:px-12 text-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-5xl sm:text-6xl font-black mb-6">
                Ready to Elevate Your Operations?
              </h2>
              <p className="text-2xl font-light mb-12 opacity-90">
                Get in touch with our team to discuss how the {productData.model} can transform your strapping process
              </p>

              <div className="flex flex-wrap justify-center gap-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-10 py-5 rounded-full bg-white text-[#C8102E] font-bold text-xl shadow-2xl hover:shadow-3xl transition-all"
                >
                  Request a Quote
                  <ChevronRight className="h-6 w-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-10 py-5 rounded-full bg-transparent border-2 border-white text-white font-bold text-xl hover:bg-white/10 transition-all"
                >
                  <Download className="h-6 w-6" />
                  Download Datasheet
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}
