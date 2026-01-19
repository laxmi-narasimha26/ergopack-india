import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import mongoose from 'mongoose';
import { ProductInquiryModel, IAttachment } from '@/lib/db/models/ProductInquiry';
import { connectDB } from '@/lib/db/mongodb';
import {
  inquiryRateLimiter,
  getClientIp,
  isHoneypotTriggered,
  containsSuspiciousContent,
  sanitizeString,
  getCorsHeaders,
  isValidPhone,
} from '@/lib/security';

// Attachment validation schema
const attachmentSchema = z.object({
  fileName: z.string(),
  fileUrl: z.string().url(),
  fileType: z.string(),
  fileSize: z.number(),
  uploadedAt: z.string(),
});

// Validation schema
const inquirySchema = z.object({
  // Product Info
  productName: z.string().min(1, 'Product name is required'),
  productModel: z.string().min(1, 'Product model is required'),
  productCategory: z.string().optional(),

  // Contact Info
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  mobile: z.string().min(10, 'Please enter a valid mobile number').max(15),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().max(100).optional(),
  designation: z.string().max(100).optional(),

  // Inquiry Details
  requirement: z.string().min(10, 'Please describe your requirement').max(2000),
  urgency: z.enum(['low', 'medium', 'high', 'urgent']).optional(),
  preferredContactMethod: z.enum(['phone', 'email', 'whatsapp']).optional(),
  preferredContactTime: z.string().optional(),

  // Attachments
  attachments: z.array(attachmentSchema).optional(),

  // Tracking
  sourcePage: z.string().optional(),

  // Honeypot fields (should be empty)
  website: z.string().optional(),
  fax: z.string().optional(),
});

// Get notification email recipients
function getEmailRecipients(): string[] {
  // Primary email
  const primaryEmail = process.env.CONTACT_EMAIL || 'sales@benz-packaging.com';

  // Additional emails (comma-separated)
  const additionalEmails = process.env.NOTIFICATION_EMAILS?.split(',').map((e) => e.trim()) || [];

  // Combine and deduplicate
  const allEmails = [primaryEmail, ...additionalEmails].filter(Boolean);
  return [...new Set(allEmails)];
}

// Get urgency badge HTML
function getUrgencyBadge(urgency: string): string {
  const colors: Record<string, string> = {
    low: '#6B7280',
    medium: '#F59E0B',
    high: '#EF4444',
    urgent: '#DC2626',
  };
  const color = colors[urgency] || colors.medium;
  return `<span style="background: ${color}; color: white; padding: 2px 8px; border-radius: 4px; font-size: 12px; text-transform: uppercase;">${urgency}</span>`;
}

// Send email notification to multiple recipients
async function sendEmailNotification(
  data: z.infer<typeof inquirySchema>,
  ip: string,
  inquiryId?: string
) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const recipients = getEmailRecipients();

  if (!resendApiKey) {
    console.log('RESEND_API_KEY not configured - skipping email notification');
    console.log('New inquiry received:', {
      product: data.productModel,
      name: data.name,
      email: data.email,
      mobile: data.mobile,
      recipients: recipients,
    });
    return;
  }

  // Build attachments section HTML
  let attachmentsHtml = '';
  if (data.attachments && data.attachments.length > 0) {
    attachmentsHtml = `
            <div style="margin: 20px 0; padding: 15px; background: #FFF9E6; border-radius: 8px; border-left: 4px solid #F59E0B;">
                <h3 style="margin: 0 0 10px; color: #B45309;">📎 Attachments (${data.attachments.length})</h3>
                <ul style="margin: 0; padding-left: 20px;">
                    ${data.attachments
                      .map(
                        (att) => `
                        <li style="margin: 5px 0;">
                            <a href="${att.fileUrl}" style="color: #C8102E;" target="_blank">${att.fileName}</a>
                            <span style="color: #888; font-size: 12px;"> (${(att.fileSize / 1024).toFixed(1)} KB)</span>
                        </li>
                    `
                      )
                      .join('')}
                </ul>
            </div>
        `;
  }

  const adminEmailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #C8102E; border-bottom: 2px solid #C8102E; padding-bottom: 10px;">
                🔔 New Product Inquiry ${getUrgencyBadge(data.urgency || 'medium')}
            </h2>
            
            <div style="background: #f8f8f8; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="margin: 0 0 15px; color: #333;">Product Interest</h3>
                <p style="margin: 5px 0;"><strong>Product:</strong> ${data.productName}</p>
                <p style="margin: 5px 0;"><strong>Model:</strong> ${data.productModel}</p>
                ${data.productCategory ? `<p style="margin: 5px 0;"><strong>Category:</strong> ${data.productCategory}</p>` : ''}
            </div>
            
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #eee; width: 140px;"><strong>Name:</strong></td>
                    <td style="padding: 12px; border-bottom: 1px solid #eee;">${data.name}</td>
                </tr>
                ${
                  data.designation
                    ? `
                <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Designation:</strong></td>
                    <td style="padding: 12px; border-bottom: 1px solid #eee;">${data.designation}</td>
                </tr>
                `
                    : ''
                }
                <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Mobile:</strong></td>
                    <td style="padding: 12px; border-bottom: 1px solid #eee;">
                        <a href="tel:${data.mobile}" style="color: #C8102E;">${data.mobile}</a>
                        ${data.preferredContactMethod === 'whatsapp' ? ` | <a href="https://wa.me/${data.mobile.replace(/\D/g, '')}" style="color: #25D366;">WhatsApp</a>` : ''}
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
                <tr>
                    <td style="padding: 12px; border-bottom: 1px solid #eee;"><strong>Preferred Contact:</strong></td>
                    <td style="padding: 12px; border-bottom: 1px solid #eee;">${data.preferredContactMethod || 'Phone'}</td>
                </tr>
            </table>
            
            <div style="margin: 20px 0;">
                <h3 style="color: #333;">Requirement:</h3>
                <p style="background: #f5f5f5; padding: 15px; border-radius: 5px; line-height: 1.6;">
                    ${data.requirement}
                </p>
            </div>
            
            ${attachmentsHtml}
            
            <div style="margin-top: 30px; padding: 15px; background: #f0f0f0; border-radius: 8px; font-size: 12px; color: #666;">
                <p style="margin: 5px 0;"><strong>Source Page:</strong> ${data.sourcePage || 'Unknown'}</p>
                <p style="margin: 5px 0;"><strong>Inquiry ID:</strong> ${inquiryId || 'Not saved to DB'}</p>
                <p style="margin: 5px 0;"><strong>IP Address:</strong> ${ip}</p>
                <p style="margin: 5px 0;"><strong>Received:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
            </div>
        </div>
    `;

  try {
    // Send notification to all admin recipients
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendApiKey}`,
      },
      body: JSON.stringify({
        from: 'ErgoPack India <noreply@ergopack-india.com>',
        to: recipients,
        subject: `🔔 New Inquiry: ${data.productModel} from ${data.name} [${data.urgency?.toUpperCase() || 'MEDIUM'}]`,
        html: adminEmailHtml,
      }),
    });

    console.log(`✅ Notification emails sent to: ${recipients.join(', ')}`);

    // Send confirmation to customer
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
                            ${data.attachments && data.attachments.length > 0 ? `<p style="margin: 5px 0;"><strong>Attachments:</strong> ${data.attachments.length} file(s)</p>` : ''}
                        </div>
                        
                        <p>In the meantime, feel free to explore our products at 
                        <a href="https://ergopack-india.com/products" style="color: #C8102E;">ergopack-india.com</a>.</p>
                        
                        <p>For urgent queries, you can reach us at:</p>
                        <ul>
                            <li>Phone: +91 XXXXXXXXXX</li>
                            <li>Email: sales@ergopack-india.com</li>
                        </ul>
                        
                        <hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">
                        
                        <p style="color: #888; font-size: 12px;">
                            <strong>ErgoPack India</strong> | Benz Packaging Solutions<br>
                            Premium Pallet Strapping Solutions | Made in Germany
                        </p>
                    </div>
                `,
      }),
    });

    console.log(`✅ Confirmation email sent to: ${data.email}`);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  try {
    // Get client IP for rate limiting and tracking
    const ip = getClientIp(request.headers);
    const userAgent = request.headers.get('user-agent') || '';

    // Check rate limit using centralized limiter
    const rateLimitResult = inquiryRateLimiter.check(ip);
    if (!rateLimitResult.allowed) {
      console.log(`🚫 Inquiry rate limit exceeded for IP: ${ip}`);
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
          message: 'Your inquiry has been submitted successfully.',
        },
        { status: 201, headers: corsHeaders }
      );
    }

    // Check for suspicious content
    const textContent = `${body.name} ${body.company || ''} ${body.requirement}`;
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

    // Validate phone number format
    if (body.mobile && !isValidPhone(body.mobile)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please enter a valid Indian mobile number.',
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Validate input
    const validatedData = inquirySchema.parse(body);

    // Sanitize text fields
    const sanitizedData = {
      ...validatedData,
      name: sanitizeString(validatedData.name),
      productName: sanitizeString(validatedData.productName),
      productModel: sanitizeString(validatedData.productModel),
      company: validatedData.company ? sanitizeString(validatedData.company) : undefined,
      designation: validatedData.designation
        ? sanitizeString(validatedData.designation)
        : undefined,
      requirement: sanitizeString(validatedData.requirement),
      // Add tracking info
      ipAddress: ip,
      userAgent: userAgent,
    };

    // Connect to database and save inquiry
    await connectDB();

    // Transform attachments for database
    const dbAttachments: IAttachment[] = (sanitizedData.attachments || []).map((att) => ({
      fileName: att.fileName,
      fileUrl: att.fileUrl,
      fileType: att.fileType,
      fileSize: att.fileSize,
      uploadedAt: new Date(att.uploadedAt),
    }));

    const savedInquiry = await ProductInquiryModel.create({
      ...sanitizedData,
      attachments: dbAttachments,
      status: 'new',
      priority:
        sanitizedData.urgency === 'urgent' || sanitizedData.urgency === 'high' ? 'high' : 'medium',
    });
    console.log('✅ Inquiry saved to database:', savedInquiry._id);

    // Send email notifications
    await sendEmailNotification(sanitizedData, ip, savedInquiry?._id?.toString());

    console.log('✅ New product inquiry:', {
      timestamp: new Date().toISOString(),
      product: sanitizedData.productModel,
      name: sanitizedData.name,
      email: sanitizedData.email,
      attachments: sanitizedData.attachments?.length || 0,
      ip: ip,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Your inquiry has been submitted successfully. Our team will contact you soon.',
        id: savedInquiry?._id,
      },
      { status: 201, headers: corsHeaders }
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
        { status: 400, headers: getCorsHeaders(null) }
      );
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Something went wrong. Please try again or contact us directly.',
      },
      { status: 500, headers: getCorsHeaders(null) }
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
    const priority = searchParams.get('priority');
    const search = searchParams.get('search');

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const filter: Record<string, any> = {};
    if (status && status !== 'all') filter.status = status;
    if (product) filter.productModel = product;
    if (priority && priority !== 'all') filter.priority = priority;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { productModel: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [inquiries, total] = await Promise.all([
      ProductInquiryModel.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
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
