import type { Metadata } from 'next';
import IndustriesPageClient from './IndustriesPageClient';

export const metadata: Metadata = {
  title: 'Industry Solutions | Pharmaceutical, Automotive, Electronics | ErgoPack India',
  description:
    'ErgoPack industry-specific pallet strapping solutions. Pharmaceutical GDP compliance, automotive JIT reliability, electronics ESD protection. Zero-damage, zero-injury operations across India.',
  keywords: [
    'pharmaceutical strapping India',
    'automotive pallet strapping',
    'electronics packaging solutions',
    'industry-specific strapping',
    'GDP compliant strapping',
    'JIT logistics strapping',
    'ESD safe packaging',
    'FMCG pallet solutions',
    'manufacturing strapping India',
    'supply chain packaging',
  ],
  openGraph: {
    title: 'Industry Solutions | ErgoPack India',
    description: 'Precision solutions for pharmaceutical, automotive, and electronics industries.',
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
