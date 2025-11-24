import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { BlogPost, CreatePostRequest } from '../../types';

interface PostFormData extends CreatePostRequest {
  slug: string;
}

export const PostForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      title: '',
      slug: '',
      content: '',
      excerpt: '',
      featured_image_id: '',
      status: 'draft',
    },
  });

  useEffect(() => {
    if (id && id !== 'new') {
      loadPost();
    }
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const response = await api.get<BlogPost>(`/blog/posts/${id}`);
      const post = response.data;
      setIsEdit(true);

      setValue('title', post.title);
      setValue('slug', post.slug);
      setValue('content', post.content);
      setValue('excerpt', post.excerpt);
      setValue('featured_image_id', post.featured_image_id);
      setValue('status', post.status);
    } catch (error) {
      console.error('Failed to load post:', error);
      toast.error('Failed to load post');
      navigate('/blog');
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data: PostFormData) => {
    try {
      setLoading(true);

      const payload: CreatePostRequest = {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt,
        featured_image_id: data.featured_image_id,
        status: data.status,
      };

      if (isEdit) {
        await api.put(`/blog/posts/${id}`, payload);
        toast.success('Post updated successfully');
      } else {
        await api.post('/blog/posts', payload);
        toast.success('Post created successfully');
      }

      navigate('/blog');
    } catch (error: any) {
      console.error('Failed to save post:', error);
      toast.error(error?.response?.data?.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/blog')}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {isEdit ? 'Edit Post' : 'Create Post'}
          </h1>
          <p className="text-gray-500 mt-1">
            {isEdit ? 'Update your blog post' : 'Create a new blog post'}
          </p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Post Details</h2>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Post Title *</label>
                <input
                  {...register('title', { required: 'Title is required' })}
                  type="text"
                  placeholder="e.g., Ergonomic Workspace Setup Guide"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.title ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Slug *</label>
                <input
                  {...register('slug', { required: 'Slug is required' })}
                  type="text"
                  placeholder="e.g., ergonomic-workspace-setup-guide"
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.slug ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.slug && <p className="mt-1 text-sm text-red-500">{errors.slug.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea
                  {...register('excerpt')}
                  placeholder="A brief summary of the post..."
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <textarea
                  {...register('content', { required: 'Content is required' })}
                  placeholder="Write your post content here..."
                  rows={10}
                  className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm ${
                    errors.content ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-500">{errors.content.message}</p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  Note: For now, enter plain text. Rich text editor can be added later.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Featured Image ID
                </label>
                <input
                  {...register('featured_image_id')}
                  type="text"
                  placeholder="Image ID from media library"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  {...register('status')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Submit Button */}
            <div className="bg-white rounded-lg shadow p-6 space-y-4 sticky top-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 rounded-lg transition-colors"
              >
                {loading ? 'Saving...' : isEdit ? 'Update Post' : 'Create Post'}
              </button>

              <button
                type="button"
                onClick={() => navigate('/blog')}
                className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </div>

            {/* Help text */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm font-medium text-blue-900 mb-2">Tips:</p>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Write compelling titles (60 chars max)</li>
                <li>• Slug must be URL-friendly</li>
                <li>• Excerpt appears in listings</li>
                <li>• Save as draft before publishing</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
