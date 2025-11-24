'use client';

import { useEffect, useState, useRef } from 'react';

export function LuxuryCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const rafRef = useRef<number | null>(null);
  const lastPosRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e: MouseEvent) => {
      // Cancel previous animation frame if exists
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }

      // Use requestAnimationFrame for smooth 60fps updates
      rafRef.current = requestAnimationFrame(() => {
        lastPosRef.current = { x: e.clientX, y: e.clientY };
        setPosition({ x: e.clientX, y: e.clientY });
      });

      // Optimize pointer detection - cache and simplify checks
      const target = e.target as HTMLElement;
      const isClickable =
        target.tagName === 'A' || target.tagName === 'BUTTON' || !!target.closest('a, button');

      setIsPointer(isClickable);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    document.addEventListener('mousemove', updateCursorPosition, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      document.removeEventListener('mousemove', updateCursorPosition);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Hide custom cursor on mobile devices
  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      setIsHidden(true);
    }
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Main cursor dot */}
      <div
        className="pointer-events-none fixed z-[9999] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`transition-all duration-150 ease-luxury ${
            isPointer ? 'h-3 w-3 bg-crimson-500 opacity-100' : 'h-1 w-1 bg-white opacity-80'
          } rounded-full`}
        />
      </div>

      {/* Cursor ring */}
      <div
        className="pointer-events-none fixed z-[9998] mix-blend-difference"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className={`rounded-full border transition-all duration-300 ease-luxury ${
            isPointer
              ? 'h-12 w-12 border-crimson-500 opacity-50'
              : 'h-8 w-8 border-white opacity-30'
          }`}
        />
      </div>
    </>
  );
}
