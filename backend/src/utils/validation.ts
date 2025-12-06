/**
 * Input Validation Schemas and Middleware
 *
 * Uses Zod for runtime type validation of API inputs
 */

import { z } from 'zod';
import { Request, Response, NextFunction } from 'express';

// =============================================================================
// VALIDATION MIDDLEWARE FACTORY
// =============================================================================

/**
 * Create validation middleware from a Zod schema
 */
export function validate<T extends z.ZodType>(
  schema: T,
  source: 'body' | 'query' | 'params' = 'body'
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = req[source];
      const result = schema.safeParse(data);

      if (!result.success) {
        const errors = result.error.errors.map((err) => ({
          field: err.path.join('.'),
          message: err.message,
        }));

        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors,
        });
      }

      // Replace with validated data
      req[source] = result.data;
      next();
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Validation error',
      });
    }
  };
}

// =============================================================================
// COMMON SCHEMAS
// =============================================================================

/**
 * MongoDB ObjectId validation
 */
export const objectIdSchema = z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ID format');

/**
 * Pagination query parameters
 */
export const paginationSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  search: z.string().optional(),
  sort: z.string().optional(),
  order: z.enum(['asc', 'desc']).optional(),
});

/**
 * Email validation
 */
export const emailSchema = z.string().email('Invalid email address');

/**
 * URL validation
 */
export const urlSchema = z.string().url('Invalid URL format');

/**
 * Phone validation (Indian format)
 */
export const phoneSchema = z
  .string()
  .regex(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/, 'Invalid Indian phone number');

// =============================================================================
// AUTH SCHEMAS
// =============================================================================

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: emailSchema,
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  role: z.enum(['admin', 'editor', 'viewer']).default('viewer'),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, 'Current password is required'),
  newPassword: z
    .string()
    .min(8, 'New password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// =============================================================================
// SEO SCHEMAS
// =============================================================================

export const seoSettingsSchema = z.object({
  globalTitle: z.string().max(60, 'Title must be under 60 characters').optional(),
  globalDescription: z.string().max(160, 'Description must be under 160 characters').optional(),
  globalKeywords: z.array(z.string()).optional(),
  ogDefaultImage: z.string().optional(),
  twitterHandle: z.string().optional(),
  googleAnalyticsId: z.string().optional(),
  googleSearchConsoleId: z.string().optional(),
  robotsContent: z.string().optional(),
});

export const redirectSchema = z.object({
  sourceUrl: z.string().min(1, 'Source URL is required'),
  destinationUrl: z.string().min(1, 'Destination URL is required'),
  statusCode: z
    .enum(['301', '302'])
    .transform(Number)
    .or(z.literal(301))
    .or(z.literal(302))
    .optional(),
  isActive: z.boolean().optional(),
});

export const pageSeoSchema = z.object({
  slug: z.string().optional(),
  metaTitle: z.string().max(60).optional(),
  metaDescription: z.string().max(160).optional(),
  metaKeywords: z.array(z.string()).optional(),
  canonicalUrl: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().optional(),
  ogType: z.string().optional(),
  twitterTitle: z.string().optional(),
  twitterDescription: z.string().optional(),
  twitterImage: z.string().optional(),
  sitemapPriority: z.number().min(0).max(1).optional(),
  sitemapChangeFreq: z
    .enum(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'])
    .optional(),
  excludeFromSitemap: z.boolean().optional(),
  noIndex: z.boolean().optional(),
  noFollow: z.boolean().optional(),
});

// =============================================================================
// CONTACT FORM SCHEMA
// =============================================================================

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name is required').max(100),
  email: emailSchema,
  phone: phoneSchema.optional(),
  company: z.string().max(200).optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(5000),
  product: z.string().optional(),
  source: z.string().optional(),
});

// =============================================================================
// PRODUCT SCHEMAS
// =============================================================================

export const productSchema = z.object({
  name: z.string().min(2, 'Product name is required').max(200),
  slug: z.string().min(2).max(200).optional(),
  description: z.string().optional(),
  shortDescription: z.string().max(500).optional(),
  category: z.string().optional(),
  line: z.enum(['xpert', 'economy']).optional(),
  features: z.array(z.string()).optional(),
  specifications: z.record(z.string(), z.any()).optional(),
  images: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
});

// =============================================================================
// BLOG POST SCHEMAS
// =============================================================================

export const postSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters').max(200),
  slug: z.string().min(2).max(200).optional(),
  excerpt: z.string().max(500).optional(),
  content: z.string().min(50, 'Content must be at least 50 characters'),
  coverImage: z.string().optional(),
  category: z.string().optional(),
  tags: z.array(z.string()).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  publishedAt: z.string().datetime().optional(),
});

// =============================================================================
// INPUT SANITIZATION
// =============================================================================

/**
 * Sanitize string input to prevent XSS
 */
export function sanitizeString(input: string): string {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

/**
 * Sanitize object recursively
 */
export function sanitizeObject(obj: Record<string, any>): Record<string, any> {
  const sanitized: Record<string, any> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'string') {
      sanitized[key] = sanitizeString(value);
    } else if (Array.isArray(value)) {
      sanitized[key] = value.map((item) =>
        typeof item === 'string' ? sanitizeString(item) : item
      );
    } else if (value && typeof value === 'object') {
      sanitized[key] = sanitizeObject(value);
    } else {
      sanitized[key] = value;
    }
  }

  return sanitized;
}

/**
 * Sanitization middleware
 */
export function sanitize(req: Request, res: Response, next: NextFunction) {
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }
  next();
}
