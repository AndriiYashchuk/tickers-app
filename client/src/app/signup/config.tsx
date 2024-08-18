import React from 'react';
import HowToReg from '@mui/icons-material/HowToReg';

export const SIGN_UP_PROPS = {
  icon: <HowToReg color="inherit" />,
  title: 'Sign up',
  isSignup: true,
  submitUrl: '/api/users/signup',
  action: 'signup',
};
