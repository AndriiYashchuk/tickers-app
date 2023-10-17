import React from 'react';
import { HeaderStatic } from '@tickers-app/common-client/build/components/Header/Header.static';
import {
  LOGO,
  UNAUTHORIZED_HEADER
} from '@tickers-app/common-client/build/components/Header/constants';
import { Main } from '@tickers-app/common-client/build/components/Main';
import { Footer } from '@tickers-app/common-client/build/components/Footer';

export const StaticLayout = ({ children }: {children: any}) => (
  <>
    <HeaderStatic
      logo={LOGO}
      isRenderFromSSR
      isLoading
      links={[UNAUTHORIZED_HEADER[0], UNAUTHORIZED_HEADER[1]]}
    />
    <Main>
      {children}
    </Main>
    <Footer />
  </>
)
