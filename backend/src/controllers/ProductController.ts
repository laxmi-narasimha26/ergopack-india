import { Request, Response } from 'express';
import ProductRepository from '../models/ProductRepository';
import { Product } from '../types';

export class ProductController {
  /**
   * Get all products with pagination
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 50;
      const offset = (page - 1) * limit;

      const products = await ProductRepository.findAll(limit, offset);
      const total = await ProductRepository.count();

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
   * Get single product by ID
   */
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const product = await ProductRepository.findById(id);
      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
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
   * Get product by slug
   */
  async getBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;

      const product = await ProductRepository.findBySlug(slug);
      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }

      res.json({
        success: true,
        data: product,
      });
    } catch (error) {
      console.error('Get product by slug error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get product',
      });
    }
  }

  /**
   * Search products
   */
  async search(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;

      if (!q) {
        res.status(400).json({
          success: false,
          message: 'Search query is required',
        });
        return;
      }

      const products = await ProductRepository.search(q as string);

      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error('Search products error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search products',
      });
    }
  }

  /**
   * Create product
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as Partial<Product>;

      // Validation
      if (!data.name || !data.slug) {
        res.status(400).json({
          success: false,
          message: 'Name and slug are required',
        });
        return;
      }

      // Check if slug is unique
      const existing = await ProductRepository.findBySlug(data.slug);
      if (existing) {
        res.status(409).json({
          success: false,
          message: 'Product with this slug already exists',
        });
        return;
      }

      const product = await ProductRepository.create({
        ...data,
        created_by: req.user?.userId,
      });

      res.status(201).json({
        success: true,
        data: product,
        message: 'Product created successfully',
      });
    } catch (error) {
      console.error('Create product error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create product',
      });
    }
  }

  /**
   * Update product
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body as Partial<Product>;

      // Check if product exists
      const product = await ProductRepository.findById(id);
      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }

      // Check if slug is unique (if being updated)
      if (data.slug && data.slug !== product.slug) {
        const existing = await ProductRepository.findBySlug(data.slug);
        if (existing) {
          res.status(409).json({
            success: false,
            message: 'Product with this slug already exists',
          });
          return;
        }
      }

      const updated = await ProductRepository.update(id, {
        ...data,
        updated_by: req.user?.userId,
      });

      res.json({
        success: true,
        data: updated,
        message: 'Product updated successfully',
      });
    } catch (error) {
      console.error('Update product error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update product',
      });
    }
  }

  /**
   * Delete product
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Check if product exists
      const product = await ProductRepository.findById(id);
      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }

      const deleted = await ProductRepository.delete(id);

      if (!deleted) {
        res.status(500).json({
          success: false,
          message: 'Failed to delete product',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      console.error('Delete product error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete product',
      });
    }
  }

  /**
   * Get products by category
   */
  async getByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.params;

      const products = await ProductRepository.findByCategory(category);

      res.json({
        success: true,
        data: products,
      });
    } catch (error) {
      console.error('Get products by category error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get products',
      });
    }
  }

  /**
   * Publish/unpublish product
   */
  async togglePublish(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const product = await ProductRepository.findById(id);
      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }

      const updated = await ProductRepository.update(id, {
        is_published: !product.is_published,
        published_at: !product.is_published ? new Date() : undefined,
        updated_by: req.user?.userId,
      });

      res.json({
        success: true,
        data: updated,
        message: `Product ${!product.is_published ? 'published' : 'unpublished'} successfully`,
      });
    } catch (error) {
      console.error('Toggle publish error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to toggle publish status',
      });
    }
  }

  /**
   * Update product sort order
   */
  async updateSortOrder(req: Request, res: Response): Promise<void> {
    try {
      const { products } = req.body;

      if (!Array.isArray(products)) {
        res.status(400).json({
          success: false,
          message: 'Products array is required',
        });
        return;
      }

      // Update sort order for each product
      await Promise.all(
        products.map((p: any) =>
          ProductRepository.update(p.id, {
            sort_order: p.sort_order,
            updated_by: req.user?.userId,
          })
        )
      );

      res.json({
        success: true,
        message: 'Sort order updated successfully',
      });
    } catch (error) {
      console.error('Update sort order error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update sort order',
      });
    }
  }
}

export default new ProductController();
