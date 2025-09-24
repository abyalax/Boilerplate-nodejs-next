import { UseMutationResult, useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { QUERY_KEY } from '~/common/const/querykey';
import { TAxiosResponse, TResponse } from '~/common/types/response';
import { forgotPassword } from '~/modules/auth/auth.api';

export const useForgotPassword = (): UseMutationResult<TAxiosResponse<unknown>, TResponse, { email: string }, unknown> => {
  return useMutation({
    mutationKey: [QUERY_KEY.AUTH.FORGOT_PASSWORD],
    mutationFn: async (payload) => await forgotPassword(payload),
    meta: { invalidateQueries: [QUERY_KEY.CLIENT.GETS] },
    onSuccess: () => toast.success('Send Email Reset Password, check your email'),
    onError: (error: AxiosError<TResponse>) => {
      console.log('useForgotPassword error : ', error);
      const message = error.response?.data.message ?? 'Failed to request forgot password';
      toast.error(message);
    },
  });
};
