import React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
const AboutPage = () => {
    return (React.createElement(Container, { sx: { marginBottom: '10px' } },
        React.createElement(Box, { mt: 4 },
            React.createElement(Typography, { variant: "h3", align: "center", gutterBottom: true }, "About Stock Portfolio Manager"),
            React.createElement(Typography, { variant: "body1", paragraph: true }, "Stock Portfolio Manager was born out of a passion to make stock management more accessible and user-friendly. Since our inception in 2021, we've been committed to providing the best tools for individual investors to manage their portfolios seamlessly."),
            React.createElement(Typography, { variant: "body1", paragraph: true }, "Our vision is to simplify stock management for everyone, from first-time investors to seasoned market players. We believe in empowering our users with real-time data, intuitive design, and continuous innovation.")),
        React.createElement(Box, { mt: 4 },
            React.createElement(Typography, { variant: "h4", align: "center", gutterBottom: true }, "What Our Users Say"),
            React.createElement(Box, { mt: 2 },
                React.createElement(Paper, { elevation: 1, style: { padding: '20px' } },
                    React.createElement(Typography, { variant: "body1", paragraph: true }, "\"I was new to stocks when I found Stock Portfolio Manager. This platform changed the game for me. The real-time updates and historical data features are fantastic!\""),
                    React.createElement(Typography, { variant: "subtitle2", align: "right" }, "- Alice Brown"))),
            React.createElement(Box, { mt: 2 },
                React.createElement(Paper, { elevation: 1, style: { padding: '20px' } },
                    React.createElement(Typography, { variant: "body1", paragraph: true }, "\"Thanks to Stock Portfolio Manager, I've been able to make more informed decisions about my investments. It's become an essential tool for my daily trading.\""),
                    React.createElement(Typography, { variant: "subtitle2", align: "right" }, "- Mike Johnson"))),
            React.createElement(Box, { mt: 2 },
                React.createElement(Paper, { elevation: 1, style: { padding: '20px' } },
                    React.createElement(Typography, { variant: "body1", paragraph: true }, "\"The user-friendly interface and comprehensive features make it a must-have for anyone serious about managing their stock portfolio. Two thumbs up!\""),
                    React.createElement(Typography, { variant: "subtitle2", align: "right" }, "- Priya Khanna"))))));
};
export default AboutPage;
