import { ExtractString } from '~/lib/utils';

export const QUERY_KEY = {
  AUTH: {
    LOGIN: 'login',
    REGISTER: 'register',
    LOGOUT: 'logout',
    FORGOT_PASSWORD: 'forgot_password',
    RESET_PASSWORD: 'reset_password',
  },
  CUSTOMER: {
    GETS: 'get_customers',
    GET_BY_ID: 'get_customer_by_id',

    CREATE: 'create_customer',
    UPDATE: 'update_customer',
    DELETE: 'delete_customer',

    GET_PROFILE: 'get_profile',

    GET_ORDER: 'get_order',
    CREATE_ORDER: 'create_order',
    UPDATE_ORDER: 'update_order',
    DELETE_ORDER: 'delete_order',
  },

  CLIENT: {
    GETS: 'get_clients',
    GET_BY_ID: 'get_client_by_id',

    CREATE: 'create_client',
    UPDATE: 'update_client',
    DELETE: 'delete_client',
  },
} as const;

export type QueryKey<T = string> = ExtractString<typeof QUERY_KEY> & T;
