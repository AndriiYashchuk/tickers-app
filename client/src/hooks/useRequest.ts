import {useState} from 'react';
import axios, { AxiosError } from 'axios';

export interface Props {
  url: string,
  method: 'post' | 'get' | 'put' | 'patch'
  body?: Record<string, any>;
  onSuccess?: () => void
}

interface Error {
  message: string
}

export const useRequest = ({ url, body, method, onSuccess }: Props) => {
  const [errors, setErrors] = useState<Error [] | null>(null);

  const doRequest = async (token: string) => {
    try{
      const response = await axios[method](url, {
        ...body,
        token
      });
      if (onSuccess){
        onSuccess();
      }
      return response.data;
    } catch (error: unknown){
      let errorState = [{ message: 'Sorry, something went wrong, please try again later' }];
      if (error instanceof AxiosError){
        errorState = error.response?.data?.errors;
      }
      setErrors(errorState);
      console.error(error);
    }
  }
  const resetErrors = () => {
    setErrors(null);
  }

  return {
    doRequest,
    errors,
    resetErrors,
  }
}

