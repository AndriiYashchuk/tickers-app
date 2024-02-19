import React, { Metadata } from 'next';
import LandingPageComponent from '@tickers-app/common-client/build/components/LandingPage';
import Layout from '../components/layouts/main';

export const metadata: Metadata = {
  title: 'Landing',
  description: 'Landing page',
};

const LandingPage = () => {
  return (
    <LandingPageComponent />
  );
};

export default Layout(LandingPage);
