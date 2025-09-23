import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { QUERY_KEY } from "~/common/const/querykey";
import { TAxiosResponse, TResponse } from "~/common/types/response";
import { resetPassword } from "~/modules/auth/auth.api";

export const useResetPassword = (): UseMutationResult<
  TAxiosResponse<unknown>,
  TResponse,
  { token: string; password: string },
  unknown
> => {
  return useMutation({
    mutationKey: [QUERY_KEY.AUTH.RESET_PASSWORD],
    mutationFn: async (payload) => await resetPassword(payload),
    meta: { invalidateQueries: [QUERY_KEY.CLIENT.GETS] },
    onSuccess: () => toast.success("Successfully reset password"),
    onError: (error) => {
      console.log("useResetPassword error : ", error);
      toast.error(error.message);
    },
  });
};
