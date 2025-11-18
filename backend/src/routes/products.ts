import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Protected routes (auth required)
router.get(
  '/',
  authenticate,
  authorize('products.read', '*'),
  ProductController.getAll.bind(ProductController)
);

router.get(
  '/search',
  authenticate,
  authorize('products.read', '*'),
  ProductController.search.bind(ProductController)
);

router.get(
  '/category/:category',
  authenticate,
  authorize('products.read', '*'),
  ProductController.getByCategory.bind(ProductController)
);

router.get(
  '/:id',
  authenticate,
  authorize('products.read', '*'),
  ProductController.getById.bind(ProductController)
);

router.post(
  '/',
  authenticate,
  authorize('products.create', '*'),
  ProductController.create.bind(ProductController)
);

router.put(
  '/:id',
  authenticate,
  authorize('products.update', '*'),
  ProductController.update.bind(ProductController)
);

router.delete(
  '/:id',
  authenticate,
  authorize('products.delete', '*'),
  ProductController.delete.bind(ProductController)
);

router.put(
  '/:id/publish',
  authenticate,
  authorize('products.update', '*'),
  ProductController.togglePublish.bind(ProductController)
);

router.put(
  '/sort/reorder',
  authenticate,
  authorize('products.update', '*'),
  ProductController.updateSortOrder.bind(ProductController)
);

export default router;
