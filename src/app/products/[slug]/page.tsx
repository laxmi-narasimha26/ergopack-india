'use client';

import React from 'react';
import { notFound } from 'next/navigation';
import {
  ergoPack700,
  ergoPack700E,
  ergoPack700X,
  ergoPack700XLFP,
  ergoPack713E,
  ergoPack713X,
  ergoPack713XLFP,
  ergoPack726E,
  ergoPack726X,
  ergoPack726XLFP,
  ergoPack745E,
  ergoPack745X,
  ergoPackGO,
  ComprehensiveProduct,
} from '@/data/comprehensive-products';
import { HeroSection } from '@/components/products/HeroSection';
import { ProductStory } from '@/components/products/ProductStory';
import { TechnicalSpecifications } from '@/components/products/TechnicalSpecifications';
import { FeatureShowcase } from '@/components/products/FeatureShowcase';
import { GallerySection } from '@/components/products/GallerySection';
import { TrustSignalsSection } from './sections/TrustSignalsSection';
import { FinalCTASection } from './sections/FinalCTASection';
import { ProductNavigation } from '@/components/products/ProductNavigation';
import { BatteryPerformance } from '@/components/products/BatteryPerformance';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { ProductLinePage } from '@/components/products/ProductLinePage';
import { SeriesPage } from '@/components/products/SeriesPage';
import MainLayout from '@/components/layout/MainLayout';
import { useComparison } from '@/contexts/ComparisonContext';

interface ProductPageProps {
  params: {
    slug: string;
  };
}

export default function ProductPage({ params }: ProductPageProps) {
  const { slug } = params;
  const normalizedSlug = slug.toLowerCase();

  // Define Product Lines
  const xpertLine = [
    ergoPack700X,
    ergoPack700XLFP,
    ergoPack713X,
    ergoPack713XLFP,
    ergoPack726X,
    ergoPack726XLFP,
    ergoPack745X,
  ];
  const economyLine = [ergoPack700, ergoPack700E, ergoPack713E, ergoPack726E, ergoPack745E];
  const goLine = [ergoPackGO];

  // Check for Line Pages
  if (normalizedSlug === 'economy-line') {
    return <ProductLinePage line="economy" products={economyLine} />;
  }
  if (normalizedSlug === 'x-pert-line' || normalizedSlug === 'xpert-line') {
    return <ProductLinePage line="xpert" products={xpertLine} />;
  }
  if (normalizedSlug === 'go-line' || normalizedSlug === 'go') {
    return <ProductLinePage line="go" products={goLine} />;
  }

  // Check for Series Pages
  if (normalizedSlug === '700-series') {
    const products = [ergoPack700, ergoPack700E, ergoPack700X, ergoPack700XLFP];
    return <SeriesPage series="700" products={products} />;
  }
  if (normalizedSlug === '713-series') {
    const products = [ergoPack713E, ergoPack713X, ergoPack713XLFP];
    return <SeriesPage series="713" products={products} />;
  }
  if (normalizedSlug === '726-series') {
    const products = [ergoPack726E, ergoPack726X, ergoPack726XLFP];
    return <SeriesPage series="726" products={products} />;
  }
  if (normalizedSlug === '745-series') {
    const products = [ergoPack745E, ergoPack745X];
    return <SeriesPage series="745" products={products} />;
  }
  if (normalizedSlug === 'go-series') {
    return <SeriesPage series="GO" products={[ergoPackGO]} />;
  }

  // Map slug to comprehensive product data
  const getProductData = (slug: string): ComprehensiveProduct | undefined => {
    const normalizedSlug = slug.toLowerCase();

    // LFP Series (Prioritize these matches)
    if (normalizedSlug.includes('700x-lfp')) return ergoPack700XLFP;
    if (normalizedSlug.includes('713x-lfp')) return ergoPack713XLFP;
    if (normalizedSlug.includes('726x-lfp')) return ergoPack726XLFP;

    // 700 Series
    if (normalizedSlug.includes('700x') || normalizedSlug.includes('x-pert')) return ergoPack700X;
    if (normalizedSlug.includes('700e') || normalizedSlug.includes('economy')) return ergoPack700E;
    if (normalizedSlug === '700' || normalizedSlug.includes('manual')) return ergoPack700;

    // 713 Series
    if (normalizedSlug.includes('713x')) return ergoPack713X;
    if (normalizedSlug.includes('713e') || normalizedSlug.includes('713')) return ergoPack713E;

    // 726 Series
    if (normalizedSlug.includes('726x')) return ergoPack726X;
    if (normalizedSlug.includes('726e') || normalizedSlug.includes('726')) return ergoPack726E;

    // 745 Series
    if (normalizedSlug.includes('745x')) return ergoPack745X;
    if (normalizedSlug.includes('745e') || normalizedSlug.includes('745')) return ergoPack745E;

    // GO
    if (normalizedSlug.includes('go')) return ergoPackGO;

    return undefined;
  };

  const product = getProductData(slug);

  if (!product) {
    notFound();
  }

  // Prepare specs for technical section
  const prepareSpecs = () => {
    const systemSpecs = [
      {
        label: 'Length',
        value: product.specifications.dimensions.length,
        unit: product.specifications.dimensions.unit,
      },
      {
        label: 'Width',
        value: product.specifications.dimensions.width,
        unit: product.specifications.dimensions.unit,
      },
      {
        label: 'Height',
        value: product.specifications.dimensions.height,
        unit: product.specifications.dimensions.unit,
      },
      {
        label: 'Weight',
        value: product.specifications.weight,
        unit: product.specifications.weightUnit,
      },
    ];

    const performanceSpecs = [
      { label: 'Chain Speed', value: product.specifications.chainSpeed },
      { label: 'Chain Length', value: product.specifications.chainLength },
      { label: 'Control', value: product.specifications.control },
      {
        label: 'Pallet Width',
        value: `${product.specifications.palletWidth.min}-${product.specifications.palletWidth.max}`,
        unit: product.specifications.palletWidth.unit,
      },
    ];

    const powerSpecs = [
      {
        label: 'Battery Type',
        value: product.battery?.type || 'Manual Operation',
      },
      {
        label: 'Voltage',
        value: product.battery?.voltage || 'N/A',
      },
      {
        label: 'Cycles per Charge',
        value: product.battery?.strappingCycles || 'N/A',
      },
      {
        label: 'Charging Time',
        value: product.battery?.loadingTime || 'N/A',
      },
    ];

    return {
      system: systemSpecs,
      performance: performanceSpecs,
      power: powerSpecs,
    };
  };

  const specs = prepareSpecs();

  // Certifications
  const certifications = [
    { name: 'CE Certified' },
    { name: 'AGR Certified' },
    { name: 'ISO 9001' },
    { name: 'Made in Germany' },
  ];

  // FAQs (Static for now, could be dynamic if added to data)
  const faqs = [
    {
      question: 'What is the typical ROI timeframe?',
      answer:
        'Most customers achieve full return on investment within 6-12 months through labor savings, reduced packaging material waste, and elimination of load damage claims.',
    },
    {
      question: 'Is training required for operators?',
      answer:
        'Minimal training is needed. Most operators become proficient within 30 minutes. We provide comprehensive on-site training and video resources.',
    },
    {
      question: 'What strapping materials are compatible?',
      answer:
        'Supports standard PP and PET strapping in multiple widths. Contact our team for specific material recommendations for your application.',
    },
  ];

  // Event handlers
  const handleRequestDemo = () => {
    console.log('Request demo for', product.name);
  };

  const handleDownloadBrochure = () => {
    console.log('Download brochure for', product.name);
  };

  // Map features to FeatureShowcase format
  const features = product.features.slice(0, 6).map((feature) => ({
    title: feature.split(' - ')[0] || 'Key Feature', // Simple heuristic to extract title
    description: feature.split(' - ')[1] || feature, // Use rest as description or full string
  }));

  // Extract battery data safely for BatteryPerformance component
  const batteryCycles = product.battery?.strappingCycles || 0;
  const batteryLoadingTime = product.battery?.loadingTime || '0';
  const batteryVoltage = parseFloat(product.battery?.voltage?.replace('V', '') || '0');
  const batteryType = product.battery?.type || 'Standard';
  const hasBattery = product.battery && product.battery.type !== 'None - Manual Operation';

  const { addProduct, removeProduct, isSelected } = useComparison();
  const selected = isSelected(product.id);

  const toggleCompare = () => {
    if (selected) {
      removeProduct(product.id);
    } else {
      addProduct(product.id);
    }
  };

  return (
    <MainLayout>
      <main className="min-h-screen bg-background text-foreground relative selection:bg-primary/20">
        {/* Product Navigation - Sticky Sub-header */}
        <ProductNavigation />

        {/* Hero Section */}
        <HeroSection
          model={product.specifications.model}
          fullName={product.name}
          headline={product.tagline}
          subheadline={product.description}
          imageSrc={product.images.hero}
          onRequestDemo={handleRequestDemo}
          onDownloadBrochure={() => {
            if (product.pdfPath) {
              window.open(product.pdfPath, '_blank');
            } else {
              console.log('No brochure available for', product.name);
            }
          }}
          productId={product.id}
          onCompare={toggleCompare}
          isSelectedForComparison={selected}
          productData={product}
        />

        {/* Product Story Section */}
        <ProductStory
          headline="German Engineering Redefined"
          description={`The ${product.name} embodies the pinnacle of strapping technology. Designed for ${product.applications?.[0]?.toLowerCase() || 'professional use'}, it delivers unmatched reliability and ergonomic protection.`}
          imageSrc={product.images.hero}
          features={product.features.slice(0, 4)}
        />

        {/* Feature Showcase */}
        <FeatureShowcase features={features} />

        {/* Battery Performance Section (Conditional) */}
        {hasBattery && (
          <BatteryPerformance
            cycles={batteryCycles}
            loadingTime={batteryLoadingTime}
            voltage={batteryVoltage}
            type={batteryType}
          />
        )}

        {/* Technical Specifications */}
        <TechnicalSpecifications specs={specs} />

        {/* Gallery Section */}
        <GallerySection />

        {/* Trust Signals Section */}
        <TrustSignalsSection
          certifications={certifications}
          madeInGermany={true}
          warranty="2 Year"
        />

        {/* Final CTA Section */}
        <FinalCTASection
          model={product.name}
          onRequestDemo={handleRequestDemo}
          onDownloadBrochure={handleDownloadBrochure}
          faqs={faqs}
        />
      </main>
    </MainLayout>
  );
}
