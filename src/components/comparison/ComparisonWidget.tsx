'use client';

import React from 'react';
import { useComparison, COMPARISON_CONFIG } from '@/contexts/ComparisonContext';
import { Trash2, CheckCircle2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface ComparisonWidgetProps {
  className?: string;
}

export default function ComparisonWidget({ className = '' }: ComparisonWidgetProps) {
  const { selectedProducts, removeProduct, clearSelection } = useComparison();

  const pathname = usePathname();

  // Don't show widget on comparison page to avoid duplication/overlap
  if (selectedProducts.length === 0 || pathname === '/compare') {
    return null;
  }

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-white border-t-2 border-red-600 shadow-2xl z-50 ${className}`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-red-600" />
              <span className="font-semibold text-gray-900">
                {selectedProducts.length} Product{selectedProducts.length !== 1 ? 's' : ''} Selected
              </span>
            </div>

            <div className="flex gap-2 flex-wrap">
              {selectedProducts.map((productId) => (
                <div
                  key={productId}
                  className="group flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full pl-4 pr-2 py-1.5 text-sm hover:bg-white hover:shadow-sm transition-all"
                >
                  <span className="font-bold text-gray-700">{productId}</span>
                  <button
                    onClick={() => removeProduct(productId)}
                    className="text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full p-1 transition-colors"
                    aria-label={`Remove ${productId}`}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {selectedProducts.length >= COMPARISON_CONFIG.MIN_PRODUCTS && (
              <Link
                href="/compare?auto=true"
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg transition-all shadow-lg shadow-red-600/20 hover:shadow-red-600/30 text-sm"
              >
                Add to Compare
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}

            <button
              onClick={clearSelection}
              className="text-gray-600 hover:text-gray-900 font-medium px-4 py-2.5 transition-colors"
            >
              Clear All
            </button>
          </div>
        </div>

        {selectedProducts.length < COMPARISON_CONFIG.MIN_PRODUCTS && (
          <p className="text-sm text-gray-600 mt-2">
            Select at least {COMPARISON_CONFIG.MIN_PRODUCTS} products to compare
          </p>
        )}
      </div>
    </div>
  );
}
