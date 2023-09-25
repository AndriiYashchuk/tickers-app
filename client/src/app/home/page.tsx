import Script from 'next/script'
import fs from 'fs';
import path from 'path';

const CONTAINER_PREFIX = '/container/latest';
const domain = process.env.PRODUCTION_DOMAIN || 'http://localhost:3000'

const scanFilesAndGetDynamicName = async (): Promise<string | undefined> => {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), `public/${CONTAINER_PREFIX}`));

    const mainScript = files.find((fileName) => fileName.startsWith("main"));
    console.log(mainScript)

    return mainScript;
  } catch (e) {
    console.error(e);
  }
}

// `app/page.tsx` is the UI for the `/` URL
const Home = async () => {
  const script = await scanFilesAndGetDynamicName()

  return <div>
    <h1>
      Hello from home page
    </h1>
    <div id={"root"}>

    </div>
    {script && <Script src={`${domain}${CONTAINER_PREFIX}/${script}`} type="text/javascript" strategy={'lazyOnload'} />}
  </div>
}

export default Home;
