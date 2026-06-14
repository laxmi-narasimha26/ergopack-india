import type { Metadata } from 'next';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import LeadForm from '@/components/forms/LeadForm';
import { FAQSchema } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Buy a Pallet Strapping Machine in India: Price, Models & Supplier | ErgoPack',
  description:
    'Looking to buy an automatic or mobile pallet strapping machine in India? Compare the ErgoPack 726X, GO and 700, get pricing and ROI, and request a quote — German-engineered, supplied and serviced nationwide by Benz Packaging.',
  keywords: [
    'pallet strapping machine price India',
    'automatic pallet strapping machine India',
    'mobile pallet strapping machine India',
    'pallet strapping machine manufacturer India',
    'pallet strapping machine supplier',
    'buy pallet strapping machine',
    'pallet strapping machine dealer India',
    'ErgoPack India',
  ],
  alternates: { canonical: '/buy-pallet-strapping-machine-india' },
  openGraph: {
    title: 'Buy a Pallet Strapping Machine in India | ErgoPack',
    description:
      'Compare the ErgoPack 726X, GO and 700, get pricing and ROI, and request a quote — supplied and serviced across India by Benz Packaging.',
    type: 'website',
    locale: 'en_IN',
  },
};

const FAQS = [
  {
    question: 'How much does a pallet strapping machine cost in India?',
    answer:
      'Prices range from manual tools (₹25,000–₹35,000) and table-top semi-automatic machines (₹35,000–₹85,000) to mobile and inline systems (₹1,75,000 and up). Table-top machines cannot strap loaded pallets, so for pallet dispatch a mobile or inline machine is required. ErgoPack quotes against your pallet volume, load and power so the price reflects the right machine and its ROI.',
  },
  {
    question: 'Who is the manufacturer of ErgoPack machines, and who supplies them in India?',
    answer:
      'ErgoPack machines are engineered and manufactured in Germany — the inventors of the patented mobile ChainLance pallet strapping system. In India they are supplied, installed and serviced by Benz Packaging, with engineers and genuine spare parts available nationwide.',
  },
  {
    question: 'Which ErgoPack machine should I buy — 726X, GO or 700?',
    answer:
      'The 726X is the fully integrated machine with digital tension to 2500N, a touchscreen and a friction-weld head — for high-tension, heavy and export loads. The GO is the electric mobile machine for high-volume mixed dispatch. The 700 is the manual-crank machine for sites without power. Tell us your volume, loads and power and we will recommend the right one.',
  },
  {
    question: 'Do you provide service and spare parts in India?',
    answer:
      'Yes. Through Benz Packaging, ErgoPack India provides on-site installation, operator training, service and genuine spare parts across the country — so your machine stays running.',
  },
  {
    question: 'Can I get a demo or quote before buying?',
    answer:
      'Yes. We offer an on-site capacity audit: our team brings a machine to your floor and runs a live cycle on your heaviest pallet, then provides pricing and an ROI estimate. Request a quote using the form on this page.',
  },
];

export default function BuyPalletStrappingMachineIndiaPage() {
  return (
    <MainLayout>
      <FAQSchema items={FAQS} />
      <div className="min-h-screen bg-white text-neutral-900">
        {/* Header */}
        <header className="border-b border-neutral-200 bg-gradient-to-b from-[#faf7f2] to-white">
          <div className="mx-auto max-w-6xl px-5 pb-12 pt-28 sm:px-8 sm:pt-32">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
              Buy in India · Price · Quote
            </p>
            <h1 className="max-w-4xl font-serif text-3xl font-bold leading-[1.1] text-neutral-950 sm:text-4xl md:text-5xl">
              Buy an Automatic or Mobile Pallet Strapping Machine in India
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-600">
              ErgoPack is the original German-engineered mobile pallet strapping system — supplied,
              installed and serviced across India by Benz Packaging. Compare the three machines, see
              how pricing works, and request a quote or a free on-site demo below.
            </p>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          {/* Main content */}
          <div className="min-w-0">
            {/* The three machines */}
            <h2 className="font-serif text-2xl font-bold text-neutral-950 sm:text-3xl">
              The three machines — which one fits
            </h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-3">
              {[
                {
                  name: 'ErgoPack 726X',
                  tag: 'Fully integrated',
                  desc: 'Digital tension 400–2500N, touchscreen, friction-weld head. Heavy & export loads.',
                  href: '/products/726x',
                },
                {
                  name: 'ErgoPack GO',
                  tag: 'Electric mobile',
                  desc: 'Joystick electric ChainLance, multi-material. High-volume mixed dispatch.',
                  href: '/products/go',
                },
                {
                  name: 'ErgoPack 700',
                  tag: 'Manual crank',
                  desc: 'No battery, no power. Off-grid and remote sites; lowest entry cost.',
                  href: '/products/700',
                },
              ].map((m) => (
                <Link
                  key={m.name}
                  href={m.href}
                  className="group rounded-2xl border border-neutral-200 p-5 transition hover:border-[#C8102E] hover:shadow-sm"
                >
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#C8102E]">
                    {m.tag}
                  </p>
                  <p className="mt-1 font-serif text-lg font-bold text-neutral-950 group-hover:text-[#C8102E]">
                    {m.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600">{m.desc}</p>
                  <span className="mt-3 inline-block text-sm font-semibold text-[#C8102E]">
                    View specs →
                  </span>
                </Link>
              ))}
            </div>

            {/* Price tiers */}
            <h2 className="mt-12 font-serif text-2xl font-bold text-neutral-950 sm:text-3xl">
              Pallet strapping machine price in India
            </h2>
            <p className="mt-4 text-[17px] leading-[1.8] text-neutral-700">
              The Indian market spans a wide range, and the cheapest machine is rarely the lowest
              cost per pallet. Here are the tiers:
            </p>
            <div className="mt-5 overflow-x-auto">
              <table className="w-full border-collapse overflow-hidden rounded-xl border border-neutral-200 text-left text-[15px]">
                <thead>
                  <tr className="bg-neutral-900 text-white">
                    <th className="px-4 py-3 font-semibold">Type</th>
                    <th className="px-4 py-3 font-semibold">Typical price (INR)</th>
                    <th className="px-4 py-3 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Manual tools', '₹25,000 – ₹35,000', 'Fully manual, light loads'],
                    ['Semi-auto table-top', '₹35,000 – ₹85,000', 'Small cartons only — not loaded pallets'],
                    ['Mobile / standalone', '₹1,75,000 – ₹3,50,000', 'Strap loaded pallets at any dock'],
                    ['Fully automatic inline', '₹1,95,000 – ₹24,00,000', 'Conveyor-fed, fixed, high CapEx'],
                  ].map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}>
                      {row.map((cell, j) => (
                        <td
                          key={j}
                          className={`border-t border-neutral-200 px-4 py-3 align-top ${
                            j === 0 ? 'font-medium text-neutral-900' : 'text-neutral-700'
                          }`}
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">
              For the full breakdown and total-cost-of-ownership logic, see the{' '}
              <Link
                href="/resources/pallet-strapping-machine-price-india"
                className="font-semibold text-[#C8102E] hover:underline"
              >
                price &amp; buying guide
              </Link>{' '}
              and model the payback with the{' '}
              <Link
                href="/roi-calculator"
                className="font-semibold text-[#C8102E] hover:underline"
              >
                ROI calculator
              </Link>
              .
            </p>

            {/* Why ErgoPack / supplier */}
            <h2 className="mt-12 font-serif text-2xl font-bold text-neutral-950 sm:text-3xl">
              Why buy ErgoPack — and how you’re supported
            </h2>
            <ul className="mt-5 space-y-3">
              {[
                'The original patented mobile ChainLance system — engineered in Germany, 15,000+ machines across 60+ countries.',
                'Straps a pallet in under 40 seconds with one operator — a 66% cut versus manual.',
                'Calibrated tension up to 2500N and sealless friction welding eliminate transit damage.',
                'Supplied, installed, trained and serviced across India by Benz Packaging — genuine spare parts, nationwide.',
                'Free on-site capacity audit: we prove it on your heaviest pallet before you buy.',
              ].map((point) => (
                <li key={point} className="flex gap-3 text-[16px] leading-[1.7] text-neutral-700">
                  <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C8102E]" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            {/* FAQ */}
            <section className="mt-14 border-t border-neutral-200 pt-12">
              <h2 className="font-serif text-2xl font-bold text-neutral-950 sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <dl className="mt-8 space-y-7">
                {FAQS.map((faq) => (
                  <div key={faq.question} className="border-b border-neutral-200 pb-7">
                    <dt className="text-lg font-semibold text-neutral-950">{faq.question}</dt>
                    <dd className="mt-2.5 text-[16px] leading-[1.7] text-neutral-700">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          </div>

          {/* Sticky lead form */}
          <aside className="mt-12 lg:mt-0">
            <div className="lg:sticky lg:top-28">
              <LeadForm
                sourceLabel="Buy page (high intent)"
                heading="Request a price & quote"
                subheading="Tell us your pallet size, daily volume and loads. We’ll recommend the right machine — 726X, GO or 700 — and send pricing. Free on-site demo available across India."
              />
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
