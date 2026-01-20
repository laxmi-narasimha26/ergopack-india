import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import {
  contactRateLimiter,
  getClientIp,
  isHoneypotTriggered,
  containsSuspiciousContent,
  sanitizeString,
  getCorsHeaders,
} from '@/lib/security';
import { connectDB } from '@/lib/db/mongodb';
import { ContactRequestModel } from '@/lib/db/models/ContactRequest';

// Validation schema matching the frontend
const contactSchema = z.object({
  name: z.string().min(2).max(100),
  company: z.string().min(2).max(100),
  jobTitle: z.string().min(2).max(100),
  email: z.string().email(),
  industry: z.enum(['pharmaceuticals', 'automotive', 'electronics', 'other']),
  phone: z.string().optional(),
  message: z.string().max(1000).optional(),
  // Honeypot fields (should be empty)
  website: z.string().optional(),
  url: z.string().optional(),
});

// Create email transporter
function getTransporter() {
  // Use environment variables for email configuration
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function sendNotificationEmail(data: z.infer<typeof contactSchema>) {
  const transporter = getTransporter();

  // Email to admin
  const adminMailOptions = {
    from: process.env.SMTP_FROM || 'noreply@ergopack-india.com',
    to: process.env.CONTACT_EMAIL || 'marketing@benz-packaging.com',
    subject: `New Contact Request from ${data.name} - ${data.company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C8102E;">New Contact Request</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Name:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Company:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.company}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Job Title:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.jobTitle}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Phone:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 10px; border-bottom: 1px solid #eee;"><strong>Industry:</strong></td>
            <td style="padding: 10px; border-bottom: 1px solid #eee;">${data.industry}</td>
          </tr>
        </table>
        ${
          data.message
            ? `
          <div style="margin-top: 20px;">
            <h3>Message:</h3>
            <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.message}</p>
          </div>
        `
            : ''
        }
        <p style="color: #888; font-size: 12px; margin-top: 20px;">
          Received at: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
        </p>
      </div>
    `,
  };

  // Confirmation email to user
  const userMailOptions = {
    from: process.env.SMTP_FROM || 'noreply@ergopack-india.com',
    to: data.email,
    subject: 'Thank you for contacting ErgoPack India',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #C8102E;">Thank You for Your Interest</h2>
        <p>Dear ${data.name},</p>
        <p>Thank you for contacting ErgoPack India. We have received your inquiry and our team will get back to you within 24-48 business hours.</p>
        <p><strong>Your Request Summary:</strong></p>
        <ul>
          <li>Company: ${data.company}</li>
          <li>Industry: ${data.industry}</li>
        </ul>
        <p>In the meantime, feel free to explore our products at <a href="https://ergopack-india.com/products">ergopack-india.com/products</a>.</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
        <p style="color: #888; font-size: 12px;">
          ErgoPack India | Premium Pallet Strapping Solutions<br>
          Made in Germany. Trusted Worldwide.
        </p>
      </div>
    `,
  };

  // Send both emails
  try {
    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions),
      ]);
      console.log('Notification emails sent successfully');
    } else {
      // If email not configured, just log the submission
      console.log('Email not configured. Contact submission:', {
        name: data.name,
        email: data.email,
        company: data.company,
        industry: data.industry,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.error('Failed to send email notification:', error);
    // Don't throw - we still want to accept the submission even if email fails
  }
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  try {
    // Get client IP for rate limiting
    const ip = getClientIp(request.headers);

    // Check rate limit using centralized limiter
    const rateLimitResult = contactRateLimiter.check(ip);
    if (!rateLimitResult.allowed) {
      console.log(`🚫 Contact rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Too many requests. Please try again later.',
        },
        {
          status: 429,
          headers: {
            ...corsHeaders,
            'Retry-After': '3600',
          },
        }
      );
    }

    // Parse request body
    const body = await request.json();

    // Check honeypot fields (bot detection)
    if (isHoneypotTriggered(body)) {
      console.log(`🤖 Bot detected via honeypot from IP: ${ip}`);
      // Return success to not alert the bot, but don't process
      return NextResponse.json(
        {
          success: true,
          message: 'Contact request submitted successfully.',
        },
        { status: 201, headers: corsHeaders }
      );
    }

    // Check for suspicious content
    const textContent = `${body.name} ${body.company} ${body.message || ''}`;
    if (containsSuspiciousContent(textContent)) {
      console.log(`⚠️ Suspicious content blocked from IP: ${ip}`);
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid content detected. Please remove any special characters.',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Sanitize text fields
    const sanitizedData = {
      ...validatedData,
      name: sanitizeString(validatedData.name),
      company: sanitizeString(validatedData.company),
      jobTitle: sanitizeString(validatedData.jobTitle),
      message: validatedData.message ? sanitizeString(validatedData.message) : undefined,
    };

    // Send notification emails
    await sendNotificationEmail(sanitizedData);

    // Save to database for admin panel
    await connectDB();
    const contactRequest = await ContactRequestModel.create({
      name: sanitizedData.name,
      company: sanitizedData.company,
      jobTitle: sanitizedData.jobTitle,
      email: sanitizedData.email,
      industry: sanitizedData.industry,
      phone: sanitizedData.phone,
      message: sanitizedData.message,
      status: 'new',
    });

    // Log the submission
    console.log('✅ New contact request saved:', {
      id: contactRequest._id,
      timestamp: new Date().toISOString(),
      name: sanitizedData.name,
      company: sanitizedData.company,
      email: sanitizedData.email,
      industry: sanitizedData.industry,
      ip: ip,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          'Contact request submitted successfully. We will get back to you within 24-48 hours.',
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    console.error('Contact API error:', error);

    // Handle validation errors
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

    // Generic error response
    return NextResponse.json(
      {
        success: false,
        error:
          'Something went wrong. Please try again or contact us directly at marketing@benz-packaging.com',
      },
      { status: 500 }
    );
  }
}

// GET - Fetch paginated contact requests for admin panel
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const status = url.searchParams.get('status');

    const skip = (page - 1) * limit;

    // Build query filter
    const filter: Record<string, string> = {};
    if (status && status !== 'all') {
      filter.status = status;
    }

    // Fetch requests with pagination
    const [requests, total] = await Promise.all([
      ContactRequestModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
      ContactRequestModel.countDocuments(filter),
    ]);

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
    console.error('Error fetching contact requests:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch contact requests',
        data: [],
        pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
      },
      { status: 500 }
    );
  }
}
