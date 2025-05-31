'use client';

import { User } from '@tickers-app/common/types/User';
import React from 'react';
import { Footer } from '@tickers-app/common-client/src/components/Footer';
import { Header } from '@tickers-app/common-client/src/components/Header/Header';
import {
  LOGO,
  MENU,
  UNAUTHORIZED_HEADER,
  AUTHORIZED_HEADER, BASE_HEADER_OPTIONS,
} from '@tickers-app/common-client/src/components/Header/constants';
import { Main } from '@tickers-app/common-client/src/components/Main';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Link } from '@tickers-app/common-client/src/types/Link';
import { config } from './config';

interface Props {
  currentUser: User | null;
  isMobile?: boolean;
  isLoading?: boolean;
  links?: Link [];
  resetUser?: () => void;
}

const DynamicLayout = ({
  children,
  currentUser,
  isLoading,
  resetUser,
  isMobile,
}: React.PropsWithChildren<Props>) => {
  const { push } = useRouter();
  const signOut = async () => {
    await axios.post('/api/users/signout');
    if (typeof resetUser === 'function') {
      resetUser();
    }
  };
  const navigate = async ({ to = '/' }) => {
    // signout
    if (to === MENU[0].to) {
      await signOut();
      push('/');
    } else {
      push(to === 'dashboard' ? '/web-app' : to);
    }
  };

  return (
    <>
      <Header
        logo={LOGO}
        user={currentUser}
        isMobile={isMobile}
        isLoading={isLoading}
        usersMenu={MENU}
        links={isLoading
          ? BASE_HEADER_OPTIONS
          : (currentUser ? AUTHORIZED_HEADER : UNAUTHORIZED_HEADER)}
        onClick={navigate}
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
};
export default DynamicLayout;
