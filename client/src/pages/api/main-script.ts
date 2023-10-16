import fs from 'fs';
import path from 'path';
import { CONTAINER_PREFIX } from '../../constants';
import { NextApiRequest, NextApiResponse } from 'next';

const mainScript = (req: NextApiRequest, res: NextApiResponse): void => {
  const publicDir = path.join(process.cwd(), `public/${CONTAINER_PREFIX}`);
  const files = fs.readdirSync(publicDir);
  const mainScript = files.find((file) => file.includes('main'));

  res.status(200).json({ mainScript });
};

export default mainScript;
