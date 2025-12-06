'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { featuredProducts, comparisonData, ProductKey } from './data';
import {
    Battery, Zap, Settings, ChevronDown, ArrowRight,
    Clock, Weight, Gauge, CheckCircle2, Sparkles,
    Play, Phone
} from 'lucide-react';

// ============================================
// SECTION 1: CINEMATIC INTRO
// ============================================
function CinematicIntro() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            {/* Particle Background */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(200,16,46,0.15)_0%,transparent_50%)]" />
                {[...Array(50)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-red-500/30 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0, 1, 0],
                            scale: [0, 1.5, 0],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Main Text */}
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 text-center"
            >
                <motion.h1
                    className="text-[15vw] md:text-[20vw] font-black tracking-tighter leading-none text-gradient-red"
                    animate={{
                        textShadow: [
                            '0 0 20px rgba(200,16,46,0.5)',
                            '0 0 60px rgba(200,16,46,0.8)',
                            '0 0 20px rgba(200,16,46,0.5)',
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    STRAPPING
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                    className="text-xl md:text-2xl text-white/60 mt-8 tracking-[0.3em] uppercase"
                >
                    Reimagined
                </motion.p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-12 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <ChevronDown className="w-8 h-8 text-white/40" />
            </motion.div>
        </section>
    );
}

// ============================================
// SECTION 2: BRAND REVEAL
// ============================================
function BrandReveal() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);

    return (
        <section ref={ref} className="relative min-h-screen flex items-center justify-center py-32">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
              linear-gradient(rgba(200,16,46,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200,16,46,0.3) 1px, transparent 1px)
            `,
                        backgroundSize: '100px 100px',
                    }}
                />
            </div>

            <motion.div style={{ opacity, scale }} className="relative z-10 text-center px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="mb-8"
                >
                    <span className="text-sm md:text-base tracking-[0.5em] text-[#FFB81C] uppercase">
                        German Engineering • Indian Excellence
                    </span>
                </motion.div>

                <h2 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-8">
                    <span className="text-white">ERGOPACK</span>
                    <br />
                    <span className="text-gradient-red">INDIA</span>
                </h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="text-xl md:text-2xl text-white/60 max-w-2xl mx-auto"
                >
                    Transforming pallet strapping across industries with precision-engineered automation
                </motion.p>
            </motion.div>
        </section>
    );
}

// ============================================
// SECTION 3: PRODUCT SELECTOR
// ============================================
function ProductSelector({ onSelect }: { onSelect: (key: ProductKey) => void }) {
    const products = [
        { key: '700' as ProductKey, ...featuredProducts['700'] },
        { key: 'GO' as ProductKey, ...featuredProducts['GO'] },
        { key: '726X' as ProductKey, ...featuredProducts['726X'] },
    ];

    return (
        <section className="relative min-h-screen flex items-center py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm tracking-[0.5em] text-[#FFB81C] uppercase mb-4 block">
                        Choose Your Solution
                    </span>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-white">
                        Three Paths to
                        <span className="text-gradient-gold"> Excellence</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {products.map((product, index) => (
                        <motion.div
                            key={product.key}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.8 }}
                            whileHover={{ scale: 1.02, y: -10 }}
                            onClick={() => onSelect(product.key)}
                            className="group cursor-pointer"
                        >
                            <div
                                className="glass-card rounded-3xl p-8 h-full transition-all duration-500 hover:border-[#C8102E]/50"
                                style={{
                                    boxShadow: `0 0 0 rgba(${product.key === '726X' ? '255,184,28' : '200,16,46'},0)`,
                                }}
                            >
                                {/* Product Image */}
                                <div className="relative h-48 mb-6 flex items-center justify-center">
                                    <motion.div
                                        whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        className="relative w-full h-full"
                                    >
                                        <div
                                            className="absolute inset-0 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"
                                            style={{ backgroundColor: product.color }}
                                        />
                                        <Image
                                            src={product.image}
                                            alt={product.fullName}
                                            fill
                                            className="object-contain drop-shadow-2xl"
                                        />
                                    </motion.div>
                                </div>

                                {/* Category Badge */}
                                <div
                                    className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-4"
                                    style={{ backgroundColor: `${product.color}20`, color: product.color }}
                                >
                                    {product.category}
                                </div>

                                {/* Model Name */}
                                <h3 className="text-4xl font-black text-white mb-2">
                                    {product.model}
                                </h3>
                                <p className="text-white/60 mb-6">{product.tagline}</p>

                                {/* Hero Stat */}
                                <div className="glass-card rounded-2xl p-4 mb-6">
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black" style={{ color: product.color }}>
                                            {product.heroStat.value}
                                        </span>
                                        <span className="text-white/60">{product.heroStat.unit}</span>
                                    </div>
                                    <span className="text-sm text-white/40">{product.heroStat.label}</span>
                                </div>

                                {/* CTA */}
                                <div className="flex items-center gap-2 text-white/60 group-hover:text-white transition-colors">
                                    <span>Explore</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 4-6: PRODUCT SHOWCASE (Reusable)
// ============================================
function ProductShowcase({ productKey }: { productKey: ProductKey }) {
    const product = featuredProducts[productKey];
    const isGold = productKey === '726X';

    return (
        <section className="relative min-h-screen flex items-center py-32 overflow-hidden">
            {/* Background Glow */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] opacity-20"
                style={{ backgroundColor: product.color }}
            />

            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Product Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-square">
                            <motion.div
                                animate={{
                                    y: [0, -20, 0],
                                    rotateY: [0, 5, 0, -5, 0],
                                }}
                                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                                className="relative w-full h-full"
                            >
                                <Image
                                    src={product.image}
                                    alt={product.fullName}
                                    fill
                                    className="object-contain drop-shadow-2xl"
                                />
                            </motion.div>

                            {/* Floating Stats */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className={`absolute -right-4 top-1/4 glass-card rounded-2xl p-4 ${isGold ? 'glow-gold' : 'glow-red'}`}
                            >
                                <div className="text-3xl font-black" style={{ color: product.color }}>
                                    {product.heroStat.value}
                                </div>
                                <div className="text-xs text-white/60 uppercase tracking-wider">
                                    {product.heroStat.unit}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Category */}
                        <div
                            className="inline-block px-6 py-2 rounded-full text-sm font-bold tracking-wider uppercase"
                            style={{ backgroundColor: `${product.color}20`, color: product.color }}
                        >
                            {product.category}
                        </div>

                        {/* Model Name */}
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter">
                            <span className={isGold ? 'text-gradient-gold' : 'text-gradient-red'}>
                                {product.model}
                            </span>
                        </h2>

                        {/* Tagline */}
                        <p className="text-2xl md:text-3xl text-white/80 font-light">
                            {product.tagline}
                        </p>

                        {/* Description */}
                        <p className="text-lg text-white/60">
                            {product.description}
                        </p>

                        {/* Highlights */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {product.highlights.map((highlight, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: 20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: product.color }} />
                                    <span className="text-white/80">{highlight}</span>
                                </motion.div>
                            ))}
                        </div>

                        {/* Advantages (for 726X) */}
                        {'advantages' in product && (
                            <div className="glass-card rounded-2xl p-6 mt-8">
                                <h4 className="text-lg font-bold text-[#FFB81C] mb-4 flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    Lithium-Ion Advantage
                                </h4>
                                <div className="grid grid-cols-3 gap-4">
                                    {product.advantages?.map((adv, i) => (
                                        <div key={i} className="text-center">
                                            <div className="text-2xl font-black text-white">{adv.label}</div>
                                            <div className="text-sm text-white/40">{adv.detail}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 7: TECHNICAL COMPARISON GRID
// ============================================
function TechnicalGrid() {
    return (
        <section className="relative min-h-screen flex items-center py-32">
            <div className="max-w-6xl mx-auto px-4 md:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm tracking-[0.5em] text-[#FFB81C] uppercase mb-4 block">
                        Technical Excellence
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white">
                        Side by Side
                        <span className="text-gradient-red"> Comparison</span>
                    </h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card rounded-3xl overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-white/10">
                                    <th className="p-6 text-left text-white/60 font-normal">Feature</th>
                                    <th className="p-6 text-center">
                                        <div className="text-2xl font-black text-white">700</div>
                                        <div className="text-xs text-white/40">Manual</div>
                                    </th>
                                    <th className="p-6 text-center">
                                        <div className="text-2xl font-black text-white">GO</div>
                                        <div className="text-xs text-white/40">Economy</div>
                                    </th>
                                    <th className="p-6 text-center bg-[#FFB81C]/10">
                                        <div className="text-2xl font-black text-[#FFB81C]">726X Li</div>
                                        <div className="text-xs text-[#FFB81C]/60">X-pert</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, i) => (
                                    <motion.tr
                                        key={row.feature}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                    >
                                        <td className="p-6 text-white/60">{row.feature}</td>
                                        <td className="p-6 text-center text-white">{row['700']}</td>
                                        <td className="p-6 text-center text-white">{row['GO']}</td>
                                        <td className="p-6 text-center text-[#FFB81C] font-semibold bg-[#FFB81C]/5">
                                            {row['726X']}
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 8: GERMAN ENGINEERING STORY
// ============================================
function EngineeringStory() {
    const milestones = [
        { year: '1970s', event: 'ErgoPack founded in Germany' },
        { year: '1990s', event: 'First automated strapping systems' },
        { year: '2010s', event: 'Lithium-Ion technology introduction' },
        { year: '2020s', event: 'Industry 4.0 integration' },
        { year: 'Today', event: 'Serving 60+ countries worldwide' },
    ];

    return (
        <section className="relative min-h-screen flex items-center py-32 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-repeat" />
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <span className="text-sm tracking-[0.5em] text-[#FFB81C] uppercase">
                            Our Heritage
                        </span>

                        <h2 className="text-4xl md:text-6xl font-black text-white">
                            50+ Years of
                            <span className="text-gradient-red"> German Precision</span>
                        </h2>

                        <p className="text-lg text-white/60">
                            From the heart of German engineering excellence, ErgoPack has been
                            transforming industrial strapping for over five decades. Our commitment
                            to precision, reliability, and innovation drives everything we create.
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8">
                            {[
                                { value: '60+', label: 'Countries' },
                                { value: '50+', label: 'Years' },
                                { value: '1M+', label: 'Units' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="text-4xl font-black text-gradient-gold">{stat.value}</div>
                                    <div className="text-sm text-white/40 uppercase tracking-wider">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Timeline */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#C8102E] via-[#FFB81C] to-transparent" />

                        {milestones.map((milestone, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + i * 0.1 }}
                                className="relative pl-12 pb-8"
                            >
                                <div className="absolute left-0 w-8 h-8 rounded-full bg-black border-2 border-[#C8102E] flex items-center justify-center">
                                    <div className="w-3 h-3 rounded-full bg-[#C8102E]" />
                                </div>
                                <div className="glass-card rounded-2xl p-6">
                                    <div className="text-[#FFB81C] font-bold mb-1">{milestone.year}</div>
                                    <div className="text-white">{milestone.event}</div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 9: ROI TEASER
// ============================================
function ROITeaser() {
    const stats = [
        { value: '3×', label: 'Throughput Increase', icon: Zap },
        { value: '18', label: 'Month Payback', icon: Clock },
        { value: '75%', label: 'Labor Cost Reduction', icon: Gauge },
    ];

    return (
        <section className="relative min-h-screen flex items-center py-32">
            <div className="max-w-7xl mx-auto px-4 md:px-8 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <span className="text-sm tracking-[0.5em] text-[#FFB81C] uppercase mb-4 block">
                        Return on Investment
                    </span>
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
                        The Numbers
                        <span className="text-gradient-gold"> Speak</span>
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Our customers see measurable results from day one
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 60 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.2 }}
                            className="glass-card rounded-3xl p-12 text-center hover:glow-gold transition-all duration-500"
                        >
                            <stat.icon className="w-12 h-12 mx-auto mb-6 text-[#FFB81C]" />
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 200 }}
                                className="text-6xl md:text-7xl font-black text-gradient-gold mb-4"
                            >
                                {stat.value}
                            </motion.div>
                            <div className="text-lg text-white/60 uppercase tracking-wider">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

// ============================================
// SECTION 10: FINAL CTA
// ============================================
function FinalCTA() {
    return (
        <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden">
            {/* Converging Particles */}
            <div className="absolute inset-0">
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-[#C8102E] rounded-full"
                        initial={{
                            x: `${Math.random() * 100}vw`,
                            y: `${Math.random() * 100}vh`,
                            opacity: 0,
                        }}
                        animate={{
                            x: '50vw',
                            y: '50vh',
                            opacity: [0, 1, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 3,
                            ease: 'easeIn',
                        }}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center px-4"
            >
                <motion.h2
                    className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8"
                    animate={{
                        textShadow: [
                            '0 0 20px rgba(200,16,46,0.5)',
                            '0 0 80px rgba(200,16,46,0.8)',
                            '0 0 20px rgba(200,16,46,0.5)',
                        ]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <span className="text-white">Experience the</span>
                    <br />
                    <span className="text-gradient-red">Future</span>
                </motion.h2>

                <p className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto">
                    Ready to transform your pallet strapping operations?
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                    <motion.a
                        href="/contact"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-full bg-gradient-to-r from-[#C8102E] to-red-700 text-white font-bold text-lg shadow-2xl glow-red"
                    >
                        <Phone className="w-5 h-5" />
                        Request Demo
                    </motion.a>

                    <motion.a
                        href="/products"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 px-10 py-5 rounded-full glass-card text-white font-bold text-lg hover:bg-white/10 transition-colors"
                    >
                        <Play className="w-5 h-5" />
                        View All Products
                    </motion.a>
                </div>
            </motion.div>
        </section>
    );
}

// ============================================
// SCROLL PROGRESS INDICATOR
// ============================================
function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C8102E] via-[#FFB81C] to-[#C8102E] z-50 origin-left"
            style={{ scaleX }}
        />
    );
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================
export default function PresentationPage() {
    const [selectedProduct, setSelectedProduct] = useState<ProductKey | null>(null);

    return (
        <main className="bg-black">
            <ScrollProgress />

            {/* Section 1: Cinematic Intro */}
            <CinematicIntro />

            {/* Section 2: Brand Reveal */}
            <BrandReveal />

            {/* Section 3: Product Selector */}
            <ProductSelector onSelect={setSelectedProduct} />

            {/* Section 4: Model 700 */}
            <ProductShowcase productKey="700" />

            {/* Section 5: Model GO */}
            <ProductShowcase productKey="GO" />

            {/* Section 6: Model 726X Li */}
            <ProductShowcase productKey="726X" />

            {/* Section 7: Technical Comparison */}
            <TechnicalGrid />

            {/* Section 8: German Engineering */}
            <EngineeringStory />

            {/* Section 9: ROI Teaser */}
            <ROITeaser />

            {/* Section 10: Final CTA */}
            <FinalCTA />
        </main>
    );
}
