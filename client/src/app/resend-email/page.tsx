'use client'
import React, { useState } from 'react';
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  TextField,
  Grid,
} from '@mui/material';
import Link from 'next/link';
import { recaptchaPublicApiKey } from '../../constants';
import { useRequestWithUiErrors } from '../../hooks/useRequestWithUiErrors';
import { CenteredTextWithIcon } from '../../components/CenteredTextWithIcon';

// todo: reuse this function in singin / signup pages
const validateEmail = (email: string): boolean => {
  return !email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const EmailConfirmationPage = () => {
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);
  const isLoading = false;

  const { doRequest, uiErrors, resetErrors } = useRequestWithUiErrors({
    url: '/api/users/resend-email',
    method: 'post',
    body: { email },
    onSuccess: () => {
      setIsEmailSent(true);
    }
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    window.grecaptcha.ready((): void => {
      window.grecaptcha.execute(recaptchaPublicApiKey, { action: 'resend_email' })
        .then((token: string): Promise<void> => doRequest(token))
        .catch((err: any) => console.error(err));
    });
  }

  // TODO: split layout from resend-email and email-confirmation pages into separate components
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // 100% of the viewport height
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <div>
              {isLoading && <CircularProgress />}
            </div>
          </Grid>
          <Grid item xs={11} minHeight={'200px'}>
            <Typography variant="h4" gutterBottom>
              Resend Email
            </Typography>
            {!isLoading &&
              (uiErrors
                ? (
                  <>
                    <Typography variant="body1" color={'error'}>
                      An error occurred while sending email to you:
                    </Typography>
                    {uiErrors}
                    <Grid spacing={4}>
                      <Typography variant="body1">
                        Do you want to resend the confirmation email?
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Button variant="contained" color="primary" onClick={resetErrors}>
                            Try again
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )
                : isEmailSent
                  ? (
                    <div>
                      <Grid container marginTop={2} marginBottom={2}>
                        <CenteredTextWithIcon
                          text={'We have sent the confirmation email to you. Please check your inbox.'}
                        />
                      </Grid>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Link href={'/signin'}>
                            <Button variant="contained" color="primary">
                              To signin page
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
                    </div>)
                  : (
                    <div>
                      <form onSubmit={onSubmit}>
                        <Typography variant="body1">
                          Enter your email address and we will send you a link to reset your
                          password.
                        </Typography>
                        <TextField
                          style={{ margin: '15px 0' }}
                          onChange={(e) => setEmail(e.target.value)}
                          variant="outlined"
                          required
                          fullWidth
                          id="email"
                          label="Email Address"
                          name="email"
                          autoComplete="email"
                        />
                        <Button
                          disabled={validateEmail(email)}
                          type="submit"
                          variant="contained"
                          color="primary"
                        >
                          Send Email
                        </Button>
                      </form>
                    </div>
                  ))}
            {isLoading && (
              <div style={{ display: 'flex' }}>
                <Typography variant="body1" sx={{ textAlign: 'center', m: 1 }}>
                  Sending email...
                </Typography>
              </div>
            )}
          </Grid>
        </Grid>
      </Container>
      <script
        async
        src={`https://www.google.com/recaptcha/api.js?render=${recaptchaPublicApiKey}`}
      />
    </Box>
  );
}

export default EmailConfirmationPage;
