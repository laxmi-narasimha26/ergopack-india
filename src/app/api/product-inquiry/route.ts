import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import mongoose from 'mongoose';
import { ProductInquiryModel } from '@/lib/db/models/ProductInquiry';

// Validation schema
const inquirySchema = z.object({
    productName: z.string().min(1, 'Product name is required'),
    productModel: z.string().min(1, 'Product model is required'),
    name: z.string().min(2, 'Name must be at least 2 characters').max(100),
    mobile: z.string().min(10, 'Please enter a valid mobile number').max(15),
    email: z.string().email('Please enter a valid email address'),
    company: z.string().max(100).optional(),
    requirement: z.string().min(10, 'Please describe your requirement').max(2000),
});

// Rate limiting store
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
    const now = Date.now();
    const windowMs = 60 * 60 * 1000; // 1 hour
    const maxRequests = 10;

    const record = rateLimitStore.get(ip);

    if (!record || record.resetTime < now) {
        rateLimitStore.set(ip, { count: 1, resetTime: now + windowMs });
        return true;
    }

    if (record.count >= maxRequests) {
        return false;
    }

    record.count++;
    return true;
}

// Connect to MongoDB
async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        console.warn('MONGODB_URI not configured - inquiries will only be sent via email');
        return null;
    }

    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        return null;
    }
}

// Send email notification
async function sendEmailNotification(data: z.infer<typeof inquirySchema>) {
    const resendApiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL || 'sales@benz-packaging.com';

    if (!resendApiKey) {
        console.log('RESEND_API_KEY not configured - skipping email notification');
        console.log('New inquiry received:', {
            product: data.productModel,
            name: data.name,
            email: data.email,
            mobile: data.mobile,
        });
        return;
    }

    try {
        // Send notification to admin
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
                from: 'ErgoPack India <noreply@ergopack-india.com>',
                to: [contactEmail],
                subject: `New Inquiry: ${data.productModel} from ${data.name}`,
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #C8102E; border-bottom: 2px solid #C8102E; padding-bottom: 10px;">
              New Product Inquiry
            </h2>
            
            <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 15px; color: #333;">Product Interest</h3>
              <p style="margin: 5px 0;"><strong>Product:</strong> ${data.productName}</p>
              <p style="margin: 5px 0;"><strong>Model:</strong> ${data.productModel}</p>
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee; width: 120px;"><strong>Name:</strong></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Mobile:</strong></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                  <a href="tel:${data.mobile}" style="color: #C8102E;">${data.mobile}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">
                  <a href="mailto:${data.email}" style="color: #C8102E;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
                <td style="padding: 12px; border-bottom: 1px solid #eee;">${data.company || 'Not provided'}</td>
              </tr>
            </table>
            
            <div style="margin: 20px 0;">
              <h3 style="color: #333;">Requirement:</h3>
              <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; line-height: 1.6;">
                ${data.requirement}
              </p>
            </div>
            
            <p style="color: #888; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              Received at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
            </p>
          </div>
        `,
            }),
        });

        // Send confirmation to user
        await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${resendApiKey}`,
            },
            body: JSON.stringify({
                from: 'ErgoPack India <noreply@ergopack-india.com>',
                to: [data.email],
                subject: `Thank you for your inquiry - ${data.productModel}`,
                html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #C8102E;">Thank You for Your Interest</h2>
            
            <p>Dear ${data.name},</p>
            
            <p>Thank you for your inquiry about the <strong>${data.productName}</strong>. 
            Our team has received your request and will contact you within 24-48 business hours.</p>
            
            <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="margin: 0 0 10px; color: #333;">Your Inquiry Summary</h3>
              <p style="margin: 5px 0;"><strong>Product:</strong> ${data.productModel}</p>
              <p style="margin: 5px 0;"><strong>Contact:</strong> ${data.mobile}</p>
            </div>
            
            <p>In the meantime, feel free to explore our products at 
            <a href="https://ergopack-india.netlify.app/products" style="color: #C8102E;">
              ergopack-india.netlify.app
            </a>.</p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
            
            <p style="color: #888; font-size: 12px;">
              <strong>ErgoPack India</strong> | Benz Packaging Solutions<br>
              Premium Pallet Strapping Solutions | Made in Germany
            </p>
          </div>
        `,
            }),
        });

        console.log('Email notifications sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
}

export async function POST(request: NextRequest) {
    try {
        // Get client IP for rate limiting
        const ip =
            request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Too many requests. Please try again later.',
                },
                { status: 429 }
            );
        }

        // Parse and validate request body
        const body = await request.json();
        const validatedData = inquirySchema.parse(body);

        // Connect to database and save inquiry
        await connectDB();

        let savedInquiry = null;
        if (mongoose.connection.readyState >= 1) {
            savedInquiry = await ProductInquiryModel.create(validatedData);
            console.log('Inquiry saved to database:', savedInquiry._id);
        }

        // Send email notifications
        await sendEmailNotification(validatedData);

        return NextResponse.json(
            {
                success: true,
                message: 'Your inquiry has been submitted successfully. Our team will contact you soon.',
                id: savedInquiry?._id,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error('Product inquiry API error:', error);

        if (error instanceof z.ZodError) {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Please check your input and try again.',
                    details: error.errors.map((e) => ({
                        field: e.path.join('.'),
                        message: e.message,
                    })),
                },
                { status: 400 }
            );
        }

        return NextResponse.json(
            {
                success: false,
                error: 'Something went wrong. Please try again or contact us directly.',
            },
            { status: 500 }
        );
    }
}

// GET - Fetch inquiries (for admin panel)
export async function GET(request: NextRequest) {
    try {
        await connectDB();

        if (mongoose.connection.readyState < 1) {
            return NextResponse.json(
                { success: false, error: 'Database not configured' },
                { status: 503 }
            );
        }

        const { searchParams } = new URL(request.url);
        const page = parseInt(searchParams.get('page') || '1');
        const limit = parseInt(searchParams.get('limit') || '20');
        const status = searchParams.get('status');
        const product = searchParams.get('product');

        const filter: Record<string, string> = {};
        if (status && status !== 'all') filter.status = status;
        if (product) filter.productModel = product;

        const skip = (page - 1) * limit;

        const [inquiries, total] = await Promise.all([
            ProductInquiryModel.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .lean(),
            ProductInquiryModel.countDocuments(filter),
        ]);

        return NextResponse.json({
            success: true,
            data: inquiries,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error('Error fetching inquiries:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch inquiries' },
            { status: 500 }
        );
    }
}
