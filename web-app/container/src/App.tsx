import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
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
