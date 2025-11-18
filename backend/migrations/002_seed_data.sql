-- Seed Data for ErgopackIndia Headless CMS
-- This script creates sample data for testing and demonstration

-- Create default super admin user (password: admin123)
INSERT INTO users (email, password_hash, name, role_id) VALUES (
  'admin@ergopackindia.com',
  '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GySj3FDzCO4K', -- admin123
  'Admin User',
  (SELECT id FROM roles WHERE name = 'super_admin')
);

-- Create sample products
INSERT INTO products (name, slug, category, product_line, tagline, short_description, specifications, features, is_published, sort_order) VALUES
(
  'X-pert Line Premium Strapping Machine',
  'xpert-premium',
  'Strapping Machines',
  'xpert',
  'Ultimate Precision & Automation',
  'Top-of-the-line automated strapping solution with IoT monitoring and ChainLance technology.',
  '{
    "tension": "1500 daN",
    "control": "Siemens 7\" Touchscreen",
    "positioning": "Line-Laser (±1mm)",
    "lift": "Triplex-Tool-Lift System",
    "power": "230V/400V Dual",
    "strapWidth": "25-50mm"
  }'::jsonb,
  '[
    "Siemens 7\" Color Touchscreen",
    "Triplex-Tool-Lift System (3-Stage)",
    "Line-Laser Positioning (±1mm)",
    "ChainLance Patented System",
    "Real-Time IoT Monitoring",
    "Automatic Tension Adjustment",
    "Predictive Maintenance AI"
  ]'::jsonb,
  true,
  1
),
(
  'E-conomy Line Plus Strapping Machine',
  'economy-plus',
  'Strapping Machines',
  'economy',
  'Enhanced Reliability & Performance',
  'Professional-grade strapping machine with proven reliability and excellent value.',
  '{
    "tension": "1000 daN",
    "control": "Electronic Display",
    "positioning": "Visual Guides",
    "lift": "Enhanced Mechanical",
    "power": "230V",
    "strapWidth": "25-50mm"
  }'::jsonb,
  '[
    "Electronic Control Display",
    "Enhanced Lift System",
    "Visual Guide Positioning",
    "Heavy-Duty Ratchet (1000 daN)",
    "Robust Steel Construction",
    "Quick Training"
  ]'::jsonb,
  true,
  2
);

-- Create sample blog posts
INSERT INTO posts (title, slug, excerpt, content, category, tags, status, is_featured, published_at, read_time) VALUES
(
  'The Future of Packaging Automation in India',
  'future-packaging-automation-india',
  'Explore how automation is transforming the packaging industry in India and what it means for manufacturers.',
  '{
    "time": 1640995200,
    "blocks": [
      {
        "type": "header",
        "data": {
          "text": "The Future of Packaging Automation in India",
          "level": 1
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "The packaging industry in India is undergoing a significant transformation driven by automation and Industry 4.0 technologies."
        }
      },
      {
        "type": "header",
        "data": {
          "text": "Key Trends",
          "level": 2
        }
      },
      {
        "type": "list",
        "data": {
          "style": "unordered",
          "items": [
            "IoT-enabled monitoring systems",
            "Predictive maintenance with AI",
            "Automated quality control",
            "Energy-efficient machinery"
          ]
        }
      }
    ]
  }'::jsonb,
  'Industry Insights',
  ARRAY['automation', 'packaging', 'industry-4.0'],
  'published',
  true,
  CURRENT_TIMESTAMP - INTERVAL '5 days',
  8
),
(
  'How to Choose the Right Strapping Machine',
  'choose-right-strapping-machine',
  'A comprehensive guide to selecting the perfect strapping machine for your business needs.',
  '{
    "time": 1640995200,
    "blocks": [
      {
        "type": "header",
        "data": {
          "text": "How to Choose the Right Strapping Machine",
          "level": 1
        }
      },
      {
        "type": "paragraph",
        "data": {
          "text": "Selecting the right strapping machine is crucial for optimizing your packaging operations and ensuring product safety."
        }
      }
    ]
  }'::jsonb,
  'Guides',
  ARRAY['guides', 'strapping', 'machinery'],
  'published',
  false,
  CURRENT_TIMESTAMP - INTERVAL '2 days',
  6
);

-- Create sample forms
INSERT INTO forms (name, slug, description, fields, is_active) VALUES
(
  'Product Demo Request',
  'demo-request',
  'Request a personalized product demonstration',
  '[
    {
      "id": "name",
      "name": "name",
      "label": "Full Name",
      "type": "text",
      "required": true,
      "order": 1
    },
    {
      "id": "email",
      "name": "email",
      "label": "Email Address",
      "type": "email",
      "required": true,
      "order": 2
    },
    {
      "id": "company",
      "name": "company",
      "label": "Company Name",
      "type": "text",
      "required": true,
      "order": 3
    },
    {
      "id": "phone",
      "name": "phone",
      "label": "Phone Number",
      "type": "text",
      "required": true,
      "order": 4
    },
    {
      "id": "product",
      "name": "product",
      "label": "Interested Product",
      "type": "select",
      "required": true,
      "options": ["X-pert Line", "E-conomy Line"],
      "order": 5
    },
    {
      "id": "message",
      "name": "message",
      "label": "Additional Message",
      "type": "textarea",
      "required": false,
      "order": 6
    }
  ]'::jsonb,
  true
),
(
  'Contact Us',
  'contact-us',
  'General contact form',
  '[
    {
      "id": "name",
      "name": "name",
      "label": "Name",
      "type": "text",
      "required": true,
      "order": 1
    },
    {
      "id": "email",
      "name": "email",
      "label": "Email",
      "type": "email",
      "required": true,
      "order": 2
    },
    {
      "id": "subject",
      "name": "subject",
      "label": "Subject",
      "type": "text",
      "required": true,
      "order": 3
    },
    {
      "id": "message",
      "name": "message",
      "label": "Message",
      "type": "textarea",
      "required": true,
      "order": 4
    }
  ]'::jsonb,
  true
);

-- Add sample form submissions
INSERT INTO form_submissions (form_id, data, status, ip_address) VALUES
(
  (SELECT id FROM forms WHERE slug = 'demo-request'),
  '{
    "name": "Rajesh Kumar",
    "email": "rajesh@example.com",
    "company": "ABC Industries",
    "phone": "+91-9876543210",
    "product": "X-pert Line",
    "message": "Interested in learning more about automated strapping solutions"
  }'::jsonb,
  'new',
  '192.168.1.100'
),
(
  (SELECT id FROM forms WHERE slug = 'contact-us'),
  '{
    "name": "Priya Sharma",
    "email": "priya@example.com",
    "subject": "Pricing Inquiry",
    "message": "Please send me pricing details for E-conomy Line machines"
  }'::jsonb,
  'contacted',
  '192.168.1.101'
);

-- Add sample redirects
INSERT INTO redirects (from_path, to_path, type, is_active) VALUES
('/old-products', '/products', 301, true),
('/contact-form', '/contact', 301, true);

-- Add SEO metadata for products
INSERT INTO seo_meta (entity_type, entity_id, meta_title, meta_description, meta_keywords, canonical_url) VALUES
(
  'product',
  (SELECT id FROM products WHERE slug = 'xpert-premium'),
  'X-pert Line Premium Strapping Machine | ErgopackIndia',
  'Discover our premium automated strapping solution with IoT monitoring, Siemens touchscreen control, and ChainLance technology. Industry-leading precision and reliability.',
  ARRAY['strapping machine', 'automated packaging', 'industrial strapping', 'packaging machinery'],
  'https://ergopackindia.com/products/xpert-premium'
),
(
  'product',
  (SELECT id FROM products WHERE slug = 'economy-plus'),
  'E-conomy Line Plus Strapping Machine | ErgopackIndia',
  'Professional-grade strapping machine offering enhanced reliability and excellent value. Perfect for standard operations with proven performance.',
  ARRAY['strapping machine', 'packaging equipment', 'industrial machinery'],
  'https://ergopackindia.com/products/economy-plus'
);

-- Add SEO metadata for blog posts
INSERT INTO seo_meta (entity_type, entity_id, meta_title, meta_description, meta_keywords) VALUES
(
  'post',
  (SELECT id FROM posts WHERE slug = 'future-packaging-automation-india'),
  'The Future of Packaging Automation in India | ErgopackIndia Blog',
  'Explore how automation and Industry 4.0 technologies are transforming the packaging industry in India. Learn about IoT, AI, and predictive maintenance.',
  ARRAY['packaging automation', 'industry 4.0', 'IoT packaging', 'manufacturing trends']
);

-- Add i18n content (Hindi translations)
INSERT INTO i18n_content (entity_type, entity_id, language_id, field_name, field_value) VALUES
(
  'product',
  (SELECT id FROM products WHERE slug = 'xpert-premium'),
  (SELECT id FROM languages WHERE code = 'hi'),
  'name',
  '"एक्स-पर्ट लाइन प्रीमियम स्ट्रैपिंग मशीन"'::jsonb
),
(
  'product',
  (SELECT id FROM products WHERE slug = 'xpert-premium'),
  (SELECT id FROM languages WHERE code = 'hi'),
  'tagline',
  '"परम सटीकता और स्वचालन"'::jsonb
),
(
  'product',
  (SELECT id FROM products WHERE slug = 'economy-plus'),
  (SELECT id FROM languages WHERE code = 'hi'),
  'name',
  '"ई-कॉनमी लाइन प्लस स्ट्रैपिंग मशीन"'::jsonb
);

-- Create default homepage with components
DO $$
DECLARE
  homepage_id UUID;
  hero_component_id UUID;
  features_component_id UUID;
  cta_component_id UUID;
BEGIN
  -- Get homepage ID
  SELECT id INTO homepage_id FROM pages WHERE slug = 'homepage';

  -- Get component IDs
  SELECT id INTO hero_component_id FROM components WHERE type = 'hero';
  SELECT id INTO features_component_id FROM components WHERE type = 'features';
  SELECT id INTO cta_component_id FROM components WHERE type = 'cta';

  -- Clear existing page components
  DELETE FROM page_components WHERE page_id = homepage_id;

  -- Add hero component
  INSERT INTO page_components (page_id, component_id, props, sort_order) VALUES
  (
    homepage_id,
    hero_component_id,
    '{
      "headline": "Premium Packaging Solutions for Indian Industry",
      "subheadline": "Automated strapping machines with Industry 4.0 technology",
      "ctaText": "Explore Products",
      "ctaUrl": "/products",
      "backgroundImage": "/images/hero-bg.jpg"
    }'::jsonb,
    1
  );

  -- Add features component
  INSERT INTO page_components (page_id, component_id, props, sort_order) VALUES
  (
    homepage_id,
    features_component_id,
    '{
      "features": [
        {
          "title": "IoT Monitoring",
          "description": "Real-time machine monitoring and analytics",
          "icon": "activity"
        },
        {
          "title": "Proven Reliability",
          "description": "10+ years of field-tested performance",
          "icon": "shield-check"
        },
        {
          "title": "Expert Support",
          "description": "Dedicated technical support team",
          "icon": "headphones"
        }
      ]
    }'::jsonb,
    2
  );

  -- Add CTA component
  INSERT INTO page_components (page_id, component_id, props, sort_order) VALUES
  (
    homepage_id,
    cta_component_id,
    '{
      "title": "Ready to Optimize Your Packaging?",
      "description": "Request a demo and see our machines in action",
      "buttonText": "Request Demo",
      "buttonUrl": "/contact"
    }'::jsonb,
    3
  );
END $$;

COMMIT;
