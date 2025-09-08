import { mysqlTable, primaryKey, int } from 'drizzle-orm/mysql-core';
import { relations } from 'drizzle-orm';
import { roles } from './roles.schema';
import { users } from './users.schema';

// Junction table: User-Role (many-to-many)
export const userRoles = mysqlTable(
  'user_roles',
  {
    userId: int().notNull(),
    roleId: int().notNull(),
  },
  (table) => [primaryKey({ columns: [table.userId, table.roleId] })],
);

export type UserRole = typeof userRoles.$inferSelect;

export const userRolesRelations = relations(userRoles, ({ one }) => ({
  user: one(users, {
    fields: [userRoles.userId],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [userRoles.roleId],
    references: [roles.id],
  }),
}));
