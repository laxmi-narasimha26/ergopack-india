import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, isAuthenticated } from '@/lib/auth';
import { connectDB } from '@/lib/db/mongodb';
import { ContactRequestModel } from '@/lib/db/models/ContactRequest';
import { ApiResponse } from '@/types';

// PUT /api/contact/[id] - Update contact request status (protected)
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAuthenticated(session))) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = params;
    const data = await request.json();

    const contactRequest = await ContactRequestModel.findByIdAndUpdate(
      id,
      {
        status: data.status,
        notes: data.notes,
      },
      { new: true, runValidators: true }
    );

    if (!contactRequest) {
      return NextResponse.json(
        { success: false, error: 'Contact request not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse = {
      success: true,
      data: contactRequest,
      message: 'Contact request updated successfully',
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error updating contact request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update contact request' },
      { status: 500 }
    );
  }
}

// DELETE /api/contact/[id] - Delete contact request (protected)
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAuthenticated(session))) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const { id } = params;

    const contactRequest = await ContactRequestModel.findByIdAndDelete(id);

    if (!contactRequest) {
      return NextResponse.json(
        { success: false, error: 'Contact request not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse = {
      success: true,
      message: 'Contact request deleted successfully',
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error deleting contact request:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete contact request' },
      { status: 500 }
    );
  }
}
