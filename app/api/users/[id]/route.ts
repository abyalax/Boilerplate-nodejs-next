import { safeHandler } from '~/lib/handler/safe-handler';
import { NotFoundException } from '~/lib/handler/error';
import { NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db } from '~/db';
import { users } from '~/db/schema';

export const GET = safeHandler<{ id: string }>(async (_req, { params }) => {
  const { id } = await params;
  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, Number(id)));
  console.log({ user });
  if (user.length === 0) throw new NotFoundException('User not found');
  return NextResponse.json({ data: user });
});

export const DELETE = safeHandler<{ id: string }>(async (_req, { params }) => {
  const { id } = await params;
  const [deleted] = await db.delete(users).where(eq(users.id, Number(id)));

  if (deleted.affectedRows === 0) throw new NotFoundException('User not found');
  return NextResponse.json({ message: 'User deleted' });
});
