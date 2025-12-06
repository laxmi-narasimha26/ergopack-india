'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
    useLenis,
    useScrollProgress,
    useLoadingProgress,
    useMouseParallax,
} from './hooks/useAnimations';
import {
    IntroOverlay,
    BrandRevealOverlay,
    StrappingDemoOverlay,
    ProductShowcaseOverlay,
    ComparisonOverlay,
    ROIOverlay,
    FinalCTAOverlay,
    ScrollProgressBar,
    SectionIndicator,
} from './components/UI/Overlays';
import { LoadingScreen } from './components/Scene3D/MainScene';

// Dynamic import for 3D scene to avoid SSR issues
const MainScene = dynamic(
    () => import('./components/Scene3D/MainScene'),
    {
        ssr: false,
        loading: () => <div className="fixed inset-0 bg-black" />
    }
);

// =====================================================
// SECTION NAMES FOR NAVIGATION
// =====================================================

const SECTION_NAMES = [
    'Intro',
    'Approach',
    'Brand',
    'Machine',
    'Demo',
    'Model 700',
    'Model GO',
    '726X Li',
    'Compare',
    'ROI',
    'Contact',
];

const TOTAL_SECTIONS = SECTION_NAMES.length;

// =====================================================
// MAIN PRESENTATION PAGE
// =====================================================

export default function AdvancedPresentationPage() {
    // Initialize smooth scroll
    useLenis();

    // Loading state
    const { progress: loadingProgress, isLoaded } = useLoadingProgress();
    const [showContent, setShowContent] = useState(false);

    // Scroll tracking
    const { scrollProgress, currentSection } = useScrollProgress(TOTAL_SECTIONS);

    // Mouse parallax
    const mousePosition = useMouseParallax(0.05);

    // Delayed content show
    useEffect(() => {
        if (isLoaded) {
            const timer = setTimeout(() => setShowContent(true), 500);
            return () => clearTimeout(timer);
        }
    }, [isLoaded]);

    // Determine which overlays to show based on current section
    const overlayState = useMemo(() => ({
        showIntro: currentSection === 0,
        showBrandReveal: currentSection === 2,
        showStrappingDemo: currentSection === 4,
        showModel700: currentSection === 5,
        showModelGO: currentSection === 6,
        showModel726X: currentSection === 7,
        showComparison: currentSection === 8,
        showROI: currentSection === 9,
        showCTA: currentSection === 10,
    }), [currentSection]);

    return (
        <div className="presentation-page bg-black text-white min-h-screen overflow-x-hidden">
            {/* Loading Screen */}
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        key="loading"
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <LoadingScreen progress={loadingProgress} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <AnimatePresence>
                {showContent && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        {/* 3D Background Scene */}
                        <Suspense fallback={<div className="fixed inset-0 bg-black" />}>
                            <MainScene
                                scrollProgress={scrollProgress}
                                currentSection={currentSection}
                            />
                        </Suspense>

                        {/* Scroll Progress Bar */}
                        <ScrollProgressBar progress={scrollProgress} />

                        {/* Section Navigation Dots */}
                        <SectionIndicator
                            sections={SECTION_NAMES}
                            currentSection={currentSection}
                        />

                        {/* ========================================= */}
                        {/* SCROLL SECTIONS - Create scroll height */}
                        {/* ========================================= */}

                        {/* Section 0: Intro */}
                        <section className="section-spacer relative">
                            <IntroOverlay visible={overlayState.showIntro} />
                        </section>

                        {/* Section 1: Approach (camera moving in) */}
                        <section className="section-spacer relative">
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: currentSection === 1 ? 1 : 0 }}
                                    className="text-center"
                                >
                                    <p className="text-[#FFB81C] text-sm tracking-[0.5em] uppercase mb-4">
                                        Enter the Future
                                    </p>
                                    <h2 className="text-4xl md:text-6xl font-black text-white">
                                        Precision Engineering
                                    </h2>
                                </motion.div>
                            </div>
                        </section>

                        {/* Section 2: Brand Reveal */}
                        <section className="section-spacer relative">
                            <BrandRevealOverlay
                                visible={overlayState.showBrandReveal}
                                progress={scrollProgress * TOTAL_SECTIONS - 2}
                            />
                        </section>

                        {/* Section 3: Machine Focus */}
                        <section className="section-spacer relative">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: currentSection === 3 ? 1 : 0 }}
                                className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
                            >
                                <div className="text-center">
                                    <p className="text-[#FFB81C] text-sm tracking-[0.5em] uppercase mb-4">
                                        Introducing
                                    </p>
                                    <h2 className="text-5xl md:text-7xl font-black text-white mb-4">
                                        The ErgoPack System
                                    </h2>
                                    <p className="text-xl text-white/60 max-w-lg mx-auto">
                                        50+ years of German engineering excellence,
                                        now available for India&apos;s manufacturing leaders
                                    </p>
                                </div>
                            </motion.div>
                        </section>

                        {/* Section 4: Strapping Demo */}
                        <section className="section-spacer relative">
                            <StrappingDemoOverlay visible={overlayState.showStrappingDemo} />
                        </section>

                        {/* Section 5: Model 700 */}
                        <section className="section-spacer relative">
                            <ProductShowcaseOverlay
                                visible={overlayState.showModel700}
                                productKey="700"
                                side="left"
                            />
                        </section>

                        {/* Section 6: Model GO */}
                        <section className="section-spacer relative">
                            <ProductShowcaseOverlay
                                visible={overlayState.showModelGO}
                                productKey="GO"
                                side="right"
                            />
                        </section>

                        {/* Section 7: Model 726X Li */}
                        <section className="section-spacer relative">
                            <ProductShowcaseOverlay
                                visible={overlayState.showModel726X}
                                productKey="726X"
                                side="left"
                            />
                        </section>

                        {/* Section 8: Comparison */}
                        <section className="section-spacer relative">
                            <ComparisonOverlay visible={overlayState.showComparison} />
                        </section>

                        {/* Section 9: ROI */}
                        <section className="section-spacer relative">
                            <ROIOverlay visible={overlayState.showROI} />
                        </section>

                        {/* Section 10: Final CTA */}
                        <section className="section-spacer relative">
                            <FinalCTAOverlay visible={overlayState.showCTA} />
                        </section>

                        {/* Extra scroll space for final section */}
                        <div className="h-[50vh]" />

                        {/* ========================================= */}
                        {/* FIXED UI ELEMENTS */}
                        {/* ========================================= */}

                        {/* Logo (fixed) */}
                        <motion.a
                            href="/"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="fixed top-6 left-6 z-50 flex items-center gap-2"
                        >
                            <span className="text-xl font-bold">
                                <span className="text-white">ErgoPack</span>
                                <span className="text-[#C8102E]">India</span>
                            </span>
                        </motion.a>

                        {/* Skip to content */}
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 2 }}
                            onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                            className="fixed bottom-6 right-6 z-50 glass-panel px-4 py-2 rounded-full text-sm text-white/60 hover:text-white transition-colors"
                        >
                            Skip to CTA →
                        </motion.button>

                        {/* Current section label */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.5 }}
                            className="fixed bottom-6 left-6 z-50 text-white/40 text-sm font-mono"
                        >
                            <span className="text-[#FFB81C]">{String(currentSection + 1).padStart(2, '0')}</span>
                            <span> / {TOTAL_SECTIONS}</span>
                            <span className="ml-3 text-white/60">{SECTION_NAMES[currentSection]}</span>
                        </motion.div>

                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mouse parallax effect on UI */}
            <style jsx global>{`
        .presentation-page [data-parallax] {
          transform: translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px);
          transition: transform 0.3s ease-out;
        }
      `}</style>
        </div>
    );
}
