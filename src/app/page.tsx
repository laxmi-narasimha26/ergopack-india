import type { Metadata } from 'next';
import dynamicImport from 'next/dynamic';
import MainLayout from '@/components/layout/MainLayout';
import ImageHeroSection from '@/components/elite/sections/ImageHeroSection';
import TransformationInfographic from '@/components/home/TransformationInfographic';
import SearchHubSection from '@/components/home/SearchHubSection';
import { FAQSchema, VideoSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Automated Pallet Strapping Machine India | Strap in 40s | ErgoPack',
  description:
    'Cut pallet strapping time from 120s to under 40s with ErgoPack mobile machines. Machine-calibrated tension up to 2500N eliminates transit damage and shipment rejections. Compare the ErgoPack 726X, GO, and 700 for Indian manufacturing and export.',
  keywords: [
    'automated pallet strapping machine India',
    'mobile pallet strapping machine',
    'pallet strapping machine price India',
    'high tension pallet strapping machine',
    'reduce transit damage',
    'pallet strapping machine ROI',
    'ErgoPack 726X',
    'ErgoPack GO',
    'ErgoPack 700',
  ],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Automated Pallet Strapping Machine India | ErgoPack',
    description:
      'German-engineered mobile pallet strapping machines. Strap a pallet in under 40 seconds, eliminate transit damage, and cut labor and material costs.',
    type: 'website',
    images: ['/images/products/726x.png'],
  },
};

const AppleStyleProductShowcase = dynamicImport(
  () => import('@/components/elite/sections/AppleStyleProductShowcase'),
  { ssr: true }
);
const PhilosophySection = dynamicImport(
  () => import('@/components/elite/sections/PhilosophySection'),
  { ssr: true }
);
const SocialProofSection = dynamicImport(
  () => import('@/components/elite/sections/SocialProofSection'),
  { ssr: true }
);
const PartnersSection = dynamicImport(() => import('@/components/elite/sections/PartnersSection'), {
  ssr: false,
  loading: () => <div className="h-48 bg-white" />,
});
const TestimonialsFooterSection = dynamicImport(
  () => import('@/components/testimonials/TestimonialsFooterSection'),
  { ssr: false, loading: () => <div className="h-96 bg-white" /> }
);
const FinalCTASection = dynamicImport(() => import('@/components/elite/sections/FinalCTASection'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <MainLayout hideLogoInitially={true} noPadding={true}>
      <FAQSchema />
      <VideoSchema
        name="ErgoPack ChainLance: Strap a Pallet in Under 40 Seconds"
        description="See the patented ErgoPack ChainLance route the strap under and around the pallet automatically, letting a single operator secure a pallet in under 40 seconds — a 66% cut versus manual strapping."
        thumbnailUrl="/images/hero-machine.png"
        uploadDate="2026-01-01"
        contentUrl="/videos/demo.mp4"
      />
      <div className="bg-white selection:bg-artisan-gold selection:text-white">
        <ImageHeroSection />
        <TransformationInfographic />
        <SearchHubSection />
        <AppleStyleProductShowcase />
        <PhilosophySection />
        <SocialProofSection />
        <PartnersSection />
        <TestimonialsFooterSection />
        <FinalCTASection />
      </div>
    </MainLayout>
  );
}
