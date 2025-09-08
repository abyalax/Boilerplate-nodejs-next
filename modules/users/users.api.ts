import { TAxiosResponse } from '~/common/types/response';
import { FormUser, User } from '~/db/schema';
import { api } from '~/lib/axios/api';

export const getUsers = async (query?: string): Promise<TAxiosResponse<User[]>> => {
  return api.get('/users', { params: { q: query } });
};

export const getUserByID = async (params: { id?: string }): Promise<TAxiosResponse<User>> => {
  return api.get(`/users/${params.id}`);
};

export const createUser = async (payload: FormUser): Promise<TAxiosResponse<User>> => {
  return api.post('/users', { data: payload });
};
