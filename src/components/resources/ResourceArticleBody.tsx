'use client';

import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import type { ResourceArticle } from '@/data/resource-articles';

export default function ResourceArticleBody({ article }: { article: ResourceArticle }) {
  return (
    <MainLayout>
      <article className="mx-auto max-w-3xl px-5 py-16 sm:py-24">
        <nav aria-label="Breadcrumb" className="mb-6 text-sm text-neutral-500">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/resources" className="hover:underline">
            Resources
          </Link>
          <span className="mx-2">/</span>
          <span className="text-neutral-700">{article.breadcrumb}</span>
        </nav>

        <h1 className="font-serif text-3xl font-semibold leading-tight sm:text-4xl">
          {article.h1}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-600">{article.lede}</p>

        <div className="mt-10 space-y-8">
          {article.blocks.map((block, i) => {
            switch (block.type) {
              case 'heading':
                return (
                  <h2 key={i} className="font-serif text-2xl font-semibold">
                    {block.text}
                  </h2>
                );
              case 'paragraph':
                return (
                  <p key={i} className="text-base leading-relaxed text-neutral-700">
                    {block.text}
                  </p>
                );
              case 'list':
                return (
                  <ul key={i} className="list-disc space-y-2 pl-6 text-neutral-700">
                    {block.items.map((item, j) => (
                      <li key={j} className="leading-relaxed">
                        {item}
                      </li>
                    ))}
                  </ul>
                );
              case 'stat':
                return (
                  <div
                    key={i}
                    className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 text-center"
                  >
                    <div className="text-3xl font-bold text-artisan-gold sm:text-4xl">
                      {block.value}
                    </div>
                    <div className="mt-2 text-sm text-neutral-600">{block.label}</div>
                  </div>
                );
              case 'table':
                return (
                  <figure key={i} className="overflow-x-auto">
                    {block.table.caption && (
                      <figcaption className="mb-2 text-sm font-medium text-neutral-500">
                        {block.table.caption}
                      </figcaption>
                    )}
                    <table className="w-full border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b-2 border-neutral-300">
                          {block.table.headers.map((h, j) => (
                            <th key={j} className="py-3 pr-4 font-semibold text-neutral-800">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {block.table.rows.map((row, j) => (
                          <tr key={j} className="border-b border-neutral-200">
                            {row.map((cell, k) => (
                              <td key={k} className="py-3 pr-4 align-top text-neutral-700">
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
                    className="rounded-2xl bg-neutral-900 p-6 text-center text-white sm:p-8"
                  >
                    <p className="text-lg">{block.text}</p>
                    <Link
                      href={block.href}
                      className="mt-4 inline-block rounded-full bg-artisan-gold px-6 py-3 font-semibold text-white transition hover:opacity-90"
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

        {article.faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="font-serif text-2xl font-semibold">Frequently Asked Questions</h2>
            <dl className="mt-6 space-y-6">
              {article.faqs.map((faq, i) => (
                <div key={i} className="border-b border-neutral-200 pb-6">
                  <dt className="text-lg font-semibold text-neutral-900">{faq.question}</dt>
                  <dd className="mt-2 leading-relaxed text-neutral-700">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        <div className="mt-16 rounded-2xl border border-neutral-200 p-6 text-center">
          <p className="text-lg font-medium">Ready to see the numbers on your own floor?</p>
          <p className="mt-1 text-neutral-600">
            Book a free on-site capacity audit — we bring an ErgoPack to your pallets.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block rounded-full bg-neutral-900 px-6 py-3 font-semibold text-white transition hover:opacity-90"
          >
            Request a demo
          </Link>
        </div>
      </article>
    </MainLayout>
  );
}
