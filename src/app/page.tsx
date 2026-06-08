import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import ProductLanding from '@/components/home/ProductLanding';
import { FAQSchema, VideoSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Automated Pallet Strapping Machine India | Strap in 40s | ErgoPack',
  description:
    'Cut pallet strapping time from 120s to under 40s with ErgoPack mobile machines. Machine-calibrated tension up to 2500N eliminates transit damage and shipment rejections. Compare X-Pert Line, GO Line, and E-conomy Line for Indian manufacturing and export.',
  keywords: [
    'automated pallet strapping machine India',
    'mobile pallet strapping machine',
    'pallet strapping machine price India',
    'high tension pallet strapping machine',
    'reduce transit damage',
    'pallet strapping machine ROI',
    'ErgoPack X-Pert Line',
    'ErgoPack GO Line',
    'ErgoPack E-conomy Line',
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
    images: ['/images/main-hero-banner.png'],
  },
};

import PartnersSection from '@/components/elite/sections/PartnersSection';

export default function HomePage() {
  return (
    <MainLayout hideLogoInitially={true} noPadding={true} useSiteHeader={true}>
      <FAQSchema />
      <VideoSchema
        name="ErgoPack ChainLance: Strap a Pallet in Under 40 Seconds"
        description="See the patented ErgoPack ChainLance route the strap under and around the pallet automatically, letting a single operator secure a pallet in under 40 seconds — a 66% cut versus manual strapping."
        thumbnailUrl="/images/main-hero-banner.png"
        uploadDate="2026-01-01"
        contentUrl="/videos/demo.mp4"
      />
      <div className="bg-white selection:bg-[#C8102E] selection:text-white">
        <ProductLanding />
        <PartnersSection />
      </div>
    </MainLayout>
  );
}
