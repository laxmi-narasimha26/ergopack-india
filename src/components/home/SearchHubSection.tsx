import Link from 'next/link';

const priorityLinks = [
  {
    title: 'Automated Pallet Strapping Machine (726X)',
    href: '/products/726x',
    description:
      'The ErgoPack 726X straps in under 40 seconds with up to 2500N tension and sealless friction-weld sealing for heavy and export loads.',
  },
  {
    title: 'Mobile Pallet Strapping Machine (GO)',
    href: '/products/go',
    description:
      'The ErgoPack GO routes the strap electronically so one operator does the work of three — keep your existing sealing tools.',
  },
  {
    title: 'Manual-Crank Pallet Strapping Machine (700)',
    href: '/products/700',
    description:
      'The ErgoPack 700 delivers ChainLance speed with no battery or electricity — built for off-grid, 24/7 dispatch floors.',
  },
  {
    title: 'ROI & Cost Comparison',
    href: '/resources/pallet-strapping-roi-cost-comparison',
    description:
      'See the manual-vs-automatic math: labor, consumables and damage savings that reach ROI in 6–18 months.',
  },
  {
    title: 'Reduce Transit Damage',
    href: '/resources/reduce-pallet-transit-damage',
    description:
      'How machine-calibrated tension up to 2500N stops load shifting and cuts shipment rejections.',
  },
  {
    title: 'PET vs Steel Strapping',
    href: '/resources/pet-vs-steel-strapping',
    description:
      'Why PET with friction-weld sealing replaces rust-prone steel for heavy Indian export freight.',
  },
  {
    title: 'Strapping vs Stretch Wrapping',
    href: '/resources/pallet-strapping-vs-stretch-wrapping',
    description:
      'A cost and time study: strapping in under 40 seconds versus 5–10 minutes of manual wrapping.',
  },
  {
    title: 'Strap Pallets Without Bending Down',
    href: '/ergonomics',
    description:
      'One standing position, no walking — faster cycles that keep all-shift throughput constant.',
  },
  {
    title: 'HSN Code & GST for Strapping Machines',
    href: '/resources/pallet-strapping-machine-hsn-code-gst',
    description:
      'HSN 84224000 at 18% GST, plus the technical specs procurement teams verify before approval.',
  },
  {
    title: 'Pallet Strapping by Manufacturing Hub',
    href: '/locations',
    description: 'Location pages for Pune, Chennai, Ahmedabad and Manesar manufacturing clusters.',
  },
];

export default function SearchHubSection() {
  return (
    <section className="bg-[#f7f4ee] py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#C8102E]">
            Explore ErgoPack
          </p>
          <h2 className="text-3xl font-semibold tracking-tight text-stone-950 md:text-5xl">
            Find the right pallet strapping page fast
          </h2>
          <p className="mt-4 text-base leading-8 text-stone-600 md:text-lg">
            Jump to the pages buyers ask for most — machine specs, ROI and cost comparisons,
            transit-damage reduction, material guides, and the numbers behind faster dispatch.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {priorityLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-[28px] border border-stone-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_24px_50px_-36px_rgba(15,23,42,0.35)]"
            >
              <h3 className="text-lg font-semibold leading-tight text-stone-950 transition-colors group-hover:text-[#C8102E]">
                {link.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-stone-600">{link.description}</p>
              <span className="mt-5 inline-flex text-sm font-medium text-stone-700 group-hover:text-stone-950">
                Open page
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
