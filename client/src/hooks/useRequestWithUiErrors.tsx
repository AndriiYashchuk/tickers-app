import { ReactNode, useMemo } from 'react';
import Typography from "@mui/material/Typography";
import { Props, useRequest } from './useRequest';

export const useRequestWithUiErrors = (args: Props) => {
  const { errors, ...rest } = useRequest(args);
  const uiErrors: ReactNode | null =  useMemo(() => {
    if(!errors) return null;

    return (
      <ul>
        {errors && errors?.map(({ message}) => (
          <li key={message}>
            <Typography
              justifyContent="center"
              color="error"
            >
              {message}
            </Typography>
          </li>
        ))}
      </ul>
    );
  }, [errors])

  return {
    ...rest,
    errors,
    uiErrors,
  }
}
