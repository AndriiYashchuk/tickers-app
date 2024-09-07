import React, { Metadata } from 'next';
import AboutPageComponent from '@tickers-app/common-client/src/components/AboutPage';
import Layout from '../../components/layouts/main';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page',
};

const AboutPage = async () => {
  return (
    <AboutPageComponent />
  );
};

export default Layout(AboutPage);
