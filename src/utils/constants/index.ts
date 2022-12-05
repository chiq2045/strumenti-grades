import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import { BackendResponse } from 'types';

export const baseUrl = 'http://localhost:3000';

export const instance = (url: string) =>
  axios.create({
    baseURL: `${baseUrl}${url}`,
    timeout: 15000,
  });

export const responseBody = <T>(response: AxiosResponse<BackendResponse<T>>) =>
  response.data;

export const errorBody = <T>(
  error: Error | AxiosError<BackendResponse<T>>
): BackendResponse<T> =>
  isAxiosError(error)
    ? {
        data: error.response?.data.data ?? [],
        error: error.response?.data.error,
        message: error.response?.data.message ?? 'Error',
      }
    : {
        message: 'Error',
        data: [] as T[],
        error,
      };
