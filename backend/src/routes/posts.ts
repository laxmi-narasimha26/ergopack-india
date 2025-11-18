import { Router } from 'express';
import PostController from '../controllers/PostController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Protected routes (auth required)
router.get(
  '/',
  authenticate,
  authorize('blog.read', '*'),
  PostController.getAll.bind(PostController)
);

router.get(
  '/featured',
  authenticate,
  authorize('blog.read', '*'),
  PostController.getFeatured.bind(PostController)
);

router.get(
  '/search',
  authenticate,
  authorize('blog.read', '*'),
  PostController.search.bind(PostController)
);

router.get(
  '/category/:category',
  authenticate,
  authorize('blog.read', '*'),
  PostController.getByCategory.bind(PostController)
);

router.get(
  '/:id',
  authenticate,
  authorize('blog.read', '*'),
  PostController.getById.bind(PostController)
);

router.post(
  '/',
  authenticate,
  authorize('blog.create', '*'),
  PostController.create.bind(PostController)
);

router.put(
  '/:id',
  authenticate,
  authorize('blog.update', '*'),
  PostController.update.bind(PostController)
);

router.delete(
  '/:id',
  authenticate,
  authorize('blog.delete', '*'),
  PostController.delete.bind(PostController)
);

router.put(
  '/:id/publish',
  authenticate,
  authorize('blog.update', '*'),
  PostController.togglePublish.bind(PostController)
);

export default router;
