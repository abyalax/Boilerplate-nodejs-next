import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

import { QUERY_KEY } from '~/common/const/querykey';
import { TResponse } from '~/common/types/response';
import { deleteCustomer } from '~/modules/customers/customer.api';

export const useDeleteCustomer = (clientId: string) => {
  return useMutation({
    mutationKey: [QUERY_KEY.CUSTOMER.DELETE],
    mutationFn: async (customerId: string) => await deleteCustomer(clientId, customerId),
    meta: { invalidateQueries: [QUERY_KEY.CUSTOMER.GETS] },
    onSuccess: () => {
      toast.success('Successfully delete customer');
    },
    onError: (error: AxiosError<TResponse>) => {
      const message = error.response?.data.message ?? 'Failed to delete customer';
      console.log('useDeleteCustomer error : ', error);
      toast.error(message);
    },
  });
};
