import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import GraphicsSection from './GraphicsSection';
import { Faq } from './Faq';
const Index = ({ onClickManagePortfolio }) => (<Container>
    <Box my={4}>
      <Typography variant="h3" align="center" gutterBottom>
        Welcome to Stock Portfolio Manager
      </Typography>
      <Typography variant="h6" align="center">
        The ultimate tool for managing your stock investments. Track your tickers, shares,
        purchase prices, and current values seamlessly.
      </Typography>
      <Box mt={3} display="flex" justifyContent="center">
        <Button variant="contained" color="primary" onClick={onClickManagePortfolio}>
          Manage My Portfolio
        </Button>
      </Box>
    </Box>

    <GraphicsSection />

    <Faq />

    <Box my={4}>
      <Paper elevation={2} style={{ padding: '20px' }}>
        <Typography variant="h4" align="center">
          About Us
        </Typography>
        <Typography>
          Stock Portfolio Manager was created with a vision to simplify stock management for
          individual investors. Our team of experts is dedicated to providing you with the best
          tools and insights to help you thrive in the stock market.
        </Typography>
      </Paper>
    </Box>
  </Container>);
export default Index;
