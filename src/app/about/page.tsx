import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About ErgoPack India | German Engineering, Zero-Bending Technology',
  description:
    'Since 1998, ErgoPack has revolutionized pallet strapping with patented ChainLance technology. 15,000+ systems deployed across 60+ countries. Eliminate back injuries, boost productivity 3x.',
  keywords: [
    'about ErgoPack',
    'ErgoPack history',
    'German strapping manufacturer',
    'ChainLance technology inventor',
    'ergonomic equipment company',
    'pallet strapping pioneer',
    'Made in Germany strapping',
    'workplace safety innovation',
  ],
  openGraph: {
    title: 'About ErgoPack India | The Architects of Ergonomic Evolution',
    description:
      'German engineering excellence since 1998. The inventors of zero-bending pallet strapping.',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
