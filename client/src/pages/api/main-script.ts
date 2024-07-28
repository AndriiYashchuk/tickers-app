import fs from 'fs/promises';
import path from 'path';
import { Environments } from '@tickers-app/common/src/environments';

import { NextApiRequest, NextApiResponse } from 'next';
import { CONTAINER_PREFIX } from '../../constants';
import { config } from '../../config';

export const scanInRemote = async (): Promise<string | undefined> => {
  const response = await fetch(`${config.domain}`);
  const reader = response?.body?.getReader();

  if (reader) {
    try {
      const { value } = await reader.read();
      const data = new TextDecoder().decode(value);
      const match = data.match(/main.(\w+).js/);
      const result = match && match[0];

      return `${config.domain}${CONTAINER_PREFIX}/${result}`;
    } catch (e) {
      console.error(e);
    }
  }

  return undefined;
};

const scanInLocal = async (): Promise<string | undefined> => {
  const publicDir = path.join(process.cwd(), `public/${CONTAINER_PREFIX}`);
  const files = await fs.readdir(publicDir);
  const mainScript = files.find(file => file.includes('main'));

  if (mainScript) {
    return Promise.resolve(`${CONTAINER_PREFIX}/${mainScript}`);
  }

  return undefined;
};

const mainScript = async (_: NextApiRequest, res: NextApiResponse): Promise<void> => {
  const fetcher = process.env.NODE_ENV === Environments.DEVELOPMENT
    ? scanInLocal
    : scanInRemote;

  const script: string | undefined = await fetcher();
  const response = { mainScript: script };

  res.status(script ? 200 : 500)
    .json(response);
};

export default mainScript;
