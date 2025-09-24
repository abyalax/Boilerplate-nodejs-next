import { queryOptions, useQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '~/common/const/querykey';
import { getClient } from '~/modules/clients/client.api';

export const queryGetClientByID = (clientId: string) =>
  queryOptions({
    queryKey: [QUERY_KEY.CLIENT.GET_BY_ID, clientId],
    queryFn: () => getClient(clientId),
    select: (data) => data.data.data,
  });

export const useGetClientByID = (clientId: string) => {
  return useQuery(queryGetClientByID(clientId));
};
