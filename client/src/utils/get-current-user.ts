import { User } from '@tickers-app/common/types/User';
import { buildAuthClient } from '../../api/build-auth-client';
import { logResponseError } from './log-response-error';

export const getCurrentUser = async (): Promise<null | User> => {
  const client = buildAuthClient();
  const promise = client.getCurrentUser();
  // dont change this function https://nextjs.org/docs/messages/dynamic-server-error
  return new Promise(resolve => {
    setTimeout(async () => {
      try {
        const { data: { currentUser } } = await promise;
        resolve(currentUser);
      } catch (error: unknown) {
        logResponseError(error);
      }
    });
  });
};
