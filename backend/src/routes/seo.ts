import { Router, Request, Response } from 'express';
import { authenticate, authorize } from '../middleware/auth';
import { SEORepository } from '../models/SEORepository';

const router = Router();

// =============================================================================
// SEO SETTINGS (Global)
// =============================================================================

/**
 * GET /api/seo/settings - Get global SEO settings
 */
router.get(
  '/settings',
  authenticate,
  authorize('seo.read', '*'),
  async (req: Request, res: Response) => {
    try {
      const settings = await SEORepository.getSettings();
      res.json({
        success: true,
        data: settings,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get SEO settings',
      });
    }
  }
);

/**
 * PUT /api/seo/settings - Update global SEO settings
 */
router.put(
  '/settings',
  authenticate,
  authorize('seo.update', '*'),
  async (req: Request, res: Response) => {
    try {
      const settings = await SEORepository.updateSettings(req.body);
      res.json({
        success: true,
        data: settings,
        message: 'SEO settings updated successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update SEO settings',
      });
    }
  }
);

// =============================================================================
// REDIRECTS
// =============================================================================

/**
 * GET /api/seo/redirects - Get all redirects with pagination
 * QUERY: page, limit, search
 */
router.get(
  '/redirects',
  authenticate,
  authorize('seo.read', '*'),
  async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const search = req.query.search as string;

      const result = await SEORepository.getRedirects(page, limit, search);

      res.json({
        success: true,
        data: result.redirects,
        pagination: {
          page,
          limit,
          total: result.total,
          pages: result.pages,
        },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get redirects',
      });
    }
  }
);

/**
 * POST /api/seo/redirects - Create a new redirect
 */
router.post(
  '/redirects',
  authenticate,
  authorize('seo.update', '*'),
  async (req: Request, res: Response) => {
    try {
      const { sourceUrl, destinationUrl, statusCode } = req.body;

      if (!sourceUrl || !destinationUrl) {
        return res.status(400).json({
          success: false,
          message: 'Source URL and destination URL are required',
        });
      }

      const redirect = await SEORepository.createRedirect({
        sourceUrl,
        destinationUrl,
        statusCode: statusCode || 301,
      });

      res.status(201).json({
        success: true,
        data: redirect,
        message: 'Redirect created successfully',
      });
    } catch (error: any) {
      if (error.code === 11000) {
        return res.status(400).json({
          success: false,
          message: 'A redirect for this source URL already exists',
        });
      }
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to create redirect',
      });
    }
  }
);

/**
 * POST /api/seo/redirects/bulk - Bulk create redirects
 */
router.post(
  '/redirects/bulk',
  authenticate,
  authorize('seo.update', '*'),
  async (req: Request, res: Response) => {
    try {
      const { redirects } = req.body;

      if (!Array.isArray(redirects) || redirects.length === 0) {
        return res.status(400).json({
          success: false,
          message: 'Please provide an array of redirects',
        });
      }

      const result = await SEORepository.bulkCreateRedirects(redirects);

      res.status(201).json({
        success: true,
        data: result,
        message: `Created ${result.created} redirects, ${result.failed} failed`,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to bulk create redirects',
      });
    }
  }
);

/**
 * PUT /api/seo/redirects/:id - Update a redirect
 */
router.put(
  '/redirects/:id',
  authenticate,
  authorize('seo.update', '*'),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const redirect = await SEORepository.updateRedirect(id, req.body);

      if (!redirect) {
        return res.status(404).json({
          success: false,
          message: 'Redirect not found',
        });
      }

      res.json({
        success: true,
        data: redirect,
        message: 'Redirect updated successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update redirect',
      });
    }
  }
);

/**
 * DELETE /api/seo/redirects/:id - Delete a redirect
 */
router.delete(
  '/redirects/:id',
  authenticate,
  authorize('seo.update', '*'),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await SEORepository.deleteRedirect(id);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Redirect not found',
        });
      }

      res.json({
        success: true,
        message: 'Redirect deleted successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete redirect',
      });
    }
  }
);

// =============================================================================
// ROBOTS.TXT
// =============================================================================

/**
 * GET /api/seo/robots - Get robots.txt content
 */
router.get(
  '/robots',
  authenticate,
  authorize('seo.read', '*'),
  async (req: Request, res: Response) => {
    try {
      const content = await SEORepository.getRobotsContent();
      res.json({
        success: true,
        data: { content },
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get robots.txt',
      });
    }
  }
);

/**
 * PUT /api/seo/robots - Update robots.txt content
 */
router.put(
  '/robots',
  authenticate,
  authorize('seo.update', '*'),
  async (req: Request, res: Response) => {
    try {
      const { content } = req.body;

      if (typeof content !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Content must be a string',
        });
      }

      await SEORepository.updateRobotsContent(content);

      res.json({
        success: true,
        message: 'robots.txt updated successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update robots.txt',
      });
    }
  }
);

// =============================================================================
// PAGE SEO (Per-entity meta)
// =============================================================================

/**
 * GET /api/seo/meta/:entityType/:entityId - Get SEO meta for entity
 */
router.get(
  '/meta/:entityType/:entityId',
  authenticate,
  authorize('seo.read', '*'),
  async (req: Request, res: Response) => {
    try {
      const { entityType, entityId } = req.params;
      const pageSeo = await SEORepository.getPageSEO(entityType, entityId);

      res.json({
        success: true,
        data: pageSeo,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get page SEO',
      });
    }
  }
);

/**
 * GET /api/seo/meta/:entityType - Get all SEO meta for entity type
 */
router.get(
  '/meta/:entityType',
  authenticate,
  authorize('seo.read', '*'),
  async (req: Request, res: Response) => {
    try {
      const { entityType } = req.params;
      const pageSeoList = await SEORepository.getAllPageSEO(entityType);

      res.json({
        success: true,
        data: pageSeoList,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get page SEO list',
      });
    }
  }
);

/**
 * PUT /api/seo/meta/:entityType/:entityId - Update SEO meta for entity
 */
router.put(
  '/meta/:entityType/:entityId',
  authenticate,
  authorize('seo.update', '*'),
  async (req: Request, res: Response) => {
    try {
      const { entityType, entityId } = req.params;
      const pageSeo = await SEORepository.upsertPageSEO(entityType, entityId, req.body);

      res.json({
        success: true,
        data: pageSeo,
        message: 'Page SEO updated successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update page SEO',
      });
    }
  }
);

/**
 * DELETE /api/seo/meta/:entityType/:entityId - Delete SEO meta for entity
 */
router.delete(
  '/meta/:entityType/:entityId',
  authenticate,
  authorize('seo.update', '*'),
  async (req: Request, res: Response) => {
    try {
      const { entityType, entityId } = req.params;
      const deleted = await SEORepository.deletePageSEO(entityType, entityId);

      if (!deleted) {
        return res.status(404).json({
          success: false,
          message: 'Page SEO not found',
        });
      }

      res.json({
        success: true,
        message: 'Page SEO deleted successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to delete page SEO',
      });
    }
  }
);

// =============================================================================
// SITEMAP CONFIGURATION
// =============================================================================

/**
 * GET /api/seo/sitemap-config - Get sitemap configuration
 */
router.get(
  '/sitemap-config',
  authenticate,
  authorize('seo.read', '*'),
  async (req: Request, res: Response) => {
    try {
      const config = await SEORepository.getSitemapConfig();
      res.json({
        success: true,
        data: config,
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to get sitemap config',
      });
    }
  }
);

/**
 * PUT /api/seo/sitemap-config - Update sitemap configuration
 */
router.put(
  '/sitemap-config',
  authenticate,
  authorize('seo.update', '*'),
  async (req: Request, res: Response) => {
    try {
      const config = await SEORepository.updateSitemapConfig(req.body);
      res.json({
        success: true,
        data: config,
        message: 'Sitemap config updated successfully',
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message || 'Failed to update sitemap config',
      });
    }
  }
);

// =============================================================================
// PUBLIC ROUTES (No auth required - for redirect checking)
// =============================================================================

/**
 * GET /api/seo/check-redirect - Check if a URL has a redirect
 * QUERY: url
 */
router.get('/check-redirect', async (req: Request, res: Response) => {
  try {
    const url = req.query.url as string;

    if (!url) {
      return res.status(400).json({
        success: false,
        message: 'URL parameter is required',
      });
    }

    const redirect = await SEORepository.getRedirectBySource(url);

    if (redirect) {
      // Increment hit count asynchronously
      SEORepository.incrementRedirectHit(url).catch(console.error);

      return res.json({
        success: true,
        hasRedirect: true,
        data: {
          destinationUrl: redirect.destinationUrl,
          statusCode: redirect.statusCode,
        },
      });
    }

    res.json({
      success: true,
      hasRedirect: false,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to check redirect',
    });
  }
});

export default router;
