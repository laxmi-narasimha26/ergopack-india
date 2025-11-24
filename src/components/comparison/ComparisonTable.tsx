'use client';

import React, { useState } from 'react';
import { ComparisonCategory, Product } from '@/types/comparison';
import { ChevronDown, ChevronUp, Award, Check, Trash2 } from 'lucide-react';
import { useComparison } from '@/contexts/ComparisonContext';
import Image from 'next/image';

interface ComparisonTableProps {
  products: Product[];
  categories: ComparisonCategory[];
}

export default function ComparisonTable({ products, categories }: ComparisonTableProps) {
  const { removeProduct } = useComparison();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(categories.map((c) => c.name))
  );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No products selected for comparison</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Products Header - Sticky */}
      <div className="sticky top-0 bg-white border-b-2 border-gray-200 z-20">
        <div
          className="grid"
          style={{ gridTemplateColumns: `250px repeat(${products.length}, minmax(200px, 1fr))` }}
        >
          <div className="p-4 font-semibold text-gray-700 border-r border-gray-200">Features</div>
          {products.map((product) => (
            <div key={product.model} className="p-4 border-r border-gray-200 last:border-r-0">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <Image
                    src={product.image}
                    alt={product.fullName}
                    fill
                    className="object-contain"
                  />
                </div>
                <h3 className="font-bold text-lg text-gray-900 leading-tight">
                  {product.fullName}
                </h3>
                <p className="text-sm text-gray-600 mt-1">{product.line}</p>
                <p className="text-xs text-gray-500 mt-1">{product.applicationType}</p>
                <button
                  onClick={() => removeProduct(product.model)}
                  className="mt-3 text-xs text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-1 mx-auto opacity-60 hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-3 h-3" />
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Content */}
      <div>
        {categories.map((category) => {
          const isExpanded = expandedCategories.has(category.name);

          return (
            <div key={category.name} className="border-b border-gray-200 last:border-b-0">
              {/* Category Header */}
              <button
                onClick={() => toggleCategory(category.name)}
                className="w-full bg-gray-50 hover:bg-gray-100 transition-colors p-4 flex items-center justify-between text-left"
              >
                <h3 className="font-bold text-gray-900">{category.displayName}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">
                    {category.attributes.length} attribute
                    {category.attributes.length !== 1 ? 's' : ''}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-gray-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-600" />
                  )}
                </div>
              </button>

              {/* Category Attributes */}
              {isExpanded && (
                <div>
                  {category.attributes.map((attr, index) => (
                    <div
                      key={attr.key}
                      className={`grid ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}
                      style={{
                        gridTemplateColumns: `250px repeat(${products.length}, minmax(200px, 1fr))`,
                      }}
                    >
                      {/* Attribute Label */}
                      <div className="p-4 border-r border-gray-200 flex items-center">
                        <span className="font-medium text-gray-700">{attr.label}</span>
                      </div>

                      {/* Attribute Values */}
                      {products.map((product) => {
                        const value = attr.values[product.model];
                        const isBestValue = attr.bestValue === product.model;
                        const isDifferent = attr.isDifferent;

                        return (
                          <div
                            key={product.model}
                            className={`p-4 border-r border-gray-200 last:border-r-0 relative ${
                              isDifferent ? 'bg-amber-50/50' : ''
                            }`}
                          >
                            {/* Custom Rendering based on Attribute Key */}
                            {attr.key === 'includedFeatures' ||
                            attr.key === 'optionalAccessories' ? (
                              <ul className="space-y-2">
                                {String(value)
                                  .split(', ')
                                  .map((item, i) => (
                                    <li
                                      key={i}
                                      className="flex items-start gap-2 text-sm text-gray-700"
                                    >
                                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />
                                      <span className="leading-snug">{item}</span>
                                    </li>
                                  ))}
                              </ul>
                            ) : attr.key === 'certifications' || attr.key === 'strapMaterials' ? (
                              <div className="flex flex-wrap gap-2">
                                {String(value)
                                  .split(', ')
                                  .map((item, i) => (
                                    <span
                                      key={i}
                                      className="px-2 py-1 bg-gray-100 border border-gray-200 rounded text-xs font-medium text-gray-600 uppercase tracking-wider"
                                    >
                                      {item}
                                    </span>
                                  ))}
                              </div>
                            ) : (
                              <div className="flex items-start gap-2">
                                {!isDifferent && (
                                  <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                )}
                                {isDifferent && (
                                  <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                                )}
                                <span className="text-gray-900">{value || 'N/A'}</span>
                              </div>
                            )}

                            {isBestValue && (
                              <div className="absolute top-2 right-2">
                                <Award className="w-5 h-5 text-yellow-500" />
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
