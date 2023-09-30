import React from 'react';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';

const FooterWrapper = styled('footer')(({ theme }) => ({
  position: 'fixed',
  left: 0,
  bottom: 0,
  width: '100%',
  backgroundColor: theme.palette.background.default,
  color: theme.palette.primary.main,
  textAlign: 'center',
  padding: '1rem'
}))

export const Footer = () => (
  <FooterWrapper>
      <Typography variant="body2">
        © 2023 Andrii Yashchuk.
      </Typography>
  </FooterWrapper>
);

