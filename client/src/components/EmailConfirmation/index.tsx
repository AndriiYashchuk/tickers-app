import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Button,
  CircularProgress,
  Box,
  Grid,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { useRequestWithUiErrors } from '../../hooks/useRequestWithUiErrors';
import Link from 'next/link';
import { CenteredTextWithIcon } from '../CenteredTextWithIcon';


const CONFIRM_EMAIL_API = '/api/users/confirm-email';
const EMAIL_IN_USE_ERROR = 'Email already confirmed';

interface Props {
  token: string,
  userId: string
}

const EmailConfirmation = ({ token, userId }: Props) => {
  const { push } = useRouter();
  const [isEmailInUse, setEmailInUse] = useState(false);
  const { doRequest, uiErrors, isLoading, errors, resetErrors } = useRequestWithUiErrors({
    url: `${CONFIRM_EMAIL_API}/${token}`,
    method: 'get',
    onSuccess: () => setTimeout(() => push('/web-app'), 1000),
    params: { id: userId },
  });

  useEffect(() => {
    // Send a request to your server to confirm the email based on the token
    doRequest();
  }, [token, userId]);

  useEffect(() => {
    setEmailInUse(
      () => !!errors && !!errors.find((error) => error.message === EMAIL_IN_USE_ERROR)
    );
  }, [errors]);
  // TODO: split layout from resend-email and email-confirmation pages into separate components
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh" // 100% of the viewport height
    >
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={1}>
            <div>
              {isLoading && <CircularProgress />}
            </div>
          </Grid>
          <Grid item xs={11} minHeight={'200px'}>
            <Typography variant="h4" gutterBottom>
              Email Confirmation
            </Typography>
            {isLoading && (
              <div style={{ display: 'flex' }}>
                <Typography variant="body1" sx={{ textAlign: 'center', m: 1 }}>
                  Confirming your email...
                </Typography>
              </div>
            )}
            {!isLoading &&
              (uiErrors
                ? (
                  <>
                    <Typography variant="body1" color={'error'}>
                      An error occurred while confirming your email:
                    </Typography>
                    {uiErrors}
                    <Grid spacing={4}>
                      {!isEmailInUse &&
                        <Typography variant="body1">
                          Do you want to resend the confirmation email?
                        </Typography>}
                      <Grid container spacing={2}>
                        <Grid item>
                          <Link href={'/resend-email'}>
                            {!isEmailInUse &&
                              <Button variant="contained" color="primary">
                                To Resend page
                              </Button>}
                          </Link>
                        </Grid>
                        <Grid item>
                          <Link href={'/'}>
                            <Button variant={isEmailInUse ? "contained" : "outlined"}>
                              To landing page
                            </Button>
                          </Link>
                        </Grid>
                      </Grid>
                    </Grid>
                  </>
                )
                : (
                  <CenteredTextWithIcon
                    text={'Your email has been successfully confirmed!'}
                  />
                ))}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default EmailConfirmation;
