# ErgoPack India - Premium Full-Stack Website

A comprehensive, premium full-stack website for ErgoPack India featuring advanced Three.js animations, complete admin panel, blog system, and AI chatbot.

![ErgoPack India](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)

## 🌟 Features

### **Frontend**
- ✨ Premium homepage with Three.js hero animations and WebGL effects
- 🎯 Interactive 3D product visualizations (ChainLance mechanism with glowing pathways)
- 📱 Fully responsive design optimized for all devices
- 🎨 Quiet luxury aesthetic with dark theme and gold/amber accents
- ⚡ Advanced GSAP scroll animations throughout
- 🤖 AI-powered chatbot for real-time visitor engagement
- 🔍 Fully SEO optimized with meta tags, JSON-LD, sitemap, and robots.txt

### **Product Pages**
- **X-pert Line:** Interactive 360° 3D model viewer with clickable hotspots
- **E-conomy Line:** 3D visualizations highlighting reliability
- **Comparison:** Side-by-side product comparison with detailed specs
- **Industries:** Targeted pages for Pharmaceuticals, Automotive, and Electronics

### **Blog System**
- Full-featured blog with Markdown/MDX support
- Search and category filtering
- Featured posts section
- Related posts suggestions
- Social share buttons (Twitter, Facebook, LinkedIn)
- View counter and automatic read time calculation
- SEO optimization for each post

### **Admin Panel** 🔐
- 📊 Comprehensive dashboard with real-time analytics
- 📝 Blog management (create, edit, delete, publish/unpublish, featured toggle)
- 📧 Contact request tracking with status workflow
- 🖼️ Media library with multi-file upload support
- 👥 User management system
- 🔐 Secure authentication with NextAuth.js
- 📈 Visual analytics (requests by industry, monthly trends)

### **Backend**
- RESTful API endpoints for all CRUD operations
- MongoDB database with Mongoose ODM
- NextAuth authentication with bcrypt password hashing
- Email notification system (configurable via SMTP)
- Secure file upload handling
- Input validation with Zod
- Protected admin routes

## 🛠️ Tech Stack

### **Core Framework**
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### **3D Graphics & Animations**
- **Three.js** - WebGL 3D graphics library
- **@react-three/fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers and abstractions
- **GSAP** - Professional animation library with ScrollTrigger
- **Framer Motion** - React animation library

### **UI Components**
- **Radix UI** - Accessible, unstyled component primitives
- **Lucide React** - Beautiful & consistent icon set
- **Class Variance Authority** - Component variant management
- **Tailwind Merge** - Utility class merging

### **Forms & Validation**
- **React Hook Form** - Performant form state management
- **Zod** - TypeScript-first schema validation

### **Authentication**
- **NextAuth.js** - Complete authentication solution
- **bcryptjs** - Secure password hashing

### **Content & Markdown**
- **MDX** - Markdown with JSX components
- **React Markdown** - Markdown rendering
- **Gray Matter** - Front matter parsing
- **Reading Time** - Automatic read time estimation

### **Utilities**
- **Axios** - HTTP client
- **SWR** - React hooks for data fetching
- **React Hot Toast** - Toast notifications
- **date-fns** - Date utility library

## 📦 Installation & Setup

### **Prerequisites**
- Node.js 18+ and npm
- MongoDB database (local or MongoDB Atlas)
- Git

### **1. Clone the Repository**
```bash
git clone <repository-url>
cd ergopack-india
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Environment Setup**

Create `.env.local` in the root directory:

```env
# Database
MONGODB_URI=mongodb://localhost:27017/ergopack-india
MONGODB_DB=ergopack-india

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-generate-with-openssl

# Admin Credentials (CHANGE THESE!)
ADMIN_EMAIL=admin@ergopack-india.com
ADMIN_PASSWORD=SecurePassword123!

# Email (Optional - for contact form notifications)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-specific-password
EMAIL_FROM=noreply@ergopack-india.com
EMAIL_TO=contact@ergopack-india.com

# Application URLs
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

**Generate a secure NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
```

### **4. Database Setup**

**Option A: Local MongoDB**
```bash
# Install MongoDB (macOS)
brew install mongodb-community@7.0
brew services start mongodb-community@7.0

# Verify it's running
mongosh
```

**Option B: MongoDB Atlas (Cloud - Free Tier)**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a new cluster (free M0 tier available)
3. Whitelist your IP address
4. Create database user
5. Get connection string and update `MONGODB_URI`

### **5. Seed Admin User**
```bash
npm run seed:admin
```

This creates an admin user with credentials from `.env.local`.

### **6. Start Development Server**
```bash
npm run dev
```

**Access the application:**
- **Website:** http://localhost:3000
- **Admin Panel:** http://localhost:3000/admin/login

## 🚀 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run seed:admin   # Create/reset admin user
```

## 📁 Project Structure

```
ergopack-india/
├── public/                    # Static assets
│   ├── images/               # Image files
│   ├── videos/               # Video files
│   ├── models/               # 3D model files
│   └── fonts/                # Custom fonts
├── scripts/
│   └── seed-admin.js         # Admin user seed script
├── src/
│   ├── app/                  # Next.js 14 App Router
│   │   ├── admin/            # Admin panel routes
│   │   │   ├── layout.tsx    # Admin layout with auth
│   │   │   ├── page.tsx      # Dashboard
│   │   │   ├── blogs/        # Blog management
│   │   │   ├── media/        # Media library
│   │   │   ├── requests/     # Request tracking
│   │   │   └── login/        # Admin login
│   │   ├── api/              # API routes
│   │   │   ├── auth/         # NextAuth endpoints
│   │   │   ├── blog/         # Blog CRUD
│   │   │   ├── contact/      # Contact requests
│   │   │   ├── media/        # Media upload
│   │   │   └── stats/        # Analytics
│   │   ├── blog/             # Public blog pages
│   │   │   ├── page.tsx      # Blog listing
│   │   │   └── [slug]/       # Individual posts
│   │   ├── contact/          # Contact page
│   │   ├── industries/       # Industries page
│   │   ├── products/         # Product pages
│   │   │   ├── xpert-line/
│   │   │   ├── economy-line/
│   │   │   └── compare/
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Homepage
│   │   ├── not-found.tsx     # 404 page
│   │   ├── error.tsx         # Error boundary
│   │   ├── sitemap.ts        # Dynamic sitemap
│   │   └── robots.ts         # Robots.txt
│   ├── components/
│   │   ├── admin/            # Admin components
│   │   ├── forms/            # Form components
│   │   ├── layout/           # Layout components
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── MainLayout.tsx
│   │   ├── three/            # Three.js components
│   │   │   ├── HeroScene.tsx
│   │   │   └── ChainLanceAnimation.tsx
│   │   ├── ui/               # Reusable UI components
│   │   ├── Chatbot.tsx       # AI chatbot
│   │   └── Providers.tsx     # Context providers
│   ├── lib/
│   │   ├── auth.ts           # NextAuth config
│   │   ├── db/               # Database
│   │   │   ├── mongodb.ts    # Connection
│   │   │   └── models/       # Mongoose models
│   │   ├── hooks/            # Custom hooks
│   │   │   └── useScrollAnimation.ts
│   │   └── utils/            # Utility functions
│   ├── styles/
│   │   └── globals.css       # Global styles
│   └── types/
│       └── index.ts          # TypeScript types
├── .env.example              # Environment template
├── .gitignore
├── next.config.js            # Next.js config
├── package.json
├── postcss.config.js
├── tailwind.config.ts        # Tailwind config
├── tsconfig.json             # TypeScript config
└── README.md
```

## 🎨 Design System

### **Color Palette**
```css
/* Dark Backgrounds */
--dark-950: #0a0a15
--dark-900: #1a1a2e
--dark-800: #2c2c3d

/* Accent Colors */
--accent-600: #dc2626  /* Primary red */
--accent-500: #ef4444
--amber-600: #d97706   /* Gold accent */
--amber-500: #f59e0b
```

### **Typography**
- **Font:** Inter (Google Fonts)
- **Heading Scale:** text-7xl → text-5xl → text-4xl
- **Body:** text-base (16px) to text-lg (18px)

### **Spacing**
- **Container:** max-w-7xl with px-6
- **Section Padding:** py-16 to py-24
- **Element Spacing:** space-y-4, space-y-8

## 📖 Usage Guide

### **Admin Panel Workflow**

**1. Login**
- Navigate to `/admin/login`
- Use credentials from `.env.local`
- Session persists across browser refreshes

**2. Dashboard**
- View key metrics (total requests, blogs, views)
- See recent activity
- Charts showing trends

**3. Managing Contact Requests**
- View all form submissions
- Filter by status: New, Contacted, Qualified, Converted, Rejected
- Search by name, company, or email
- Update status inline
- Add internal notes

**4. Blog Management**
- Create: Rich editor, cover image, SEO fields
- Edit: Update existing posts
- Publish/Unpublish: Toggle visibility
- Feature: Mark posts for homepage
- Delete: Remove posts

**5. Media Library**
- Upload images, videos, 3D models, documents
- View all uploaded files
- Delete unused media

### **Creating Blog Posts**

1. Go to **Admin → Blogs → New Blog**
2. Fill in fields:
   - **Title:** Post headline
   - **Slug:** URL-friendly identifier (auto-generated from title)
   - **Excerpt:** Short summary (150-200 chars)
   - **Content:** Full markdown content
   - **Cover Image:** URL to header image
   - **Author:** Your name
   - **Category:** e.g., "Industry News", "Product Updates"
   - **Tags:** Comma-separated keywords
   - **SEO Title/Description:** For search engines
3. Toggle **Published** to make live
4. Toggle **Featured** to show on homepage
5. Click **Create Blog Post**

### **Chatbot Customization**

Edit `/src/components/Chatbot.tsx` to:
- Add more response patterns
- Customize quick reply buttons
- Integrate with live chat service (optional)
- Connect to backend chat API

## 🔒 Security Best Practices

- ✅ All passwords hashed with bcrypt (10 rounds)
- ✅ Admin routes protected by NextAuth middleware
- ✅ API routes validate input with Zod
- ✅ Environment variables for sensitive data
- ✅ CSRF protection via NextAuth
- ✅ MongoDB injection prevention via Mongoose
- ✅ XSS protection via React (auto-escaping)
- ⚠️ Add rate limiting in production
- ⚠️ Use HTTPS in production
- ⚠️ Whitelist MongoDB IP addresses

## 🚢 Deployment

### **Vercel (Recommended)**

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
vercel
```

3. **Set Environment Variables in Vercel Dashboard:**
- Go to Project Settings → Environment Variables
- Add all variables from `.env.local`
- Don't forget to change production values!

4. **Connect MongoDB Atlas**

### **Other Platforms**

- **Netlify:** Supports Next.js with `next export` (limitations apply)
- **AWS/DigitalOcean:** Deploy as Docker container or Node.js app
- **Railway/Render:** One-click deployments with environment config

### **Production Checklist**

- [ ] Update `NEXTAUTH_SECRET` to secure random string
- [ ] Change `NEXTAUTH_URL` to production domain
- [ ] Update admin email/password
- [ ] Configure production MongoDB URI
- [ ] Set up SMTP for email notifications
- [ ] Test all pages and functionality
- [ ] Run `npm run build` to check for errors
- [ ] Configure CDN for static assets
- [ ] Set up monitoring (Sentry, LogRocket, etc.)
- [ ] Add Google Analytics or privacy-friendly alternative
- [ ] Test SEO with Google Search Console
- [ ] Set up SSL certificate (auto with Vercel)

## 🐛 Troubleshooting

### **"Cannot connect to MongoDB"**
```bash
# Check MongoDB is running
mongosh

# Check connection string in .env.local
# For Atlas, verify IP whitelist
```

### **"Admin login not working"**
```bash
# Reset admin credentials
npm run seed:admin

# Verify NEXTAUTH_SECRET is set
# Clear browser cookies/storage
```

### **Build Errors**
```bash
# Clear cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check types
npm run type-check
```

### **Three.js Performance Issues**
- Three.js scenes automatically simplify on mobile
- Reduce particle count if needed
- Check browser console for WebGL errors

## 📊 Analytics & Monitoring

Integrate analytics:
```javascript
// Add to src/app/layout.tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_ID" />
```

## 🤝 Contributing

This is a commercial project. For questions or support:
- Email: dev@ergopack-india.com

## 📄 License

Copyright © 2024 ErgoPack India. All rights reserved.

## 🙏 Acknowledgments

- **ErgoPack Germany** for product information
- **Design Inspiration:** Porsche Consulting, Vonova, Fictiv
- **Technologies:** Next.js, Three.js, GSAP, Tailwind CSS
- **Strategic Blueprint:** See `instructions.md` for positioning details

---

**Version:** 2.0.0
**Last Updated:** 2024-11-17
**Built With:** Precision engineering, like the products we represent.
