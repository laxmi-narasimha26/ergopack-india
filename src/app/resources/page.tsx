import type { Metadata } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { resourceArticles } from '@/data/resource-articles';

export const metadata: Metadata = {
  title: 'Pallet Strapping Resources: ROI, Transit Damage, PET vs Steel | ErgoPack',
  description:
    'Data-driven guides on pallet strapping ROI, reducing transit damage, PET vs steel strapping, strapping vs stretch wrapping, and HSN/GST for Indian procurement teams.',
  keywords: [
    'pallet strapping ROI',
    'reduce transit damage',
    'PET vs steel strapping',
    'pallet strapping vs wrapping',
    'pallet strapping machine hsn code',
  ],
  alternates: { canonical: '/resources' },
};

export default function ResourcesIndexPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-white text-neutral-900">
        <header className="border-b border-neutral-200 bg-gradient-to-b from-[#faf7f2] to-white">
          <div className="mx-auto max-w-6xl px-5 pb-12 pt-28 sm:px-8 sm:pt-32">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
              Resources & Buying Guides
            </p>
            <h1 className="font-serif text-3xl font-bold text-neutral-950 sm:text-4xl md:text-5xl">
              Pallet Strapping Resources & Buying Guides
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-neutral-600">
              The math behind automated pallet strapping — ROI, transit-damage reduction, material
              engineering, competitor comparisons and procurement essentials for Indian
              manufacturing and export.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {resourceArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/resources/${article.slug}`}
                className="group flex flex-col rounded-2xl border border-neutral-200 bg-white p-6 transition hover:border-[#C8102E] hover:shadow-md"
              >
                <h2 className="font-serif text-xl font-semibold text-neutral-950 transition-colors group-hover:text-[#C8102E]">
                  {article.breadcrumb}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-neutral-600">
                  {article.description}
                </p>
                <span className="mt-4 inline-block text-sm font-semibold text-[#C8102E]">
                  Read the guide →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
