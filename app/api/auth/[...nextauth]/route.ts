import CredentialsProvider from 'next-auth/providers/credentials';
import { Permission, Role, userRoles, users } from '~/db/schema';
import GoogleProvider from 'next-auth/providers/google';

import { env } from '~/common/const/credential';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
import { db } from '~/db';

const options: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: env.JWT_SECRET,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
        maxAge: 24 * 60 * 60, // 24 hours
      },
    },
  },

  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) return null;
        const userWithRoles = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
          with: {
            userRoles: {
              with: {
                role: {
                  columns: { id: true, name: true },
                  with: { rolePermissions: { with: { permission: { columns: { id: true, key: true, name: true } } } } },
                },
              },
            },
          },
        });

        if (!userWithRoles) return null;

        const isValid = await bcrypt.compare(credentials.password, userWithRoles.password);
        if (!isValid) return null;

        const userRoles = userWithRoles.userRoles.map((ur: { role: { id: number; name: string } }) => ({
          id: ur.role.id,
          name: ur.role.name,
        }));

        const userPermissions = userWithRoles.userRoles.flatMap(
          (ur: { role: { rolePermissions: Array<{ permission: { id: number; key: string; name: string } }> } }) =>
            ur.role.rolePermissions.map((rp) => ({
              id: rp.permission.id,
              key: rp.permission.key,
              name: rp.permission.name,
            })),
        );

        return {
          id: userWithRoles.id.toString(),
          name: userWithRoles.name,
          email: userWithRoles.email,
          roles: userRoles,
          permissions: userPermissions,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      if (token.email) {
        const user = await db.query.users.findFirst({
          where: eq(users.email, token.email as string),
          with: {
            userRoles: {
              with: {
                role: {
                  with: {
                    rolePermissions: {
                      with: {
                        permission: true,
                      },
                    },
                  },
                },
              },
            },
          },
        });

        if (user) {
          token.id = user.id.toString();
          token.roles = user.userRoles.map((ur) => ({
            id: ur.role.id,
            name: ur.role.name,
          }));
          token.permissions = user.userRoles.flatMap((ur) =>
            ur.role.rolePermissions.map((rp) => ({
              id: rp.permission.id,
              key: rp.permission.key,
              name: rp.permission.name,
            })),
          );
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.roles = token.roles as Role[];
        session.user.permissions = token.permissions as Permission[];
      }
      return session;
    },

    async signIn({ account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        // Check if user exists
        let user = await db.query.users.findFirst({
          where: eq(users.email, profile.email),
          with: { userRoles: { with: { role: { with: { rolePermissions: { with: { permission: true } } } } } } },
        });

        // kalau user belum ada → insert + assign default role
        if (!user) {
          const result = await db.insert(users).values({
            email: profile.email,
            name: profile.name ?? '',
            password: await bcrypt.hash(Math.random().toString(36), 10),
          });

          const newUserId = result[0].insertId;

          await db.insert(userRoles).values({
            userId: newUserId,
            roleId: 2,
          });
          user = await db.query.users.findFirst({
            where: eq(users.id, newUserId),
            with: { userRoles: { with: { role: { with: { rolePermissions: { with: { permission: true } } } } } } },
          });
        }
        return true;
      }
      return true;
    },
  },

  pages: {
    signIn: '/auth/login',
    // error: '/auth/error',
  },

  secret: env.NEXT_SECRET,
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
