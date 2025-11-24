'use client';

import React from 'react';
import { useComparison } from '@/contexts/ComparisonContext';
import {
  ComprehensiveProduct,
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
import { Plus, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface SuggestedProductsProps {
  currentProduct: ComprehensiveProduct;
}

export const SuggestedProducts: React.FC<SuggestedProductsProps> = ({ currentProduct }) => {
  const { addProduct, isSelected, selectedProducts } = useComparison();

  // Don't show if already comparing 3+ products to avoid clutter
  if (selectedProducts.length >= 3) return null;

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

  const getSuggestions = () => {
    const suggestions: ComprehensiveProduct[] = [];

    // 1. Same model number, different line (e.g. 745E -> 745X)
    const modelNumber = currentProduct.id.replace(/[EX]/g, '');
    const sameModelVariant = allProducts.find(
      (p) => p.id !== currentProduct.id && p.id.includes(modelNumber) && !isSelected(p.id)
    );
    if (sameModelVariant) suggestions.push(sameModelVariant);

    // 2. Next model up in same line (e.g. 726E -> 745E)
    // Extract numeric part
    const currentNum = parseInt(modelNumber);
    if (!isNaN(currentNum)) {
      const sameLine = allProducts.filter(
        (p) => p.line === currentProduct.line && p.id !== currentProduct.id && !isSelected(p.id)
      );

      // Find next higher model
      const nextModel = sameLine.find((p) => {
        const pNum = parseInt(p.id.replace(/[EX]/g, ''));
        return pNum > currentNum;
      });

      if (nextModel) suggestions.push(nextModel);
    }

    return suggestions.slice(0, 2); // Limit to 2 suggestions
  };

  const suggestions = getSuggestions();

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-8 pt-8 border-t border-gray-100">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">
        Suggested for Comparison
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {suggestions.map((product) => (
          <div
            key={product.id}
            className="group flex items-center gap-4 p-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:border-gray-200 hover:shadow-lg transition-all duration-300"
          >
            <div className="relative w-16 h-16 flex-shrink-0 bg-white rounded-lg p-2 border border-gray-100">
              <Image
                src={product.images.hero}
                alt={product.name}
                fill
                className="object-contain p-1"
              />
            </div>

            <div className="flex-1 min-w-0">
              <h4 className="font-bold text-gray-900 truncate">{product.name}</h4>
              <p className="text-xs text-gray-500 truncate">{product.tagline}</p>
            </div>

            <button
              onClick={() => addProduct(product.id)}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-red-600 hover:border-red-600 hover:text-white transition-all shadow-sm"
              title="Add to comparison"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
