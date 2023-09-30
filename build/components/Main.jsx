import React from 'react';
import { Container } from '@mui/system';
export const Main = ({ children }) => (<main>
    <Container maxWidth="lg">
      {children}
    </Container>
  </main>);
