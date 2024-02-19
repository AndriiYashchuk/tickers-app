import NextLink from 'next/link';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import React from 'react';
import { signinLink, signupLink } from '../constants';

export const ToSignUpFromLink = ({ isSignUp }: { isSignUp?: boolean }) => (
  <Grid item>
    <NextLink href={isSignUp ? signinLink : signupLink}>
      <Link component="span" variant="body2">
        {isSignUp
          ? 'Already have an account? Sign in'
          : 'Do you want sign up? Sign up'}
      </Link>
    </NextLink>
  </Grid>
);
