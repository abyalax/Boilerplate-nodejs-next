/** biome-ignore-all lint/style/useNamingConvention: <off> */
export type roles = 'Customer' | 'Client Admin' | 'System Admin';

export const ROLE = {
  CUSTOMER: 'Customer',
  CLIENT: 'Client Admin',
  SYSTEM_ADMIN: 'System Admin',
} as const;

export const ROLEIDS: Record<string, number> = {
  Customer: 1,
  'Client Admin': 2,
  'System Admin': 3,
} as const;

export const PERMISSIONS = {
  CLIENT: {
    CREATE: 'client:create',
    READ: 'client:read',
    UPDATE: 'client:update',
    DELETE: 'client:delete',
    ALL: 'client:*',
  },
  CUSTOMER: {
    READ_PROFILE: 'customer:read_profile',

    CREATE_ORDER: 'customer:create_order',
    READ_ORDER: 'customer:read_order',
    UPDATE_ORDER: 'customer:update_order',
    DELETE_ORDER: 'customer:delete_order',

    CREATE: 'customer:create',
    READ: 'customer:read',
    UPDATE: 'customer:update',
    DELETE: 'customer:delete',

    ALL: 'customer:*',
  },
} as const;
