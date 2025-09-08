// Auto-generated file - do not edit manually
// Generated at: 2025-09-08T22:24:01.204Z

// Base permissions directly from route files
export const baseRoutePermissions: Record<string, string[]> = {
  '/admin': ['read:user', 'create:user'],
  '/admin/users': ['update:user'],
  '/admin/users/[id]': ['delete:user'],
  '/api/users': ['read:user', 'create:user', 'update:user'],
} as const;

// Hierarchical permissions (includes parent route permissions)
export const routePermissions: Record<string, string[]> = {
  '/admin': ['read:user', 'create:user'],
  '/admin/users': ['read:user', 'create:user', 'update:user'],
  '/admin/users/[id]': ['read:user', 'create:user', 'update:user', 'delete:user'],
  '/api/users': ['read:user', 'create:user', 'update:user'],
  '/admin/users/:id': ['read:user', 'create:user', 'update:user', 'delete:user'],
} as const;
