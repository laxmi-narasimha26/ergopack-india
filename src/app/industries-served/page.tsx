import type { Metadata } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import LeadForm from '@/components/forms/LeadForm';

export const metadata: Metadata = {
  title: 'Industries We Serve: Pallet Strapping & Packaging Guides by Sector | ErgoPack India',
  description:
    'Pallet strapping and export-packaging guidance for every Indian industry — automotive, pharma, FMCG, ceramics, stone, textiles, steel, agri, cold chain, electronics and more. Find the method for your load.',
  keywords: [
    'pallet strapping by industry',
    'industrial packaging guides India',
    'export packaging by sector',
    'automotive pallet strapping',
    'pharmaceutical packaging India',
    'ceramic tile export packaging',
    'stone slab export packaging',
    'cold chain packaging India',
  ],
  alternates: { canonical: '/industries-served' },
  openGraph: {
    title: 'Industries We Serve: Pallet Strapping & Packaging Guides | ErgoPack India',
    description:
      'Export-packaging and load-securing guidance for every Indian industry — find the right method, material and machine for your load.',
    type: 'website',
    locale: 'en_IN',
  },
};

type Guide = { label: string; href: string };
type Sector = { title: string; blurb: string; guides: Guide[] };

const SECTORS: Sector[] = [
  {
    title: 'Automotive & Heavy Engineering',
    blurb:
      'Dense, irregular, high-value parts for export — high-tension securing and rust-free PET are non-negotiable.',
    guides: [
      { label: 'Automotive parts export packaging', href: '/blog/automotive-parts-export-packaging' },
      { label: 'Steel coil packaging & securing', href: '/blog/steel-coil-packaging-securing' },
      { label: 'Best machine for heavy loads', href: '/resources/best-pallet-strapping-machine-heavy-loads' },
    ],
  },
  {
    title: 'Pharmaceuticals & Cold Chain',
    blurb:
      'Validated, hygienic, low-contact securing that keeps the cold chain and the documentation intact.',
    guides: [
      { label: 'Pharmaceutical packaging & GDP', href: '/blog/pharmaceutical-pallet-packaging-gdp' },
      { label: 'Frozen & cold-chain food packaging', href: '/blog/frozen-cold-chain-food-packaging' },
      { label: 'Seafood & marine export packaging', href: '/blog/seafood-marine-export-packaging' },
    ],
  },
  {
    title: 'Ceramics, Stone & Glass',
    blurb:
      'Heavy, brittle, surface-critical loads shipped on edge and banded at high, consistent tension.',
    guides: [
      { label: 'Ceramic tile export packaging', href: '/blog/ceramic-tiles-export-packaging' },
      { label: 'Marble & granite slab export', href: '/blog/marble-granite-slab-export-packaging' },
      { label: 'Glass & mirror export packaging', href: '/blog/glass-mirror-export-packaging' },
    ],
  },
  {
    title: 'Corrugated, Paper & FMCG',
    blurb:
      'Bulky, compressible, high-volume loads that need exact low tension and a dock that keeps pace.',
    guides: [
      { label: 'Corrugated box plant dispatch', href: '/blog/corrugated-box-plant-bundling-dispatch' },
      { label: 'Paper reel & roll securing', href: '/blog/paper-reel-roll-securing' },
      { label: 'FMCG & beverage palletising', href: '/blog/fmcg-beverage-palletising-guide' },
    ],
  },
  {
    title: 'Agriculture, Food & Textiles',
    blurb:
      'Bagged and baled loads that settle in transit — PET strap that recovers tension keeps them tight.',
    guides: [
      { label: 'Rice & agricultural export packaging', href: '/blog/rice-agricultural-export-packaging' },
      { label: 'Cotton & textile bale packaging', href: '/blog/cotton-textile-bale-packaging' },
      { label: 'Tea & spices export packaging', href: '/blog/tea-spices-export-packaging' },
      { label: 'FIBC & jumbo bag handling', href: '/blog/fibc-jumbo-bag-securing' },
    ],
  },
  {
    title: 'Construction & Building Materials',
    blurb:
      'Heavy, rigid, abrasive bundles needing maximum tension and edge protection.',
    guides: [
      { label: 'Bricks, blocks & AAC strapping', href: '/blog/bricks-blocks-aac-strapping' },
      { label: 'Timber & lumber export', href: '/blog/timber-lumber-export-packaging-strapping' },
      { label: 'Pipes, profiles & long products', href: '/blog/pipes-profiles-long-products-bundling' },
    ],
  },
  {
    title: 'Electronics, Appliances & Chemicals',
    blurb:
      'Sensitive, high-value and hazardous loads — gentle, controlled, contamination-free securing.',
    guides: [
      { label: 'Electronics ESD export packaging', href: '/blog/electronics-esd-export-packaging' },
      { label: 'White goods & appliance packaging', href: '/blog/white-goods-appliance-packaging' },
      { label: 'Drums & IBC chemical securing', href: '/blog/drum-ibc-chemical-securing' },
    ],
  },
  {
    title: 'Logistics, 3PL & General',
    blurb:
      'Mixed-load, high-throughput dispatch where mobile securing keeps the dock turning.',
    guides: [
      { label: '3PL & cross-docking dispatch', href: '/blog/3pl-cross-docking-dispatch' },
      { label: 'E-commerce order fulfilment', href: '/blog/ecommerce-order-fulfilment-dispatch' },
      { label: 'Tyre packaging & bundling', href: '/blog/tyre-packaging-bundling-securing' },
      { label: 'Furniture export packaging', href: '/blog/furniture-export-packaging' },
      { label: 'Returnable & reusable packaging', href: '/blog/returnable-reusable-packaging-guide' },
    ],
  },
];

export default function IndustriesServedPage() {
  return (
    <MainLayout>
      <div className="min-h-screen bg-white text-neutral-900">
        {/* Header */}
        <header className="border-b border-neutral-200 bg-gradient-to-b from-[#faf7f2] to-white">
          <div className="mx-auto max-w-6xl px-5 pb-12 pt-28 sm:px-8 sm:pt-32">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
              Industries We Serve
            </p>
            <h1 className="max-w-4xl font-serif text-3xl font-bold leading-[1.1] text-neutral-950 sm:text-4xl md:text-5xl">
              Pallet Strapping & Export Packaging — By Industry
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600">
              Every load is different — a stone slab, a corrugated bundle, a frozen pallet and an
              engine block each need their own method. Below are practical, researched guides for
              securing and packaging loads in every major Indian industry, each pointing to the
              right material, tension and ErgoPack machine. Engineered in Germany, supported across
              India by Benz Packaging.
            </p>
          </div>
        </header>

        {/* Sector grid */}
        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            {SECTORS.map((sector) => (
              <section
                key={sector.title}
                className="rounded-2xl border border-neutral-200 p-6 transition hover:border-neutral-300 hover:shadow-sm sm:p-8"
              >
                <h2 className="font-serif text-xl font-bold text-neutral-950 sm:text-2xl">
                  {sector.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">{sector.blurb}</p>
                <ul className="mt-5 space-y-2.5">
                  {sector.guides.map((g) => (
                    <li key={g.href}>
                      <Link
                        href={g.href}
                        className="group flex items-center gap-2 text-[15px] font-medium text-neutral-800 transition hover:text-[#C8102E]"
                      >
                        <span className="text-[#C8102E]">→</span>
                        <span className="group-hover:underline">{g.label}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          {/* Machines + resources cross-link */}
          <div className="mt-12 rounded-2xl bg-neutral-950 p-8 text-white sm:p-10">
            <h2 className="font-serif text-2xl font-bold sm:text-3xl">
              One machine range. Every industry.
            </h2>
            <p className="mt-3 max-w-2xl text-white/65">
              Whatever your sector, the same three mobile ErgoPack machines cover it — the 726X for
              fully digital high-tension automation, the GO for electric routing, and the 700 for
              off-grid manual operation. They handle pallet widths from 40 to 270 cm, so mixed loads
              run on one machine.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="rounded-full bg-[#C8102E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                See the machines
              </Link>
              <Link
                href="/resources"
                className="rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Resources & buying guides
              </Link>
            </div>
          </div>

          {/* Lead form */}
          <div className="mt-12">
            <LeadForm
              sourceLabel="Industries hub"
              heading="Not sure which method fits your load?"
              subheading="Tell us your industry, load and pallet setup. BENZ Packaging and ErgoPack India engineers will recommend the right machine, strap and tension — and send pricing. Service anywhere in India."
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
