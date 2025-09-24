import { useMemo } from 'react';

export function usePermissions(userPermissions: string[] | undefined) {
  return useMemo(() => {
    if (!userPermissions) return null;
    // Pre-process wildcard permissions for faster lookup
    const exactPermissions = new Set<string>();
    const wildcardPrefixes = new Set<string>();
    userPermissions.forEach((permission) => {
      if (permission.endsWith('*')) {
        wildcardPrefixes.add(permission.slice(0, -1));
      } else {
        exactPermissions.add(permission);
      }
    });
    // Create an efficient permission checker function
    const checkPermission = (required: string): boolean => {
      // Check exact match first (faster than string operations)
      if (exactPermissions.has(required)) return true;
      // Then check wildcards
      return Array.from(wildcardPrefixes).some((prefix) => required.startsWith(prefix));
    }; // Create a batch checker for multiple permissions
    const checkPermissions = (required: string[]): boolean => {
      return required.every(checkPermission);
    };
    return { checkPermission, checkPermissions };
  }, [userPermissions]);
}
