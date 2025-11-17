'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Blog } from '@/types';
import { format } from 'date-fns';
import { Edit, Trash2, Eye, EyeOff } from 'lucide-react';
import Badge from '@/components/ui/Badge';

interface BlogsTableProps {
  blogs: Blog[];
  onDelete?: (id: string) => void;
  onTogglePublish?: (id: string, published: boolean) => void;
}

export default function BlogsTable({ blogs, onDelete, onTogglePublish }: BlogsTableProps) {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    setDeletingId(id);
    if (onDelete) {
      await onDelete(id);
    }
    setDeletingId(null);
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    if (onTogglePublish) {
      await onTogglePublish(id, !currentStatus);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="border-b border-neutral-800">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Title
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Views
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Date
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800">
          {blogs.map((blog) => (
            <tr
              key={blog._id}
              className="hover:bg-neutral-900/50 transition-colors"
            >
              <td className="px-4 py-4">
                <div className="flex items-start space-x-3">
                  {blog.coverImage && (
                    <img
                      src={blog.coverImage}
                      alt={blog.title}
                      className="w-12 h-12 rounded object-cover flex-shrink-0"
                    />
                  )}
                  <div>
                    <div className="text-sm font-medium text-white line-clamp-1">
                      {blog.title}
                    </div>
                    <div className="text-xs text-neutral-400 line-clamp-1 mt-1">
                      {blog.excerpt}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <span className="text-sm text-neutral-300 capitalize">
                  {blog.category}
                </span>
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <Badge variant={blog.published ? 'success' : 'default'}>
                    {blog.published ? 'Published' : 'Draft'}
                  </Badge>
                  {blog.featured && (
                    <Badge variant="warning">Featured</Badge>
                  )}
                </div>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-400">
                {blog.views.toLocaleString()}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-400">
                {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTogglePublish(blog._id, blog.published)}
                    className="text-neutral-400 hover:text-white transition-colors"
                    title={blog.published ? 'Unpublish' : 'Publish'}
                  >
                    {blog.published ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  <Link
                    href={`/admin/blogs/${blog._id}/edit`}
                    className="text-neutral-400 hover:text-white transition-colors"
                    title="Edit"
                  >
                    <Edit size={18} />
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id, blog.title)}
                    disabled={deletingId === blog._id}
                    className="text-neutral-400 hover:text-red-500 transition-colors
                      disabled:opacity-50 disabled:cursor-not-allowed"
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {blogs.length === 0 && (
        <div className="text-center py-12">
          <p className="text-neutral-500">No blogs found</p>
        </div>
      )}
    </div>
  );
}
