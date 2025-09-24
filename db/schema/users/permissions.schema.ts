import { relations } from 'drizzle-orm';
import { pgTable } from 'drizzle-orm/pg-core';
import { serial, varchar } from 'drizzle-orm/pg-core';

import { rolePermissions } from './role-permissions.schema';

export const permissions = pgTable('permissions', {
  id: serial('id').primaryKey(),
  key: varchar({ length: 100 }).notNull().unique(),
  name: varchar({ length: 100 }).notNull(),
});

export type Permission = typeof permissions.$inferSelect;

export const permissionsRelations = relations(permissions, ({ many }) => ({
  rolePermissions: many(rolePermissions),
}));
