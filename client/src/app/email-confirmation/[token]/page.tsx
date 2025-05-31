'use client';

import React, { useEffect, useState } from 'react';
import { Button, Grid, Typography } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRequestWithUiErrors } from '../../../hooks/useRequestWithUiErrors';
import { CenteredTextWithIcon } from '../../../components/CenteredTextWithIcon';
import { NotificationLayout } from '../../../components/layouts/NotificationLayout';

interface Props {
  params: {
    token: string;
  }
  searchParams: {
    id: string
  }
}

const CONFIRM_EMAIL_API = '/api/users/confirm-email';
const EMAIL_IN_USE_ERROR = 'Email already confirmed';

const EmailConfirmationPage = (props: Props) => {
  const {
    params: { token },
    searchParams: { id: userId }
  } = props;

  const { push } = useRouter();
  const [isEmailInUse, setEmailInUse] = useState(false);
  const { doRequest, uiErrors, isLoading, errors } = useRequestWithUiErrors({
    url: `${CONFIRM_EMAIL_API}/${token}?id=${userId}`,
    method: 'put',
    onSuccess: () => setTimeout(() => push('/web-app'), 1000),
  });

  useEffect(() => {
    doRequest();
  }, []);

  useEffect(() => {
    setEmailInUse(
      () => !!errors && !!errors.find(error => error.message === EMAIL_IN_USE_ERROR)
    );
  }, [errors]);

  return (
    <NotificationLayout
      isLoading={isLoading}
      headerText={'Email Confirmation'}
    >
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
                      <Button variant={isEmailInUse ? 'contained' : 'outlined'}>
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
    </NotificationLayout>
  );
};

export default EmailConfirmationPage;
