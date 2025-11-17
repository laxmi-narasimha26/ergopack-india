import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BlogPost from './BlogPost';
import { connectDB } from '@/lib/db/mongodb';
import { BlogModel } from '@/lib/db/models/Blog';

interface PageProps {
  params: { slug: string };
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  await connectDB();
  const blog = await BlogModel.findOne({ slug: params.slug, published: true }).lean();

  if (!blog) {
    return {
      title: 'Blog Not Found - ErgoPack India',
    };
  }

  const publishedTime = blog.publishedAt ? new Date(blog.publishedAt).toISOString() : undefined;
  const modifiedTime = new Date(blog.updatedAt).toISOString();

  return {
    title: blog.seo?.title || blog.title,
    description: blog.seo?.description || blog.excerpt,
    keywords: blog.seo?.keywords || blog.tags,
    openGraph: {
      title: blog.seo?.title || blog.title,
      description: blog.seo?.description || blog.excerpt,
      type: 'article',
      publishedTime,
      modifiedTime,
      authors: [blog.author],
      tags: blog.tags,
      images: [
        {
          url: blog.coverImage,
          alt: blog.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: blog.seo?.title || blog.title,
      description: blog.seo?.description || blog.excerpt,
      images: [blog.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  await connectDB();

  // Fetch blog by slug
  const blog = await BlogModel.findOne({ slug: params.slug, published: true }).lean();

  if (!blog) {
    notFound();
  }

  // Fetch related blogs (same category, exclude current)
  const relatedBlogs = await BlogModel.find({
    category: blog.category,
    published: true,
    _id: { $ne: blog._id },
  })
    .limit(3)
    .select('title slug excerpt coverImage category readTime')
    .lean();

  // Convert MongoDB documents to plain objects
  const blogData = JSON.parse(JSON.stringify(blog));
  const relatedBlogsData = JSON.parse(JSON.stringify(relatedBlogs));

  return <BlogPost blog={blogData} relatedBlogs={relatedBlogsData} />;
}
