import mongoose, { Schema, Model } from 'mongoose';

// Attachment interface for file uploads
export interface IAttachment {
  fileName: string;
  fileUrl: string;
  fileType: string;
  fileSize: number;
  uploadedAt: Date;
}

export interface IProductInquiry {
  _id?: string;
  // Contact Information
  name: string;
  mobile: string;
  email: string;
  company?: string;
  designation?: string;

  // Product Information (auto-picked or selected)
  productName: string;
  productModel: string;
  productCategory?: string;

  // Inquiry Details
  requirement: string;
  urgency?: 'low' | 'medium' | 'high' | 'urgent';
  preferredContactMethod?: 'phone' | 'email' | 'whatsapp';
  preferredContactTime?: string;

  // File Attachments
  attachments: IAttachment[];

  // Tracking Information
  sourcePage?: string;
  ipAddress?: string;
  userAgent?: string;

  // Admin Management
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  notes?: string;
  followUpDate?: Date;

  // Timestamps
  createdAt?: Date;
  updatedAt?: Date;
}

// Attachment Schema
const AttachmentSchema = new Schema<IAttachment>(
  {
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const ProductInquirySchema = new Schema<IProductInquiry>(
  {
    // Contact Information
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    company: {
      type: String,
      default: '',
      trim: true,
    },
    designation: {
      type: String,
      default: '',
      trim: true,
    },

    // Product Information
    productName: {
      type: String,
      required: true,
    },
    productModel: {
      type: String,
      required: true,
    },
    productCategory: {
      type: String,
      default: '',
    },

    // Inquiry Details
    requirement: {
      type: String,
      required: true,
    },
    urgency: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    preferredContactMethod: {
      type: String,
      enum: ['phone', 'email', 'whatsapp'],
      default: 'phone',
    },
    preferredContactTime: {
      type: String,
      default: '',
    },

    // File Attachments
    attachments: {
      type: [AttachmentSchema],
      default: [],
    },

    // Tracking Information
    sourcePage: {
      type: String,
      default: '',
    },
    ipAddress: {
      type: String,
      default: '',
    },
    userAgent: {
      type: String,
      default: '',
    },

    // Admin Management
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'converted', 'closed'],
      default: 'new',
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium',
    },
    assignedTo: {
      type: String,
      default: '',
    },
    notes: {
      type: String,
      default: '',
    },
    followUpDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for efficient querying
ProductInquirySchema.index({ name: 'text', company: 'text', email: 'text', productModel: 'text' });
ProductInquirySchema.index({ status: 1, createdAt: -1 });
ProductInquirySchema.index({ email: 1 });
ProductInquirySchema.index({ productModel: 1 });
ProductInquirySchema.index({ priority: 1, status: 1 });

export const ProductInquiryModel: Model<IProductInquiry> =
  mongoose.models.ProductInquiry ||
  mongoose.model<IProductInquiry>('ProductInquiry', ProductInquirySchema);
