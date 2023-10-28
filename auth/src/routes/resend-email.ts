import { BadRequestError, validateRequest } from '@tickers-app/common-server';
import { body, query } from 'express-validator';
import express, { Request, Response } from 'express';

import { User as UserModel, User } from '../models/user';
import { getTokenFromRedis, putTokenToRedis } from '../services/email-confirmaton';
import { getSession } from '../services/get-session';
import { validateRecaptcha } from '../services/reCaptcha';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post(
  '/api/users/resend-email',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, secret, name, surname, token } = req.body;
    const clientIp = req.ip;


    const isSuccessRecaptchaValidation = validateRecaptcha(token, clientIp);

    if(!isSuccessRecaptchaValidation) {
      throw new BadRequestError('We couldn\'t validate your submission with reCAPTCHA. Ensure you\'re not using any tools that might interfere, like certain browser extensions.');
    }
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    // TODO: delete old link from redis


    const emailConfirmationToken = await putTokenToRedis(user.id);

    // publish to event bus
    new UserCreatedPublisher(natsWrapper.client).publish({
      email: user.email,
    })

    res.status(200).send(existingUser);
  }
);

export { router as emailConfirmationRouter };
