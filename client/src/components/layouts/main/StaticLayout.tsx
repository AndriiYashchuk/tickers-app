import React from 'react';
import { HeaderStatic } from '@tickers-app/common-client/build/components/Header/Header.static';
import {
  LOGO,
  BASE_HEADER_OPTIONS,
} from '@tickers-app/common-client/build/components/Header/constants';
import { Main } from '@tickers-app/common-client/build/components/Main';
import { Footer } from '@tickers-app/common-client/build/components/Footer';

export const StaticLayout = ({ children }: React.PropsWithChildren<{}>) => (
  <>
    <HeaderStatic
      logo={LOGO}
      isRenderFromSSR
      isLoading
      links={BASE_HEADER_OPTIONS}
    />
    <Main>
      {children}
    </Main>
    <Footer
      email="tickersapp@gmail.com"
      author={{
        link: 'https://www.linkedin.com/in/andrii-yashchuk',
        name: 'Andrii Yashchuk'
      }}
      phone="+1234567889"
    />
  </>
);
