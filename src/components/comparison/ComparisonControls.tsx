'use client';

import React from 'react';
import { FilterMode } from '@/types/comparison';
import { Filter, X, Check } from 'lucide-react';

interface ComparisonControlsProps {
  filterMode: FilterMode;
  onFilterChange: (mode: FilterMode) => void;
  differencesCount: number;
  similaritiesCount: number;
  onReset?: () => void;
}

export default function ComparisonControls({
  filterMode,
  onFilterChange,
  differencesCount,
  similaritiesCount,
  onReset,
}: ComparisonControlsProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <span className="font-semibold text-gray-900">Filter View:</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => onFilterChange('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              filterMode === 'all'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Show All
          </button>

          <button
            onClick={() => onFilterChange('differences')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              filterMode === 'differences'
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <X className="w-4 h-4" />
            Key Differences
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">{differencesCount}</span>
          </button>

          <button
            onClick={() => onFilterChange('similarities')}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              filterMode === 'similarities'
                ? 'bg-green-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Check className="w-4 h-4" />
            Similarities
            <span className="bg-white/20 px-2 py-0.5 rounded-full text-sm">
              {similaritiesCount}
            </span>
          </button>

          {onReset && (
            <button
              onClick={onReset}
              className="px-4 py-2 rounded-lg font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors ml-2"
            >
              Reset Comparison
            </button>
          )}
        </div>
      </div>

      {filterMode !== 'all' && (
        <div className="mt-3 text-sm text-gray-600">
          Showing{' '}
          <span className="font-semibold">
            {filterMode === 'differences' ? differencesCount : similaritiesCount}
          </span>{' '}
          {filterMode === 'differences' ? 'differences' : 'similarities'} between products
        </div>
      )}
    </div>
  );
}
