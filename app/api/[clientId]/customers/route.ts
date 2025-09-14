import { userInsertSchema, users } from '~/db/schema/users/users.schema';
import { userRepository } from '../../../../db/repositories/users.repository';
import { safeHandler } from '~/lib/handler/safe-handler';
import { NextRequest, NextResponse } from 'next/server';
import { db } from '~/db';

// example guard permissions, but does'nt support per method security
// all handler will be protected to this permission
export const permissions = ['read:user', 'create:user', 'update:user'];

export const GET = safeHandler(async () => {
  const data = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
    })
    .from(users);
  return NextResponse.json({ message: 'Success Get Data User', data: data });
}, ['something:permission']);

export const POST = safeHandler(async (req: NextRequest) => {
  const body = await req.json();
  const parsed = userInsertSchema.parse(body.data);
  const user = await userRepository.create(parsed);
  return NextResponse.json({ message: 'Success Create User', data: user });
});
