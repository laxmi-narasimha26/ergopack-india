'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

// Register GSAP plugins
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

// =====================================================
// LENIS SMOOTH SCROLL HOOK
// =====================================================

export function useLenis() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            smoothWheel: true,
        });

        lenisRef.current = lenis;

        // Connect Lenis to GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        gsap.ticker.add((time) => {
            lenis.raf(time * 1000);
        });

        gsap.ticker.lagSmoothing(0);

        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return lenisRef;
}

// =====================================================
// SCROLL PROGRESS HOOK
// =====================================================

export function useScrollProgress(totalSections: number = 10) {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [currentSection, setCurrentSection] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollTop = window.scrollY;
            const progress = scrollHeight > 0 ? scrollTop / scrollHeight : 0;

            setScrollProgress(Math.min(1, Math.max(0, progress)));
            setCurrentSection(Math.floor(progress * totalSections));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial call

        return () => window.removeEventListener('scroll', handleScroll);
    }, [totalSections]);

    return { scrollProgress, currentSection };
}

// =====================================================
// MOUSE PARALLAX HOOK
// =====================================================

export function useMouseParallax(intensity: number = 0.1) {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const x = (e.clientX / window.innerWidth - 0.5) * intensity;
            const y = (e.clientY / window.innerHeight - 0.5) * intensity;
            setPosition({ x, y });
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [intensity]);

    return position;
}

// =====================================================
// LOADING PROGRESS HOOK
// =====================================================

export function useLoadingProgress() {
    const [progress, setProgress] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Simulate loading progress
        let current = 0;
        const interval = setInterval(() => {
            current += Math.random() * 15;
            if (current >= 100) {
                current = 100;
                clearInterval(interval);
                setTimeout(() => setIsLoaded(true), 500);
            }
            setProgress(current);
        }, 100);

        return () => clearInterval(interval);
    }, []);

    return { progress, isLoaded };
}

// =====================================================
// INTERSECTION OBSERVER HOOK
// =====================================================

export function useInView(threshold: number = 0.1) {
    const [isInView, setIsInView] = useState(false);
    const [hasBeenInView, setHasBeenInView] = useState(false);
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                if (entry.isIntersecting) {
                    setHasBeenInView(true);
                }
            },
            { threshold }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold]);

    return { ref, isInView, hasBeenInView };
}

// =====================================================
// GSAP SCROLL TRIGGER HOOK
// =====================================================

interface ScrollTriggerOptions {
    start?: string;
    end?: string;
    scrub?: boolean | number;
    pin?: boolean;
    onEnter?: () => void;
    onLeave?: () => void;
    onEnterBack?: () => void;
    onLeaveBack?: () => void;
}

export function useScrollTrigger(
    triggerRef: React.RefObject<HTMLElement>,
    options: ScrollTriggerOptions = {}
) {
    useEffect(() => {
        if (!triggerRef.current) return;

        const trigger = ScrollTrigger.create({
            trigger: triggerRef.current,
            start: options.start || 'top center',
            end: options.end || 'bottom center',
            scrub: options.scrub ?? true,
            pin: options.pin ?? false,
            onEnter: options.onEnter,
            onLeave: options.onLeave,
            onEnterBack: options.onEnterBack,
            onLeaveBack: options.onLeaveBack,
        });

        return () => trigger.kill();
    }, [triggerRef, options]);
}

// =====================================================
// TYPING ANIMATION HOOK
// =====================================================

export function useTypingAnimation(text: string, speed: number = 50, startDelay: number = 0) {
    const [displayText, setDisplayText] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setDisplayText('');
        setIsComplete(false);

        const timeout = setTimeout(() => {
            let index = 0;
            const interval = setInterval(() => {
                if (index < text.length) {
                    setDisplayText(text.slice(0, index + 1));
                    index++;
                } else {
                    clearInterval(interval);
                    setIsComplete(true);
                }
            }, speed);

            return () => clearInterval(interval);
        }, startDelay);

        return () => clearTimeout(timeout);
    }, [text, speed, startDelay]);

    return { displayText, isComplete };
}

// =====================================================
// COUNTER ANIMATION HOOK
// =====================================================

export function useCountUp(
    endValue: number,
    duration: number = 2000,
    startOnView: boolean = true
) {
    const [count, setCount] = useState(0);
    const [hasStarted, setHasStarted] = useState(false);
    const ref = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (!startOnView) {
            // Start immediately
            animateCount();
            return;
        }

        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasStarted) {
                    setHasStarted(true);
                    animateCount();
                }
            },
            { threshold: 0.5 }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [endValue, duration, startOnView, hasStarted]);

    const animateCount = useCallback(() => {
        const startTime = Date.now();
        const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // Ease out cubic
            setCount(Math.floor(endValue * eased));

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };
        requestAnimationFrame(animate);
    }, [endValue, duration]);

    return { count, ref };
}

// =====================================================
// WINDOW SIZE HOOK
// =====================================================

export function useWindowSize() {
    const [size, setSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        const handleResize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        handleResize();
        window.addEventListener('resize', handleResize, { passive: true });

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return size;
}

// =====================================================
// REDUCED MOTION HOOK
// =====================================================

export function useReducedMotion() {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setReducedMotion(mediaQuery.matches);

        const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
        mediaQuery.addEventListener('change', handler);

        return () => mediaQuery.removeEventListener('change', handler);
    }, []);

    return reducedMotion;
}
