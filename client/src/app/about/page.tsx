import { Metadata } from 'next';
import Layout from '../../components/layouts/main';
import AboutPageComponent from '@tickers-app/common-client/build/components/AboutPage';

export const metadata: Metadata = {
  title: 'About',
  description: 'About page',
}

const AboutPage = async () => {
  return (
    <AboutPageComponent />
  );
}

export default Layout(AboutPage);


