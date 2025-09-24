import { SQL, sql } from 'drizzle-orm';
import { PgTable } from 'drizzle-orm/pg-core';
import { MetaResponse } from '~/common/types/meta';
import { db } from '..';

type PaginateOptions = {
  table: PgTable;
  page: number;
  perPage: number;
  where?: SQL;
  orderBy?: SQL;
};

export async function paginate<T>({ table, page, perPage, orderBy, where }: PaginateOptions): Promise<{ data: T[]; meta: MetaResponse }> {
  const totalCountResult = await db
    .select({ count: sql<number>`count(*)`.mapWith(Number) })
    .from(table)
    .where(where ?? sql`true`);

  const totalCount = totalCountResult[0].count;
  const totalPages = Math.ceil(totalCount / perPage);

  const query = db.select().from(table);

  if (where) query.where(where);
  if (orderBy) query.orderBy(orderBy);

  query.limit(perPage).offset((page - 1) * perPage);
  const data = (await query) as T[];

  return {
    data,
    meta: {
      page,
      per_page: perPage,
      total_count: totalCount,
      total_pages: totalPages,
    },
  };
}
