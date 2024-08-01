import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import axios, { AxiosRequestConfig } from 'axios';
import { withCache } from '@tickers-app/common/src/utils/withCache';
import { User } from '@tickers-app/common/types/User';

import fetchAdapter from '../api/fetch-adapter';
import { logResponseError } from './utils/log-response-error';
import { CONFIG } from './config';

const getSessionCookie = (request: NextRequest): string => {
  const sessionCookie = request.cookies.get('session');
  return `${sessionCookie?.name}=${sessionCookie?.value}`;
};

const fetchCurrentUser: (request: NextRequest) => Promise<{ currentUser: User }> =
  withCache(async (request: NextRequest) => {
    const cookie = getSessionCookie(request);
    const config = {
      adapter: fetchAdapter,
      headers: {
        cookie
      }
    } as AxiosRequestConfig;

    try {
      const { data } = await axios.get(`${CONFIG.clientServiceDomain}/api/current-user`, config);

      return data;
    } catch (error) {
      logResponseError(error);
    }

    return {
      currentUser: null
    };
  }, 1000, getSessionCookie);

export async function middleware(request: NextRequest) {
  const isWebAppPage = request.nextUrl.pathname.startsWith('/web-app');

  if (isWebAppPage) {
    try {
      const { currentUser } = await fetchCurrentUser(request);

      if (!currentUser) {
        return NextResponse.redirect(`${CONFIG.domain}/signin`);
      }
    } catch (e) {
      console.error(e);
    }
  }

  return NextResponse.next();
}
