import { Metadata } from 'next';
import PremiumProductPage from '@/components/products/PremiumProductPage';
import { ergoPack713X } from '@/data/comprehensive-products';

export const metadata: Metadata = {
  title: 'ErgoPack 713X Li - Ultimate Complete System | X-pert Line',
  description: 'ErgoPack 713X Li X-pert Line with sealing head, tool-lift, AND line-laser ALL INCLUDED. Lithium-Ion 1200 cycles, 66m/min speed, Siemens touchscreen control.',
  keywords: [
    'ErgoPack 713X',
    'complete strapping system',
    'sealing head included',
    'line-laser included',
    'tool-lift included',
    '1200 cycles',
    'Siemens touchscreen',
  ],
  openGraph: {
    title: 'ErgoPack 713X Li - Ultimate Complete Strapping & Sealing System',
    description: 'X-pert Line with sealing head + tool-lift + line-laser ALL INCLUDED for professional packaging.',
    images: ['/images/products/713X/1.png'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ErgoPack 713X Li - Ultimate Complete System',
    description: 'Sealing head, tool-lift, and line-laser ALL INCLUDED in premium X-pert package.',
    images: ['/images/products/713X/1.png'],
  },
};

export default function ErgoPack713XPage() {
  return <PremiumProductPage product={ergoPack713X} />;
}
