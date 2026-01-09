import { NextResponse, type NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

/**
 * Next.js Middleware for Ergopack India
 * 
 * Provides:
 * - Global rate limiting
 * - CORS protection
 * - Admin route protection
 * - Bot detection
 * - Security headers enforcement
 */

// =============================================================================
// CONFIGURATION
// =============================================================================

const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 100;

// In-memory rate limit store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Allowed origins for CORS
const ALLOWED_ORIGINS = new Set([
    'https://ergopack-india.com',
    'https://www.ergopack-india.com',
    'https://ergopack-india.netlify.app',
    'https://ergopack-india.vercel.app',
    'http://localhost:3000',
    'http://127.0.0.1:3000',
]);

// Paths that require authentication - Now protecting ALL /admin routes except login
// The admin layout also checks for session, but middleware provides first line of defense
const ADMIN_LOGIN_PATH = '/admin/login';
const ADMIN_PATH_PREFIX = '/admin';

// API paths that require authentication (GET requests for admin data)
const PROTECTED_API_PATHS = [
    '/api/product-inquiry', // GET requests need auth
    '/api/contact',         // GET requests need auth
    '/api/stats',
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function getClientIp(request: NextRequest): string {
    const forwardedFor = request.headers.get('x-forwarded-for');
    if (forwardedFor) {
        return forwardedFor.split(',')[0].trim();
    }
    return request.headers.get('x-real-ip') ||
        request.headers.get('cf-connecting-ip') ||
        'unknown';
}

function checkRateLimit(ip: string): { allowed: boolean; remaining: number } {
    const now = Date.now();
    const record = rateLimitStore.get(ip);

    // Cleanup old entries periodically (1% chance each request)
    if (Math.random() < 0.01) {
        for (const [key, value] of rateLimitStore.entries()) {
            if (value.resetTime < now) {
                rateLimitStore.delete(key);
            }
        }
    }

    if (!record || record.resetTime < now) {
        rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
        return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1 };
    }

    if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
        return { allowed: false, remaining: 0 };
    }

    record.count++;
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count };
}

function isValidOrigin(origin: string | null): boolean {
    if (!origin) return true; // Same-origin requests
    return ALLOWED_ORIGINS.has(origin) || origin.endsWith('.vercel.app');
}

// =============================================================================
// MAIN MIDDLEWARE
// =============================================================================

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const origin = request.headers.get('origin');
    const ip = getClientIp(request);

    // ----- CORS Preflight Handling -----
    if (request.method === 'OPTIONS') {
        return new NextResponse(null, {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': isValidOrigin(origin) ? (origin || '*') : '',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
                'Access-Control-Max-Age': '86400',
            },
        });
    }

    // ----- Rate Limiting for API routes -----
    if (pathname.startsWith('/api/')) {
        const { allowed, remaining } = checkRateLimit(ip);

        if (!allowed) {
            console.log(`🚫 Rate limit exceeded for IP: ${ip}`);
            return NextResponse.json(
                {
                    success: false,
                    error: 'Too many requests. Please try again later.',
                    retryAfter: 60
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': '60',
                        'X-RateLimit-Limit': String(RATE_LIMIT_MAX_REQUESTS),
                        'X-RateLimit-Remaining': '0',
                    }
                }
            );
        }

        // ----- Origin Validation for API routes -----
        if (origin && !isValidOrigin(origin)) {
            console.log(`🚫 Blocked request from invalid origin: ${origin}`);
            return NextResponse.json(
                { success: false, error: 'Forbidden' },
                { status: 403 }
            );
        }

        // ----- Protect admin API endpoints (GET requests) -----
        if (request.method === 'GET' && PROTECTED_API_PATHS.some(p => pathname.startsWith(p))) {
            // Exclude health checks
            if (!pathname.includes('health')) {
                const token = await getToken({ req: request });
                if (!token) {
                    return NextResponse.json(
                        { success: false, error: 'Authentication required' },
                        { status: 401 }
                    );
                }
            }
        }

        // Add rate limit headers to response
        const response = NextResponse.next();
        response.headers.set('X-RateLimit-Limit', String(RATE_LIMIT_MAX_REQUESTS));
        response.headers.set('X-RateLimit-Remaining', String(remaining));

        // Add CORS headers
        if (origin && isValidOrigin(origin)) {
            response.headers.set('Access-Control-Allow-Origin', origin);
        }

        return response;
    }

    // ----- Admin Route Protection (ALL /admin routes except login) -----
    if (pathname.startsWith(ADMIN_PATH_PREFIX) && pathname !== ADMIN_LOGIN_PATH) {
        const token = await getToken({ req: request });

        if (!token) {
            const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
            loginUrl.searchParams.set('callbackUrl', pathname);
            console.log(`🔒 Redirecting unauthenticated user from ${pathname} to login`);
            return NextResponse.redirect(loginUrl);
        }
    }

    // ----- Block suspicious user agents on sensitive paths -----
    const userAgent = request.headers.get('user-agent') || '';
    if (pathname.startsWith('/admin') || pathname.startsWith('/api/')) {
        const suspiciousAgents = /curl|wget|python-requests|scrapy|nikto|sqlmap/i;
        if (suspiciousAgents.test(userAgent)) {
            console.log(`🚫 Blocked suspicious user agent: ${userAgent.substring(0, 50)}`);
            return NextResponse.json(
                { success: false, error: 'Forbidden' },
                { status: 403 }
            );
        }
    }

    return NextResponse.next();
}

// =============================================================================
// MATCHER CONFIGURATION
// =============================================================================

export const config = {
    matcher: [
        // Match API routes
        '/api/:path*',
        // Match admin routes
        '/admin/:path*',
        // Skip static files and images
        '/((?!_next/static|_next/image|favicon.ico|public/).*)',
    ],
};
