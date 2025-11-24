'use client';

import React, { useRef, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { AnimatePresence } from 'framer-motion';

// Theme Provider
import { ThemeProvider } from '@/contexts/ThemeContext';

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
import ThemeToggle from '@/components/elite/ui/ThemeToggle';
import ProductSelector from '@/components/elite/ui/ProductSelector';

// 3D & Background
import WireframeBackground from '@/components/elite/3d/WireframeBackground';

// Animations & Special Components
import MachineOperation from '@/components/elite/animations/MachineOperation';

// Common Intro Sections
import HeroSection from '@/components/elite/sections/HeroSection';
import CompanyJourneySection from '@/components/elite/sections/CompanyJourneySection';
import PartnershipIntroSection from '@/components/elite/sections/PartnershipIntroSection';
import PrecisionSection from '@/components/elite/sections/PrecisionSection';
import EngineeringSection from '@/components/elite/sections/EngineeringSection';
import GlobalPresenceSection from '@/components/elite/sections/GlobalPresenceSection';

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
 * REDESIGNED STRUCTURE WITH COMPREHENSIVE COMPANY STORY:
 *
 * PHASE 1: Company Introduction (5 sections)
 * 1. Hero - Brand introduction
 * 2. Company Journey - 40 years of ErgopackGermany history
 * 3. Partnership Story - Benz + ErgopackGermany collaboration
 * 4. Precision Engineering - Technical excellence showcase
 * 5. Machine Operation - How it works (all 5 steps visualized)
 *
 * PHASE 2: Global Presence (2 sections)
 * 6. Engineering Excellence - German standards
 * 7. Global Presence & Certifications - Worldwide reach
 *
 * PHASE 3: Product Selection & Detailed Showcase
 * 8. Product Selector - Choose from 11 models
 * 9-14. Product-Specific Slides with 3D viewer and detailed specs
 *
 * PHASE 4: Closing Excellence (2 sections)
 * 15. Partnership & Support - Long-term commitment
 * 16. Final CTA - Contact and next steps
 *
 * Features:
 * - Dark/Light mode toggle
 * - Advanced 3D product visualization
 * - Interactive tooltips for complex features
 * - Premium icons (no emojis)
 * - Comprehensive company story before products
 * - All 11 ErgopackGermany models with complete specs
 */

function ElitePageContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [showProductSelector, setShowProductSelector] = useState(false);

  // Calculate total sections based on selection
  const getTotalSections = () => {
    // 7 intro sections + 1 selector + (5 product sections if selected) + 2 outro
    return selectedProduct ? 15 : 10;
  };

  // Show product selector after scrolling past intro sections
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;

      // Show selector after first 7 sections (~7 viewport heights) - after company story
      if (
        !selectedProduct &&
        scrollY > window.innerHeight * 7 &&
        scrollY < window.innerHeight * 8
      ) {
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
      <ThemeToggle />
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
        <div ref={containerRef} className="relative bg-theme-primary overflow-hidden">
          {/* 3D Wireframe Background (Fixed) */}
          <WireframeBackground />

          {/* 3D Scene with Full Rotation & Camera Zoom */}
          <Scene3D containerRef={containerRef} />

          {/* Content Sections */}
          <div className="relative z-10">
            {/* ========== PHASE 1: COMPANY INTRODUCTION ========== */}

            {/* Section 1: Hero Introduction */}
            <HeroSection sectionNumber={1} />

            {/* Section 2: Company Journey - 40 years of history */}
            <CompanyJourneySection sectionNumber={2} />

            {/* Section 3: Partnership Story - Benz + ErgoPack Germany */}
            <PartnershipIntroSection sectionNumber={3} />

            {/* Section 4: Precision Engineering */}
            <PrecisionSection sectionNumber={4} />

            {/* Section 5: Machine Operation Animation - All 5 steps */}
            <section data-section className="relative">
              <MachineOperation />
            </section>

            {/* ========== PHASE 2: GLOBAL EXCELLENCE ========== */}

            {/* Section 6: German Engineering */}
            <EngineeringSection sectionNumber={6} />

            {/* Section 7: Global Presence & Certifications */}
            <GlobalPresenceSection sectionNumber={7} />

            {/* ========== PRODUCT SELECTION TRIGGER ========== */}
            {!selectedProduct && (
              <section
                data-section
                className="min-h-screen flex items-center justify-center relative"
              >
                <div className="max-w-5xl mx-auto px-8 sm:px-12 text-center">
                  <div className="mb-12">
                    <h2 className="text-7xl sm:text-8xl font-black tracking-tighter mb-8">
                      <span className="text-theme-primary">CHOOSE YOUR</span>
                      <br />
                      <span className="text-[#C8102E]">MACHINE</span>
                    </h2>
                    <p className="text-2xl sm:text-3xl text-theme-secondary font-light leading-relaxed max-w-3xl mx-auto mb-12">
                      Select from 11 premium ErgoPack models to explore complete specifications
                    </p>
                  </div>

                  <button
                    onClick={() => setShowProductSelector(true)}
                    className="group relative px-16 py-8 bg-gradient-to-r from-[#C8102E] to-red-700 rounded-full text-white text-2xl font-bold overflow-hidden transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-[#C8102E]/50"
                  >
                    <span className="relative z-10 flex items-center gap-4">
                      SELECT PRODUCT
                      <span className="text-3xl group-hover:translate-x-2 transition-transform duration-300">
                        →
                      </span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-[#C8102E] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </button>

                  <div className="mt-16 text-theme-secondary text-sm font-mono">
                    ↓ SCROLL TO SELECT OR CLICK BUTTON ↓
                  </div>
                </div>
              </section>
            )}

            {/* ========== PRODUCT-SPECIFIC SECTIONS ========== */}
            {selectedProduct && productData && (
              <div data-product-showcase>
                <ProductShowcase productData={productData} />

                {/* Change Product Button */}
                <section
                  data-section
                  className="min-h-screen flex items-center justify-center relative"
                >
                  <div className="max-w-5xl mx-auto px-8 sm:px-12 text-center">
                    <h2 className="text-6xl sm:text-7xl font-black text-theme-primary mb-8">
                      Explore Another Model?
                    </h2>
                    <p className="text-2xl text-theme-secondary font-light mb-12">
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

            {/* ========== PHASE 4: CLOSING EXCELLENCE ========== */}

            {/* Partnership Process & Support */}
            <PartnershipSection sectionNumber={selectedProduct ? 14 : 8} />

            {/* Final CTA - Contact */}
            <FinalCTASection sectionNumber={selectedProduct ? 15 : 9} />
          </div>
        </div>
      </SmoothScroll>
    </>
  );
}

// Main export with ThemeProvider wrapper
export default function ElitePage() {
  return (
    <ThemeProvider>
      <ElitePageContent />
    </ThemeProvider>
  );
}
