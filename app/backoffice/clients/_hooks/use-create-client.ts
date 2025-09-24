import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import { CreateUser } from '~/db/schema';
import { createClient } from '~/modules/clients/client.api';

export const useCreateClient = () => {
  const { back } = useRouter();
  return useMutation({
    mutationKey: [QUERY_KEY.CLIENT.CREATE],
    mutationFn: async (payload: CreateUser) => await createClient(payload),
    meta: { invalidateQueries: [QUERY_KEY.CLIENT.GETS] },
    onSuccess: () => {
      toast.success('Successfully create client');
      back();
    },
    onError: (error: AxiosError<TResponse>) => {
      const message = error.response?.data.message ?? 'Failed to create client';
      console.log('useCreateClient error : ', error);
      toast.error(message);
    },
  });
};
