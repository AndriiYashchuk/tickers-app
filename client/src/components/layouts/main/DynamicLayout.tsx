'use client'
import { User } from '@tickers-app/common/types/User';
import React, { useState } from 'react';
import { Footer } from '@tickers-app/common-client/build/components/Footer';
import { Header } from '@tickers-app/common-client/build/components/Header/Header';
import {
  LOGO,
  MENU,
  UNAUTHORIZED_HEADER,
  AUTHORIZED_HEADER,
} from '@tickers-app/common-client/build/components/Header/constants';
import { Main } from '@tickers-app/common-client/build/components/Main';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Link } from '@tickers-app/common-client/build/types/Link';

interface Props {
  currentUser: User | null,
  isLoading?: boolean,
  links?: Link []
}

const DynamicLayout = ({
  children,
  currentUser,
  isLoading,
  links
}: React.PropsWithChildren<Props>) => {
  const [user, setUser] = useState(currentUser);
  const { push } = useRouter();
  const signOut = async () => {
    await axios.post('/api/users/signout');
    setUser(null);
  }

  return (
    <>
      <Header
        logo={LOGO}
        user={user}
        isLoading={isLoading}
        usersMenu={MENU}
        links={links || (user ? AUTHORIZED_HEADER : UNAUTHORIZED_HEADER)}
        onClick={async ({ to = '/' }) => {
          // signout
          if(to === MENU[0].to){
            await signOut();
            push('/');
          } else {
            push(to === 'dashboard' ? '/web-app' : to)
          }
        }}
      />
      <Main>
        {children}
      </Main>
      <Footer />
    </>
  )
}
export default DynamicLayout;
