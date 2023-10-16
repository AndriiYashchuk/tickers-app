import React from 'react';
import { AUTHORIZED_HEADER, LOGO, MENU } from '@tickers-app/common-client/build/components/Header/constants';
import { Footer } from '@tickers-app/common-client/build/components/Footer';
import { Header } from '@tickers-app/common-client/build/components/Header';
import { Main } from '@tickers-app/common-client/build/components/Main';
import { useHistory } from "react-router-dom"
import './utils/ClassNameGenerator';
import axios from 'axios';
import DashboardApp from './apps/DashboardApp';
import { User } from '@tickers-app/common/types/User';

interface Props {
  user: User
  pushToPath: (path: string) => void
}

export const App = ({ user, pushToPath }: Props) => {
  const history = useHistory();
  return (
    <>
      <Header
        logo={LOGO}
        user={user}
        usersMenu={MENU}
        links={AUTHORIZED_HEADER}
        onClick={({ to }) => {
          if(to === 'signout'){
            axios.post('/api/users/signout')
              .then(() => {
                pushToPath('/')
              })
          }
        }}
      />
      <Main>
        <DashboardApp />
      </Main>
      <Footer />
    </>
  )
}
