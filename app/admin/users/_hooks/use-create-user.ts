import type { TAxiosResponse, TResponse } from '~/common/types/response';
import { useMutation, UseMutationResult } from '@tanstack/react-query';
import { MUTATION_KEY } from '~/common/const/mutationkey';
import { createUser } from '~/modules/users/users.api';
import { QUERY_KEY } from '~/common/const/querykey';
import { FormUser, User } from '~/db/schema';
import { toast } from 'react-toastify';

export const useCreateUser = (): UseMutationResult<TAxiosResponse<User>, TResponse, FormUser, unknown> => {
  return useMutation({
    mutationKey: [MUTATION_KEY.PRODUCT.CREATE],
    mutationFn: async (payload) => await createUser(payload),
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
