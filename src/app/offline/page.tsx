import React from 'react';
import { WifiOff } from 'lucide-react';

export const metadata = {
  title: 'Offline - ErgoPack India',
  description: 'You are currently offline',
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-50"></div>
            <div className="relative bg-white p-8 rounded-full shadow-lg">
              <WifiOff className="w-16 h-16 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-gray-900">You're Offline</h1>
          <p className="text-lg text-gray-600">
            It looks like you've lost your internet connection. Don't worry, some content may
            still be available.
          </p>
        </div>

        <div className="space-y-4 pt-4">
          <div className="bg-white rounded-lg shadow-md p-6 text-left">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              What you can do:
            </h2>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Check your internet connection
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Try refreshing the page when you're back online
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">•</span>
                Browse previously visited pages (they may be cached)
              </li>
            </ul>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="w-full py-3 px-6 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Try Again
          </button>

          <button
            onClick={() => (window.location.href = '/')}
            className="w-full py-3 px-6 border-2 border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Go to Homepage
          </button>
        </div>

        <p className="text-sm text-gray-500 pt-4">
          This page is part of our offline experience. You'll be automatically redirected when
          your connection is restored.
        </p>
      </div>
    </div>
  );
}
