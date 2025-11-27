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

  // Dynamic Grid Columns: Mobile uses flexible columns that wrap text
  const gridStyle = {
    gridTemplateColumns: isMobile
      ? `70px repeat(${products.length}, 1fr)`
      : `250px repeat(${products.length}, minmax(160px, 1fr))` // Reduced from 200px to fit 3-4 products
  };

  return (
    <div className={`w-full ${isMobile ? 'overflow-x-auto -mx-4' : 'overflow-x-auto md:overflow-x-visible -mx-4 md:mx-0'}`}>
      <div className={`${isMobile ? '' : 'px-4 md:px-0 min-w-max'}`}>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Products Header - Sticky */}
          <div className="sticky top-0 bg-white border-b-2 border-gray-200 z-20">
            <div className="grid" style={gridStyle}>
              {/* Features Header Label */}
              <div className={`font-semibold text-gray-700 border-r border-gray-200 ${isMobile ? 'p-1 text-[9px] sticky left-0 bg-white z-30' : 'p-4'}`}>
                Features
              </div>

              {products.map((product) => (
                <div key={product.model} className={`border-r border-gray-200 last:border-r-0 ${isMobile ? 'p-1' : 'p-4'}`}>
                  <div className="text-center">
                    <div className={`relative mx-auto ${isMobile ? 'w-10 h-10 mb-1' : 'w-32 h-32 mb-4'}`}>
                      <Image
                        src={product.image}
                        alt={product.fullName}
                        fill
                        className="object-contain"
                      />
                    </div>
                    {product.line === 'xpert-lfp-india' && (
                      <div className={`mb-1 ${isMobile ? 'scale-75 origin-center' : ''}`}>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200 text-[10px] font-bold">
                          <span>🇮🇳</span>
                          <span className="whitespace-nowrap">India Exclusive</span>
                        </span>
                      </div>
                    )}
                    <h3 className={`font-bold text-gray-900 leading-tight ${isMobile ? 'text-[9px] break-words' : 'text-lg'}`}>
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
                      className={`text-red-600 hover:text-red-700 font-medium flex items-center justify-center gap-1 mx-auto opacity-60 hover:opacity-100 transition-opacity ${isMobile ? 'mt-0.5 text-[8px]' : 'mt-3 text-xs'}`}
                    >
                      <Trash2 className={isMobile ? "w-2 h-2" : "w-3 h-3"} />
                      {isMobile ? 'X' : 'Remove'}
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
                    className={`w-full bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between text-left ${isMobile ? 'p-2' : 'p-4'}`}
                  >
                    <h3 className={`font-bold text-gray-900 ${isMobile ? 'text-xs' : 'text-base'}`}>{category.displayName}</h3>
                    <div className="flex items-center gap-2">
                      {!isMobile && (
                        <span className="text-sm text-gray-600">
                          {category.attributes.length} attribute
                          {category.attributes.length !== 1 ? 's' : ''}
                        </span>
                      )}
                      {isExpanded ? (
                        <ChevronUp className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-600`} />
                      ) : (
                        <ChevronDown className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-gray-600`} />
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
                          <div className={`flex items-center border-r border-gray-200 ${isMobile ? 'p-1 sticky left-0 bg-inherit z-10' : 'p-4'}`}>
                            <span className={`font-medium text-gray-700 ${isMobile ? 'text-[9px] break-words leading-tight' : ''}`}>
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
                                  ${isMobile ? 'p-1' : 'p-4'}
                                `}
                              >
                                {/* Custom Rendering based on Attribute Key */}
                                {attr.key === 'includedFeatures' ||
                                  attr.key === 'optionalAccessories' ? (
                                  <ul className={`space-y-1 ${isMobile ? 'text-[8px]' : 'text-sm space-y-2'}`}>
                                    {String(value)
                                      .split(', ')
                                      .map((item, i) => (
                                        <li
                                          key={i}
                                          className="flex items-start gap-2 text-gray-700"
                                        >
                                          {!isMobile && <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0" />}
                                          <span className={`leading-snug ${isMobile ? 'break-words' : ''}`}>{item}</span>
                                        </li>
                                      ))}
                                  </ul>
                                ) : attr.key === 'certifications' || attr.key === 'strapMaterials' ? (
                                  <div className={`flex flex-wrap gap-1 ${isMobile ? '' : 'gap-2'}`}>
                                    {String(value)
                                      .split(', ')
                                      .map((item, i) => (
                                        <span
                                          key={i}
                                          className={`bg-gray-100 border border-gray-200 rounded font-medium text-gray-600 uppercase tracking-wider 
                                            ${isMobile ? 'px-1 py-0.5 text-[7px]' : 'px-2 py-1 text-xs'}
                                          `}
                                        >
                                          {item}
                                        </span>
                                      ))}
                                  </div>
                                ) : String(value).startsWith('PDF:') ? (
                                  // Render PDF download links
                                  <a
                                    href={String(value).substring(4)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`inline-flex items-center gap-2 font-medium text-red-600 hover:text-red-700 hover:underline ${isMobile ? 'text-[9px]' : 'text-sm'}`}
                                  >
                                    <svg className={`${isMobile ? 'w-3 h-3' : 'w-4 h-4'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    <span>Download PDF</span>
                                  </a>
                                ) : (
                                  <div className="flex items-start gap-2">
                                    {!isDifferent && !isMobile && (
                                      <Check className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                                    )}
                                    {isDifferent && !isMobile && (
                                      <div className="w-2 h-2 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
                                    )}
                                    <span className={`text-gray-900 ${isMobile ? 'text-[9px] break-words leading-tight' : ''}`}>
                                      {value || 'N/A'}
                                    </span>
                                  </div>
                                )}

                                {isBestValue && (
                                  <div className={`absolute ${isMobile ? 'top-0.5 right-0.5' : 'top-2 right-2'}`}>
                                    <Award className={`${isMobile ? 'w-2.5 h-2.5' : 'w-5 h-5'} text-yellow-500`} />
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
