import { userRepository } from '../../../../../db/repositories/users.repository';
import { safeHandler } from '~/lib/handler/safe-handler';
import { NotFoundException } from '~/lib/handler/error';
import { NextResponse } from 'next/server';
import { User } from '~/db/schema';

export const GET = safeHandler<{ id: string }>(async (_, { params }): Promise<NextResponse<User>> => {
  const { id } = await params;
  const user = await userRepository.findById(Number(id));
  if (!user) throw new NotFoundException('User not found');
  return NextResponse.json(user);
});

export const DELETE = safeHandler<{ id: string }>(async (_, { params }) => {
  const { id } = await params;
  const deleted = await userRepository.delete(Number(id));
  if (!deleted) throw new NotFoundException('User not found');
  return NextResponse.json({ message: 'User deleted' }, { status: 204 });
});
