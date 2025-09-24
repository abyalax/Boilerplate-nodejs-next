import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '~/common/const/querykey';
import { getCustomer } from '~/modules/customers/customer.api';

export const queryGetCustomer = (clientId: string, customerId: string) =>
  queryOptions({
    queryKey: [QUERY_KEY.CUSTOMER.GET_BY_ID, clientId, customerId],
    queryFn: () => getCustomer(clientId, customerId),
    select: (data) => data.data.data,
  });

export const useGetCustomer = (clientId: string, customerId: string) => {
  return useSuspenseQuery(queryGetCustomer(clientId, customerId));
};
