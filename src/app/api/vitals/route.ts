import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Web Vitals:', body);
    }

    // In production, you would send this to your analytics service
    // Examples:
    // - Google Analytics
    // - Vercel Analytics
    // - Custom analytics endpoint
    // - Database storage

    // For now, we'll just acknowledge receipt
    return NextResponse.json({ success: true, message: 'Vitals received' }, { status: 200 });
  } catch (error) {
    console.error('Error processing vitals:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process vitals' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve stored vitals data
export async function GET(request: NextRequest) {
  // This could fetch aggregated vitals data from your database
  // For now, return a placeholder
  return NextResponse.json(
    {
      message: 'Web Vitals endpoint',
      metrics: [
        'LCP - Largest Contentful Paint',
        'FID - First Input Delay',
        'CLS - Cumulative Layout Shift',
        'FCP - First Contentful Paint',
        'TTFB - Time to First Byte',
        'INP - Interaction to Next Paint',
      ],
    },
    { status: 200 }
  );
}
