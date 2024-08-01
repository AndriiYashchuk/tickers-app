import React from 'react';
import KeyboardBackspace from '@mui/icons-material/KeyboardBackspace';
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  Alert,
  Link
} from '@mui/material';
import Layout from '../../components/layouts/main';

const Pricing = () => {
  return (
    <Container>
      <Box my={4}>
        <Typography variant="h3" component="h1" gutterBottom>
          Pricing
        </Typography>
        <Alert severity="info">
          Our application is currently in development.
          It is completely free to use, but please note that you may encounter bugs, errors,
          and other issues during this phase.
        </Alert>
        <Grid container spacing={4} my={4}>
          <Grid item xs={12} md={6} lg={4}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Free Plan
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  $0 / month
                </Typography>
                <Box my={2}>
                  <Typography variant="body1">
                    - Full access to all features
                  </Typography>
                  <Typography variant="body1">
                    - Unlimited portfolio tracking
                  </Typography>
                  <Typography variant="body1">
                    - Community support
                  </Typography>
                </Box>
                <Button variant="contained" color="primary">
                  <Link href="/web-app" color="inherit" underline="none">
                    Get Started
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Grid container spacing={2} my={2}>
          <Button variant="contained" color="primary">
            <Link href="/" color="inherit" underline="none">
              <Box display="flex" alignItems="center">
                <KeyboardBackspace /> &nbsp;
                Back to Landing Page
              </Box>
            </Link>
          </Button>
        </Grid>
      </Box>
    </Container>
  );
};

export default Layout(Pricing);
