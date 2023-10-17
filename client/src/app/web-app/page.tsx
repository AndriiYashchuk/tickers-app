'use client'
import React, { useCallback, useEffect, useState } from 'react';
import Script from 'next/script'
import axios from 'axios';
import { redirect } from 'next/navigation';
import { DashboardSkeletons } from '@tickers-app/common-client';
import { AUTHORIZED_HEADER } from '@tickers-app/common-client/build/components/Header/constants';
import { fetchWebAppScript } from '../../helpers';
import DynamicLayout from '../../components/layouts/main/DynamicLayout';

const WebApp = () => {
  const [script, setScript] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchWebAppScript(setScript);
  }, []);

  useEffect(() => {
   axios.get('/api/current-user')
     .then(({ data }) => setUser(data.currentUser))
     .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    window.onWebAppIsReady = () => {
      window.initWebApp({ currentUser: user });
    }

    return () => {
      window.onWebAppIsReady = undefined;
      window.initWebApp = undefined
    }
  }, [user]);

  return (
    <DynamicLayout
      currentUser={user}
      isLoading={!user}
      links={AUTHORIZED_HEADER}
    >
      <DashboardSkeletons />
      {script && (
        <Script
          src={script}
          type="text/javascript"
          strategy={'lazyOnload'}
        />)
      }
    </DynamicLayout>);
}

export default WebApp;
