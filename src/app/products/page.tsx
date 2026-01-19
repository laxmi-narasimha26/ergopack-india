import type { Metadata } from 'next';
import ProductsPageClient from './ProductsPageClient';

export const metadata: Metadata = {
  title: 'Ergonomic Pallet Strapping Machines | Full Product Range | ErgoPack India',
  description:
    "Explore ErgoPack's complete range of ergonomic pallet strapping machines. Zero-bending technology, German precision engineering. X-pert Line, Economy Line, and Mobile GO systems for every application.",
  keywords: [
    'pallet strapping machine India',
    'ergonomic strapping equipment',
    'ErgoPack products',
    'zero bending strapping',
    'X-pert Line strapping',
    'Economy Line pallet strapper',
    'mobile strapping system',
    'industrial strapping India',
    'ChainLance technology',
    'battery powered strapping',
  ],
  openGraph: {
    title: 'Pallet Strapping Machines | ErgoPack India Product Range',
    description:
      'German-engineered ergonomic pallet strapping solutions. Zero bending, 3x faster, 90% injury reduction.',
    type: 'website',
    locale: 'en_IN',
    images: ['/images/products/726x.png'],
  },
  alternates: {
    canonical: '/products',
  },
};

export default function ProductsPage() {
  return <ProductsPageClient />;
}
