import { SQL, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

import { PERMISSIONS } from '~/common/const/permission';
import { MetaResponse } from '~/common/types/meta';
import { TResponse } from '~/common/types/response';
import { paginate } from '~/db/helper';
import { customerRepository } from '~/db/repositories/customers.repository';
import { BaseUser, userInsertSchema, users } from '~/db/schema';
import { safeHandler } from '~/lib/handler/safe-handler';

export const permissions = [PERMISSIONS.CUSTOMER.READ, PERMISSIONS.CUSTOMER.CREATE];

export const GET = safeHandler(async (req): Promise<NextResponse<TResponse<{ data: BaseUser[]; meta: MetaResponse }>>> => {
  const pageParams = req.nextUrl.searchParams.get('page');
  const perPageParams = req.nextUrl.searchParams.get('per_page');
  const searchParams = req.nextUrl.searchParams.get('search');

  let searchClause: SQL | undefined;

  const page = pageParams ? Number(pageParams) : 1;
  const perPage = perPageParams ? Number(perPageParams) : 10;

  if (searchParams) searchClause = sql`to_tsvector('simple', "users"."name") @@ plainto_tsquery('simple', ${searchParams})`;

  const whereClause = await customerRepository.customerWhere(searchClause);
  const data = await paginate<BaseUser>({
    table: users,
    page,
    perPage,
    where: whereClause,
  });

  return NextResponse.json({
    data,
  });
});

export const POST = safeHandler(async (req): Promise<NextResponse<TResponse<BaseUser>>> => {
  const body = await req.json();
  const parsed = userInsertSchema.parse(body);
  const created = await customerRepository.create(parsed);
  return NextResponse.json({ data: created });
});
