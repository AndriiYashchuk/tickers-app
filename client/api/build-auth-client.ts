import axios, { AxiosAdapter, AxiosInstance, AxiosResponse } from 'axios';
import { headers } from 'next/headers';
import type { NextRequest } from 'next/server';
import { User } from '@tickers-app/common/types/User';

type ApiItem<T> = () => Promise<AxiosResponse<T>>

const isBackendSide = typeof window === 'undefined';

interface Api {
  getCurrentUser: ApiItem<{ currentUser: User}>
  signOut: ApiItem<void>
}

let authClient: Api;

const getApi = (instance: AxiosInstance): Api => ({
  getCurrentUser: (
    request?: NextRequest,
    adapter?: AxiosAdapter
  ): Promise<AxiosResponse<{ currentUser: User}>> => {
    let cookie;
    if (!request) {
      const headersList = headers();
      cookie = headersList.get('cookie') || '';
    } else {
      const sessionCookie = request.cookies.get('session');
      cookie = `${sessionCookie?.name}=${sessionCookie?.value}`;
    }
    const config = {
      adapter,
      headers: {
        cookie
      },
    };

    return instance.get('/api/users/currentuser', config)
      .catch(() => {
        return {
          data: { currentUser: null }
        } as unknown as AxiosResponse<{ currentUser: User}>;
      });
  },
  signOut: () => instance.post('/api/users/signout')
});

const initAuthClient = () => {
  if (isBackendSide) {
    const instance = axios.create({
      // TODO: change to http://ingress-nginx-controller.ingress-nginx.svc.cluster.local
      baseURL: 'http://auth-srv:3000',
    });

    return getApi(instance);
  }
  // We must be on the browser
  const instance = axios.create({
    baseURL: '/',
  });

  return getApi(instance);
};

export const buildAuthClient = () => {
  if (!authClient) {
    authClient = initAuthClient();
  }

  return authClient;
};
