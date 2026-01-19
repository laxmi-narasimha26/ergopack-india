'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { MessageSquare, TrendingUp, Clock, Package } from 'lucide-react';
import { DashboardStats } from '@/types';
import { format } from 'date-fns';

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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C8102E]"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Failed to load dashboard statistics</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Dashboard</h1>
          <p className="text-gray-500">Welcome back, {session?.user?.name || 'Admin'}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Contact Requests */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalRequests}</p>
          <p className="text-gray-600 text-sm mt-1">Contact Requests</p>
        </div>

        {/* New Requests */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">New</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.newRequests}</p>
          <p className="text-gray-600 text-sm mt-1">Pending Review</p>
        </div>

        {/* Total Product Inquiries */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm text-gray-500">Total</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.totalProductInquiries || 0}</p>
          <p className="text-gray-600 text-sm mt-1">Product Inquiries</p>
        </div>

        {/* New Product Inquiries */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <span className="text-sm text-orange-600 font-medium">New</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{stats.newProductInquiries || 0}</p>
          <p className="text-gray-600 text-sm mt-1">Product Inquiries Pending</p>
        </div>
      </div>

      {/* Recent Sections - Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Contact Requests */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Recent Contact Requests</h2>
            <Link
              href="/admin/requests"
              className="text-[#C8102E] hover:text-[#A00D24] text-sm font-medium transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {stats.recentRequests && stats.recentRequests.length > 0 ? (
              stats.recentRequests.slice(0, 3).map((request) => (
                <div key={request._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-900 font-medium">{request.name}</h3>
                      <p className="text-gray-500 text-sm">{request.company}</p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          request.status === 'new'
                            ? 'bg-green-100 text-green-700'
                            : request.status === 'contacted'
                              ? 'bg-yellow-100 text-yellow-700'
                              : request.status === 'converted'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {request.status}
                      </span>
                      <p className="text-gray-400 text-xs mt-1">
                        {format(new Date(request.createdAt), 'MMM dd, yyyy')}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No contact requests yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Recent Product Inquiries */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-bold text-gray-900">Recent Product Inquiries</h2>
            <Link
              href="/admin/product-inquiries"
              className="text-[#C8102E] hover:text-[#A00D24] text-sm font-medium transition-colors"
            >
              View All →
            </Link>
          </div>

          <div className="divide-y divide-gray-100">
            {stats.recentProductInquiries && stats.recentProductInquiries.length > 0 ? (
              stats.recentProductInquiries.slice(0, 3).map((inquiry: any) => (
                <div key={inquiry._id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-gray-900 font-medium">{inquiry.name}</h3>
                      <p className="text-gray-500 text-sm">
                        {inquiry.productModel || inquiry.productName}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          inquiry.status === 'new'
                            ? 'bg-green-100 text-green-700'
                            : inquiry.status === 'contacted'
                              ? 'bg-yellow-100 text-yellow-700'
                              : inquiry.status === 'converted'
                                ? 'bg-blue-100 text-blue-700'
                                : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {inquiry.status}
                      </span>
                      <p className="text-gray-400 text-xs mt-1">
                        {inquiry.createdAt
                          ? format(new Date(inquiry.createdAt), 'MMM dd, yyyy')
                          : 'N/A'}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <Package className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No product inquiries yet</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Industry Breakdown */}
      {stats.requestsByIndustry && stats.requestsByIndustry.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-6">Requests by Industry</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.requestsByIndustry.map((item) => (
              <div
                key={item.industry}
                className="bg-gray-50 rounded-lg p-4 text-center border border-gray-100"
              >
                <p className="text-2xl font-bold text-gray-900 mb-1">{item.count}</p>
                <p className="text-sm text-gray-600 capitalize">{item.industry}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
