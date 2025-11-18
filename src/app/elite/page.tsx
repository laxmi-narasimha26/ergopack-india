'use client';

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import SmoothScroll from '@/components/elite/animations/SmoothScroll';
import ScrollProgress from '@/components/elite/ui/ScrollProgress';
import SectionBadge from '@/components/elite/ui/SectionBadge';
import PerformanceStats from '@/components/elite/ui/PerformanceStats';
import FixedHeader from '@/components/elite/ui/FixedHeader';
import WireframeBackground from '@/components/elite/3d/WireframeBackground';
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

// Dynamically import 3D components to avoid SSR issues
const Scene3D = dynamic(() => import('@/components/elite/3d/Scene3D'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-white text-2xl">Loading Premium Experience...</div>
    </div>
  ),
});

/**
 * Elite Premium Presentation Page
 *
 * The ultimate product presentation experience combining:
 * - Scroll-triggered 3D camera zoom (dolly in/out)
 * - Wireframe technical grid background
 * - Massive scaling text overlays
 * - 15 comprehensive sections
 * - Real-time performance stats
 * - Smooth cinematic animations
 *
 * Inspired by:
 * - meetdandy.com/technology/intraoral-scanner/
 * - nature-beyond.tech
 */
export default function ElitePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      {/* Fixed UI Overlays */}
      <FixedHeader />
      <ScrollProgress totalSections={15} />
      <SectionBadge />
      <PerformanceStats />

      {/* Smooth Scroll Wrapper */}
      <SmoothScroll>
        <div ref={containerRef} className="relative bg-black">
          {/* 3D Wireframe Background (Fixed) */}
          <WireframeBackground />

          {/* 3D Scene with Camera Zoom */}
          <Scene3D containerRef={containerRef} />

          {/* Content Sections */}
          <div className="relative z-10">
            {/* Section 1: Hero */}
            <HeroSection sectionNumber={1} />

            {/* Section 2: Precision */}
            <PrecisionSection sectionNumber={2} />

            {/* Section 3: Engineering */}
            <EngineeringSection sectionNumber={3} />

            {/* Section 4: Throughput */}
            <ThroughputSection sectionNumber={4} />

            {/* Section 5: Consistency */}
            <ConsistencySection sectionNumber={5} />

            {/* Section 6: Intelligence */}
            <IntelligenceSection sectionNumber={6} />

            {/* Section 7: Facility Impact */}
            <FacilitySection sectionNumber={7} />

            {/* Section 8: Global Standard */}
            <GlobalStandardSection sectionNumber={8} />

            {/* Section 9: Elite Network */}
            <EliteNetworkSection sectionNumber={9} />

            {/* Section 10: Comparison */}
            <ComparisonSection sectionNumber={10} />

            {/* Section 11: ROI */}
            <ROISection sectionNumber={11} />

            {/* Section 12: Scalability */}
            <ScalabilitySection sectionNumber={12} />

            {/* Section 13: Support */}
            <SupportSection sectionNumber={13} />

            {/* Section 14: Partnership */}
            <PartnershipSection sectionNumber={14} />

            {/* Section 15: Final CTA */}
            <FinalCTASection sectionNumber={15} />
          </div>
        </div>
      </SmoothScroll>
    </>
  );
}
