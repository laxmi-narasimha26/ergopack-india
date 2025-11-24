'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface ComparisonContextType {
  selectedProducts: string[];
  addProduct: (productId: string) => boolean;
  removeProduct: (productId: string) => void;
  clearSelection: () => void;
  isSelected: (productId: string) => boolean;
  canAddMore: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

const MAX_PRODUCTS = 5;
const MIN_PRODUCTS = 2;
const STORAGE_KEY = 'ergopack-comparison-products';

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length <= MAX_PRODUCTS) {
          setSelectedProducts(parsed);
        }
      } catch (e) {
        console.error('Failed to parse comparison products from localStorage:', e);
      }
    }
    setIsInitialized(true);
  }, []);

  // Save to localStorage whenever selection changes
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedProducts));
    }
  }, [selectedProducts, isInitialized]);

  const addProduct = (productId: string): boolean => {
    if (selectedProducts.includes(productId)) {
      return false; // Already selected
    }

    if (selectedProducts.length >= MAX_PRODUCTS) {
      return false; // Max limit reached
    }

    setSelectedProducts((prev) => [...prev, productId]);
    return true;
  };

  const removeProduct = (productId: string): void => {
    setSelectedProducts((prev) => prev.filter((id) => id !== productId));
  };

  const clearSelection = (): void => {
    setSelectedProducts([]);
  };

  const isSelected = (productId: string): boolean => {
    return selectedProducts.includes(productId);
  };

  const canAddMore = selectedProducts.length < MAX_PRODUCTS;

  return (
    <ComparisonContext.Provider
      value={{
        selectedProducts,
        addProduct,
        removeProduct,
        clearSelection,
        isSelected,
        canAddMore,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}

export const COMPARISON_CONFIG = {
  MAX_PRODUCTS,
  MIN_PRODUCTS,
  STORAGE_KEY,
};
