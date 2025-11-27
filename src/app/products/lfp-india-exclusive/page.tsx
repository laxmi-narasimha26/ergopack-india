'use client';

import React from 'react';
import { ProductLinePage } from '@/components/products/ProductLinePage';
import { allComprehensiveProducts } from '@/data/comprehensive-products';

export default function LFPIndiaExclusivePage() {
    // Filter only LFP India Exclusive products
    const lfpProducts = allComprehensiveProducts.filter(
        (product) => product.line === 'xpert-lfp-india'
    );

    return <ProductLinePage line="xpert-lfp-india" products={lfpProducts} />;
}
