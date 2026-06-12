import type { Metadata } from 'next';
import { Suspense } from 'react';
import ComparePageClient from './ComparePageClient';

export const metadata: Metadata = {
  title: 'Compare ErgoPack 726X, GO & 700 Pallet Strapping Machines | ErgoPack India',
  description:
    'Compare the ErgoPack 726X, GO and 700 side by side — tension, strap material, power, speed and pallet range — to find the right mobile pallet strapping machine for your floor.',
  alternates: {
    canonical: '/compare',
  },
  robots: {
    index: false,
    follow: false,
  },
};

function CompareFallback() {
  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function ComparePage() {
  return (
    <Suspense fallback={<CompareFallback />}>
      <ComparePageClient />
    </Suspense>
  );
}
