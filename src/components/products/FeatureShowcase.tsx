'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
}

interface FeatureShowcaseProps {
  features: Feature[];
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ features }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-20 bg-secondary/10 overflow-hidden relative">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sticky Header */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-32 h-fit">
            <span className="text-xs font-artisan-sans tracking-widest-artisan uppercase text-accent mb-3 block">
              The Details
            </span>
            <h2 className="text-3xl lg:text-4xl font-artisan-serif text-foreground leading-tight mb-4">
              Engineered for <br /> Perfection
            </h2>
            <p className="text-sm text-muted-foreground font-artisan-sans leading-relaxed-artisan">
              Every detail of the ErgoPack system is designed with a singular purpose: to make
              strapping pallets safer, faster, and more comfortable.
            </p>
          </div>

          {/* Scrollable Features - Compact Grid */}
          <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-5">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="bg-background p-6 rounded-sm border border-primary/5 shadow-premium-sm hover:shadow-premium-md transition-shadow duration-500 group"
              >
                <div className="mb-4 w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-lg font-artisan-serif text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground font-artisan-sans leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
