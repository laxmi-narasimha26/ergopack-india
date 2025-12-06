'use client';

import dynamic from 'next/dynamic';
import MainLayout from '@/components/layout/MainLayout';

// UI Components
import SmoothScroll from '@/components/elite/animations/SmoothScroll';
import FixedHeader from '@/components/elite/ui/FixedHeader';
import ScrollProgress from '@/components/elite/ui/ScrollProgress';
import MagneticCursor from '@/components/elite/ui/MagneticCursor';

// Section Components
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

// Dynamically import 3D components (no SSR for WebGL)
const Scene3D = dynamic(() => import('@/components/elite/3d/Scene3D'), {
    ssr: false,
    loading: () => <div className="fixed inset-0 bg-black" />,
});

const WireframeBackground = dynamic(
    () => import('@/components/elite/3d/WireframeBackground'),
    {
        ssr: false,
        loading: () => null,
    }
);

export default function ElitePage() {
    const totalSections = 15;

    return (
        <MainLayout>
            <SmoothScroll>
                {/* Fixed UI Elements */}
                <FixedHeader />
                <ScrollProgress totalSections={totalSections} />
                <MagneticCursor />

                {/* 3D Background Layer */}
                <div className="fixed inset-0 z-0 pointer-events-none">
                    <WireframeBackground />
                </div>

                {/* Main Content */}
                <div className="relative z-10 bg-black">
                    {/* Section 1: Hero */}
                    <HeroSection />

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
            </SmoothScroll>
        </MainLayout>
    );
}
