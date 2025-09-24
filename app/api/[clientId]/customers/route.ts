import { NextResponse } from 'next/server';

import { PERMISSIONS } from '~/common/const/permission';
import { TResponse } from '~/common/types/response';
import { customerRepository } from '~/db/repositories/customers.repository';
import { BaseUser, User, userInsertSchema } from '~/db/schema';
import { safeHandler } from '~/lib/handler/safe-handler';

export const permissions = [PERMISSIONS.CUSTOMER.READ, PERMISSIONS.CUSTOMER.CREATE];

export const GET = safeHandler(async (): Promise<NextResponse<TResponse<User[]>>> => {
  const user = await customerRepository.find();
  return NextResponse.json({ data: user });
});

export const POST = safeHandler(async (req): Promise<NextResponse<TResponse<BaseUser>>> => {
  const body = await req.json();
  const parsed = userInsertSchema.parse(body.data);
  const created = await customerRepository.create(parsed);
  return NextResponse.json({ data: created });
});
