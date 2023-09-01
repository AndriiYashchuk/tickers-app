import Script from 'next/script'
import fs from 'fs';
import path from 'path';

const scanFilesAndGetDynamicName = async (): Promise<string | undefined> => {
  const files = fs.readdirSync(path.join(process.cwd(), 'public/dist'));

  const mainScript = files.find((fileName) => fileName.startsWith("main"));
  console.log(mainScript)

  return mainScript;
}

// `app/page.tsx` is the UI for the `/` URL
const Home = async () => {
  const script = await scanFilesAndGetDynamicName()

  return <div>
    <h1>
      Hello from home page
    </h1>
    <div id={"app"}>

    </div>
    {script && <Script src={`/dist/${script}`} type="text/javascript" strategy={'lazyOnload'} />}
  </div>
}

export default Home;
