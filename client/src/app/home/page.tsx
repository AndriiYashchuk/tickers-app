import Script from 'next/script'
import { CONTAINER_PREFIX, domain, isProd } from '../../constants';
import { scanFilesInPublicAndGetDynamicName, scanInRemote } from '../../helpers';

// `app/page.tsx` is the UI for the `/` URL
const Home = async () => {
  const funcToScanScript = isProd ? scanInRemote : scanFilesInPublicAndGetDynamicName;
  const script = await funcToScanScript();
  console.log(`web-app script: ${script}`);

  return (
    <>
    <div id={"root"} />
    {script && <Script src={`${domain}${CONTAINER_PREFIX}/${script}`} type="text/javascript" strategy={'lazyOnload'} />}
  </>);
}

export default Home;
