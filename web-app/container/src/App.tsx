import React from 'react';
import { AUTHORIZED_HEADER, LOGO, MENU } from '@tickers-app/common-client/build/components/Header/constants';
import { Footer } from '@tickers-app/common-client/build/components/Footer';
import { Header } from '@tickers-app/common-client/build/components/Header';
import { Main } from '@tickers-app/common-client/build/components/Main';
import axios from 'axios';
import { User } from '@tickers-app/common/types/User';
import DashboardApp from './apps/DashboardApp';

interface Props {
  user: User;
}

export const App = ({ user }: Props): JSX.Element => (
  <>
    <Header
      logo={LOGO}
      user={user}
      usersMenu={MENU}
      links={AUTHORIZED_HEADER}
      onClick={async ({ to }): Promise<void> => {
        if (to === 'signout') {
          await axios.post('/api/users/signout');
          window.location.href = '/';
        }
      }}
    />
    <Main>
      <DashboardApp />
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
