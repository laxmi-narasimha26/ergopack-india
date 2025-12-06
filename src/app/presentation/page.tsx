'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import {
    ChevronLeft, ChevronRight, ChevronDown,
    Zap, Battery, Settings, Clock, CheckCircle, TrendingDown,
    Phone, ArrowRight, Package, Gauge, Award, Shield, Globe
} from 'lucide-react';
import { products, comparisonMatrix, roiStats, ProductKey } from './data';

// =====================================================
// HERO SECTION - Simple, Impactful Intro
// =====================================================

function HeroSection() {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative px-4">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />

            {/* Content */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center"
            >
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-[#FFB81C] tracking-[0.4em] uppercase text-sm mb-6"
                >
                    50+ Years of German Engineering
                </motion.p>

                <motion.h1
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="text-5xl md:text-7xl lg:text-8xl font-black mb-6"
                >
                    <span className="text-white">Pallet Strapping</span>
                    <br />
                    <span className="bg-gradient-to-r from-[#C8102E] to-[#FFB81C] bg-clip-text text-transparent">
                        Reimagined
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-12"
                >
                    Discover the ErgoPack mobile strapping systems – the ergonomic revolution
                    trusted by manufacturers in 60+ countries worldwide.
                </motion.p>

                {/* Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 }}
                    className="flex flex-wrap justify-center gap-8 md:gap-12 mb-12"
                >
                    {[
                        { value: '60+', label: 'Countries' },
                        { value: '50+', label: 'Years' },
                        { value: '1M+', label: 'Units Sold' },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-3xl md:text-4xl font-black text-[#FFB81C]">{stat.value}</div>
                            <div className="text-white/50 text-sm">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
            >
                <span className="text-white/40 text-sm mb-2">Scroll to explore</span>
                <ChevronDown className="w-6 h-6 text-white/40 animate-bounce" />
            </motion.div>
        </section>
    );
}

// =====================================================
// STRAPPING DEMONSTRATION - Realistic Pallet Visual
// =====================================================

function StrappingDemoSection() {
    const [strapProgress, setStrapProgress] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setIsAnimating(true);
            setStrapProgress(prev => {
                if (prev >= 100) {
                    setTimeout(() => {
                        setIsAnimating(false);
                        setStrapProgress(0);
                    }, 1000);
                    return 100;
                }
                return prev + 2;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <section className="min-h-screen py-20 px-4 relative">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-[#FFB81C] tracking-widest uppercase text-sm mb-4">
                        How It Works
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Mobile Pallet Strapping
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Secure your pallets with industrial-strength straps in seconds.
                        No fixed infrastructure needed – take the machine to the pallet.
                    </p>
                </motion.div>

                {/* Pallet + Machine Visualization */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
                    {/* Pallet visualization */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative w-80 h-80 flex items-center justify-center"
                    >
                        {/* Wooden pallet base */}
                        <div className="relative">
                            {/* Pallet boards (horizontal) */}
                            <div className="flex flex-col gap-1">
                                <div className="w-64 h-4 bg-gradient-to-r from-amber-700 to-amber-600 rounded-sm shadow-lg" />
                                <div className="w-64 h-4 bg-gradient-to-r from-amber-700 to-amber-600 rounded-sm shadow-lg" />
                                <div className="w-64 h-4 bg-gradient-to-r from-amber-700 to-amber-600 rounded-sm shadow-lg" />
                            </div>

                            {/* Cargo boxes on pallet */}
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col gap-1">
                                <div className="flex gap-1">
                                    <div className="w-20 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-sm flex items-center justify-center shadow-md">
                                        <Package className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div className="w-20 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-sm flex items-center justify-center shadow-md">
                                        <Package className="w-6 h-6 text-gray-600" />
                                    </div>
                                    <div className="w-20 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-sm flex items-center justify-center shadow-md">
                                        <Package className="w-6 h-6 text-gray-600" />
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <div className="w-20 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-sm flex items-center justify-center shadow-md">
                                        <Package className="w-6 h-6 text-gray-700" />
                                    </div>
                                    <div className="w-20 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-sm flex items-center justify-center shadow-md">
                                        <Package className="w-6 h-6 text-gray-700" />
                                    </div>
                                    <div className="w-20 h-16 bg-gradient-to-br from-gray-400 to-gray-500 rounded-sm flex items-center justify-center shadow-md">
                                        <Package className="w-6 h-6 text-gray-700" />
                                    </div>
                                </div>
                            </div>

                            {/* Animated strap */}
                            <motion.div
                                className="absolute inset-0"
                                style={{
                                    opacity: strapProgress > 10 ? 1 : 0,
                                }}
                            >
                                {/* Vertical strap overlay */}
                                <div
                                    className="absolute left-1/2 -translate-x-1/2 w-4 bg-[#FFB81C] opacity-80"
                                    style={{
                                        top: 0,
                                        bottom: 0,
                                        clipPath: `inset(${100 - strapProgress}% 0 0 0)`,
                                    }}
                                />
                            </motion.div>
                        </div>

                        {/* Strapping machine indicator */}
                        <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                            <div className="w-16 h-24 bg-gradient-to-b from-[#C8102E] to-[#a00d24] rounded-lg shadow-xl flex flex-col items-center justify-center gap-1.5 border border-white/10">
                                <div className="w-8 h-1 bg-[#FFB81C] rounded-full" />
                                <div className="w-8 h-1 bg-[#FFB81C] rounded-full" />
                                <Settings className="w-5 h-5 text-white/80 animate-spin" style={{ animationDuration: '3s' }} />
                            </div>
                            {/* Chain line */}
                            <div className="absolute top-1/2 -left-4 w-4 h-1 bg-[#FFB81C]" />
                        </div>
                    </motion.div>

                    {/* Steps */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6"
                    >
                        {[
                            { step: '1', title: 'Position', desc: 'Move the machine next to the pallet' },
                            { step: '2', title: 'Wrap', desc: 'Chain automatically wraps around the pallet' },
                            { step: '3', title: 'Tension', desc: 'Apply precise tension to the strap' },
                            { step: '4', title: 'Seal', desc: 'Heat-seal the strap securely' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${strapProgress > i * 25 ? 'bg-[#FFB81C] text-black' : 'bg-white/10 text-white/50'
                                    } transition-colors duration-300`}>
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className={`font-bold ${strapProgress > i * 25 ? 'text-[#FFB81C]' : 'text-white/70'} transition-colors duration-300`}>
                                        {item.title}
                                    </h3>
                                    <p className="text-white/50 text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// =====================================================
// HORIZONTAL PRODUCT CAROUSEL - Full Product Details
// =====================================================

const productOrder: ProductKey[] = ['700', 'GO', '726X'];

function ProductCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeProduct = products[productOrder[activeIndex]];

    const nextProduct = () => {
        setActiveIndex((prev) => (prev + 1) % productOrder.length);
    };

    const prevProduct = () => {
        setActiveIndex((prev) => (prev - 1 + productOrder.length) % productOrder.length);
    };

    const getIconForFeature = (feature: string) => {
        if (feature.toLowerCase().includes('battery') || feature.toLowerCase().includes('lithium')) return Battery;
        if (feature.toLowerCase().includes('cycle') || feature.toLowerCase().includes('charge')) return Zap;
        if (feature.toLowerCase().includes('speed')) return Gauge;
        if (feature.toLowerCase().includes('siemens') || feature.toLowerCase().includes('control')) return Settings;
        if (feature.toLowerCase().includes('laser')) return Award;
        return CheckCircle;
    };

    return (
        <section className="min-h-screen py-20 px-4 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-[#FFB81C] tracking-widest uppercase text-sm mb-4">
                        Our Products
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Choose Your System
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        From manual to premium lithium-ion – we have the perfect strapping solution for your needs.
                    </p>
                </motion.div>

                {/* Product selector tabs */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex bg-white/5 rounded-full p-1.5 gap-1">
                        {productOrder.map((key, i) => (
                            <button
                                key={key}
                                onClick={() => setActiveIndex(i)}
                                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${i === activeIndex
                                        ? 'text-black'
                                        : 'text-white/60 hover:text-white'
                                    }`}
                                style={{
                                    backgroundColor: i === activeIndex ? products[key].color : 'transparent',
                                }}
                            >
                                {products[key].fullName}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Product card with navigation */}
                <div className="relative">
                    {/* Navigation arrows */}
                    <button
                        onClick={prevProduct}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6 text-white" />
                    </button>

                    <button
                        onClick={nextProduct}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
                    >
                        <ChevronRight className="w-6 h-6 text-white" />
                    </button>

                    {/* Product content */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeProduct.model}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.4 }}
                            className="mx-16"
                        >
                            <div
                                className="rounded-3xl p-8 md:p-12"
                                style={{
                                    background: `linear-gradient(135deg, ${activeProduct.color}15 0%, #0a0a0a 50%, ${activeProduct.color}10 100%)`,
                                    border: `1px solid ${activeProduct.color}30`,
                                }}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    {/* Left: Product info */}
                                    <div>
                                        {/* Badge */}
                                        <div
                                            className="inline-block px-4 py-1 rounded-full text-sm font-semibold mb-4"
                                            style={{ backgroundColor: activeProduct.color, color: '#000' }}
                                        >
                                            {activeProduct.category}
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-4xl md:text-5xl font-black text-white mb-2">
                                            {activeProduct.fullName}
                                        </h3>

                                        {/* Tagline */}
                                        <p
                                            className="text-xl font-semibold mb-4"
                                            style={{ color: activeProduct.color }}
                                        >
                                            {activeProduct.tagline}
                                        </p>

                                        {/* Description */}
                                        <p className="text-white/60 text-lg mb-8">
                                            {activeProduct.description}
                                        </p>

                                        {/* Hero stat */}
                                        <div className="flex items-end gap-2 mb-8">
                                            <span
                                                className="text-6xl md:text-7xl font-black"
                                                style={{ color: activeProduct.color }}
                                            >
                                                {activeProduct.heroValue}
                                            </span>
                                            <span className="text-2xl text-white/70 mb-2">
                                                {activeProduct.heroUnit}
                                            </span>
                                            <span className="text-white/50 text-sm ml-2 mb-3">
                                                {activeProduct.heroLabel}
                                            </span>
                                        </div>

                                        {/* Features list */}
                                        <div className="space-y-3">
                                            {activeProduct.features.map((feature, i) => {
                                                const Icon = getIconForFeature(feature);
                                                return (
                                                    <div key={i} className="flex items-start gap-3">
                                                        <Icon
                                                            className="w-5 h-5 mt-0.5 flex-shrink-0"
                                                            style={{ color: activeProduct.color }}
                                                        />
                                                        <span className="text-white/80">{feature}</span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Right: Specifications */}
                                    <div className="space-y-6">
                                        {/* Specs grid */}
                                        <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                                            <h4 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                                                <Settings className="w-5 h-5" style={{ color: activeProduct.color }} />
                                                Technical Specifications
                                            </h4>

                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-white/5 rounded-lg p-4">
                                                    <div className="text-white/50 text-sm">System Weight</div>
                                                    <div className="text-2xl font-bold text-white">{activeProduct.specs.weight} kg</div>
                                                </div>
                                                <div className="bg-white/5 rounded-lg p-4">
                                                    <div className="text-white/50 text-sm">Chain Length</div>
                                                    <div className="text-2xl font-bold text-white">{activeProduct.specs.chainLength} m</div>
                                                </div>
                                                {activeProduct.specs.chainSpeed && (
                                                    <div className="bg-white/5 rounded-lg p-4">
                                                        <div className="text-white/50 text-sm">Chain Speed</div>
                                                        <div className="text-2xl font-bold text-white">{activeProduct.specs.chainSpeed} m/min</div>
                                                    </div>
                                                )}
                                                {activeProduct.specs.cycles && (
                                                    <div className="bg-white/5 rounded-lg p-4">
                                                        <div className="text-white/50 text-sm">Cycles/Charge</div>
                                                        <div className="text-2xl font-bold text-white">{activeProduct.specs.cycles}</div>
                                                    </div>
                                                )}
                                                <div className="bg-white/5 rounded-lg p-4">
                                                    <div className="text-white/50 text-sm">Pallet Width Range</div>
                                                    <div className="text-2xl font-bold text-white">
                                                        {activeProduct.specs.palletWidth.min}-{activeProduct.specs.palletWidth.max} cm
                                                    </div>
                                                </div>
                                                <div className="bg-white/5 rounded-lg p-4">
                                                    <div className="text-white/50 text-sm">Pallet Height Range</div>
                                                    <div className="text-2xl font-bold text-white">
                                                        {activeProduct.specs.palletHeight.min}-{activeProduct.specs.palletHeight.max} cm
                                                    </div>
                                                </div>
                                                {activeProduct.specs.chargingTime && (
                                                    <div className="bg-white/5 rounded-lg p-4 col-span-2">
                                                        <div className="text-white/50 text-sm">Charging Time</div>
                                                        <div className="text-2xl font-bold text-white">{activeProduct.specs.chargingTime}</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Dimensions */}
                                        <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                                            <h4 className="text-lg font-bold text-white mb-4">Dimensions (L × W × H)</h4>
                                            <p className="text-2xl font-mono text-white">
                                                {activeProduct.specs.dimensions.length} × {activeProduct.specs.dimensions.width} × {activeProduct.specs.dimensions.height} mm
                                            </p>
                                        </div>

                                        {/* Materials */}
                                        <div className="bg-black/40 rounded-2xl p-6 border border-white/5">
                                            <h4 className="text-lg font-bold text-white mb-4">Compatible Strap Materials</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {activeProduct.materials.map((mat, i) => (
                                                    <span
                                                        key={i}
                                                        className="px-3 py-1 rounded-full text-sm font-medium"
                                                        style={{
                                                            backgroundColor: `${activeProduct.color}20`,
                                                            color: activeProduct.color
                                                        }}
                                                    >
                                                        {mat}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Certifications */}
                                        <div className="flex flex-wrap gap-3">
                                            {activeProduct.certifications.map((cert, i) => (
                                                <div
                                                    key={i}
                                                    className="flex items-center gap-2 px-3 py-2 bg-white/5 rounded-lg"
                                                >
                                                    <Shield className="w-4 h-4 text-green-500" />
                                                    <span className="text-white/70 text-sm">{cert}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* 726X Li advantages (only for premium) */}
                                {activeProduct.advantages && (
                                    <div className="mt-12 pt-8 border-t border-white/10">
                                        <h4 className="text-xl font-bold text-white mb-6 text-center">
                                            Why Choose {activeProduct.fullName}?
                                        </h4>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {activeProduct.advantages.map((adv, i) => (
                                                <div
                                                    key={i}
                                                    className="bg-black/40 rounded-xl p-4 text-center border border-white/5"
                                                >
                                                    <div
                                                        className="text-3xl font-black mb-1"
                                                        style={{ color: activeProduct.color }}
                                                    >
                                                        {adv.value}
                                                    </div>
                                                    <div className="text-white font-semibold text-sm">{adv.title}</div>
                                                    <div className="text-white/50 text-xs">{adv.detail}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Dots indicator */}
                    <div className="flex justify-center gap-2 mt-8">
                        {productOrder.map((_, i) => (
                            <button
                                key={i}
                                onClick={() => setActiveIndex(i)}
                                className={`w-3 h-3 rounded-full transition-all ${i === activeIndex
                                        ? 'w-8'
                                        : 'bg-white/30'
                                    }`}
                                style={{
                                    backgroundColor: i === activeIndex ? products[productOrder[i]].color : undefined,
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// =====================================================
// COMPARISON TABLE
// =====================================================

function ComparisonSection() {
    return (
        <section className="py-20 px-4">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <p className="text-[#FFB81C] tracking-widest uppercase text-sm mb-4">
                        Side by Side
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Compare Models
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Find the perfect match for your strapping requirements.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-white/5 rounded-2xl overflow-hidden border border-white/10"
                >
                    {/* Table header */}
                    <div className="grid grid-cols-4 bg-white/5">
                        <div className="p-4 font-semibold text-white/60">Feature</div>
                        {productOrder.map((key) => (
                            <div
                                key={key}
                                className="p-4 text-center font-bold"
                                style={{ color: products[key].color }}
                            >
                                {products[key].fullName}
                            </div>
                        ))}
                    </div>

                    {/* Table rows */}
                    {comparisonMatrix.map((row, i) => (
                        <div
                            key={i}
                            className={`grid grid-cols-4 ${i % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
                        >
                            <div className="p-4 text-white/70 font-medium border-t border-white/5">
                                {row.feature}
                            </div>
                            <div className="p-4 text-center text-white/80 border-t border-white/5">
                                {row['700']}
                            </div>
                            <div className="p-4 text-center text-white/80 border-t border-white/5">
                                {row['GO']}
                            </div>
                            <div className="p-4 text-center text-white/80 border-t border-white/5">
                                {row['726X']}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

// =====================================================
// ROI SECTION
// =====================================================

function ROISection() {
    return (
        <section className="py-20 px-4 bg-gradient-to-b from-transparent via-[#0a0505] to-transparent">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <p className="text-[#FFB81C] tracking-widest uppercase text-sm mb-4">
                        Return on Investment
                    </p>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                        The Business Case
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        ErgoPack systems deliver measurable improvements in productivity and cost savings.
                    </p>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {roiStats.map((stat, i) => {
                        const Icon = stat.icon === 'zap' ? Zap :
                            stat.icon === 'clock' ? Clock :
                                stat.icon === 'trending-down' ? TrendingDown : CheckCircle;
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white/5 rounded-2xl p-6 text-center border border-white/10 hover:border-[#FFB81C]/30 transition-colors"
                            >
                                <div className="w-12 h-12 rounded-full bg-[#FFB81C]/10 flex items-center justify-center mx-auto mb-4">
                                    <Icon className="w-6 h-6 text-[#FFB81C]" />
                                </div>
                                <div className="text-4xl md:text-5xl font-black text-[#FFB81C] mb-1">
                                    {stat.value}
                                </div>
                                <div className="text-white/60 text-sm">{stat.label}</div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

// =====================================================
// CTA SECTION
// =====================================================

function CTASection() {
    return (
        <section className="py-32 px-4">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center"
            >
                <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                    Ready to Transform Your
                    <span className="block text-[#FFB81C]">Pallet Strapping?</span>
                </h2>

                <p className="text-white/60 text-lg mb-12 max-w-2xl mx-auto">
                    Join manufacturers across India who have upgraded to ErgoPack.
                    Get a personalized consultation and see the difference German engineering makes.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/contact"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#C8102E] hover:bg-[#a00d24] text-white font-bold rounded-full transition-colors"
                    >
                        <Phone className="w-5 h-5" />
                        Request Demo
                    </a>
                    <a
                        href="/products"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-full transition-colors"
                    >
                        Explore Products
                        <ArrowRight className="w-5 h-5" />
                    </a>
                </div>

                {/* Trust badges */}
                <div className="flex flex-wrap justify-center gap-8 mt-16">
                    {[
                        { icon: Shield, label: 'ISO 12100:2010' },
                        { icon: Award, label: 'AGR Certified' },
                        { icon: Globe, label: '60+ Countries' },
                    ].map((badge, i) => {
                        const Icon = badge.icon;
                        return (
                            <div key={i} className="flex items-center gap-2 text-white/50">
                                <Icon className="w-5 h-5" />
                                <span>{badge.label}</span>
                            </div>
                        );
                    })}
                </div>
            </motion.div>
        </section>
    );
}

// =====================================================
// MAIN PAGE
// =====================================================

export default function PresentationPage() {
    return (
        <div className="bg-black text-white min-h-screen overflow-x-hidden">
            {/* Fixed header */}
            <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <a href="/" className="flex items-center gap-2">
                        <span className="text-xl font-bold">
                            <span className="text-white">ErgoPack</span>
                            <span className="text-[#C8102E]">India</span>
                        </span>
                    </a>
                    <a
                        href="/contact"
                        className="px-4 py-2 bg-[#C8102E] hover:bg-[#a00d24] text-white text-sm font-semibold rounded-full transition-colors"
                    >
                        Contact Us
                    </a>
                </div>
            </header>

            {/* Sections */}
            <HeroSection />
            <StrappingDemoSection />
            <ProductCarousel />
            <ComparisonSection />
            <ROISection />
            <CTASection />

            {/* Footer */}
            <footer className="py-8 px-4 border-t border-white/10">
                <div className="max-w-7xl mx-auto text-center text-white/40 text-sm">
                    © {new Date().getFullYear()} ErgoPack India. German Engineering for Indian Industry.
                </div>
            </footer>
        </div>
    );
}
