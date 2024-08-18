import React from 'react';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

export const SIGN_IN_PROPS = {
  icon: <ExitToAppIcon color="inherit" />,
  title: 'Sign in',
  submitUrl: '/api/users/signin',
  action: 'signin'
};
