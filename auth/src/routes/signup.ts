import {
  BadRequestError,
  validateRequest,
} from '@tickers-app/common-server';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User as UserModel, UserAttrs } from '../models/user';
import { validateRecaptcha } from '../services/reCaptcha';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import { natsWrapper } from '../nats-wrapper';
import { putTokenToRedis } from '../services/email-confirmaton';

const router = express.Router();

router.post(
  '/api/users/signup',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters')
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, secret, name, surname, token } = req.body;
    const clientIp = req.ip;

    const isSuccessRecaptchaValidation = validateRecaptcha(token, clientIp);

    if (!isSuccessRecaptchaValidation) {
      throw new BadRequestError('We couldn\'t validate your submission with reCAPTCHA. Ensure you\'re not using any tools that might interfere, like certain browser extensions.');
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = UserModel.build({
      email,
      password,
      name,
      surname,
      inActive: true,
    } as UserAttrs);
    if ((secret && secret === process.env.JWT_KEY!) || email === process.env.ADMIN_EMAIL!) {
      user.isAdmin = true;
    }
    await user.save();

    const emailConfirmationToken = await putTokenToRedis(user.id);

    // publish to event bus
    new UserCreatedPublisher(natsWrapper.client).publish({
      email: user.email,
      name: user.name || '',
      surname: user.surname || '',
      token: emailConfirmationToken || '',
      userId: user.id
    });

    res.status(201).send({});
  }
);

export { router as signupRouter };
