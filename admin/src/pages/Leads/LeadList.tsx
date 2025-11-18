import React, { useEffect, useState } from 'react';
import { Eye, Trash2, Search, Filter } from 'lucide-react';
import api from '../../services/api';
import toast from 'react-hot-toast';
import { FormSubmission, PaginatedResponse } from '../../types';

export const LeadList: React.FC = () => {
  const [leads, setLeads] = useState<FormSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [pageSize] = useState(10);
  const [selectedLead, setSelectedLead] = useState<FormSubmission | null>(null);

  useEffect(() => {
    fetchLeads();
  }, [page, searchQuery, statusFilter]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const params = {
        page,
        limit: pageSize,
        ...(searchQuery && { search: searchQuery }),
        ...(statusFilter && { status: statusFilter }),
      };
      const response = await api.get<PaginatedResponse<FormSubmission>>(
        '/forms/submissions',
        { params }
      );
      setLeads(response.data.data);
      setTotal(response.data.total);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
      // Mock data for demo
      setLeads([
        {
          id: '1',
          form_id: 'contact',
          form_type: 'Contact Form',
          data: { name: 'John Doe', email: 'john@example.com', message: 'Interested in products' },
          status: 'new',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this submission?')) {
      return;
    }

    try {
      await api.delete(`/forms/submissions/${id}`);
      toast.success('Submission deleted');
      fetchLeads();
    } catch (error) {
      console.error('Failed to delete lead:', error);
      toast.error('Failed to delete submission');
    }
  };

  const handleMarkAsRead = async (id: string) => {
    try {
      await api.patch(`/forms/submissions/${id}`, { status: 'read' });
      fetchLeads();
    } catch (error) {
      console.error('Failed to update submission:', error);
      toast.error('Failed to update submission');
    }
  };

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Form Submissions</h1>
          <p className="text-gray-500 mt-1">Manage leads and form submissions</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Status Filter */}
          <div className="flex gap-2">
            <Filter className="w-5 h-5 text-gray-400 mt-2.5" />
            <select
              value={statusFilter || ''}
              onChange={(e) => {
                setStatusFilter(e.target.value || null);
                setPage(1);
              }}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Status</option>
              <option value="new">New</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <p className="mt-2 text-gray-600">Loading submissions...</p>
            </div>
          </div>
        ) : leads.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">No submissions found</p>
          </div>
        ) : (
          <>
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Form
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Submitted
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr
                    key={lead.id}
                    className={`hover:bg-gray-50 transition-colors ${
                      lead.status === 'new' ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{lead.form_type}</p>
                      <p className="text-xs text-gray-500">{lead.form_id}</p>
                    </td>
                    <td className="px-6 py-4">
                      {lead.data && Object.keys(lead.data).length > 0 ? (
                        <div className="text-sm text-gray-600">
                          {Object.entries(lead.data)
                            .slice(0, 2)
                            .map(([key, value]) => (
                              <p key={key}>
                                <span className="font-medium">{key}:</span>{' '}
                                {String(value).substring(0, 30)}
                              </p>
                            ))}
                          {Object.keys(lead.data).length > 2 && (
                            <p className="text-gray-500 text-xs">
                              +{Object.keys(lead.data).length - 2} more fields
                            </p>
                          )}
                        </div>
                      ) : (
                        <p className="text-gray-500 text-sm">No data</p>
                      )}
                    </td>
                    <td className="px-6 py-4">
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
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(lead.createdAt).toLocaleDateString()}
                      <p className="text-xs">
                        {new Date(lead.createdAt).toLocaleTimeString()}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedLead(lead)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {lead.status === 'new' && (
                          <button
                            onClick={() => handleMarkAsRead(lead.id)}
                            className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(lead.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200 bg-gray-50">
                <p className="text-sm text-gray-500">
                  Page {page} of {totalPages} ({total} total)
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Detail Modal */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between sticky top-0 bg-white">
              <h2 className="text-xl font-semibold text-gray-900">
                Submission Details
              </h2>
              <button
                onClick={() => setSelectedLead(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">Form Type</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {selectedLead.form_type}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium mt-1 ${
                      selectedLead.status === 'new'
                        ? 'bg-blue-100 text-blue-800'
                        : selectedLead.status === 'read'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}
                  >
                    {selectedLead.status}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Submitted</p>
                  <p className="text-gray-900">
                    {new Date(selectedLead.createdAt).toLocaleString()}
                  </p>
                </div>
                {selectedLead.ip_address && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">IP Address</p>
                    <p className="text-gray-900 font-mono text-sm">
                      {selectedLead.ip_address}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Submission Data
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  {Object.entries(selectedLead.data || {}).map(
                    ([key, value]) => (
                      <div key={key} className="border-b border-gray-200 pb-3 last:border-0">
                        <p className="text-sm font-medium text-gray-600 capitalize">
                          {key}
                        </p>
                        <p className="text-gray-900 mt-1 whitespace-pre-wrap">
                          {typeof value === 'object'
                            ? JSON.stringify(value, null, 2)
                            : String(value)}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setSelectedLead(null)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedLead.status === 'new' && (
                <button
                  onClick={() => {
                    handleMarkAsRead(selectedLead.id);
                    setSelectedLead(null);
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
