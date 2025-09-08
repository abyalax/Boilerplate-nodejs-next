import { relations } from 'drizzle-orm';
import { mysqlTable } from 'drizzle-orm/mysql-core';
import { serial, varchar } from 'drizzle-orm/mysql-core';
import { rolePermissions } from './role-permissions.schema';

export const permissions = mysqlTable('permissions', {
  id: serial().primaryKey(),
  key: varchar({ length: 100 }).notNull().unique(),
  name: varchar({ length: 100 }).notNull(),
});

export type Permission = typeof permissions.$inferSelect;

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));
