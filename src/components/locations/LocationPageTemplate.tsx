import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import {
  getLocationPageBySlug,
  type LocationPageData,
  type LocationProductSlug,
} from '@/data/location-pages';

const productMeta: Record<
  LocationProductSlug,
  {
    name: string;
    href: string;
    image: string;
    tagline: string;
    facts: string[];
  }
> = {
  '726x': {
    name: 'ErgoPack 726X Li',
    href: '/products/726x',
    image: '/images/products/726x.png',
    tagline: 'Automatic pallet strapping for higher-utilization dispatch',
    facts: ['66 m/min chain speed', 'Up to 1200 cycles per charge', '13-16 mm PP or PET'],
  },
  go: {
    name: 'ErgoPack GO',
    href: '/products/go',
    image: '/images/products/GO.png',
    tagline: 'Portable pallet strapping for flexible warehouse layouts',
    facts: ['40 m/min chain speed', '350 cycles per charge', 'Mobile multi-bay coverage'],
  },
  '700': {
    name: 'ErgoPack 700',
    href: '/products/700',
    image: '/images/products/700.png',
    tagline: 'Manual ergonomic pallet strapping with zero charging dependence',
    facts: ['Hand-crank operation', 'No charging downtime', 'PP, PET, paper, cord, composite'],
  },
};

const quickLinks = [
  { href: '#overview', label: 'Overview' },
  { href: '#zones', label: 'Industrial zones' },
  { href: '#workflow', label: 'Workflow fit' },
  { href: '#machines', label: 'Machine fit' },
  { href: '#faqs', label: 'FAQs' },
];

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C8102E]">{eyebrow}</p>
      <h2 className="mt-3 text-balance text-3xl font-semibold tracking-tight text-stone-950 md:text-[2.15rem]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-stone-600">{description}</p>
      ) : null}
    </div>
  );
}

export default function LocationPageTemplate({ page }: { page: LocationPageData }) {
  const featuredProduct = productMeta[page.hero.featuredProduct];
  const relatedLocations = page.relatedLocationSlugs
    .map((slug) => getLocationPageBySlug(slug))
    .filter((location): location is LocationPageData => Boolean(location));

  return (
    <MainLayout>
      <div className="bg-white text-stone-950">
        <section className="border-b border-stone-200 bg-[radial-gradient(circle_at_top_left,_rgba(200,16,46,0.06),_transparent_30%),linear-gradient(180deg,#ffffff_0%,#fbf8f3_100%)]">
          <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 lg:px-8">
            <nav className="text-sm text-stone-500">
              <div className="flex flex-wrap items-center gap-2">
                <Link href="/" className="transition-colors hover:text-stone-900">
                  Home
                </Link>
                <span aria-hidden="true">/</span>
                <Link href="/locations" className="transition-colors hover:text-stone-900">
                  Manufacturing Hubs
                </Link>
                <span aria-hidden="true">/</span>
                <span className="text-stone-900">{page.city}</span>
              </div>
            </nav>

            <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C8102E]">
                  {page.hero.eyebrow}
                </p>
                <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-stone-950 md:text-5xl lg:text-[3.45rem]">
                  {page.hero.title}
                </h1>
                <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">
                  {page.hero.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {page.hero.tags.map((tag) => (
                    <span key={tag} className="text-sm font-medium text-stone-600">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href={`/contact?city=${encodeURIComponent(page.city)}&page=${page.slug}`}
                    className="inline-flex items-center justify-center rounded-full bg-[#C8102E] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a90e26]"
                  >
                    Contact ErgoPack India
                  </Link>
                  <Link
                    href="/products/compare-machines"
                    className="inline-flex items-center justify-center rounded-full border border-stone-300 px-6 py-3 text-sm font-semibold text-stone-900 transition-colors hover:border-stone-900"
                  >
                    Compare 726X Li, GO & 700
                  </Link>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 border-t border-stone-200 pt-5">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="text-sm font-semibold text-stone-600 transition-colors hover:text-[#C8102E]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <aside className="lg:border-l lg:border-stone-200 lg:pl-8">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                  Recommended starting point
                </p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">
                  {featuredProduct.name}
                </h2>
                <p className="mt-3 text-sm leading-7 text-stone-600">{featuredProduct.tagline}</p>
                <div className="mt-5 overflow-hidden rounded-[24px] border border-stone-200 bg-[#faf7f1] p-4">
                  <Image
                    src={featuredProduct.image}
                    alt={`${featuredProduct.name} for ${page.city} pallet strapping workflows`}
                    width={360}
                    height={360}
                    className="mx-auto h-auto w-full max-w-[250px] object-contain"
                    priority
                  />
                </div>
                <div className="mt-5 space-y-3 border-t border-stone-200 pt-5">
                  {page.hero.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="flex items-start justify-between gap-4 text-sm"
                    >
                      <span className="font-medium text-stone-500">{stat.label}</span>
                      <span className="max-w-[180px] text-right font-semibold text-stone-900">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,820px)_280px] lg:justify-between lg:px-8">
          <div className="min-w-0">
            <section id="overview" className="scroll-mt-32 border-b border-stone-200 pb-10">
              <SectionHeader eyebrow="Why This Hub Matters" title={page.summary.title} />
              <div className="mt-6 space-y-4 text-base leading-8 text-stone-600">
                {page.summary.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ul className="mt-8 space-y-4 border-l border-stone-200 pl-6">
                {page.summary.bullets.map((bullet) => (
                  <li key={bullet} className="text-[1.02rem] leading-8 text-stone-700">
                    {bullet}
                  </li>
                ))}
              </ul>
            </section>

            <section id="zones" className="scroll-mt-32 border-b border-stone-200 py-10">
              <SectionHeader
                eyebrow="Industrial Zones"
                title="Where location-specific search intent is strongest"
                description={page.zonesIntro}
              />
              <div className="mt-8 divide-y divide-stone-200">
                {page.zones.map((zone, index) => (
                  <article
                    key={zone.name}
                    className="grid gap-4 py-6 md:grid-cols-[72px_minmax(0,1fr)]"
                  >
                    <div>
                      <span className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-400">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C8102E]">
                        {zone.focus}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold tracking-tight text-stone-950">
                        {zone.name}
                      </h3>
                      <p className="mt-3 text-base leading-8 text-stone-600">{zone.detail}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="workflow" className="scroll-mt-32 border-b border-stone-200 py-10">
              <SectionHeader eyebrow="Workflow Fit" title={page.workflowTitle} />
              <div className="mt-6 space-y-4 text-base leading-8 text-stone-600">
                {page.workflowBody.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </section>

            <section id="industries" className="scroll-mt-32 border-b border-stone-200 py-10">
              <SectionHeader eyebrow="Industries Served" title={page.industryTitle} />
              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {page.industries.map((industry) => (
                  <article key={industry.title} className="border-t border-stone-200 pt-5">
                    <h3 className="text-xl font-semibold tracking-tight text-stone-950">
                      {industry.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-stone-600">{industry.copy}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="machines" className="scroll-mt-32 border-b border-stone-200 py-10">
              <SectionHeader
                eyebrow="Recommended Machines"
                title={page.recommendationsTitle}
                description={page.recommendationsIntro}
              />
              <div className="mt-8 grid gap-8 lg:grid-cols-3">
                {page.recommendations.map((recommendation) => {
                  const product = productMeta[recommendation.productSlug];

                  return (
                    <article
                      key={recommendation.productSlug}
                      className="border-t border-stone-200 pt-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-semibold tracking-tight text-stone-950">
                            {product.name}
                          </h3>
                          <p className="mt-2 text-sm leading-7 text-stone-600">{product.tagline}</p>
                        </div>
                      </div>

                      <div className="mt-5 overflow-hidden rounded-[22px] border border-stone-200 bg-[#faf7f1] p-4">
                        <Image
                          src={product.image}
                          alt={`${product.name} machine image for ${page.city}`}
                          width={260}
                          height={260}
                          className="mx-auto h-auto w-full max-w-[190px] object-contain"
                        />
                      </div>

                      <p className="mt-5 text-sm leading-7 text-stone-600">
                        {recommendation.summary}
                      </p>

                      <ul className="mt-5 space-y-3 border-l border-stone-200 pl-5">
                        {recommendation.bestFor.map((item) => (
                          <li key={item} className="text-sm leading-7 text-stone-700">
                            {item}
                          </li>
                        ))}
                      </ul>

                      <div className="mt-5 flex flex-wrap gap-2">
                        {product.facts.map((fact) => (
                          <span
                            key={fact}
                            className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500"
                          >
                            {fact}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={product.href}
                        className="mt-5 inline-flex items-center text-sm font-semibold text-stone-800 transition-colors hover:text-[#C8102E]"
                      >
                        View {product.name}
                      </Link>
                    </article>
                  );
                })}
              </div>
            </section>

            <section id="faqs" className="scroll-mt-32 border-b border-stone-200 py-10">
              <SectionHeader eyebrow="FAQs" title={page.faqTitle} />
              <div className="mt-8 divide-y divide-stone-200">
                {page.faqs.map((faq, index) => (
                  <details key={faq.question} className="group py-5" open={index === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left">
                      <span className="text-lg font-semibold leading-8 text-stone-950">
                        {faq.question}
                      </span>
                      <span className="mt-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-400">
                        Open
                      </span>
                    </summary>
                    <p className="mt-4 max-w-4xl text-base leading-8 text-stone-600">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
            </section>

          </div>

          <aside className="self-start lg:sticky lg:top-28">
            <div className="space-y-8 border-t border-stone-200 pt-6 lg:border-t-0 lg:pt-0">
              <section>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                  On this page
                </p>
                <nav className="mt-4 space-y-3">
                  {quickLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="block text-sm font-semibold text-stone-700 transition-colors hover:text-[#C8102E]"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </section>

              <section className="border-t border-stone-200 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                  Need help choosing?
                </p>
                <p className="mt-3 text-sm leading-7 text-stone-600">
                  Share the pallet size range, strap material, daily output, and dispatch layout. We
                  will help match 726X Li, GO, or 700 to the workflow.
                </p>
                <div className="mt-4 flex flex-col gap-3">
                  <Link
                    href={`/contact?city=${encodeURIComponent(page.city)}&interest=assessment`}
                    className="inline-flex items-center justify-center rounded-full bg-[#C8102E] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#a90e26]"
                  >
                    Request an assessment
                  </Link>
                  <Link
                    href="/solutions"
                    className="inline-flex items-center justify-center rounded-full border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900 transition-colors hover:border-stone-900"
                  >
                    Review solutions
                  </Link>
                </div>
              </section>

              <section className="border-t border-stone-200 pt-6">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                  Related hubs
                </p>
                <div className="mt-4 space-y-4">
                  {relatedLocations.map((location) => (
                    <Link
                      key={location.slug}
                      href={`/locations/${location.slug}`}
                      className="block border-b border-stone-200 pb-4 transition-colors hover:text-[#C8102E]"
                    >
                      <span className="block text-lg font-semibold text-stone-950">
                        {location.city}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-stone-600">
                        {location.region}
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </MainLayout>
  );
}
