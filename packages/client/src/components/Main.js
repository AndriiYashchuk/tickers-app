import React from 'react';
import Container from '@mui/material/Container';
export const Main = ({ children }) => (React.createElement("main", null,
    React.createElement(Container, { maxWidth: "lg", style: { minHeight: '600px' } }, children)));
