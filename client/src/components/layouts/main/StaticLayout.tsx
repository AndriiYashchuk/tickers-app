import React from 'react';
import { HeaderStatic } from '@tickers-app/common-client/src/components/Header/Header.static';
import {
  LOGO,
  BASE_HEADER_OPTIONS,
} from '@tickers-app/common-client/src/components/Header/constants';
import { Main } from '@tickers-app/common-client/src/components/Main';
import { Footer } from '@tickers-app/common-client/src/components/Footer';
import { config } from './config';

export const StaticLayout = ({
  children,
  isMobile
}: React.PropsWithChildren<{ isMobile: boolean }>) => (
  <>
    <HeaderStatic
      logo={LOGO}
      isRenderFromSSR
      isLoading
      links={BASE_HEADER_OPTIONS}
      isMobile={isMobile}
    />
    <Main>
      {children}
    </Main>
    <Footer
      email={config.email}
      author={config.author}
      phone={config.phone}
    />
  </>
);
