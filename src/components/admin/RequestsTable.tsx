'use client';

import { useState } from 'react';
import { ContactRequest } from '@/types';
import { format } from 'date-fns';
import { Eye, MoreVertical } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import Modal from '@/components/ui/Modal';

interface RequestsTableProps {
  requests: ContactRequest[];
  onStatusUpdate?: (id: string, status: ContactRequest['status']) => void;
}

const statusColors: Record<ContactRequest['status'], 'default' | 'info' | 'success' | 'warning' | 'error'> = {
  new: 'info',
  contacted: 'warning',
  qualified: 'default',
  converted: 'success',
  rejected: 'error',
};

export default function RequestsTable({ requests, onStatusUpdate }: RequestsTableProps) {
  const [selectedRequest, setSelectedRequest] = useState<ContactRequest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleViewDetails = (request: ContactRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleStatusChange = async (id: string, newStatus: ContactRequest['status']) => {
    if (onStatusUpdate) {
      await onStatusUpdate(id, newStatus);
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-neutral-800">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Industry
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium text-neutral-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-800">
            {requests.map((request) => (
              <tr
                key={request._id}
                className="hover:bg-neutral-900/50 transition-colors"
              >
                <td className="px-4 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-white">{request.name}</div>
                    <div className="text-sm text-neutral-400">{request.email}</div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm text-white">{request.company}</div>
                  <div className="text-xs text-neutral-400">{request.jobTitle}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className="text-sm text-neutral-300 capitalize">
                    {request.industry}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <select
                    value={request.status}
                    onChange={(e) => handleStatusChange(request._id, e.target.value as ContactRequest['status'])}
                    className="text-xs bg-neutral-800 border border-neutral-700 rounded px-2 py-1
                      text-white focus:outline-none focus:border-neutral-600"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="qualified">Qualified</option>
                    <option value="converted">Converted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-400">
                  {format(new Date(request.createdAt), 'MMM dd, yyyy')}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => handleViewDetails(request)}
                    className="text-neutral-400 hover:text-white transition-colors"
                  >
                    <Eye size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {requests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-neutral-500">No requests found</p>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Request Details"
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-neutral-400">Name</label>
                <p className="text-white font-medium">{selectedRequest.name}</p>
              </div>
              <div>
                <label className="text-sm text-neutral-400">Email</label>
                <p className="text-white font-medium">{selectedRequest.email}</p>
              </div>
              <div>
                <label className="text-sm text-neutral-400">Company</label>
                <p className="text-white font-medium">{selectedRequest.company}</p>
              </div>
              <div>
                <label className="text-sm text-neutral-400">Job Title</label>
                <p className="text-white font-medium">{selectedRequest.jobTitle}</p>
              </div>
              <div>
                <label className="text-sm text-neutral-400">Industry</label>
                <p className="text-white font-medium capitalize">{selectedRequest.industry}</p>
              </div>
              <div>
                <label className="text-sm text-neutral-400">Phone</label>
                <p className="text-white font-medium">{selectedRequest.phone || 'N/A'}</p>
              </div>
            </div>

            {selectedRequest.message && (
              <div>
                <label className="text-sm text-neutral-400">Message</label>
                <p className="text-white mt-1">{selectedRequest.message}</p>
              </div>
            )}

            <div>
              <label className="text-sm text-neutral-400">Status</label>
              <div className="mt-1">
                <Badge variant={statusColors[selectedRequest.status]}>
                  {selectedRequest.status}
                </Badge>
              </div>
            </div>

            <div>
              <label className="text-sm text-neutral-400">Submitted</label>
              <p className="text-white">
                {format(new Date(selectedRequest.createdAt), 'MMMM dd, yyyy HH:mm')}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
