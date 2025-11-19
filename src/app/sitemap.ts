import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/products/xpert-line`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/economy-line`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Individual Product Pages - 745 Series (Heavy-Duty)
    {
      url: `${baseUrl}/products/745e`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/products/745x`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // Individual Product Pages - 726 Series (Light-Duty)
    {
      url: `${baseUrl}/products/726e`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/products/726x`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // Individual Product Pages - 713 Series (Ultra-Light)
    {
      url: `${baseUrl}/products/713e`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/products/713x`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // Individual Product Pages - 700 Series
    {
      url: `${baseUrl}/products/700`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/products/700e`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/products/700x`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // Individual Product Pages - Mobile Systems
    {
      url: `${baseUrl}/products/re`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/products/go`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    // Comparison Pages
    {
      url: `${baseUrl}/products/compare`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products/compare-all`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products/compare-745`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/products/compare-726`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/products/compare-713`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/products/compare-700`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/products/compare-mobile`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    // Tools
    {
      url: `${baseUrl}/products/find-your-model`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // Other Pages
    {
      url: `${baseUrl}/industries`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
  ];
}
