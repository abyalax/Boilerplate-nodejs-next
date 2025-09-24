import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import { CreateUser } from '~/db/schema';
import { createCustomer } from '~/modules/customers/customer.api';

export const useCreateCustomer = (clientId: string) => {
  const { back } = useRouter();
  return useMutation({
    mutationKey: [QUERY_KEY.CUSTOMER.CREATE],
    mutationFn: async (payload: CreateUser) => await createCustomer(clientId, payload),
    meta: { invalidateQueries: [QUERY_KEY.CUSTOMER.GETS] },
    onSuccess: () => {
      toast.success('Successfully create customer');
      back();
    },
    onError: (error: AxiosError<TResponse>) => {
      const message = error.response?.data.message ?? 'Failed to create customer';
      console.log('useCreateCustomer error : ', error);
      toast.error(message);
    },
  });
};
