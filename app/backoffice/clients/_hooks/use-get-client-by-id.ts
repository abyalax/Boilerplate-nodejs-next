import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "~/common/const/querykey";
import { getClient } from "~/modules/clients/client.api";

export const useGetClientByID = (clientId: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.CLIENT.GET_BY_ID],
    queryFn: () => getClient(clientId),
    select: (data) => data.data.data,
  });
};
