import { pgTable, primaryKey, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { users } from './users.schema';
import { roles } from '~/db/schema';

export const userRoles = pgTable(
  'user_roles',
  {
    userId: integer().notNull(),
    roleId: integer().notNull(),
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
