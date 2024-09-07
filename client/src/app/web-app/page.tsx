'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import axios from 'axios';
import { DashboardSkeletons } from '@tickers-app/common-client/build/components/skeletons/DashboardSkeletons';
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
    // @ts-ignore // TODO: add d.ts declaration in common-client package
    window.onWebAppIsReady = () => {
      // @ts-ignore // TODO: add d.ts declaration common-client package
      window.initWebApp({ currentUser: user });
    };

    return () => {
      // @ts-ignore // TODO: add d.ts declaration common-client package
      window.onWebAppIsReady = undefined;
      // @ts-ignore // TODO: add d.ts declaration common-client package
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
