'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from '@/components/ui/MagneticButton';
import Image from 'next/image';
import { Scale, CheckCircle2 } from 'lucide-react';
import { SuggestedProducts } from '@/components/products/SuggestedProducts';
import { ComprehensiveProduct } from '@/data/comprehensive-products';

interface HeroSectionProps {
  model: string;
  fullName: string;
  headline: string;
  subheadline: string;
  imageSrc: string;
  onRequestDemo: () => void;
  onDownloadBrochure: () => void;
  onCompare?: () => void;
  isSelectedForComparison?: boolean;
  productData?: ComprehensiveProduct;
  productId?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  model,
  fullName,
  headline,
  subheadline,
  imageSrc,
  onRequestDemo,
  onDownloadBrochure,
  onCompare,
  isSelectedForComparison = false,
  productData,
  productId,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const textY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-background pt-20 lg:pt-0"
    >
      {/* Background Typography - The "Text Overlay" Effect (Refined) */}
      <div className="absolute inset-0 flex items-center justify-end pr-[5%] lg:pr-[10%] pointer-events-none select-none overflow-hidden">
        <motion.h1
          style={{ y: textY }}
          className="text-[20vw] lg:text-[25vw] font-artisan-serif font-bold text-secondary/30 whitespace-nowrap leading-none tracking-tighter opacity-30 mix-blend-multiply dark:mix-blend-soft-light"
        >
          {productData?.line === 'xpert-lfp-india' ? productData.name.replace('ErgoPack ', '') : model}
        </motion.h1>
      </div>

      {/* Main Content Container */}
      <div className="container mx-auto px-6 z-10 flex flex-col lg:flex-row items-center h-full relative">
        {/* Left Column: Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:w-1/2 flex flex-col justify-center space-y-6 lg:pr-12 pt-12 lg:pt-0"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex items-center gap-4"
            >
              <div className="h-[1px] w-12 bg-primary"></div>
              <span className="text-primary tracking-widest-artisan text-sm uppercase font-artisan-sans font-semibold">
                German Engineering
              </span>
            </motion.div>

            <h2 className="text-5xl lg:text-7xl font-artisan-serif font-medium italic text-foreground leading-[1.1] text-balance">
              {headline}{' '}
              <span className="not-italic text-primary/80 block text-3xl lg:text-4xl mt-2 font-normal">
                {productData?.line === 'xpert-lfp-india' ? productData.name.replace('ErgoPack ', '') : `${model} Series`}
              </span>
            </h2>

            <p className="text-lg lg:text-xl text-muted-foreground font-artisan-sans leading-relaxed-artisan max-w-lg text-balance border-l-2 border-primary/20 pl-6">
              {subheadline}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-5 pt-4">
            <MagneticButton
              onClick={onRequestDemo}
              className="bg-primary text-primary-foreground px-8 py-4 rounded-sm text-lg font-medium hover:bg-primary/90 transition-all shadow-premium-md hover:shadow-premium-lg"
            >
              Request Demo
            </MagneticButton>
            <MagneticButton
              onClick={onDownloadBrochure}
              className="border border-primary/20 bg-transparent text-foreground px-8 py-4 rounded-sm text-lg font-medium hover:bg-secondary transition-all"
            >
              Download Brochure
            </MagneticButton>

            {onCompare && (
              <MagneticButton
                onClick={onCompare}
                className={`border px-8 py-4 rounded-sm text-lg font-medium transition-all flex items-center justify-center gap-2 min-w-[200px] ${isSelectedForComparison
                    ? 'bg-red-600 border-red-600 text-white hover:bg-red-700'
                    : 'border-primary/20 bg-transparent text-foreground hover:bg-secondary'
                  }`}
              >
                {isSelectedForComparison ? (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Added to Compare</span>
                  </>
                ) : (
                  <>
                    <Scale className="w-5 h-5" />
                    <span>Add to Compare</span>
                  </>
                )}
              </MagneticButton>
            )}
          </div>

          {isSelectedForComparison && productData && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.5 }}
            >
              <SuggestedProducts currentProduct={productData} />
            </motion.div>
          )}
        </motion.div>

        {/* Right Column: Product Image (Premium Static Presentation) */}
        <motion.div
          style={{ y: imageY }}
          className="w-full lg:w-1/2 relative h-[45vh] lg:h-[75vh] flex items-center justify-center mt-8 lg:mt-0"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }} // Luxury ease
            className="relative w-full h-full flex items-center justify-center"
          >
            <Image
              src={imageSrc}
              alt={fullName}
              width={1000}
              height={1000}
              className="object-contain max-h-full drop-shadow-2xl z-20"
              priority
            />

            {/* Refined Glow Effect - Static & Elegant */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] -z-10" />
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground/70">
          Discover
        </span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary/50 to-transparent" />
      </motion.div>
    </section>
  );
};
