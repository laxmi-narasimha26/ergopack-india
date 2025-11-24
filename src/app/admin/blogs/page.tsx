'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter } from 'lucide-react';
import BlogsTable from '@/components/admin/BlogsTable';
import { Blog, PaginatedResponse } from '@/types';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [publishedFilter, setPublishedFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchBlogs();
  }, [page, categoryFilter, publishedFilter]);

  const fetchBlogs = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        published: publishedFilter === 'all' ? 'false' : publishedFilter,
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
      toast.error('Failed to load blogs');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Blog deleted successfully');
        fetchBlogs();
      } else {
        toast.error(data.error || 'Failed to delete blog');
      }
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog');
    }
  };

  const handleTogglePublish = async (id: string, published: boolean) => {
    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(`Blog ${published ? 'published' : 'unpublished'} successfully`);
        fetchBlogs();
      } else {
        toast.error(data.error || 'Failed to update blog');
      }
    } catch (error) {
      console.error('Error updating blog:', error);
      toast.error('Failed to update blog');
    }
  };

  // Filter blogs by search
  const filteredBlogs = blogs.filter((blog) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      blog.title.toLowerCase().includes(searchLower) ||
      blog.excerpt.toLowerCase().includes(searchLower) ||
      blog.author.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Blogs</h1>
          <p className="text-neutral-400">Manage your blog posts and content</p>
        </div>
        <Link href="/admin/blogs/new">
          <Button variant="primary">
            <Plus size={20} className="mr-2" />
            New Blog
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
              size={20}
            />
            <Input
              type="text"
              placeholder="Search blogs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="relative">
            <Filter
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
              size={20}
            />
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
          <div>
            <Select
              value={publishedFilter}
              onChange={(e) => {
                setPublishedFilter(e.target.value);
                setPage(1);
              }}
            >
              <option value="all">All Status</option>
              <option value="true">Published</option>
              <option value="false">Drafts</option>
            </Select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          <BlogsTable
            blogs={filteredBlogs}
            onDelete={handleDelete}
            onTogglePublish={handleTogglePublish}
          />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-lg
              hover:border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          >
            Previous
          </button>
          <span className="text-neutral-400">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-neutral-900 border border-neutral-800 text-white rounded-lg
              hover:border-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
