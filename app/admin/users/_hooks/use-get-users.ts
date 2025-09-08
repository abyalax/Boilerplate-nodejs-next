import type { TAxiosResponse, TResponse } from '~/common/types/response';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { QUERY_KEY, type QueryKey } from '~/common/const/querykey';
import { getUsers } from '~/modules/users/users.api';
import { User } from '~/db/schema';

type Result = UseQueryOptions<TAxiosResponse<User[]>, TResponse, User[] | undefined, QueryKey<string | undefined>[]>;

export const queryGetUsers = (query?: string): Result => ({
  queryKey: [QUERY_KEY.USERS.GET_ALL, query],
  queryFn: () => getUsers(query),
  select: (data) => data.data.data,
});

export const useGetUsers = (query?: string) => {
  return useQuery(queryGetUsers(query));
};
