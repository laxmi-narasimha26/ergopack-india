'use client';

import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { useState, useEffect, useRef, useMemo } from 'react';
import {
    Zap, Clock, TrendingDown, CheckCircle, ArrowRight,
    Phone, Play, ChevronDown, Battery, Gauge, Settings,
    Award, Shield, Globe, Users, Factory, Wrench,
    ThumbsUp, Star, Target, Layers, Package, Cpu,
    ChevronLeft, ChevronRight, Pause, Volume2, VolumeX,
    Maximize, Minimize, Info, X, Download, Share2,
    BarChart3, PieChart, Activity, Workflow, Cog,
    Lightbulb, Rocket, Lock, Eye, Heart
} from 'lucide-react';

// =====================================================
// ANIMATED SECTION TITLE
// =====================================================

interface AnimatedTitleProps {
    preText?: string;
    mainText: string;
    postText?: string;
    visible: boolean;
    color?: string;
}

export function AnimatedTitle({
    preText,
    mainText,
    postText,
    visible,
    color = '#FFB81C'
}: AnimatedTitleProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                >
                    {/* Pre-text (subtitle) */}
                    {preText && (
                        <motion.p
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="text-sm md:text-lg tracking-[0.5em] uppercase mb-4"
                            style={{ color }}
                        >
                            {preText}
                        </motion.p>
                    )}

                    {/* Main title with gradient */}
                    <motion.h2
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 100 }}
                        className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter"
                    >
                        <span className="text-white">{mainText}</span>
                        {postText && (
                            <span
                                className="block md:inline"
                                style={{
                                    background: `linear-gradient(135deg, ${color} 0%, #FFFFFF 100%)`,
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                {' '}{postText}
                            </span>
                        )}
                    </motion.h2>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// FEATURE CARDS GRID
// =====================================================

interface FeatureCardData {
    icon: React.ComponentType<{ className?: string }>;
    title: string;
    description: string;
    color?: string;
}

interface FeatureCardsGridProps {
    features: FeatureCardData[];
    visible: boolean;
}

export function FeatureCardsGrid({ features, visible }: FeatureCardsGridProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4"
                >
                    {features.map((feature, i) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ y: 50, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.1 * i }}
                                className="glass-panel rounded-2xl p-6 hover:scale-105 transition-transform duration-300"
                                style={{
                                    boxShadow: `0 0 30px ${feature.color || '#FFB81C'}20`
                                }}
                            >
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                                    style={{ backgroundColor: `${feature.color || '#FFB81C'}20` }}
                                >
                                    <Icon className="w-6 h-6" style={{ color: feature.color || '#FFB81C' }} />
                                </div>

                                <h3 className="text-xl font-bold text-white mb-2">
                                    {feature.title}
                                </h3>

                                <p className="text-white/60 text-sm leading-relaxed">
                                    {feature.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// ANIMATED STATS BAR
// =====================================================

interface StatBarProps {
    label: string;
    value: number;
    maxValue: number;
    unit?: string;
    color?: string;
    visible: boolean;
    delay?: number;
}

export function AnimatedStatBar({
    label,
    value,
    maxValue,
    unit = '',
    color = '#FFB81C',
    visible,
    delay = 0
}: StatBarProps) {
    const [animatedValue, setAnimatedValue] = useState(0);
    const [animatedWidth, setAnimatedWidth] = useState(0);

    useEffect(() => {
        if (visible) {
            // Animate value
            let startTime: number;
            const duration = 2000;

            const animate = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);

                setAnimatedValue(Math.floor(value * eased));
                setAnimatedWidth((value / maxValue) * 100 * eased);

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };

            setTimeout(() => requestAnimationFrame(animate), delay * 1000);
        }
    }, [visible, value, maxValue, delay]);

    return (
        <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: visible ? 0 : -30, opacity: visible ? 1 : 0 }}
            transition={{ delay }}
            className="mb-4"
        >
            <div className="flex justify-between mb-2">
                <span className="text-white/80 text-sm">{label}</span>
                <span className="font-bold" style={{ color }}>
                    {animatedValue}{unit}
                </span>
            </div>

            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{
                        width: `${animatedWidth}%`,
                        background: `linear-gradient(90deg, ${color}, ${color}88)`
                    }}
                />
            </div>
        </motion.div>
    );
}

// =====================================================
// TESTIMONIAL CAROUSEL
// =====================================================

interface Testimonial {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatar?: string;
}

interface TestimonialCarouselProps {
    testimonials: Testimonial[];
    visible: boolean;
}

export function TestimonialCarousel({ testimonials, visible }: TestimonialCarouselProps) {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        if (visible) {
            const interval = setInterval(() => {
                setCurrent(prev => (prev + 1) % testimonials.length);
            }, 5000);
            return () => clearInterval(interval);
        }
    }, [visible, testimonials.length]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    className="max-w-3xl mx-auto px-4"
                >
                    <div className="glass-panel rounded-3xl p-8 md:p-12 relative">
                        {/* Quote icon */}
                        <div className="absolute -top-4 left-8 w-12 h-12 rounded-full bg-[#FFB81C] flex items-center justify-center">
                            <span className="text-3xl text-black font-serif">&ldquo;</span>
                        </div>

                        {/* Testimonial content */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                            >
                                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-6 italic">
                                    {testimonials[current].quote}
                                </p>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#C8102E] to-[#FFB81C] flex items-center justify-center">
                                        <Users className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-white">{testimonials[current].author}</p>
                                        <p className="text-white/60 text-sm">
                                            {testimonials[current].role}, {testimonials[current].company}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Navigation dots */}
                        <div className="flex justify-center gap-2 mt-8">
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrent(i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-[#FFB81C] w-6' : 'bg-white/30'
                                        }`}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// PRODUCTS COMPARISON SLIDER
// =====================================================

interface ComparisonSliderProps {
    leftLabel: string;
    rightLabel: string;
    leftImage?: string;
    rightImage?: string;
    leftValue: string;
    rightValue: string;
    visible: boolean;
}

export function ComparisonSlider({
    leftLabel,
    rightLabel,
    leftValue,
    rightValue,
    visible
}: ComparisonSliderProps) {
    const [sliderPosition, setSliderPosition] = useState(50);
    const containerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        setSliderPosition(Math.max(10, Math.min(90, x)));
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    ref={containerRef}
                    className="relative w-full max-w-4xl mx-auto h-64 rounded-2xl overflow-hidden cursor-ew-resize"
                    onMouseMove={handleMouseMove}
                >
                    {/* Left side */}
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-[#C8102E] to-[#FF4444] flex items-center justify-center"
                        style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
                    >
                        <div className="text-center text-white p-8">
                            <p className="text-sm uppercase tracking-wider mb-2">{leftLabel}</p>
                            <p className="text-5xl font-black">{leftValue}</p>
                        </div>
                    </div>

                    {/* Right side */}
                    <div
                        className="absolute inset-0 bg-gradient-to-r from-[#FFB81C] to-[#FFD700] flex items-center justify-center"
                        style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
                    >
                        <div className="text-center text-black p-8">
                            <p className="text-sm uppercase tracking-wider mb-2">{rightLabel}</p>
                            <p className="text-5xl font-black">{rightValue}</p>
                        </div>
                    </div>

                    {/* Slider handle */}
                    <div
                        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
                        style={{ left: `${sliderPosition}%` }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-xl">
                            <ChevronLeft className="w-4 h-4 text-gray-600" />
                            <ChevronRight className="w-4 h-4 text-gray-600" />
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// INTERACTIVE TIMELINE
// =====================================================

interface TimelineEvent {
    year: string;
    title: string;
    description: string;
    icon?: React.ComponentType<{ className?: string }>;
}

interface InteractiveTimelineProps {
    events: TimelineEvent[];
    visible: boolean;
}

export function InteractiveTimeline({ events, visible }: InteractiveTimelineProps) {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        if (visible) {
            const interval = setInterval(() => {
                setActiveIndex(prev => (prev + 1) % events.length);
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [visible, events.length]);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="max-w-5xl mx-auto px-4"
                >
                    {/* Timeline line */}
                    <div className="relative">
                        <div className="absolute top-6 left-0 right-0 h-0.5 bg-white/20" />

                        {/* Events */}
                        <div className="flex justify-between">
                            {events.map((event, i) => {
                                const Icon = event.icon || Clock;
                                const isActive = i === activeIndex;

                                return (
                                    <motion.div
                                        key={i}
                                        className="relative flex flex-col items-center cursor-pointer"
                                        onClick={() => setActiveIndex(i)}
                                        whileHover={{ scale: 1.05 }}
                                    >
                                        {/* Node */}
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isActive
                                                    ? 'bg-[#FFB81C] scale-125'
                                                    : 'bg-white/10 hover:bg-white/20'
                                                }`}
                                        >
                                            <Icon className={`w-5 h-5 ${isActive ? 'text-black' : 'text-white'}`} />
                                        </div>

                                        {/* Year */}
                                        <p className={`mt-3 text-sm font-bold ${isActive ? 'text-[#FFB81C]' : 'text-white/60'}`}>
                                            {event.year}
                                        </p>

                                        {/* Active indicator */}
                                        {isActive && (
                                            <motion.div
                                                layoutId="timeline-indicator"
                                                className="absolute -bottom-4 w-2 h-2 bg-[#FFB81C] rounded-full"
                                            />
                                        )}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Active event detail */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="mt-12 text-center"
                        >
                            <h3 className="text-2xl font-bold text-white mb-2">
                                {events[activeIndex].title}
                            </h3>
                            <p className="text-white/60 max-w-2xl mx-auto">
                                {events[activeIndex].description}
                            </p>
                        </motion.div>
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// CERTIFICATION BADGES
// =====================================================

interface CertificationBadgesProps {
    visible: boolean;
}

export function CertificationBadges({ visible }: CertificationBadgesProps) {
    const badges = [
        { name: 'ISO 12100:2010', icon: Shield, color: '#4CAF50' },
        { name: 'CE Certified', icon: CheckCircle, color: '#2196F3' },
        { name: 'AGR Certified', icon: Award, color: '#FFB81C' },
        { name: 'EU Conformity', icon: Globe, color: '#9C27B0' },
    ];

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-wrap justify-center gap-6"
                >
                    {badges.map((badge, i) => {
                        const Icon = badge.icon;
                        return (
                            <motion.div
                                key={i}
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
                                className="flex flex-col items-center gap-2"
                            >
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center"
                                    style={{
                                        background: `linear-gradient(135deg, ${badge.color}30, ${badge.color}10)`,
                                        border: `2px solid ${badge.color}50`
                                    }}
                                >
                                    <Icon className="w-7 h-7" style={{ color: badge.color }} />
                                </div>
                                <span className="text-xs text-white/60 text-center">
                                    {badge.name}
                                </span>
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// FLOATING ACTION BUTTON
// =====================================================

interface FloatingCTAProps {
    visible: boolean;
    onClick?: () => void;
}

export function FloatingCTA({ visible, onClick }: FloatingCTAProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    initial={{ scale: 0, rotate: -90 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 90 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClick}
                    className="fixed bottom-8 right-20 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-[#C8102E] to-[#a00d24] flex items-center justify-center shadow-2xl"
                    style={{ boxShadow: '0 0 40px rgba(200,16,46,0.4)' }}
                >
                    <Phone className="w-7 h-7 text-white" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}

// =====================================================
// MOUSE FOLLOWER
// =====================================================

interface MouseFollowerProps {
    enabled?: boolean;
}

export function MouseFollower({ enabled = true }: MouseFollowerProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const followerX = useTransform(mouseX, (v) => v - 10);
    const followerY = useTransform(mouseY, (v) => v - 10);

    useEffect(() => {
        if (!enabled) return;

        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [enabled, mouseX, mouseY]);

    if (!enabled) return null;

    return (
        <>
            {/* Outer ring */}
            <motion.div
                className="fixed w-8 h-8 border-2 border-[#FFB81C] rounded-full pointer-events-none z-[100] mix-blend-difference"
                style={{ x: followerX, y: followerY }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />

            {/* Inner dot */}
            <motion.div
                className="fixed w-2 h-2 bg-[#FFB81C] rounded-full pointer-events-none z-[100] mix-blend-difference"
                style={{
                    x: useTransform(mouseX, (v) => v - 4),
                    y: useTransform(mouseY, (v) => v - 4)
                }}
            />
        </>
    );
}

// =====================================================
// KEYBOARD SHORTCUTS HINT
// =====================================================

interface KeyboardHintsProps {
    visible: boolean;
}

export function KeyboardHints({ visible }: KeyboardHintsProps) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex gap-4 text-sm"
                >
                    {[
                        { key: '↑↓', action: 'Navigate' },
                        { key: 'Space', action: 'Next Section' },
                        { key: 'Esc', action: 'Menu' },
                    ].map((hint, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <kbd className="px-2 py-1 bg-white/10 rounded text-white/60 font-mono text-xs">
                                {hint.key}
                            </kbd>
                            <span className="text-white/40">{hint.action}</span>
                        </div>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Export all icons for use in other files
export const Icons = {
    Zap, Clock, TrendingDown, CheckCircle, ArrowRight,
    Phone, Play, ChevronDown, Battery, Gauge, Settings,
    Award, Shield, Globe, Users, Factory, Wrench,
    ThumbsUp, Star, Target, Layers, Package, Cpu,
    ChevronLeft, ChevronRight, Pause, Volume2, VolumeX,
    Maximize, Minimize, Info, X, Download, Share2,
    BarChart3, PieChart, Activity, Workflow, Cog,
    Lightbulb, Rocket, Lock, Eye, Heart
};
