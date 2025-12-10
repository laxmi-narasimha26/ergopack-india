import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import { ProductInquiryModel } from '@/lib/db/models/ProductInquiry';

// Connect to MongoDB
async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;

    const uri = process.env.MONGODB_URI;
    if (!uri) {
        return null;
    }

    try {
        await mongoose.connect(uri);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        return null;
    }
}

// GET single inquiry
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        if (mongoose.connection.readyState < 1) {
            return NextResponse.json(
                { success: false, error: 'Database not configured' },
                { status: 503 }
            );
        }

        const inquiry = await ProductInquiryModel.findById(params.id).lean();

        if (!inquiry) {
            return NextResponse.json(
                { success: false, error: 'Inquiry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: inquiry });
    } catch (error) {
        console.error('Error fetching inquiry:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch inquiry' },
            { status: 500 }
        );
    }
}

// PUT update inquiry (status, notes)
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        if (mongoose.connection.readyState < 1) {
            return NextResponse.json(
                { success: false, error: 'Database not configured' },
                { status: 503 }
            );
        }

        const body = await request.json();
        const { status, notes } = body;

        const updateData: Record<string, string> = {};
        if (status) updateData.status = status;
        if (notes !== undefined) updateData.notes = notes;

        const inquiry = await ProductInquiryModel.findByIdAndUpdate(
            params.id,
            { $set: updateData },
            { new: true }
        ).lean();

        if (!inquiry) {
            return NextResponse.json(
                { success: false, error: 'Inquiry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, data: inquiry });
    } catch (error) {
        console.error('Error updating inquiry:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update inquiry' },
            { status: 500 }
        );
    }
}

// DELETE inquiry
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        await connectDB();

        if (mongoose.connection.readyState < 1) {
            return NextResponse.json(
                { success: false, error: 'Database not configured' },
                { status: 503 }
            );
        }

        const inquiry = await ProductInquiryModel.findByIdAndDelete(params.id);

        if (!inquiry) {
            return NextResponse.json(
                { success: false, error: 'Inquiry not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, message: 'Inquiry deleted' });
    } catch (error) {
        console.error('Error deleting inquiry:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete inquiry' },
            { status: 500 }
        );
    }
}
