// Authentication types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor' | 'viewer';
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// Product types
export interface ProductSpec {
  [key: string]: string | number | boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price?: number;
  specs?: ProductSpec;
  features?: string[];
  gallery_ids?: string[];
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
}

export interface CreateProductRequest {
  name: string;
  slug: string;
  description?: string;
  price?: number;
  specs?: ProductSpec;
  features?: string[];
  gallery_ids?: string[];
  status?: 'draft' | 'published';
}

// Blog Post types
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  author_id: string;
  featured_image_id?: string;
  status: 'draft' | 'published';
  published_at?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostRequest {
  title: string;
  slug: string;
  content: string;
  excerpt?: string;
  featured_image_id?: string;
  status?: 'draft' | 'published';
}

// Page types
export interface PageComponent {
  id: string;
  type: 'hero' | 'text' | 'gallery' | 'form' | 'cta' | 'features' | 'testimonials';
  order: number;
  data: Record<string, any>;
}

export interface Page {
  id: string;
  title: string;
  slug: string;
  description?: string;
  components: PageComponent[];
  status: 'draft' | 'published';
  seo_title?: string;
  seo_description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePageRequest {
  title: string;
  slug: string;
  description?: string;
  components?: PageComponent[];
  status?: 'draft' | 'published';
  seo_title?: string;
  seo_description?: string;
}

// Lead/Form submission types
export interface FormSubmission {
  id: string;
  form_id: string;
  form_type: string;
  data: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  status: 'new' | 'read' | 'replied';
  createdAt: string;
  updatedAt: string;
}

export interface CreateFormSubmissionRequest {
  form_id: string;
  form_type: string;
  data: Record<string, any>;
}

// SEO types
export interface SEOConfig {
  siteTitle: string;
  siteDescription: string;
  siteKeywords: string[];
  socialMeta: {
    twitter?: string;
    facebook?: string;
    linkedin?: string;
  };
}

// Dashboard stats types
export interface DashboardStats {
  totalProducts: number;
  totalPosts: number;
  totalPages: number;
  totalLeads: number;
  recentLeads: FormSubmission[];
  topProducts: Product[];
}

// API Error type
export interface ApiError {
  message: string;
  status: number;
  data?: Record<string, any>;
}

// Pagination type
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  pages: number;
}
