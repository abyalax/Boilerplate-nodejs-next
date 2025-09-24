import { NextResponse } from "next/server";

import { PERMISSIONS } from "~/common/const/permission";
import { MetaResponse } from "~/common/types/meta";
import { TResponse } from "~/common/types/response";
import { paginate } from "~/db/helper";
import { clientRepository } from "~/db/repositories/clients.repository";
import { BaseUser, userInsertSchema, users } from "~/db/schema";
import { safeHandler } from "~/lib/handler/safe-handler";

export const permissions = [PERMISSIONS.CLIENT.READ, PERMISSIONS.CLIENT.CREATE];

export const GET = safeHandler(
  async (
    req,
  ): Promise<
    NextResponse<TResponse<{ data: BaseUser[]; meta: MetaResponse }>>
  > => {
    const pageParams = req.nextUrl.searchParams.get("page");
    const perPageParams = req.nextUrl.searchParams.get("per_page");
    const page = pageParams ? Number(pageParams) : 1;
    const perPage = perPageParams ? Number(perPageParams) : 10;
    const whereClause = await clientRepository.clientWhere();
    const data = await paginate<BaseUser>({
      table: users,
      page,
      perPage,
      where: whereClause,
    });
    return NextResponse.json({
      data,
    });
  },
);

export const POST = safeHandler(
  async (req): Promise<NextResponse<TResponse<BaseUser>>> => {
    const body = await req.json();
    const parsed = userInsertSchema.parse(body);
    const created = await clientRepository.create(parsed);
    return NextResponse.json({ data: created });
  },
);
