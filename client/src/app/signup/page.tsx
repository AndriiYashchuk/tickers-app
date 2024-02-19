'use client';

import React, { useRef, useState } from 'react';
import {
  Button,
  Grid,
} from '@mui/material';

import Link from 'next/link';
import AuthForm from '../../components/AuthForm';
import { SIGN_UP_PROPS } from '../../components/constants';
import { ToSignUpFromLink } from '../../components/ToSignUpFromLink';
import DynamicLayout from '../../components/layouts/main/DynamicLayout';
import { useSignupForm } from '../../hooks/useSignupForm';
import { useRequestWithUiErrors } from '../../hooks/useRequestWithUiErrors';
import { recaptchaPublicApiKey } from '../../constants';
import { CenteredLayout } from '../../components/layouts/CenteredLayout';
import { CenteredTextWithIcon } from '../../components/CenteredTextWithIcon';

const Signup = () => {
  const resetFormCallback = useRef<() => void | undefined>();
  const [isRegistered, setIsRegistered] = useState(false);
  const {
    email, handleEmail,
    password, handlePassword,
    name, handleName,
    surname, handleSurname
  } = useSignupForm(resetFormCallback.current);
  const body = { email, password };

  const { doRequest, uiErrors, resetErrors } = useRequestWithUiErrors({
    url: SIGN_UP_PROPS.submitUrl,
    method: 'post',
    body: { ...body, name, surname },
    onSuccess: () => {
      setIsRegistered(true);
    }
  });
  resetFormCallback.current = resetErrors;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    window.grecaptcha.ready((): void => {
      window.grecaptcha.execute(recaptchaPublicApiKey, { action: SIGN_UP_PROPS.action })
        .then((token: string): Promise<void> => doRequest(token))
        .catch((err: any) => console.error(err));
    });
  };

  return (
    <DynamicLayout
      currentUser={null}
    >
      {isRegistered
        ? (
          <CenteredLayout titleText={'Email was sent.'}>
            <CenteredTextWithIcon text={'Email successfully sent. Please check you inbox to confirm'} />
            <Grid container spacing={2} marginTop={2}>
              <Grid item>
                <Link href={'/signin'}>
                  <Button variant="contained" color="primary">
                    To sign in page
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
          </CenteredLayout>
        )
        : (
          <AuthForm
            isSignup
            email={email}
            password={password}
            handleEmail={handleEmail}
            handlePassword={handlePassword}
            onSubmit={onSubmit}
            uiErrors={uiErrors}
            icon={SIGN_UP_PROPS.icon}
            title={SIGN_UP_PROPS.title}
            handleName={handleName}
            handleSurname={handleSurname}
          >
            <ToSignUpFromLink isSignUp />
          </AuthForm>)}
    </DynamicLayout>
  );
};

export default Signup;
