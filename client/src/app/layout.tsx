import './globals.css';
import React from 'react';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { GA_KEY, GTM_KEY } from '../constants';

const inter = Inter({ subsets: ['latin'] });

const Layout = async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_KEY}`}
        strategy="afterInteractive"
      />
      <Script
        id="init-ga"
        strategy={'afterInteractive'}
        dangerouslySetInnerHTML={{
          __html: `
         window.dataLayer = window.dataLayer || [];
         function gtag(){dataLayer.push(arguments);}
         gtag('js', new Date());
  
          gtag('config', '${GA_KEY}');
         `
        }}
      />
      <Script
        id="init-ga-tag-manager"
        strategy={'afterInteractive'}
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_KEY}');
         `
        }}
      />
      <body className={inter.className}>
        <noscript dangerouslySetInnerHTML={{
          __html: `
              <iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_KEY}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
        ` }}
        />
        <div id="root">
          {children}
        </div>
      </body>
    </html>
  );
};

export default Layout;
