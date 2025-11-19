import { Metadata } from 'next';
import PremiumProductPage from '@/components/products/PremiumProductPage';
import { ergoPack713E } from '@/data/comprehensive-products';

export const metadata: Metadata = {
  title: 'ErgoPack 713E - Complete Strapping & Sealing System | Economy Line',
  description: 'ErgoPack 713E Economy Line with integrated sealing head and tool-lift included. Professional sealing for PP and PET straps with 40m/min speed and 350 cycles.',
  keywords: [
    'ErgoPack 713E',
    'sealing head included',
    'complete strapping system',
    'PP PET sealing',
    'tool-lift included',
    '350 cycles',
    'professional sealing',
  ],
  openGraph: {
    title: 'ErgoPack 713E - Complete Strapping & Sealing System',
    description: 'Economy Line system with sealing head and tool-lift included for professional PP and PET strapping.',
    images: ['/images/products/713E/1.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 713E - Strapping & Sealing',
    description: 'Complete solution with sealing head included for professional packaging.',
    images: ['/images/products/713E/1.png'],
  },
};

export default function ErgoPack713EPage() {
  return <PremiumProductPage product={ergoPack713E} />;
}
