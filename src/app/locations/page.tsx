import type { Metadata } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { BreadcrumbSchema } from '@/components/JsonLd';
import { locationPages } from '@/data/location-pages';

// Group every location page by state so the index is scannable, not an endless
// place-wise scroll. States are ordered by how many hubs we cover in each.
const locationsByState = (() => {
  const map = new Map<string, typeof locationPages>();
  for (const page of locationPages) {
    const list = map.get(page.state) ?? [];
    list.push(page);
    map.set(page.state, list);
  }
  return Array.from(map.entries())
    .map(([state, pages]) => ({
      state,
      pages: [...pages].sort((a, b) => a.city.localeCompare(b.city)),
    }))
    .sort((a, b) => b.pages.length - a.pages.length || a.state.localeCompare(b.state));
})();

export const metadata: Metadata = {
  title: 'Pallet Strapping Machine Across India — Hubs & Ports by State | ErgoPack',
  description:
    'Pallet strapping machine pages for 45+ Indian manufacturing hubs and export ports, organised by state — Maharashtra, Gujarat, Tamil Nadu, NCR and more. Find a hub-specific 726X, GO or 700 recommendation. Supplied and serviced nationwide by Benz Packaging.',
  keywords: [
    'pallet strapping machine India',
    'pallet strapping machine by city',
    'pallet strapping machine manufacturing hub',
    'pallet strapping machine port',
    'automatic pallet strapping India',
    'pallet strapping machine supplier India',
    'pallet strapping machine by state',
  ],
  alternates: {
    canonical: '/locations',
  },
  openGraph: {
    title: 'Pallet Strapping Machine by Manufacturing Hub | ErgoPack India',
    description: 'Location-specific pallet strapping pages for major Indian manufacturing hubs.',
    type: 'website',
    locale: 'en_IN',
    images: ['/images/products/726x.png'],
  },
};

export default function LocationsPage() {
  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Manufacturing Hubs', item: '/locations' },
        ]}
      />

      <MainLayout>
        <div className="bg-white text-stone-950">
          <section className="border-b border-stone-200 bg-[radial-gradient(circle_at_top_left,_rgba(200,16,46,0.06),_transparent_30%),linear-gradient(180deg,#ffffff_0%,#fbf8f3_100%)]">
            <div className="mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 lg:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C8102E]">
                Manufacturing & Logistics Hubs
              </p>
              <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight md:text-5xl lg:text-[3.7rem]">
                Find the right pallet strapping system for your city, pallet profile, and dispatch
                workflow
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">
                Use these pages to compare ErgoPack 726X Li, ErgoPack GO, and ErgoPack 700 by
                industrial cluster, pallet movement, ergonomic needs, and warehouse efficiency goals
                in each manufacturing hub.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-[#C8102E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a90e26]"
                >
                  Request a recommendation
                </Link>
                <Link
                  href="/products/compare-machines"
                  className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:border-stone-900"
                >
                  Compare 726X Li, GO & 700
                </Link>
              </div>
            </div>
          </section>

          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              <article className="border-t border-stone-200 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C8102E]">
                  Choose by workload
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">
                  Match the machine to pallet volume and strap duty
                </h2>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  See where the 726X Li fits higher-throughput automatic pallet strapping, where the
                  GO fits flexible mobile work, and where the 700 makes sense for manual,
                  power-independent use.
                </p>
              </article>
              <article className="border-t border-stone-200 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C8102E]">
                  Choose by layout
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">
                  Compare fixed dispatch lanes versus multi-bay movement
                </h2>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  Different hubs run different warehouse layouts. These pages help you decide
                  whether your floor needs portable pallet strapping, automatic pallet strapping, or
                  a simpler ergonomic upgrade.
                </p>
              </article>
              <article className="border-t border-stone-200 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C8102E]">
                  Choose by outcome
                </p>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950">
                  Focus on ergonomics, speed, and workspace efficiency
                </h2>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  If the goal is safer handling, less bending, faster dispatch, or a cleaner
                  workspace upgrade, the hub pages show which model is the better commercial fit.
                </p>
              </article>
            </div>
          </section>

          <section className="border-y border-stone-200 bg-[#fcfaf6]">
            <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C8102E]">
                  Locations We Serve · By State
                </p>
                <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-stone-950">
                  Pallet strapping machine pages for {locationPages.length}+ Indian industrial hubs &amp; ports
                </h2>
                <p className="mt-4 text-base leading-8 text-stone-600">
                  Supplied, installed and serviced across India by Benz Packaging. Pick your state,
                  then your city or port for a hub-specific machine recommendation.
                </p>
              </div>

              <div className="mt-10 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {locationsByState.map((group) => (
                  <div key={group.state} className="border-t border-stone-200 pt-5">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-lg font-semibold tracking-tight text-stone-950">
                        {group.state}
                      </h3>
                      <span className="text-xs font-medium uppercase tracking-wider text-stone-400">
                        {group.pages.length} {group.pages.length === 1 ? 'hub' : 'hubs'}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                      {group.pages.map((page) => (
                        <li key={page.slug}>
                          <Link
                            href={`/locations/${page.slug}`}
                            className="group flex items-baseline justify-between gap-3 text-stone-700 transition-colors hover:text-[#C8102E]"
                          >
                            <span className="text-[15px] font-medium">{page.city}</span>
                            <span className="text-stone-300 transition-colors group-hover:text-[#C8102E]">
                              →
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </MainLayout>
    </>
  );
}
