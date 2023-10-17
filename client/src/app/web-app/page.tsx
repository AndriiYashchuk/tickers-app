'use client'
import Script from 'next/script'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { fetchWebAppScript } from '../../helpers';
import DynamicLayout from '../../components/layouts/main/DynamicLayout';

const WebApp = () => {
  const router = useRouter();
  const [script, setScript] = useState<string | null>(null);
  const [user, setUser] = useState(null);

  const pushToPath = useCallback((path: string) => {
    console.log(path)
  }, [])

  useEffect(() => {
    fetchWebAppScript(setScript);
  }, []);

  useEffect(() => {
   axios.get('/api/current-user')
     .then(({ data }) => setUser(data.currentUser))
     .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    // @ts-ignore // TODO: add d.ts declaration
    window.onWebAppIsReady = () => {
      // @ts-ignore // TODO: add d.ts declaration
      window.initWebApp({ currentUser: user }, pushToPath);
    }

    return () => {
      // @ts-ignore // TODO: add d.ts declaration
      window.onWebAppIsReady = undefined;
    }
  }, []);

  return (
    <DynamicLayout currentUser={user}>
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
