import { MetaResponse } from "~/common/types/meta";
import { TAxiosResponse } from "~/common/types/response";
import { api } from "~/lib/axios/api";

import {
  CreateUser,
  UpdateUser,
  User,
} from "../../db/schema/users/users.schema";

export const getClients = async (): Promise<
  TAxiosResponse<{ data: User[]; meta: MetaResponse }>
> => {
  return api.get(`/backoffice/clients`, {});
};

export const getClient = async (
  clientId: string,
): Promise<TAxiosResponse<User[]>> => {
  return api.get(`/backoffice/clients/${clientId}`);
};

export const createClient = async (
  payload: CreateUser,
): Promise<TAxiosResponse<User>> => {
  return api.post(`/backoffice/clients`, { ...payload });
};

export const updateClient = async (
  clientId: string,
  payload: UpdateUser,
): Promise<TAxiosResponse<User>> => {
  return api.put(`/backoffice/clients/${clientId}`, { ...payload });
};

export const deleteClient = async (
  clientId: string,
): Promise<TAxiosResponse<boolean>> => {
  return api.delete(`/backoffice/clients/${clientId}`);
};
