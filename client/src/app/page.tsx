import LandingPageComponent from '@tickers-app/common-client/build/components/LandingPage';
import { Box, Button, Container, Link } from '@mui/material';
import Layout from '../components/layouts/main';

export const metadata = {
  title: 'Tickers App',
  description: 'Landing page',
};

const LandingPage = () => (
  <>
    <LandingPageComponent />
    <Container>
      <Box mt={3} display="flex" justifyContent="center">
        <Button variant="contained" color="primary">
          <Link href="/pricing" color="inherit" underline="none">
            Pricing
          </Link>
        </Button>
      </Box>
    </Container>
  </>);

export default Layout(LandingPage);
