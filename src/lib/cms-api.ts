/**
 * CMS API Client for ErgopackIndia Frontend
 *
 * This client connects the Next.js frontend to the headless CMS backend.
 * All content is fetched dynamically from the backend API.
 */

import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_CMS_API_URL || 'http://localhost:5000/api/public';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Types
export interface Product {
  id: string;
  name: string;
  slug: string;
  category?: string;
  product_line?: 'xpert' | 'economy';
  tagline?: string;
  short_description?: string;
  long_description?: any;
  specifications?: Record<string, any>;
  features?: string[];
  gallery?: Media[];
  primary_image?: Media;
  brochures?: Media[];
  video_urls?: string[];
  price?: number;
  seo?: SEOMeta;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: any;
  cover_image?: Media;
  author?: any;
  category?: string;
  tags?: string[];
  published_at?: string;
  views: number;
  read_time?: number;
  seo?: SEOMeta;
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  title?: string;
  description?: string;
  components?: PageComponent[];
  seo?: SEOMeta;
}

export interface PageComponent {
  id: string;
  component_id: string;
  component?: {
    type: string;
    name: string;
  };
  props: Record<string, any>;
  sort_order: number;
}

export interface Media {
  id: string;
  url: string;
  thumbnail_url?: string;
  alt_text?: string;
  title?: string;
}

export interface SEOMeta {
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image?: Media;
  twitter_card?: string;
  structured_data?: any;
}

export interface SiteConfig {
  site_name: string;
  site_tagline: string;
  logo_url: string;
  favicon_url: string;
  contact_email: string;
  contact_phone: string;
  company_address: any;
  social_links: {
    facebook?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  navigation: {
    header: NavigationItem[];
    footer: NavigationItem[];
  };
}

export interface NavigationItem {
  label: string;
  url: string;
  order: number;
  children?: NavigationItem[];
}

// API Methods

/**
 * Get site configuration (navigation, settings, etc.)
 */
export async function getSiteConfig(lang = 'en'): Promise<SiteConfig> {
  const response = await api.get('/config', { params: { lang } });
  return response.data.data;
}

/**
 * Get all published products
 */
export async function getProducts(params?: {
  lang?: string;
  category?: string;
  product_line?: 'xpert' | 'economy';
  page?: number;
  limit?: number;
}): Promise<Product[]> {
  const response = await api.get('/products', { params });
  return response.data.data;
}

/**
 * Get single product by slug
 */
export async function getProduct(slug: string, lang = 'en'): Promise<Product> {
  const response = await api.get(`/products/${slug}`, { params: { lang } });
  return response.data.data;
}

/**
 * Get all published blog posts
 */
export async function getPosts(params?: {
  lang?: string;
  category?: string;
  page?: number;
  limit?: number;
}): Promise<Post[]> {
  const response = await api.get('/posts', { params });
  return response.data.data;
}

/**
 * Get single blog post by slug
 */
export async function getPost(slug: string, lang = 'en'): Promise<Post> {
  const response = await api.get(`/posts/${slug}`, { params: { lang } });
  return response.data.data;
}

/**
 * Get page with components by slug
 */
export async function getPage(slug: string, lang = 'en'): Promise<Page> {
  const response = await api.get(`/page/${slug}`, { params: { lang } });
  return response.data.data;
}

/**
 * Submit a form
 */
export async function submitForm(formId: string, data: Record<string, any>): Promise<void> {
  await api.post(`/forms/${formId}/submit`, data);
}

/**
 * Get active redirects (for client-side routing)
 */
export async function getRedirects(): Promise<Array<{ from_path: string; to_path: string; type: number }>> {
  const response = await api.get('/redirects');
  return response.data.data;
}

/**
 * Track page view
 */
export async function trackPageView(entityType: string, entityId: string): Promise<void> {
  try {
    await api.post('/track', { entity_type: entityType, entity_id: entityId });
  } catch (error) {
    // Silently fail tracking errors
    console.error('Failed to track page view:', error);
  }
}

export default api;
