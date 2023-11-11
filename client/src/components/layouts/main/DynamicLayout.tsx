'use client';

import { User } from '@tickers-app/common/types/User';
import React from 'react';
import { Footer } from '@tickers-app/common-client/build/components/Footer';
import { Header } from '@tickers-app/common-client/build/components/Header/Header';
import {
  LOGO,
  MENU,
  UNAUTHORIZED_HEADER,
  AUTHORIZED_HEADER, BASE_HEADER_OPTIONS,
} from '@tickers-app/common-client/build/components/Header/constants';
import { Main } from '@tickers-app/common-client/build/components/Main';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Link } from '@tickers-app/common-client/build/types/Link';

interface Props {
  currentUser: User | null;
  isLoading?: boolean;
  links?: Link [];
  resetUser?: () => void;
}

const DynamicLayout = ({
  children,
  currentUser,
  isLoading,
  resetUser,
}: React.PropsWithChildren<Props>) => {
  const { push } = useRouter();
  const signOut = async () => {
    await axios.post('/api/users/signout');
    if (typeof resetUser === 'function') {
      resetUser();
    }
  };

  return (
    <>
      <Header
        logo={LOGO}
        user={currentUser}
        isLoading={isLoading}
        usersMenu={MENU}
        links={isLoading
          ? BASE_HEADER_OPTIONS
          : (currentUser ? AUTHORIZED_HEADER : UNAUTHORIZED_HEADER)}
        onClick={async ({ to = '/' }) => {
          // signout
          if (to === MENU[0].to) {
            await signOut();
            push('/');
          } else {
            push(to === 'dashboard' ? '/web-app' : to);
          }
        }}
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
};
export default DynamicLayout;
