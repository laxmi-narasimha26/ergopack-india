import mongoose, { Schema, Model } from 'mongoose';

export interface IProductInquiry {
    _id?: string;
    productName: string;
    productModel: string;
    name: string;
    mobile: string;
    email: string;
    company?: string;
    requirement: string;
    status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
    notes?: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const ProductInquirySchema = new Schema<IProductInquiry>(
    {
        productName: {
            type: String,
            required: true,
        },
        productModel: {
            type: String,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        mobile: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            lowercase: true,
        },
        company: {
            type: String,
            default: '',
        },
        requirement: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['new', 'contacted', 'qualified', 'converted', 'closed'],
            default: 'new',
        },
        notes: String,
    },
    {
        timestamps: true,
    }
);

// Index for searching
ProductInquirySchema.index({ name: 'text', company: 'text', email: 'text', productModel: 'text' });

export const ProductInquiryModel: Model<IProductInquiry> =
    mongoose.models.ProductInquiry ||
    mongoose.model<IProductInquiry>('ProductInquiry', ProductInquirySchema);
