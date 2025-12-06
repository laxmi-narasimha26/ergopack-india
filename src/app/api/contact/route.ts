import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';

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

// Rate limiting store (in-memory for simple deployment)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const windowMs = 60 * 60 * 1000; // 1 hour
  const maxRequests = 5;

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
    to: process.env.CONTACT_EMAIL || 'sales@ergopack.in',
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

    // Parse request body
    const body = await request.json();

    // Validate input
    const validatedData = contactSchema.parse(body);

    // Send notification emails
    await sendNotificationEmail(validatedData);

    // Log the submission (could be stored in a file or external service)
    console.log('New contact request:', {
      timestamp: new Date().toISOString(),
      name: validatedData.name,
      company: validatedData.company,
      email: validatedData.email,
      industry: validatedData.industry,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          'Contact request submitted successfully. We will get back to you within 24-48 hours.',
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
        error: 'Something went wrong. Please try again or contact us directly at sales@ergopack.in',
      },
      { status: 500 }
    );
  }
}

// Health check - no database needed
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Contact API is operational',
    contact: 'sales@ergopack.in',
  });
}
