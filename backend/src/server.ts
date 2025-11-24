import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fileUpload from 'express-fileupload';

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

// =====================================================
// Middleware
// =====================================================

// CORS
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || 'http://localhost:3000',
      process.env.ADMIN_URL || 'http://localhost:5173',
    ],
    credentials: true,
  })
);

// Body parsing
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

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
  console.log(`${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

// =====================================================
// API Routes
// =====================================================

// Public routes (no auth required)
app.use('/api/public', publicRoutes);

// Auth routes
app.use('/api/auth', authRoutes);

// Protected routes (auth required)
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/forms', formRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/i18n', i18nRoutes);
app.use('/api/settings', settingsRoutes);

// Health check
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

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
  res.status(500).json({
    success: false,
    message: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
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
    ====================================
  `);
});

export default app;
