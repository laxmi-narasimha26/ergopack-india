'use client';

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';

interface ProductStoryProps {
  headline: string;
  description: string;
  imageSrc: string;
  features?: string[]; // Added features prop for more content
}

export const ProductStory: React.FC<ProductStoryProps> = ({
  headline,
  description,
  imageSrc,
  features,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });

  return (
    <section className="py-24 bg-secondary/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Image Column - "The Cutout" Style */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="relative z-10">
              <div className="aspect-[4/5] relative overflow-hidden rounded-sm shadow-premium-xl">
                <Image
                  src={imageSrc}
                  alt="German Engineering"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 hover:scale-100"
                />
              </div>
              {/* Overlapping Border Element */}
              <div className="absolute -top-6 -left-6 w-full h-full border border-primary/20 -z-10 rounded-sm" />
            </div>
          </motion.div>

          {/* Content Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
            className="w-full lg:w-1/2 space-y-10"
          >
            <div className="space-y-4">
              <span className="text-xs font-artisan-sans tracking-widest-artisan uppercase text-primary font-semibold">
                The Philosophy
              </span>
              <h2 className="text-4xl lg:text-6xl font-artisan-serif text-foreground leading-[1.1]">
                {headline}
              </h2>
            </div>

            <div className="prose prose-lg text-muted-foreground font-artisan-sans leading-relaxed-artisan">
              <p className="first-letter:text-6xl first-letter:font-artisan-serif first-letter:text-primary first-letter:float-left first-letter:mr-4 first-letter:mt-[-10px]">
                {description}
              </p>
              <p>
                Crafted in Germany, every ErgoPack system is a testament to precision engineering.
                We don't just build machines; we build solutions that protect your most valuable
                asset—your people. The ergonomic design isn't an afterthought; it's the foundation
                of our entire philosophy.
              </p>
            </div>

            {/* Feature List if available */}
            {features && (
              <ul className="space-y-4 pt-4">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2.5" />
                    <span className="text-foreground font-artisan-sans">{feature}</span>
                  </li>
                ))}
              </ul>
            )}

            <div className="pt-10 border-t border-primary/10 flex gap-16">
              <div>
                <span className="block text-4xl font-artisan-serif text-primary">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 block">
                  Ergonomic
                </span>
              </div>
              <div>
                <span className="block text-4xl font-artisan-serif text-primary">Made in</span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1 block">
                  Germany
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
