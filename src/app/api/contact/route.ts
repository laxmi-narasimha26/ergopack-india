import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDB } from '@/lib/db/mongodb';
import { ContactRequestModel } from '@/lib/db/models/ContactRequest';
import { ContactFormData } from '@/types';

// Validation schema matching the frontend
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().min(2).max(100),
  jobTitle: z.string().min(2).max(100),
  email: z.string().email(),
  industry: z.enum(['pharmaceuticals', 'automotive', 'electronics', 'other']),
  phone: z.string().optional(),
  message: z.string().max(1000).optional(),
});

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Connect to database
    await connectDB();

    // Create contact request
    const contactRequest = await ContactRequestModel.create({
      name: validatedData.name,
      company: validatedData.company,
      jobTitle: validatedData.jobTitle,
      email: validatedData.email.toLowerCase(),
      industry: validatedData.industry,
      phone: validatedData.phone,
      message: validatedData.message,
      status: 'new',
    });

    // TODO: Send email notification to admin and confirmation to user
    // This would typically use nodemailer or a service like SendGrid
    // For now, we'll just log it
    console.log('New contact request:', {
      id: contactRequest._id,
      name: contactRequest.name,
      company: contactRequest.company,
      email: contactRequest.email,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Contact request submitted successfully',
        data: {
          id: contactRequest._id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Contact API error:', error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid input data',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Handle duplicate email (if you want to prevent multiple submissions)
    if (error instanceof Error && error.message.includes('duplicate')) {
      return NextResponse.json(
        {
          success: false,
          error: 'A request with this email has already been submitted',
        },
        { status: 409 }
      );
    }

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit contact request. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve contact requests (admin only - would need auth)
export async function GET(request: NextRequest) {
  try {
    // TODO: Add authentication check here
    // For now, this is just a placeholder

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');

    await connectDB();

    const query: any = {};
    if (status) {
      query.status = status;
    }

    const total = await ContactRequestModel.countDocuments(query);
    const requests = await ContactRequestModel.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({
      success: true,
      data: requests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Contact GET API error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to retrieve contact requests',
      },
      { status: 500 }
    );
  }
}
