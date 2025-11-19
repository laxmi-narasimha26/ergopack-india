// Database Models
export interface User {
  _id: string;
  email: string;
  password: string;
  name: string;
  role: 'admin' | 'editor';
  createdAt: Date;
  updatedAt: Date;
}

export interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  readTime: number;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  publishedAt?: Date;
}

export interface ContactRequest {
  _id: string;
  name: string;
  company: string;
  jobTitle: string;
  email: string;
  industry: 'pharmaceuticals' | 'automotive' | 'electronics' | 'other';
  message?: string;
  phone?: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'rejected';
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Media {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  url: string;
  type: 'image' | 'video' | '3d-model' | 'document';
  folder?: string;
  alt?: string;
  caption?: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Component Props
export interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  ogType?: 'website' | 'article';
  article?: {
    publishedTime?: string;
    modifiedTime?: string;
    author?: string;
    tags?: string[];
  };
  canonical?: string;
}

export interface ProductFeature {
  icon: string;
  title: string;
  description: string;
  highlight?: boolean;
}

export interface ProductSpec {
  label: string;
  value: string;
  unit?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  features: ProductFeature[];
  specifications: ProductSpec[];
  images: string[];
  modelUrl?: string;
  category: 'xpert' | 'economy';
}

export interface Industry {
  id: string;
  name: string;
  slug: string;
  headline: string;
  description: string;
  keyMessage: string;
  image: string;
  challenges: string[];
  solutions: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  position: string;
  company: string;
  logo?: string;
  image?: string;
}

// Form Types
export interface ContactFormData {
  name: string;
  company: string;
  jobTitle: string;
  email: string;
  industry: string;
  phone?: string;
  message?: string;
}

export interface BlogFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  category: string;
  tags: string[];
  published: boolean;
  featured: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Analytics Types
export interface DashboardStats {
  totalRequests: number;
  newRequests: number;
  totalBlogs: number;
  publishedBlogs: number;
  totalViews: number;
  recentRequests: ContactRequest[];
  recentBlogs: Blog[];
  requestsByIndustry: {
    industry: string;
    count: number;
  }[];
  requestsByMonth: {
    month: string;
    count: number;
  }[];
}

// Chat/Chatbot Types
export interface ChatMessage {
  id: string;
  message: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  userInfo?: {
    name?: string;
    email?: string;
  };
  status: 'active' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}
