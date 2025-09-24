/* eslint-disable no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { env } from '~/common/const/credential';
import { Permission } from '~/db/schema';

import { handlers } from './handler';

type Handler<T> = (req: NextRequest, context: { params: Promise<T> }) => Promise<NextResponse>;

export function safeHandler<TParams extends Record<string, unknown>>(handler: Handler<TParams>, permissions: string[] = []) {
  return async (req: NextRequest, context: { params: Promise<TParams> }) => {
    try {
      const token = await getToken({ req, secret: env.JWT_SECRET });
      const userPermissions: string[] = token?.permissions?.map((p: Permission) => p.key) || [];
      if (permissions?.length > 0) {
        const hasPermission = permissions.every((p) => userPermissions.includes(p));
        if (!hasPermission)
          return NextResponse.json(
            {
              message: `Missing one or more permission (${permissions})`,
              error: 'Forbidden',
            },
            { status: 403 },
          );
      }
      return await handler(req, context);
    } catch (err: unknown) {
      for (const [klass, handler] of handlers.entries()) {
        if (err instanceof klass) {
          const res = handler(err);
          return NextResponse.json({ message: res.message, error: res.error }, { status: res.status });
        }
      }
      console.error('[Unhandled Error]: ', err);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  };
}
