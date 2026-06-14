import type { Metadata } from 'next';
import AutomationPageTemplate from '@/components/automation/AutomationPageTemplate';
import { automationHub } from '@/data/automation-pages';

export const metadata: Metadata = {
  title: automationHub.seo.title,
  description: automationHub.seo.description,
  keywords: automationHub.seo.keywords,
  alternates: { canonical: '/factory-floor-automation' },
  openGraph: {
    title: automationHub.seo.title,
    description: automationHub.seo.description,
    type: 'website',
    locale: 'en_IN',
    images: [automationHub.heroImage],
  },
};

export default function FactoryFloorAutomationHubPage() {
  return <AutomationPageTemplate page={automationHub} />;
}
