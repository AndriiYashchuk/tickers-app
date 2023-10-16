import React from 'react';
import HowToReg from "@mui/icons-material/HowToReg";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Props } from './AuthForm';

export const SIGN_UP_PROPS: Props = {
  icon: <HowToReg color="inherit" />,
  title: 'Sign up',
  isSignup: true,
  submitUrl: '/api/users/signup'
}

export const SIGN_IN_PROPS: Props = {
  icon: <ExitToAppIcon color="inherit" />,
  title: 'Sign in',
  submitUrl: '/api/users/signin'
}
