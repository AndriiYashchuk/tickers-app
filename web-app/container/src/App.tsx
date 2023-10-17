import React from 'react';
import { AUTHORIZED_HEADER, LOGO, MENU } from '@tickers-app/common-client/build/components/Header/constants';
import { Footer } from '@tickers-app/common-client/build/components/Footer';
import { Header } from '@tickers-app/common-client/build/components/Header';
import { Main } from '@tickers-app/common-client/build/components/Main';
import './utils/ClassNameGenerator';
import axios from 'axios';
import DashboardApp from './apps/DashboardApp';
import { User } from '@tickers-app/common/types/User';

interface Props {
  user: User
}

export const App = ({ user }: Props) => (
    <>
      <Header
        logo={LOGO}
        user={user}
        usersMenu={MENU}
        links={AUTHORIZED_HEADER}
        onClick={async ({ to }) => {
          if(to === 'signout'){
            await axios.post('/api/users/signout')
            window.location.href = '/'
          }
        }}
      />
      <Main>
        <DashboardApp />
      </Main>
      <Footer />
    </>
  );
