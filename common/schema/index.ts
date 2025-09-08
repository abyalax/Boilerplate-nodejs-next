import z from 'zod';

export const numberAsString = (min: number, max: number) => z.preprocess((val) => (val !== undefined ? Number(val) : undefined), z.number().min(min).max(max));

export const basePaginationSchema = (entityKey: readonly [string, ...string[]]) =>
  z.object({
    page: z.coerce.number().min(1).optional().default(1),
    per_page: z.coerce.number().min(1).max(100).optional().default(10),
    sort_by: z.enum(entityKey).optional(),
    order_by: z.enum(['ASC', 'DESC']).optional(),
    search: z.string().optional(),
    engine: z.enum(['server_side', 'client_side']).default('server_side').optional(),
  });
