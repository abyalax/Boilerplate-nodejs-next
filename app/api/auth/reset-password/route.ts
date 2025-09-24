import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';

import { env } from '~/common/const/credential';
import { userRepository } from '~/db/repositories/users.repository';
import { users } from '~/db/schema';
import { UnauthorizedException, UnprocessableEntity } from '~/lib/handler/error';
import { safeHandler } from '~/lib/handler/safe-handler';

// TODO:
export const POST = safeHandler(async (req: NextRequest) => {
  const { token, password } = await req.json();
  const verifyToken = jwt.verify(token, env.JWT_SECRET) as { email: string };

  // TODO: Find User by email first

  if (!verifyToken) throw new UnauthorizedException('Token Expired');
  const hashedPassword = await bcrypt.hash(password, 10);
  const updated = await userRepository.update(eq(users.email, verifyToken.email), { password: hashedPassword });
  if (updated === undefined) throw new UnprocessableEntity('Update Password Failed');
  return NextResponse.json({
    message: 'Success Update Password',
    data: updated,
  });
});
