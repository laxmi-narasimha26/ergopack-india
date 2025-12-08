'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { useLenis, useScrollProgress, useLoadingProgress } from './hooks/useAnimations';
import MainScene from './components/Scene3D/MainScene';
import { HorizontalShowcase } from './components/UI/HorizontalShowcase';
import { TechnicalDatasheet } from './components/UI/TechnicalDatasheet';
import { Overlays } from './components/UI/Overlays';

// Ensure GSAP plugin is registered
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// =====================================================
// MAIN PAGE ORCHESTRATOR (CINEMATIC)
// =====================================================

export default function PresentationPage() {
    const lenis = useLenis();

    // Track scroll & model state
    const { scrollProgress } = useScrollProgress();
    const { progress: loadingProgress } = useLoadingProgress();
    const [currentSection, setCurrentSection] = useState(0);

    // New State for Cinematic Datasheet
    const [showComparison, setShowComparison] = useState(false);
    const [currentModel, setCurrentModel] = useState<'700' | '726X' | 'GO'>('726X');

    const containerRef = useRef<HTMLDivElement>(null);

    // Update section state based on scroll
    useEffect(() => {
        const section = Math.floor(scrollProgress * 10);
        setCurrentSection(section);

        // Show Technical Datasheet at the "Product Lab" section (Section 8)
        if (section === 8) {
            setShowComparison(true);
        } else {
            setShowComparison(false);
        }
    }, [scrollProgress]);

    // Loading Screen
    if (loadingProgress < 100) {
        return (
            <div className="fixed inset-0 z-50 bg-[#111] flex flex-col items-center justify-center text-white">
                <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mb-4">
                    <div
                        className="h-full bg-[#C8102E] transition-all duration-300 ease-out"
                        style={{ width: `${loadingProgress}%` }}
                    />
                </div>
                <p className="font-mono text-xs tracking-widest text-red-500">INITIALIZING CINEMATIC CORE...</p>
            </div>
        );
    }

    return (
        <main ref={containerRef} className="relative w-full bg-[#1a1a1a]"> {/* Darker Cinematic Bg */}

            {/* --- 1. CINEMATIC 3D VIEWPORT --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <Suspense fallback={null}>
                    <MainScene
                        currentSection={currentSection}
                        scrollProgress={scrollProgress}
                    />
                </Suspense>
            </div>

            {/* --- 2. FLOATING HUD --- */}
            <header className="fixed top-0 left-0 right-0 z-40 p-8 flex justify-between items-start pointer-events-none mix-blend-screen text-white/80">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter">ERGOPACK <span className="text-red-600">X</span></h1>
                    <span className="text-[10px] font-mono tracking-[0.2em] opacity-80">CINEMATIC ENGINEERING</span>
                </div>
                <div className="text-right font-mono">
                    <div className="text-lg font-bold">{Math.round(scrollProgress * 100)}<span className="text-red-500">%</span></div>
                    <div className="text-[10px] opacity-60">CYCLE COMPLETION</div>
                </div>
            </header>

            {/* --- 3. TECHNICAL DATASHEET OVERLAY --- */}
            <AnimatePresence>
                {showComparison && (
                    <TechnicalDatasheet
                        active={showComparison}
                        currentModel={currentModel}
                        onModelChange={setCurrentModel}
                    />
                )}
            </AnimatePresence>


            {/* --- 4. SCROLL TRIGGERS (The Narrative) --- */}
            <div className="relative z-10 w-full pointer-events-none">

                {/* SECTION 0: TITLE CARD */}
                <section className="h-screen w-full flex items-center justify-center">
                    <div className="text-center">
                        <h2 className="text-7xl md:text-9xl font-black text-white mix-blend-overlay opacity-20 tracking-tighter">
                            IMMERSION
                        </h2>
                        <p className="text-white/60 mt-4 font-mono text-sm max-w-md mx-auto">
                            SCROLL TO INITIATE SEQUENCE
                        </p>
                    </div>
                </section>

                {/* ACTION SECTIONS (Transparent) */}
                <section className="h-[100vh]" /> {/* Approach */}
                <section className="h-[100vh]" /> {/* Extend */}
                <section className="h-[100vh]" /> {/* Under Pallet */}

                {/* SECTION 4: IMPACT STATEMENT */}
                <section className="h-[100vh] flex items-center justify-center">
                    <h2 className="text-6xl font-black text-white/10 tracking-widest leading-[0.8]">
                        ZERO<br />BENDING
                    </h2>
                </section>

                <section className="h-[200vh]" /> {/* Completion */}

                {/* SECTION 8: DATASHEET TRIGGER */}
                <section className="h-screen w-full" />

                {/* SECTION 9: CTA */}
                <section className="h-screen w-full flex items-center justify-center bg-black/80 backdrop-blur-sm">
                    <div className="text-center p-12 pointer-events-auto">
                        <h2 className="text-5xl font-black text-white mb-6">READY TO DEPLOY?</h2>
                        <button className="px-12 py-6 bg-[#C8102E] text-white text-xl font-bold tracking-wider hover:bg-white hover:text-black transition-colors">
                            REQUEST DEMO
                        </button>
                    </div>
                </section>

            </div>

        </main>
    );
}
