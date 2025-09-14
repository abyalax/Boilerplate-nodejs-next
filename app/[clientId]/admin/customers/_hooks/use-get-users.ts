import type { TAxiosResponse, TResponse } from '~/common/types/response';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { QUERY_KEY, type QueryKey } from '~/common/const/querykey';
import { getCustomers } from '~/modules/customers/users.api';
import { User } from '~/db/schema';

type Result = UseQueryOptions<TAxiosResponse<User[]>, TResponse, User[] | undefined, QueryKey<string | undefined>[]>;

export const querygetCustomers = (query?: string): Result => ({
  queryKey: [QUERY_KEY.USERS.GET_ALL, query],
  queryFn: () => getCustomers(query),
  select: (data) => data.data.data,
});

export const useGetCustomers = (query?: string) => {
  return useQuery(querygetCustomers(query));
};
