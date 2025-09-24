import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import { deleteClient } from '~/modules/clients/client.api';

export const useDeleteClient = () => {
  return useMutation({
    mutationKey: [QUERY_KEY.CLIENT.DELETE],
    mutationFn: async (clientId: string) => await deleteClient(clientId),
    meta: { invalidateQueries: [QUERY_KEY.CLIENT.DELETE] },
    onSuccess: () => {
      toast.success('Successfully delete client');
    },
    onError: (error: AxiosError<TResponse>) => {
      const message = error.response?.data.message ?? 'Failed to delete client';
      console.log('useDeleteClient error : ', error);
      toast.error(message);
    },
  });
};
