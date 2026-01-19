'use client';

import { useState } from 'react';
import { ContactRequest } from '@/types';
import { format } from 'date-fns';
import { Eye, Trash2, X, Phone, Mail, Building2, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface RequestsTableProps {
  requests: ContactRequest[];
  onStatusUpdate?: (id: string, status: ContactRequest['status']) => void;
  onDelete?: (id: string) => void;
}

const statusColors: Record<ContactRequest['status'], string> = {
  new: 'bg-green-100 text-green-700 border-green-200',
  contacted: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  qualified: 'bg-blue-100 text-blue-700 border-blue-200',
  converted: 'bg-purple-100 text-purple-700 border-purple-200',
  rejected: 'bg-red-100 text-red-700 border-red-200',
};

export default function RequestsTable({ requests, onStatusUpdate, onDelete }: RequestsTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const handleViewDetails = (request: ContactRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (id: string, newStatus: ContactRequest['status']) => {
    if (onStatusUpdate) {
      await onStatusUpdate(id, newStatus);
    }
  };

  const handleDelete = async (id: string) => {
    if (onDelete) {
      await onDelete(id);
      setDeleteConfirm(null);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Contact
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Industry
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {requests.map((request) => (
              <tr key={request._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{request.name}</div>
                    <div className="text-sm text-gray-500">{request.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{request.company}</div>
                  <div className="text-xs text-gray-500">{request.jobTitle}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-700 capitalize">{request.industry}</span>
                </td>
                <td className="px-6 py-4">
                  <select
                    value={request.status}
                    onChange={(e) =>
                      handleStatusChange(request._id, e.target.value as ContactRequest['status'])
                    }
                    className={`text-xs font-medium px-3 py-1.5 rounded-lg border
                      ${statusColors[request.status]} focus:outline-none focus:ring-2 focus:ring-[#C8102E]/20`}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {format(new Date(request.createdAt), 'MMM dd, yyyy')}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => handleViewDetails(request)}
                      className="p-2 text-gray-500 hover:text-[#C8102E] hover:bg-gray-100 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye size={18} />
                    </button>
                    {deleteConfirm === request._id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(request._id)}
                          className="px-3 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded transition-colors"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(request._id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <div className="text-center py-16 bg-white">
            <MessageSquare className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No requests found</p>
            <p className="text-gray-400 text-sm">
              Contact requests will appear here when submitted
            </p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {isModalOpen && selectedRequest && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/50 z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold text-gray-900">Request Details</h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-600 rounded-lg transition-colors"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <User className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Name</p>
                        <p className="text-gray-900 font-medium">{selectedRequest.name}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <a
                          href={`mailto:${selectedRequest.email}`}
                          className="text-[#C8102E] hover:underline"
                        >
                          {selectedRequest.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Building2 className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Company</p>
                        <p className="text-gray-900">{selectedRequest.company}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        {selectedRequest.phone ? (
                          <a
                            href={`tel:${selectedRequest.phone}`}
                            className="text-[#C8102E] hover:underline"
                          >
                            {selectedRequest.phone}
                          </a>
                        ) : (
                          <p className="text-gray-400">Not provided</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Industry</p>
                      <p className="text-gray-900 capitalize">{selectedRequest.industry}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Submitted</p>
                      <p className="text-gray-900">
                        {format(new Date(selectedRequest.createdAt), 'MMMM dd, yyyy HH:mm')}
                      </p>
                    </div>
                  </div>

                  {selectedRequest.message && (
                    <div>
                      <p className="text-xs text-gray-500 mb-2">Message</p>
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                        <p className="text-gray-700 whitespace-pre-wrap">
                          {selectedRequest.message}
                        </p>
                      </div>
                    </div>
                  )}

                  <div>
                    <p className="text-xs text-gray-500 mb-2">Status</p>
                    <span
                      className={`inline-flex px-3 py-1.5 text-sm font-medium rounded-lg border ${statusColors[selectedRequest.status]}`}
                    >
                      {selectedRequest.status}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                  >
                    Close
                  </button>
                  <a
                    href={`mailto:${selectedRequest.email}`}
                    className="px-4 py-2 bg-[#C8102E] hover:bg-[#A00D24] text-white font-medium rounded-lg transition-colors"
                  >
                    Send Email
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
