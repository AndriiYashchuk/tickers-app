import React from 'react';
import HowToReg from "@mui/icons-material/HowToReg";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const SIGN_UP_PROPS = {
  icon: <HowToReg color="inherit" />,
  title: 'Sign up',
  isSignup: true,
  submitUrl: '/api/users/signup',
  action: 'signup',
}

export const SIGN_IN_PROPS = {
  icon: <ExitToAppIcon color="inherit" />,
  title: 'Sign in',
  submitUrl: '/api/users/signin',
  action: 'signin'
}
