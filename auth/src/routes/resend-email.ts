import { BadRequestError, validateRequest } from '@tickers-app/common-server';
import { body } from 'express-validator';
import express, { Request, Response } from 'express';

import { User as UserModel } from '../models/user';
import {
  deleteTokenFromRedis,
  putTokenToRedis
} from '../services/email-confirmaton';
import { validateRecaptcha } from '../services/reCaptcha';
import { natsWrapper } from '../nats-wrapper';
import { UserResendEmailPublisher } from '../events/publishers/user-resen-email-publisher';

const router = express.Router();

router.post(
  '/api/users/resend-email',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('token')
      .trim()
      .notEmpty()
      .withMessage('There isn`t recaptcha token'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, token } = req.body;
    const clientIp = req.ip;

    const isSuccessRecaptchaValidation = validateRecaptcha(token, clientIp);

    if (!isSuccessRecaptchaValidation) {
      throw new BadRequestError('We couldn\'t validate your submission with reCAPTCHA. Ensure you\'re not using any tools that might interfere, like certain browser extensions.');
    }

    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('There is no user with this email');
    }

    if (!existingUser.inActive) {
      throw new BadRequestError('This user is already active');
    }

    // delete old token from redis
    await deleteTokenFromRedis(existingUser.id);

    // generate new token and put it to redis
    const emailConfirmationToken = await putTokenToRedis(existingUser.id);

    // publish to event bus
    new UserResendEmailPublisher(natsWrapper.client).publish({
      email: existingUser.email,
      token: emailConfirmationToken,
      name: existingUser.name || '',
      surname: existingUser.surname || '',
      userId: existingUser.id,
    });

    res.status(200).send({});
  }
);

export { router as resendEmailConfirmationRouter };
