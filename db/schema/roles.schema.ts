import { rolePermissions } from './role-permissions.schema';
import { serial, varchar } from 'drizzle-orm/mysql-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';
import { userRoles } from './user-roles.schema';
import { relations } from 'drizzle-orm';

export const roles = mysqlTable('roles', {
  id: serial().primaryKey(),
  name: varchar({ length: 100 }).notNull().unique(),
});

export type Role = typeof roles.$inferSelect;

export const rolesRelations = relations(roles, ({ many }) => ({
  userRoles: many(userRoles),
  rolePermissions: many(rolePermissions),
}));
