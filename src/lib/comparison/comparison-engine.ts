import {
  Product,
  ComparisonMatrix,
  ComparisonCategory,
  ComparisonAttribute,
  ComparisonData,
} from '@/types/comparison';

/**
 * Generates a comparison matrix from selected products
 */
export function generateComparisonMatrix(products: Product[]): ComparisonMatrix {
  if (products.length < 2) {
    throw new Error('At least 2 products required for comparison');
  }

  const categories = buildComparisonCategories(products);
  const { totalDifferences, totalSimilarities } = calculateStats(categories);

  return {
    products,
    categories,
    metadata: {
      totalDifferences,
      totalSimilarities,
      comparisonDate: new Date().toISOString(),
    },
  };
}

/**
 * Build all comparison categories with attributes
 */
function buildComparisonCategories(products: Product[]): ComparisonCategory[] {
  const categories: ComparisonCategory[] = [];

  // System Specifications
  categories.push({
    name: 'systemSpecs',
    displayName: 'System Specifications',
    attributes: extractSystemSpecs(products),
  });

  // Flexibility
  categories.push({
    name: 'flexibility',
    displayName: 'Operational Flexibility',
    attributes: extractFlexibility(products),
  });

  // Performance
  categories.push({
    name: 'performance',
    displayName: 'Performance Metrics',
    attributes: extractPerformance(products),
  });

  // Power & Battery
  categories.push({
    name: 'powerBattery',
    displayName: 'Power & Battery',
    attributes: extractPowerBattery(products),
  });

  // Sealing & Strapping
  categories.push({
    name: 'sealingStrapping',
    displayName: 'Sealing & Strapping',
    attributes: extractSealingStrapping(products),
  });

  // Control & Display
  categories.push({
    name: 'controlDisplay',
    displayName: 'Control & Display',
    attributes: extractControlDisplay(products),
  });

  // Safety & Ergonomics
  categories.push({
    name: 'safetyErgonomics',
    displayName: 'Safety & Ergonomics',
    attributes: extractSafetyErgonomics(products),
  });

  // Features & Accessories
  categories.push({
    name: 'featuresAccessories',
    displayName: 'Features & Accessories',
    attributes: extractFeaturesAccessories(products),
  });

  // Environmental (if available)
  const envAttrs = extractEnvironmental(products);
  if (envAttrs.length > 0) {
    categories.push({
      name: 'environmental',
      displayName: 'Environmental & Operating Conditions',
      attributes: envAttrs,
    });
  }

  // Maintenance (if available)
  const maintAttrs = extractMaintenance(products);
  if (maintAttrs.length > 0) {
    categories.push({
      name: 'maintenance',
      displayName: 'Maintenance & Service',
      attributes: maintAttrs,
    });
  }

  return categories;
}

/**
 * Extract system specifications attributes
 */
function extractSystemSpecs(products: Product[]): ComparisonAttribute[] {
  const attrs: ComparisonAttribute[] = [];

  // Dimensions
  attrs.push(
    createAttribute('dimensions', 'Dimensions (L × W × H)', products, (p) => {
      const d = p.comparison.systemSpecs.dimensions;
      return `${d.length} × ${d.width} × ${d.height} ${d.unit}`;
    })
  );

  // Weight
  attrs.push(
    createAttribute(
      'weight',
      'Weight',
      products,
      (p) => `${p.comparison.systemSpecs.weight} ${p.comparison.systemSpecs.weightUnit}`
    )
  );

  // Construction
  if (products.some((p) => p.comparison.systemSpecs.construction)) {
    attrs.push(
      createAttribute(
        'construction',
        'Construction',
        products,
        (p) => p.comparison.systemSpecs.construction || 'N/A'
      )
    );
  }

  return attrs;
}

/**
 * Extract flexibility attributes
 */
function extractFlexibility(products: Product[]): ComparisonAttribute[] {
  const attrs: ComparisonAttribute[] = [];

  attrs.push(
    createAttribute('palletWidth', 'Pallet Width Range', products, (p) => {
      const w = p.comparison.flexibility.palletWidth;
      return `${w.min} - ${w.max} ${w.unit}`;
    })
  );

  attrs.push(
    createAttribute('palletHeight', 'Pallet Height Range', products, (p) => {
      const h = p.comparison.flexibility.palletHeight;
      return `${h.min} - ${h.max} ${h.unit}`;
    })
  );

  return attrs;
}

/**
 * Extract performance attributes
 */
function extractPerformance(products: Product[]): ComparisonAttribute[] {
  const attrs: ComparisonAttribute[] = [];

  // Chain speed (if available)
  if (products.some((p) => p.comparison.performance.chainSpeed)) {
    attrs.push(
      createAttribute(
        'chainSpeed',
        'Chain Speed',
        products,
        (p) =>
          p.comparison.performance.chainSpeed
            ? `${p.comparison.performance.chainSpeed} ${p.comparison.performance.chainSpeedUnit}`
            : 'Manual',
        true // numeric comparison for best value
      )
    );
  }

  attrs.push(
    createAttribute(
      'chainLength',
      'Standard Chain Length',
      products,
      (p) =>
        `${p.comparison.performance.standardChainLength} ${p.comparison.performance.chainLengthUnit}`
    )
  );

  if (products.some((p) => p.comparison.performance.operationType)) {
    attrs.push(
      createAttribute(
        'operationType',
        'Operation Type',
        products,
        (p) => p.comparison.performance.operationType || 'Automated'
      )
    );
  }

  return attrs;
}

/**
 * Extract power and battery attributes
 */
function extractPowerBattery(products: Product[]): ComparisonAttribute[] {
  const attrs: ComparisonAttribute[] = [];

  attrs.push(
    createAttribute('batteryType', 'Battery Type', products, (p) => p.comparison.powerBattery.type)
  );

  // Strapping cycles
  if (products.some((p) => p.comparison.powerBattery.strappingCycles)) {
    attrs.push(
      createAttribute(
        'strappingCycles',
        'Strapping Cycles per Charge',
        products,
        (p) => p.comparison.powerBattery.strappingCycles?.toString() || 'N/A',
        true
      )
    );
  }

  // Charging time
  if (products.some((p) => p.comparison.powerBattery.loadingTime)) {
    attrs.push(
      createAttribute('chargingTime', 'Charging Time', products, (p) => {
        const lt = p.comparison.powerBattery.loadingTime;
        if (typeof lt === 'number') {
          return `${lt} ${p.comparison.powerBattery.loadingTimeUnit || 'hours'}`;
        }
        if (lt && typeof lt === 'object' && 'min' in lt) {
          return `${lt.min}-${lt.max} ${lt.unit}`;
        }
        return 'N/A';
      })
    );
  }

  // Battery weight
  if (products.some((p) => p.comparison.powerBattery.weight)) {
    attrs.push(
      createAttribute('batteryWeight', 'Battery Weight', products, (p) =>
        p.comparison.powerBattery.weight
          ? `${p.comparison.powerBattery.weight} ${p.comparison.powerBattery.weightUnit}`
          : 'N/A'
      )
    );
  }

  return attrs;
}

/**
 * Extract sealing and strapping attributes
 */
function extractSealingStrapping(products: Product[]): ComparisonAttribute[] {
  const attrs: ComparisonAttribute[] = [];

  // Tension power
  if (products.some((p) => p.comparison.sealingStrapping.tensionPower)) {
    attrs.push(
      createAttribute('tensionPower', 'Tension Power Range', products, (p) => {
        const tp = p.comparison.sealingStrapping.tensionPower;
        return tp ? `${tp.min} - ${tp.max} ${tp.unit}` : 'N/A';
      })
    );
  }

  // Strap width
  if (products.some((p) => p.comparison.sealingStrapping.strapWidth)) {
    attrs.push(
      createAttribute('strapWidth', 'Strap Width Range', products, (p) => {
        const sw = p.comparison.sealingStrapping.strapWidth;
        return sw ? `${sw.min} - ${sw.max} ${sw.unit}` : 'N/A';
      })
    );
  }

  // Strap materials
  attrs.push(
    createAttribute('strapMaterials', 'Compatible Strap Materials', products, (p) =>
      p.comparison.sealingStrapping.strapMaterials.join(', ')
    )
  );

  // Sealing head mounting
  if (products.some((p) => p.comparison.sealingStrapping.mounting)) {
    attrs.push(
      createAttribute(
        'sealingMounting',
        'Sealing Head Mounting',
        products,
        (p) =>
          p.comparison.sealingStrapping.mounting ||
          p.comparison.sealingStrapping.availability ||
          'N/A'
      )
    );
  }

  return attrs;
}

/**
 * Extract control and display attributes
 */
function extractControlDisplay(products: Product[]): ComparisonAttribute[] {
  const attrs: ComparisonAttribute[] = [];

  if (products.some((p) => p.comparison.controlDisplay.touchscreen !== undefined)) {
    attrs.push(
      createAttribute('touchscreen', 'Touchscreen', products, (p) =>
        p.comparison.controlDisplay.touchscreen ? 'Yes' : 'No'
      )
    );
  }

  if (products.some((p) => p.comparison.controlDisplay.touchscreenType)) {
    attrs.push(
      createAttribute(
        'touchscreenType',
        'Touchscreen Type',
        products,
        (p) => p.comparison.controlDisplay.touchscreenType || 'N/A'
      )
    );
  }

  return attrs;
}

/**
 * Extract safety and ergonomics attributes
 */
function extractSafetyErgonomics(products: Product[]): ComparisonAttribute[] {
  const attrs: ComparisonAttribute[] = [];

  attrs.push(
    createAttribute('certifications', 'Certifications', products, (p) =>
      p.comparison.safetyErgonomics.certifications.join(', ')
    )
  );

  attrs.push(
    createAttribute('agrCertified', 'AGR Certified (Ergonomic)', products, (p) =>
      p.comparison.safetyErgonomics.agrCertified ? 'Yes' : 'No'
    )
  );

  return attrs;
}

/**
 * Extract features and accessories attributes
 */
function extractFeaturesAccessories(products: Product[]): ComparisonAttribute[] {
  const attrs: ComparisonAttribute[] = [];

  attrs.push(
    createAttribute('includedFeatures', 'Included Features', products, (p) =>
      p.comparison.featuresAccessories.included.length > 0
        ? p.comparison.featuresAccessories.included.join(', ')
        : 'Standard features'
    )
  );

  if (
    products.some(
      (p) =>
        p.comparison.featuresAccessories.optional &&
        p.comparison.featuresAccessories.optional.length > 0
    )
  ) {
    attrs.push(
      createAttribute('optionalAccessories', 'Optional Accessories', products, (p) =>
        p.comparison.featuresAccessories.optional &&
        p.comparison.featuresAccessories.optional.length > 0
          ? p.comparison.featuresAccessories.optional.join(', ')
          : 'None listed'
      )
    );
  }

  return attrs;
}

/**
 * Extract environmental attributes
 */
function extractEnvironmental(products: Product[]): ComparisonAttribute[] {
  const attrs: ComparisonAttribute[] = [];

  // Only add if at least one product has environmental data
  if (!products.some((p) => p.comparison.environmental)) {
    return attrs;
  }

  if (products.some((p) => p.comparison.environmental?.noiseLevel)) {
    attrs.push(
      createAttribute('noiseLevel', 'Noise Level', products, (p) => {
        const nl = p.comparison.environmental?.noiseLevel;
        return nl ? `${nl.value} ${nl.unit}` : 'N/A';
      })
    );
  }

  return attrs;
}

/**
 * Extract maintenance attributes
 */
function extractMaintenance(products: Product[]): ComparisonAttribute[] {
  const attrs: ComparisonAttribute[] = [];

  // Only add if at least one product has maintenance data
  if (!products.some((p) => p.comparison.maintenance)) {
    return attrs;
  }

  return attrs;
}

/**
 * Helper function to create a comparison attribute
 */
function createAttribute(
  key: string,
  label: string,
  products: Product[],
  valueExtractor: (product: Product) => string,
  isNumeric: boolean = false
): ComparisonAttribute {
  const values: Record<string, string> = {};
  const uniqueValues = new Set<string>();

  products.forEach((product) => {
    const value = valueExtractor(product);
    values[product.model] = value;
    uniqueValues.add(value);
  });

  const isDifferent = uniqueValues.size > 1;

  // Determine best value for numeric comparisons
  let bestValue: string | undefined;
  if (isNumeric && isDifferent) {
    bestValue = findBestNumericValue(values);
  }

  return {
    key,
    label,
    values,
    isDifferent,
    bestValue,
  };
}

/**
 * Find the product with the best (highest) numeric value
 */
function findBestNumericValue(values: Record<string, string>): string | undefined {
  let maxValue = -Infinity;
  let bestModel: string | undefined;

  Object.entries(values).forEach(([model, valueStr]) => {
    // Extract numeric value from string
    const match = valueStr.match(/[\d.]+/);
    if (match) {
      const numValue = parseFloat(match[0]);
      if (numValue > maxValue) {
        maxValue = numValue;
        bestModel = model;
      }
    }
  });

  return bestModel;
}

/**
 * Calculate total differences and similarities
 */
function calculateStats(categories: ComparisonCategory[]): {
  totalDifferences: number;
  totalSimilarities: number;
} {
  let totalDifferences = 0;
  let totalSimilarities = 0;

  categories.forEach((category) => {
    category.attributes.forEach((attr) => {
      if (attr.isDifferent) {
        totalDifferences++;
      } else {
        totalSimilarities++;
      }
    });
  });

  return { totalDifferences, totalSimilarities };
}

/**
 * Filter categories based on filter mode
 */
export function filterCategories(
  categories: ComparisonCategory[],
  filterMode: 'all' | 'differences' | 'similarities'
): ComparisonCategory[] {
  if (filterMode === 'all') {
    return categories;
  }

  return categories
    .map((category) => ({
      ...category,
      attributes: category.attributes.filter((attr) =>
        filterMode === 'differences' ? attr.isDifferent : !attr.isDifferent
      ),
    }))
    .filter((category) => category.attributes.length > 0);
}
