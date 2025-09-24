import { api } from '~/lib/axios/api';

export const forgotPassword = async (payload: { email: string }) => {
  return await api.post('/auth/forgot-password', payload);
};

export const resetPassword = async (payload: { token: string; password: string }) => {
  return await api.post('/auth/reset-password', { data: payload });
};
