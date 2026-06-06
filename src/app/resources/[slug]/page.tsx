import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ResourceArticleBody from '@/components/resources/ResourceArticleBody';
import { ArticleSchema, BreadcrumbSchema, FAQSchema } from '@/components/JsonLd';
import { getResourceArticle, resourceArticleSlugs } from '@/data/resource-articles';

interface PageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return resourceArticleSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = getResourceArticle(params.slug);
  if (!article) return {};

  const url = `/resources/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url,
    },
  };
}

export default function ResourceArticlePage({ params }: PageProps) {
  const article = getResourceArticle(params.slug);
  if (!article) notFound();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', item: '/' },
          { name: 'Resources', item: '/resources' },
          { name: article.breadcrumb, item: `/resources/${article.slug}` },
        ]}
      />
      <ArticleSchema
        article={{
          headline: article.h1,
          description: article.description,
          datePublished: '2026-01-01',
          dateModified: new Date().toISOString().split('T')[0],
        }}
      />
      <FAQSchema items={article.faqs} />
      <ResourceArticleBody article={article} />
    </>
  );
}
