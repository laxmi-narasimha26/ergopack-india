# ErgopackIndia Headless CMS - Complete Setup Guide

## 🎯 Overview

This guide will help you set up the complete headless CMS system for ErgopackIndia, consisting of:
- **Backend API** (Node.js/Express/PostgreSQL/TypeScript)
- **Admin Panel** (React/Vite/Tailwind)
- **Frontend Integration** (Next.js)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** >= 18.x
- **PostgreSQL** >= 14.x
- **npm** or **yarn**
- **Git**

---

## 🚀 Part 1: Backend Setup

### Step 1: Install Dependencies

```bash
cd /home/user/ergopack-india/backend
npm install
```

### Step 2: Configure Environment

```bash
# Copy the example environment file
cp .env.example .env

# Edit .env file with your settings
nano .env
```

**Required Environment Variables:**

```env
# Database
DATABASE_URL=postgresql://username:password@localhost:5432/ergopack_cms
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ergopack_cms
DB_USER=your_db_user
DB_PASSWORD=your_db_password

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_REFRESH_SECRET=your-refresh-secret-key-change-this

# Server
PORT=5000
NODE_ENV=development

# Frontend URLs (for CORS)
FRONTEND_URL=http://localhost:3000
ADMIN_URL=http://localhost:5173
```

### Step 3: Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE ergopack_cms;

# Create user (optional)
CREATE USER ergopack_admin WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE ergopack_cms TO ergopack_admin;

# Exit
\q
```

### Step 4: Run Database Migrations

```bash
cd /home/user/ergopack-india/backend
npm run migrate
```

This will:
- Create all database tables
- Set up default roles (Super Admin, Marketer, Sales, Product Manager, Editor)
- Create default languages (English)
- Add sample components
- Seed initial site settings

### Step 5: Create Admin User

The seed data includes a default admin user:
- **Email:** admin@ergopackindia.com
- **Password:** admin123

**⚠️ IMPORTANT:** Change this password immediately in production!

### Step 6: Start Backend Server

```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

The backend will be available at: `http://localhost:5000`

**Test the API:**
```bash
curl http://localhost:5000/health
# Should return: {"status":"ok","timestamp":"..."}
```

---

## 🎨 Part 2: Admin Panel Setup

### Step 1: Install Dependencies

```bash
cd /home/user/ergopack-india/admin
npm install
```

### Step 2: Configure Environment

```bash
cp .env.example .env
nano .env
```

**Required Variables:**

```env
VITE_API_URL=http://localhost:5000/api
VITE_PUBLIC_API_URL=http://localhost:5000/api/public
```

### Step 3: Start Admin Panel

```bash
npm run dev
```

The admin panel will be available at: `http://localhost:5173`

### Step 4: Login

1. Navigate to `http://localhost:5173`
2. Login with:
   - **Email:** admin@ergopackindia.com
   - **Password:** admin123
3. You should see the admin dashboard

---

## 🌐 Part 3: Frontend Integration (Next.js)

### Step 1: Update Environment Variables

```bash
cd /home/user/ergopack-india

# Add to .env.local
echo "NEXT_PUBLIC_CMS_API_URL=http://localhost:5000/api/public" >> .env.local
```

### Step 2: Update Next.js Pages to Use CMS API

The following files have been created for you:
- `/src/lib/cms-api.ts` - CMS API client
- `/src/components/cms/DynamicComponent.tsx` - Dynamic component renderer

**Example: Dynamic Homepage**

Create `/src/app/page.tsx`:

```typescript
import { getPage, getSiteConfig } from '@/lib/cms-api';
import DynamicComponent from '@/components/cms/DynamicComponent';

export default async function HomePage() {
  const page = await getPage('homepage');
  const config = await getSiteConfig();

  return (
    <div>
      {page.components?.map((component) => (
        <DynamicComponent key={component.id} component={component} />
      ))}
    </div>
  );
}
```

**Example: Dynamic Products Page**

Create `/src/app/products/page.tsx`:

```typescript
import { getProducts } from '@/lib/cms-api';
import Link from 'next/link';

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="border rounded-lg p-6 hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-neutral-600">{product.tagline}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Example: Product Detail Page**

Create `/src/app/products/[slug]/page.tsx`:

```typescript
import { getProduct } from '@/lib/cms-api';

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProduct(params.slug);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-4">{product.name}</h1>
      <p className="text-xl text-neutral-600 mb-8">{product.tagline}</p>
      <div className="prose max-w-none">
        <p>{product.short_description}</p>
        {/* Render specifications, features, etc. */}
      </div>
    </div>
  );
}
```

### Step 3: Update Navigation

The CMS provides dynamic navigation. Update your navigation component:

```typescript
import { getSiteConfig } from '@/lib/cms-api';

export default async function Navigation() {
  const config = await getSiteConfig();

  return (
    <nav>
      {config.navigation.header.map((item) => (
        <a key={item.url} href={item.url}>
          {item.label}
        </a>
      ))}
    </nav>
  );
}
```

---

## 🧪 Part 4: Running Tests

### Backend Integration Tests

```bash
cd /home/user/ergopack-india/backend

# Run all tests
npm test

# Run specific test suites
npm test -- rbac.test.ts
npm test -- page-builder.test.ts
npm test -- seo-redirects.test.ts
npm test -- i18n.test.ts

# Run with coverage
npm run test:coverage
```

**Test Suites:**

1. **RBAC Tests** - Verifies role-based access control
2. **Page Builder Tests** - Tests drag-and-drop component reordering
3. **SEO Redirects Tests** - Tests redirect creation and public API
4. **i18n Tests** - Tests multi-language content retrieval

---

## 📊 Part 5: Using the Admin Panel

### Dashboard

- View overall statistics
- Recent form submissions
- Recent blog posts
- Analytics charts

### Products Module

1. **Create Product:**
   - Navigate to Products → New Product
   - Fill in: Name, Slug, Category, Product Line
   - Add specifications (key-value pairs in JSONB format)
   - Add features (array of strings)
   - Upload images to gallery
   - Attach brochures (PDFs)
   - Add video URLs
   - Configure SEO metadata
   - Publish

2. **i18n Support:**
   - Edit product in default language (English)
   - Switch to Hindi/German using language selector
   - Enter translated content
   - CMS automatically serves correct language based on URL

### Page Builder Module

1. **Edit Homepage:**
   - Navigate to Pages → Homepage
   - See list of components on the page
   - **Drag and drop** to reorder components
   - Click "Edit" on a component to change its content
   - Add new components from the component library
   - Remove unwanted components
   - Publish changes

2. **Available Components:**
   - Hero Banner
   - Call to Action
   - Features Grid
   - Product Carousel
   - Testimonials Slider
   - Statistics Section
   - Rich Text Block

### Blog Module

1. **Create Post:**
   - Navigate to Blog → New Post
   - Use Editor.js for rich content (headers, lists, images, quotes)
   - Add SEO metadata (title, description, keywords)
   - Set category and tags
   - Choose cover image
   - Save as draft or publish immediately

2. **Manage Posts:**
   - View all posts
   - Filter by status (draft, published)
   - Search by title
   - Edit or delete posts

### Forms & Leads Module

1. **Create Form:**
   - Navigate to Forms → New Form
   - Add fields (text, email, textarea, select)
   - Configure field validation
   - Set form settings (notifications, etc.)
   - Get embed code for frontend

2. **Manage Leads:**
   - View all form submissions
   - Filter by form type
   - Update status (New, Contacted, Qualified, Closed)
   - Add notes
   - Export to CSV

### SEO Module

1. **Manage Redirects:**
   - Navigate to SEO → Redirects
   - Add 301/302 redirects
   - Manage old URLs → new URLs
   - Activate/deactivate redirects

2. **Edit robots.txt:**
   - Navigate to SEO → robots.txt
   - Edit directly in the text editor
   - Save and publish

3. **Generate Sitemap:**
   - Navigate to SEO → Sitemap
   - Click "Regenerate Sitemap"
   - Sitemap is automatically created from published content

### Settings Module

1. **Site Settings:**
   - Company information
   - Logo and favicon upload
   - Contact details
   - Social media links

2. **Navigation Menus:**
   - Manage header navigation
   - Manage footer navigation
   - Drag and drop to reorder menu items
   - Add/remove links

3. **Languages:**
   - Enable/disable languages
   - Set default language
   - Configure language codes

### Users & Roles Module

1. **Create User:**
   - Navigate to Users → New User
   - Enter email, name, password
   - Assign role (Super Admin, Marketer, Sales, etc.)
   - User receives appropriate permissions

2. **Manage Roles:**
   - View role permissions
   - Create custom roles
   - Assign granular permissions

---

## 🔒 Security Best Practices

1. **Change Default Credentials:**
   ```bash
   # Login to admin panel and change admin password immediately
   ```

2. **Use Strong JWT Secrets:**
   ```bash
   # Generate strong secrets
   openssl rand -base64 64
   ```

3. **Enable HTTPS in Production:**
   - Use SSL/TLS certificates
   - Update CORS settings
   - Set secure cookie flags

4. **Database Security:**
   - Use strong database passwords
   - Limit database user permissions
   - Enable SSL connections

5. **Environment Variables:**
   - Never commit `.env` files
   - Use environment-specific configurations
   - Rotate secrets regularly

---

## 🚢 Deployment

### Backend Deployment

**Option 1: Docker**

Create `backend/Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 5000
CMD ["npm", "start"]
```

**Option 2: Traditional Server**

```bash
# On your server
git clone <repository>
cd backend
npm install
npm run build
npm start

# Use PM2 for process management
pm2 start dist/server.js --name cms-backend
```

### Admin Panel Deployment

```bash
cd admin
npm run build
# Deploy the 'dist' folder to any static hosting (Vercel, Netlify, S3, etc.)
```

### Next.js Frontend Deployment

```bash
cd /home/user/ergopack-india
npm run build
# Deploy to Vercel or any Next.js hosting
```

---

## 🐛 Troubleshooting

### Database Connection Errors

```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -U ergopack_admin -d ergopack_cms -h localhost
```

### Port Already in Use

```bash
# Find process using port 5000
lsof -i :5000

# Kill the process
kill -9 <PID>
```

### CORS Errors

- Verify `FRONTEND_URL` and `ADMIN_URL` in backend `.env`
- Check that frontend is using correct API URL

### Migration Errors

```bash
# Drop and recreate database
psql -U postgres
DROP DATABASE ergopack_cms;
CREATE DATABASE ergopack_cms;
\q

# Re-run migrations
npm run migrate
```

---

## 📚 Additional Resources

- **Backend API Documentation:** `http://localhost:5000/api-docs` (if Swagger is configured)
- **Admin Panel Guide:** `/admin/README.md`
- **Frontend Integration:** `/src/lib/cms-api.ts`

---

## 🎉 You're All Set!

Your headless CMS is now fully operational. You can:

1. ✅ Manage products, blog posts, and pages from the admin panel
2. ✅ Create dynamic pages with drag-and-drop components
3. ✅ Manage SEO, forms, and leads
4. ✅ Serve multi-language content
5. ✅ Integrate seamlessly with your Next.js frontend

**Next Steps:**
- Customize component designs in `/admin/src/components/cms/DynamicComponent.tsx`
- Add more component types in the database
- Configure Google Analytics integration
- Set up automated backups
- Configure production deployment

For support or questions, refer to the documentation or contact the development team.
