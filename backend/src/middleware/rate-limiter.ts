/**
 * Rate Limiter Middleware
 *
 * Provides rate limiting for API endpoints to prevent abuse
 * and ensure fair usage of server resources.
 */

import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

interface RateLimiterOptions {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  message?: string; // Error message when rate limited
  keyGenerator?: (req: Request) => string; // Custom key generator
}

// In-memory store (for production, use Redis)
const stores: { [key: string]: RateLimitStore } = {};

// Clean up expired entries periodically
setInterval(() => {
  const now = Date.now();
  for (const storeName of Object.keys(stores)) {
    const store = stores[storeName];
    for (const key of Object.keys(store)) {
      if (store[key].resetTime < now) {
        delete store[key];
      }
    }
  }
}, 60000); // Cleanup every minute

/**
 * Create a rate limiter middleware
 */
export function createRateLimiter(name: string, options: RateLimiterOptions) {
  const {
    windowMs,
    maxRequests,
    message = 'Too many requests, please try again later.',
    keyGenerator = (req: Request) => req.ip || 'unknown',
  } = options;

  // Initialize store for this limiter
  if (!stores[name]) {
    stores[name] = {};
  }
  const store = stores[name];

  return (req: Request, res: Response, next: NextFunction) => {
    const key = keyGenerator(req);
    const now = Date.now();

    if (!store[key] || store[key].resetTime < now) {
      // First request or window expired
      store[key] = {
        count: 1,
        resetTime: now + windowMs,
      };
    } else {
      store[key].count++;
    }

    // Set rate limit headers
    res.setHeader('X-RateLimit-Limit', maxRequests);
    res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - store[key].count));
    res.setHeader('X-RateLimit-Reset', Math.ceil(store[key].resetTime / 1000));

    if (store[key].count > maxRequests) {
      res.status(429).json({
        success: false,
        message,
        retryAfter: Math.ceil((store[key].resetTime - now) / 1000),
      });
      return;
    }

    next();
  };
}

// =============================================================================
// PRE-CONFIGURED LIMITERS
// =============================================================================

/**
 * General API rate limiter
 * 100 requests per minute per IP
 */
export const generalLimiter = createRateLimiter('general', {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
  message: 'Too many requests from this IP, please try again after a minute.',
});

/**
 * Auth rate limiter (stricter for login/password reset)
 * 5 requests per 15 minutes per IP
 */
export const authLimiter = createRateLimiter('auth', {
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 5,
  message: 'Too many authentication attempts, please try again later.',
});

/**
 * Contact form rate limiter
 * 3 requests per hour per IP
 */
export const contactLimiter = createRateLimiter('contact', {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 3,
  message: 'Too many contact form submissions, please try again later.',
});

/**
 * File upload rate limiter
 * 10 uploads per hour per IP
 */
export const uploadLimiter = createRateLimiter('upload', {
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10,
  message: 'Too many file uploads, please try again later.',
});

/**
 * Search/Query rate limiter
 * 30 requests per minute per IP
 */
export const searchLimiter = createRateLimiter('search', {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 30,
  message: 'Too many search requests, please try again after a minute.',
});
