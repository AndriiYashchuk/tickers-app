import './globals.css'
import React from 'react';
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


const Layout = async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  )
}

export default Layout;
