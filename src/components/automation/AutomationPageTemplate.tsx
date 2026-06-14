import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import LeadForm from '@/components/forms/LeadForm';
import { FAQSchema, BreadcrumbSchema, ServiceSchema } from '@/components/JsonLd';
import type { AutomationPage } from '@/data/automation-pages';
import { automationHub, automationSpokes } from '@/data/automation-pages';

export default function AutomationPageTemplate({ page }: { page: AutomationPage }) {
  const isHub = page.kind === 'hub';

  const breadcrumb = isHub
    ? [
        { name: 'Home', item: '/' },
        { name: 'Factory-Floor Automation', item: '/factory-floor-automation' },
      ]
    : [
        { name: 'Home', item: '/' },
        { name: 'Factory-Floor Automation', item: '/factory-floor-automation' },
        { name: page.navLabel, item: `/factory-floor-automation/${page.slug}` },
      ];

  return (
    <MainLayout>
      <FAQSchema items={page.faqs} />
      <BreadcrumbSchema items={breadcrumb} />
      <ServiceSchema
        name={page.title}
        description={page.heroAnswer}
        serviceType={page.serviceType}
        areaServed={['India']}
      />

      <div className="min-h-screen bg-white text-neutral-900">
        {/* Hero */}
        <header className="border-b border-neutral-200 bg-gradient-to-b from-[#faf7f2] to-white">
          <div className="mx-auto max-w-6xl px-5 pb-12 pt-28 sm:px-8 sm:pt-32">
            {/* Breadcrumb */}
            <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-neutral-500">
              <Link href="/" className="hover:text-neutral-900">
                Home
              </Link>
              <span aria-hidden>/</span>
              {isHub ? (
                <span className="text-neutral-900">Factory-Floor Automation</span>
              ) : (
                <>
                  <Link href="/factory-floor-automation" className="hover:text-neutral-900">
                    Factory-Floor Automation
                  </Link>
                  <span aria-hidden>/</span>
                  <span className="text-neutral-900">{page.navLabel}</span>
                </>
              )}
            </nav>

            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
              {page.eyebrow}
            </p>

            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,460px)]">
              <div className="min-w-0">
                <h1 className="max-w-3xl font-serif text-3xl font-bold leading-[1.1] text-neutral-950 sm:text-4xl md:text-[2.9rem]">
                  {page.title}
                </h1>
                {/* Answer-first summary — the quotable answer for AI engines */}
                <p className="mt-6 max-w-2xl border-l-2 border-[#C8102E] pl-4 text-lg leading-relaxed text-neutral-700">
                  {page.heroAnswer}
                </p>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
                <Image
                  src={page.heroImage}
                  alt={page.heroImageAlt}
                  fill
                  priority
                  quality={90}
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 460px"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {page.stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-neutral-200 bg-white px-4 py-4 text-center"
                >
                  <div className="font-serif text-xl font-bold text-[#C8102E] sm:text-2xl">
                    {s.value}
                  </div>
                  <div className="mt-1 text-[11px] uppercase tracking-wide text-neutral-500">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 lg:grid lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-12">
          {/* Main content */}
          <div className="min-w-0">
            {page.intro.map((para, i) => (
              <p key={i} className="mb-5 text-[17px] leading-[1.8] text-neutral-700">
                {para}
              </p>
            ))}

            {page.sections.map((section) => (
              <section key={section.heading} className="mt-10">
                <h2 className="font-serif text-2xl font-bold text-neutral-950 sm:text-3xl">
                  {section.heading}
                </h2>
                {section.paragraphs.map((para, i) => (
                  <p key={i} className="mt-4 text-[17px] leading-[1.8] text-neutral-700">
                    {para}
                  </p>
                ))}
                {section.bullets && (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((b) => (
                      <li key={b} className="flex gap-3 text-[16px] leading-[1.7] text-neutral-700">
                        <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C8102E]" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}

            {/* Body image */}
            {page.bodyImage && (
              <figure className="mt-12">
                <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-50">
                  <Image
                    src={page.bodyImage.src}
                    alt={page.bodyImage.alt}
                    fill
                    quality={90}
                    className="object-contain"
                    sizes="(max-width: 1024px) 100vw, 720px"
                  />
                </div>
                <figcaption className="mt-3 text-center text-sm italic text-neutral-500">
                  {page.bodyImage.caption}
                </figcaption>
              </figure>
            )}

            {/* Comparison table */}
            {page.comparison && (
              <section className="mt-12">
                <h2 className="font-serif text-2xl font-bold text-neutral-950 sm:text-3xl">
                  {page.comparison.title}
                </h2>
                <div className="mt-5 overflow-x-auto">
                  <table className="w-full border-collapse overflow-hidden rounded-xl border border-neutral-200 text-left text-[15px]">
                    <thead>
                      <tr className="bg-neutral-900 text-white">
                        {page.comparison.columns.map((c) => (
                          <th key={c} className="px-4 py-3 font-semibold">
                            {c}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {page.comparison.rows.map((row, i) => (
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
              </section>
            )}

            {/* Hub: spoke cards */}
            {isHub && (
              <section className="mt-14 border-t border-neutral-200 pt-12">
                <h2 className="font-serif text-2xl font-bold text-neutral-950 sm:text-3xl">
                  Explore each automation outcome
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {automationSpokes.map((spoke) => (
                    <Link
                      key={spoke.slug}
                      href={`/factory-floor-automation/${spoke.slug}`}
                      className="group rounded-2xl border border-neutral-200 p-5 transition hover:border-[#C8102E] hover:shadow-sm"
                    >
                      <p className="font-serif text-lg font-bold text-neutral-950 group-hover:text-[#C8102E]">
                        {spoke.navLabel}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                        {spoke.heroAnswer.split('. ')[0]}.
                      </p>
                      <span className="mt-3 inline-block text-sm font-semibold text-[#C8102E]">
                        Read the guide →
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* FAQ */}
            <section className="mt-14 border-t border-neutral-200 pt-12">
              <h2 className="font-serif text-2xl font-bold text-neutral-950 sm:text-3xl">
                Frequently asked questions
              </h2>
              <dl className="mt-8 space-y-7">
                {page.faqs.map((faq) => (
                  <div key={faq.question} className="border-b border-neutral-200 pb-7">
                    <dt className="text-lg font-semibold text-neutral-950">{faq.question}</dt>
                    <dd className="mt-2.5 text-[16px] leading-[1.7] text-neutral-700">{faq.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>

            {/* Related (interlink mesh) */}
            <section className="mt-12">
              <h2 className="font-serif text-xl font-bold text-neutral-950">Related</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {page.related.map((r) => (
                  <Link
                    key={r.href}
                    href={r.href}
                    className="rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                  >
                    {r.label}
                  </Link>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky lead form */}
          <aside className="mt-12 lg:mt-0">
            <div className="lg:sticky lg:top-28">
              <LeadForm
                sourceLabel={`Automation: ${page.navLabel}`}
                heading="Get a free dispatch audit"
                subheading="Tell us your pallet volume and biggest pain — our team brings a machine to your floor, runs a live cycle on your heaviest pallet, and sends pricing and ROI. No obligation."
              />
              {!isHub && automationHub && (
                <Link
                  href="/factory-floor-automation"
                  className="mt-4 block rounded-xl border border-neutral-200 bg-neutral-50 px-5 py-4 text-sm font-semibold text-neutral-700 transition hover:border-[#C8102E] hover:text-[#C8102E]"
                >
                  ← Back to the Factory-Floor Automation hub
                </Link>
              )}
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
