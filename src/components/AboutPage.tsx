import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const AboutPage = () => {
  return (
    <Container sx={{marginBottom: '10px'}}>
      <Box mt={4}>
        <Typography variant="h3" align="center" gutterBottom>
          About Stock Portfolio Manager
        </Typography>
        <Typography variant="body1" paragraph>
          Stock Portfolio Manager was born out of a passion to make stock management more accessible and user-friendly. Since our inception in 2021, we've been committed to providing the best tools for individual investors to manage their portfolios seamlessly.
        </Typography>
        <Typography variant="body1" paragraph>
          Our vision is to simplify stock management for everyone, from first-time investors to seasoned market players. We believe in empowering our users with real-time data, intuitive design, and continuous innovation.
        </Typography>
      </Box>

      <Box mt={4}>
        <Typography variant="h4" align="center" gutterBottom>
          What Our Users Say
        </Typography>

        <Box mt={2}>
          <Paper elevation={1} style={{ padding: '20px' }}>
            <Typography variant="body1" paragraph>
              "I was new to stocks when I found Stock Portfolio Manager. This platform changed the game for me. The real-time updates and historical data features are fantastic!"
            </Typography>
            <Typography variant="subtitle2" align="right">- Alice Brown</Typography>
          </Paper>
        </Box>

        <Box mt={2}>
          <Paper elevation={1} style={{ padding: '20px' }}>
            <Typography variant="body1" paragraph>
              "Thanks to Stock Portfolio Manager, I've been able to make more informed decisions about my investments. It's become an essential tool for my daily trading."
            </Typography>
            <Typography variant="subtitle2" align="right">- Mike Johnson</Typography>
          </Paper>
        </Box>

        <Box mt={2}>
          <Paper elevation={1} style={{ padding: '20px' }}>
            <Typography variant="body1" paragraph>
              "The user-friendly interface and comprehensive features make it a must-have for anyone serious about managing their stock portfolio. Two thumbs up!"
            </Typography>
            <Typography variant="subtitle2" align="right">- Priya Khanna</Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
}

export default AboutPage;
