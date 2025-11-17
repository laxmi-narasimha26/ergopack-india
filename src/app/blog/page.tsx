import { Metadata } from 'next';
import BlogListing from './BlogListing';

export const metadata: Metadata = {
  title: 'Blog - ErgoPack India',
  description: 'Insights on packaging automation, sustainability, and industry innovations from ErgoPack India.',
  keywords: ['packaging automation', 'sustainability', 'manufacturing', 'industry insights', 'ergopack'],
  openGraph: {
    title: 'Blog - ErgoPack India',
    description: 'Insights on packaging automation, sustainability, and industry innovations.',
    type: 'website',
  },
};

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-black">
      <BlogListing />
    </main>
  );
}
