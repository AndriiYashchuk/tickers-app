import React from 'react';
import { Container } from '@mui/system';

export const Main = ({ children }: { children?: React.ReactNode }): JSX.Element => (
  <main>
    <Container maxWidth="lg" style={{ minHeight: '600px'}}>
      {children}
    </Container>
  </main>);
