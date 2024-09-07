import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import GraphicsSection from './GraphicsSection';
import { Faq } from './Faq';
const Landing = () => (React.createElement(Container, null,
    React.createElement(Box, { my: 4 },
        React.createElement(Typography, { variant: "h3", align: "center", gutterBottom: true }, "Welcome to Stock Portfolio Manager"),
        React.createElement(Typography, { variant: "h6", align: "center" }, "The ultimate tool for managing your stock investments. Track your tickers, shares, purchase prices, and current values seamlessly."),
        React.createElement(Box, { mt: 3, display: "flex", justifyContent: "center" },
            React.createElement(Button, { variant: "contained", color: "primary" },
                React.createElement(Link, { href: "/web-app", color: "inherit", underline: "none" }, "Manage My Portfolio")))),
    React.createElement(GraphicsSection, null),
    React.createElement(Faq, null),
    React.createElement(Box, { my: 4 },
        React.createElement(Paper, { elevation: 2, style: { padding: '20px' } },
            React.createElement(Typography, { variant: "h4", align: "center" }, "About Us"),
            React.createElement(Typography, null, "Stock Portfolio Manager was created with a vision to simplify stock management for individual investors. Our team of experts is dedicated to providing you with the best tools and insights to help you thrive in the stock market.")))));
export default Landing;
