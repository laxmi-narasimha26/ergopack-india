import BlogForm from '@/components/admin/BlogForm';

export default function NewBlogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Create New Blog</h1>
        <p className="text-neutral-400">Write and publish a new blog post</p>
      </div>

      <BlogForm />
    </div>
  );
}
