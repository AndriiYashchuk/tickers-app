import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
// TODO: need to investigate why webpack cant build components from @tickers-app/common-client
// import { Footer } from '@tickers-app/common-client';
// import { Header } from '@tickers-app/common-client';
// import { Main } from '@tickers-app/common-client';

import theme from '@tickers-app/common-client/src/theme/index';
import './utils/ClassNameGenerator';
import DashboardApp from './apps/DashboardApp';
import { Header } from './components/Header';
import { Main } from './components/Main';
import { Footer } from './components/Footer';

interface Props {
  user: string
}

export const App = ({ user }: Props) => (
  <ThemeProvider theme={theme}>
    <Header />
    <Main>
      <DashboardApp />
    </Main>
    <Footer />
  </ThemeProvider>
)
