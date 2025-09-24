import { queryOptions, useSuspenseQuery } from '@tanstack/react-query';

import { QUERY_KEY } from '~/common/const/querykey';
import { MetaRequest } from '~/common/types/meta';
import { User } from '~/db/schema';
import { getClients } from '~/modules/clients/client.api';

export const queryGetClients = (params: MetaRequest<User>) =>
  queryOptions({
    queryKey: [QUERY_KEY.CLIENT.GETS, params],
    queryFn: () => getClients(params),
    select: (data) => data.data.data,
  });

export const useGetClients = (params: MetaRequest<User>) => {
  return useSuspenseQuery(queryGetClients(params));
};
