import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import LinkedInIcon from '@mui/icons-material/LinkedIn';

const style = {
  backgroundColor: '#f7f7f7',
};

interface Props{
  email?: string;
  phone?: string;
  author?: {
    link: string
    name: string
  }
}

export const Footer = ({ email, phone, author } : Props) => (
    <Box mt={5} py={3} style={style}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Stock Portfolio Manager</Typography>
            <Typography variant="body2">
              Dedicated to providing the best tools for managing your stock portfolio seamlessly.
            </Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Quick Links</Typography>
            <Box mt={1}>
              <Link href="/" display="block" variant="body2">Home</Link>
              <Link href="/about" display="block" variant="body2">About</Link>
              <Link href="/web-app" display="block" variant="body2">Manage Portfolio</Link>
              <Link href="/contact" display="block" variant="body2">Contact</Link>
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="h6">Contact Us</Typography>
            <Box mt={1}>
              {email && <Typography variant="body2">Email: {email}</Typography>}
              {phone && <Typography variant="body2">Phone: {phone}</Typography>}
            </Box>
          </Grid>
          {author && (
            <Grid item xs={12} md={3}>
              <Typography variant="h6">Developed By</Typography>
              <Box mt={1}>
                <Link
                  href={author.link}
                  target="_blank"
                  rel="noopener"
                  variant="body2"
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="body2">{author.name}</Typography>
                  <LinkedInIcon />
                </Link>
              </Box>
            </Grid>)}
        </Grid>
        <Box mt={3} borderTop={1} borderColor="divider" pt={2}>
          <Typography variant="body2" align="center">
            &copy; {new Date().getFullYear()} Stock Portfolio Manager tickers-app.com.
            <br/>
            All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );


