import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import { PayloadResetPassword, resetPassword } from '~/modules/auth/auth.api';

export const useResetPassword = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.AUTH.RESET_PASSWORD],
    mutationFn: async (payload: PayloadResetPassword) => await resetPassword(payload),
    meta: { invalidateQueries: [QUERY_KEY.CLIENT.GETS] },
    onSuccess: () => toast.success('Successfully reset password'),
    onError: (error: AxiosError<TResponse>) => {
      const message = error.response?.data.message ?? 'Failed to reset password';
      console.log('useResetPassword error : ', error);
      toast.error(message);
    },
  });
};
