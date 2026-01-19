import { Suspense } from 'react';
import ComparePageClient from './ComparePageClient';

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
