import type { Metadata } from 'next';
import MainLayout from '@/components/layout/MainLayout';
import ROICalculator from '@/components/roi/ROICalculator';

export const metadata: Metadata = {
  title: 'ROI Dashboard | ErgoPack India',
  description:
    'Projections & Analysis of ErgoPack Investment. Real-time calculation of payback period, annual savings, and operational time freed.',
};

export default function ROICalculatorPage() {
  return (
    <MainLayout>
      {/* Wrapper is now transparent/light by default from MainLayout or internal component */}
      <ROICalculator />
    </MainLayout>
  );
}
