/**
 * Security utilities for Ergopack India
 * Provides rate limiting, input validation, and anti-spam protection
 */

// =============================================================================
// RATE LIMITER
// =============================================================================

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

// In-memory store for rate limiting (works on serverless)
const rateLimitStores = new Map<string, Map<string, RateLimitRecord>>();

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
  identifier: string; // Unique identifier for this limiter
}

export class RateLimiter {
  private store: Map<string, RateLimitRecord>;
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
    // Use shared store per identifier to persist across function calls
    if (!rateLimitStores.has(config.identifier)) {
      rateLimitStores.set(config.identifier, new Map());
    }
    this.store = rateLimitStores.get(config.identifier)!;
  }

  /**
   * Check if a request should be allowed
   * @param key - Usually the client IP address
   * @returns Object with allowed status and remaining requests
   */
  check(key: string): { allowed: boolean; remaining: number; resetTime: number } {
    const now = Date.now();
    const record = this.store.get(key);

    // Clean up expired records periodically
    if (Math.random() < 0.1) {
      this.cleanup();
    }

    // No record or expired - allow and create new record
    if (!record || record.resetTime < now) {
      this.store.set(key, {
        count: 1,
        resetTime: now + this.config.windowMs,
      });
      return {
        allowed: true,
        remaining: this.config.maxRequests - 1,
        resetTime: now + this.config.windowMs,
      };
    }

    // Check if limit exceeded
    if (record.count >= this.config.maxRequests) {
      return {
        allowed: false,
        remaining: 0,
        resetTime: record.resetTime,
      };
    }

    // Increment and allow
    record.count++;
    return {
      allowed: true,
      remaining: this.config.maxRequests - record.count,
      resetTime: record.resetTime,
    };
  }

  /**
   * Clean up expired records to prevent memory leaks
   */
  private cleanup(): void {
    const now = Date.now();
    for (const [key, record] of this.store.entries()) {
      if (record.resetTime < now) {
        this.store.delete(key);
      }
    }
  }
}

// =============================================================================
// PRE-CONFIGURED RATE LIMITERS
// =============================================================================

// Global API rate limiter: 100 requests per minute
export const globalRateLimiter = new RateLimiter({
  identifier: 'global',
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 100,
});

// Contact form rate limiter: 5 requests per hour
export const contactRateLimiter = new RateLimiter({
  identifier: 'contact',
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 5,
});

// Product inquiry rate limiter: 10 requests per hour
export const inquiryRateLimiter = new RateLimiter({
  identifier: 'inquiry',
  windowMs: 60 * 60 * 1000, // 1 hour
  maxRequests: 10,
});

// Auth rate limiter: 10 requests per 15 minutes (brute force protection)
export const authRateLimiter = new RateLimiter({
  identifier: 'auth',
  windowMs: 15 * 60 * 1000, // 15 minutes
  maxRequests: 10,
});

// =============================================================================
// ORIGIN VALIDATION
// =============================================================================

const ALLOWED_ORIGINS = [
  'https://ergopack-india.com',
  'https://www.ergopack-india.com',
  'https://ergopack-india.netlify.app',
  'https://ergopack-india.vercel.app',
  // Development origins
  'http://localhost:3000',
  'http://127.0.0.1:3000',
];

/**
 * Validate if the request origin is allowed
 */
export function validateOrigin(origin: string | null): boolean {
  if (!origin) return true; // Same-origin requests don't have Origin header

  // Check against allowed origins
  if (ALLOWED_ORIGINS.includes(origin)) return true;

  // Check environment variable for additional origins
  const additionalOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
  if (additionalOrigins.includes(origin)) return true;

  return false;
}

/**
 * Get CORS headers for a response
 */
export function getCorsHeaders(origin: string | null): Record<string, string> {
  const allowedOrigin = validateOrigin(origin) ? origin || '*' : '';

  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400', // 24 hours
  };
}

// =============================================================================
// HONEYPOT ANTI-SPAM
// =============================================================================

/**
 * Check if honeypot field was filled (indicates bot)
 * Honeypot fields are hidden from users but bots fill them
 */
export function isHoneypotTriggered(data: Record<string, unknown>): boolean {
  // Common honeypot field names
  const honeypotFields = ['website', 'url', 'homepage', 'fax', 'address2'];

  for (const field of honeypotFields) {
    if (data[field] && String(data[field]).trim() !== '') {
      console.log(`🤖 Bot detected: Honeypot field "${field}" was filled`);
      return true;
    }
  }

  return false;
}

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
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Validate and sanitize email
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
}

/**
 * Validate phone number (Indian format primarily)
 */
export function isValidPhone(phone: string): boolean {
  // Remove spaces, dashes, and parentheses
  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Indian mobile: 10 digits, optionally prefixed with +91 or 0
  const phoneRegex = /^(\+91|0)?[6-9]\d{9}$/;
  return phoneRegex.test(cleaned);
}

// =============================================================================
// CLIENT IP EXTRACTION
// =============================================================================

/**
 * Extract client IP from request headers
 * Handles various proxy configurations
 */
export function getClientIp(headers: Headers): string {
  // Try various headers in order of preference
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    // Take the first IP in the list (client IP)
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) return realIp;

  const cfConnectingIp = headers.get('cf-connecting-ip');
  if (cfConnectingIp) return cfConnectingIp;

  return 'unknown';
}

// =============================================================================
// SUSPICIOUS ACTIVITY DETECTION
// =============================================================================

const suspiciousPatterns = [
  /\b(script|javascript|onclick|onerror)\b/i,
  /<[^>]*>/, // HTML tags
  /\b(SELECT|INSERT|UPDATE|DELETE|DROP|UNION)\b/i, // SQL keywords
  /\.\.\//, // Path traversal
];

/**
 * Check if input contains suspicious patterns
 */
export function containsSuspiciousContent(input: string): boolean {
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(input)) {
      console.log(`⚠️ Suspicious content detected: ${pattern}`);
      return true;
    }
  }
  return false;
}

// =============================================================================
// USER AGENT VALIDATION
// =============================================================================

const blockedUserAgents = [
  /curl/i,
  /wget/i,
  /python-requests/i,
  /scrapy/i,
  /bot/i,
  /spider/i,
  /crawl/i,
];

// Whitelist for good bots
const allowedBots = [
  /googlebot/i,
  /bingbot/i,
  /yandexbot/i,
  /duckduckbot/i,
  /facebookexternalhit/i,
  /twitterbot/i,
  /linkedinbot/i,
];

/**
 * Check if user agent should be blocked
 * Allows search engine bots but blocks scrapers
 */
export function shouldBlockUserAgent(userAgent: string | null): boolean {
  if (!userAgent) return true; // Block empty user agents

  // Allow known good bots
  for (const pattern of allowedBots) {
    if (pattern.test(userAgent)) return false;
  }

  // Block known bad patterns
  for (const pattern of blockedUserAgents) {
    if (pattern.test(userAgent)) {
      console.log(`🚫 Blocked user agent: ${userAgent}`);
      return true;
    }
  }

  return false;
}

// =============================================================================
// TIMING ATTACK PROTECTION
// =============================================================================

/**
 * Add random delay to prevent timing attacks on auth
 */
export async function addRandomDelay(minMs: number = 100, maxMs: number = 300): Promise<void> {
  const delay = Math.random() * (maxMs - minMs) + minMs;
  await new Promise((resolve) => setTimeout(resolve, delay));
}
