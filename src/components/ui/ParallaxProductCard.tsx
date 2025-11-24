'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ParallaxProductCardProps {
  imageSrc: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function ParallaxProductCard({
  imageSrc,
  title,
  subtitle,
  className,
}: ParallaxProductCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Mouse position relative to the card center
  const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

  // Transformations for the "3D" tilt effect
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ['15deg', '-15deg']);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ['-15deg', '15deg']);

  // Parallax movement for the image (moves opposite to tilt for depth)
  const imageX = useTransform(mouseX, [-0.5, 0.5], ['-20px', '20px']);
  const imageY = useTransform(mouseY, [-0.5, 0.5], ['-20px', '20px']);

  // Lighting effect
  const sheenGradient = useTransform(
    mouseX,
    [-0.5, 0.5],
    [
      'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0) 100%)',
      'linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.3) 100%)',
    ]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const width = rect.width;
    const height = rect.height;

    const mouseXFromCenter = e.clientX - rect.left - width / 2;
    const mouseYFromCenter = e.clientY - rect.top - height / 2;

    // Normalize to -0.5 to 0.5
    x.set(mouseXFromCenter / width);
    y.set(mouseYFromCenter / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn(
        'relative w-full max-w-md aspect-[3/4] rounded-3xl bg-gradient-to-br from-white to-platinum-100 border border-platinum-200 shadow-2xl overflow-hidden cursor-pointer perspective-1000 group',
        className
      )}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Depth Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0.05),transparent_70%)]" />

      {/* Content Container */}
      <div
        className="relative h-full flex flex-col items-center justify-center p-8"
        style={{ transform: 'translateZ(50px)' }}
      >
        {/* Floating Image */}
        <motion.div
          className="relative w-full h-64 mb-8 drop-shadow-2xl"
          style={{
            x: imageX,
            y: imageY,
            transform: 'translateZ(80px)',
          }}
        >
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority
          />
        </motion.div>

        {/* Text Content */}
        <motion.div className="text-center" style={{ transform: 'translateZ(60px)' }}>
          {subtitle && (
            <p className="text-sm font-medium text-crimson-600 tracking-widest uppercase mb-2">
              {subtitle}
            </p>
          )}
          <h3 className="text-3xl font-serif font-bold text-luxury-dark-gray mb-2">{title}</h3>
          <div className="w-12 h-1 bg-crimson-500 mx-auto rounded-full mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>
      </div>

      {/* Sheen Effect */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-50"
        style={{
          background: sheenGradient,
          mixBlendMode: 'overlay',
        }}
      />
    </motion.div>
  );
}
