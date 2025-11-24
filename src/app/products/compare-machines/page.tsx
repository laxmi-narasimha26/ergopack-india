'use client';

import React from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Premium3DCard } from '@/components/ui/Premium3DCard';
import { CheckCircle2, XCircle, Minus } from 'lucide-react';
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

export default function CompareMachinesPage() {
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

  const specs = [
    { label: 'Line', key: 'line' },
    { label: 'Model', key: 'name' },
    { label: 'Battery', key: 'battery.type' },
    { label: 'Chain Speed', key: 'specifications.chainSpeed' },
    { label: 'Pallet Width', key: 'specifications.palletWidth' },
    { label: 'Pallet Height', key: 'specifications.palletHeight' },
    { label: 'Sealing Head', key: 'sealingHead.included' },
    { label: 'Touchscreen', key: 'features', check: 'Siemens Touchscreen' },
    { label: 'Laser Positioning', key: 'features', check: 'Line-Laser' },
  ];

  const getValue = (product: any, spec: any) => {
    if (spec.check) {
      const hasFeature = product.features.some((f: string) => f.includes(spec.check));
      return hasFeature ? (
        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <Minus className="w-5 h-5 text-gray-300 mx-auto" />
      );
    }

    const keys = spec.key.split('.');
    let value = product;
    for (const k of keys) {
      value = value?.[k];
    }

    if (typeof value === 'boolean') {
      return value ? (
        <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
      ) : (
        <XCircle className="w-5 h-5 text-red-500 mx-auto" />
      );
    }

    if (typeof value === 'object' && value !== null && 'min' in value) {
      return `${value.min}-${value.max}${value.unit}`;
    }

    return value || '-';
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-white pt-32 pb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-serif text-5xl font-bold text-luxury-dark-gray mb-6">
              Compare Models
            </h1>
            <p className="text-xl text-platinum-600 max-w-3xl mx-auto">
              Find the perfect ErgoPack system for your specific requirements.
            </p>
          </div>

          <div className="overflow-x-auto pb-12">
            <table className="w-full border-collapse min-w-[1200px]">
              <thead>
                <tr>
                  <th className="p-4 text-left bg-gray-50 sticky left-0 z-10 border-b border-gray-200">
                    Specification
                  </th>
                  {allProducts.map((product) => (
                    <th
                      key={product.id}
                      className="p-4 text-center border-b border-gray-200 min-w-[200px]"
                    >
                      <span
                        className={`font-bold ${product.line === 'xpert' ? 'text-crimson-600' : 'text-gray-900'}`}
                      >
                        {product.name}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specs.map((spec, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-left font-medium text-gray-700 sticky left-0 bg-white border-b border-gray-100">
                      {spec.label}
                    </td>
                    {allProducts.map((product) => (
                      <td
                        key={product.id}
                        className="p-4 text-center text-sm text-gray-600 border-b border-gray-100 border-l border-dashed border-gray-200"
                      >
                        {getValue(product, spec)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
