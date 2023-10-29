import {
  Container,
  Typography,
  CircularProgress,
  Box,
  Grid,
} from '@mui/material';
import React from 'react';

interface Props {
  uiErrors?: React.ReactNode | null,
  isLoading?: boolean,
  loadingText?: string,
  errorSuggestionText?: string
  errorDescriptionText?: string
  titleText?: string;
  actions?: React.ReactNode []
}

export const CenteredLayout = ({
  children,
  isLoading,
  uiErrors,
  titleText,
  loadingText,
  errorSuggestionText,
  errorDescriptionText,
  actions
}: React.PropsWithChildren<Props>) => (
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
            {titleText}
          </Typography>
          {!isLoading &&
            (uiErrors
              ? (
                <>
                  <Typography variant="body1" color={'error'}>
                    {errorDescriptionText}:
                  </Typography>
                  {uiErrors}
                  <Grid spacing={4}>
                    <Typography variant="body1">
                      {errorSuggestionText}
                    </Typography>
                    <Grid container spacing={2}>
                      {actions?.map((action: React.ReactNode) => (
                        <Grid item>
                          {action}
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </>
              )
              : (
                <div>
                  {children}
                </div>
              ))}
          {isLoading && (
            <div style={{ display: 'flex' }}>
              <Typography variant="body1" sx={{ textAlign: 'center', m: 1 }}>
                {loadingText}
              </Typography>
            </div>
          )}
        </Grid>
      </Grid>
    </Container>
  </Box>
);
