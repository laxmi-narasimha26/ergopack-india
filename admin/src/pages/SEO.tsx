import React from 'react';

export const SEO: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">SEO Settings</h1>
        <p className="text-gray-500 mt-1">Configure SEO and meta information</p>
      </div>

      <div className="bg-white rounded-lg shadow p-12 text-center">
        <p className="text-gray-500 mb-4">SEO management coming soon</p>
        <p className="text-sm text-gray-400">
          This section will allow you to manage site-wide SEO settings, meta tags, and sitemap
        </p>
      </div>
    </div>
  );
};
