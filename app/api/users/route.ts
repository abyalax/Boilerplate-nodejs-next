import { UserRepository } from '~/db/repositories/users.repository';
import { userRoles, users, userSchema } from '~/db/schema';
import { UnprocessableEntity } from '~/lib/handler/error';
import { safeHandler } from '~/lib/handler/safe-handler';
import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import * as bcrypt from 'bcrypt';
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
  // return 403 if doesn't have this permission
}, ['something:permission']);

export const POST = safeHandler(async (req: NextRequest) => {
  const body = await req.json();
  const parsed = userSchema.parse(body.data);
  console.log({ parsed });
  const findExist = await db.select().from(users).where(eq(users.email, body.data.email));
  if (findExist.length > 0) throw new UnprocessableEntity('Email already exist');

  const hashed = await bcrypt.hash(body.data.password, 10);

  // insert user
  const [raw] = await db.insert(users).values({
    name: body.data.name,
    email: body.data.email,
    password: hashed,
  });

  // assign role ke user (insert ke pivot table)
  await db.insert(userRoles).values({
    userId: raw.insertId,
    roleId: body.data.roleId,
  });

  // ambil user beserta relasi
  const data = await UserRepository.find(eq(users.id, raw.insertId));

  return NextResponse.json({ message: 'Success Create User', data });
});
