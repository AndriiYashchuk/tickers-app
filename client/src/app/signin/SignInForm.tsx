'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Grid } from '@mui/material';
import Link from 'next/link';
import { SIGN_IN_PROPS } from './config';
import { ToSignUpFromLink } from '../../components/ToSignUpFromLink';
import AuthForm from '../../components/AuthForm';
import { useSignupForm } from '../../hooks/useSignupForm';
import { CenteredLayout } from '../../components/layouts/CenteredLayout';
import { useRequestWithUiErrors } from '../../hooks/useRequestWithUiErrors';
import { recaptchaPublicApiKey } from '../../constants';

export const SignInForm = () => {
  const resetFormCallback = useRef<() => void | undefined>();
  const { push } = useRouter();
  const {
    email, handleEmail,
    password, handlePassword,
  } = useSignupForm(resetFormCallback.current);
  const body = { email, password };

  const { doRequest, uiErrors, resetErrors, errors } = useRequestWithUiErrors({
    url: SIGN_IN_PROPS.submitUrl,
    method: 'post',
    body,
    onSuccess: () => push('/web-app')
  });
  resetFormCallback.current = resetErrors;
  const isAccountNotConfirmed = errors?.some((error: any) => error.message === 'Please confirm you email.');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    window.grecaptcha.ready((): void => {
      window.grecaptcha.execute(recaptchaPublicApiKey, { action: SIGN_IN_PROPS.action })
        .then((token: string): Promise<void> => doRequest(token))
        .catch((err: any) => console.error(err));
    });
  };

  return !isAccountNotConfirmed
    ? (
      <AuthForm
        isSignup={false}
        email={email}
        password={password}
        handleEmail={handleEmail}
        handlePassword={handlePassword}
        onSubmit={onSubmit}
        uiErrors={uiErrors}
        icon={SIGN_IN_PROPS.icon}
        title={SIGN_IN_PROPS.title}
      >
        <ToSignUpFromLink />
      </AuthForm>)
    : (
      <CenteredLayout
        titleText={'Account is not confirmed'}
      >
        <p>Please go to you email inbox, to confirm yours email.</p>
        <p>
          If you cant find the confirmation email link in yours inbox we can send the new one.
        </p>
        <Grid container spacing={2} marginTop={2}>
          <Grid item>
            <Link href={'/resend-email'}>
              <Button variant="contained" color="primary">
                To Resend page
              </Button>
            </Link>
          </Grid>
          <Grid item>
            <Link href={'/'}>
              <Button variant="outlined">
                To landing page
              </Button>
            </Link>
          </Grid>
        </Grid>
      </CenteredLayout>);
};
