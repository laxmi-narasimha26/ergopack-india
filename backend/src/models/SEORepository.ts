/**
 * SEO Repository - MongoDB models and CRUD operations for SEO management
 *
 * Handles:
 * - Global SEO settings (singleton)
 * - URL redirects (301/302)
 * - Page-level SEO overrides
 * - Sitemap configuration
 */

import mongoose, { Schema, Document, Model } from 'mongoose';

// =============================================================================
// INTERFACES
// =============================================================================

export interface ISEOSettings extends Document {
  // Global meta tags
  globalTitle: string;
  globalDescription: string;
  globalKeywords: string[];

  // Social media defaults
  ogDefaultImage: string;
  twitterHandle: string;

  // Analytics
  googleAnalyticsId: string;
  googleSearchConsoleId: string;

  // Robots
  robotsContent: string;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface IRedirect extends Document {
  sourceUrl: string;
  destinationUrl: string;
  statusCode: 301 | 302;
  isActive: boolean;
  hitCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface IPageSEO extends Document {
  // Entity reference (product, blog, page)
  entityType: 'product' | 'blog' | 'page' | 'custom';
  entityId: string;
  slug: string;

  // SEO fields
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string[];
  canonicalUrl: string;

  // Open Graph
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  ogType: string;

  // Twitter
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;

  // Sitemap
  sitemapPriority: number;
  sitemapChangeFreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  excludeFromSitemap: boolean;

  // Indexing
  noIndex: boolean;
  noFollow: boolean;

  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface ISitemapConfig extends Document {
  // Pages to include/exclude
  excludedPaths: string[];
  customPaths: Array<{
    path: string;
    priority: number;
    changeFreq: string;
  }>;

  // Default settings
  defaultPriority: number;
  defaultChangeFreq: string;

  // Auto-generation
  includeProducts: boolean;
  includeBlog: boolean;
  includePages: boolean;

  updatedAt: Date;
}

// =============================================================================
// SCHEMAS
// =============================================================================

const SEOSettingsSchema = new Schema<ISEOSettings>(
  {
    globalTitle: {
      type: String,
      default: 'ErgoPack India | Premium Pallet Strapping Solutions',
      maxlength: 60,
    },
    globalDescription: {
      type: String,
      default:
        "Made in Germany precision pallet strapping machines. Reduce labor costs, eliminate shipment damage. India's leading strapping solution provider.",
      maxlength: 160,
    },
    globalKeywords: {
      type: [String],
      default: ['pallet strapping', 'strapping machine', 'ErgoPack India', 'load securing'],
    },
    ogDefaultImage: {
      type: String,
      default: '/images/og-default.jpg',
    },
    twitterHandle: {
      type: String,
      default: '@ergopackindia',
    },
    googleAnalyticsId: {
      type: String,
      default: '',
    },
    googleSearchConsoleId: {
      type: String,
      default: '',
    },
    robotsContent: {
      type: String,
      default: `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: https://ergopack-india.com/sitemap.xml`,
    },
  },
  {
    timestamps: true,
    collection: 'seo_settings',
  }
);

const RedirectSchema = new Schema<IRedirect>(
  {
    sourceUrl: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    destinationUrl: {
      type: String,
      required: true,
    },
    statusCode: {
      type: Number,
      enum: [301, 302],
      default: 301,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    hitCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    collection: 'seo_redirects',
  }
);

const PageSEOSchema = new Schema<IPageSEO>(
  {
    entityType: {
      type: String,
      enum: ['product', 'blog', 'page', 'custom'],
      required: true,
    },
    entityId: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      index: true,
    },
    metaTitle: {
      type: String,
      maxlength: 60,
    },
    metaDescription: {
      type: String,
      maxlength: 160,
    },
    metaKeywords: {
      type: [String],
      default: [],
    },
    canonicalUrl: String,
    ogTitle: String,
    ogDescription: String,
    ogImage: String,
    ogType: {
      type: String,
      default: 'website',
    },
    twitterTitle: String,
    twitterDescription: String,
    twitterImage: String,
    sitemapPriority: {
      type: Number,
      min: 0,
      max: 1,
      default: 0.5,
    },
    sitemapChangeFreq: {
      type: String,
      enum: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'],
      default: 'monthly',
    },
    excludeFromSitemap: {
      type: Boolean,
      default: false,
    },
    noIndex: {
      type: Boolean,
      default: false,
    },
    noFollow: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    collection: 'seo_pages',
  }
);

// Compound index for efficient lookups
PageSEOSchema.index({ entityType: 1, entityId: 1 }, { unique: true });

const SitemapConfigSchema = new Schema<ISitemapConfig>(
  {
    excludedPaths: {
      type: [String],
      default: ['/admin', '/api', '/private'],
    },
    customPaths: {
      type: [
        {
          path: String,
          priority: Number,
          changeFreq: String,
        },
      ],
      default: [],
    },
    defaultPriority: {
      type: Number,
      default: 0.5,
    },
    defaultChangeFreq: {
      type: String,
      default: 'monthly',
    },
    includeProducts: {
      type: Boolean,
      default: true,
    },
    includeBlog: {
      type: Boolean,
      default: true,
    },
    includePages: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: 'seo_sitemap_config',
  }
);

// =============================================================================
// MODELS
// =============================================================================

let SEOSettings: Model<ISEOSettings>;
let Redirect: Model<IRedirect>;
let PageSEO: Model<IPageSEO>;
let SitemapConfig: Model<ISitemapConfig>;

try {
  SEOSettings = mongoose.model<ISEOSettings>('SEOSettings');
} catch {
  SEOSettings = mongoose.model<ISEOSettings>('SEOSettings', SEOSettingsSchema);
}

try {
  Redirect = mongoose.model<IRedirect>('Redirect');
} catch {
  Redirect = mongoose.model<IRedirect>('Redirect', RedirectSchema);
}

try {
  PageSEO = mongoose.model<IPageSEO>('PageSEO');
} catch {
  PageSEO = mongoose.model<IPageSEO>('PageSEO', PageSEOSchema);
}

try {
  SitemapConfig = mongoose.model<ISitemapConfig>('SitemapConfig');
} catch {
  SitemapConfig = mongoose.model<ISitemapConfig>('SitemapConfig', SitemapConfigSchema);
}

// =============================================================================
// REPOSITORY METHODS
// =============================================================================

export class SEORepository {
  // -------------------------------------------------------------------------
  // SEO SETTINGS (Singleton)
  // -------------------------------------------------------------------------

  static async getSettings(): Promise<ISEOSettings> {
    let settings = await SEOSettings.findOne();
    if (!settings) {
      settings = await SEOSettings.create({});
    }
    return settings;
  }

  static async updateSettings(data: Partial<ISEOSettings>): Promise<ISEOSettings> {
    const settings = await this.getSettings();
    Object.assign(settings, data);
    await settings.save();
    return settings;
  }

  // -------------------------------------------------------------------------
  // REDIRECTS
  // -------------------------------------------------------------------------

  static async getRedirects(
    page: number = 1,
    limit: number = 20,
    search?: string
  ): Promise<{ redirects: IRedirect[]; total: number; pages: number }> {
    const query = search
      ? {
          $or: [
            { sourceUrl: { $regex: search, $options: 'i' } },
            { destinationUrl: { $regex: search, $options: 'i' } },
          ],
        }
      : {};

    const [redirects, total] = await Promise.all([
      Redirect.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Redirect.countDocuments(query),
    ]);

    return {
      redirects,
      total,
      pages: Math.ceil(total / limit),
    };
  }

  static async getRedirectBySource(sourceUrl: string): Promise<IRedirect | null> {
    return Redirect.findOne({ sourceUrl, isActive: true });
  }

  static async createRedirect(data: {
    sourceUrl: string;
    destinationUrl: string;
    statusCode?: 301 | 302;
  }): Promise<IRedirect> {
    return Redirect.create(data);
  }

  static async updateRedirect(id: string, data: Partial<IRedirect>): Promise<IRedirect | null> {
    return Redirect.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteRedirect(id: string): Promise<boolean> {
    const result = await Redirect.findByIdAndDelete(id);
    return !!result;
  }

  static async incrementRedirectHit(sourceUrl: string): Promise<void> {
    await Redirect.updateOne({ sourceUrl }, { $inc: { hitCount: 1 } });
  }

  static async bulkCreateRedirects(
    redirects: Array<{ sourceUrl: string; destinationUrl: string; statusCode?: 301 | 302 }>
  ): Promise<{ created: number; failed: number; errors: string[] }> {
    let created = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const redirect of redirects) {
      try {
        await Redirect.create(redirect);
        created++;
      } catch (error: any) {
        failed++;
        errors.push(`${redirect.sourceUrl}: ${error.message}`);
      }
    }

    return { created, failed, errors };
  }

  // -------------------------------------------------------------------------
  // PAGE SEO
  // -------------------------------------------------------------------------

  static async getPageSEO(entityType: string, entityId: string): Promise<IPageSEO | null> {
    return PageSEO.findOne({ entityType, entityId });
  }

  static async getPageSEOBySlug(slug: string): Promise<IPageSEO | null> {
    return PageSEO.findOne({ slug });
  }

  static async upsertPageSEO(
    entityType: string,
    entityId: string,
    data: Partial<IPageSEO>
  ): Promise<IPageSEO> {
    const result = await PageSEO.findOneAndUpdate(
      { entityType, entityId },
      { ...data, entityType, entityId },
      { upsert: true, new: true }
    );
    return result;
  }

  static async deletePageSEO(entityType: string, entityId: string): Promise<boolean> {
    const result = await PageSEO.deleteOne({ entityType, entityId });
    return result.deletedCount > 0;
  }

  static async getAllPageSEO(entityType?: string): Promise<IPageSEO[]> {
    const query = entityType ? { entityType } : {};
    return PageSEO.find(query).sort({ updatedAt: -1 });
  }

  // -------------------------------------------------------------------------
  // SITEMAP CONFIG
  // -------------------------------------------------------------------------

  static async getSitemapConfig(): Promise<ISitemapConfig> {
    let config = await SitemapConfig.findOne();
    if (!config) {
      config = await SitemapConfig.create({});
    }
    return config;
  }

  static async updateSitemapConfig(data: Partial<ISitemapConfig>): Promise<ISitemapConfig> {
    const config = await this.getSitemapConfig();
    Object.assign(config, data);
    await config.save();
    return config;
  }

  // -------------------------------------------------------------------------
  // ROBOTS.TXT
  // -------------------------------------------------------------------------

  static async getRobotsContent(): Promise<string> {
    const settings = await this.getSettings();
    return settings.robotsContent;
  }

  static async updateRobotsContent(content: string): Promise<void> {
    await this.updateSettings({ robotsContent: content });
  }
}

export { SEOSettings, Redirect, PageSEO, SitemapConfig };
