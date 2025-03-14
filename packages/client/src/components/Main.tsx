import React from 'react';
import Container from '@mui/material/Container';

export const Main = ({ children }: { children?: React.ReactNode }): JSX.Element => (
  <main>
    <Container maxWidth="lg" style={{ minHeight: '600px' }}>
      {children}
    </Container>
  </main>);
