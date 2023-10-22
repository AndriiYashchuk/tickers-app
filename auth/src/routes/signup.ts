import {
  BadRequestError,
  validateRequest,
  UserCreatedEvent,
  NatsWrapper
} from '@tickers-app/common-server';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User as UserModel  } from '../models/user';
// import jwt from 'jsonwebtoken';
import { validateRecaptcha } from '../services/reCaptcha';
import { UserCreatedPublisher } from '../events/publishers/user-created-publisher';
import { natsWrapper } from '../nats-wrapper';

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

    if(!isSuccessRecaptchaValidation) {
      throw new BadRequestError('We couldn\'t validate your submission with reCAPTCHA. Ensure you\'re not using any tools that might interfere, like certain browser extensions.');
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    // @ts-ignore
    const user = UserModel.build({ email, password, name, surname });
    if(secret && secret === process.env.JWT_KEY!){
      user.isAdmin = true;
    }
    await user.save();

    // publish to event buss
    new UserCreatedPublisher(natsWrapper.client).publish({
      email: user.email,
      name: user.name || '',
      surname: user.surname || '',
      token: ''
    })

    res.status(201).send(user);
  }
);

export { router as signupRouter };
