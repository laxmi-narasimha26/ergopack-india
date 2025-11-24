'use client';

import React from 'react';
import { useComparison } from '@/contexts/ComparisonContext';
import {
  ergoPack700,
  ergoPack700E,
  ergoPack700X,
  ergoPack713E,
  ergoPack713X,
  ergoPack726E,
  ergoPack726X,
  ergoPack745E,
  ergoPack745X,
  ergoPackGO,
} from '@/data/comprehensive-products';
import Image from 'next/image';
import { Plus, Check } from 'lucide-react';

export const ProductSelector = () => {
  const { addProduct, removeProduct, isSelected, selectedProducts } = useComparison();

  const allProducts = [
    ergoPack700,
    ergoPack700E,
    ergoPack700X,
    ergoPack713E,
    ergoPack713X,
    ergoPack726E,
    ergoPack726X,
    ergoPack745E,
    ergoPack745X,
    ergoPackGO,
  ];

  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Products to Compare</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Choose up to 5 products to see a detailed side-by-side comparison of specifications,
          features, and performance metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {allProducts.map((product) => {
          const selected = isSelected(product.id);
          return (
            <div
              key={product.id}
              className={`group relative bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
                selected
                  ? 'border-red-600 shadow-lg ring-1 ring-red-600'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
              }`}
            >
              <div className="aspect-square relative bg-gray-50 p-6">
                <Image
                  src={product.images.hero}
                  alt={product.name}
                  fill
                  className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                />
                {selected && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white p-1.5 rounded-full shadow-md">
                    <Check className="w-4 h-4" />
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <p className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                    {product.line === 'economy'
                      ? 'Economy Line'
                      : product.line === 'xpert'
                        ? 'X-pert Line'
                        : 'Portable'}
                  </p>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">{product.tagline}</p>
                </div>

                <button
                  onClick={() => (selected ? removeProduct(product.id) : addProduct(product.id))}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                    selected
                      ? 'bg-red-50 text-red-700 hover:bg-red-100'
                      : 'bg-gray-900 text-white hover:bg-gray-800'
                  }`}
                >
                  {selected ? (
                    <>
                      <Check className="w-4 h-4" />
                      Selected
                    </>
                  ) : (
                    <>
                      <Plus className="w-4 h-4" />
                      Add to Compare
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
