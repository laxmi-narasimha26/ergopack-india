import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, isAuthenticated } from '@/lib/auth';
import { connectDB } from '@/lib/db/mongodb';
import { BlogModel } from '@/lib/db/models/Blog';
import { PaginatedResponse, ApiResponse } from '@/types';
import readingTime from 'reading-time';

// GET /api/blog - List blogs with pagination, search, and filters
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';
    const featured = searchParams.get('featured') === 'true';
    const published = searchParams.get('published') !== 'false'; // Default to published only

    const skip = (page - 1) * limit;

    // Build query
    const query: any = {};

    // Only show published blogs to public (unless admin)
    const session = await getServerSession(authOptions);
    if (!session || published) {
      query.published = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    if (category) {
      query.category = category;
    }

    if (featured) {
      query.featured = true;
    }

    // Get total count
    const total = await BlogModel.countDocuments(query);

    // Get blogs
    const blogs = await BlogModel.find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .select('-content') // Exclude full content in list view
      .lean();

    const response: PaginatedResponse<any> = {
      success: true,
      data: blogs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };

    return NextResponse.json(response);
  } catch (error: any) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch blogs' }, { status: 500 });
  }
}

// POST /api/blog - Create new blog (protected)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!(await isAuthenticated(session))) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();

    const data = await request.json();

    // Calculate read time
    const stats = readingTime(data.content);
    const readTimeMinutes = Math.ceil(stats.minutes);

    // Create slug if not provided
    const slug =
      data.slug ||
      data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const existingBlog = await BlogModel.findOne({ slug });
    if (existingBlog) {
      return NextResponse.json(
        { success: false, error: 'A blog with this slug already exists' },
        { status: 400 }
      );
    }

    // Create blog
    const blog = await BlogModel.create({
      title: data.title,
      slug,
      excerpt: data.excerpt,
      content: data.content,
      coverImage: data.coverImage,
      author: data.author || session?.user?.name || 'Admin',
      category: data.category,
      tags: data.tags || [],
      published: data.published || false,
      featured: data.featured || false,
      seo: {
        title: data.seoTitle || data.title,
        description: data.seoDescription || data.excerpt,
        keywords: data.seoKeywords || [],
      },
      readTime: readTimeMinutes,
      publishedAt: data.published ? new Date() : undefined,
    });

    const response: ApiResponse = {
      success: true,
      data: blog,
      message: 'Blog created successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error: any) {
    console.error('Error creating blog:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create blog' },
      { status: 500 }
    );
  }
}
