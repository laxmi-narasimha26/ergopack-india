'use client';

export const dynamic = 'force-dynamic';

import React, { useState, useEffect } from 'react';
import { useComparison, COMPARISON_CONFIG } from '@/contexts/ComparisonContext';
import ComparisonTable from '@/components/comparison/ComparisonTable';
import ComparisonControls from '@/components/comparison/ComparisonControls';
import { ProductSelector } from '@/components/comparison/ProductSelector';
import { generateComparisonMatrix, filterCategories } from '@/lib/comparison/comparison-engine';
import { FilterMode, ComparisonMatrix } from '@/types/comparison';
import comparisonData from '@/data/products-comparison-data.json';
import { ArrowLeft, ArrowRight, Check, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { useSearchParams } from 'next/navigation';

export default function ComparePage() {
  const { selectedProducts, clearSelection } = useComparison();
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [matrix, setMatrix] = useState<ComparisonMatrix | null>(null);
  const [isComparing, setIsComparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchParams = useSearchParams();

  useEffect(() => {
    console.log('ComparePage: selectedProducts changed', selectedProducts);
    if (selectedProducts.length > 0) {
      try {
        setError(null);
        const products = selectedProducts.map((id) => {
          const product = (comparisonData as any)[id];
          if (!product) {
            throw new Error(`Product ${id} not found`);
          }
          // FIX: Inject correct image path from local mapping
          // The IDs in comprehensive-products are like '700', '700E', etc.
          // The file paths are /images/products/700.png, /images/products/700e.png
          return {
            ...product,
            image: `/images/products/${id.toLowerCase()}.png`,
          };
        });

        console.log(
          'ComparePage: Generating matrix for',
          products.map((p) => p.model)
        );
        const comparisonMatrix = generateComparisonMatrix(products);
        console.log('ComparePage: Matrix generated', comparisonMatrix);
        setMatrix(comparisonMatrix);

        // Auto-start comparison if requested via URL and we have enough products
        const autoStart = searchParams.get('auto');
        if (autoStart === 'true' && selectedProducts.length >= 2) {
          setIsComparing(true);
        }
      } catch (err: any) {
        console.error('Error generating comparison:', err);
        setError(err.message || 'Failed to generate comparison');
        setMatrix(null);
      }
    } else {
      setMatrix(null);
      setIsComparing(false);
    }
  }, [selectedProducts, searchParams]);

  const handleReset = () => {
    clearSelection();
    setFilterMode('all');
    setIsComparing(false);
    setError(null);
  };

  const handleStartComparison = () => {
    console.log('ComparePage: Starting comparison with', selectedProducts.length, 'products');
    if (selectedProducts.length >= 2) {
      setIsComparing(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // LOADING / ERROR STATE
  if (isComparing && !matrix) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 pt-32 pb-12 flex flex-col items-center justify-center">
          {error ? (
            <div className="text-center max-w-md mx-auto p-8 bg-white rounded-xl shadow-lg">
              <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Comparison Failed</h2>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => setIsComparing(false)}
                className="px-6 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                Go Back
              </button>
            </div>
          ) : (
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Preparing comparison...</p>
            </div>
          )}
        </div>
      </MainLayout>
    );
  }

  // SELECTION MODE
  if (!isComparing) {
    return (
      <MainLayout>
        <div className="min-h-screen bg-gray-50 pb-32">
          <div className="container mx-auto px-4 pt-12">
            {/* Navigation */}
            <Link
              href="/products"
              className="inline-flex items-center text-gray-500 hover:text-red-600 transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Products
            </Link>

            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
                Select Models to{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                  Compare
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Choose up to 5 ErgoPack systems to analyze their specifications side-by-side.
              </p>
            </div>

            {/* Product Grid */}
            <ProductSelector />

            {/* Sticky Footer for Action */}
            <div
              className={`fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-transform duration-300 z-50 ${selectedProducts.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}
            >
              <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    {selectedProducts.length} Selected
                  </div>
                  <span className="text-sm text-gray-500 hidden sm:inline">
                    {selectedProducts.length < 2
                      ? 'Select at least 2 products'
                      : 'Ready to compare'}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={clearSelection}
                    className="px-4 py-2 text-gray-500 hover:text-red-600 font-medium text-sm transition-colors"
                  >
                    Clear All
                  </button>
                  <button
                    onClick={handleStartComparison}
                    disabled={selectedProducts.length < 2}
                    className={`flex items-center gap-2 px-8 py-3 rounded-lg font-bold text-white transition-all ${selectedProducts.length >= 2
                        ? 'bg-red-600 hover:bg-red-700 shadow-lg shadow-red-600/20 hover:shadow-red-600/30'
                        : 'bg-gray-300 cursor-not-allowed'
                      }`}
                  >
                    Compare Now
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  // COMPARISON MODE
  if (!matrix) return null;

  const filteredCategories = filterCategories(matrix.categories, filterMode);

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 pb-12">
        <div className="container mx-auto px-4 pt-12">
          {/* Navigation */}
          <button
            onClick={() => setIsComparing(false)}
            className="inline-flex items-center text-gray-500 hover:text-red-600 transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Selection
          </button>

          {/* Premium Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-xs font-bold uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-red-600"></span>
              Side-by-Side Analysis
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
              Comparison{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-800">
                Results
              </span>
            </h1>
          </div>

          {/* Controls */}
          <ComparisonControls
            filterMode={filterMode}
            onFilterChange={setFilterMode}
            differencesCount={matrix.metadata.totalDifferences}
            similaritiesCount={matrix.metadata.totalSimilarities}
            onReset={handleReset}
          />

          {/* Comparison Table */}
          <ComparisonTable products={matrix.products} categories={filteredCategories} />

          {/* Footer Actions */}
          <div className="mt-12 flex justify-center gap-4">
            <button
              onClick={() => setIsComparing(false)}
              className="px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-lg transition-all shadow-lg"
            >
              Add More Products
            </button>
            <button
              onClick={handleReset}
              className="px-8 py-3 bg-white border border-gray-200 text-red-600 hover:bg-red-50 font-bold rounded-lg transition-colors"
            >
              Start New Comparison
            </button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
