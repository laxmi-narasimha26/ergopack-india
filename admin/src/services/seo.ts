/**
 * SEO Service - API integration for SEO management
 */
import api from './api';

// =============================================================================
// TYPES
// =============================================================================

export interface SEOSettings {
  _id?: string;
  globalTitle: string;
  globalDescription: string;
  globalKeywords: string[];
  ogDefaultImage: string;
  twitterHandle: string;
  googleAnalyticsId: string;
  googleSearchConsoleId: string;
  robotsContent: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Redirect {
  _id: string;
  sourceUrl: string;
  destinationUrl: string;
  statusCode: 301 | 302;
  isActive: boolean;
  hitCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface PageSEO {
  _id?: string;
  entityType: 'product' | 'blog' | 'page' | 'custom';
  entityId: string;
  slug: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
  sitemapPriority: number;
  sitemapChangeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  excludeFromSitemap: boolean;
  noIndex: boolean;
  noFollow: boolean;
}

export interface SitemapConfig {
  _id?: string;
  excludedPaths: string[];
  customPaths: Array<{
    path: string;
    priority: number;
    changeFreq: string;
  }>;
  defaultPriority: number;
  defaultChangeFreq: string;
  includeProducts: boolean;
  includeBlog: boolean;
  includePages: boolean;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// =============================================================================
// SEO SETTINGS
// =============================================================================

export const seoService = {
  // Settings
  async getSettings(): Promise<SEOSettings> {
    const response = await api.get('/seo/settings');
    return response.data.data;
  },

  async updateSettings(data: Partial<SEOSettings>): Promise<SEOSettings> {
    const response = await api.put('/seo/settings', data);
    return response.data.data;
  },

  // Redirects
  async getRedirects(
    page = 1,
    limit = 20,
    search?: string
  ): Promise<{ redirects: Redirect[]; pagination: PaginationMeta }> {
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    if (search) params.append('search', search);

    const response = await api.get(`/seo/redirects?${params.toString()}`);
    return {
      redirects: response.data.data,
      pagination: response.data.pagination,
    };
  },

  async createRedirect(data: {
    sourceUrl: string;
    destinationUrl: string;
    statusCode?: 301 | 302;
  }): Promise<Redirect> {
    const response = await api.post('/seo/redirects', data);
    return response.data.data;
  },

  async updateRedirect(id: string, data: Partial<Redirect>): Promise<Redirect> {
    const response = await api.put(`/seo/redirects/${id}`, data);
    return response.data.data;
  },

  async deleteRedirect(id: string): Promise<void> {
    await api.delete(`/seo/redirects/${id}`);
  },

  async bulkCreateRedirects(
    redirects: Array<{ sourceUrl: string; destinationUrl: string; statusCode?: 301 | 302 }>
  ): Promise<{ created: number; failed: number; errors: string[] }> {
    const response = await api.post('/seo/redirects/bulk', { redirects });
    return response.data.data;
  },

  // Robots.txt
  async getRobots(): Promise<string> {
    const response = await api.get('/seo/robots');
    return response.data.data.content;
  },

  async updateRobots(content: string): Promise<void> {
    await api.put('/seo/robots', { content });
  },

  // Page SEO
  async getPageSEO(entityType: string, entityId: string): Promise<PageSEO | null> {
    const response = await api.get(`/seo/meta/${entityType}/${entityId}`);
    return response.data.data;
  },

  async getAllPageSEO(entityType?: string): Promise<PageSEO[]> {
    const url = entityType ? `/seo/meta/${entityType}` : '/seo/meta/all';
    const response = await api.get(url);
    return response.data.data;
  },

  async updatePageSEO(
    entityType: string,
    entityId: string,
    data: Partial<PageSEO>
  ): Promise<PageSEO> {
    const response = await api.put(`/seo/meta/${entityType}/${entityId}`, data);
    return response.data.data;
  },

  async deletePageSEO(entityType: string, entityId: string): Promise<void> {
    await api.delete(`/seo/meta/${entityType}/${entityId}`);
  },

  // Sitemap Config
  async getSitemapConfig(): Promise<SitemapConfig> {
    const response = await api.get('/seo/sitemap-config');
    return response.data.data;
  },

  async updateSitemapConfig(data: Partial<SitemapConfig>): Promise<SitemapConfig> {
    const response = await api.put('/seo/sitemap-config', data);
    return response.data.data;
  },
};

export default seoService;
