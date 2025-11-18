import { Request, Response } from 'express';
import PageRepository from '../models/PageRepository';
import { Page, PageComponent } from '../types';

export class PageController {
  /**
   * Get all pages with pagination
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = (page - 1) * limit;

      const pages = await PageRepository.findAll(limit, offset);
      const total = await PageRepository.count();

      res.json({
        success: true,
        data: pages,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit),
        },
      });
    } catch (error) {
      console.error('Get pages error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get pages',
      });
    }
  }

  /**
   * Get single page by ID
   */
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const page = await PageRepository.findById(id);
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
   * Get page by slug
   */
  async getBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;

      const page = await PageRepository.findBySlug(slug);
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
      console.error('Get page by slug error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get page',
      });
    }
  }

  /**
   * Create page
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as Partial<Page>;

      // Validation
      if (!data.name || !data.slug) {
        res.status(400).json({
          success: false,
          message: 'Name and slug are required',
        });
        return;
      }

      // Check if slug is unique
      const existing = await PageRepository.findBySlug(data.slug);
      if (existing) {
        res.status(409).json({
          success: false,
          message: 'Page with this slug already exists',
        });
        return;
      }

      const page = await PageRepository.create(data);

      res.status(201).json({
        success: true,
        data: page,
        message: 'Page created successfully',
      });
    } catch (error) {
      console.error('Create page error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create page',
      });
    }
  }

  /**
   * Update page
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body as Partial<Page>;

      // Check if page exists
      const page = await PageRepository.findById(id);
      if (!page) {
        res.status(404).json({
          success: false,
          message: 'Page not found',
        });
        return;
      }

      // Check if slug is unique (if being updated)
      if (data.slug && data.slug !== page.slug) {
        const existing = await PageRepository.findBySlug(data.slug);
        if (existing) {
          res.status(409).json({
            success: false,
            message: 'Page with this slug already exists',
          });
          return;
        }
      }

      const updated = await PageRepository.update(id, data);

      res.json({
        success: true,
        data: updated,
        message: 'Page updated successfully',
      });
    } catch (error) {
      console.error('Update page error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update page',
      });
    }
  }

  /**
   * Delete page
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Check if page exists
      const page = await PageRepository.findById(id);
      if (!page) {
        res.status(404).json({
          success: false,
          message: 'Page not found',
        });
        return;
      }

      const deleted = await PageRepository.delete(id);

      if (!deleted) {
        res.status(500).json({
          success: false,
          message: 'Failed to delete page',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Page deleted successfully',
      });
    } catch (error) {
      console.error('Delete page error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete page',
      });
    }
  }

  /**
   * Get page components
   */
  async getComponents(req: Request, res: Response): Promise<void> {
    try {
      const { pageId } = req.params;

      const components = await PageRepository.getPageComponents(pageId);

      res.json({
        success: true,
        data: components,
      });
    } catch (error) {
      console.error('Get page components error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get page components',
      });
    }
  }

  /**
   * Add component to page
   */
  async addComponent(req: Request, res: Response): Promise<void> {
    try {
      const { pageId } = req.params;
      const { componentId, props } = req.body;

      if (!componentId) {
        res.status(400).json({
          success: false,
          message: 'Component ID is required',
        });
        return;
      }

      // Verify page exists
      const page = await PageRepository.findById(pageId);
      if (!page) {
        res.status(404).json({
          success: false,
          message: 'Page not found',
        });
        return;
      }

      const component = await PageRepository.addComponent(pageId, componentId, props || {});

      res.status(201).json({
        success: true,
        data: component,
        message: 'Component added to page successfully',
      });
    } catch (error) {
      console.error('Add component error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to add component',
      });
    }
  }

  /**
   * Update page component
   */
  async updateComponent(req: Request, res: Response): Promise<void> {
    try {
      const { componentId } = req.params;
      const { props, isVisible } = req.body;

      const updated = await PageRepository.updateComponent(componentId, props || {}, isVisible);

      if (!updated) {
        res.status(404).json({
          success: false,
          message: 'Component not found',
        });
        return;
      }

      res.json({
        success: true,
        data: updated,
        message: 'Component updated successfully',
      });
    } catch (error) {
      console.error('Update component error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update component',
      });
    }
  }

  /**
   * Remove component from page
   */
  async removeComponent(req: Request, res: Response): Promise<void> {
    try {
      const { componentId } = req.params;

      const deleted = await PageRepository.removeComponent(componentId);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Component not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Component removed from page successfully',
      });
    } catch (error) {
      console.error('Remove component error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to remove component',
      });
    }
  }

  /**
   * Reorder page components (drag and drop)
   */
  async updatePageComponents(req: Request, res: Response): Promise<void> {
    try {
      const { pageId } = req.params;
      const { components } = req.body;

      if (!Array.isArray(components)) {
        res.status(400).json({
          success: false,
          message: 'Components array is required',
        });
        return;
      }

      // Verify page exists
      const page = await PageRepository.findById(pageId);
      if (!page) {
        res.status(404).json({
          success: false,
          message: 'Page not found',
        });
        return;
      }

      await PageRepository.reorderComponents(pageId, components);

      const updated = await PageRepository.findById(pageId);

      res.json({
        success: true,
        data: updated,
        message: 'Page components reordered successfully',
      });
    } catch (error) {
      console.error('Update page components error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update page components',
      });
    }
  }

  /**
   * Publish/unpublish page
   */
  async togglePublish(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const page = await PageRepository.findById(id);
      if (!page) {
        res.status(404).json({
          success: false,
          message: 'Page not found',
        });
        return;
      }

      const updated = await PageRepository.update(id, {
        is_published: !page.is_published,
      });

      res.json({
        success: true,
        data: updated,
        message: `Page ${!page.is_published ? 'published' : 'unpublished'} successfully`,
      });
    } catch (error) {
      console.error('Toggle publish error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to toggle publish status',
      });
    }
  }
}

export default new PageController();
