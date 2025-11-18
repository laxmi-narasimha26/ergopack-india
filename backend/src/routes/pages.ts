import { Router } from 'express';
import PageController from '../controllers/PageController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Protected routes (auth required)
router.get(
  '/',
  authenticate,
  authorize('pages.read', '*'),
  PageController.getAll.bind(PageController)
);

router.post(
  '/',
  authenticate,
  authorize('pages.create', '*'),
  PageController.create.bind(PageController)
);

router.get(
  '/:id',
  authenticate,
  authorize('pages.read', '*'),
  PageController.getById.bind(PageController)
);

router.put(
  '/:id',
  authenticate,
  authorize('pages.update', '*'),
  PageController.update.bind(PageController)
);

router.delete(
  '/:id',
  authenticate,
  authorize('pages.delete', '*'),
  PageController.delete.bind(PageController)
);

router.put(
  '/:id/publish',
  authenticate,
  authorize('pages.update', '*'),
  PageController.togglePublish.bind(PageController)
);

// Page components routes
router.get(
  '/:pageId/components',
  authenticate,
  authorize('pages.read', '*'),
  PageController.getComponents.bind(PageController)
);

router.post(
  '/:pageId/components',
  authenticate,
  authorize('pages.update', '*'),
  PageController.addComponent.bind(PageController)
);

router.put(
  '/:pageId/components/reorder',
  authenticate,
  authorize('pages.update', '*'),
  PageController.updatePageComponents.bind(PageController)
);

router.put(
  '/components/:componentId',
  authenticate,
  authorize('pages.update', '*'),
  PageController.updateComponent.bind(PageController)
);

router.delete(
  '/components/:componentId',
  authenticate,
  authorize('pages.update', '*'),
  PageController.removeComponent.bind(PageController)
);

export default router;
