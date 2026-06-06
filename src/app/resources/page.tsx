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
      <div className="mx-auto max-w-4xl px-5 py-16 sm:py-24">
        <h1 className="font-serif text-3xl font-semibold sm:text-4xl">
          Pallet Strapping Resources & Buying Guides
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-neutral-600">
          The math behind automated pallet strapping — ROI, transit-damage reduction, material
          engineering and procurement essentials for Indian manufacturing and export.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {resourceArticles.map((article) => (
            <Link
              key={article.slug}
              href={`/resources/${article.slug}`}
              className="group rounded-2xl border border-neutral-200 p-6 transition hover:border-neutral-400 hover:shadow-sm"
            >
              <h2 className="font-serif text-xl font-semibold group-hover:text-artisan-gold">
                {article.breadcrumb}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{article.description}</p>
              <span className="mt-4 inline-block text-sm font-medium text-artisan-gold">
                Read the guide →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
