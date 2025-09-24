import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '~/common/const/querykey';
import { MetaRequest } from '~/common/types/meta';
import { User } from '~/db/schema';
import { getCustomers } from '~/modules/customers/customer.api';

export const queryGetCustomers = (clientId: string, params: MetaRequest<User>) =>
  queryOptions({
    queryKey: [QUERY_KEY.CUSTOMER.GETS, params],
    queryFn: () => getCustomers(clientId, params),
    select: (data) => data.data.data,
  });

export const useGetCustomers = (clientId: string, params: MetaRequest<User>) => {
  return useSuspenseQuery(queryGetCustomers(clientId, params));
};
