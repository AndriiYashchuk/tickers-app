import fs from 'fs';
import path from 'path';
import { CONTAINER_PREFIX, domain } from './constants';

export const scanFilesInPublicAndGetDynamicName = async (): Promise<string | undefined> => {
  try {
    const files = fs.readdirSync(path.join(process.cwd(), `public/${CONTAINER_PREFIX}`));

    const mainScript = files.find((fileName) => fileName.startsWith("main"));

    return mainScript;
  } catch (e) {
    console.error(e);
  }
}

export const scanInRemote = async (): Promise<string | undefined> => {
  const response = await fetch(domain);
  const reader = response?.body?.getReader();
  let result = undefined;

  if(reader){
    await reader.read()
      .then(function pump({ done, value }) {
        const data = new TextDecoder().decode(value);
        const match = data.match(/main.(\w+).js/);
        result = match && match[0];
      })
      .catch(console.error);
  }

  return result;
}
