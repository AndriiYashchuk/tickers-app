import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { Footer } from '@tickers-app/common-client';
import { Header } from '@tickers-app/common-client';
import { Main } from '@tickers-app/common-client';
import './utils/ClassNameGenerator';
import DashboardApp from './apps/DashboardApp';

interface Props {
  user: string
}

export const App = ({ user }: Props) => (
  <>
    <Header
     buttons={['Dashboard', 'About', 'Login']}
     onClick={console.log}
    />
    <Main>
      <DashboardApp />
    </Main>
    <Footer />
  </>
)
