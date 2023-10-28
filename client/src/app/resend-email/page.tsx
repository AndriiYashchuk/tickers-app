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

const validateEmail = (email: string): boolean => {
  return !email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const EmailConfirmationPage = () => {
  const [email, setEmail] = useState('');
  const isLoading = false;

  const { doRequest, uiErrors, resetErrors } = useRequestWithUiErrors({
    url: '/api/users/resend-email',
    method: 'post',
    body: { email },
    onSuccess: () => {}
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    window.grecaptcha.ready((): void => {
      window.grecaptcha.execute(recaptchaPublicApiKey, { action: 'resend-email' })
        .then((token: string): Promise<void> => doRequest(token));
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
                      An error occurred while confirming your email:
                    </Typography>
                    {uiErrors}
                    <Grid spacing={4}>
                      <Typography variant="body1">
                        Do you want to resend the confirmation email?
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item>
                          <Link href={'/resend-email'}>
                            <Button variant="contained" color="primary">
                              To Resend page
                            </Button>
                          </Link>
                        </Grid>
                        <Grid item>
                          <Button variant="outlined">
                            To landing page
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )
                : (
                  <div>
                    <form onSubmit={onSubmit}>
                      <Typography variant="body1">
                        Enter your email address and we will send you a link to reset your password.
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
      <script src={`https://www.google.com/recaptcha/api.js?render=${recaptchaPublicApiKey}`}></script>
    </Box>
  );
}

export default EmailConfirmationPage;
