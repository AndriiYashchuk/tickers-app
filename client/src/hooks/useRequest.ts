import {useState} from 'react';
import axios from 'axios';

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

  const doRequest = async () => {
    try{
      const response = await axios[method](url, body);
      if (onSuccess){
        onSuccess();
      }
      return response.data;
    } catch (error: any){
      console.error(error);
      const errorState = error.response?.data?.errors || [{ message: 'Sorry, something went wrong, please try again later' }];
      setErrors(errorState);
    }
  };
  const resetErrors = () => {
    setErrors(null);
  }

  return {
    doRequest,
    errors,
    resetErrors,
  }
}

