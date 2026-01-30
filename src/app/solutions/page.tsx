import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import ComparisonInfographic from '@/components/home/ComparisonInfographic';

export const metadata: Metadata = {
  title: 'Solutions | Real-World Pallet Strapping Scenarios | ErgoPack India',
  description:
    'Explore dispatch, safety, and load-integrity scenarios where ErgoPack delivers faster, safer pallet strapping across industrial environments.',
  keywords: [
    'pallet strapping solutions',
    'industrial strapping scenarios',
    'dispatch bottleneck',
    'load security',
    'ergonomic strapping',
    'harsh environment strapping',
    'logistics efficiency',
    'warehouse safety',
    'strapping consistency',
    'ErgoPack India solutions',
  ],
  openGraph: {
    title: 'Solutions | ErgoPack India',
    description:
      'Real-world scenarios that show where ErgoPack saves time, protects teams, and secures loads.',
    type: 'website',
    locale: 'en_IN',
    images: ['/solutions/automation-last-mile.png'],
  },
  alternates: {
    canonical: '/solutions',
  },
};

const scenarios = [
  {
    title: "Automation's Last Mile",
    copy: 'Robotic lines and automated paint shops move fast, but manual strapping at dispatch can throttle throughput. ErgoPack keeps the final step as automated and reliable as the rest of the factory.',
    image: '/solutions/automation-last-mile.png',
  },
  {
    title: 'Ergonomic Safety by Design',
    copy: 'Traditional strapping forces bending, climbing, and walking into forklift lanes. ErgoPack keeps operators upright and stationary while the strap moves under the pallet for them.',
    image: '/solutions/ergonomics-before-after.png',
  },
  {
    title: 'Load Security Under Transit Stress',
    copy: 'Rail vibration, shunting impacts, and sea sway can loosen inconsistent manual tension. Ergopack maintains repeatable tension so loads stay tight from origin to destination.',
    image: '/solutions/load-security-physics.png',
  },
  {
    title: 'Moisture and Contamination Defense',
    copy: 'Loose straps allow micro-gaps that invite humid air and dust. Consistent tension helps protect sensitive, high-value parts from corrosion and quality incidents.',
    image: '/solutions/moisture-ingress.png',
  },
  {
    title: 'Harsh Environments and Downtime Control',
    copy: 'Dusty foundries and hot plants punish electronics. The mechanical 700 series keeps dispatch moving even where complex tools fail.',
    image: '/solutions/automation-warehouse.png',
  },
];

const customization = [
  {
    title: 'Triplex Tool-Lift',
    detail: 'Strap pallets as low as 10 cm from the floor.',
  },
  {
    title: 'Mobile Overheight Module',
    detail: 'Extend strapping height up to 3.05 m for tall loads.',
  },
  {
    title: 'Easy Move Assistant',
    detail: 'Improves handling and ergonomics for longer distances.',
  },
  {
    title: 'Sledge Tunnels',
    detail: 'Strap goods resting on scantlings or runners.',
  },
  {
    title: 'Screen Protector',
    detail: 'Protects the Siemens display in harsh environments.',
  },
  {
    title: 'Spare Battery',
    detail: 'Ensures continuous operation across multiple shifts.',
  },
];

export default function SolutionsPage() {
  return (
    <div className="bg-white">
      <section className="bg-[#0B0F14] text-white">
        <div className="max-w-6xl mx-auto px-6 py-24">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.35em] text-white/60">
              Solutions
            </span>
            <h1 className="text-4xl md:text-6xl font-semibold mt-4">
              Proven workflows for faster, safer dispatch
            </h1>
            <p className="text-white/70 mt-5 text-lg">
              Explore the operational moments where ErgoPack makes the biggest difference, from
              automated plants to harsh environments and long-distance transport.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-[#C8102E] px-6 py-3 text-sm font-semibold text-white"
              >
                Request a demo
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white"
              >
                View products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ComparisonInfographic />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <p className="text-sm text-gray-500">
          Illustrative scenario visuals shown for explanation only; not customer endorsements.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-6 pb-16 space-y-12">
        {scenarios.map((item, index) => (
          <div
            key={item.title}
            className={`grid gap-8 items-center ${index % 2 === 0 ? 'md:grid-cols-[1.1fr_0.9fr]' : 'md:grid-cols-[0.9fr_1.1fr]'}`}
          >
            <div className={index % 2 === 0 ? '' : 'md:order-2'}>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">{item.title}</h2>
              <p className="text-gray-600 mt-4 text-base leading-relaxed">{item.copy}</p>
            </div>
            <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border border-gray-200">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        ))}
      </section>

      <section className="bg-gray-50">
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="grid lg:grid-cols-[1fr_1.1fr] gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
                Configure the perfect fit
              </h2>
              <p className="text-gray-600 mt-4">
                Pair the base machine with modular accessories to match pallet height, floor
                conditions, and operator movement requirements.
              </p>
              <div className="grid sm:grid-cols-2 gap-4 mt-8">
                {customization.map((item) => (
                  <div key={item.title} className="rounded-xl border border-gray-200 bg-white p-4">
                    <h3 className="text-sm font-semibold text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">{item.detail}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-80 rounded-2xl overflow-hidden border border-gray-200">
              <Image
                src="/solutions/customization-modules.png"
                alt="ErgoPack customization modules"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-center">
          <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden border border-gray-200">
            <Image
              src="/solutions/model-fit-table.png"
              alt="ErgoPack model comparison"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 60vw"
            />
          </div>
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900">
              Find the right model fast
            </h2>
            <p className="text-gray-600 mt-4">
              Compare control systems, power source, and throughput to match your line speed,
              operator preference, and shift schedule.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-full border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-900 mt-6"
            >
              Compare product lines
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#0B0F14]">
        <div className="max-w-6xl mx-auto px-6 py-16 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-semibold">Ready to remove the last bottleneck?</h2>
              <p className="text-white/70 mt-3">
                Share your dispatch flow and we will recommend the fastest, safest setup for your
                facility.
              </p>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-gray-900"
            >
              Book an assessment
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
