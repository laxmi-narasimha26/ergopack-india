import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { getClientIp, getCorsHeaders } from '@/lib/security';

// Allowed file types
const ALLOWED_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

// Max file size: 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Rate limiting for uploads (stricter than regular API)
const uploadRateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkUploadRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxUploads = 20; // Max 20 uploads per hour

  const record = uploadRateLimitStore.get(ip);

  if (!record || record.resetTime < now) {
    uploadRateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxUploads) {
    return false;
  }

  record.count++;
  return true;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  try {
    const ip = getClientIp(request.headers);

    // Rate limit check
    if (!checkUploadRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many uploads. Please try again later.' },
        { status: 429, headers: corsHeaders }
      );
    }

    // Check if Blob token is configured
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.error('BLOB_READ_WRITE_TOKEN not configured');
      return NextResponse.json(
        { success: false, error: 'File upload service not configured.' },
        { status: 503, headers: corsHeaders }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid file type. Allowed: JPG, PNG, GIF, WebP, PDF, DOC, DOCX',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 5MB.' },
        { status: 400, headers: corsHeaders }
      );
    }

    // Generate secure file name
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 8);
    const extension = file.name.split('.').pop()?.toLowerCase() || 'bin';
    const secureFileName = `inquiry-${timestamp}-${randomString}.${extension}`;

    // Upload to Vercel Blob
    const blob = await put(secureFileName, file, {
      access: 'public',
      addRandomSuffix: false,
    });

    console.log('✅ File uploaded:', {
      fileName: file.name,
      secureFileName,
      fileType: file.type,
      fileSize: file.size,
      url: blob.url,
      ip,
    });

    return NextResponse.json(
      {
        success: true,
        file: {
          fileName: file.name,
          fileUrl: blob.url,
          fileType: file.type,
          fileSize: file.size,
          uploadedAt: new Date().toISOString(),
        },
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    console.error('File upload error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to upload file. Please try again.' },
      { status: 500, headers: getCorsHeaders(null) }
    );
  }
}

// Handle preflight requests
export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, {
    status: 200,
    headers: getCorsHeaders(origin),
  });
}
