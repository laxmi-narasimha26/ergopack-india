'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, RefreshCw } from 'lucide-react';
import RequestsTable from '@/components/admin/RequestsTable';
import { ContactRequest, PaginatedResponse } from '@/types';
import toast from 'react-hot-toast';

export default function RequestsPage() {
  const [requests, setRequests] = useState<ContactRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRequests, setTotalRequests] = useState(0);

  useEffect(() => {
    fetchRequests();
  }, [page, statusFilter]);

  const fetchRequests = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
      });

      if (statusFilter && statusFilter !== 'all') {
        params.append('status', statusFilter);
      }

      const response = await fetch(`/api/contact?${params}`);
      const data: PaginatedResponse<ContactRequest> = await response.json();

      if (data.success) {
        setRequests(data.data);
        setTotalPages(data.pagination.totalPages);
        setTotalRequests(data.pagination.total);
      }
    } catch (error) {
      console.error('Error fetching requests:', error);
      toast.error('Failed to load requests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: ContactRequest['status']) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Status updated');
        fetchRequests();
      } else {
        toast.error(data.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/contact/${id}`, {
        method: 'DELETE',
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Request deleted');
        fetchRequests();
      } else {
        toast.error(data.error || 'Failed to delete request');
      }
    } catch (error) {
      console.error('Error deleting request:', error);
      toast.error('Failed to delete request');
    }
  };

  // Filter requests by search
  const filteredRequests = requests.filter((request) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      request.name.toLowerCase().includes(searchLower) ||
      request.company.toLowerCase().includes(searchLower) ||
      request.email.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">Contact Requests</h1>
          <p className="text-gray-500">
            {totalRequests} total requests • Manage and respond to customer inquiries
          </p>
        </div>
        <button
          onClick={() => fetchRequests()}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, company, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg 
                focus:ring-2 focus:ring-[#C8102E]/20 focus:border-[#C8102E] outline-none transition-all
                placeholder:text-gray-400"
            />
          </div>
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg 
                focus:ring-2 focus:ring-[#C8102E]/20 focus:border-[#C8102E] outline-none transition-all appearance-none"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#C8102E]"></div>
          </div>
        ) : (
          <RequestsTable
            requests={filteredRequests}
            onStatusUpdate={handleStatusUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg
              hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          >
            Previous
          </button>
          <span className="text-gray-600 px-4">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-lg
              hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
