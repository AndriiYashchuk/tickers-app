import fs from 'fs';
import path from 'path';
import { CONTAINER_PREFIX } from '../../constants';
import { NextApiRequest, NextApiResponse } from 'next';


export const scanInRemote = async (): Promise<string | null> => {
  const response = await fetch(`${process.env.WEB_APP_DOMAIN}`);
  const reader = response?.body?.getReader();
  let result = null;

  if(reader){
    await reader.read()
      .then(function pump({ done, value }) {
        const data = new TextDecoder().decode(value);
        const match = data.match(/main.(\w+).js/);
        result = match && match[0];
      })
      .catch(console.error);
  }


  result = `${process.env.WEB_APP_DOMAIN}/${CONTAINER_PREFIX}/${result}`

  return result;
}


const scanInLocal = async (): Promise<string | undefined> => {
  const publicDir = path.join(process.cwd(), `public/${CONTAINER_PREFIX}`);
  // TODO: rewrite on async read!
  const files = fs.readdirSync(publicDir);
  const mainScript = files.find((file) => file.includes('main'));

  return Promise.resolve(mainScript)
}

const mainScript = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const fetcher = process.env.NODE_ENV !== 'development'
    ? scanInLocal
    : scanInRemote

  const script = await fetcher();

  res.status(200).json({ mainScript: script || null });
};

export default mainScript;
