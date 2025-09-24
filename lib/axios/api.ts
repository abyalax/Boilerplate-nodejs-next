import type { AxiosRequestConfig } from 'axios';
import axios from 'axios';

export const axiosRequest: AxiosRequestConfig = {
  baseURL: process.env.NEXT_PUBLIC_BASE_URL_API,
  withCredentials: true,
};

export const api = axios.create(axiosRequest);
