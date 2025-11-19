import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, isAuthenticated } from '@/lib/auth';
import { connectDB } from '@/lib/db/mongodb';
import { BlogModel } from '@/lib/db/models/Blog';
import { ApiResponse } from '@/types';
import readingTime from 'reading-time';

// GET /api/blog/[id] - Get single blog by ID or slug
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();

    const { id } = params;

    // Try to find by ID first, then by slug
    let blog = await BlogModel.findById(id).lean();

    if (!blog) {
      blog = await BlogModel.findOne({ slug: id }).lean();
    }

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Check if blog is published (unless user is authenticated)
    const session = await getServerSession(authOptions);
    if (!blog.published && !await isAuthenticated(session)) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Increment view count for published blogs
    if (blog.published) {
      await BlogModel.findByIdAndUpdate(blog._id, { $inc: { views: 1 } });
    }

    const response: ApiResponse = {
      success: true,
      data: blog,
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch blog' },
      { status: 500 }
    );
  }
}

// PUT /api/blog/[id] - Update blog (protected)
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!await isAuthenticated(session)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = params;
    const data = await request.json();

    // Find existing blog
    const existingBlog = await BlogModel.findById(id);

    if (!existingBlog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    // Calculate read time if content changed
    let readTimeMinutes = existingBlog.readTime;
    if (data.content && data.content !== existingBlog.content) {
      const stats = readingTime(data.content);
      readTimeMinutes = Math.ceil(stats.minutes);
    }

    // Check if slug already exists (if slug is being changed)
    if (data.slug && data.slug !== existingBlog.slug) {
      const duplicateSlug = await BlogModel.findOne({ slug: data.slug });
      if (duplicateSlug) {
        return NextResponse.json(
          { success: false, error: 'A blog with this slug already exists' },
          { status: 400 }
        );
      }
    }

    // Update blog
    const updateData: any = {
      ...data,
      readTime: readTimeMinutes,
    };

    // Update SEO if provided
    if (data.seoTitle || data.seoDescription || data.seoKeywords) {
      updateData.seo = {
        title: data.seoTitle || existingBlog.seo?.title || data.title,
        description: data.seoDescription || existingBlog.seo?.description || data.excerpt,
        keywords: data.seoKeywords || existingBlog.seo?.keywords || [],
      };
    }

    // Set publishedAt if being published for the first time
    if (data.published && !existingBlog.published) {
      updateData.publishedAt = new Date();
    }

    const blog = await BlogModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    const response: ApiResponse = {
      success: true,
      data: blog,
      message: 'Blog updated successfully',
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error updating blog:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update blog' },
      { status: 500 }
    );
  }
}

// DELETE /api/blog/[id] - Delete blog (protected)
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!await isAuthenticated(session)) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { id } = params;

    const blog = await BlogModel.findByIdAndDelete(id);

    if (!blog) {
      return NextResponse.json(
        { success: false, error: 'Blog not found' },
        { status: 404 }
      );
    }

    const response: ApiResponse = {
      success: true,
      message: 'Blog deleted successfully',
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error deleting blog:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete blog' },
      { status: 500 }
    );
  }
}
