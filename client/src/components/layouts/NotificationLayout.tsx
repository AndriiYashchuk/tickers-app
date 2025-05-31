import React, { PropsWithChildren } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Grid,
} from '@mui/material';
import { recaptchaPublicApiKey } from '../../constants';

interface Props {
  isLoading: boolean;
  headerText: string;
}

export const NotificationLayout = ({
  children,
  isLoading,
  headerText
}: PropsWithChildren<Props>) => {
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
              {headerText}
            </Typography>

            {children}

          </Grid>
        </Grid>
        <script
          async
          src={`https://www.google.com/recaptcha/api.js?render=${recaptchaPublicApiKey}`}
        />
      </Container>
    </Box>
  );
};
