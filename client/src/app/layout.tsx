'use client';
import './globals.css'
import React from 'react';
import { Inter } from 'next/font/google'
import { Footer, Header, Main } from '@tickers-app/common-client';
import { useRouter } from 'next/navigation';
import { signinLink } from '../constants';

const inter = Inter({ subsets: ['latin'] })

const LOGO = { title: 'Tickers', to: '/' }
const UNAUTHORIZED_HEADER = [
  { title: 'dashboard', to: 'web-app' },
  { title: 'about', to: 'about' },
  { title: 'signin', to: signinLink }
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { push } = useRouter();

  return (
    <html lang="en">
    <body className={inter.className}>
    <div id="root">
      <Header
        logo={LOGO}
        links={UNAUTHORIZED_HEADER}
        onClick={({ to = '/' }): void => push(to === 'dashboard' ? '/web-app' : to)}
      />
      <Main>
        {children}
      </Main>
      <Footer />
    </div>
    </body>
    </html>
  )
}
