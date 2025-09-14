import type { TAxiosResponse, TResponse } from '~/common/types/response';
import { useQuery, type UseQueryOptions } from '@tanstack/react-query';
import { QUERY_KEY, type QueryKey } from '~/common/const/querykey';
import { getCustomerByID } from '~/modules/customers/users.api';
import { User } from '~/db/schema';

type Result = UseQueryOptions<TAxiosResponse<User>, TResponse, User | undefined, QueryKey<{ id?: string }>[]>;

export const queryGetClientByID = (params: { id?: string }): Result => ({
  queryKey: [QUERY_KEY.USERS.GET_BY_ID, params],
  queryFn: () => getCustomerByID(params),
  select: (data) => data.data.data,
});

export const useGetClientByID = (params: { id?: string }) => {
  return useQuery(queryGetClientByID(params));
};
