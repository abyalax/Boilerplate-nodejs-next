import { TAxiosResponse } from '~/common/types/response';
import { api } from '~/lib/axios/api';
import { CreateUser, User } from '../../db/schema/users/users.schema';

export const getCustomers = async (query?: string): Promise<TAxiosResponse<User[]>> => {
  return api.get('/1/customers', { params: { q: query } });
};

export const getCustomerByID = async (params: { id?: string }): Promise<TAxiosResponse<User>> => {
  return api.get(`/1/customers/${params.id}`);
};

export const createCustomer = async (payload: CreateUser): Promise<TAxiosResponse<User>> => {
  return api.post('/1/customers', { data: payload });
};
