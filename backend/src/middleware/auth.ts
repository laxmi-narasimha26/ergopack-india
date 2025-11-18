import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt';
import { JWTPayload, Permission } from '../types';
import { hasPermission } from '../utils/permissions';

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: JWTPayload;
    }
  }
}

/**
 * Middleware to authenticate user via JWT token
 */
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.status(401).json({
        success: false,
        message: 'No authentication token provided',
      });
      return;
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const payload = verifyToken(token);

    if (!payload) {
      res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
      return;
    }

    // Attach user to request
    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: 'Authentication failed',
    });
  }
};

/**
 * Middleware factory to check for specific permissions
 */
export const authorize = (...requiredPermissions: Permission[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: 'Authentication required',
      });
      return;
    }

    const userPermissions = req.user.permissions || [];

    // Check if user has any of the required permissions
    const authorized = requiredPermissions.some((permission) =>
      hasPermission(userPermissions, permission)
    );

    if (!authorized) {
      res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
      return;
    }

    next();
  };
};

/**
 * Optional authentication middleware
 * Does not fail if no token is provided, but attaches user if valid token exists
 */
export const optionalAuth = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      const payload = verifyToken(token);
      if (payload) {
        req.user = payload;
      }
    }
    next();
  } catch (error) {
    // Ignore errors for optional auth
    next();
  }
};
