import { Permission } from '../types';

/**
 * Check if a user has a specific permission
 * Supports wildcard permissions (e.g., '*' or 'blog.*')
 */
export const hasPermission = (
  userPermissions: string[],
  requiredPermission: Permission
): boolean => {
  // Super admin has all permissions
  if (userPermissions.includes('*')) {
    return true;
  }

  // Exact match
  if (userPermissions.includes(requiredPermission)) {
    return true;
  }

  // Wildcard match (e.g., 'blog.*' includes 'blog.read', 'blog.create', etc.)
  const parts = requiredPermission.split('.');
  if (parts.length === 2) {
    const wildcardPermission = `${parts[0]}.*`;
    if (userPermissions.includes(wildcardPermission)) {
      return true;
    }
  }

  return false;
};

/**
 * Check if a user has ANY of the required permissions
 */
export const hasAnyPermission = (
  userPermissions: string[],
  requiredPermissions: Permission[]
): boolean => {
  return requiredPermissions.some((permission) =>
    hasPermission(userPermissions, permission)
  );
};

/**
 * Check if a user has ALL of the required permissions
 */
export const hasAllPermissions = (
  userPermissions: string[],
  requiredPermissions: Permission[]
): boolean => {
  return requiredPermissions.every((permission) =>
    hasPermission(userPermissions, permission)
  );
};
