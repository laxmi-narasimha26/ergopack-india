'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  Calendar,
  Clock,
  User,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  Check,
  ArrowLeft,
} from 'lucide-react';
import { Blog } from '@/types';
import Badge from '@/components/ui/Badge';
import Card from '@/components/ui/Card';
import ReactMarkdown from 'react-markdown';

interface BlogPostProps {
  blog: Blog;
  relatedBlogs: Partial<Blog>[];
}

export default function BlogPost({ blog, relatedBlogs }: BlogPostProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = async (platform: string) => {
    const text = `${blog.title} - ${blog.excerpt}`;
    const url = shareUrl;

    switch (platform) {
      case 'twitter':
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'facebook':
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'linkedin':
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
          '_blank'
        );
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        break;
    }
  };

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.title,
    image: blog.coverImage,
    datePublished: blog.publishedAt,
    dateModified: blog.updatedAt,
    author: {
      '@type': 'Person',
      name: blog.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'ErgoPack India',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png',
      },
    },
    description: blog.excerpt,
    articleBody: blog.content,
    keywords: blog.tags.join(', '),
  };

  return (
    <main className="min-h-screen bg-black pt-24 pb-16">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <Link
            href="/blog"
            className="inline-flex items-center text-neutral-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          {/* Category */}
          <div className="mb-6">
            <Badge variant="default" className="capitalize">
              {blog.category}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{blog.title}</h1>

          {/* Excerpt */}
          <p className="text-xl text-neutral-400 mb-8">{blog.excerpt}</p>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-neutral-500 pb-8 border-b border-neutral-800">
            <div className="flex items-center">
              <User size={16} className="mr-2" />
              {blog.author}
            </div>
            <div className="flex items-center">
              <Calendar size={16} className="mr-2" />
              {blog.publishedAt ? format(new Date(blog.publishedAt), 'MMMM dd, yyyy') : 'Draft'}
            </div>
            <div className="flex items-center">
              <Clock size={16} className="mr-2" />
              {blog.readTime} min read
            </div>
          </div>
        </motion.header>

        {/* Cover Image */}
        {blog.coverImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12 rounded-2xl overflow-hidden"
          >
            <img
              src={blog.coverImage}
              alt={blog.title}
              className="w-full aspect-video object-cover"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="prose prose-invert prose-lg max-w-none mb-12"
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-3xl font-bold text-white mb-6 mt-8">{children}</h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-2xl font-bold text-white mb-4 mt-6">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-xl font-bold text-white mb-3 mt-4">{children}</h3>
              ),
              p: ({ children }) => (
                <p className="text-neutral-300 mb-4 leading-relaxed">{children}</p>
              ),
              ul: ({ children }) => (
                <ul className="list-disc list-inside mb-4 text-neutral-300 space-y-2">
                  {children}
                </ul>
              ),
              ol: ({ children }) => (
                <ol className="list-decimal list-inside mb-4 text-neutral-300 space-y-2">
                  {children}
                </ol>
              ),
              li: ({ children }) => <li className="text-neutral-300">{children}</li>,
              blockquote: ({ children }) => (
                <blockquote className="border-l-4 border-neutral-700 pl-6 italic text-neutral-400 my-6">
                  {children}
                </blockquote>
              ),
              code: ({ children }) => (
                <code className="bg-neutral-900 text-neutral-300 px-2 py-1 rounded text-sm">
                  {children}
                </code>
              ),
              pre: ({ children }) => (
                <pre className="bg-neutral-900 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  className="text-blue-500 hover:text-blue-400 underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                </a>
              ),
            }}
          >
            {blog.content}
          </ReactMarkdown>
        </motion.div>

        {/* Tags */}
        {blog.tags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-12 pb-12 border-b border-neutral-800"
          >
            <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag) => (
                <Badge key={tag} variant="default" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </motion.div>
        )}

        {/* Share Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mb-16"
        >
          <h3 className="text-lg font-bold text-white mb-4">Share this article</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleShare('twitter')}
              className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors"
              aria-label="Share on Twitter"
            >
              <Twitter size={20} />
            </button>
            <button
              onClick={() => handleShare('facebook')}
              className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors"
              aria-label="Share on Facebook"
            >
              <Facebook size={20} />
            </button>
            <button
              onClick={() => handleShare('linkedin')}
              className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors"
              aria-label="Share on LinkedIn"
            >
              <Linkedin size={20} />
            </button>
            <button
              onClick={() => handleShare('copy')}
              className="p-3 bg-neutral-900 hover:bg-neutral-800 text-white rounded-lg transition-colors"
              aria-label="Copy link"
            >
              {copied ? <Check size={20} /> : <LinkIcon size={20} />}
            </button>
          </div>
        </motion.div>

        {/* Related Posts */}
        {relatedBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link key={relatedBlog._id} href={`/blog/${relatedBlog.slug}`}>
                  <Card className="h-full hover:border-neutral-700 transition-all duration-300 cursor-pointer group">
                    {relatedBlog.coverImage && (
                      <div className="aspect-video overflow-hidden rounded-t-xl">
                        <img
                          src={relatedBlog.coverImage}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <Badge variant="default" size="sm" className="mb-3 capitalize">
                        {relatedBlog.category}
                      </Badge>
                      <h4 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-neutral-300 transition-colors">
                        {relatedBlog.title}
                      </h4>
                      <p className="text-neutral-400 text-sm line-clamp-2">{relatedBlog.excerpt}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </article>
    </main>
  );
}
