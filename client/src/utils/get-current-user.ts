import { User } from '@tickers-app/common/types/User';
import { buildAuthClient } from '../../api/build-auth-client';
import { logResponseError } from './log-response-error';

export const getCurrentUser = async (): Promise<null | User> => {
  const client = buildAuthClient();
  try{
    const { data: { currentUser } } = await client.getCurrentUser();
    return currentUser;
  }catch (error: unknown){
    logResponseError(error);
  }
  return null;
};
