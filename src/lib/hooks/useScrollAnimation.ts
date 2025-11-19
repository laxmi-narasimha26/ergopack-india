'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface ScrollAnimationConfig {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  pin?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

/**
 * Custom hook for GSAP scroll animations
 * @param animationFn - Function that receives the element and returns GSAP animation
 * @param config - ScrollTrigger configuration
 * @param deps - Dependencies array for useEffect
 */
export function useScrollAnimation<T extends HTMLElement>(
  animationFn: (element: T) => gsap.core.Tween | gsap.core.Timeline,
  config: ScrollAnimationConfig = {},
  deps: any[] = []
) {
  const elementRef = useRef<T>(null);
  const animationRef = useRef<gsap.core.Tween | gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    const animation = animationFn(element);

    // Configure ScrollTrigger
    ScrollTrigger.create({
      trigger: config.trigger || element,
      start: config.start || 'top 80%',
      end: config.end || 'bottom 20%',
      scrub: config.scrub !== undefined ? config.scrub : false,
      markers: config.markers || false,
      pin: config.pin || false,
      toggleActions: config.toggleActions || 'play none none reverse',
      onEnter: () => {
        animation.play();
        config.onEnter?.();
      },
      onLeave: config.onLeave,
      onEnterBack: () => {
        animation.restart();
        config.onEnterBack?.();
      },
      onLeaveBack: config.onLeaveBack,
    });

    animationRef.current = animation;

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [animationFn, config, ...deps]);

  return elementRef;
}

/**
 * Hook for fade in animation on scroll
 */
export function useFadeIn(
  config: ScrollAnimationConfig = {},
  deps: any[] = []
) {
  return useScrollAnimation<HTMLDivElement>(
    (element) => {
      return gsap.from(element, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });
    },
    config,
    deps
  );
}

/**
 * Hook for slide in from left animation on scroll
 */
export function useSlideInLeft(
  config: ScrollAnimationConfig = {},
  deps: any[] = []
) {
  return useScrollAnimation<HTMLDivElement>(
    (element) => {
      return gsap.from(element, {
        opacity: 0,
        x: -100,
        duration: 1,
        ease: 'power3.out',
      });
    },
    config,
    deps
  );
}

/**
 * Hook for slide in from right animation on scroll
 */
export function useSlideInRight(
  config: ScrollAnimationConfig = {},
  deps: any[] = []
) {
  return useScrollAnimation<HTMLDivElement>(
    (element) => {
      return gsap.from(element, {
        opacity: 0,
        x: 100,
        duration: 1,
        ease: 'power3.out',
      });
    },
    config,
    deps
  );
}

/**
 * Hook for scale in animation on scroll
 */
export function useScaleIn(
  config: ScrollAnimationConfig = {},
  deps: any[] = []
) {
  return useScrollAnimation<HTMLDivElement>(
    (element) => {
      return gsap.from(element, {
        opacity: 0,
        scale: 0.8,
        duration: 1,
        ease: 'power3.out',
      });
    },
    config,
    deps
  );
}

/**
 * Hook for stagger animation on children
 */
export function useStaggerAnimation(
  childSelector: string,
  config: ScrollAnimationConfig = {},
  deps: any[] = []
) {
  return useScrollAnimation<HTMLDivElement>(
    (element) => {
      const children = element.querySelectorAll(childSelector);
      return gsap.from(children, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    },
    config,
    deps
  );
}

/**
 * Hook for parallax effect
 */
export function useParallax(
  speed: number = 0.5,
  config: ScrollAnimationConfig = {},
  deps: any[] = []
) {
  return useScrollAnimation<HTMLDivElement>(
    (element) => {
      return gsap.to(element, {
        y: () => window.innerHeight * speed,
        ease: 'none',
      });
    },
    { ...config, scrub: true },
    deps
  );
}

/**
 * Hook for counter animation
 */
export function useCounterAnimation(
  start: number,
  end: number,
  config: ScrollAnimationConfig = {},
  deps: any[] = []
) {
  return useScrollAnimation<HTMLSpanElement>(
    (element) => {
      const obj = { value: start };
      return gsap.to(obj, {
        value: end,
        duration: 2,
        ease: 'power1.out',
        onUpdate: () => {
          element.textContent = Math.round(obj.value).toString();
        },
      });
    },
    config,
    deps
  );
}

/**
 * Hook for reveal animation with clip-path
 */
export function useRevealAnimation(
  direction: 'left' | 'right' | 'top' | 'bottom' = 'bottom',
  config: ScrollAnimationConfig = {},
  deps: any[] = []
) {
  return useScrollAnimation<HTMLDivElement>(
    (element) => {
      const clipPaths: Record<string, string> = {
        left: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
        right: 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
        top: 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)',
        bottom: 'polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)',
      };

      return gsap.from(element, {
        clipPath: clipPaths[direction],
        duration: 1.2,
        ease: 'power3.inOut',
      });
    },
    config,
    deps
  );
}
