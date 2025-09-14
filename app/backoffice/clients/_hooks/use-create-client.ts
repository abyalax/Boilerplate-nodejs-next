import type { TAxiosResponse, TResponse } from '~/common/types/response';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { MUTATION_KEY } from '~/common/const/mutationkey';
import { createCustomer } from '~/modules/customers/users.api';
import { QUERY_KEY } from '~/common/const/querykey';
import { CreateUser, User } from '~/db/schema';
import { toast } from 'react-toastify';

export const useCreateClient = (): UseMutationResult<TAxiosResponse<User>, TResponse, CreateUser, unknown> => {
  return useMutation({
    mutationKey: [MUTATION_KEY.PRODUCT.CREATE],
    mutationFn: async (payload) => await createCustomer(payload),
    meta: { invalidateQueries: [QUERY_KEY.USERS.GET_ALL] },
    onSuccess: () => {
      toast.success('Successfully created users');
    },
    onError: (error) => {
      console.log('useCreateProduct error : ', error);
      toast.error('Failed to create users');
    },
  });
};
