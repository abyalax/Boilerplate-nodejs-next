import { MetaRequest, MetaResponse } from '~/common/types/meta';
import { TAxiosResponse } from '~/common/types/response';
import { api } from '~/lib/axios/api';
import { CreateUser, UpdateUser, User } from '../../db/schema/users/users.schema';

export const getCustomers = async (clientId: string, params?: MetaRequest<User>): Promise<TAxiosResponse<{ data: User[]; meta: MetaResponse }>> => {
  return api.get(`/${clientId}/customers`, { params });
};

export const getCustomer = async (clientId: string, customerId: string): Promise<TAxiosResponse<User>> => {
  return api.get(`/${clientId}/customers/${customerId}`);
};

export const createCustomer = async (clientId: string, payload: CreateUser): Promise<TAxiosResponse<User>> => {
  return api.post(`/${clientId}/customers`, { ...payload });
};

export const updateCustomer = async (clientId: string, customerId: string, payload: UpdateUser): Promise<TAxiosResponse<User>> => {
  return api.put(`/${clientId}/customers/${customerId}`, { ...payload });
};

export const deleteCustomer = async (clientId: string, customerId: string): Promise<TAxiosResponse<boolean>> => {
  return api.delete(`/${clientId}/customers/${customerId}`);
};
