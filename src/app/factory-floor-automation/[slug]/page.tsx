import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AutomationPageTemplate from '@/components/automation/AutomationPageTemplate';
import { automationSpokes, getAutomationPageBySlug } from '@/data/automation-pages';

export function generateStaticParams() {
  return automationSpokes.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = getAutomationPageBySlug(params.slug);

  if (!page || page.kind !== 'spoke') {
    return {
      title: 'Automation Page Not Found | ErgoPack India',
      description: 'The requested automation page could not be found.',
    };
  }

  return {
    title: page.seo.title,
    description: page.seo.description,
    keywords: page.seo.keywords,
    alternates: { canonical: `/factory-floor-automation/${page.slug}` },
    openGraph: {
      title: page.seo.title,
      description: page.seo.description,
      type: 'article',
      locale: 'en_IN',
      images: [page.heroImage],
    },
  };
}

export default function AutomationSpokePage({ params }: { params: { slug: string } }) {
  const page = getAutomationPageBySlug(params.slug);

  if (!page || page.kind !== 'spoke') {
    notFound();
  }

  return <AutomationPageTemplate page={page} />;
}
