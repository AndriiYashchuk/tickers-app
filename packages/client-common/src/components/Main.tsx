import React from 'react';
import { Container } from '@mui/system';

export const Main = ({ children }: { children?: React.ReactNode }): JSX.Element => (
  <main>
    <Container maxWidth="lg">
      {children}
    </Container>
  </main>);
