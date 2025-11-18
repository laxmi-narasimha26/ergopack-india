'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';

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

// 3D & Background
import WireframeBackground from '@/components/elite/3d/WireframeBackground';

// Animations & Special Components
import MachineOperation from '@/components/elite/animations/MachineOperation';
import ProcessTimeline from '@/components/elite/animations/ProcessTimeline';

// Original Sections
import HeroSection from '@/components/elite/sections/HeroSection';
import PrecisionSection from '@/components/elite/sections/PrecisionSection';
import EngineeringSection from '@/components/elite/sections/EngineeringSection';
import ThroughputSection from '@/components/elite/sections/ThroughputSection';
import ConsistencySection from '@/components/elite/sections/ConsistencySection';
import IntelligenceSection from '@/components/elite/sections/IntelligenceSection';
import FacilitySection from '@/components/elite/sections/FacilitySection';
import GlobalStandardSection from '@/components/elite/sections/GlobalStandardSection';
import EliteNetworkSection from '@/components/elite/sections/EliteNetworkSection';
import ComparisonSection from '@/components/elite/sections/ComparisonSection';
import ROISection from '@/components/elite/sections/ROISection';
import ScalabilitySection from '@/components/elite/sections/ScalabilitySection';
import SupportSection from '@/components/elite/sections/SupportSection';
import PartnershipSection from '@/components/elite/sections/PartnershipSection';
import FinalCTASection from '@/components/elite/sections/FinalCTASection';

// Dynamically import 3D scene to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/elite/3d/Scene3D'), {
  ssr: false,
  loading: () => null,
});

/**
 * Ergopack Elite - Ultra-Premium Presentation Page
 *
 * The most advanced product presentation ever created, featuring:
 *
 * 🎬 CINEMATIC EXPERIENCE:
 * - Lenis smooth scroll with momentum physics
 * - GSAP ScrollTrigger precision animations
 * - 60fps performance throughout
 *
 * 🎨 VISUAL EXCELLENCE:
 * - 3D wireframe background with particle effects
 * - Full X, Y, Z axis 3D product rotation
 * - Scroll-triggered camera zoom (dolly in/out)
 * - Massive scaling text overlays
 * - Glitch text effects
 * - Arrow symbol visual language
 *
 * 🎮 INTERACTIONS:
 * - Magnetic cursor with glow trail
 * - Keyboard navigation (↑↓, 1-9, Home/End, Space)
 * - Sound effects toggle
 * - FPS performance monitor
 *
 * 🎯 CONTENT:
 * - 15 comprehensive sections
 * - Animated machine operation sequence
 * - Process timeline visualization
 * - Before/after comparison sliders
 * - Custom video player
 * - Real-time performance stats
 *
 * INSPIRATION:
 * - meetdandy.com/technology/intraoral-scanner/
 * - nature-beyond.tech
 * - wearebouldergroup.com
 * - organimo.com
 */
export default function ElitePage() {
  const containerRef = useRef<HTMLDivElement>(null);

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
      <ScrollProgress totalSections={15} />
      <SectionBadge />
      <PerformanceStats />
      <FPSCounter />
      <SoundToggle />

      {/* Smooth Scroll Wrapper */}
      <SmoothScroll>
        <div ref={containerRef} className="relative bg-black overflow-hidden">
          {/* 3D Wireframe Background (Fixed) */}
          <WireframeBackground />

          {/* 3D Scene with Full Rotation & Camera Zoom */}
          <Scene3D containerRef={containerRef} />

          {/* Content Sections */}
          <div className="relative z-10">
            {/* Section 1: Hero Introduction */}
            <HeroSection sectionNumber={1} />

            {/* Section 2: Precision Engineering */}
            <PrecisionSection sectionNumber={2} />

            {/* NEW: Machine Operation Animation */}
            <section data-section className="relative">
              <MachineOperation />
            </section>

            {/* Section 3: German Engineering */}
            <EngineeringSection sectionNumber={3} />

            {/* Section 4: Throughput Capacity */}
            <ThroughputSection sectionNumber={4} />

            {/* Section 5: Consistency & Tolerance */}
            <ConsistencySection sectionNumber={5} />

            {/* NEW: Process Timeline */}
            <section data-section className="relative">
              <ProcessTimeline />
            </section>

            {/* Section 6: Industry 4.0 Intelligence */}
            <IntelligenceSection sectionNumber={6} />

            {/* Section 7: Facility Impact */}
            <FacilitySection sectionNumber={7} />

            {/* Section 8: Global Standard */}
            <GlobalStandardSection sectionNumber={8} />

            {/* Section 9: Elite Network */}
            <EliteNetworkSection sectionNumber={9} />

            {/* Section 10: Comparison */}
            <ComparisonSection sectionNumber={10} />

            {/* Section 11: ROI Analysis */}
            <ROISection sectionNumber={11} />

            {/* Section 12: Infinite Scalability */}
            <ScalabilitySection sectionNumber={12} />

            {/* Section 13: 24/7 Support */}
            <SupportSection sectionNumber={13} />

            {/* Section 14: Partnership Process */}
            <PartnershipSection sectionNumber={14} />

            {/* Section 15: Final CTA */}
            <FinalCTASection sectionNumber={15} />
          </div>
        </div>
      </SmoothScroll>
    </>
  );
}
