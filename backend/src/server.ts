import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fileUpload from 'express-fileupload';

// Middleware
import {
  generalLimiter,
  authLimiter,
  contactLimiter,
  uploadLimiter,
} from './middleware/rate-limiter';
import { sanitize } from './utils/validation';

// Routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import productRoutes from './routes/products';
import postRoutes from './routes/posts';
import mediaRoutes from './routes/media';
import pageRoutes from './routes/pages';
import formRoutes from './routes/forms';
import seoRoutes from './routes/seo';
import i18nRoutes from './routes/i18n';
import settingsRoutes from './routes/settings';
import dashboardRoutes from './routes/dashboard';
import publicRoutes from './routes/public';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production';

// =====================================================
// Security Middleware
// =====================================================

// Trust proxy for rate limiting behind reverse proxy
if (isProduction) {
  app.set('trust proxy', 1);
}

// Security headers (inline implementation - helmet alternative)
app.use((req: Request, res: Response, next: NextFunction) => {
  // Prevent clickjacking
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  // Prevent MIME type sniffing
  res.setHeader('X-Content-Type-Options', 'nosniff');
  // XSS protection
  res.setHeader('X-XSS-Protection', '1; mode=block');
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Remove X-Powered-By
  res.removeHeader('X-Powered-By');

  if (isProduction) {
    // HSTS for production
    res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  }

  next();
});

// CORS
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      process.env.ADMIN_URL || 'http://localhost:5173',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  })
);

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Input sanitization (XSS prevention)
app.use(sanitize);

// File upload
app.use(
  fileUpload({
    limits: { fileSize: parseInt(process.env.MAX_FILE_SIZE || '10485760') },
    abortOnLimit: true,
    createParentPath: true,
  })
);

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Request logging
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? 'error' : 'info';

    if (!isProduction || logLevel === 'error') {
      console.log(
        `[${logLevel.toUpperCase()}] ${req.method} ${req.path} ${res.statusCode} ${duration}ms`
      );
    }
  });

  next();
});

// =====================================================
// API Routes
// =====================================================

// Health check (no rate limiting)
app.get('/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
  });
});

// Apply general rate limiting to all API routes
app.use('/api', generalLimiter);

// Public routes (no auth required)
app.use('/api/public', publicRoutes);

// Auth routes (stricter rate limiting)
app.use('/api/auth', authLimiter, authRoutes);

// Protected routes (auth required)
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/media', uploadLimiter, mediaRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/forms', contactLimiter, formRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/i18n', i18nRoutes);
app.use('/api/settings', settingsRoutes);

// 404 handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
  });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  // Don't leak error details in production
  const message = isProduction ? 'Internal server error' : err.message;

  res.status(500).json({
    success: false,
    message,
    ...(isProduction ? {} : { stack: err.stack }),
  });
});

// =====================================================
// Start Server
// =====================================================

app.listen(PORT, () => {
  console.log(`
    🚀 ErgopackIndia CMS Backend Server
    ====================================
    Environment: ${process.env.NODE_ENV || 'development'}
    Port: ${PORT}
    API: http://localhost:${PORT}
    Health: http://localhost:${PORT}/health
    Security: Rate limiting enabled
    ====================================
  `);
});

export default app;
