import { Router } from 'express';
import AuthController from '../controllers/AuthController';
import { authenticate, authorize } from '../middleware/auth';

const router = Router();

// Public routes
router.post('/login', AuthController.login.bind(AuthController));
router.post('/refresh', AuthController.refreshToken.bind(AuthController));

// Protected routes
router.get('/me', authenticate, AuthController.me.bind(AuthController));
router.post(
  '/register',
  authenticate,
  authorize('users.create', '*'),
  AuthController.register.bind(AuthController)
);

export default router;
