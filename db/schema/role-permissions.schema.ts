import { mysqlTable, primaryKey, int } from 'drizzle-orm/mysql-core';
import { permissions } from './permissions.schema';
import { relations } from 'drizzle-orm';
import { roles } from './roles.schema';

// Junction table: Role-Permission (many-to-many)
export const rolePermissions = mysqlTable(
  'role_permissions',
  {
    roleId: int().notNull(),
    permissionId: int().notNull(),
  },
  (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })],
);

export const rolePermissionsRelations = relations(rolePermissions, ({ one }) => ({
  role: one(roles, {
    fields: [rolePermissions.roleId],
    references: [roles.id],
  }),
  permission: one(permissions, {
    fields: [rolePermissions.permissionId],
    references: [permissions.id],
  }),
}));
