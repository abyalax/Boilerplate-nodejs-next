import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { QUERY_KEY } from "~/common/const/querykey";
import { CreateUser } from "~/db/schema";
import { createCustomer } from "~/modules/customers/customer.api";

export const useCreateCustomer = (clientId: string) => {
  return useMutation({
    mutationKey: [QUERY_KEY.CLIENT.CREATE],
    mutationFn: async (payload: CreateUser) =>
      await createCustomer(clientId, payload),
    meta: { invalidateQueries: [QUERY_KEY.CLIENT.GETS] },
    onSuccess: () => {
      toast.success("Successfully create customer");
    },
    onError: (error) => {
      console.log("useCreateCustomer error : ", error);
      toast.error("Failed to create customer");
    },
  });
};
