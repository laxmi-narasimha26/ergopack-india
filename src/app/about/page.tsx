import type { Metadata } from 'next';
import AboutPageClient from './AboutPageClient';

export const metadata: Metadata = {
  title: 'About ErgoPack India | The Original Mobile Pallet Strapping System',
  description:
    'ErgoPack invented the patented mobile ChainLance pallet strapping system — 15,000+ machines across 60+ countries. In India, engineered in Germany and supported by Benz Packaging with service and genuine parts nationwide.',
  keywords: [
    'about ErgoPack India',
    'original pallet strapping manufacturer',
    'ChainLance technology inventor',
    'German pallet strapping manufacturer',
    'mobile pallet strapping system',
    'Benz Packaging ErgoPack',
    'Made in Germany strapping machine',
    'pallet strapping machine India',
  ],
  openGraph: {
    title: 'About ErgoPack India | The Original Mobile Pallet Strapping System',
    description:
      'The inventors of the patented mobile ChainLance pallet strapping system — German-engineered, supported across India by Benz Packaging.',
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
