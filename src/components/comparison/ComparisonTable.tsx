'use client';

import React, { useState } from 'react';
import { ComparisonCategory, Product } from '@/types/comparison';
import { ChevronDown, ChevronUp, Award, Check, Trash2 } from 'lucide-react';
import { useComparison } from '@/contexts/ComparisonContext';
import Image from 'next/image';

interface ComparisonTableProps {
  products: Product[];
  categories: ComparisonCategory[];
  isMobile?: boolean;
}

export default function ComparisonTable({ products, categories, isMobile = false }: ComparisonTableProps) {
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

  // Dynamic Grid Columns based on device
  const gridStyle = {
    gridTemplateColumns: isMobile
      ? `repeat(${products.length}, 1fr)`
      : `250px repeat(${products.length}, minmax(200px, 1fr))`
  };

  return (
    <div className="w-full overflow-x-auto md:overflow-x-visible -mx-4 md:mx-0">
      <div className="px-4 md:px-0 min-w-max">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Products Header - Sticky */}
          <div className="sticky top-0 bg-white border-b-2 border-gray-200 z-20">
            <div className="grid" style={gridStyle}>
              {/* Features Header Label - Hidden on Mobile */}
              <div className={`p-4 font-semibold text-gray-700 border-r border-gray-200 ${isMobile ? 'hidden' : 'block'}`}>
                Features
              </div>

              {products.map((product) => (
                <div key={product.model} className={`border-r border-gray-200 last:border-r-0 ${isMobile ? 'p-2' : 'p-4'}`}>
                  <div className="text-center">
                    <div className={`relative mx-auto mb-2 ${isMobile ? 'w-16 h-16' : 'w-32 h-32 mb-4'}`}>
                      <Image
                        src={product.image}
                        alt={product.fullName}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <h3 className={`font-bold text-gray-900 leading-tight ${isMobile ? 'text-xs' : 'text-lg'}`}>
                      {product.fullName}
                    </h3>
                    {!isMobile && (
                      <>
                        <p className="text-sm text-gray-600 mt-1">{product.line}</p>
                        <p className="text-xs text-gray-500 mt-1">{product.applicationType}</p>
                      </>
                    )}
                    <button
                      onClick={() => removeProduct(product.model)}
                      className={`text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-1 mx-auto opacity-60 hover:opacity-100 transition-opacity ${isMobile ? 'mt-1 text-[10px]' : 'mt-3 text-xs'}`}
                    >
                      <Trash2 className={isMobile ? "w-3 h-3" : "w-3 h-3"} />
                      {isMobile ? 'Del' : 'Remove'}
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
                    className={`w-full bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left ${isMobile ? 'p-3' : 'p-4'}`}
                  >
                    <h3 className={`font-bold text-gray-900 ${isMobile ? 'text-sm' : 'text-base'}`}>{category.displayName}</h3>
                    <div className="flex items-center gap-2">
                      <span className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>
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
                          style={gridStyle}
                        >
                          {/* Attribute Label */}
                          <div
                            className={`flex items-center border-gray-200 
                              ${isMobile
                                ? 'col-span-full bg-gray-100/80 p-1.5 justify-center border-b border-t'
                                : 'p-4 border-r justify-start'
                              }`}
                          >
                            <span className={`font-medium text-gray-700 ${isMobile ? 'text-xs uppercase tracking-wide' : 'text-base'}`}>
                              {attr.label}
                            </span>
                          </div>

                          {/* Attribute Values */}
                          {products.map((product) => {
                            const value = attr.values[product.model];
                            const isBestValue = attr.bestValue === product.model;
                            const isDifferent = attr.isDifferent;

                            return (
                              <div
                                key={product.model}
                                className={`border-r border-gray-200 last:border-r-0 relative 
                                  ${isDifferent ? 'bg-amber-50/50' : ''}
                                  ${isMobile ? 'p-2 text-center flex justify-center items-center' : 'p-4 text-left'}
                                `}
                              >
                                {/* Custom Rendering based on Attribute Key */}
                                {attr.key === 'includedFeatures' ||
                                  attr.key === 'optionalAccessories' ? (
                                  <ul className={`space-y-1 ${isMobile ? 'text-[10px]' : 'text-sm space-y-2'}`}>
                                    {String(value)
                                      .split(', ')
                                      .map((item, i) => (
                                        <li
                                          key={i}
                                          className={`flex items-start gap-2 text-gray-700 ${isMobile ? 'justify-center' : ''}`}
                                        >
                                          {!isMobile && <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />}
                                          <span className="leading-snug">{item}</span>
                                        </li>
                                      ))}
                                  </ul>
                                ) : attr.key === 'certifications' || attr.key === 'strapMaterials' ? (
                                  <div className={`flex flex-wrap gap-1 ${isMobile ? 'justify-center' : 'gap-2'}`}>
                                    {String(value)
                                      .split(', ')
                                      .map((item, i) => (
                                        <span
                                          key={i}
                                          className={`bg-gray-100 border border-gray-200 rounded font-medium text-gray-600 uppercase tracking-wider 
                                            ${isMobile ? 'px-1 py-0.5 text-[9px]' : 'px-2 py-1 text-xs'}
                                          `}
                                        >
                                          {item}
                                        </span>
                                      ))}
                                  </div>
                                ) : (
                                  <div className={`flex items-start gap-2 ${isMobile ? 'justify-center' : ''}`}>
                                    {!isDifferent && !isMobile && (
                                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                    )}
                                    {isDifferent && !isMobile && (
                                      <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                                    )}
                                    <span className={`text-gray-900 ${isMobile ? 'text-xs' : 'text-base'}`}>{value || 'N/A'}</span>
                                  </div>
                                )}

                                {isBestValue && (
                                  <div className={`absolute ${isMobile ? 'top-1 right-1' : 'top-2 right-2'}`}>
                                    <Award className={`${isMobile ? 'w-3 h-3' : 'w-5 h-5'} text-yellow-500`} />
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
      </div>
    </div>
  );
}
