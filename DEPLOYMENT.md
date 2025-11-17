# Deployment Guide - Ergopack India

## Quick Deploy to Vercel

This guide will help you deploy the Ergopack India website to Vercel.

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Push your code to GitHub** (if not already done)
   ```bash
   git push -u origin claude/deploy-to-vercel-01LSVhSotTGyykKUaMiix78C
   ```

2. **Visit Vercel Dashboard**
   - Go to [https://vercel.com](https://vercel.com)
   - Sign up or log in with your GitHub account

3. **Import Your Repository**
   - Click "Add New Project"
   - Select "Import Git Repository"
   - Choose `laxmi-narasimha26/ergopack-india`
   - Click "Import"

4. **Configure Your Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)

5. **Add Environment Variables**
   Click "Environment Variables" and add the following:

   ```
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB=ergopack-india

   NEXTAUTH_URL=https://your-domain.vercel.app
   NEXTAUTH_SECRET=generate_a_secure_random_string

   ADMIN_EMAIL=your_admin_email@example.com
   ADMIN_PASSWORD=your_secure_admin_password

   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your_email@gmail.com
   SMTP_PASSWORD=your_gmail_app_password
   EMAIL_FROM=noreply@ergopack-india.com
   EMAIL_TO=contact@ergopack-india.com

   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_API_URL=https://your-domain.vercel.app/api
   ```

6. **Deploy**
   - Click "Deploy"
   - Wait for the build to complete (usually 2-5 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed)
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

   Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? Choose your account
   - Link to existing project? `N` (for first deployment)
   - What's your project's name? `ergopack-india`
   - In which directory is your code located? `./`
   - Want to override the settings? `N`

4. **Set Environment Variables**
   ```bash
   vercel env add MONGODB_URI
   vercel env add NEXTAUTH_URL
   vercel env add NEXTAUTH_SECRET
   vercel env add ADMIN_EMAIL
   vercel env add ADMIN_PASSWORD
   vercel env add SMTP_HOST
   vercel env add SMTP_PORT
   vercel env add SMTP_USER
   vercel env add SMTP_PASSWORD
   vercel env add EMAIL_FROM
   vercel env add EMAIL_TO
   vercel env add NEXT_PUBLIC_APP_URL
   vercel env add NEXT_PUBLIC_API_URL
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

## Important Environment Variables

### Database Configuration

- **MONGODB_URI**: Your MongoDB connection string
  - For MongoDB Atlas: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
  - You can get this from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

### Authentication Configuration

- **NEXTAUTH_URL**: Your production URL (e.g., `https://ergopack-india.vercel.app`)
- **NEXTAUTH_SECRET**: Generate a secure random string
  - Run: `openssl rand -base64 32` to generate one

### Admin Credentials

- **ADMIN_EMAIL**: Your admin email address
- **ADMIN_PASSWORD**: A secure password for admin access

### Email Configuration

For Gmail SMTP:
1. Enable 2-factor authentication on your Gmail account
2. Generate an App Password:
   - Go to [Google Account Settings](https://myaccount.google.com/)
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
3. Use this app password for **SMTP_PASSWORD**

## Post-Deployment Steps

### 1. Set Up MongoDB Database

If you don't have a MongoDB database:
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user
4. Whitelist all IP addresses (0.0.0.0/0) for Vercel
5. Get your connection string
6. Add it to Vercel environment variables

### 2. Seed Admin User

After deployment, create your admin user:
```bash
npm run seed:admin
```

Or manually via your MongoDB database.

### 3. Custom Domain (Optional)

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed
5. Update **NEXTAUTH_URL** and **NEXT_PUBLIC_APP_URL** environment variables

### 4. Verify Deployment

Visit your deployed site and check:
- ✅ Homepage loads correctly
- ✅ Navigation works
- ✅ Contact form functions
- ✅ Admin login works
- ✅ Images and assets load
- ✅ Mobile responsiveness

## Troubleshooting

### Build Fails

**Error: Missing environment variables**
- Add all required environment variables in Vercel dashboard
- Redeploy after adding variables

**Error: Module not found**
- Check `package.json` for correct dependencies
- Clear Vercel cache and redeploy

### Database Connection Issues

**Error: MongoDB connection failed**
- Verify MongoDB URI is correct
- Check IP whitelist in MongoDB Atlas (add 0.0.0.0/0)
- Ensure network access is configured

### Email Not Sending

**Error: SMTP authentication failed**
- Use Gmail App Password, not regular password
- Verify SMTP settings are correct
- Check Gmail account has 2FA enabled

### Authentication Issues

**Error: NextAuth callback URL mismatch**
- Verify **NEXTAUTH_URL** matches your production URL
- Regenerate **NEXTAUTH_SECRET** if needed
- Clear browser cookies and try again

## Monitoring and Analytics

### Vercel Analytics (Built-in)

Vercel provides free analytics:
1. Go to your project dashboard
2. Click "Analytics" tab
3. View traffic, performance metrics

### Add Google Analytics (Optional)

1. Get your GA4 Measurement ID
2. Add to Vercel environment variables:
   ```
   NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
   ```
3. Redeploy

## Automatic Deployments

Once connected to GitHub:
- **Push to your branch** → Vercel creates a preview deployment
- **Merge to main** → Vercel deploys to production
- Each deployment gets a unique URL for testing

## Performance Optimization

Your Next.js app on Vercel includes:
- ✅ Automatic CDN distribution
- ✅ Edge caching
- ✅ Image optimization
- ✅ Automatic HTTPS
- ✅ Serverless functions
- ✅ Global deployment

## Cost

- **Free Tier**: Perfect for this project
  - Unlimited deployments
  - 100 GB bandwidth/month
  - Serverless function execution
  - Custom domains

## Support

- **Vercel Documentation**: [https://vercel.com/docs](https://vercel.com/docs)
- **Next.js Documentation**: [https://nextjs.org/docs](https://nextjs.org/docs)
- **Project Issues**: See CLAUDE.md or README.md

---

**Quick Start**: The fastest way to deploy is Option 1 (Vercel Dashboard). It takes about 5 minutes!

**Last Updated**: 2025-11-17
