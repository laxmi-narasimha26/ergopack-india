'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { FileText, MessageSquare, Eye, TrendingUp, Plus } from 'lucide-react';
import StatsCard from '@/components/admin/StatsCard';
import { DashboardStats } from '@/types';
import { format } from 'date-fns';
import Badge from '@/components/ui/Badge';
import Button from '@/components/ui/Button';
import LoadingSpinner from '@/components/ui/LoadingSpinner';

export default function AdminDashboard() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/stats');
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-neutral-500">Failed to load dashboard statistics</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-neutral-400">Welcome back, {session?.user?.name || 'Admin'}</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/admin/blogs/new">
            <Button variant="primary">
              <Plus size={20} className="mr-2" />
              New Blog
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Requests"
          value={stats.totalRequests}
          icon={MessageSquare}
          color="blue"
        />
        <StatsCard title="New Requests" value={stats.newRequests} icon={TrendingUp} color="green" />
        <StatsCard
          title="Published Blogs"
          value={stats.publishedBlogs}
          icon={FileText}
          color="purple"
        />
        <StatsCard
          title="Total Views"
          value={stats.totalViews.toLocaleString()}
          icon={Eye}
          color="orange"
        />
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Requests */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Requests</h2>
            <Link href="/admin/requests">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {stats.recentRequests.length > 0 ? (
              stats.recentRequests.map((request) => (
                <div
                  key={request._id}
                  className="border border-neutral-800 rounded-lg p-4
                    hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-white font-medium">{request.name}</h3>
                      <p className="text-sm text-neutral-400">{request.company}</p>
                    </div>
                    <Badge variant="info" size="sm">
                      {request.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-neutral-500">
                    {format(new Date(request.createdAt), 'MMM dd, yyyy HH:mm')}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-neutral-500 text-center py-8">No requests yet</p>
            )}
          </div>
        </div>

        {/* Recent Blogs */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Recent Blogs</h2>
            <Link href="/admin/blogs">
              <Button variant="ghost" size="sm">
                View All
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {stats.recentBlogs.length > 0 ? (
              stats.recentBlogs.map((blog) => (
                <div
                  key={blog._id}
                  className="border border-neutral-800 rounded-lg p-4
                    hover:border-neutral-700 transition-colors"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="text-white font-medium line-clamp-1">{blog.title}</h3>
                      <p className="text-xs text-neutral-500 mt-1">
                        {format(new Date(blog.createdAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                    <Badge variant={blog.published ? 'success' : 'default'} size="sm">
                      {blog.published ? 'Published' : 'Draft'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-neutral-400">
                    <span className="flex items-center">
                      <Eye size={14} className="mr-1" />
                      {blog.views}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-neutral-500 text-center py-8">No blogs yet</p>
            )}
          </div>
        </div>
      </div>

      {/* Requests by Industry */}
      {stats.requestsByIndustry.length > 0 && (
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Requests by Industry</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.requestsByIndustry.map((item) => (
              <div
                key={item.industry}
                className="border border-neutral-800 rounded-lg p-4 text-center"
              >
                <p className="text-2xl font-bold text-white mb-1">{item.count}</p>
                <p className="text-sm text-neutral-400 capitalize">{item.industry}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
