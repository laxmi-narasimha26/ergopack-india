import type { Metadata } from 'next';
import IndustriesPageClient from './IndustriesPageClient';

export const metadata: Metadata = {
  title: 'Pallet Strapping by Industry: Automotive, Pharma, FMCG, 3PL | ErgoPack India',
  description:
    'Industry-specific pallet strapping for automotive and heavy parts, pharmaceuticals, electronics, FMCG and 3PL — high-tension load securing, export-grade PET, and zero transit damage, supported across India by Benz Packaging.',
  keywords: [
    'automotive pallet strapping India',
    'pharmaceutical pallet strapping',
    'FMCG pallet strapping',
    'electronics packaging strapping',
    '3PL strapping automation',
    'heavy machinery export strapping',
    'industry pallet strapping machine',
    'pallet strapping for export India',
  ],
  openGraph: {
    title: 'Pallet Strapping by Industry: Automotive, Pharma, FMCG, 3PL | ErgoPack India',
    description:
      'High-tension load securing and export-grade strapping for automotive, pharma, electronics, FMCG and 3PL — supported across India by Benz Packaging.',
    type: 'website',
    locale: 'en_IN',
  },
  alternates: {
    canonical: '/industries',
  },
};

export default function IndustriesPage() {
  return <IndustriesPageClient />;
}
