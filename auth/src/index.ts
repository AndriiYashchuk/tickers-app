import { json } from 'body-parser';
import express from 'express';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';

const start = async () => {
  const app = express();

  app.use(json())
  app.use(currentUserRouter)
  app.use(signinRouter)
  app.use(signoutRouter)
  app.use(signupRouter)

  app.listen(3000, () => {
    console.log('Listening on port: 3000');
  });
};

start();
