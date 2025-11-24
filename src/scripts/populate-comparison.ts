import fs from 'fs';
import path from 'path';
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
} from '../data/comprehensive-products';
import { Product, ComparisonData } from '../types/comparison';

function parseRange(
  value: string | undefined,
  unit: string
): { min: number; max: number; unit: string } | undefined {
  if (!value) return undefined;
  // Handle "10-230" or "10 - 230"
  const parts = value.split('-').map((s) => parseFloat(s.trim()));
  if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
    return { min: parts[0], max: parts[1], unit };
  }
  return undefined;
}

function parseValue(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? undefined : parsed;
}

function getProductImage(productId: string): string {
  const id = productId.toLowerCase();
  // Map known IDs to the new image paths
  const imageMap: Record<string, string> = {
    'ergopack 700': '/images/products/700.png',
    'ergopack 700e': '/images/products/700e.png',
    'ergopack 700x': '/images/products/700x.png',
    'ergopack 700x-lfp': '/images/products/700x.png', // Use same image as 700X
    'ergopack 713e': '/images/products/713e.png',
    'ergopack 713x': '/images/products/713x.png',
    'ergopack 713x-lfp': '/images/products/713x.png', // Use same image as 713X
    'ergopack 726e': '/images/products/726e.png',
    'ergopack 726x': '/images/products/726x.png',
    'ergopack 726x-lfp': '/images/products/726x.png', // Use same image as 726X
    'ergopack 745e': '/images/products/745e.png',
    'ergopack 745x': '/images/products/745x.png',
  };

  return imageMap[id] || '/images/placeholder.png'; // Fallback
}

function mapProductToComparison(cp: ComprehensiveProduct): Product {
  const specs = cp.specifications;
  const battery = cp.battery;

  const comparison: ComparisonData = {
    systemSpecs: {
      dimensions: {
        length: specs.dimensions.length,
        width: specs.dimensions.width,
        height: specs.dimensions.height,
        unit: specs.dimensions.unit,
      },
      weight: specs.weight,
      weightUnit: specs.weightUnit,
      construction: 'Steel / Aluminum / Plastic', // Default inferred
    },
    flexibility: {
      palletWidth: {
        min: specs.palletWidth.min,
        max: specs.palletWidth.max,
        unit: specs.palletWidth.unit,
      },
      palletHeight: {
        min: specs.palletHeight.min,
        max: specs.palletHeight.max,
        unit: specs.palletHeight.unit,
      },
    },
    performance: {
      chainSpeed: parseFloat(specs.chainSpeed.replace('m/min', '').trim()) || 0, // Handle "40m/min"
      chainSpeedUnit: 'm/min',
      standardChainLength: 6, // Standard 6m
      chainLengthUnit: 'm',
      operationType: specs.control,
    },
    powerBattery: {
      type: battery?.type || 'N/A',
      weight: battery?.weight,
      weightUnit: 'kg',
      loadingTime:
        typeof battery?.loadingTime === 'string'
          ? parseFloat(battery.loadingTime.replace(/[^0-9.]/g, ''))
          : undefined, // Extract number
      loadingTimeUnit: 'hours',
      voltageNominal: battery?.voltage ? parseFloat(battery.voltage.replace('V', '')) : undefined,
      voltageUnit: 'V',
      strappingCycles: battery?.strappingCycles,
    },
    sealingStrapping: {
      strapMaterials: cp.materialCompatibility || [],
      // Tension power and strap width are not explicitly in specs, but strapWidth might be
      strapWidth: specs.strapWidth ? parseRange(specs.strapWidth, 'mm') : undefined,
    },
    controlDisplay: {
      interfaceType: specs.control,
      touchscreen: specs.settingsChange.toLowerCase().includes('touchscreen'),
      displayType: specs.settingsChange,
    },
    safetyErgonomics: {
      certifications: Object.keys(cp.certifications).filter(
        (k) => cp.certifications[k as keyof typeof cp.certifications]
      ),
      agrCertified: cp.certifications.agr || false,
    },
    featuresAccessories: {
      included: cp.includedAccessories.map((a) => a.name),
      optional: cp.optionalAccessories.map((a) => a.name),
    },
    environmental: {
      // Not available in comprehensive-products
    },
    maintenance: {
      // Not available
    },
  };

  return {
    model: cp.id,
    fullName: cp.name,
    image: getProductImage(cp.name), // Use name for mapping as ID might be just number
    line:
      cp.line === 'economy' ? 'Economy Line' : cp.line === 'xpert' ? 'X-pert Line' : 'ErgoPack GO',
    generation: parseInt(specs.generation || '2'),
    tariffNumber: specs.tariffNr,
    description: cp.description,
    applicationType: cp.applications[0] || 'General',
    htmlPage: `/products/${cp.id.toLowerCase()}`,
    pdfPath: `/pdfs/${cp.id}_Technical_Data.pdf`, // Placeholder
    overviewPath: `/pdfs/${cp.id}_Model_Overview.pdf`, // Placeholder
    comparison,
  };
}

const products = [
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
];

const comparisonData: Record<string, Product> = {};

products.forEach((p) => {
  comparisonData[p.id] = mapProductToComparison(p);
});

const outputPath = path.join(__dirname, '../data/products-comparison-data.json');
fs.writeFileSync(outputPath, JSON.stringify(comparisonData, null, 2));
console.log(`Successfully wrote comparison data to ${outputPath}`);
