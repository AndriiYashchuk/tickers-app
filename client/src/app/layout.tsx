'use client';
import './globals.css'
import React from 'react';
import { Inter } from 'next/font/google'
import { Footer, Header, Main } from '@tickers-app/common-client';
import { useRouter } from 'next/navigation';

const inter = Inter({ subsets: ['latin'] })

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
            buttons={['dashboard', 'about', 'login']}
            onClick={(route) => {
              push(route)
            }}
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
