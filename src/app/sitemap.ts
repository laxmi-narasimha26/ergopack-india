import { MetadataRoute } from 'next';
import mongoose from 'mongoose';
import { getPublishedSeedBlogs } from '@/data/seed-blogs';
import { allLocationSlugs } from '@/data/location-pages';
import { resourceArticleSlugs } from '@/data/resource-articles';
import { automationSpokes } from '@/data/automation-pages';
import { connectDB } from '@/lib/db/mongodb';

export const dynamic = 'force-dynamic';
export const revalidate = 3600;

const staticRoutes: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'weekly', priority: 1 },
  { path: '/products', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/buy-pallet-strapping-machine-india', changeFrequency: 'weekly', priority: 0.95 },
  { path: '/products/726x', changeFrequency: 'weekly', priority: 0.93 },
  { path: '/products/go', changeFrequency: 'weekly', priority: 0.92 },
  { path: '/products/700', changeFrequency: 'weekly', priority: 0.91 },
  { path: '/products/x-pert-line', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/products/economy-line', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/products/700-series', changeFrequency: 'monthly', priority: 0.82 },
  { path: '/products/726-series', changeFrequency: 'monthly', priority: 0.84 },
  { path: '/products/go-series', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/products/700e', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/products/700x', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/products/726e', changeFrequency: 'monthly', priority: 0.85 },

  { path: '/products/build-your-own', changeFrequency: 'monthly', priority: 0.85 },
  { path: '/products/compare-machines', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/roi-calculator', changeFrequency: 'monthly', priority: 0.88 },
  { path: '/resources', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/factory-floor-automation', changeFrequency: 'weekly', priority: 0.9 },
  { path: '/industries-served', changeFrequency: 'weekly', priority: 0.85 },
  { path: '/solutions', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/ergonomics', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/ehs-compliance', changeFrequency: 'weekly', priority: 0.8 },
  { path: '/industries', changeFrequency: 'monthly', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/testimonials', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.75 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/blog', changeFrequency: 'daily', priority: 0.85 },
  { path: '/locations', changeFrequency: 'weekly', priority: 0.82 },
];

async function getPublishedBlogs() {
  try {
    if (!process.env.MONGODB_URI) {
      return [];
    }

    await connectDB();

    const blogs = await mongoose.connection.db
      ?.collection('blogs')
      .find({ published: true })
      .project({ slug: 1, updatedAt: 1, createdAt: 1 })
      .toArray();

    return blogs || [];
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://ergopack-india.com';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: route.path === '/' ? baseUrl : `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const locationPages: MetadataRoute.Sitemap = allLocationSlugs.map((slug) => ({
    url: `${baseUrl}/locations/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.76,
  }));

  const resourcePages: MetadataRoute.Sitemap = resourceArticleSlugs.map((slug) => ({
    url: `${baseUrl}/resources/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.84,
  }));

  const automationPagesSitemap: MetadataRoute.Sitemap = automationSpokes.map((page) => ({
    url: `${baseUrl}/factory-floor-automation/${page.slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.86,
  }));

  const seedBlogPages: MetadataRoute.Sitemap = getPublishedSeedBlogs().map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const databaseBlogs = await getPublishedBlogs();
  const dynamicBlogPages: MetadataRoute.Sitemap = databaseBlogs.map((blog: any) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.updatedAt || blog.createdAt),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const uniquePages = new Map<string, MetadataRoute.Sitemap[number]>();

  [
    ...staticPages,
    ...locationPages,
    ...resourcePages,
    ...automationPagesSitemap,
    ...seedBlogPages,
    ...dynamicBlogPages,
  ].forEach((page) => {
    const existingPage = uniquePages.get(page.url);

    if (!existingPage) {
      uniquePages.set(page.url, page);
      return;
    }

    const existingPriority = existingPage.priority ?? 0;
    const nextPriority = page.priority ?? 0;

    uniquePages.set(page.url, {
      ...existingPage,
      ...page,
      priority: Math.max(existingPriority, nextPriority),
      lastModified:
        new Date(existingPage.lastModified || 0) > new Date(page.lastModified || 0)
          ? existingPage.lastModified
          : page.lastModified,
    });
  });

  return Array.from(uniquePages.values()).sort((left, right) => {
    const leftPriority = left.priority ?? 0;
    const rightPriority = right.priority ?? 0;
    return rightPriority - leftPriority;
  });
}
