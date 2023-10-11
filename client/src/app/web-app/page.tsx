'use client'
import Script from 'next/script'
import { CONTAINER_PREFIX } from '../../constants';
import { useEffect, useState } from 'react';
import { fetchWebAppScript } from '../../helpers';

const Home = () => {
  const [script, setScript] = useState<string | null>(null);

  useEffect(() => {
    fetchWebAppScript(setScript);
  }, []);

  return (
    <>
    <div id={"root"} />
    {script && <Script src={`${CONTAINER_PREFIX}/${script}`} type="text/javascript" strategy={'lazyOnload'} />}
  </>);
}

export default Home;
