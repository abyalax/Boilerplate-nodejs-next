import { userRoles } from './user-roles.schema';
import { serial, varchar } from 'drizzle-orm/mysql-core';
import { mysqlTable } from 'drizzle-orm/mysql-core';
import { Permission } from './permissions.schema';
import { relations } from 'drizzle-orm';
import { Role } from './roles.schema';
import z from 'zod';

export const users = mysqlTable('users', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});

export type User = typeof users.$inferSelect & {
  roles: Role[];
  permissions: Permission[];
};

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  roleId: z.number(),
});

export type FormUser = z.infer<typeof userSchema>;

export const usersRelations = relations(users, ({ many }) => ({
  userRoles: many(userRoles),
}));
