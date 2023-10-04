import express, { Request, Response } from 'express';
import { body } from 'express-validator';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password')
  ],
  // validateRequest, todo: implement
  async (req: Request, res: Response) => {
    const { email, password } = req.body;


    res.status(200).send({ email, password });
  }
);

export { router as signinRouter };
