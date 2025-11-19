// =====================================================
// Core Types for ErgopackIndia Headless CMS
// =====================================================

export interface User {
  id: string;
  email: string;
  password_hash?: string;
  name: string;
  role_id: string;
  role?: Role;
  is_active: boolean;
  last_login?: Date;
  created_at: Date;
  updated_at: Date;
}

export interface Role {
  id: string;
  name: string;
  display_name: string;
  description?: string;
  permissions: string[];
  created_at: Date;
  updated_at: Date;
}

export interface Media {
  id: string;
  filename: string;
  original_filename: string;
  mime_type: string;
  size: number;
  width?: number;
  height?: number;
  url: string;
  thumbnail_url?: string;
  alt_text?: string;
  title?: string;
  description?: string;
  folder?: string;
  uploaded_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku?: string;
  category?: string;
  product_line?: 'xpert' | 'economy';
  tagline?: string;
  short_description?: string;
  long_description?: EditorJSContent;
  specifications?: Record<string, any>;
  features?: string[];
  gallery_ids?: string[];
  gallery?: Media[];
  primary_image_id?: string;
  primary_image?: Media;
  brochure_ids?: string[];
  brochures?: Media[];
  video_urls?: string[];
  price?: number;
  is_published: boolean;
  published_at?: Date;
  sort_order: number;
  seo?: SEOMeta;
  i18n_content?: I18nContent[];
  created_by?: string;
  updated_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content?: EditorJSContent;
  cover_image_id?: string;
  cover_image?: Media;
  author_id?: string;
  author?: User;
  category?: string;
  tags?: string[];
  status: 'draft' | 'published' | 'scheduled';
  is_featured: boolean;
  published_at?: Date;
  views: number;
  read_time?: number;
  seo?: SEOMeta;
  i18n_content?: I18nContent[];
  created_at: Date;
  updated_at: Date;
}

export interface Page {
  id: string;
  name: string;
  slug: string;
  title?: string;
  description?: string;
  is_published: boolean;
  template: string;
  components?: PageComponent[];
  seo?: SEOMeta;
  created_at: Date;
  updated_at: Date;
}

export interface Component {
  id: string;
  type: string;
  name: string;
  description?: string;
  default_props: Record<string, any>;
  schema?: Record<string, any>;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface PageComponent {
  id: string;
  page_id: string;
  component_id: string;
  component?: Component;
  props: Record<string, any>;
  sort_order: number;
  is_visible: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface Form {
  id: string;
  name: string;
  slug: string;
  description?: string;
  fields: FormField[];
  settings: Record<string, any>;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface FormField {
  id: string;
  name: string;
  label: string;
  type: 'text' | 'email' | 'textarea' | 'select' | 'checkbox' | 'radio' | 'file';
  placeholder?: string;
  required: boolean;
  options?: string[];
  validation?: Record<string, any>;
  order: number;
}

export interface FormSubmission {
  id: string;
  form_id: string;
  form?: Form;
  data: Record<string, any>;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  notes?: string;
  ip_address?: string;
  user_agent?: string;
  created_at: Date;
  updated_at: Date;
}

export interface SEOMeta {
  id: string;
  entity_type: 'product' | 'post' | 'page';
  entity_id: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string[];
  canonical_url?: string;
  og_title?: string;
  og_description?: string;
  og_image_id?: string;
  og_image?: Media;
  twitter_card?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image_id?: string;
  twitter_image?: Media;
  structured_data?: Record<string, any>;
  created_at: Date;
  updated_at: Date;
}

export interface Redirect {
  id: string;
  from_path: string;
  to_path: string;
  type: 301 | 302;
  is_active: boolean;
  created_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface RobotsTxt {
  id: string;
  content: string;
  is_active: boolean;
  updated_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface Language {
  id: string;
  code: string;
  name: string;
  native_name?: string;
  is_default: boolean;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface I18nContent {
  id: string;
  entity_type: 'product' | 'post' | 'page';
  entity_id: string;
  language_id: string;
  language?: Language;
  field_name: string;
  field_value: any;
  created_at: Date;
  updated_at: Date;
}

export interface SiteSetting {
  id: string;
  key: string;
  value: any;
  group_name?: string;
  description?: string;
  is_public: boolean;
  updated_by?: string;
  created_at: Date;
  updated_at: Date;
}

export interface NavigationMenu {
  id: string;
  location: 'header' | 'footer' | 'mobile';
  items: NavigationItem[];
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}

export interface NavigationItem {
  label: string;
  url: string;
  order: number;
  children?: NavigationItem[];
  target?: '_blank' | '_self';
  icon?: string;
}

export interface PageView {
  id: string;
  entity_type: string;
  entity_id: string;
  ip_address?: string;
  user_agent?: string;
  referer?: string;
  country?: string;
  created_at: Date;
}

// =====================================================
// Editor.js Types
// =====================================================

export interface EditorJSContent {
  time?: number;
  blocks: EditorJSBlock[];
  version?: string;
}

export interface EditorJSBlock {
  id?: string;
  type: string;
  data: Record<string, any>;
}

// =====================================================
// API Request/Response Types
// =====================================================

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  data?: {
    user: Omit<User, 'password_hash'>;
    token: string;
    refreshToken: string;
  };
  message?: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T = any> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface DashboardStats {
  totalProducts: number;
  publishedProducts: number;
  totalPosts: number;
  publishedPosts: number;
  totalLeads: number;
  newLeads: number;
  totalViews: number;
  recentLeads: FormSubmission[];
  recentPosts: Post[];
  popularProducts: Product[];
  analyticsData?: GoogleAnalyticsData;
}

export interface GoogleAnalyticsData {
  realtimeUsers: number;
  topPages: Array<{
    page: string;
    views: number;
  }>;
  usersByCountry: Array<{
    country: string;
    users: number;
  }>;
  sessionsOverTime: Array<{
    date: string;
    sessions: number;
  }>;
}

// =====================================================
// Utility Types
// =====================================================

export interface QueryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: 'ASC' | 'DESC';
  search?: string;
  filter?: Record<string, any>;
}

export interface JWTPayload {
  userId: string;
  email: string;
  roleId: string;
  permissions: string[];
}

export type Permission =
  | '*'
  | 'blog.*'
  | 'blog.read'
  | 'blog.create'
  | 'blog.update'
  | 'blog.delete'
  | 'products.*'
  | 'products.read'
  | 'products.create'
  | 'products.update'
  | 'products.delete'
  | 'pages.*'
  | 'pages.read'
  | 'pages.create'
  | 'pages.update'
  | 'pages.delete'
  | 'seo.*'
  | 'seo.read'
  | 'seo.update'
  | 'leads.*'
  | 'leads.read'
  | 'leads.update'
  | 'media.*'
  | 'media.read'
  | 'media.upload'
  | 'media.delete'
  | 'users.*'
  | 'users.read'
  | 'users.create'
  | 'users.update'
  | 'users.delete'
  | 'settings.*'
  | 'settings.read'
  | 'settings.update';

export interface RequestWithUser extends Request {
  user?: JWTPayload;
}

// =====================================================
// Export All
// =====================================================

export * from './index';
