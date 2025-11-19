'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Blog, BlogFormData } from '@/types';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import Select from '@/components/ui/Select';
import Button from '@/components/ui/Button';
import { Save, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

interface BlogFormProps {
  blog?: Blog;
  isEdit?: boolean;
}

export default function BlogForm({ blog, isEdit = false }: BlogFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<BlogFormData>>({
    title: blog?.title || '',
    slug: blog?.slug || '',
    excerpt: blog?.excerpt || '',
    content: blog?.content || '',
    coverImage: blog?.coverImage || '',
    author: blog?.author || '',
    category: blog?.category || 'industry',
    tags: blog?.tags || [],
    published: blog?.published || false,
    featured: blog?.featured || false,
    seoTitle: blog?.seo?.title || '',
    seoDescription: blog?.seo?.description || '',
    seoKeywords: blog?.seo?.keywords || [],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map((tag) => tag.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, tags }));
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywords = e.target.value.split(',').map((kw) => kw.trim()).filter(Boolean);
    setFormData((prev) => ({ ...prev, seoKeywords: keywords }));
  };

  const generateSlug = () => {
    if (formData.title) {
      const slug = formData.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
      setFormData((prev) => ({ ...prev, slug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent, publish: boolean = false) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const submitData = {
        ...formData,
        published: publish,
      };

      const url = isEdit ? `/api/blog/${blog?._id}` : '/api/blog';
      const method = isEdit ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(isEdit ? 'Blog updated successfully' : 'Blog created successfully');
        router.push('/admin/blogs');
        router.refresh();
      } else {
        toast.error(data.error || 'Failed to save blog');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      toast.error('Failed to save blog');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="space-y-8">
      {/* Basic Information */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-white">Basic Information</h2>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Title *
          </label>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            onBlur={generateSlug}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Slug *
          </label>
          <div className="flex space-x-2">
            <Input
              type="text"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="blog-url-slug"
              required
            />
            <Button type="button" variant="secondary" onClick={generateSlug}>
              Generate
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Excerpt *
          </label>
          <Textarea
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Brief description of the blog post"
            rows={3}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Cover Image URL *
          </label>
          <Input
            type="text"
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="/images/blog/cover.jpg"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Author *
            </label>
            <Input
              type="text"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Author name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">
              Category *
            </label>
            <Select name="category" value={formData.category} onChange={handleChange} required>
              <option value="industry">Industry</option>
              <option value="products">Products</option>
              <option value="sustainability">Sustainability</option>
              <option value="innovation">Innovation</option>
              <option value="case-study">Case Study</option>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Tags (comma separated)
          </label>
          <Input
            type="text"
            value={formData.tags?.join(', ')}
            onChange={handleTagsChange}
            placeholder="packaging, automation, sustainability"
          />
        </div>
      </div>

      {/* Content */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-white">Content</h2>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            Blog Content * (Markdown supported)
          </label>
          <Textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Write your blog content in Markdown format..."
            rows={15}
            required
          />
          <p className="text-xs text-neutral-500 mt-2">
            Tip: Use Markdown syntax for formatting. Supports headings, lists, code blocks, etc.
          </p>
        </div>
      </div>

      {/* SEO */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
        <h2 className="text-xl font-bold text-white">SEO Settings</h2>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            SEO Title
          </label>
          <Input
            type="text"
            name="seoTitle"
            value={formData.seoTitle}
            onChange={handleChange}
            placeholder="Leave empty to use blog title"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            SEO Description
          </label>
          <Textarea
            name="seoDescription"
            value={formData.seoDescription}
            onChange={handleChange}
            placeholder="Leave empty to use blog excerpt"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">
            SEO Keywords (comma separated)
          </label>
          <Input
            type="text"
            value={formData.seoKeywords?.join(', ')}
            onChange={handleKeywordsChange}
            placeholder="packaging, automation, sustainability"
          />
        </div>
      </div>

      {/* Publishing Options */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-4">
        <h2 className="text-xl font-bold text-white">Publishing Options</h2>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="w-4 h-4 rounded border-neutral-700 bg-neutral-800 text-blue-600
              focus:ring-blue-600 focus:ring-offset-neutral-900"
          />
          <label htmlFor="featured" className="text-sm text-neutral-300">
            Mark as featured
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.push('/admin/blogs')}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
        <div className="flex items-center space-x-3">
          <Button
            type="button"
            variant="secondary"
            onClick={(e) => handleSubmit(e, false)}
            disabled={isSubmitting}
          >
            <Save size={20} className="mr-2" />
            Save as Draft
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={(e) => handleSubmit(e, true)}
            disabled={isSubmitting}
          >
            <Eye size={20} className="mr-2" />
            Publish
          </Button>
        </div>
      </div>
    </form>
  );
}
