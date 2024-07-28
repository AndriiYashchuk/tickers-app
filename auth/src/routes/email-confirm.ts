import { BadRequestError } from '@tickers-app/server/src/errors/bad-request-error';
import { validateRequest } from '@tickers-app/server/src/middlewares/validate-request';
import { query } from 'express-validator';
import express, { Request, Response } from 'express';

import { User } from '../models/user';
import { getTokenFromRedis } from '../services/email-confirmaton';
import { getSession } from '../services/get-session';

const router = express.Router();

router.put(
  '/api/users/confirm-email/:token',
  [
    query('id')
      .isMongoId()
      .trim()
      .withMessage('There isn\'t user id in query params'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    // Retrieve the token from the URL parameters
    const { token } = req.params;
    const { id: userId } = req.query;

    const existingUser = await User.findById(userId);

    if (!existingUser) {
      throw new BadRequestError('Invalid userId');
    }

    if (!existingUser.inActive) {
      throw new BadRequestError('Email already confirmed');
    }

    const storedToken = await getTokenFromRedis(userId!.toString());

    if (!storedToken) {
      throw new BadRequestError('Confirmation token is expired');
    }

    if (storedToken !== token) {
      throw new BadRequestError('Invalid token');
    }

    // reset inActive flag
    existingUser.inActive = undefined;
    await existingUser.save();

    // Store it on session object
    req.session = await getSession(existingUser.toJSON());

    res.status(200).send(existingUser);
  }
);

export { router as emailConfirmationRouter };
