'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import axios from 'axios';
import { DashboardSkeletons } from '@tickers-app/common-client';
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
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    // @ts-ignore // TODO: add d.ts declaration
    window.onWebAppIsReady = () => {
      // @ts-ignore // TODO: add d.ts declaration
      window.initWebApp({ currentUser: user });
    };

    return () => {
      // @ts-ignore // TODO: add d.ts declaration
      window.onWebAppIsReady = undefined;
      // @ts-ignore // TODO: add d.ts declaration
      window.initWebApp = undefined;
    };
  }, [user]);

  return (
    <DynamicLayout
      currentUser={user}
      isLoading={!user}
      resetUser={() => setUser(null)}
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
};

export default WebApp;
