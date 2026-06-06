'use client';

import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import type { ResourceArticle } from '@/data/resource-articles';

export default function ResourceArticleBody({ article }: { article: ResourceArticle }) {
  return (
    <MainLayout>
      {/* Force a clean light surface regardless of site theme */}
      <div className="min-h-screen bg-white text-neutral-900">
        {/* ---------- Header band ---------- */}
        <header className="border-b border-neutral-200 bg-gradient-to-b from-[#faf7f2] to-white">
          <div className="mx-auto max-w-3xl px-5 pb-12 pt-28 sm:pt-32">
            <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-500">
              <Link href="/" className="transition-colors hover:text-[#C8102E]">
                Home
              </Link>
              <span className="mx-2 text-neutral-300">/</span>
              <Link href="/resources" className="transition-colors hover:text-[#C8102E]">
                Resources
              </Link>
              <span className="mx-2 text-neutral-300">/</span>
              <span className="text-neutral-700">{article.breadcrumb}</span>
            </nav>

            {article.eyebrow && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#C8102E]">
                {article.eyebrow}
              </p>
            )}

            <h1 className="font-serif text-3xl font-bold leading-[1.1] text-neutral-950 sm:text-4xl md:text-5xl">
              {article.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-600">
              {article.lede}
            </p>
          </div>
        </header>

        {/* ---------- Body ---------- */}
        <article className="mx-auto max-w-3xl px-5 py-14">
          {/* Key takeaways (AEO-friendly summary) */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <aside className="mb-12 rounded-2xl border border-neutral-200 bg-neutral-50 p-6 sm:p-8">
              <h2 className="mb-4 text-sm font-bold uppercase tracking-wider text-neutral-500">
                Key takeaways
              </h2>
              <ul className="space-y-3">
                {article.keyTakeaways.map((item, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-neutral-800">
                    <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C8102E]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <div className="space-y-7">
            {article.blocks.map((block, i) => {
              switch (block.type) {
                case 'heading':
                  return (
                    <h2
                      key={i}
                      className="!mt-12 scroll-mt-24 font-serif text-2xl font-bold text-neutral-950 sm:text-3xl"
                    >
                      {block.text}
                    </h2>
                  );
                case 'subheading':
                  return (
                    <h3
                      key={i}
                      className="!mt-8 font-serif text-xl font-semibold text-neutral-900"
                    >
                      {block.text}
                    </h3>
                  );
                case 'paragraph':
                  return (
                    <p key={i} className="text-[17px] leading-[1.8] text-neutral-700">
                      {block.text}
                    </p>
                  );
                case 'list':
                  return (
                    <ul key={i} className="space-y-3 pl-1">
                      {block.items.map((item, j) => (
                        <li
                          key={j}
                          className="flex gap-3 text-[17px] leading-[1.7] text-neutral-700"
                        >
                          <span className="mt-2.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C8102E]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                case 'stat':
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border border-neutral-200 bg-neutral-50 p-7 text-center"
                    >
                      <div className="font-serif text-4xl font-bold text-[#C8102E] sm:text-5xl">
                        {block.value}
                      </div>
                      <div className="mt-2 text-sm leading-relaxed text-neutral-600">
                        {block.label}
                      </div>
                    </div>
                  );
                case 'statgrid':
                  return (
                    <div key={i} className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                      {block.stats.map((s, j) => (
                        <div
                          key={j}
                          className="rounded-xl border border-neutral-200 bg-neutral-50 p-5 text-center"
                        >
                          <div className="font-serif text-2xl font-bold text-[#C8102E] sm:text-3xl">
                            {s.value}
                          </div>
                          <div className="mt-1 text-xs leading-snug text-neutral-600">
                            {s.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                case 'callout':
                  return (
                    <div
                      key={i}
                      className="rounded-2xl border-l-4 border-[#C8102E] bg-[#fdf2f3] p-6"
                    >
                      <p className="mb-1 font-semibold text-neutral-900">{block.title}</p>
                      <p className="text-[15px] leading-relaxed text-neutral-700">{block.text}</p>
                    </div>
                  );
                case 'table':
                  return (
                    <figure key={i} className="!mt-8 overflow-x-auto">
                      {block.table.caption && (
                        <figcaption className="mb-3 text-sm font-medium text-neutral-500">
                          {block.table.caption}
                        </figcaption>
                      )}
                      <table className="w-full border-collapse overflow-hidden rounded-xl border border-neutral-200 text-left text-[15px]">
                        <thead>
                          <tr className="bg-neutral-900 text-white">
                            {block.table.headers.map((h, j) => (
                              <th key={j} className="px-4 py-3 font-semibold">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.table.rows.map((row, j) => (
                            <tr
                              key={j}
                              className={j % 2 === 0 ? 'bg-white' : 'bg-neutral-50'}
                            >
                              {row.map((cell, k) => (
                                <td
                                  key={k}
                                  className={`border-t border-neutral-200 px-4 py-3 align-top ${
                                    k === 0 ? 'font-medium text-neutral-900' : 'text-neutral-700'
                                  }`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </figure>
                  );
                case 'cta':
                  return (
                    <div
                      key={i}
                      className="!mt-10 rounded-2xl bg-neutral-950 p-7 text-center sm:p-9"
                    >
                      <p className="text-lg text-white">{block.text}</p>
                      <Link
                        href={block.href}
                        className="mt-5 inline-block rounded-full bg-[#C8102E] px-7 py-3 font-semibold text-white transition hover:bg-red-700"
                      >
                        {block.label}
                      </Link>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>

          {/* ---------- FAQ ---------- */}
          {article.faqs.length > 0 && (
            <section className="mt-16 border-t border-neutral-200 pt-12">
              <h2 className="font-serif text-2xl font-bold text-neutral-950 sm:text-3xl">
                Frequently Asked Questions
              </h2>
              <dl className="mt-8 space-y-7">
                {article.faqs.map((faq, i) => (
                  <div key={i} className="border-b border-neutral-200 pb-7">
                    <dt className="text-lg font-semibold text-neutral-950">{faq.question}</dt>
                    <dd className="mt-2.5 text-[16px] leading-[1.7] text-neutral-700">
                      {faq.answer}
                    </dd>
                  </div>
                ))}
              </dl>
            </section>
          )}

          {/* ---------- Related ---------- */}
          {article.related && article.related.length > 0 && (
            <section className="mt-14">
              <h2 className="mb-5 text-sm font-bold uppercase tracking-wider text-neutral-500">
                Related guides
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {article.related.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="group flex items-center justify-between rounded-xl border border-neutral-200 px-5 py-4 transition hover:border-[#C8102E] hover:bg-neutral-50"
                  >
                    <span className="text-[15px] font-medium text-neutral-800 group-hover:text-[#C8102E]">
                      {link.label}
                    </span>
                    <span className="text-[#C8102E]">→</span>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ---------- Closing CTA ---------- */}
          <div className="mt-16 rounded-2xl border border-neutral-200 bg-gradient-to-b from-neutral-50 to-white p-8 text-center">
            <p className="font-serif text-xl font-semibold text-neutral-950">
              See the numbers on your own floor
            </p>
            <p className="mx-auto mt-2 max-w-md text-neutral-600">
              Book a free on-site capacity audit — we bring an ErgoPack 726X, GO or 700 to your
              pallets and measure the time and labor you'd save.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/contact"
                className="inline-block rounded-full bg-[#C8102E] px-7 py-3 font-semibold text-white transition hover:bg-red-700"
              >
                Request a demo
              </Link>
              <Link
                href="/roi-calculator"
                className="inline-block rounded-full border border-neutral-300 px-7 py-3 font-semibold text-neutral-800 transition hover:border-neutral-900"
              >
                Open the ROI calculator
              </Link>
            </div>
          </div>
        </article>
      </div>
    </MainLayout>
  );
}
