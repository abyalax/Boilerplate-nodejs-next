import { useQuery } from "@tanstack/react-query";

import { QUERY_KEY } from "~/common/const/querykey";
import { getClients } from "~/modules/clients/client.api";

export const useGetClients = () => {
  return useQuery({
    queryKey: [QUERY_KEY.CLIENT.GETS],
    queryFn: () => getClients(),
    select: (data) => data.data.data,
  });
};
