import type { AxiosResponse } from 'axios';

export const Message = {
  TOKEN_NOT_FOUND: 'Token Not Found',
  TOKEN_INVALID: 'Token Invalid',
  TOKEN_EXPIRED: 'Token Expired',
  TOKEN_MALFORMED: 'Token Malformed',
  TOKEN_SIGNATURE_INVALID: 'Token Signature Invalid',
  TOKEN_NOT_BEFORE: 'Token Not Before',
  REFRESH_TOKEN_EXPIRED: 'Refresh Token Expired',

  DATABASE_ERROR: 'Database Error',
  DATABASE_QUERY_FAILED: 'Database Query Failed',

  ENTITY_NOT_FOUND: 'Entity Not Found',
  ENTITY_CONFLICT: 'Entity Conflict',

  INTERNAL_SERVER_ERROR: 'Internal Server Error',
} as const;

export type TResponse<T = unknown> = {
  message?: string;
  error?: unknown[];
  data?: T;
};

export type TAxiosResponse<T = unknown> = AxiosResponse<TResponse<T>>;
