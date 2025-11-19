'use client';

import React, { useEffect, useRef } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProps {
  children: React.ReactNode;
}

/**
 * Smooth Scroll Wrapper using Lenis
 *
 * Provides buttery-smooth scrolling experience with:
 * - Momentum-based scrolling
 * - Cubic-bezier easing
 * - 60fps performance
 * - GSAP ScrollTrigger integration
 */
export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Initialize Lenis with PERFORMANCE-OPTIMIZED settings
    const lenis = new Lenis({
      duration: 0.8, // Fast, responsive movement (was 1.8s - way too slow!)
      easing: (t) => {
        // Lighter cubic ease-out for snappy response
        return 1 - Math.pow(1 - t, 2);
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0, // Standard responsiveness
      smoothTouch: false, // Disable for better mobile performance
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
      syncTouch: false, // Disable for better performance
      syncTouchLerp: 0.1,
      touchInertiaMultiplier: 15,
    });

    lenisRef.current = lenis;

    // Perfect GSAP ScrollTrigger integration
    lenis.on('scroll', () => {
      ScrollTrigger.update();
    });

    // Use RAF for perfect 60fps sync
    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Disable lag smoothing for consistent performance
    gsap.ticker.lagSmoothing(0);

    // Update ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      lenis.destroy();
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <>{children}</>;
}
