'use client';

import { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { MinimalLoadingScreen } from '@/components/ui/MinimalLoadingScreen';
import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import {
  ArrowRight,
  Battery,
  Zap,
  Shield,
  Gauge,
  CheckCircle2,
  Sparkles,
  Target,
  Settings,
  TrendingUp,
  Box,
  Ruler,
  Clock,
  Award,
  AlertCircle,
  Package,
} from 'lucide-react';

// Type definitions
interface ProductData {
  model: string;
  fullName: string;
  line: string;
  generation: number;
  description: string;
  applicationType: string;
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
    loadingTime?: { min: number; max: number; unit: string } | number;
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

interface ProductPageTemplateProps {
  productData: ProductData;
  heroImage?: string;
  applicationImages?: string[];
  comparisonLink?: string;
}

export default function ProductPageTemplate({
  productData,
  heroImage,
  applicationImages = [],
  comparisonLink,
}: ProductPageTemplateProps) {
  const isEconomyLine = productData.line.includes('Economy');
  const isXpertLine = productData.line.includes('X-pert');

  // Generate JSON-LD structured data for SEO
  const generateProductSchema = () => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://ergopack.in';

    return {
      "@context": "https://schema.org/",
      "@type": "Product",
      "name": productData.fullName,
      "model": productData.model,
      "description": productData.description,
      "brand": {
        "@type": "Brand",
        "name": "ErgoPack India"
      },
      "manufacturer": {
        "@type": "Organization",
        "name": "ErgoPack India",
        "url": baseUrl
      },
      "category": "Industrial Strapping Equipment",
      "productLine": productData.line,
      "additionalProperty": [
        {
          "@type": "PropertyValue",
          "name": "Application Type",
          "value": productData.applicationType
        },
        {
          "@type": "PropertyValue",
          "name": "Product Line",
          "value": productData.line
        },
        {
          "@type": "PropertyValue",
          "name": "Generation",
          "value": `Gen ${productData.generation}`
        },
        ...(productData.performance.chainSpeed ? [{
          "@type": "PropertyValue",
          "name": "Chain Speed",
          "value": `${productData.performance.chainSpeed} ${productData.performance.chainSpeedUnit || 'm/min'}`
        }] : []),
        ...(productData.sealingHead.tensionPower ? [{
          "@type": "PropertyValue",
          "name": "Tension Power",
          "value": `${productData.sealingHead.tensionPower.min}-${productData.sealingHead.tensionPower.max} ${productData.sealingHead.tensionPower.unit}`
        }] : []),
        ...(productData.battery.type ? [{
          "@type": "PropertyValue",
          "name": "Battery Type",
          "value": productData.battery.type
        }] : []),
        ...(productData.battery.strappingCycles ? [{
          "@type": "PropertyValue",
          "name": "Strapping Cycles",
          "value": `${productData.battery.strappingCycles} cycles`
        }] : [])
      ],
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "INR",
        "url": `${baseUrl}/products/${productData.model.toLowerCase()}`
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "150"
      }
    };
  };

  // Inject JSON-LD into document head
  useEffect(() => {
    const schema = generateProductSchema();
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(schema);
    script.id = 'product-schema';

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('product-schema');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [productData]);

  // Hero Section
  function HeroSection() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const y = useTransform(scrollY, [0, 300], [0, 100]);

    // Determine badge color based on line
    const badgeColor = isXpertLine
      ? 'from-crimson-400 via-crimson-500 to-crimson-600'
      : 'from-amber-500 via-amber-600 to-orange-600';

    return (
      <section className="relative min-h-screen flex items-center justify-center bg-luxury-space-black overflow-hidden">
        {/* Gradient orbs */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl"
            style={{
              background: isXpertLine
                ? 'radial-gradient(circle, #9B1C1C 0%, transparent 70%)'
                : 'radial-gradient(circle, #D97706 0%, transparent 70%)',
            }}
            animate={{
              scale: [1, 1.3, 1],
              x: [0, 50, 0],
              y: [0, 30, 0],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <motion.div
          className="relative z-10 max-w-7xl mx-auto px-8 sm:px-12 lg:px-16 py-40 text-center"
          style={{ opacity, y }}
        >
          {/* Premium badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="mb-12 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-opacity-30 bg-opacity-10 backdrop-blur-md"
            style={{
              borderColor: isXpertLine ? '#EF4444' : '#F59E0B',
              backgroundColor: isXpertLine ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
            }}
          >
            <Sparkles className="h-4 w-4" style={{ color: isXpertLine ? '#F87171' : '#FBBF24' }} />
            <span
              className="text-sm font-medium tracking-wide"
              style={{ color: isXpertLine ? '#F87171' : '#FBBF24' }}
            >
              {productData.line} | Generation {productData.generation}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-6xl sm:text-7xl lg:text-8xl font-bold text-white mb-8 leading-[0.95]"
          >
            {productData.fullName}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-xl sm:text-2xl text-platinum-300 max-w-4xl mx-auto leading-relaxed mb-16 font-light"
          >
            {productData.description}
          </motion.p>

          {/* Hero Image */}
          {heroImage && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 1 }}
              className="mb-16 relative w-full max-w-4xl mx-auto h-[500px]"
            >
              <Image
                src={heroImage}
                alt={productData.fullName}
                fill
                className="object-contain"
                priority
              />
            </motion.div>
          )}

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Link href="/contact">
              <button className={isXpertLine ? 'btn-premium group' : 'btn-economy group'}>
                <span className="relative z-10 flex items-center">
                  Request Quote
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </Link>
            {comparisonLink && (
              <Link href={comparisonLink}>
                <button className={isXpertLine ? 'btn-premium-secondary' : 'btn-economy-secondary'}>
                  Compare Models
                </button>
              </Link>
            )}
          </motion.div>

          {/* Key Stats Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto"
          >
            {productData.sealingHead.tensionPower && (
              <div className="flex flex-col items-center gap-2">
                <div className={`text-3xl font-serif font-bold bg-gradient-to-r ${badgeColor} bg-clip-text text-transparent`}>
                  {productData.sealingHead.tensionPower.max}N
                </div>
                <span className="text-sm text-platinum-400">Max Tension</span>
              </div>
            )}
            {productData.performance.chainSpeed && (
              <div className="flex flex-col items-center gap-2">
                <div className={`text-3xl font-serif font-bold bg-gradient-to-r ${badgeColor} bg-clip-text text-transparent`}>
                  {productData.performance.chainSpeed} m/min
                </div>
                <span className="text-sm text-platinum-400">Chain Speed</span>
              </div>
            )}
            {productData.battery.strappingCycles && (
              <div className="flex flex-col items-center gap-2">
                <div className={`text-3xl font-serif font-bold bg-gradient-to-r ${badgeColor} bg-clip-text text-transparent`}>
                  {productData.battery.strappingCycles}
                </div>
                <span className="text-sm text-platinum-400">Cycles/Charge</span>
              </div>
            )}
            <div className="flex flex-col items-center gap-2">
              <div className={`text-3xl font-serif font-bold bg-gradient-to-r ${badgeColor} bg-clip-text text-transparent`}>
                {productData.flexibility.palletHeight.max}cm
              </div>
              <span className="text-sm text-platinum-400">Max Height</span>
            </div>
          </motion.div>
        </motion.div>
      </section>
    );
  }

  // System Specifications Section
  function SystemSpecsSection() {
    return (
      <section className="py-32 bg-gradient-to-b from-luxury-space-black to-luxury-dark-gray">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="text-center mb-20"
          >
            <p className={`text-sm uppercase tracking-[0.3em] ${isXpertLine ? 'text-crimson-500' : 'text-amber-500'} mb-8 font-medium`}>
              Technical Specifications
            </p>
            <h2 className="font-serif text-5xl sm:text-6xl font-semibold text-white mb-6">
              System Overview
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* System Information Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="premium-card-dark p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${isXpertLine ? 'bg-crimson-500/10 border border-crimson-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
                  <Box className={`h-6 w-6 ${isXpertLine ? 'text-crimson-400' : 'text-amber-400'}`} />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white">System Details</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-platinum-800">
                  <span className="text-platinum-400">Model</span>
                  <span className="text-white font-medium">{productData.model}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-platinum-800">
                  <span className="text-platinum-400">Product Line</span>
                  <span className="text-white font-medium">{productData.line}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-platinum-800">
                  <span className="text-platinum-400">Application</span>
                  <span className="text-white font-medium">{productData.applicationType}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-platinum-800">
                  <span className="text-platinum-400">Dimensions</span>
                  <span className="text-white font-medium">
                    {productData.system.dimensions.length} × {productData.system.dimensions.width} × {productData.system.dimensions.height} {productData.system.dimensions.unit}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3">
                  <span className="text-platinum-400">Weight</span>
                  <span className="text-white font-medium">
                    {productData.system.weight} {productData.system.weightUnit}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Flexibility Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="premium-card-dark p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${isXpertLine ? 'bg-crimson-500/10 border border-crimson-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
                  <Ruler className={`h-6 w-6 ${isXpertLine ? 'text-crimson-400' : 'text-amber-400'}`} />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white">Flexibility</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-platinum-800">
                  <span className="text-platinum-400">Pallet Width Range</span>
                  <span className={`${isXpertLine ? 'text-crimson-400' : 'text-amber-400'} font-semibold`}>
                    {productData.flexibility.palletWidth.min} - {productData.flexibility.palletWidth.max} {productData.flexibility.palletWidth.unit}
                  </span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-platinum-800">
                  <span className="text-platinum-400">Pallet Height Range</span>
                  <span className={`${isXpertLine ? 'text-crimson-400' : 'text-amber-400'} font-semibold`}>
                    {productData.flexibility.palletHeight.min} - {productData.flexibility.palletHeight.max} {productData.flexibility.palletHeight.unit}
                  </span>
                </div>
                {productData.performance.chainSpeed && (
                  <div className="flex justify-between items-center py-3 border-b border-platinum-800">
                    <span className="text-platinum-400">Chain Speed</span>
                    <span className="text-white font-medium">
                      {productData.performance.chainSpeed} {productData.performance.chainSpeedUnit}
                    </span>
                  </div>
                )}
                {productData.performance.operationType && (
                  <div className="flex justify-between items-center py-3 border-b border-platinum-800">
                    <span className="text-platinum-400">Operation Type</span>
                    <span className="text-white font-medium">{productData.performance.operationType}</span>
                  </div>
                )}
                <div className="flex justify-between items-center py-3">
                  <span className="text-platinum-400">Chain Length</span>
                  <span className="text-white font-medium">
                    {productData.performance.standardChainLength} {productData.performance.chainLengthUnit}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Battery Card */}
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="premium-card-dark p-8"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-3 rounded-xl ${isXpertLine ? 'bg-crimson-500/10 border border-crimson-500/20' : 'bg-amber-500/10 border border-amber-500/20'}`}>
                  <Battery className={`h-6 w-6 ${isXpertLine ? 'text-crimson-400' : 'text-amber-400'}`} />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-white">Power System</h3>
              </div>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-platinum-800">
                  <span className="text-platinum-400">Battery Type</span>
                  <span className="text-white font-medium">{productData.battery.type}</span>
                </div>
                {productData.battery.weight && (
                  <div className="flex justify-between items-center py-3 border-b border-platinum-800">
                    <span className="text-platinum-400">Battery Weight</span>
                    <span className="text-white font-medium">
                      {productData.battery.weight} {productData.battery.weightUnit}
                    </span>
                  </div>
                )}
                {productData.battery.loadingTime && (
                  <div className="flex justify-between items-center py-3 border-b border-platinum-800">
                    <span className="text-platinum-400">Charging Time</span>
                    <span className="text-white font-medium">
                      {typeof productData.battery.loadingTime === 'number'
                        ? `${productData.battery.loadingTime} ${productData.battery.loadingTimeUnit || 'hours'}`
                        : `${productData.battery.loadingTime.min} - ${productData.battery.loadingTime.max} ${productData.battery.loadingTime.unit}`}
                    </span>
                  </div>
                )}
                {productData.battery.strappingCycles && (
                  <div className="flex justify-between items-center py-3 border-b border-platinum-800">
                    <span className="text-platinum-400">Strapping Cycles</span>
                    <span className={`${isXpertLine ? 'text-crimson-400' : 'text-amber-400'} font-semibold`}>
                      {productData.battery.strappingCycles} cycles
                    </span>
                  </div>
                )}
                {productData.battery.voltageNominal && (
                  <div className="flex justify-between items-center py-3">
                    <span className="text-platinum-400">Voltage</span>
                    <span className="text-white font-medium">
                      {productData.battery.voltageNominal} {productData.battery.voltageUnit}
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Sealing Head Section
  function SealingHeadSection() {
    if (!productData.sealingHead) return null;

    return (
      <section className="py-32 bg-luxury-dark-gray">
        <div className="max-w-6xl mx-auto px-8 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <p className={`text-sm uppercase tracking-[0.3em] ${isXpertLine ? 'text-crimson-500' : 'text-amber-500'} mb-8 font-medium`}>
              Sealing Technology
            </p>
            <h2 className="font-serif text-5xl sm:text-6xl font-semibold text-white">
              Sealing Head Specifications
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {productData.sealingHead.tensionPower && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-6 rounded-2xl bg-luxury-space-black/50 border border-platinum-800 hover:border-crimson-500/30 transition-all duration-500"
              >
                <span className="text-platinum-400 font-light">Tension Power</span>
                <span className={`font-medium ${isXpertLine ? 'text-crimson-400' : 'text-amber-400'} text-lg`}>
                  {productData.sealingHead.tensionPower.min} - {productData.sealingHead.tensionPower.max} {productData.sealingHead.tensionPower.unit}
                </span>
              </motion.div>
            )}

            {productData.sealingHead.strapWidth && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex items-center justify-between p-6 rounded-2xl bg-luxury-space-black/50 border border-platinum-800 hover:border-crimson-500/30 transition-all duration-500"
              >
                <span className="text-platinum-400 font-light">Strap Width</span>
                <span className="text-white font-medium">
                  {productData.sealingHead.strapWidth.min} - {productData.sealingHead.strapWidth.max} {productData.sealingHead.strapWidth.unit}
                </span>
              </motion.div>
            )}

            {productData.sealingHead.strapThickness && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex items-center justify-between p-6 rounded-2xl bg-luxury-space-black/50 border border-platinum-800 hover:border-crimson-500/30 transition-all duration-500"
              >
                <span className="text-platinum-400 font-light">Strap Thickness</span>
                <span className="text-white font-medium">
                  {productData.sealingHead.strapThickness.min} - {productData.sealingHead.strapThickness.max} {productData.sealingHead.strapThickness.unit}
                </span>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex items-center justify-between p-6 rounded-2xl bg-luxury-space-black/50 border border-platinum-800 hover:border-crimson-500/30 transition-all duration-500"
            >
              <span className="text-platinum-400 font-light">Strap Materials</span>
              <span className="text-white font-medium">{productData.sealingHead.strapMaterials.join(', ')}</span>
            </motion.div>

            {productData.sealingHead.mounting && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex items-center justify-between p-6 rounded-2xl bg-luxury-space-black/50 border border-platinum-800 hover:border-crimson-500/30 transition-all duration-500"
              >
                <span className="text-platinum-400 font-light">Mounting</span>
                <span className="text-white font-medium">{productData.sealingHead.mounting}</span>
              </motion.div>
            )}

            {productData.sealingHead.availability && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="flex items-center justify-between p-6 rounded-2xl bg-luxury-space-black/50 border border-platinum-800 hover:border-amber-500/30 transition-all duration-500 md:col-span-2"
              >
                <span className="text-platinum-400 font-light flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Availability
                </span>
                <span className="text-amber-400 font-medium">{productData.sealingHead.availability}</span>
              </motion.div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Features & Options Section
  function FeaturesSection() {
    if (!productData.includedFeatures && !productData.optionalAccessories) return null;

    return (
      <section className="py-32 bg-gradient-to-b from-luxury-space-black to-luxury-dark-gray">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          {productData.includedFeatures && productData.includedFeatures.length > 0 && (
            <div className="mb-20">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className={`text-sm uppercase tracking-[0.3em] ${isXpertLine ? 'text-crimson-500' : 'text-amber-500'} mb-8 font-medium`}>
                  Standard Equipment
                </p>
                <h2 className="font-serif text-5xl sm:text-6xl font-semibold text-white">
                  Included Features
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productData.includedFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="premium-card-dark p-6 border-l-4 border-green-500"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-green-500/10">
                        <CheckCircle2 className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-green-400 font-semibold mb-2">
                          Included
                        </div>
                        <h4 className="text-white font-semibold text-lg">{feature}</h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {productData.optionalAccessories && productData.optionalAccessories.length > 0 && (
            <div>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-16"
              >
                <p className={`text-sm uppercase tracking-[0.3em] ${isXpertLine ? 'text-crimson-500' : 'text-amber-500'} mb-8 font-medium`}>
                  Customization
                </p>
                <h2 className="font-serif text-5xl sm:text-6xl font-semibold text-white">
                  Optional Accessories
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {productData.optionalAccessories.map((accessory, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="premium-card-dark p-6 border-l-4 border-amber-500"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-amber-500/10">
                        <Package className="h-5 w-5 text-amber-400" />
                      </div>
                      <div>
                        <div className="text-xs uppercase tracking-wider text-amber-400 font-semibold mb-2">
                          Optional
                        </div>
                        <h4 className="text-white font-semibold">{accessory}</h4>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }

  // Certifications Section
  function CertificationsSection() {
    return (
      <section className="py-32 bg-luxury-dark-gray">
        <div className="max-w-5xl mx-auto px-8 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className={`text-sm uppercase tracking-[0.3em] ${isXpertLine ? 'text-crimson-500' : 'text-amber-500'} mb-8 font-medium`}>
              Quality Assurance
            </p>
            <h2 className="font-serif text-5xl sm:text-6xl font-semibold text-white">
              Certifications & Compliance
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-8"
          >
            {productData.certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="premium-card-dark p-8 text-center min-w-[200px]"
              >
                <div className="p-4 rounded-full bg-green-500/10 inline-flex mb-4">
                  <Award className="h-8 w-8 text-green-400" />
                </div>
                <h4 className="text-white font-semibold text-lg">{cert}</h4>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    );
  }

  // Application Examples Section
  function ApplicationsSection() {
    if (!applicationImages || applicationImages.length === 0) return null;

    return (
      <section className="py-32 bg-gradient-to-b from-luxury-space-black to-luxury-dark-gray">
        <div className="max-w-7xl mx-auto px-8 sm:px-12">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className={`text-sm uppercase tracking-[0.3em] ${isXpertLine ? 'text-crimson-500' : 'text-amber-500'} mb-8 font-medium`}>
              Real-World Use
            </p>
            <h2 className="font-serif text-5xl sm:text-6xl font-semibold text-white">
              Application Examples
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {applicationImages.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="premium-card-dark p-4 overflow-hidden"
              >
                <div className="relative h-64 rounded-lg overflow-hidden">
                  <Image src={image} alt={`Application ${index + 1}`} fill className="object-cover" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // CTA Section
  function CTASection() {
    return (
      <section className="py-32 bg-luxury-dark-gray relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10 blur-3xl bg-gradient-to-br from-crimson-500 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto px-8 sm:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-white mb-12 leading-tight">
              Ready to Transform
              <br />
              <span className={`italic ${isXpertLine ? 'text-crimson-500' : 'text-amber-500'}`}>
                Your Operations?
              </span>
            </h2>
            <p className="text-xl sm:text-2xl text-platinum-300 mb-16 font-light leading-relaxed max-w-2xl mx-auto">
              Contact us today for a personalized demonstration and quote for the {productData.fullName}.
            </p>

            <Link href="/contact">
              <button className={`${isXpertLine ? 'btn-premium' : 'btn-economy'} text-lg group`}>
                <span className="relative z-10 flex items-center">
                  Request Quote & Demo
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </button>
            </Link>

            <div className="mt-16 flex flex-wrap justify-center gap-12 text-sm text-platinum-400 font-light">
              {['AGR Certified', 'Expert Support', 'Customizable'].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <CheckCircle2 className={`h-4 w-4 ${isXpertLine ? 'text-crimson-500' : 'text-amber-500'}`} />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <>
      <MinimalLoadingScreen />
      <MainLayout>
        <div className="bg-luxury-space-black">
          <HeroSection />
          <SystemSpecsSection />
          <SealingHeadSection />
          <FeaturesSection />
          <CertificationsSection />
          <ApplicationsSection />
          <CTASection />
        </div>
      </MainLayout>
    </>
  );
}
