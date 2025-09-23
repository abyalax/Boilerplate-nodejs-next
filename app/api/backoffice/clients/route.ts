import { NextResponse } from "next/server";

import { PERMISSIONS } from "~/common/const/permission";
import { MetaResponse } from "~/common/types/meta";
import { TResponse } from "~/common/types/response";
import { clientRepository } from "~/db/repositories/clients.repository";
import { BaseUser, User, userInsertSchema } from "~/db/schema";
import { safeHandler } from "~/lib/handler/safe-handler";

export const permissions = [PERMISSIONS.CLIENT.READ, PERMISSIONS.CLIENT.CREATE];

// TODO: Implement Pagination
export const GET = safeHandler(
  async (): Promise<
    NextResponse<TResponse<{ data: User[]; meta: MetaResponse }>>
  > => {
    const user = await clientRepository.findMany();
    return NextResponse.json({
      data: {
        data: user,
        meta: {
          total: 20,
          page: 1,
          per_page: 10,
          total_count: 100,
          total_pages: 10,
        },
      },
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
