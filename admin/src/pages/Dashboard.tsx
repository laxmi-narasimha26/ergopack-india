import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Package, FileText, Layers, MessageSquare } from 'lucide-react';
import api from '../services/api';
import toast from 'react-hot-toast';
import { DashboardStats } from '../types';

const StatCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
}> = ({ icon, label, value, color }) => (
  <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: color }}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-500 text-sm font-medium">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
      </div>
      <div className="p-3 rounded-lg" style={{ backgroundColor: `${color}20` }}>
        <div style={{ color }}>{icon}</div>
      </div>
    </div>
  </div>
);

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/dashboard/stats');
      setStats(response.data);

      // Mock chart data - in real app, this would come from the backend
      setChartData([
        { name: 'Jan', products: 400, posts: 240, leads: 150 },
        { name: 'Feb', products: 300, posts: 140, leads: 200 },
        { name: 'Mar', products: 200, posts: 280, leads: 180 },
        { name: 'Apr', products: 278, posts: 390, leads: 220 },
        { name: 'May', products: 189, posts: 480, leads: 250 },
        { name: 'Jun', products: 239, posts: 380, leads: 200 },
      ]);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
      // Set default stats for demo
      setStats({
        totalProducts: 24,
        totalPosts: 12,
        totalPages: 8,
        totalLeads: 156,
        recentLeads: [],
        topProducts: [],
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">Welcome to the Ergopack India CMS Admin Panel</p>
      </div>

      {/* Stats Grid */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            icon={<Package className="w-6 h-6" />}
            label="Products"
            value={stats.totalProducts}
            color="#3B82F6"
          />
          <StatCard
            icon={<FileText className="w-6 h-6" />}
            label="Blog Posts"
            value={stats.totalPosts}
            color="#10B981"
          />
          <StatCard
            icon={<Layers className="w-6 h-6" />}
            label="Pages"
            value={stats.totalPages}
            color="#F59E0B"
          />
          <StatCard
            icon={<MessageSquare className="w-6 h-6" />}
            label="Form Leads"
            value={stats.totalLeads}
            color="#EF4444"
          />
        </div>
      )}

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Activity Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="products" stroke="#3B82F6" />
              <Line type="monotone" dataKey="posts" stroke="#10B981" />
              <Line type="monotone" dataKey="leads" stroke="#EF4444" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Content Distribution */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="products" fill="#3B82F6" />
              <Bar dataKey="posts" fill="#10B981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Form Submissions</h2>
          {stats?.recentLeads && stats.recentLeads.length > 0 ? (
            <div className="space-y-4">
              {stats.recentLeads.slice(0, 5).map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{lead.form_type}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      lead.status === 'new'
                        ? 'bg-blue-100 text-blue-800'
                        : lead.status === 'read'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center py-8">No recent submissions</p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/products"
              className="block p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors"
            >
              <p className="font-medium">Add New Product</p>
              <p className="text-xs text-blue-600">Create and manage products</p>
            </a>
            <a
              href="/blog"
              className="block p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors"
            >
              <p className="font-medium">Write Blog Post</p>
              <p className="text-xs text-green-600">Create new blog content</p>
            </a>
            <a
              href="/pages"
              className="block p-3 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg transition-colors"
            >
              <p className="font-medium">Build New Page</p>
              <p className="text-xs text-amber-600">Create landing pages</p>
            </a>
            <a
              href="/leads"
              className="block p-3 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors"
            >
              <p className="font-medium">View Form Leads</p>
              <p className="text-xs text-red-600">Check new submissions</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
