-- Comprehensive Database Schema for ErgopackIndia Headless CMS
-- Version 1.0.0

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- 1. USERS & ROLES
-- =====================================================

CREATE TABLE roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(50) UNIQUE NOT NULL,
  display_name VARCHAR(100) NOT NULL,
  description TEXT,
  permissions JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role_id UUID NOT NULL REFERENCES roles(id) ON DELETE RESTRICT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role_id ON users(role_id);

-- =====================================================
-- 2. MEDIA LIBRARY
-- =====================================================

CREATE TABLE media (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  filename VARCHAR(255) NOT NULL,
  original_filename VARCHAR(255) NOT NULL,
  mime_type VARCHAR(100) NOT NULL,
  size INTEGER NOT NULL,
  width INTEGER,
  height INTEGER,
  url TEXT NOT NULL,
  thumbnail_url TEXT,
  alt_text VARCHAR(255),
  title VARCHAR(255),
  description TEXT,
  folder VARCHAR(255),
  uploaded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_media_mime_type ON media(mime_type);
CREATE INDEX idx_media_folder ON media(folder);
CREATE INDEX idx_media_uploaded_by ON media(uploaded_by);

-- =====================================================
-- 3. PRODUCTS (Full PIM)
-- =====================================================

CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  sku VARCHAR(100) UNIQUE,
  category VARCHAR(100),
  product_line VARCHAR(50), -- 'xpert' or 'economy'
  tagline VARCHAR(255),
  short_description TEXT,
  long_description JSONB, -- Editor.js format
  specifications JSONB DEFAULT '{}', -- Key-value pairs
  features JSONB DEFAULT '[]', -- Array of features
  gallery_ids UUID[] DEFAULT '{}', -- Array of media IDs
  primary_image_id UUID REFERENCES media(id) ON DELETE SET NULL,
  brochure_ids UUID[] DEFAULT '{}', -- Array of PDF media IDs
  video_urls JSONB DEFAULT '[]', -- Array of video embed URLs
  price DECIMAL(10, 2),
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_product_line ON products(product_line);
CREATE INDEX idx_products_published ON products(is_published);

-- =====================================================
-- 4. BLOG POSTS
-- =====================================================

CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) UNIQUE NOT NULL,
  excerpt TEXT,
  content JSONB, -- Editor.js format
  cover_image_id UUID REFERENCES media(id) ON DELETE SET NULL,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  category VARCHAR(100),
  tags TEXT[] DEFAULT '{}',
  status VARCHAR(20) DEFAULT 'draft', -- 'draft', 'published', 'scheduled'
  is_featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  views INTEGER DEFAULT 0,
  read_time INTEGER, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_posts_status ON posts(status);
CREATE INDEX idx_posts_author ON posts(author_id);
CREATE INDEX idx_posts_category ON posts(category);
CREATE INDEX idx_posts_published_at ON posts(published_at);

-- =====================================================
-- 5. PAGES & COMPONENTS (Page Builder)
-- =====================================================

CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  title VARCHAR(500),
  description TEXT,
  is_published BOOLEAN DEFAULT false,
  template VARCHAR(100) DEFAULT 'default',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type VARCHAR(100) NOT NULL, -- 'hero', 'cta', 'product_carousel', 'rich_text', etc.
  name VARCHAR(255) NOT NULL,
  description TEXT,
  default_props JSONB DEFAULT '{}',
  schema JSONB, -- JSON Schema for validation
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE page_components (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  page_id UUID NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
  component_id UUID NOT NULL REFERENCES components(id) ON DELETE CASCADE,
  props JSONB DEFAULT '{}', -- Component-specific data
  sort_order INTEGER NOT NULL,
  is_visible BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(page_id, sort_order)
);

CREATE INDEX idx_page_components_page ON page_components(page_id);
CREATE INDEX idx_page_components_sort ON page_components(page_id, sort_order);

-- =====================================================
-- 6. FORMS & SUBMISSIONS
-- =====================================================

CREATE TABLE forms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  fields JSONB NOT NULL, -- Form field definitions
  settings JSONB DEFAULT '{}', -- Form settings (notifications, etc.)
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  form_id UUID NOT NULL REFERENCES forms(id) ON DELETE CASCADE,
  data JSONB NOT NULL,
  status VARCHAR(20) DEFAULT 'new', -- 'new', 'contacted', 'qualified', 'closed'
  notes TEXT,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_submissions_form ON form_submissions(form_id);
CREATE INDEX idx_submissions_status ON form_submissions(status);
CREATE INDEX idx_submissions_created ON form_submissions(created_at);

-- =====================================================
-- 7. SEO MANAGEMENT
-- =====================================================

CREATE TABLE seo_meta (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(50) NOT NULL, -- 'product', 'post', 'page'
  entity_id UUID NOT NULL,
  meta_title VARCHAR(255),
  meta_description TEXT,
  meta_keywords TEXT[],
  canonical_url TEXT,
  og_title VARCHAR(255),
  og_description TEXT,
  og_image_id UUID REFERENCES media(id) ON DELETE SET NULL,
  twitter_card VARCHAR(50) DEFAULT 'summary_large_image',
  twitter_title VARCHAR(255),
  twitter_description TEXT,
  twitter_image_id UUID REFERENCES media(id) ON DELETE SET NULL,
  structured_data JSONB, -- Schema.org structured data
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(entity_type, entity_id)
);

CREATE TABLE redirects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_path VARCHAR(500) NOT NULL UNIQUE,
  to_path VARCHAR(500) NOT NULL,
  type INTEGER DEFAULT 301, -- 301 or 302
  is_active BOOLEAN DEFAULT true,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_redirects_from_path ON redirects(from_path);
CREATE INDEX idx_redirects_active ON redirects(is_active);

CREATE TABLE robots_txt (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 8. INTERNATIONALIZATION (i18n)
-- =====================================================

CREATE TABLE languages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code VARCHAR(10) UNIQUE NOT NULL, -- 'en', 'hi', 'de'
  name VARCHAR(100) NOT NULL,
  native_name VARCHAR(100),
  is_default BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE i18n_content (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(50) NOT NULL, -- 'product', 'post', 'page'
  entity_id UUID NOT NULL,
  language_id UUID NOT NULL REFERENCES languages(id) ON DELETE CASCADE,
  field_name VARCHAR(100) NOT NULL, -- 'title', 'description', 'content', etc.
  field_value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(entity_type, entity_id, language_id, field_name)
);

CREATE INDEX idx_i18n_entity ON i18n_content(entity_type, entity_id);
CREATE INDEX idx_i18n_language ON i18n_content(language_id);

-- =====================================================
-- 9. GLOBAL SITE CONFIGURATION
-- =====================================================

CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key VARCHAR(255) UNIQUE NOT NULL,
  value JSONB NOT NULL,
  group_name VARCHAR(100), -- 'general', 'seo', 'social', 'analytics'
  description TEXT,
  is_public BOOLEAN DEFAULT false, -- Can be accessed by public API
  updated_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_settings_group ON site_settings(group_name);
CREATE INDEX idx_settings_public ON site_settings(is_public);

CREATE TABLE navigation_menus (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  location VARCHAR(50) NOT NULL, -- 'header', 'footer', 'mobile'
  items JSONB NOT NULL, -- Array of menu items with nested structure
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- =====================================================
-- 10. ANALYTICS & TRACKING
-- =====================================================

CREATE TABLE page_views (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type VARCHAR(50) NOT NULL,
  entity_id UUID NOT NULL,
  ip_address VARCHAR(45),
  user_agent TEXT,
  referer TEXT,
  country VARCHAR(2),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_page_views_entity ON page_views(entity_type, entity_id);
CREATE INDEX idx_page_views_created ON page_views(created_at);

-- =====================================================
-- SEED DATA
-- =====================================================

-- Insert default roles
INSERT INTO roles (name, display_name, description, permissions) VALUES
('super_admin', 'Super Admin', 'Full system access', '["*"]'),
('marketer', 'Marketer', 'Blog, Page Builder, SEO, Leads access', '["blog.*", "pages.*", "seo.*", "leads.*", "media.*"]'),
('sales', 'Sales', 'Leads access only', '["leads.read", "leads.update"]'),
('product_manager', 'Product Manager', 'Product Hub & Media Library access', '["products.*", "media.*"]'),
('editor', 'Editor', 'Blog and content management', '["blog.*", "media.*"]');

-- Insert default language
INSERT INTO languages (code, name, native_name, is_default, is_active) VALUES
('en', 'English', 'English', true, true);

-- Insert default robots.txt
INSERT INTO robots_txt (content, is_active) VALUES
('User-agent: *
Allow: /

Sitemap: https://ergopackindia.com/sitemap.xml', true);

-- Insert default site settings
INSERT INTO site_settings (key, value, group_name, is_public) VALUES
('site_name', '"ErgopackIndia"', 'general', true),
('site_tagline', '"Premium Packaging Solutions"', 'general', true),
('contact_email', '"info@ergopackindia.com"', 'general', true),
('contact_phone', '"+91-XXXXXXXXXX"', 'general', true),
('company_address', '{"street": "", "city": "", "state": "", "country": "India", "zip": ""}', 'general', true),
('logo_url', '""', 'general', true),
('favicon_url', '""', 'general', true),
('social_links', '{"facebook": "", "linkedin": "", "twitter": "", "youtube": ""}', 'social', true),
('google_analytics_id', '""', 'analytics', false);

-- Insert default navigation menu
INSERT INTO navigation_menus (location, items, is_active) VALUES
('header', '[
  {"label": "Home", "url": "/", "order": 1},
  {"label": "Products", "url": "/products", "order": 2},
  {"label": "Industries", "url": "/industries", "order": 3},
  {"label": "Blog", "url": "/blog", "order": 4},
  {"label": "Contact", "url": "/contact", "order": 5}
]', true);

-- Insert default components
INSERT INTO components (type, name, description, default_props, is_active) VALUES
('hero', 'Hero Banner', 'Main hero section with image/video background', '{"headline": "", "subheadline": "", "ctaText": "", "ctaUrl": "", "backgroundImage": ""}', true),
('cta', 'Call to Action', 'Call to action section', '{"title": "", "description": "", "buttonText": "", "buttonUrl": ""}', true),
('rich_text', 'Rich Text Block', 'Custom rich text content', '{"content": {}}', true),
('product_carousel', 'Product Carousel', 'Carousel of products', '{"title": "", "productIds": []}', true),
('testimonials', 'Testimonials Slider', 'Customer testimonials', '{"testimonials": []}', true),
('features', 'Feature Grid', 'Feature highlights grid', '{"features": []}', true),
('stats', 'Statistics Section', 'Company statistics', '{"stats": []}', true);

-- Insert default homepage
INSERT INTO pages (name, slug, title, description, is_published) VALUES
('Homepage', 'homepage', 'ErgopackIndia - Premium Packaging Solutions', 'Leading provider of premium packaging machinery in India', true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers to all tables
CREATE TRIGGER update_roles_updated_at BEFORE UPDATE ON roles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_media_updated_at BEFORE UPDATE ON media FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON posts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_pages_updated_at BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_components_updated_at BEFORE UPDATE ON components FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_page_components_updated_at BEFORE UPDATE ON page_components FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_forms_updated_at BEFORE UPDATE ON forms FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_form_submissions_updated_at BEFORE UPDATE ON form_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_seo_meta_updated_at BEFORE UPDATE ON seo_meta FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_redirects_updated_at BEFORE UPDATE ON redirects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_robots_txt_updated_at BEFORE UPDATE ON robots_txt FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_languages_updated_at BEFORE UPDATE ON languages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_i18n_content_updated_at BEFORE UPDATE ON i18n_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_site_settings_updated_at BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_navigation_menus_updated_at BEFORE UPDATE ON navigation_menus FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
