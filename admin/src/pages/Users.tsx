import React from 'react';
import { Plus } from 'lucide-react';

export const Users: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users</h1>
          <p className="text-gray-500 mt-1">Manage admin users and permissions</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center gap-2 transition-colors">
          <Plus className="w-5 h-5" />
          Add User
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-gray-500 mb-4">User management coming soon</p>
        <p className="text-sm text-gray-400">
          This section will allow you to create, edit, and manage admin users with different roles
          and permissions
        </p>
      </div>
    </div>
  );
};
