import { BadRequestError, validateRequest } from '@tickers-app/common-server';
import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

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
    const { email, password, secret } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    if(secret && secret === process.env.JWT_KEY!){
      user.isAdmin = true;
    }
    await user.save();

    // Generate JWT
    const userData: { id: string, email: string, isAdmin?: boolean } = {
        id: user.id,
        email: user.email,
      };
    if(user.isAdmin){
      userData.isAdmin = user.isAdmin
    }
    const userJwt = jwt.sign(userData, process.env.JWT_KEY!);

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
