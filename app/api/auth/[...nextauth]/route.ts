import { userRepository } from '~/db/repositories/users.repository';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NotFoundException } from '~/lib/handler/error';
import GoogleProvider from 'next-auth/providers/google';
import { env } from '~/common/const/credential';
import { AuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import { users } from '~/db/schema';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';

const options: AuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  jwt: {
    secret: env.JWT_SECRET,
    maxAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: false,
        maxAge: 24 * 60 * 60,
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
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (credentials?.email && credentials?.password) {
          const user = await userRepository.rawFind(eq(users.email, credentials?.email));
          if (user === undefined) throw new NotFoundException('User not found');
          const isValid = bcrypt.compare(credentials.password, user.password);
          if (!isValid) return null;
          return userRepository.flattenRolePermission(user);
        } else {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token }) {
      if (token.email) {
        const user = await userRepository.find(eq(users.email, token.email));
        if (user === undefined) return token;
        token.id = user.id;
        token.roles = user.roles;
        token.permissions = user.permissions;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.roles = token.roles;
        session.user.permissions = token.permissions;
      }
      return session;
    },

    async signIn({ account, profile }) {
      if (account?.provider === 'google' && profile?.email) {
        const user = await userRepository.baseFind(eq(users.email, profile.email));
        if (user === undefined) {
          await userRepository.create({
            name: profile.name ?? profile.email.split('@')[0],
            email: profile.email,
            password: '',
            roleId: 1,
          });
          return true;
        }
        return true;
      }
      return true;
    },
  },

  pages: {
    signIn: '/auth/login',
  },

  secret: env.NEXT_SECRET,
};

const handler = NextAuth(options);
export { handler as GET, handler as POST };
