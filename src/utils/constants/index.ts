import axios, { AxiosError, AxiosResponse, isAxiosError } from 'axios';
import { GetAxiosResponse, Homeroom } from 'types';

export const baseUrl = 'http://localhost:3000';

export const instance = (url: string) =>
  axios.create({
    baseURL: `${baseUrl}${url}`,
    timeout: 15000,
  });

export const responseBody = (
  response: AxiosResponse<GetAxiosResponse<Homeroom>>
) => response.data;

export const errorBody = (
  error: Error | AxiosError<GetAxiosResponse<Homeroom>>
): GetAxiosResponse<Homeroom> =>
  isAxiosError(error)
    ? {
        data: error.response?.data.data ?? [],
        error: error.response?.data.error,
        message: error.response?.data.message ?? 'Error',
      }
    : {
        message: 'Error',
        data: [] as Homeroom[],
        error,
      };
