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
    // Initialize Lenis with OPTIMIZED settings for perfect sync
    const lenis = new Lenis({
      duration: 1.8, // Luxurious, controlled movement
      easing: (t) => {
        // Cubic ease-out for ultra-smooth deceleration
        return 1 - Math.pow(1 - t, 3);
      },
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.5, // More responsive
      smoothTouch: true, // Enable smooth touch
      touchMultiplier: 3, // Touch sensitivity
      infinite: false,
      autoResize: true,
      syncTouch: true, // Perfect touch sync
      syncTouchLerp: 0.075, // Smooth touch lerp
      touchInertiaMultiplier: 25, // Touch momentum
    });

    lenisRef.current = lenis;

    // Perfect GSAP ScrollTrigger integration
    lenis.on('scroll', (e: any) => {
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
