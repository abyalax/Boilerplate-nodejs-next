import { NextResponse } from 'next/server';

import { PERMISSIONS } from '~/common/const/permission';
import { TResponse } from '~/common/types/response';
import { customerRepository } from '~/db/repositories/customers.repository';
import { BaseUser, User } from '~/db/schema';
import { NotFoundException } from '~/lib/handler/error';
import { safeHandler } from '~/lib/handler/safe-handler';

export const permissions = [PERMISSIONS.CUSTOMER.READ, PERMISSIONS.CUSTOMER.UPDATE, PERMISSIONS.CUSTOMER.DELETE];

export const GET = safeHandler<{ clientId: string }>(async (_, { params }): Promise<NextResponse<TResponse<User>>> => {
  const { clientId } = await params;
  const user = await customerRepository.findById(Number(clientId));
  if (!user) throw new NotFoundException('Client not found');
  return NextResponse.json({ data: user });
});

export const PUT = safeHandler<{ clientId: string }>(async (req, { params }): Promise<NextResponse<TResponse<BaseUser>>> => {
  const { clientId } = await params;
  const body = await req.json();
  const updated = await customerRepository.update(Number(clientId), body);
  if (!updated) throw new NotFoundException('Client not found');
  return NextResponse.json({
    message: 'Client updated successfully',
    data: updated,
  });
});

export const DELETE = safeHandler<{ clientId: string }>(async (_, { params }): Promise<NextResponse<TResponse>> => {
  const { clientId } = await params;
  const deleted = await customerRepository.delete(Number(clientId));
  if (!deleted) throw new NotFoundException('Client not found');
  return NextResponse.json({ message: 'Client deleted' }, { status: 204 });
});
