'use client';

import dynamic from 'next/dynamic';

const PhilosophySection = dynamic(() => import('@/components/elite/sections/PhilosophySection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-black" />,
});
const SocialProofSection = dynamic(() => import('@/components/elite/sections/SocialProofSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-white" />,
});
const PartnersSection = dynamic(() => import('@/components/elite/sections/PartnersSection'), {
  ssr: false,
  loading: () => <div className="h-48 bg-white" />,
});
const TestimonialsFooterSection = dynamic(
  () => import('@/components/testimonials/TestimonialsFooterSection'),
  { ssr: false, loading: () => <div className="h-96 bg-black" /> }
);
const FinalCTASection = dynamic(() => import('@/components/elite/sections/FinalCTASection'), {
  ssr: false,
});
const ConsolidatedProductLine = dynamic(
  () => import('@/components/products/ConsolidatedProductLine'),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-neutral-100" />,
  }
);
const TransformationStory = dynamic(() => import('@/components/home/TransformationStory'), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-white" />,
});
const HumanCostSection = dynamic(() => import('@/components/home/HumanCostSection'), {
  ssr: false,
  loading: () => <div className="h-96 bg-white" />,
});

export default function HomeClientSections() {
  return (
    <>
      <TransformationStory />
      <HumanCostSection />
      <ConsolidatedProductLine />
      <PhilosophySection />
      <SocialProofSection />
      <PartnersSection />
      <TestimonialsFooterSection />
      <FinalCTASection />
    </>
  );
}
