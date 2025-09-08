import { Permission, Role, User } from '~/db/schema';
import { SQL } from 'drizzle-orm';
import { db } from '..';

// NextAuth compatible user type
export interface AuthUser {
  id: string;
  name: string;
  email: string;
  roles: Role[];
  permissions: Permission[];
}

export type RawUser = {
  id: number;
  name: string;
  password: string;
  email: string;
  userRoles: {
    roleId: number;
    userId: number;
    role: {
      id: number;
      name: string;
      rolePermissions: {
        roleId: number;
        permissionId: number;
        permission: {
          id: number;
          name: string;
          key: string;
        };
      }[];
    };
  }[];
};

export class UserRepository {
  /**
   * Generic find user with relations by any field
   */
  static async find(whereClause: SQL): Promise<User | undefined> {
    const userWithRoles: RawUser | undefined = await db.query.users.findFirst({
      where: whereClause,
      with: {
        userRoles: {
          with: {
            role: {
              columns: { id: true, name: true },
              with: {
                rolePermissions: {
                  with: {
                    permission: {
                      columns: { id: true, key: true, name: true },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });
    if (!userWithRoles) return undefined;
    return this.transformUser(userWithRoles);
  }

  private static transformUser(userWithRoles: RawUser): User {
    const userRoles = userWithRoles?.userRoles.map((ur) => ({
      id: ur.role.id,
      name: ur.role.name,
    }));

    const permissionMap = new Map();
    userWithRoles.userRoles.forEach((ur) => {
      ur.role.rolePermissions.forEach((rp) => {
        permissionMap.set(rp.permission.key, {
          id: rp.permission.id,
          key: rp.permission.key,
          name: rp.permission.name,
        });
      });
    });

    const userPermissions = Array.from(permissionMap.values());

    return {
      id: userWithRoles.id,
      name: userWithRoles.name,
      email: userWithRoles.email,
      password: userWithRoles.password,
      roles: userRoles,
      permissions: userPermissions,
    };
  }

  /**
   * Check if user has specific permission
   */
  static hasPermission(user: User, permissionKey: string): boolean {
    return user.permissions.some((p) => p.key === permissionKey);
  }

  /**
   * Check if user has multiple permissions (AND logic)
   */
  static hasAllPermissions(user: User, permissionKeys: string[]): boolean {
    const userPermissionKeys = new Set(user.permissions.map((p) => p.key));
    return permissionKeys.every((key) => userPermissionKeys.has(key));
  }

  /**
   * Check if user has any of the specified permissions (OR logic)
   */
  static hasAnyPermission(user: User, permissionKeys: string[]): boolean {
    const userPermissionKeys = new Set(user.permissions.map((p) => p.key));
    return permissionKeys.some((key) => userPermissionKeys.has(key));
  }

  /**
   * Check if user has specific role
   */
  static hasRole(user: User, roleName: string): boolean {
    return user.roles.some((r) => r.name === roleName);
  }

  /**
   * Check if user has any of the specified roles
   */
  static hasAnyRole(user: User, roleNames: string[]): boolean {
    const userRoleNames = new Set(user.roles.map((r) => r.name));
    return roleNames.some((name) => userRoleNames.has(name));
  }

  /**
   * Get all permissions keys for user
   */
  static getPermissionKeys(user: User): string[] {
    return user.permissions.map((p) => p.key);
  }

  /**
   * Get all role names for user
   */
  static getRoleNames(user: User): string[] {
    return user.roles.map((r) => r.name);
  }
}
