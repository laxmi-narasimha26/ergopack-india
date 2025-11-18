# ErgopackIndia - The Ultimate Headless CMS & Business Hub

> A production-ready, enterprise-grade headless CMS built specifically for ErgopackIndia's packaging machinery business.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-14+-blue)](https://www.postgresql.org/)

---

## 🎯 Project Overview

This is a complete headless CMS system that provides:
- **Dynamic Content Management** - No hard-coded content; everything is managed through the admin panel
- **Product Information Management (PIM)** - Full-featured product catalog with specs, images, videos, brochures
- **Blog Management** - Modern block-based editor (Editor.js) for rich content
- **Page Builder** - Drag-and-drop interface to build custom pages
- **Form Builder** - Create and manage forms with submission tracking
- **SEO Management** - Redirects, robots.txt, meta tags, canonical URLs, structured data
- **Multi-language Support (i18n)** - Serve content in multiple languages
- **Role-Based Access Control** - Granular permissions for different user types

---

## 📐 Architecture

### System Components

```
┌─────────────────────────────────────────────────────────────┐
│                     ERGOPACKINDIA CMS                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────────────────┐  ┌────────────────┐  ┌──────────────┐  │
│  │   Admin Panel  │  │  Backend API   │  │   Next.js    │  │
│  │  (React/Vite)  │←→│  (Express/TS)  │←→│   Frontend   │  │
│  │  Port: 5173    │  │  Port: 5000    │  │  Port: 3000  │  │
│  └────────────────┘  └────────────────┘  └──────────────┘  │
│         │                     │                              │
│         │                     ▼                              │
│         │            ┌─────────────────┐                     │
│         └───────────→│   PostgreSQL    │                     │
│                      │   Database      │                     │
│                      └─────────────────┘                     │
└─────────────────────────────────────────────────────────────┘
```

### Technology Stack

#### **Backend (Node.js/Express/TypeScript)**
- **Framework:** Express.js 4.18
- **Language:** TypeScript 5.3
- **Database:** PostgreSQL 14+ with JSONB support
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer with Sharp for image processing
- **Testing:** Jest + Supertest

#### **Admin Panel (React SPA)**
- **Framework:** React 18.2
- **Build Tool:** Vite 5.0
- **Styling:** Tailwind CSS 3.4
- **Routing:** React Router DOM 6
- **State Management:** Zustand
- **Forms:** React Hook Form 7
- **Editor:** Editor.js 2.29
- **Drag & Drop:** React Beautiful DND
- **Charts:** Recharts 2.10
- **Notifications:** React Hot Toast

#### **Frontend (Next.js)**
- **Framework:** Next.js 14
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **API Client:** Custom CMS API client

---

## 🗂️ Project Structure

```
ergopack-india/
│
├── backend/                      # Backend API (Node.js/Express/TypeScript)
│   ├── src/
│   │   ├── config/              # Database and app configuration
│   │   ├── controllers/         # Request handlers
│   │   │   ├── AuthController.ts
│   │   │   ├── ProductController.ts
│   │   │   ├── PostController.ts
│   │   │   ├── PageController.ts
│   │   │   └── PublicController.ts
│   │   ├── middleware/          # Auth, validation middleware
│   │   ├── models/              # Database repositories
│   │   │   ├── UserRepository.ts
│   │   │   ├── ProductRepository.ts
│   │   │   ├── PostRepository.ts
│   │   │   └── PageRepository.ts
│   │   ├── routes/              # API route definitions
│   │   ├── services/            # Business logic
│   │   ├── types/               # TypeScript type definitions
│   │   ├── utils/               # Helper functions
│   │   └── server.ts            # Express app entry point
│   ├── migrations/              # Database migrations
│   │   ├── 001_initial_schema.sql
│   │   ├── 002_seed_data.sql
│   │   └── run-migrations.js
│   ├── tests/                   # Integration tests
│   │   └── integration/
│   │       ├── rbac.test.ts
│   │       ├── page-builder.test.ts
│   │       ├── seo-redirects.test.ts
│   │       └── i18n.test.ts
│   ├── package.json
│   └── tsconfig.json
│
├── admin/                        # Admin Panel (React/Vite)
│   ├── src/
│   │   ├── components/          # React components
│   │   │   ├── Layout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── PrivateRoute.tsx
│   │   ├── pages/               # Page components
│   │   │   ├── Login.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── Products/
│   │   │   │   ├── ProductList.tsx
│   │   │   │   └── ProductForm.tsx
│   │   │   ├── Blog/
│   │   │   │   ├── PostList.tsx
│   │   │   │   └── PostForm.tsx
│   │   │   ├── Pages/
│   │   │   │   ├── PageList.tsx
│   │   │   │   └── PageBuilder.tsx  # Drag-and-drop
│   │   │   └── Leads/
│   │   │       └── LeadList.tsx
│   │   ├── services/            # API services
│   │   │   ├── api.ts
│   │   │   └── auth.ts
│   │   ├── stores/              # Zustand stores
│   │   │   └── authStore.ts
│   │   ├── types/               # TypeScript types
│   │   ├── utils/               # Utilities
│   │   ├── App.tsx              # Main app component
│   │   └── main.tsx             # Entry point
│   ├── package.json
│   └── vite.config.ts
│
├── src/                          # Next.js Frontend
│   ├── lib/
│   │   └── cms-api.ts           # CMS API client
│   ├── components/
│   │   └── cms/
│   │       └── DynamicComponent.tsx  # Component renderer
│   └── app/                     # Next.js app directory
│
├── CMS_SETUP_GUIDE.md           # Complete setup guide
├── CMS_README.md                # This file
└── package.json
```

---

## 🌟 Key Features

### 1. **Product Information Management (PIM)**

Comprehensive product management system:

- ✅ Product details (name, slug, category, product line)
- ✅ **JSONB Specifications** - Flexible key-value pairs for any product spec
- ✅ **Features Array** - Unlimited product features
- ✅ **Image Gallery** - Multiple product images with primary image selection
- ✅ **Brochure Attachments** - Upload PDF brochures
- ✅ **Video Integration** - Embed YouTube/Vimeo videos
- ✅ **i18n Support** - Multi-language product content
- ✅ **SEO Metadata** - Custom meta tags, Open Graph, Twitter Cards
- ✅ **Publish/Draft Workflow** - Control product visibility

**Example: Product in Database**

```json
{
  "id": "uuid",
  "name": "X-pert Line Premium",
  "slug": "xpert-premium",
  "specifications": {
    "tension": "1500 daN",
    "control": "Siemens 7\" Touchscreen",
    "positioning": "Line-Laser (±1mm)"
  },
  "features": [
    "Siemens 7\" Color Touchscreen",
    "Triplex-Tool-Lift System",
    "ChainLance Patented System"
  ],
  "gallery_ids": ["uuid1", "uuid2", "uuid3"],
  "is_published": true
}
```

### 2. **Dynamic Page Builder**

Build pages visually with drag-and-drop:

- ✅ **7 Pre-built Components:**
  - Hero Banner
  - Call to Action
  - Features Grid
  - Product Carousel
  - Testimonials Slider
  - Statistics Section
  - Rich Text Block

- ✅ **Drag-and-Drop Reordering** (React Beautiful DND)
- ✅ **Component Props Editor** - Customize each component
- ✅ **Add/Remove Components** - Dynamic page composition
- ✅ **Visual Preview** - See changes in real-time

**How It Works:**

1. Admin selects a page (e.g., "Homepage")
2. Sees list of components on the page
3. **Drags and drops** to reorder
4. Clicks "Edit" to change component content
5. Publishes changes
6. Frontend API returns components in new order

**Database Structure:**

```sql
pages
  ├── id, name, slug

components
  ├── id, type (e.g., 'hero'), name, default_props

page_components
  ├── page_id, component_id, props, sort_order
```

### 3. **Blog Management with Editor.js**

Modern block-based content editor:

- ✅ **Editor.js Integration** - Notion-like editing experience
- ✅ **Supported Blocks:**
  - Headers (H1-H6)
  - Paragraphs
  - Lists (ordered/unordered)
  - Quotes
  - Images
  - Code blocks
  - Embeds (YouTube, etc.)

- ✅ **Post Features:**
  - Title, slug, excerpt
  - Cover image
  - Author attribution
  - Categories and tags
  - Draft/Published status
  - Featured posts
  - View counter
  - Read time calculation

- ✅ **SEO for Posts:**
  - Custom meta title/description
  - Open Graph tags
  - Twitter Cards
  - Canonical URLs
  - Structured data (JSON-LD)

### 4. **Form Builder & Lead Management**

Create custom forms and track submissions:

- ✅ **Dynamic Form Builder:**
  - Text, Email, Textarea, Select, Checkbox, Radio fields
  - Field validation rules
  - Required/optional fields
  - Custom field ordering

- ✅ **Lead Management:**
  - View all submissions
  - Filter by form type
  - Status tracking (New, Contacted, Qualified, Closed)
  - Add notes to submissions
  - IP address and user agent tracking
  - CSV export

- ✅ **Example Forms:**
  - Product Demo Request
  - Contact Us
  - Quote Request
  - Newsletter Signup

### 5. **Advanced SEO Toolkit**

Complete SEO management:

- ✅ **301/302 Redirects:**
  - Create redirects from admin panel
  - Active/inactive status
  - Public API returns active redirects for frontend routing

- ✅ **robots.txt Editor:**
  - Direct text editing
  - Version control

- ✅ **Sitemap Generation:**
  - Automatic sitemap.xml generation
  - Includes all published products, posts, pages
  - "Regenerate Sitemap" button

- ✅ **Meta Tag Management:**
  - Custom meta titles and descriptions
  - Keywords
  - Canonical URLs
  - Open Graph tags
  - Twitter Cards
  - Structured data (Schema.org)

### 6. **Multi-Language Support (i18n)**

Serve content in multiple languages:

- ✅ **Language Management:**
  - Enable/disable languages
  - Set default language
  - Language codes (en, hi, de, etc.)

- ✅ **Content Translation:**
  - Translate products, posts, pages
  - Field-level translations
  - Fallback to default language

- ✅ **API Integration:**
  - `?lang=en` query parameter
  - Automatic content merging
  - Public API respects language preference

**Example:**

```typescript
// English product
GET /api/public/products/xpert-premium?lang=en
// Returns: { name: "X-pert Line Premium" }

// Hindi product
GET /api/public/products/xpert-premium?lang=hi
// Returns: { name: "एक्स-पर्ट लाइन प्रीमियम" }
```

### 7. **Role-Based Access Control (RBAC)**

Granular permission system:

**Built-in Roles:**

| Role | Permissions | Use Case |
|------|------------|----------|
| **Super Admin** | `["*"]` | Full system access |
| **Marketer** | `["blog.*", "pages.*", "seo.*", "leads.*", "media.*"]` | Content & marketing |
| **Sales** | `["leads.read", "leads.update"]` | View and manage leads only |
| **Product Manager** | `["products.*", "media.*"]` | Product catalog management |
| **Editor** | `["blog.*", "media.*"]` | Blog content creation |

**How It Works:**

1. Each user has a role
2. Each role has a list of permissions
3. API routes check permissions via middleware
4. Wildcard permissions supported (`blog.*` = all blog actions)

**Example:**

```typescript
// Sales user tries to access products
GET /api/products
Authorization: Bearer <sales_token>
// Response: 403 Forbidden

// Sales user accesses leads
GET /api/forms/submissions
Authorization: Bearer <sales_token>
// Response: 200 OK
```

### 8. **Media Library**

Centralized asset management:

- ✅ File uploads (images, PDFs, videos)
- ✅ Automatic thumbnail generation
- ✅ Image optimization with Sharp
- ✅ Alt text and descriptions
- ✅ Folder organization
- ✅ Media gallery view
- ✅ Search and filter

### 9. **Dashboard & Analytics**

Admin dashboard with insights:

- ✅ **Statistics Cards:**
  - Total products / published products
  - Total posts / published posts
  - Total leads / new leads
  - Total page views

- ✅ **Charts (Recharts):**
  - Leads over time
  - Popular products
  - Traffic sources

- ✅ **Google Analytics Integration:**
  - Real-time users
  - Top pages
  - User demographics
  - Sessions over time

- ✅ **Recent Activity:**
  - Latest form submissions
  - Recent blog posts
  - Draft content

---

## 🔐 Authentication & Security

### JWT Authentication

- **Access Tokens:** 7-day expiry
- **Refresh Tokens:** 30-day expiry
- **Token Storage:** localStorage (admin panel)
- **Auto-refresh:** Tokens refreshed automatically

### Security Features

- ✅ Password hashing with bcrypt (12 rounds)
- ✅ CORS configuration
- ✅ SQL injection prevention (parameterized queries)
- ✅ XSS protection
- ✅ CSRF protection
- ✅ Rate limiting (planned)
- ✅ Input validation with Zod
- ✅ File upload restrictions

---

## 🧪 Testing

### Integration Tests

Four comprehensive test suites:

#### **1. RBAC Test (`rbac.test.ts`)**

Tests role-based access control:

```typescript
// Sales user CANNOT access products (403 Forbidden)
it('should DENY sales user access to GET /api/products', async () => {
  const response = await request(app)
    .get('/api/products')
    .set('Authorization', `Bearer ${salesToken}`);

  expect(response.status).toBe(403);
});

// Sales user CAN access leads (200 OK)
it('should ALLOW sales user access to GET /api/forms/submissions', async () => {
  const response = await request(app)
    .get('/api/forms/submissions')
    .set('Authorization', `Bearer ${salesToken}`);

  expect(response.status).toBe(200);
});
```

#### **2. Page Builder Test (`page-builder.test.ts`)**

Tests drag-and-drop reordering:

```typescript
// Marketer reorders components: [1, 2, 3] → [3, 1, 2]
it('should ALLOW marketer to reorder page components', async () => {
  const response = await request(app)
    .put(`/api/pages/${pageId}/components/reorder`)
    .set('Authorization', `Bearer ${marketerToken}`)
    .send({ components: newOrder });

  expect(response.status).toBe(200);
});

// Public API returns components in NEW order
it('should return components in NEW ORDER via public API', async () => {
  const response = await request(app)
    .get('/api/public/page/test-page');

  expect(response.body.data.components[0].component_id).toBe(component3Id);
  expect(response.body.data.components[1].component_id).toBe(component1Id);
  expect(response.body.data.components[2].component_id).toBe(component2Id);
});
```

#### **3. SEO Redirects Test (`seo-redirects.test.ts`)**

Tests redirect creation and public API:

```typescript
// Marketer creates redirect
it('should ALLOW marketer to create a 301 redirect', async () => {
  const response = await request(app)
    .post('/api/seo/redirects')
    .set('Authorization', `Bearer ${marketerToken}`)
    .send({ from_path: '/old-page', to_path: '/new-page', type: 301 });

  expect(response.status).toBe(201);
});

// Public API returns redirect
it('should return the new redirect in public API', async () => {
  const response = await request(app).get('/api/public/redirects');

  const redirect = response.body.data.find(r => r.from_path === '/old-page');
  expect(redirect.to_path).toBe('/new-page');
});
```

#### **4. i18n Test (`i18n.test.ts`)**

Tests multi-language content:

```typescript
// Create product with English title
it('should create product with English title', async () => {
  const response = await request(app)
    .post('/api/products')
    .send({ name: 'My Product', slug: 'my-product' });

  expect(response.body.data.name).toBe('My Product');
});

// Add Hindi translation
it('should add Hindi translation for product title', async () => {
  // Insert i18n_content record for Hindi
});

// Retrieve with lang=en returns English
it('should return English title when lang=en', async () => {
  const response = await request(app)
    .get(`/api/public/products/${productId}?lang=en`);

  expect(response.body.data.name).toBe('My Product');
});

// Retrieve with lang=hi returns Hindi
it('should return Hindi title when lang=hi', async () => {
  const response = await request(app)
    .get(`/api/public/products/${productId}?lang=hi`);

  expect(response.body.data.name).toBe('मेरा उत्पाद');
});
```

### Running Tests

```bash
cd backend
npm test                  # Run all tests
npm test -- rbac.test.ts  # Run specific test
npm run test:coverage     # Generate coverage report
```

---

## 📡 API Endpoints

### Public API (No Auth Required)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/public/config` | Site settings, navigation, social links |
| GET | `/api/public/page/:slug` | Page with components |
| GET | `/api/public/products` | Published products (supports `?lang=`) |
| GET | `/api/public/products/:slug` | Single product |
| GET | `/api/public/posts` | Published blog posts |
| GET | `/api/public/posts/:slug` | Single post (increments view count) |
| POST | `/api/public/forms/:id/submit` | Submit form |
| GET | `/api/public/redirects` | Active redirects |
| POST | `/api/public/track` | Track page view |

### Protected API (Auth Required)

| Module | Endpoints |
|--------|-----------|
| **Auth** | POST `/api/auth/login`, POST `/api/auth/refresh`, GET `/api/auth/me` |
| **Products** | Full CRUD `/api/products/*` |
| **Posts** | Full CRUD `/api/posts/*` |
| **Pages** | Full CRUD `/api/pages/*`, Component management |
| **Forms** | Full CRUD `/api/forms/*`, `/api/forms/submissions` |
| **Media** | Upload, list, delete `/api/media/*` |
| **SEO** | Redirects, robots.txt, sitemap `/api/seo/*` |
| **i18n** | Languages, translations `/api/i18n/*` |
| **Settings** | Site settings, navigation `/api/settings/*` |
| **Users** | User management `/api/users/*` |
| **Dashboard** | Stats and analytics `/api/dashboard/*` |

---

## 🚀 Quick Start

**See [CMS_SETUP_GUIDE.md](./CMS_SETUP_GUIDE.md) for complete setup instructions.**

**TL;DR:**

```bash
# 1. Backend
cd backend
npm install
cp .env.example .env  # Configure database
npm run migrate       # Create tables and seed data
npm run dev           # Start on port 5000

# 2. Admin Panel
cd admin
npm install
cp .env.example .env
npm run dev           # Start on port 5173

# 3. Frontend Integration
# Update Next.js to use CMS API (see setup guide)
```

---

## 🎓 How to Use

### Creating a Product

```typescript
// Admin Panel: Products → New Product
{
  "name": "X-pert Line Premium",
  "slug": "xpert-premium",
  "category": "Strapping Machines",
  "product_line": "xpert",
  "specifications": {
    "tension": "1500 daN",
    "control": "Siemens Touchscreen"
  },
  "features": [
    "ChainLance System",
    "IoT Monitoring"
  ],
  "is_published": true
}
```

### Building a Page

```typescript
// Admin Panel: Pages → Homepage → Edit
// 1. Drag "Hero Banner" to top
// 2. Click "Edit" on Hero Banner
{
  "headline": "Premium Packaging Solutions",
  "subheadline": "Industry 4.0 Technology",
  "ctaText": "Explore",
  "ctaUrl": "/products"
}
// 3. Add "Features Grid" below hero
// 4. Publish
```

### Fetching in Frontend

```typescript
// Next.js page
import { getPage } from '@/lib/cms-api';

export default async function HomePage() {
  const page = await getPage('homepage');

  return (
    <>
      {page.components?.map(component => (
        <DynamicComponent key={component.id} component={component} />
      ))}
    </>
  );
}
```

---

## 📊 Database Schema Highlights

### Core Tables

- `users` - User accounts
- `roles` - User roles and permissions
- `products` - Product catalog (JSONB specs, features)
- `posts` - Blog posts (JSONB Editor.js content)
- `pages` - Pages (homepage, about, etc.)
- `components` - Reusable page components
- `page_components` - Page-component relationships (sort_order)
- `media` - Media library
- `forms` - Form definitions
- `form_submissions` - Form submissions (leads)
- `seo_meta` - SEO metadata for all entities
- `redirects` - URL redirects
- `robots_txt` - robots.txt content
- `languages` - Supported languages
- `i18n_content` - Translations
- `site_settings` - Global site settings
- `navigation_menus` - Navigation menus
- `page_views` - Analytics tracking

### Key Features

- ✅ UUID primary keys
- ✅ JSONB columns for flexible data (specs, content)
- ✅ Foreign key constraints
- ✅ Indexed columns for performance
- ✅ Automatic timestamps (created_at, updated_at)
- ✅ Triggers for updated_at

---

## 🔄 Deployment Checklist

- [ ] Change default admin password
- [ ] Generate strong JWT secrets
- [ ] Configure PostgreSQL with SSL
- [ ] Set up database backups
- [ ] Configure CORS for production domains
- [ ] Enable HTTPS/SSL
- [ ] Set up monitoring (Sentry, etc.)
- [ ] Configure email notifications
- [ ] Set up CDN for media files
- [ ] Configure Google Analytics
- [ ] Run security audit
- [ ] Load testing
- [ ] Set up CI/CD pipeline

---

## 📈 Performance Optimizations

- ✅ Database indexing on frequently queried columns
- ✅ Image optimization with Sharp
- ✅ Static asset caching
- ✅ API response caching (planned)
- ✅ Database connection pooling
- ✅ Lazy loading for admin components
- ✅ Code splitting in admin panel

---

## 🤝 Contributing

This is a proprietary project for ErgopackIndia. For internal development:

1. Create feature branch: `git checkout -b feature/my-feature`
2. Make changes and test thoroughly
3. Run tests: `npm test`
4. Commit with meaningful message
5. Push and create pull request

---

## 📝 License

Proprietary - ErgopackIndia © 2024

---

## 💬 Support

For questions or issues:
- **Technical Documentation:** `CMS_SETUP_GUIDE.md`
- **API Documentation:** Run backend and visit `/api/health`
- **Admin Guide:** `/admin/README.md`

---

**Built with ❤️ for ErgopackIndia**

*Empowering Indian Industry with World-Class Packaging Solutions*
