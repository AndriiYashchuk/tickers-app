import { Props, useRequest } from './useRequest';
import { useMemo } from 'react';

export const useRequestWithUiErrors = (args: Props) => {
  const { errors, ...rest } = useRequest(args);
  const uiErrors =  useMemo(() => {
    if(!errors) return null;

    return (
      <div>
        <ul>
          {errors && errors?.map(({ message}) => (
            <li key={message}>
              {message}
            </li>
          ))}
        </ul>
      </div>
    );
  }, [errors])

  return {
    ...rest,
    uiErrors,
  }
}
