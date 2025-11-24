import { Request, Response } from 'express';
import ProductRepository from '../models/ProductRepository';
import PostRepository from '../models/PostRepository';
import PageRepository from '../models/PageRepository';
import { query } from '../config/database';

export class PublicController {
  /**
   * Get site configuration (public data)
   * Returns: site settings, navigation menus, social links
   */
  async getConfig(req: Request, res: Response): Promise<void> {
    try {
      // Get public site settings
      const settingsResult = await query(`
        SELECT key, value FROM site_settings
        WHERE is_public = true
        ORDER BY group_name, key
      `);

      const settings: Record<string, any> = {};
      settingsResult.rows.forEach((row: any) => {
        try {
          settings[row.key] = typeof row.value === 'string' ? JSON.parse(row.value) : row.value;
        } catch {
          settings[row.key] = row.value;
        }
      });

      // Get navigation menus
      const navResult = await query(`
        SELECT location, items FROM navigation_menus
        WHERE is_active = true
        ORDER BY location
      `);

      const navigation: Record<string, any> = {};
      navResult.rows.forEach((row: any) => {
        navigation[row.location] =
          typeof row.items === 'string' ? JSON.parse(row.items) : row.items;
      });

      res.json({
        success: true,
        data: {
          settings,
          navigation,
          language: req.query.lang || 'en',
        },
      });
    } catch (error) {
      console.error('Get config error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get site configuration',
      });
    }
  }

  /**
   * Get published page by slug with all components
   */
  async getPage(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;

      const page = await PageRepository.findBySlug(slug, true);
      if (!page) {
        res.status(404).json({
          success: false,
          message: 'Page not found',
        });
        return;
      }

      res.json({
        success: true,
        data: page,
      });
    } catch (error) {
      console.error('Get page error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get page',
      });
    }
  }

  /**
   * Get published products with optional language filter
   */
  async getProducts(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = (page - 1) * limit;
      const lang = (req.query.lang as string) || 'en';
      const category = req.query.category as string;

      let products;
      if (category) {
        products = await ProductRepository.findByCategory(category, true);
      } else {
        products = await ProductRepository.findAll(limit, offset, true);
      }

      // Apply i18n filtering if needed
      if (lang !== 'en') {
        const i18nResult = await query(
          `
          SELECT entity_id, field_name, field_value FROM i18n_contents
          WHERE entity_type = 'product' AND language_id IN (
            SELECT id FROM languages WHERE code = $1
          )
        `,
          [lang]
        );

        const i18nMap = new Map();
        i18nResult.rows.forEach((row: any) => {
          if (!i18nMap.has(row.entity_id)) {
            i18nMap.set(row.entity_id, {});
          }
          i18nMap.get(row.entity_id)[row.field_name] = row.field_value;
        });

        products = products.map((product) => ({
          ...product,
          i18n_content: i18nMap.get(product.id) || {},
        }));
      }

      const total = await ProductRepository.count(true);

      res.json({
        success: true,
        data: products,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Get products error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get products',
      });
    }
  }

  /**
   * Get single published product by slug
   */
  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const lang = (req.query.lang as string) || 'en';

      const product = await ProductRepository.findBySlug(slug, true);
      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }

      // Get i18n content if language specified
      if (lang !== 'en') {
        const i18nResult = await query(
          `
          SELECT field_name, field_value FROM i18n_contents
          WHERE entity_type = 'product' AND entity_id = $1 AND language_id IN (
            SELECT id FROM languages WHERE code = $2
          )
        `,
          [product.id, lang]
        );

        const i18nContent: Record<string, any> = {};
        i18nResult.rows.forEach((row: any) => {
          i18nContent[row.field_name] = row.field_value;
        });

        product.i18n_content = [
          {
            ...i18nContent,
            entity_id: product.id,
            entity_type: 'product',
            field_name: '',
            field_value: '',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ];
      }

      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      console.error('Get product error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get product',
      });
    }
  }

  /**
   * Get published blog posts
   */
  async getPosts(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;
      const offset = (page - 1) * limit;
      const lang = (req.query.lang as string) || 'en';
      const category = req.query.category as string;

      let posts;
      if (category) {
        posts = await PostRepository.findByCategory(category, true);
      } else {
        posts = await PostRepository.findAll(limit, offset, true);
      }

      // Apply i18n filtering if needed
      if (lang !== 'en') {
        const i18nResult = await query(
          `
          SELECT entity_id, field_name, field_value FROM i18n_contents
          WHERE entity_type = 'post' AND language_id IN (
            SELECT id FROM languages WHERE code = $1
          )
        `,
          [lang]
        );

        const i18nMap = new Map();
        i18nResult.rows.forEach((row: any) => {
          if (!i18nMap.has(row.entity_id)) {
            i18nMap.set(row.entity_id, {});
          }
          i18nMap.get(row.entity_id)[row.field_name] = row.field_value;
        });

        posts = posts.map((post) => ({
          ...post,
          i18n_content: i18nMap.get(post.id) || {},
        }));
      }

      const total = await PostRepository.count(true);

      res.json({
        success: true,
        data: posts,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Get posts error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get posts',
      });
    }
  }

  /**
   * Get single published post by slug
   */
  async getPost(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;
      const lang = (req.query.lang as string) || 'en';

      const post = await PostRepository.findBySlug(slug, true);
      if (!post) {
        res.status(404).json({
          success: false,
          message: 'Post not found',
        });
        return;
      }

      // Increment view count
      await PostRepository.incrementViews(post.id);

      // Get i18n content if language specified
      if (lang !== 'en') {
        const i18nResult = await query(
          `
          SELECT field_name, field_value FROM i18n_contents
          WHERE entity_type = 'post' AND entity_id = $1 AND language_id IN (
            SELECT id FROM languages WHERE code = $2
          )
        `,
          [post.id, lang]
        );

        const i18nContent: Record<string, any> = {};
        i18nResult.rows.forEach((row: any) => {
          i18nContent[row.field_name] = row.field_value;
        });

        post.i18n_content = [
          {
            ...i18nContent,
            entity_id: post.id,
            entity_type: 'post',
            field_name: '',
            field_value: '',
            created_at: new Date(),
            updated_at: new Date(),
          },
        ];
      }

      res.json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.error('Get post error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get post',
      });
    }
  }

  /**
   * Submit a form
   */
  async submitForm(req: Request, res: Response): Promise<void> {
    try {
      const { formId } = req.params;
      const data = req.body;

      // Get client IP
      const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
      const userAgent = req.headers['user-agent'] || '';

      // Validate form exists and is active
      const formResult = await query(
        'SELECT id, name FROM forms WHERE id = $1 AND is_active = true',
        [formId]
      );

      if (formResult.rows.length === 0) {
        res.status(404).json({
          success: false,
          message: 'Form not found or is inactive',
        });
        return;
      }

      // Insert form submission
      const submissionResult = await query(
        `
        INSERT INTO form_submissions (form_id, data, status, ip_address, user_agent)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id
      `,
        [formId, JSON.stringify(data), 'new', ipAddress, userAgent]
      );

      res.status(201).json({
        success: true,
        data: { id: submissionResult.rows[0].id },
        message: 'Form submitted successfully',
      });
    } catch (error) {
      console.error('Submit form error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to submit form',
      });
    }
  }

  /**
   * Get active redirects
   */
  async getRedirects(req: Request, res: Response): Promise<void> {
    try {
      const result = await query(`
        SELECT from_path, to_path, type FROM redirects
        WHERE is_active = true
        ORDER BY created_at DESC
      `);

      res.json({
        success: true,
        data: result.rows,
      });
    } catch (error) {
      console.error('Get redirects error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get redirects',
      });
    }
  }

  /**
   * Track page view
   */
  async trackPageView(req: Request, res: Response): Promise<void> {
    try {
      const { entityType, entityId } = req.body;

      if (!entityType || !entityId) {
        res.status(400).json({
          success: false,
          message: 'Entity type and ID are required',
        });
        return;
      }

      const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
      const userAgent = req.headers['user-agent'] || '';
      const referer = req.headers['referer'] || '';

      await query(
        `
        INSERT INTO page_views (entity_type, entity_id, ip_address, user_agent, referer)
        VALUES ($1, $2, $3, $4, $5)
      `,
        [entityType, entityId, ipAddress, userAgent, referer]
      );

      res.json({
        success: true,
        message: 'Page view tracked',
      });
    } catch (error) {
      console.error('Track page view error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to track page view',
      });
    }
  }
}

export default new PublicController();
