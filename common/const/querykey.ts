import { ExtractString } from '~/lib/utils';

export const QUERY_KEY = {
  USERS: {
    GET_ALL: 'get-product-all',
    GET_BY_ID: 'get-product-by-id',
  },
} as const;

export type QueryKey<T = never> = ExtractString<typeof QUERY_KEY> | T;
