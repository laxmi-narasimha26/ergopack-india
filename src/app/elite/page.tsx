'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';

// Core Layout & Navigation
import SmoothScroll from '@/components/elite/animations/SmoothScroll';
import PremiumPreloader from '@/components/elite/ui/PremiumPreloader';
import FixedHeader from '@/components/elite/ui/FixedHeader';
import ScrollProgress from '@/components/elite/ui/ScrollProgress';
import SectionBadge from '@/components/elite/ui/SectionBadge';
import PerformanceStats from '@/components/elite/ui/PerformanceStats';
import KeyboardNavigation from '@/components/elite/ui/KeyboardNavigation';
import MagneticCursor from '@/components/elite/ui/MagneticCursor';
import FPSCounter from '@/components/elite/ui/FPSCounter';
import SoundToggle from '@/components/elite/ui/SoundToggle';
import ProductSelector from '@/components/elite/ui/ProductSelector';

// 3D & Background
import WireframeBackground from '@/components/elite/3d/WireframeBackground';

// Animations & Special Components
import MachineOperation from '@/components/elite/animations/MachineOperation';

// Common Intro Sections
import HeroSection from '@/components/elite/sections/HeroSection';
import PrecisionSection from '@/components/elite/sections/PrecisionSection';
import EngineeringSection from '@/components/elite/sections/EngineeringSection';

// Product Specific
import ProductShowcase from '@/components/elite/sections/ProductShowcase';

// Common Outro Sections
import PartnershipSection from '@/components/elite/sections/PartnershipSection';
import FinalCTASection from '@/components/elite/sections/FinalCTASection';

// Product Data
import productsData from '@/../../products-data.json';

// Dynamically import 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/elite/3d/Scene3D'), {
  ssr: false,
  loading: () => null,
});

/**
 * Ergopack Elite - Ultra-Premium Product Presentation
 *
 * REDESIGNED STRUCTURE:
 * 1. Common Intro (Hero, Precision, Engineering, Machine Operation)
 * 2. Product Selector Popup
 * 3. Product-Specific Slides (Dynamic based on selection)
 * 4. Common Outro (Partnership, Final CTA)
 *
 * Features:
 * - Select any of the 11 ErgoPack models
 * - Each product gets 5 dedicated slides with complete specs
 * - Smooth transitions between all sections
 * - Consistent scroll speed throughout
 * - Premium loading animation (20% faster)
 */
export default function ElitePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showProductSelector, setShowProductSelector] = useState(false);

  // Calculate total sections based on selection
  const getTotalSections = () => {
    // 4 common intro + 1 product selector trigger
    // 5 product-specific slides
    // 2 common outro
    return selectedProduct ? 12 : 5;
  };

  // Show product selector after scrolling past intro sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      // Show selector after first 3 sections (~3 viewport heights)
      if (!selectedProduct && scrollY > window.innerHeight * 3 && scrollY < window.innerHeight * 4) {
        setShowProductSelector(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedProduct]);

  const handleProductSelect = (productKey: string) => {
    setSelectedProduct(productKey);
    setShowProductSelector(false);
    // Smooth scroll to product showcase
    setTimeout(() => {
      const productSection = document.querySelector('[data-product-showcase]');
      if (productSection) {
        productSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  };

  const productData = selectedProduct
    ? productsData.products[selectedProduct as keyof typeof productsData.products]
    : null;

  return (
    <>
      {/* Premium Loading Experience */}
      <PremiumPreloader />

      {/* Magnetic Cursor */}
      <MagneticCursor />

      {/* Keyboard Navigation */}
      <KeyboardNavigation />

      {/* Fixed UI Overlays */}
      <FixedHeader />
      <ScrollProgress totalSections={getTotalSections()} />
      <SectionBadge />
      <PerformanceStats />
      <FPSCounter />
      <SoundToggle />

      {/* Product Selector Modal */}
      <AnimatePresence>
        {showProductSelector && (
          <ProductSelector
            onSelect={handleProductSelect}
            onClose={() => setShowProductSelector(false)}
          />
        )}
      </AnimatePresence>

      {/* Smooth Scroll Wrapper */}
      <SmoothScroll>
        <div ref={containerRef} className="relative bg-black overflow-hidden">
          {/* 3D Wireframe Background (Fixed) */}
          <WireframeBackground />

          {/* 3D Scene with Full Rotation & Camera Zoom */}
          <Scene3D containerRef={containerRef} />

          {/* Content Sections */}
          <div className="relative z-10">
            {/* ========== COMMON INTRO SECTION ========== */}

            {/* Section 1: Hero Introduction */}
            <HeroSection sectionNumber={1} />

            {/* Section 2: Precision Engineering */}
            <PrecisionSection sectionNumber={2} />

            {/* Section 3: Machine Operation Animation */}
            <section data-section className="relative">
              <MachineOperation />
            </section>

            {/* Section 4: German Engineering */}
            <EngineeringSection sectionNumber={3} />

            {/* ========== PRODUCT SELECTION TRIGGER ========== */}
            {!selectedProduct && (
              <section data-section className="min-h-screen flex items-center justify-center relative">
                <div className="max-w-5xl mx-auto px-8 sm:px-12 text-center">
                  <div className="mb-12">
                    <h2 className="text-7xl sm:text-8xl font-black tracking-tighter mb-8">
                      <span className="text-white">CHOOSE YOUR</span>
                      <br />
                      <span className="text-[#C8102E]">MACHINE</span>
                    </h2>
                    <p className="text-2xl sm:text-3xl text-gray-400 font-light leading-relaxed max-w-3xl mx-auto mb-12">
                      Select from 11 premium ErgoPack models to explore complete specifications
                    </p>
                  </div>

                  <button
                    onClick={() => setShowProductSelector(true)}
                    className="group relative px-16 py-8 bg-gradient-to-r from-[#C8102E] to-red-700 rounded-full text-white text-2xl font-bold overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#C8102E]/50"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      SELECT PRODUCT
                      <span className="text-3xl group-hover:translate-x-2 transition-transform duration-300">→</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-[#C8102E] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>

                  <div className="mt-16 text-gray-600 text-sm font-mono">
                    ↓ SCROLL TO SELECT OR CLICK BUTTON ↓
                  </div>
                </div>
              </section>
            )}

            {/* ========== PRODUCT-SPECIFIC SECTIONS ========== */}
            {selectedProduct && productData && (
              <div data-product-showcase>
                <ProductShowcase
                  productData={productData}
                />

                {/* Change Product Button */}
                <section data-section className="min-h-screen flex items-center justify-center relative">
                  <div className="max-w-5xl mx-auto px-8 sm:px-12 text-center">
                    <h2 className="text-6xl sm:text-7xl font-black text-white mb-8">
                      Explore Another Model?
                    </h2>
                    <p className="text-2xl text-gray-400 font-light mb-12">
                      Compare features across our complete range of 11 models
                    </p>
                    <button
                      onClick={() => {
                        setSelectedProduct(null);
                        setShowProductSelector(true);
                      }}
                      className="px-12 py-6 bg-white/10 backdrop-blur-xl border-2 border-white/20 rounded-full text-white text-xl font-bold hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                    >
                      CHANGE PRODUCT
                    </button>
                  </div>
                </section>
              </div>
            )}

            {/* ========== COMMON OUTRO SECTION ========== */}

            {/* Partnership Process */}
            <PartnershipSection sectionNumber={selectedProduct ? 11 : 5} />

            {/* Final CTA */}
            <FinalCTASection sectionNumber={selectedProduct ? 12 : 6} />
          </div>
        </div>
      </SmoothScroll>
    </>
  );
}
