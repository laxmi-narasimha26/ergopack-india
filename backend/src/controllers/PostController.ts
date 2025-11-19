import { Request, Response } from 'express';
import PostRepository from '../models/PostRepository';
import { Post } from '../types';

export class PostController {
  /**
   * Get all posts with pagination
   */
  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;
      const offset = (page - 1) * limit;

      const posts = await PostRepository.findAll(limit, offset);
      const total = await PostRepository.count();

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
   * Get single post by ID
   */
  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const post = await PostRepository.findById(id);
      if (!post) {
        res.status(404).json({
          success: false,
          message: 'Post not found',
        });
        return;
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
   * Get post by slug
   */
  async getBySlug(req: Request, res: Response): Promise<void> {
    try {
      const { slug } = req.params;

      const post = await PostRepository.findBySlug(slug);
      if (!post) {
        res.status(404).json({
          success: false,
          message: 'Post not found',
        });
        return;
      }

      res.json({
        success: true,
        data: post,
      });
    } catch (error) {
      console.error('Get post by slug error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get post',
      });
    }
  }

  /**
   * Get featured posts
   */
  async getFeatured(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 3;

      const posts = await PostRepository.findFeatured(limit);

      res.json({
        success: true,
        data: posts,
      });
    } catch (error) {
      console.error('Get featured posts error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get featured posts',
      });
    }
  }

  /**
   * Search posts
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

      const posts = await PostRepository.search(q as string);

      res.json({
        success: true,
        data: posts,
      });
    } catch (error) {
      console.error('Search posts error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search posts',
      });
    }
  }

  /**
   * Create post
   */
  async create(req: Request, res: Response): Promise<void> {
    try {
      const data = req.body as Partial<Post>;

      // Validation
      if (!data.title || !data.slug) {
        res.status(400).json({
          success: false,
          message: 'Title and slug are required',
        });
        return;
      }

      // Check if slug is unique
      const existing = await PostRepository.findBySlug(data.slug);
      if (existing) {
        res.status(409).json({
          success: false,
          message: 'Post with this slug already exists',
        });
        return;
      }

      const post = await PostRepository.create({
        ...data,
        author_id: data.author_id || req.user?.userId,
      });

      res.status(201).json({
        success: true,
        data: post,
        message: 'Post created successfully',
      });
    } catch (error) {
      console.error('Create post error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to create post',
      });
    }
  }

  /**
   * Update post
   */
  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const data = req.body as Partial<Post>;

      // Check if post exists
      const post = await PostRepository.findById(id);
      if (!post) {
        res.status(404).json({
          success: false,
          message: 'Post not found',
        });
        return;
      }

      // Check if slug is unique (if being updated)
      if (data.slug && data.slug !== post.slug) {
        const existing = await PostRepository.findBySlug(data.slug);
        if (existing) {
          res.status(409).json({
            success: false,
            message: 'Post with this slug already exists',
          });
          return;
        }
      }

      const updated = await PostRepository.update(id, data);

      res.json({
        success: true,
        data: updated,
        message: 'Post updated successfully',
      });
    } catch (error) {
      console.error('Update post error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to update post',
      });
    }
  }

  /**
   * Delete post
   */
  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      // Check if post exists
      const post = await PostRepository.findById(id);
      if (!post) {
        res.status(404).json({
          success: false,
          message: 'Post not found',
        });
        return;
      }

      const deleted = await PostRepository.delete(id);

      if (!deleted) {
        res.status(500).json({
          success: false,
          message: 'Failed to delete post',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Post deleted successfully',
      });
    } catch (error) {
      console.error('Delete post error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to delete post',
      });
    }
  }

  /**
   * Get posts by category
   */
  async getByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { category } = req.params;

      const posts = await PostRepository.findByCategory(category);

      res.json({
        success: true,
        data: posts,
      });
    } catch (error) {
      console.error('Get posts by category error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get posts',
      });
    }
  }

  /**
   * Publish/unpublish post
   */
  async togglePublish(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const post = await PostRepository.findById(id);
      if (!post) {
        res.status(404).json({
          success: false,
          message: 'Post not found',
        });
        return;
      }

      const newStatus = post.status === 'published' ? 'draft' : 'published';
      const updated = await PostRepository.update(id, {
        status: newStatus,
        published_at: newStatus === 'published' ? new Date() : undefined,
      });

      res.json({
        success: true,
        data: updated,
        message: `Post ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`,
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

export default new PostController();
