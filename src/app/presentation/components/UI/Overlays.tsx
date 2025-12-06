'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { products, comparisonMatrix, roiStats, timeline, ProductKey } from '../../data';
import {
    Zap, Clock, TrendingDown, CheckCircle,
    ArrowRight, Phone, Play, ChevronDown,
    Battery, Gauge, Settings, Award, Shield
} from 'lucide-react';

// =====================================================
// SECTION 0: LOADING COMPLETE INDICATOR
// =====================================================

export function IntroOverlay({ visible }: { visible: boolean }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                >
                    <div className="text-center">
                        <motion.h1
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                            className="text-[15vw] md:text-[18vw] font-black tracking-tighter leading-none"
                            style={{
                                background: 'linear-gradient(135deg, #C8102E 0%, #FF4444 50%, #FFB81C 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                textShadow: '0 0 100px rgba(200,16,46,0.5)',
                            }}
                        >
                            STRAPPING
                        </motion.h1>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="text-xl md:text-3xl text-white/60 mt-6 tracking-[0.5em] uppercase"
                        >
                            Reimagined
                        </motion.p>

                        {/* Scroll indicator */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 1.5, duration: 0.8 }}
                            className="mt-20"
                        >
                            <motion.div
                                animate={{ y: [0, 10, 0] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            >
                                <ChevronDown className="w-10 h-10 text-white/40 mx-auto" />
                            </motion.div>
                            <p className="text-white/30 text-sm tracking-wider mt-2">SCROLL TO EXPLORE</p>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// SECTION 2: BRAND REVEAL
// =====================================================

export function BrandRevealOverlay({ visible, progress }: { visible: boolean; progress: number }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                >
                    <div className="text-center px-4">
                        <motion.div
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.8 }}
                            className="mb-8"
                        >
                            <span className="text-sm md:text-lg tracking-[0.5em] text-[#FFB81C] uppercase">
                                German Engineering • Indian Excellence
                            </span>
                        </motion.div>

                        <motion.h2
                            style={{ opacity: progress }}
                            className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter"
                        >
                            <span className="text-white">ERGOPACK</span>
                            <br />
                            <span
                                style={{
                                    background: 'linear-gradient(135deg, #C8102E 0%, #FF4444 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                INDIA
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: progress }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                            className="text-lg md:text-2xl text-white/60 max-w-2xl mx-auto mt-8"
                        >
                            Transforming pallet strapping across industries with
                            precision-engineered German automation
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// SECTION 4: STRAPPING DEMO
// =====================================================

export function StrappingDemoOverlay({ visible }: { visible: boolean }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none z-10"
                >
                    {/* Top label */}
                    <div className="absolute top-20 left-0 right-0 text-center">
                        <motion.div
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="inline-block"
                        >
                            <span className="text-[#FFB81C] text-sm tracking-[0.5em] uppercase">
                                Live Strapping Demo
                            </span>
                        </motion.div>

                        <motion.h3
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="text-4xl md:text-6xl font-black text-white mt-4"
                        >
                            Watch the Magic
                        </motion.h3>
                    </div>

                    {/* Stats panel */}
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="absolute right-8 top-1/2 -translate-y-1/2 glass-panel p-6 rounded-2xl max-w-xs"
                    >
                        <h4 className="text-[#FFB81C] font-bold mb-4 flex items-center gap-2">
                            <Zap className="w-5 h-5" />
                            Real-Time Performance
                        </h4>

                        <div className="space-y-4">
                            {[
                                { label: 'Chain Speed', value: '66', unit: 'm/min' },
                                { label: 'Tension Range', value: '400-4500', unit: 'N' },
                                { label: 'Cycle Time', value: '<20', unit: 'sec' },
                            ].map((stat, i) => (
                                <div key={i} className="flex justify-between items-baseline">
                                    <span className="text-white/60 text-sm">{stat.label}</span>
                                    <span>
                                        <span className="text-white font-bold">{stat.value}</span>
                                        <span className="text-white/40 text-xs ml-1">{stat.unit}</span>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// SECTION 5-7: PRODUCT SHOWCASE
// =====================================================

interface ProductShowcaseOverlayProps {
    visible: boolean;
    productKey: ProductKey;
    side?: 'left' | 'right';
}

export function ProductShowcaseOverlay({ visible, productKey, side = 'left' }: ProductShowcaseOverlayProps) {
    const product = products[productKey];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 pointer-events-none z-10"
                >
                    <div className={`absolute ${side === 'left' ? 'left-8' : 'right-8'} top-1/2 -translate-y-1/2 max-w-md`}>
                        {/* Category badge */}
                        <motion.div
                            initial={{ x: side === 'left' ? -30 : 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.6 }}
                            className="inline-block px-4 py-2 rounded-full text-sm font-bold tracking-wider uppercase mb-6"
                            style={{ backgroundColor: `${product.color}30`, color: product.color }}
                        >
                            {product.category}
                        </motion.div>

                        {/* Model name */}
                        <motion.h2
                            initial={{ x: side === 'left' ? -50 : 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            className="text-6xl md:text-8xl font-black tracking-tighter mb-4"
                            style={{
                                background: `linear-gradient(135deg, ${product.color} 0%, ${product.accentColor} 100%)`,
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                            }}
                        >
                            {product.model}
                        </motion.h2>

                        {/* Tagline */}
                        <motion.p
                            initial={{ x: side === 'left' ? -30 : 30, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            className="text-2xl md:text-3xl text-white/80 font-light mb-6"
                        >
                            {product.tagline}
                        </motion.p>

                        {/* Hero stat */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="glass-panel rounded-2xl p-6 mb-6"
                            style={{ boxShadow: `0 0 60px ${product.color}40` }}
                        >
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-black" style={{ color: product.color }}>
                                    {product.heroValue}
                                </span>
                                <span className="text-white/60 text-xl">{product.heroUnit}</span>
                            </div>
                            <span className="text-sm text-white/40 uppercase tracking-wider">
                                {product.heroLabel}
                            </span>
                        </motion.div>

                        {/* Features */}
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="grid grid-cols-1 gap-2"
                        >
                            {product.features.slice(0, 5).map((feature, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.9 + i * 0.1 }}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle className="w-4 h-4 flex-shrink-0" style={{ color: product.color }} />
                                    <span className="text-white/80 text-sm">{feature}</span>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Advantages for 726X */}
                        {product.advantages && (
                            <motion.div
                                initial={{ y: 30, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1.2 }}
                                className="mt-6 glass-panel rounded-2xl p-4"
                            >
                                <h4 className="text-[#FFB81C] font-bold mb-3 flex items-center gap-2 text-sm">
                                    <Award className="w-4 h-4" />
                                    Lithium-Ion Advantage
                                </h4>
                                <div className="grid grid-cols-2 gap-3">
                                    {product.advantages.map((adv, i) => (
                                        <div key={i} className="text-center">
                                            <div className="text-xl font-black text-white">{adv.value}</div>
                                            <div className="text-xs text-white/40">{adv.detail}</div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// SECTION 8: COMPARISON TABLE
// =====================================================

export function ComparisonOverlay({ visible }: { visible: boolean }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                >
                    <div className="w-full max-w-4xl px-4">
                        <motion.div
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-center mb-8"
                        >
                            <span className="text-[#FFB81C] text-sm tracking-[0.5em] uppercase">
                                Technical Excellence
                            </span>
                            <h3 className="text-4xl md:text-5xl font-black text-white mt-2">
                                Side by Side
                                <span
                                    style={{
                                        background: 'linear-gradient(135deg, #C8102E 0%, #FF4444 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                > Comparison</span>
                            </h3>
                        </motion.div>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="glass-panel rounded-2xl overflow-hidden"
                        >
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-white/10">
                                            <th className="p-4 text-left text-white/60 font-normal">Feature</th>
                                            <th className="p-4 text-center">
                                                <div className="text-lg font-black text-white">700</div>
                                                <div className="text-xs text-white/40">Manual</div>
                                            </th>
                                            <th className="p-4 text-center">
                                                <div className="text-lg font-black text-white">GO</div>
                                                <div className="text-xs text-white/40">Economy</div>
                                            </th>
                                            <th className="p-4 text-center bg-[#FFB81C]/10">
                                                <div className="text-lg font-black text-[#FFB81C]">726X Li</div>
                                                <div className="text-xs text-[#FFB81C]/60">X-pert</div>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {comparisonMatrix.slice(0, 6).map((row, i) => (
                                            <motion.tr
                                                key={row.feature}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 + i * 0.1 }}
                                                className="border-b border-white/5"
                                            >
                                                <td className="p-4 text-white/60">{row.feature}</td>
                                                <td className="p-4 text-center text-white">{row['700']}</td>
                                                <td className="p-4 text-center text-white">{row['GO']}</td>
                                                <td className="p-4 text-center text-[#FFB81C] font-semibold bg-[#FFB81C]/5">
                                                    {row['726X']}
                                                </td>
                                            </motion.tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// SECTION 9: ROI STATS
// =====================================================

export function ROIOverlay({ visible }: { visible: boolean }) {
    const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
        zap: Zap,
        clock: Clock,
        'trending-down': TrendingDown,
        'check-circle': CheckCircle,
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                >
                    <div className="w-full max-w-5xl px-4">
                        <motion.div
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="text-center mb-12"
                        >
                            <span className="text-[#FFB81C] text-sm tracking-[0.5em] uppercase">
                                Return on Investment
                            </span>
                            <h3 className="text-4xl md:text-6xl font-black text-white mt-2">
                                The Numbers
                                <span
                                    style={{
                                        background: 'linear-gradient(135deg, #FFB81C 0%, #FFD700 100%)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                > Speak</span>
                            </h3>
                        </motion.div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            {roiStats.map((stat, i) => {
                                const Icon = iconMap[stat.icon] || Zap;
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ y: 50, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 + i * 0.15 }}
                                        className="glass-panel rounded-2xl p-6 text-center"
                                        style={{ boxShadow: '0 0 40px rgba(255,184,28,0.2)' }}
                                    >
                                        <Icon className="w-8 h-8 mx-auto mb-4 text-[#FFB81C]" />
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.5 + i * 0.15, type: 'spring', stiffness: 200 }}
                                            className="text-4xl md:text-5xl font-black mb-2"
                                            style={{
                                                background: 'linear-gradient(135deg, #FFB81C 0%, #FFD700 100%)',
                                                WebkitBackgroundClip: 'text',
                                                WebkitTextFillColor: 'transparent',
                                            }}
                                        >
                                            {stat.value}
                                        </motion.div>
                                        <div className="text-sm text-white/60 uppercase tracking-wider">
                                            {stat.label}
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// SECTION 10: FINAL CTA
// =====================================================

export function FinalCTAOverlay({ visible }: { visible: boolean }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center z-10"
                >
                    <div className="text-center px-4">
                        <motion.h2
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 1 }}
                            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8"
                        >
                            <span className="text-white">Experience the</span>
                            <br />
                            <motion.span
                                animate={{
                                    textShadow: [
                                        '0 0 20px rgba(200,16,46,0.5)',
                                        '0 0 80px rgba(200,16,46,0.8)',
                                        '0 0 20px rgba(200,16,46,0.5)',
                                    ],
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{
                                    background: 'linear-gradient(135deg, #C8102E 0%, #FF4444 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                Future
                            </motion.span>
                        </motion.h2>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-xl md:text-2xl text-white/60 mb-12 max-w-2xl mx-auto"
                        >
                            Ready to transform your pallet strapping operations?
                        </motion.p>

                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center pointer-events-auto"
                        >
                            <motion.a
                                href="/contact"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-10 py-5 rounded-full text-white font-bold text-lg shadow-2xl"
                                style={{
                                    background: 'linear-gradient(135deg, #C8102E 0%, #a00d24 100%)',
                                    boxShadow: '0 0 60px rgba(200,16,46,0.4)',
                                }}
                            >
                                <Phone className="w-5 h-5" />
                                Request Demo
                            </motion.a>

                            <motion.a
                                href="/products"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 px-10 py-5 rounded-full glass-panel text-white font-bold text-lg hover:bg-white/10 transition-colors"
                            >
                                <Play className="w-5 h-5" />
                                View All Products
                            </motion.a>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// SCROLL PROGRESS BAR
// =====================================================

export function ScrollProgressBar({ progress }: { progress: number }) {
    return (
        <div className="fixed top-0 left-0 right-0 h-1 z-50">
            <motion.div
                className="h-full origin-left"
                style={{
                    scaleX: progress,
                    background: 'linear-gradient(90deg, #C8102E, #FFB81C, #C8102E)',
                }}
            />
        </div>
    );
}

// =====================================================
// SECTION INDICATOR
// =====================================================

interface SectionIndicatorProps {
    sections: string[];
    currentSection: number;
}

export function SectionIndicator({ sections, currentSection }: SectionIndicatorProps) {
    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-3">
            {sections.map((section, i) => (
                <div key={i} className="relative group">
                    <motion.div
                        className="w-3 h-3 rounded-full border-2 transition-all duration-300 cursor-pointer"
                        style={{
                            borderColor: currentSection === i ? '#FFB81C' : 'rgba(255,255,255,0.3)',
                            backgroundColor: currentSection === i ? '#FFB81C' : 'transparent',
                        }}
                        whileHover={{ scale: 1.3 }}
                    />

                    {/* Tooltip */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        <div className="bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap">
                            {section}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
