import mongoose, { Schema, Model } from 'mongoose';
import { ContactRequest } from '@/types';

const ContactRequestSchema = new Schema<ContactRequest>(
  {
    name: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    industry: {
      type: String,
      required: true,
      enum: ['pharmaceuticals', 'automotive', 'electronics', 'other'],
    },
    message: String,
    phone: String,
    status: {
      type: String,
      enum: ['new', 'contacted', 'qualified', 'converted', 'rejected'],
      default: 'new',
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

// Index for searching
ContactRequestSchema.index({ name: 'text', company: 'text', email: 'text' });

export const ContactRequestModel: Model<ContactRequest> =
  mongoose.models.ContactRequest ||
  mongoose.model<ContactRequest>('ContactRequest', ContactRequestSchema);
