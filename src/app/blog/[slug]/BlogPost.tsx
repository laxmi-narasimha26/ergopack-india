import Link from 'next/link';
import { format } from 'date-fns';
import type { Components } from 'react-markdown';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { ArrowLeft, Calendar, ChevronRight, Clock } from 'lucide-react';
import { JsonLd, BreadcrumbSchema } from '@/components/JsonLd';
import MainLayout from '@/components/layout/MainLayout';
import SmartImage from '@/components/media/SmartImage';
import LeadForm from '@/components/forms/LeadForm';
import type { Blog } from '@/types';
import BlogShareActions from './BlogShareActions';

interface BlogPostProps {
  blog: Blog;
  relatedBlogs: Partial<Blog>[];
}

interface HeadingItem {
  id: string;
  title: string;
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function getHeadingItems(content: string): HeadingItem[] {
  return content
    .split('\n')
    .filter((line) => /^##\s+/.test(line))
    .map((line) => line.replace(/^##\s+/, '').trim())
    .filter(Boolean)
    .map((title) => ({
      id: slugify(title),
      title,
    }));
}

function getSummaryPoints(content: string): string[] {
  const points = content
    .split('\n')
    .filter((line) => /^-\s+/.test(line))
    .map((line) => line.replace(/^-\s+/, '').trim())
    .filter(Boolean);

  return points.slice(0, 3);
}

function formatBlogDate(value?: Date | string): string {
  if (!value) {
    return 'Draft';
  }

  return format(new Date(value), 'MMMM dd, yyyy');
}

const markdownComponents: Components = {
  h2: ({ children }) => {
    const title = String(children);
    return (
      <h2
        id={slugify(title)}
        className="mt-16 scroll-mt-32 border-t border-stone-200 pt-10 text-3xl font-semibold tracking-tight text-stone-950"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className="mt-10 text-2xl font-semibold tracking-tight text-stone-950">{children}</h3>
  ),
  p: ({ children }) => <p className="mt-5 text-[1.05rem] leading-8 text-stone-700">{children}</p>,
  ul: ({ children }) => (
    <ul className="mt-5 space-y-3 border-l border-stone-200 pl-6">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mt-5 space-y-3 pl-6 text-[1.05rem] leading-8 text-stone-700 marker:font-semibold marker:text-[#C8102E]">
      {children}
    </ol>
  ),
  li: ({ children }) => (
    <li className="pl-1 text-[1.02rem] leading-8 text-stone-700">{children}</li>
  ),
  a: ({ href, children }) => {
    if (!href) {
      return <span>{children}</span>;
    }

    const className =
      'font-semibold text-[#b40d28] underline decoration-[#eab6bf] decoration-2 underline-offset-4 transition-colors hover:text-[#8f0b20]';

    if (href.startsWith('/')) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    }

    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  },
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-[#C8102E] bg-stone-50 px-5 py-4 text-lg leading-8 text-stone-700">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }) => {
    if (!src) {
      return null;
    }

    return (
      <figure className="my-10 overflow-hidden rounded-[24px] border border-stone-200 bg-stone-50">
        <SmartImage
          src={src}
          alt={alt || ''}
          width={1400}
          height={900}
          sizes="(max-width: 1024px) 100vw, 820px"
          className="h-auto w-full object-cover"
        />
        {alt ? (
          <figcaption className="border-t border-stone-200 px-5 py-3 text-sm leading-6 text-stone-500">
            {alt}
          </figcaption>
        ) : null}
      </figure>
    );
  },
  hr: () => <hr className="my-12 border-stone-200" />,
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto">
      <table className="w-full border-collapse overflow-hidden rounded-xl border border-stone-200 text-left text-[0.95rem]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-stone-900 text-white">{children}</thead>,
  th: ({ children }) => <th className="px-4 py-3 font-semibold">{children}</th>,
  td: ({ children }) => (
    <td className="border-t border-stone-200 px-4 py-3 align-top leading-7 text-stone-700">
      {children}
    </td>
  ),
  tr: ({ children }) => <tr className="odd:bg-white even:bg-stone-50">{children}</tr>,
  input: ({ checked, type }) =>
    type === 'checkbox' ? (
      <span
        className={`mr-2 inline-flex h-4 w-4 -translate-y-px items-center justify-center rounded border align-middle ${
          checked ? 'border-[#C8102E] bg-[#C8102E] text-white' : 'border-stone-300 bg-white'
        }`}
      >
        {checked ? '✓' : ''}
      </span>
    ) : null,
};

export default function BlogPost({ blog, relatedBlogs }: BlogPostProps) {
  const headings = getHeadingItems(blog.content);
  const summaryPoints = getSummaryPoints(blog.content);
  const publishedTime = blog.publishedAt ? new Date(blog.publishedAt).toISOString() : undefined;
  const modifiedTime = new Date(blog.updatedAt || blog.createdAt).toISOString();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Blog', item: '/blog' },
          { name: blog.title, item: `/blog/${blog.slug}` },
        ]}
      />
      <JsonLd
        type="article"
        data={{
          headline: blog.title,
          description: blog.excerpt,
          image: blog.coverImage,
          datePublished: publishedTime,
          dateModified: modifiedTime,
          author: { type: 'Organization', name: blog.author },
          url: `/blog/${blog.slug}`,
        }}
      />

      <MainLayout noPadding>
        <article className="bg-white pt-24 pb-20 text-stone-950">
          <header className="border-b border-stone-200">
            <div className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-semibold text-stone-500 transition-colors hover:text-stone-950"
              >
                <ArrowLeft size={16} />
                Back to blog
              </Link>

              <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#C8102E]">
                    {blog.category.replace(/-/g, ' ')}
                  </p>
                  <h1 className="mt-4 max-w-4xl text-balance text-4xl font-semibold tracking-tight text-stone-950 md:text-5xl lg:text-[3.7rem]">
                    {blog.title}
                  </h1>
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-stone-600">{blog.excerpt}</p>

                  <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-stone-500">
                    <span className="inline-flex items-center gap-2">
                      <Calendar size={16} />
                      {formatBlogDate(blog.publishedAt)}
                    </span>
                    <span className="inline-flex items-center gap-2">
                      <Clock size={16} />
                      {blog.readTime} min read
                    </span>
                    <span className="text-stone-700">{blog.author}</span>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Link
                      href="/contact"
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
                </div>

                <aside className="lg:border-l lg:border-stone-200 lg:pl-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                    Quick Read
                  </p>
                  <div className="mt-5 space-y-4">
                    {summaryPoints.map((point) => (
                      <p
                        key={point}
                        className="border-b border-stone-200 pb-4 text-sm leading-7 text-stone-700"
                      >
                        {point}
                      </p>
                    ))}
                    <div className="pt-2">
                      <BlogShareActions title={blog.title} excerpt={blog.excerpt} />
                    </div>
                  </div>
                </aside>
              </div>

              {blog.coverImage ? (
                <div className="mt-10 overflow-hidden rounded-[28px] border border-stone-200">
                  <SmartImage
                    src={blog.coverImage}
                    alt={blog.title}
                    width={1600}
                    height={900}
                    sizes="100vw"
                    priority
                    className="h-auto w-full object-cover"
                  />
                </div>
              ) : null}
            </div>
          </header>

          <div className="mx-auto grid max-w-7xl gap-12 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,820px)_280px] lg:justify-between lg:px-8">
            <div className="min-w-0">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {blog.content}
              </ReactMarkdown>
            </div>

            <aside className="self-start lg:sticky lg:top-28">
              <div className="space-y-8 border-t border-stone-200 pt-6 lg:border-t-0 lg:pt-0">
                {headings.length > 0 ? (
                  <section>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                      Jump to a section
                    </p>
                    <nav className="mt-4 space-y-3">
                      {headings.map((item) => (
                        <Link
                          key={item.id}
                          href={`#${item.id}`}
                          className="flex items-start gap-2 text-sm leading-6 text-stone-600 transition-colors hover:text-[#C8102E]"
                        >
                          <ChevronRight size={16} className="mt-1 shrink-0" />
                          <span>{item.title}</span>
                        </Link>
                      ))}
                    </nav>
                  </section>
                ) : null}

                <section className="border-t border-stone-200 pt-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-500">
                    Useful links
                  </p>
                  <div className="mt-4 space-y-3">
                    <Link
                      href="/products/726x"
                      className="block text-sm font-semibold text-stone-800 hover:text-[#C8102E]"
                    >
                      ErgoPack 726X Li
                    </Link>
                    <Link
                      href="/products/go"
                      className="block text-sm font-semibold text-stone-800 hover:text-[#C8102E]"
                    >
                      ErgoPack GO
                    </Link>
                    <Link
                      href="/products/700"
                      className="block text-sm font-semibold text-stone-800 hover:text-[#C8102E]"
                    >
                      ErgoPack 700
                    </Link>
                    <Link
                      href="/roi-calculator"
                      className="block text-sm font-semibold text-stone-800 hover:text-[#C8102E]"
                    >
                      Pallet strapping ROI calculator
                    </Link>
                  </div>
                </section>
              </div>
            </aside>
          </div>

          {/* Lead capture — full width, below the article body */}
          <section className="border-t border-stone-200 bg-stone-50">
            <div className="mx-auto max-w-3xl px-4 py-14 sm:px-6 lg:px-8">
              <LeadForm
                sourceLabel={`Blog: ${blog.title}`}
                heading="Talk to a pallet strapping engineer"
                subheading="BENZ Packaging and ErgoPack India engineers support installations and service anywhere in India. Tell us your pallet setup and we’ll recommend the right machine — and send pricing."
              />
            </div>
          </section>

          {relatedBlogs.length > 0 ? (
            <section className="border-t border-stone-200">
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#C8102E]">
                      Related Reading
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold tracking-tight text-stone-950">
                      Continue with the next guide
                    </h2>
                  </div>
                  <Link
                    href="/blog"
                    className="text-sm font-semibold text-stone-700 hover:text-[#C8102E]"
                  >
                    View all blog posts
                  </Link>
                </div>

                <div className="mt-8 grid gap-8 lg:grid-cols-3">
                  {relatedBlogs.map((relatedBlog) => (
                    <Link
                      key={relatedBlog.slug}
                      href={`/blog/${relatedBlog.slug}`}
                      className="group border-t border-stone-200 pt-5"
                    >
                      {relatedBlog.coverImage ? (
                        <div className="overflow-hidden rounded-[22px] border border-stone-200">
                          <SmartImage
                            src={relatedBlog.coverImage}
                            alt={relatedBlog.title || 'Related article'}
                            width={1200}
                            height={720}
                            sizes="(max-width: 1024px) 100vw, 360px"
                            className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                          />
                        </div>
                      ) : null}
                      <p className="mt-4 text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">
                        {relatedBlog.category?.replace(/-/g, ' ')}
                      </p>
                      <h3 className="mt-3 text-2xl font-semibold tracking-tight text-stone-950 transition-colors group-hover:text-[#C8102E]">
                        {relatedBlog.title}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-stone-600">{relatedBlog.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </article>
      </MainLayout>
    </>
  );
}
