import { Message, type TResponse } from '~/common/types/response';
import type { AxiosError, AxiosRequestConfig } from 'axios';
import { redirect } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-toastify';

export const axiosRequest: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  withCredentials: true,
};

export const api = axios.create(axiosRequest);
let hasShownAuthToast = false;

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const response = error.response?.data as TResponse;

    if (
      response?.message === Message.TOKEN_EXPIRED ||
      response?.message === Message.TOKEN_NOT_FOUND ||
      response?.message === Message.TOKEN_INVALID ||
      response?.message === Message.TOKEN_MALFORMED ||
      response?.message === Message.TOKEN_NOT_BEFORE ||
      response?.message === Message.REFRESH_TOKEN_EXPIRED
    ) {
      if (!hasShownAuthToast) {
        toast.error(response.message);
        hasShownAuthToast = true;
      }
      redirect('/auth/login');
    }
    console.log('interceptors:  ', { error });
    if (error.status === 401 || error.status === 403) {
      redirect('/auth/login');
    }

    return Promise.reject(error);
  },
);
