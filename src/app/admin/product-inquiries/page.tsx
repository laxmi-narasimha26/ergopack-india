'use client';

import { useEffect, useState } from 'react';
import { Search, Filter, Phone, Mail, Building2, Package, ExternalLink } from 'lucide-react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import toast from 'react-hot-toast';

interface ProductInquiry {
  _id: string;
  productName: string;
  productModel: string;
  name: string;
  mobile: string;
  email: string;
  company?: string;
  requirement: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'closed';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProductInquiriesPage() {
  const [inquiries, setInquiries] = useState<ProductInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchInquiries();
  }, [page, statusFilter, productFilter]);

  const fetchInquiries = async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
      });

      if (statusFilter && statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      if (productFilter) {
        params.append('product', productFilter);
      }

      const response = await fetch(`/api/product-inquiry?${params}`);
      const data = await response.json();

      if (data.success) {
        setInquiries(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      toast.error('Failed to load inquiries');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: ProductInquiry['status']) => {
    try {
      const response = await fetch(`/api/product-inquiry/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Status updated successfully');
        fetchInquiries();
      } else {
        toast.error(data.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  // Filter inquiries by search
  const filteredInquiries = inquiries.filter((inquiry) => {
    if (!search) return true;
    const searchLower = search.toLowerCase();
    return (
      inquiry.name.toLowerCase().includes(searchLower) ||
      (inquiry.company?.toLowerCase() || '').includes(searchLower) ||
      inquiry.email.toLowerCase().includes(searchLower) ||
      inquiry.mobile.includes(searchLower) ||
      inquiry.productModel.toLowerCase().includes(searchLower)
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'contacted':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'qualified':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'converted':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed':
        return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30';
      default:
        return 'bg-neutral-500/20 text-neutral-400 border-neutral-500/30';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Product Inquiries</h1>
        <p className="text-neutral-400">Manage product-specific inquiries from customers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {['new', 'contacted', 'qualified', 'converted', 'closed'].map((status) => {
          const count = inquiries.filter((i) => i.status === status).length;
          return (
            <div key={status} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4">
              <p className="text-sm text-neutral-400 capitalize">{status}</p>
              <p className="text-2xl font-bold text-white mt-1">{count}</p>
            </div>
          );
        })}
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
              placeholder="Search by name, company, email, mobile..."
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
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setPage(1);
              }}
              className="pl-10"
            >
              <option value="all">All Status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="qualified">Qualified</option>
              <option value="converted">Converted</option>
              <option value="closed">Closed</option>
            </Select>
          </div>
          <div className="relative">
            <Package
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
              size={20}
            />
            <Input
              type="text"
              placeholder="Filter by product model..."
              value={productFilter}
              onChange={(e) => {
                setProductFilter(e.target.value);
                setPage(1);
              }}
              className="pl-10"
            />
          </div>
        </div>
      </div>

      {/* Inquiries List */}
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner size="lg" />
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-neutral-400">
            <Package className="w-12 h-12 mb-4 opacity-50" />
            <p>No inquiries found</p>
          </div>
        ) : (
          <div className="divide-y divide-neutral-800">
            {filteredInquiries.map((inquiry) => (
              <div key={inquiry._id} className="p-6 hover:bg-neutral-800/50 transition-colors">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Left: Customer Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-white">{inquiry.name}</h3>
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(inquiry.status)}`}
                      >
                        {inquiry.status}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400 mb-3">
                      <a
                        href={`tel:${inquiry.mobile}`}
                        className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                      >
                        <Phone size={14} />
                        {inquiry.mobile}
                      </a>
                      <a
                        href={`mailto:${inquiry.email}`}
                        className="flex items-center gap-1 hover:text-amber-400 transition-colors"
                      >
                        <Mail size={14} />
                        {inquiry.email}
                      </a>
                      {inquiry.company && (
                        <span className="flex items-center gap-1">
                          <Building2 size={14} />
                          {inquiry.company}
                        </span>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg mb-3">
                      <Package size={14} className="text-amber-400" />
                      <span className="text-sm text-amber-400 font-medium">
                        {inquiry.productModel}
                      </span>
                    </div>

                    {/* Requirement */}
                    <p className="text-sm text-neutral-300 bg-neutral-800/50 p-3 rounded-lg">
                      {inquiry.requirement}
                    </p>
                  </div>

                  {/* Right: Actions & Date */}
                  <div className="flex flex-col items-end gap-3">
                    <p className="text-xs text-neutral-500">{formatDate(inquiry.createdAt)}</p>

                    <select
                      value={inquiry.status}
                      onChange={(e) =>
                        handleStatusUpdate(inquiry._id, e.target.value as ProductInquiry['status'])
                      }
                      className="px-3 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="qualified">Qualified</option>
                      <option value="converted">Converted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
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
