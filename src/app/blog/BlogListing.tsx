'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, Filter } from 'lucide-react';
import { Blog, PaginatedResponse } from '@/types';
import { format } from 'date-fns';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function BlogListing() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [featuredBlogs, setFeaturedBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBlogs();
    fetchFeaturedBlogs();
  }, [page, categoryFilter]);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        published: 'true',
      });

      if (categoryFilter && categoryFilter !== 'all') {
        params.append('category', categoryFilter);
      }

      const response = await fetch(`/api/blog?${params}`);
      const data: PaginatedResponse<Blog> = await response.json();

      if (data.success) {
        setBlogs(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchFeaturedBlogs = async () => {
    try {
      const response = await fetch('/api/blog?featured=true&limit=3&published=true');
      const data: PaginatedResponse<Blog> = await response.json();

      if (data.success) {
        setFeaturedBlogs(data.data);
      }
    } catch (error) {
      console.error('Error fetching featured blogs:', error);
    }
  };

  // Filter blogs by search
  const filteredBlogs = blogs.filter((blog) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchLower) ||
      blog.excerpt.toLowerCase().includes(searchLower) ||
      blog.tags.some((tag) => tag.toLowerCase().includes(searchLower))
    );
  });

  return (
    <div className="pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Insights & Updates
          </h1>
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto">
            Explore the latest trends in packaging automation, sustainability practices, and industry innovations.
          </p>
        </motion.div>

        {/* Featured Blogs */}
        {featuredBlogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Featured Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredBlogs.map((blog) => (
                <Link key={blog._id} href={`/blog/${blog.slug}`}>
                  <Card className="h-full hover:border-neutral-700 transition-all duration-300 cursor-pointer group">
                    {blog.coverImage && (
                      <div className="aspect-video overflow-hidden rounded-t-xl">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <Badge variant="warning" className="mb-3">Featured</Badge>
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-neutral-300 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-neutral-400 text-sm line-clamp-2 mb-4">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-neutral-500">
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {blog.readTime} min read
                        </span>
                        <span className="flex items-center">
                          <Calendar size={14} className="mr-1" />
                          {blog.publishedAt ? format(new Date(blog.publishedAt), 'MMM dd, yyyy') : 'Draft'}
                        </span>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        )}

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
              <Input
                type="text"
                placeholder="Search articles..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" size={20} />
              <Select
                value={categoryFilter}
                onChange={(e) => {
                  setCategoryFilter(e.target.value);
                  setPage(1);
                }}
                className="pl-10"
              >
                <option value="all">All Categories</option>
                <option value="industry">Industry</option>
                <option value="products">Products</option>
                <option value="sustainability">Sustainability</option>
                <option value="innovation">Innovation</option>
                <option value="case-study">Case Study</option>
              </Select>
            </div>
          </div>
        </motion.div>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredBlogs.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
          >
            {filteredBlogs.map((blog, index) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link href={`/blog/${blog.slug}`}>
                  <Card className="h-full hover:border-neutral-700 transition-all duration-300 cursor-pointer group">
                    {blog.coverImage && (
                      <div className="aspect-video overflow-hidden rounded-t-xl">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge variant="default" size="sm" className="capitalize">
                          {blog.category}
                        </Badge>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-neutral-300 transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-neutral-400 text-sm line-clamp-3 mb-4">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-neutral-500 mb-4">
                        <span>{blog.author}</span>
                        <span className="flex items-center">
                          <Clock size={14} className="mr-1" />
                          {blog.readTime} min
                        </span>
                      </div>
                      <div className="flex items-center text-sm text-neutral-400 group-hover:text-white transition-colors">
                        Read more
                        <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-16">
            <p className="text-neutral-500">No articles found matching your criteria.</p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-white rounded-lg
                hover:border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              Previous
            </button>
            <span className="text-neutral-400 px-4">
              Page {page} of {totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className="px-6 py-3 bg-neutral-900 border border-neutral-800 text-white rounded-lg
                hover:border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed
                transition-all duration-200"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
