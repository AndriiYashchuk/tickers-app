import { checkIsAdmin, currentUser } from '@tickers-app/common-server';
import express, { Request, Response } from 'express';
import { User } from '../models/user';

const router = express.Router();

router.get('/api/users',
  currentUser,
  checkIsAdmin,
  async (req: Request, res: Response) => {
    const users = await User.find({ });
    res.status(200).send({ users });
  });

export { router as getUsersRouter };
