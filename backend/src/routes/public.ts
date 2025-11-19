import { Router } from 'express';
import PublicController from '../controllers/PublicController';

const router = Router();

// Public routes (no authentication required)

/**
 * Site Configuration
 */
router.get('/config', PublicController.getConfig.bind(PublicController));

/**
 * Pages
 */
router.get('/pages/:slug', PublicController.getPage.bind(PublicController));

/**
 * Products
 */
router.get('/products', PublicController.getProducts.bind(PublicController));
router.get('/products/:slug', PublicController.getProduct.bind(PublicController));

/**
 * Blog Posts
 */
router.get('/posts', PublicController.getPosts.bind(PublicController));
router.get('/posts/:slug', PublicController.getPost.bind(PublicController));

/**
 * Forms
 */
router.post('/forms/:formId/submit', PublicController.submitForm.bind(PublicController));

/**
 * Redirects
 */
router.get('/redirects', PublicController.getRedirects.bind(PublicController));

/**
 * Analytics
 */
router.post('/track/page-view', PublicController.trackPageView.bind(PublicController));

export default router;
