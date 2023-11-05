import { BadRequestError, ForbiddenError, validateRequest } from '@tickers-app/common-server';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';

import { Password } from '../services/password';
import { User } from '../models/user';
import { validateRecaptcha } from '../services/reCaptcha';
import { getSession } from '../services/get-session';

const router = express.Router();

router.post(
  '/api/users/signin',
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
    const { email, password, token } = req.body;
    const clientIp = req.ip;

    const isSuccessRecaptchaValidation = validateRecaptcha(token, clientIp);

    if (!isSuccessRecaptchaValidation) {
      throw new BadRequestError('We couldn\'t validate your submission with reCAPTCHA. Ensure you\'re not using any tools that might interfere, like certain browser extensions.');
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
      throw new BadRequestError('Invalid Credentials');
    }

    if (existingUser.inActive) {
      throw new ForbiddenError('Please confirm you email.');
    }

    // Store it on session object
    req.session = await getSession(existingUser.toJSON());

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
