import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server';
import axios, { AxiosRequestConfig } from 'axios';
import fetchAdapter from '../api/fetch-adapter';
import { logResponseError } from './utils/log-response-error';

const domain = process.env.NODE_ENV === 'development' ? 'https://tickers-app.dev' : 'https://tickers-app.com';

const withCache = (fn: Function, cacheTime = 1000) => {
  let res: any;

  return async (request: NextRequest) => {
    if (!res) {
      res = await fn(request);
      setTimeout(() => {
        res = null
      }, cacheTime);
    }
    return res;
  }
}


const fetchCurrentUser = withCache(async (request: NextRequest) => {
  const sessionCookie = request.cookies.get('session');
  const cookie = `${sessionCookie?.name}=${sessionCookie?.value}`;
  const config = {
    adapter: fetchAdapter,
    headers: {
      cookie
    }
  } as AxiosRequestConfig;

  try {
    const { data } = await axios.get(`http://client-srv:3000/api/current-user`, config);

    return data;
  } catch (error) {
    logResponseError(error);
  }

  return {
    currentUser: null
  };
})

export async function middleware(request: NextRequest) {
  const { currentUser } = await fetchCurrentUser(request);
  const isWebAppPage = request.nextUrl.pathname.startsWith('/web-app')
  const isSigninPage = request.nextUrl.pathname.startsWith('/signin')
  const isSignupPage = request.nextUrl.pathname.startsWith('/signup')
  const isConfirmEmailPage = request.nextUrl.pathname.startsWith('/email-confirmation')
  const isResendEmailPage = request.nextUrl.pathname.startsWith('/resend-email')

  if (isWebAppPage && !currentUser) {
    return NextResponse.redirect(`${domain}/signin`);
  }

  if(currentUser){
    if (isSigninPage || isSignupPage || isConfirmEmailPage || isResendEmailPage) {
      return NextResponse.redirect(domain);
    }
  }

  return NextResponse.next();
}

